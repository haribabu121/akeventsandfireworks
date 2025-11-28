import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Hero from './components/hero/Hero';
import Products from './components/products/Products';
import About from './components/about/About';
import Services from './components/services/Services';
import Events from './components/events/Events';
import Testimonials from './components/testimonials/Testimonials';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import ExecutiveTeam from './components/Executive Team/ExecutiveTeam';

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
                <Testimonials />
                <Contact />
                <Footer />
              </div>
            } />
            {/* Add more routes here as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;