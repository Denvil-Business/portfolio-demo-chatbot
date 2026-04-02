import { LanguageProvider } from './i18n'
import LandingPage from './components/LandingPage'
import ChatWidget from './components/ChatWidget'

export default function App() {
  return (
    <LanguageProvider>
      <LandingPage />
      <ChatWidget />
    </LanguageProvider>
  )
}
