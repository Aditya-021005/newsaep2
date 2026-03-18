import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import CornerAccents from './CornerAccents';

const ArticleHero = ({ article, onClick }) => {
  if (!article) return null;

  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), { stiffness: 200, damping: 40 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 40 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); setHovered(false); };

  const date = new Date(article.published_date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <motion.div
      className="w-full mb-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(article)}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative cursor-pointer bg-white/5 border border-white/10 overflow-hidden flex flex-col md:flex-row min-h-[500px] md:h-[600px] rounded-sm group"
      >
        <CornerAccents />
        {/* IMAGE PANEL */}
        <div className="w-full md:w-1/2 relative overflow-hidden h-64 md:h-full">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover grayscale transition-transform duration-700"
            style={{
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              filter: hovered ? 'grayscale(0%)' : 'grayscale(100%) brightness(0.7)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

          <div className="absolute top-8 left-8">
            <span className="bg-white text-black text-[10px] font-bold tracking-widest uppercase px-4 py-2">
              {article.category || 'Featured'}
            </span>
          </div>
        </div>

        {/* CONTENT PANEL */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-12 relative z-10">
          <div className="mb-6">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-bold mb-4 block">
              Most Recent Dispatch
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tighter text-white leading-none mb-6 hover-glitch">
              {article.title}
            </h2>
            <div className="w-16 h-px bg-white/20 mb-6" />
            <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed line-clamp-3">
              {article.summary}
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            <div className="flex items-center gap-6 text-[10px] tracking-widest uppercase text-white/40">
              <div className="flex flex-col gap-1">
                <span>Date Published</span>
                <span className="text-white font-mono">{date}</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col gap-1">
                <span>Article ID</span>
                <span className="text-white font-mono">#{article.id}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ x: 10 }}
              className="group flex items-center gap-4 text-white text-[11px] font-bold tracking-[0.3em] uppercase mt-4"
            >
              Read Full Chronicles
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Subtle Shine Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ArticleHero;