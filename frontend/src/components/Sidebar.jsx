import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  'All',
  'Technology',
  'Business',
  'Innovation',
  'Culture',
  'Urban',
  'Legacy',
];

const Sidebar = ({ isOpen, onClose, onSearch, currentCategory, onCategoryChange }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[20000]"
          />

          {/* SIDEBAR PANEL */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-black border-l border-white/10 z-[20001] flex flex-col shadow-2xl"
          >
            {/* HEADER */}
            <div className="p-8 flex items-center justify-between border-b border-white/10">
              <span className="text-[10px] tracking-[0.6em] uppercase text-white/40 font-bold">
                Archive Filter
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* SEARCH */}
            <div className="p-8">
              <form onSubmit={handleSearchSubmit} className="relative group">
                <input
                  autoFocus
                  type="text"
                  placeholder="Query Archives..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-4 px-2 text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-colors tracking-wide font-serif italic text-xl"
                />
                <button
                  type="submit"
                  className="absolute right-2 bottom-4 text-white/20 group-hover:text-white transition-colors"
                >
                  →
                </button>
              </form>
            </div>

            {/* CATEGORIES */}
            <div className="flex-1 overflow-y-auto px-8 py-4">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] tracking-[0.4em] uppercase text-white/20 font-medium mb-6">
                  Intelligence Categories
                </span>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onCategoryChange(cat === 'All' ? null : cat);
                      onClose();
                    }}
                    className={`text-left py-3 group flex items-center justify-between transition-all ${currentCategory === (cat === 'All' ? null : cat)
                      ? 'text-white'
                      : 'text-white/30 hover:text-white hover:translate-x-2'
                      }`}
                  >
                    <span className="font-serif italic text-2xl tracking-tighter">
                      {cat}
                    </span>
                    {currentCategory === (cat === 'All' ? null : cat) && (
                      <motion.div
                        layoutId="active-cat"
                        className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-8 border-t border-white/10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-[9px] tracking-[0.4em] uppercase text-white/20 font-bold">
                  <span>Social Matrix</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
                <div className="flex gap-6">
                  {['Instagram', 'Twitter', 'Media'].map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-[10px] tracking-widest uppercase text-white/40 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
