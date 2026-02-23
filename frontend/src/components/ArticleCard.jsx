import React from 'react';
import { motion } from 'framer-motion';

const ArticleCard = ({ article, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="premium-card group cursor-pointer flex flex-col h-full overflow-hidden"
      onClick={() => onClick(article)}
    >
      {/* IMAGE BOX */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.image_url}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase bg-blue-600 text-white rounded-full">
            {article.category || 'DATA'}
          </span>
        </div>
      </div>

      {/* CONTENT BOX */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
            {new Date(article.published_date).toLocaleDateString()}
          </span>
          <div className="h-px bg-white/10 flex-grow" />
        </div>

        <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-blue-400 transition-colors leading-snug">
          {article.title}
        </h3>

        <p className="text-sm text-white/50 leading-relaxed line-clamp-2 mb-6 font-medium">
          {article.summary}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between group/btn">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 group-hover:text-white transition-colors">
            Read Intel
          </span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:translate-x-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
