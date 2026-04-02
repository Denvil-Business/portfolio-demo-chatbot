import { createContext, useContext, useState, useCallback } from 'react'

const translations = {
  fr: {
    nav: {
      offers: 'Nos offres',
      howItWorks: 'Comment ça marche',
      about: 'À propos',
      clientArea: 'Espace client',
    },
    hero: {
      badge: 'Assistant IA disponible 24h/24',
      title1: "L'assurance",
      title2: 'qui prend soin',
      title3: 'de vous.',
      desc: 'Simple, transparente et 100% en ligne. Obtenez votre devis personnalisé en 2 minutes.',
      cta1: 'Obtenir un devis gratuit',
      cta2: 'Découvrir nos offres',
      imgAlt: 'Famille souriante',
    },
    stats: [
      { value: '2M+', label: 'Clients protégés' },
      { value: '98%', label: 'Satisfaction client' },
      { value: '<2h', label: 'Temps de réponse' },
      { value: '15 ans', label: "D'expérience" },
    ],
    features: {
      label: 'Nos solutions',
      title: 'Une protection pour chaque moment de vie',
      desc: 'Des formules claires, sans jargon, avec un vrai accompagnement humain.',
      learnMore: 'En savoir plus',
      items: [
        { title: 'Auto & Moto', desc: 'Couverture complète pour tous vos véhicules. Assistance 24h/24, 0 franchise, et un tarif juste.' },
        { title: 'Habitation', desc: 'Protégez votre logement et vos biens. Formules locataires et propriétaires, sans surprise.' },
        { title: 'Santé', desc: 'Complémentaire santé avec remboursements rapides. Réseau partenaire étendu dans toute la France.' },
        { title: 'Pro & Entreprise', desc: 'Solutions sur mesure pour votre activité, vos locaux et vos collaborateurs. Devis en 3 minutes.' },
      ],
    },
    howItWorks: {
      label: 'Simple et rapide',
      title: 'Comment ça marche ?',
      desc: 'Souscrivez en 3 étapes, depuis votre canapé.',
      steps: [
        { num: '01', title: 'Décrivez votre besoin', desc: 'Répondez à quelques questions simples sur votre situation.' },
        { num: '02', title: 'Comparez les offres', desc: 'Recevez une recommandation personnalisée en 2 minutes.' },
        { num: '03', title: 'Souscrivez en ligne', desc: 'Signature électronique, couverture immédiate, zéro paperasse.' },
      ],
    },
    cta: {
      title: 'Une question ? Parlez à notre assistant',
      desc: "Disponible 24h/24, il répond instantanément sur vos contrats, tarifs et démarches.",
      hint: 'Cliquez sur la bulle en bas à droite pour essayer',
    },
    footer: {
      copy: '© 2025 Sérénity. Tous droits réservés. Démo chatbot IA.',
    },
    chat: {
      title: 'Sérénity Assistant',
      online: 'En ligne',
      placeholder: 'Posez votre question...',
      closeLabel: 'Fermer le chat',
      openLabel: 'Ouvrir le chat',
      welcome: "Bonjour ! Je suis l'assistant Sérénity. Comment puis-je vous aider ?\n\nVous pouvez me poser des questions sur nos **tarifs**, **déclarer un sinistre** ou **parler à un conseiller**.",
      defaultReply: "Je n'ai pas trouvé de réponse précise à votre question, mais un conseiller Sérénity peut vous aider.\n\nSouhaitez-vous que je vous mette en relation ? Vous pouvez aussi appeler le **01 80 42 56 00** (lun-ven 8h-20h).",
      pricingReply: "Voici nos 3 formules Sérénity :\n\n• **Essentielle** — 19,90 €/mois\nResponsabilité civile, assistance 24h/24, protection juridique de base.\n\n• **Confort** — 34,90 €/mois\nTout inclus + bris de glace, vol, incendie, protection juridique étendue.\n\n• **Premium** — 49,90 €/mois\nCouverture maximale, véhicule de remplacement, 0 franchise, valeur à neuf.\n\nSouhaitez-vous un devis personnalisé ? Je peux aussi vous mettre en relation avec un conseiller.",
      claimReply: "Pour déclarer un sinistre, voici la marche à suivre :\n\n1. Rassemblez les pièces nécessaires (constat amiable, photos, témoignages).\n2. Rendez-vous sur **serenity.fr/sinistre** ou appelez le **01 80 42 56 78**.\n3. Remplissez votre déclaration sous 5 jours ouvrés.\n4. Un expert Sérénity vous contactera sous 48h.\n\nBesoin d'aide pour remplir un constat ? Je suis là pour vous guider.",
      contactReply: "Vous pouvez joindre un conseiller Sérénity :\n\n📞 **01 80 42 56 00** — lun-ven 8h-20h, sam 9h-17h\n✉️ contact@serenity.fr\n📍 45 Avenue Hoche, 75008 Paris\n\nVous préférez être rappelé ? Indiquez-moi votre numéro et le créneau qui vous arrange.",
      helloReply: "Bonjour et bienvenue chez Sérénity ! Ravi de vous accueillir. 😊\n\nComment puis-je vous aider ? Je peux vous renseigner sur nos **formules**, vous accompagner pour **déclarer un sinistre**, ou vous mettre en relation avec un **conseiller**.",
      thanksReply: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Toute l'équipe Sérénity est là pour vous. Belle journée !",
    },
  },
  en: {
    nav: {
      offers: 'Our offers',
      howItWorks: 'How it works',
      about: 'About us',
      clientArea: 'Client area',
    },
    hero: {
      badge: 'AI assistant available 24/7',
      title1: 'Insurance',
      title2: 'that takes care',
      title3: 'of you.',
      desc: 'Simple, transparent and 100% online. Get your personalised quote in 2 minutes.',
      cta1: 'Get a free quote',
      cta2: 'Explore our offers',
      imgAlt: 'Smiling family',
    },
    stats: [
      { value: '2M+', label: 'Protected clients' },
      { value: '98%', label: 'Client satisfaction' },
      { value: '<2h', label: 'Response time' },
      { value: '15 yrs', label: 'Of experience' },
    ],
    features: {
      label: 'Our solutions',
      title: 'Protection for every moment in life',
      desc: 'Clear plans, no jargon, with real human support.',
      learnMore: 'Learn more',
      items: [
        { title: 'Car & Motorbike', desc: 'Full coverage for all your vehicles. 24/7 assistance, zero deductible, fair pricing.' },
        { title: 'Home', desc: 'Protect your home and belongings. Renter and owner plans, no surprises.' },
        { title: 'Health', desc: 'Complementary health cover with fast reimbursements. Wide partner network across France.' },
        { title: 'Business', desc: 'Tailored solutions for your activity, premises and employees. Quote in 3 minutes.' },
      ],
    },
    howItWorks: {
      label: 'Simple & fast',
      title: 'How does it work?',
      desc: 'Subscribe in 3 steps, from the comfort of your home.',
      steps: [
        { num: '01', title: 'Describe your need', desc: 'Answer a few simple questions about your situation.' },
        { num: '02', title: 'Compare offers', desc: 'Receive a personalised recommendation in 2 minutes.' },
        { num: '03', title: 'Subscribe online', desc: 'Electronic signature, immediate coverage, zero paperwork.' },
      ],
    },
    cta: {
      title: 'A question? Talk to our assistant',
      desc: 'Available 24/7, it answers instantly about your contracts, pricing and procedures.',
      hint: 'Click the bubble at the bottom right to try it',
    },
    footer: {
      copy: '© 2025 Sérénity. All rights reserved. AI chatbot demo.',
    },
    chat: {
      title: 'Sérénity Assistant',
      online: 'Online',
      placeholder: 'Ask your question...',
      closeLabel: 'Close chat',
      openLabel: 'Open chat',
      welcome: "Hello! I'm the Sérénity assistant. How can I help you?\n\nYou can ask me about our **pricing**, **file a claim** or **speak to an advisor**.",
      defaultReply: "I couldn't find a precise answer to your question, but a Sérénity advisor can help.\n\nWould you like me to connect you? You can also call **01 80 42 56 00** (Mon-Fri 8am-8pm).",
      pricingReply: "Here are our 3 Sérénity plans:\n\n• **Essential** — €19.90/month\nThird-party liability, 24/7 assistance, basic legal protection.\n\n• **Comfort** — €34.90/month\nAll included + glass breakage, theft, fire, extended legal protection.\n\n• **Premium** — €49.90/month\nMaximum coverage, replacement vehicle, zero deductible, new value.\n\nWould you like a personalised quote? I can also connect you with an advisor.",
      claimReply: "To file a claim, here's what to do:\n\n1. Gather the necessary documents (accident report, photos, witness statements).\n2. Go to **serenity.fr/claims** or call **01 80 42 56 78**.\n3. Submit your claim within 5 business days.\n4. A Sérénity expert will contact you within 48 hours.\n\nNeed help filling out a report? I'm here to guide you.",
      contactReply: "You can reach a Sérénity advisor:\n\n📞 **01 80 42 56 00** — Mon-Fri 8am-8pm, Sat 9am-5pm\n✉️ contact@serenity.fr\n📍 45 Avenue Hoche, 75008 Paris\n\nPrefer a callback? Share your number and preferred time slot.",
      helloReply: "Hello and welcome to Sérénity! Great to have you here. 😊\n\nHow can I help? I can tell you about our **plans**, help you **file a claim**, or connect you with an **advisor**.",
      thanksReply: "My pleasure! Don't hesitate if you have more questions. The whole Sérénity team is here for you. Have a great day!",
    },
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => (navigator.language || navigator.userLanguage || '').startsWith('fr') ? 'fr' : 'en'
  )

  const t = useCallback((key) => {
    const keys = key.split('.')
    let val = translations[lang]
    for (const k of keys) {
      if (val == null) return key
      val = val[k]
    }
    return val ?? key
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
