import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import HowItWorksSection from './components/HowItWorksSection'
import FeaturesSection from './components/FeaturesSection'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'
import SignInPage from './pages/SignInPage'

function HomePage() {
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
