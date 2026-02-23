import React from 'react';
import { motion } from 'framer-motion';

const ArticleCard = ({ article, onClick, variant = 'full' }) => {
  const isCompact = variant === 'compact';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`premium-card group cursor-pointer flex flex-col h-full overflow-hidden ${isCompact ? 'rounded-2xl md:rounded-3xl' : 'rounded-3xl'}`}
      onClick={() => onClick(article)}
    >
      {/* IMAGE BOX */}
      <div className={`relative overflow-hidden ${isCompact ? 'aspect-square md:aspect-[1.5/1]' : 'aspect-square md:aspect-[2/1]'} flex-shrink-0`}>
        <img
          src={article.image_url}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        <div className="absolute top-2 left-2 md:top-4 md:left-4">
          <span className={`px-2 py-0.5 md:px-3 md:py-1 text-[7px] md:text-[9px] font-bold tracking-[0.2em] uppercase bg-blue-600 text-white rounded-full`}>
            {article.category || 'DATA'}
          </span>
        </div>
      </div>

      {/* CONTENT BOX */}
      <div className={`${isCompact ? 'p-3 md:p-6' : 'p-6 md:p-10'} flex flex-col flex-grow bg-black/40 backdrop-blur-md justify-between`}>
        <div>
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <span className={`${isCompact ? 'text-[8px] md:text-[10px]' : 'text-[10px]'} font-mono text-white/30 uppercase tracking-widest`}>
              {new Date(article.published_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
            <div className={`h-px bg-white/10 flex-grow ${isCompact ? 'hidden md:block' : 'block'}`} />
          </div>

          <h3 className={`${isCompact ? 'text-sm md:text-lg' : 'text-xl md:text-3xl'} font-bold mb-2 md:mb-4 tracking-tight group-hover:text-blue-400 transition-colors leading-snug line-clamp-2 md:line-clamp-3`}>
            {article.title}
          </h3>

          {/* Hide summary on mobile compact but show on desktop */}
          <p className={`${isCompact ? 'hidden md:block' : 'block'} text-sm text-white/50 leading-relaxed line-clamp-2 md:line-clamp-3 mb-6 font-medium`}>
            {article.summary}
          </p>
        </div>

        <div className={`mt-auto ${isCompact ? 'hidden md:flex' : 'flex'} pt-4 items-center justify-between group/btn border-t border-white/5`}>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 group-hover:text-white transition-colors">
            Read Intel
          </span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:translate-x-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
