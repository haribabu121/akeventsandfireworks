import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Hero from './components/hero/Hero';
import Products from './components/products/Products';
import About from './components/about/About';
import Services from './components/services/Services';
import Events from './components/events/Events';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import ExecutiveTeam from './components/Executive Team/ExecutiveTeam';
import FAQSection from './components/FAQ SECTION/Faq';
import ContactForm from './components/contact/ContactForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={
              <div className="bg-gray-50">
                <Hero />
                <About />
                <ExecutiveTeam/>
                <Products />
                <Services />
                <Events />
                <FAQSection/>
                <Contact />
                <Footer />
              </div>
            } />
            <Route path="/contact" element={
              <div className="bg-gray-50">
                <ContactForm />
                <Footer />
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;