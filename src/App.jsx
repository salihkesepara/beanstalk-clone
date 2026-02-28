import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import HowItWorksSection from './components/HowItWorksSection'
import FeaturesSection from './components/FeaturesSection'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'
import SignInPage from './pages/SignInPage'
import WaitlistModal from './components/WaitlistModal'

function HomePage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  return (
    <>
      <Navbar onOpenWaitlist={() => setWaitlistOpen(true)} />
      <main id="main-content">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <FAQSection />
      </main>
      <Footer />
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
