import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Detail from './components/common/Detail';
import Navbar from './Navbar/Navbar';
import Hero from './components/hero/Hero';
import Products from './components/products/Products';
import About from './components/about/About';
import Services from './components/services/Services';
import Events from './components/events/Events';
import EventsPage from './components/events/EventsPage';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import ExecutiveTeam from './components/Executive Team/ExecutiveTeam';
import FAQSection from './components/FAQ SECTION/Faq';
import ContactForm from './components/contact/ContactForm';
import CloudEffects from './components/services/details/CloudEffects';
import LuxuryWedding from './components/services/details/LuxuryWedding';
import GrandEntry from './components/services/details/GrandEntry';
import VenueDecoration from './components/services/details/VenueDecoration';
import Fireworks from './components/services/details/Fireworks';
import SoundLightVisual from './components/services/details/SoundLightVisual';
import ItemSelection from './components/booking/ItemSelection';
import ThankYou from './components/booking/ThankYou';
// import Payment from './components/booking/Payment';
// import AnnouncementBar from './components/common/AnnoucementBar';
function App() {
  return (
    <Router>
      <div className="min-h-screen pb-24">
        {/* <AnnouncementBar/> */}
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
            <Route path="/events" element={
              <div className="bg-gray-50">
                <EventsPage />
                <Footer />
              </div>
            } />
            <Route path="/select-items" element={
              <div className="bg-gray-50 min-h-screen">
                <ItemSelection />
                <Footer />
              </div>
            } />
            
            <Route path="/services/cloud-effects" element={
              <div className="bg-gray-50">
                <CloudEffects />
                <Footer />
              </div>
            } />
            <Route path="/services/luxury-wedding" element={
              <div className="bg-gray-50">
                <LuxuryWedding />
                <Footer />
              </div>
            } />
            <Route path="/services/grand-entry" element={
              <div className="bg-gray-50">
                <GrandEntry />
                <Footer />
              </div>
            } />
            <Route path="/services/venue-decoration" element={
              <div className="bg-gray-50">
                <VenueDecoration />
                <Footer />
              </div>
            } />
            <Route path="/services/fireworks" element={
              <div className="bg-gray-50">
                <Fireworks />
                <Footer />
              </div>
            } />
            <Route path="/services/sound-light-visual" element={
              <div className="bg-gray-50">
                <SoundLightVisual />
                <Footer />
              </div>
            } />
            <Route path="/events/:eventId" element={
              <div className="bg-white">
                <EventsPage />
                <Footer />
              </div>
            } />
            <Route path="/select-items" element={
              <div className="bg-gray-50 min-h-screen">
                <ItemSelection />
                <Footer />
              </div>
            } />
            {/* <Route
              path="/payment"
              element={
                <div className="bg-gray-50 min-h-screen">
                  <Payment />
                  <Footer />
                </div>
              }
            /> */}
            <Route path="/thank-you" element={
              <div className="bg-yellow-50 min-h-screen">
                <ThankYou />
                <Footer />
              </div>
            } />
          </Routes>
        </main>
        <Detail />
      </div>
    </Router>
  );
}

export default App;