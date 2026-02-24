import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingPage from './pages/LoadingPage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Pirate3D from './components/Pirate3D';
import { AnimatePresence } from 'framer-motion';

const AppContent = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#120c08] text-[#f5deb3] selection:bg-amber-900/40 selection:text-white">
      {/* 3D BACKGROUND LAYER */}
      <Pirate3D />

      {/* TREASURE MAP BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-900/10 blur-[100px] rounded-full" />

        {/* Map Lines */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50h100M50 0v100' fill='none' stroke='%23d4af37' stroke-width='0.5' stroke-dasharray='5,5'/%3E%3Cellipse cx='50' cy='50' rx='40' ry='30' fill='none' stroke='%23d4af37' stroke-width='0.2'/%3E%3C/svg%3E")`,
            backgroundSize: '300px 300px'
          }}
        />

        {/* Compass Rose Decoration */}
        <div className="absolute top-[15%] right-[10%] w-64 h-64 opacity-[0.03] rotate-12">
          <svg viewBox="0 0 100 100" fill="none" stroke="#d4af37" strokeWidth="0.5">
            <circle cx="50" cy="50" r="45" />
            <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" />
            <circle cx="50" cy="50" r="2" fill="#d4af37" />
          </svg>
        </div>
      </div>

      {!isLanding && <Navbar />}

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LoadingPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isLanding && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
