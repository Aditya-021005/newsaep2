import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!hasMoved) setHasMoved(true);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, .cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mousePosition.x, springConfig);
  const cursorY = useSpring(mousePosition.y, springConfig);

  return (
    <div
      className="hidden md:block fixed inset-0 pointer-events-none z-[10000] transition-opacity duration-300"
      style={{ opacity: hasMoved ? 1 : 0 }}
    >
      {/* DOT */}
      <motion.div
        className="fixed w-2 h-2 bg-white rounded-full mix-blend-difference"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
      />
      {/* CIRCLE TRAIL */}
      <motion.div
        className="fixed w-8 h-8 border border-white/20 rounded-full"
        style={{
          left: cursorX,
          top: cursorY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          borderColor: isHovering ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
        }}
      />
    </div>
  );
};

export default CustomCursor;
