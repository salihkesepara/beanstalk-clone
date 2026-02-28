import { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import HowItWorksSection from './components/HowItWorksSection'
import FeaturesSection from './components/FeaturesSection'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}

export default App
