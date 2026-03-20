import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingPage from './pages/LoadingPage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PageTransition from './components/PageTransition';
import BackToTop from './components/BackToTop';
import Sidebar from './components/Sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLanding = location.pathname === '/';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hasMoved, setHasMoved] = useState(false);
  const handleSidebarSearch = (query) => {
    navigate(`/news?search=${encodeURIComponent(query)}`);
  };
  const handleSidebarCategory = (category) => {
    if (category) navigate(`/news?category=${encodeURIComponent(category)}`);
    else navigate('/news');
  };
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
      if (!hasMoved) setHasMoved(true);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  useEffect(() => {
    const scrollResets = [0, 100, 450]; 
    const timers = scrollResets.map(delay =>
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTo(0, 0);
        document.body.scrollTo(0, 0);
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [location.pathname, searchParams.toString()]); 
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      <div className="noir-grain" />
      <CustomCursor />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSearch={handleSidebarSearch}
        currentCategory={searchParams.get('category')}
        onCategoryChange={handleSidebarCategory}
      />
      <div
        className="fixed inset-0 z-0 bg-black pointer-events-none overflow-hidden transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
          opacity: hasMoved ? 1 : 0
        }}
      >
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>
      <AnimatePresence>
        {!isLanding && (
          <motion.div
            key="navbar"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-[10005]"
          >
            <Navbar onSearchClick={() => setIsSidebarOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LoadingPage />} />
            <Route path="/news" element={<PageTransition><NewsPage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <AnimatePresence>
        {!isLanding && (
          <motion.div
            key="footer"
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Footer />
            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const App = () => (
  <Router>
    <AppContent />
  </Router>
);
export default App;