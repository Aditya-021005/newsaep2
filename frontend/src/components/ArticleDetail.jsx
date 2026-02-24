import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ArticleDetail = ({ article, isOpen, onClose }) => {
  if (!article) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-6xl glass-panel rounded-3xl relative overflow-hidden flex flex-col md:flex-row h-[90vh]"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 border border-[#d4af37]/20 text-[#f5deb3] flex items-center justify-center hover:bg-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all active:scale-90"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* COVER IMAGE */}
            <div className="w-full md:w-5/12 relative bg-black shrink-0">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 md:to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 hidden md:block">
                <span className="px-3 py-1 bg-[#d4af37] text-[#120c08] text-[9px] font-black tracking-[.3em] uppercase rounded-sm mb-4">
                  {article.category || 'BOUNTY'}
                </span>
                <div className="text-[10px] font-mono text-[#d4af37]/40 uppercase tracking-[0.3em] mt-4">
                  BITS_PILANI_ARCHIVES
                </div>
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="w-full md:w-7/12 p-8 md:p-16 overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#d4af37]">Article Ledger</span>
                <div className="h-px bg-[#d4af37]/10 flex-grow" />
                <span className="text-[10px] font-mono text-[#f5deb3]/30 tracking-widest">{new Date(article.published_date).toLocaleDateString()}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-10 leading-tight tracking-tight font-pirate text-[#d4af37] glow-text">
                {article.title}
              </h1>

              <div className="space-y-8 text-white/70 leading-relaxed font-medium">
                <p className="text-lg text-white">
                  {article.summary}
                </p>
                <div className="h-px bg-white/5" />
                <p className="whitespace-pre-wrap">
                  {article.content}
                </p>

                <div className="mt-16 p-8 rounded-sm bg-[#d4af37]/5 border border-[#d4af37]/10 flex flex-col gap-4 relative overflow-hidden group">
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] opacity-50" />
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse shadow-[0_0_10px_#d4af37]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Pirate's Code 4.0</span>
                  </div>
                  <p className="text-xs text-[#f5deb3]/60 leading-relaxed font-garamond italic">
                    "Every man has a vote in affairs of moment; has equal title to the fresh provisions, or strong liquors, at any time seized, and may use them at pleasure."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleDetail;
