import React from 'react';
import { motion } from 'framer-motion';

const ArticleCard = ({ article, onClick, variant = 'full', isTall = false }) => {
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
      <div className={`relative overflow-hidden ${isCompact ? 'aspect-square md:aspect-[1.5/1]' : isTall ? 'aspect-[1/1] md:aspect-[4/3]' : 'aspect-square md:aspect-[2/1]'} flex-shrink-0`}>
        <img
          src={article.image_url}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0906]/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
        <div className="absolute top-2 left-2 md:top-4 md:left-4">
          <span className={`px-2 py-0.5 md:px-3 md:py-1 text-[7px] md:text-[9px] font-bold tracking-[0.2em] uppercase bg-[#d4af37] text-[#120c08] rounded-sm shadow-[0_0_10px_rgba(212,175,55,0.3)]`}>
            {article.category || 'BOUNTY'}
          </span>
        </div>
      </div>

      {/* CONTENT BOX */}
      <div className={`${isCompact ? 'p-3 md:p-6' : isTall ? 'p-6 md:p-12' : 'p-6 md:p-10'} flex flex-col flex-grow bg-[#1a120b]/60 backdrop-blur-md justify-between border-t border-[#d4af37]/10 relative`}>
        {/* Burnt edge effect */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] opacity-50" />

        <div>
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <span className={`${isCompact ? 'text-[8px] md:text-[10px]' : 'text-[10px]'} font-mono text-[#d4af37]/40 uppercase tracking-widest`}>
              {new Date(article.published_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
            <div className={`h-px bg-[#d4af37]/10 flex-grow ${isCompact ? 'hidden md:block' : 'block'}`} />
            {isTall && (
              <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-widest hidden md:block">
                // CAPTAIN_ORDER
              </span>
            )}
          </div>

          <h3 className={`${isCompact ? 'text-sm md:text-lg' : isTall ? 'text-xl md:text-4xl' : 'text-xl md:text-3xl'} font-bold mb-2 md:mb-4 tracking-tight group-hover:text-[#d4af37] transition-colors leading-tight line-clamp-2 md:line-clamp-3 font-pirate`}>
            {article.title}
          </h3>

          <p className={`${isCompact ? 'hidden md:block' : 'block'} text-sm text-[#f5deb3]/60 leading-relaxed font-garamond ${isTall ? 'md:line-clamp-6' : 'line-clamp-2 md:line-clamp-3'} mb-6`}>
            {article.summary}
          </p>

          {isTall && (
            <div className="hidden md:flex flex-wrap gap-4 mt-8 pt-8 border-t border-[#d4af37]/10">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-bold text-[#f5deb3]/20 uppercase tracking-widest">Treasure Hash</span>
                <span className="text-[10px] font-mono text-[#f5deb3]/40 uppercase tracking-tighter">Gold_Ref_{article.id}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-bold text-[#f5deb3]/20 uppercase tracking-widest">Mark Authenticity</span>
                <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-tighter font-bold">Seal_Of_The_Pirate</span>
              </div>
            </div>
          )}
        </div>

        <div className={`mt-auto ${isCompact ? 'hidden md:flex' : 'flex'} pt-4 items-center justify-between group/btn border-t border-[#d4af37]/10`}>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#f5deb3]/40 group-hover:text-[#d4af37] transition-colors">
            Hunt Treasure
          </span>
          <div className="w-10 h-10 rounded-sm border border-[#d4af37]/10 flex items-center justify-center transition-all group-hover:bg-[#d4af37] group-hover:border-[#d4af37] group-hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-[#120c08] transition-colors">
              {/* Skull and Crossbones icon */}
              <circle cx="12" cy="10" r="3" />
              <path d="M10 13c-1 1-2 2-2 3v1h8v-1c0-1-1-2-2-3" />
              <path d="M4 20l4-4m12 4l-4-4m0-8l4-4M8 8L4 4" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
