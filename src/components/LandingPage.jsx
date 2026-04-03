import { useLanguage } from '../i18n'

const FEATURE_ICONS = [
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.072-.504.936-1.111a13.284 13.284 0 00-2.417-5.136l-1.1-1.375A2.25 2.25 0 0015.64 9.75H12V6.375a1.125 1.125 0 00-1.125-1.125H3.375A1.125 1.125 0 002.25 6.375v9.75" />
  </svg>,
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>,
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>,
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>,
]

function LangSwitcher() {
  const { lang, setLang } = useLanguage()
  return (
    <div className="flex items-center rounded-lg border border-primary/30 overflow-hidden text-xs font-semibold">
      <button
        onClick={() => setLang('fr')}
        className={`px-2.5 py-1 transition-colors duration-200 ${lang === 'fr' ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary'}`}
      >
        FR
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-2.5 py-1 transition-colors duration-200 ${lang === 'en' ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary'}`}
      >
        EN
      </button>
    </div>
  )
}

export default function LandingPage() {
  const { t } = useLanguage()
  const stats = t('stats')
  const featureItems = t('features.items')
  const steps = t('howItWorks.steps')

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L4 8v8c0 7.2 5.1 13.9 12 16 6.9-2.1 12-8.8 12-16V8L16 2z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M11 16l3.5 3.5L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-gray-900 font-semibold text-xl tracking-tight">Sérénity</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#offres" className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">{t('nav.offers')}</a>
            <a href="#fonctionnement" className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">{t('nav.howItWorks')}</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">{t('nav.about')}</a>
            <LangSwitcher />
            <a href="#" className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm">{t('nav.clientArea')}</a>
          </div>
          <div className="md:hidden">
            <LangSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50 to-primary-100" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {t('hero.badge')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-tight mb-6">
                {t('hero.title1')}<br />
                {t('hero.title2')}<br />
                <span className="text-primary">{t('hero.title3')}</span>
              </h1>
              <p className="text-gray-500 text-lg font-light leading-relaxed mb-10 max-w-md">
                {t('hero.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" className="bg-primary text-white px-8 py-4 rounded-xl font-semibold text-center hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40">
                  {t('hero.cta1')}
                </a>
                <a href="#offres" className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-medium text-center hover:border-gray-300 hover:bg-gray-50 transition-all">
                  {t('hero.cta2')}
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80"
                alt={t('hero.imgAlt')}
                className="rounded-3xl shadow-2xl shadow-gray-200/60 w-full h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <span className="text-3xl md:text-4xl font-bold text-gray-900">{s.value}</span>
                <p className="text-gray-400 text-sm mt-2 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="offres" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wide uppercase">{t('features.label')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto font-light">
              {t('features.desc')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureItems.map((f, i) => (
              <div
                key={f.title}
                className="bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-xl hover:shadow-gray-100/80 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {FEATURE_ICONS[i]}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                <div className="mt-5 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t('features.learnMore')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="fonctionnement" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wide uppercase">{t('howItWorks.label')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">{t('howItWorks.title')}</h2>
            <p className="text-gray-400 max-w-lg mx-auto font-light">{t('howItWorks.desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="relative bg-white rounded-2xl p-8 border border-gray-100">
                <span className="text-5xl font-bold text-primary/10">{step.num}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Chatbot */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl px-8 md:px-16 py-14 md:py-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-8">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('cta.title')}</h2>
              <p className="text-white/70 text-lg font-light mb-6">{t('cta.desc')}</p>
              <p className="text-white/40 text-sm">{t('cta.hint')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <svg className="w-7 h-7 text-primary" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L4 8v8c0 7.2 5.1 13.9 12 16 6.9-2.1 12-8.8 12-16V8L16 2z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M11 16l3.5 3.5L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-gray-900 font-semibold">Sérénity</span>
            </div>
            <p className="text-gray-400 text-sm">{t('footer.copy')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
