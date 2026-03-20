import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
const Navbar = ({ onSearchClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { name: 'Articles', path: '/news' },
    { name: 'The Team', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[10005] transition-all duration-300 ${isScrolled && !isMenuOpen ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <Link to="/" className="flex flex-col items-start group">
            <span className="font-serif text-2xl font-bold tracking-tighter text-white group-hover:scale-105 transition-transform duration-500">
              AEP CHRONICLES
            </span>
            <span className="text-[7px] tracking-[0.5em] uppercase text-white/30 font-bold -mt-1 group-hover:text-white/60 transition-colors">
              Official Journal · Est. 2026
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-300 hover:text-white ${location.pathname === link.path ? 'text-white underline underline-offset-8' : 'text-white/40'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={onSearchClick}
              className="ml-4 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:scale-110 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={onSearchClick}
              className="w-10 h-10 flex items-center justify-center text-white/40"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-[10006]"
            >
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white block"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-white block"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white block"
              />
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[10002] bg-black flex flex-col items-center justify-center p-8 md:hidden"
          >
            <div className="flex flex-col items-center gap-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`text-4xl font-serif italic tracking-tight hover-glitch ${location.pathname === link.path ? 'text-white underline underline-offset-8' : 'text-white/40'
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;