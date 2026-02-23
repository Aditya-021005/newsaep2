import React from 'react';
import { motion } from 'framer-motion';

const ArticleHero = ({ article, onClick }) => {
  if (!article) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden cursor-pointer group mb-12 shadow-2xl"
      onClick={() => onClick(article)}
    >
      {/* Background Image */}
      <img
        src={article.image_url}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent opacity-40" />

      {/* Border Glow */}
      <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 flex flex-col items-start gap-3 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 md:gap-4"
        >
          <span className="px-3 py-1 md:px-4 md:py-1.5 text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase bg-blue-600 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            FEATURED_INTEL
          </span>
          <span className="text-[8px] md:text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">
            // {new Date(article.published_date).toLocaleDateString()}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.95] md:leading-[0.9] max-w-4xl"
        >
          {article.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm md:text-xl text-white/70 max-w-2xl leading-relaxed font-medium line-clamp-3 md:line-clamp-none"
        >
          {article.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-2 md:mt-4 flex items-center gap-4 md:gap-6 group/btn"
        >
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase text-white/60 group-hover:text-white transition-colors">
            Access Full Archive
          </span>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:scale-110">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-8 right-8 flex flex-col items-end opacity-20">
        <span className="text-4xl font-black text-white decoration-blue-600 underline decoration-4 underline-offset-8">AEP</span>
        <span className="text-[8px] font-mono text-white mt-4 uppercase tracking-[0.5em]">Global_Network_Sync</span>
      </div>
    </motion.div>
  );
};

export default ArticleHero;
