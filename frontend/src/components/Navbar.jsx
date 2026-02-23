import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'News', path: '/news' },
    { name: 'Manifesto', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled || isMenuOpen ? 'py-4' : 'py-6'}`}>
      <div className="container mx-auto px-6">
        <div className={`glass-panel flex items-center justify-between px-6 md:px-8 h-12 rounded-full transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-black/60 shadow-blue-500/10' : 'bg-white/5'}`}>
          {/* LOGO */}
          <Link to="/news" className="flex items-center group relative z-50">
            <span className="text-white font-bold text-lg tracking-tight transition-transform group-hover:scale-105">
              AEP<span className="text-blue-500">NEWS</span>
            </span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${location.pathname === link.path
                  ? 'bg-blue-600'
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* DESKTOP STATUS */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-medium text-white/40 tracking-widest uppercase">
              System Active
            </span>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-white rounded-full block"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-white rounded-full block"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-white rounded-full block"
            />
          </button>
        </div>

        {/* MOBILE OVERLAY MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-4 left-6 right-6 glass-panel rounded-3xl p-8 flex flex-col gap-6 md:hidden z-40 bg-black/90 pt-20"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-6 py-4 rounded-2xl text-lg font-bold transition-all ${location.pathname === link.path
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/5 text-white/70 shadow-inner'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-8 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20">System Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase text-blue-500">Active</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
