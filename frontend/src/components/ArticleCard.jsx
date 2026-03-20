import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import CornerAccents from './CornerAccents';
const ArticleCard = ({ article, onClick, variant = 'full', isTall = false }) => {
  const isCompact = variant === 'compact';
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };
  const date = new Date(article.published_date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(article)}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full flex flex-col bg-white/5 border border-white/10 overflow-hidden cursor-pointer rounded-sm group"
      >
        <CornerAccents />
        <div className={`relative overflow-hidden shrink-0 ${isCompact ? 'aspect-[16/10]' : 'aspect-video'}`}>
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover grayscale transition-all duration-500"
            style={{
              filter: hovered ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.6)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white text-black text-[8px] font-bold tracking-[0.4em] uppercase px-3 py-1.5 shadow-2xl">
              {article.category || 'Archive'}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-mono text-white/40 tracking-widest">
              {date}
            </span>
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] font-mono text-white/40">
              #{article.id}
            </span>
          </div>
          <h3 className={`font-serif font-bold text-white tracking-tight leading-tight mb-4 hover-glitch ${isCompact ? 'text-xl line-clamp-2' : 'text-2xl line-clamp-2'
            }`}>
            {article.title}
          </h3>
          {!isCompact && (
            <p className="text-white/40 text-sm line-clamp-3 mb-6">
              {article.summary}
            </p>
          )}
          <div className="mt-auto pt-4 flex items-center gap-4 overflow-hidden">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white whitespace-nowrap group-hover:translate-x-2 transition-transform duration-300">
              Explore →
            </span>
            <div className={`h-[1px] bg-white/20 transition-all duration-500 origin-left flex-1 ${hovered ? 'scale-x-100 opacity-60' : 'scale-x-0 opacity-0'}`} />
          </div>
        </div>
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0"
          animate={{ opacity: hovered ? 1 : 0 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};
export default ArticleCard;