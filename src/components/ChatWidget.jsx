import { useState, useRef, useEffect, useCallback } from 'react'

const WELCOME_MSG = {
  from: 'bot',
  text: 'Bonjour ! Je suis l\'assistant Sérénity. Comment puis-je vous aider ?\n\nVous pouvez me poser des questions sur nos **tarifs**, **déclarer un sinistre** ou **parler à un conseiller**.',
}

// --- Priority-based keyword matching ---
const RESPONSES = [
  {
    priority: 1,
    keywords: /prix|tarif|co[uû]t|formule|offre|devis|garantie|combien|mensuel|cotisation/,
    reply: 'Voici nos 3 formules Sérénity :\n\n• **Essentielle** — 19,90 €/mois\nResponsabilité civile, assistance 24h/24, protection juridique de base.\n\n• **Confort** — 34,90 €/mois\nTout inclus + bris de glace, vol, incendie, protection juridique étendue.\n\n• **Premium** — 49,90 €/mois\nCouverture maximale, véhicule de remplacement, 0 franchise, valeur à neuf.\n\nSouhaitez-vous un devis personnalisé ? Je peux aussi vous mettre en relation avec un conseiller.',
  },
  {
    priority: 2,
    keywords: /sinistre|accident|d[eé]clar|d[eé]g[aâ]t|dommage|vol|incendie|casse|constat/,
    reply: 'Pour déclarer un sinistre, voici la marche à suivre :\n\n1. Rassemblez les pièces nécessaires (constat amiable, photos, témoignages).\n2. Rendez-vous sur **serenity.fr/sinistre** ou appelez le **01 80 42 56 78**.\n3. Remplissez votre déclaration sous 5 jours ouvrés.\n4. Un expert Sérénity vous contactera sous 48h.\n\nBesoin d\'aide pour remplir un constat ? Je suis là pour vous guider.',
  },
  {
    priority: 3,
    keywords: /contact|conseiller|appeler|t[eé]l[eé]phone|email|agence|rendez|rdv|rappel|parler/,
    reply: 'Vous pouvez joindre un conseiller Sérénity :\n\n📞 **01 80 42 56 00** — lun-ven 8h-20h, sam 9h-17h\n✉️ contact@serenity.fr\n📍 45 Avenue Hoche, 75008 Paris\n\nVous préférez être rappelé ? Indiquez-moi votre numéro et le créneau qui vous arrange.',
  },
  {
    priority: 4,
    keywords: /bonjour|salut|hello|coucou|bonsoir|hey|bonne journ/,
    reply: 'Bonjour et bienvenue chez Sérénity ! Ravi de vous accueillir. 😊\n\nComment puis-je vous aider ? Je peux vous renseigner sur nos **formules**, vous accompagner pour **déclarer un sinistre**, ou vous mettre en relation avec un **conseiller**.',
  },
  {
    priority: 5,
    keywords: /merci|super|parfait|genial|g[eé]nial|top|excellent|nickel|impec/,
    reply: 'Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions. Toute l\'équipe Sérénity est là pour vous. Belle journée !',
  },
]

const DEFAULT_REPLY = 'Je n\'ai pas trouvé de réponse précise à votre question, mais un conseiller Sérénity peut vous aider.\n\nSouhaitez-vous que je vous mette en relation ? Vous pouvez aussi appeler le **01 80 42 56 00** (lun-ven 8h-20h).'

function getBotResponse(input) {
  const lower = input.toLowerCase()

  // Find the highest-priority match (lowest priority number wins)
  let bestMatch = null
  for (const entry of RESPONSES) {
    if (entry.keywords.test(lower)) {
      if (!bestMatch || entry.priority < bestMatch.priority) {
        bestMatch = entry
      }
    }
  }

  return bestMatch ? bestMatch.reply : DEFAULT_REPLY
}

// --- UI Components ---
function ShieldIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M16 2L4 8v8c0 7.2 5.1 13.9 12 16 6.9-2.1 12-8.8 12-16V8L16 2z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M11 16l3.5 3.5L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 mb-4">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <ShieldIcon className="w-4 h-4 text-white" />
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1.5">
          <span className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
          <span className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
          <span className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
        </div>
      </div>
    </div>
  )
}

function Message({ msg }) {
  const isBot = msg.from === 'bot'

  return (
    <div className={`flex items-start gap-2.5 mb-4 ${isBot ? '' : 'flex-row-reverse'}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <ShieldIcon className="w-4 h-4 text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
          isBot
            ? 'bg-gray-100 text-gray-700 rounded-tl-sm'
            : 'bg-primary text-white rounded-tr-sm'
        }`}
        dangerouslySetInnerHTML={{
          __html: msg.text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />')
        }}
      />
    </div>
  )
}

// --- Main Widget ---
export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, typing, scrollToBottom])

  useEffect(() => {
    if (open && !hasOpened) {
      setHasOpened(true)
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        setMessages([WELCOME_MSG])
      }, 1000)
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open, hasOpened])

  function sendMessage(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    setMessages((prev) => [...prev, { from: 'user', text }])
    setInput('')
    setTyping(true)

    const delay = 1000 + Math.random() * 1000
    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { from: 'bot', text: getBotResponse(text) }])
    }, delay)
  }

  return (
    <>
      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] transition-all duration-300 origin-bottom-right ${
          open
            ? 'scale-100 opacity-100 pointer-events-auto'
            : 'scale-75 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl shadow-gray-300/40 overflow-hidden flex flex-col border border-gray-100" style={{ height: 'min(540px, calc(100vh - 140px))' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <ShieldIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Sérénity Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-white/70 text-xs">En ligne</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors p-1"
              aria-label="Fermer le chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-white">
            {messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))}
            {typing && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="border-t border-gray-100 p-3 flex gap-2 flex-shrink-0 bg-white">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-primary text-white rounded-xl px-4 py-2.5 hover:bg-primary-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Envoyer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Floating bubble */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all duration-300 flex items-center justify-center hover:scale-110"
        aria-label="Ouvrir le chat"
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        )}

        {/* Notification badge */}
        {!open && !hasOpened && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">1</span>
          </span>
        )}
      </button>
    </>
  )
}
