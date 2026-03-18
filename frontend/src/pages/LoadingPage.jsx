import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LOG_ENTRIES = [
  'Initializing archives...',
  'Retrieving latest chronicles...',
  'Verifying records...',
  'Finalizing dispatch...',
  'Optimizing streams...',
  'AEP_CORE: Ready',
];

const HEX_Diagnostic = () => {
  const [hex, setHex] = useState('0x0000');
  useEffect(() => {
    const i = setInterval(() => {
      setHex(`0x${Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0')}`);
    }, 150);
    return () => clearInterval(i);
  }, []);
  return <span className="text-[7px] font-mono text-white/5">{hex}</span>;
}

const LoadingPage = () => {
  const navigate = useNavigate();
  const [logIndex, setLogIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [progress, setProgress] = useState(0);

  // REAL 0-100 PROGRESS WITH VARIABLE SPEED
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Vary the jump size for a "processing" feel
      const jump = Math.random() < 0.2 ? Math.random() * 8 : Math.random() * 2;
      current = Math.min(current + jump, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => navigate('/news'), 500);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [navigate]);

  // TYPING LOGS
  useEffect(() => {
    const entry = LOG_ENTRIES[logIndex] || '';
    let i = 0;
    const t = setInterval(() => {
      setDisplayText(entry.slice(0, i + 1));
      i++;
      if (i >= entry.length) {
        clearInterval(t);
        setTimeout(() => {
          setLogIndex(prev => (prev + 1) % LOG_ENTRIES.length);
        }, 800);
      }
    }, 30);
    return () => clearInterval(t);
  }, [logIndex]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[2000] overflow-hidden">

      {/* CORNER DIAGNOSTICS */}
      <div className="absolute top-8 left-8 flex flex-col">
        <span className="text-[8px] tracking-widest uppercase text-white/10 font-bold mb-1">System status</span>
        <div className="flex gap-4">
          <HEX_Diagnostic />
          <HEX_Diagnostic />
          <HEX_Diagnostic />
        </div>
      </div>

      {/* BACKGROUND GRID OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

      <div className="w-full max-w-md px-10 flex flex-col gap-10 relative z-10">

        {/* LOGO SECTION */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex overflow-hidden relative">
            {"AEP".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.4, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-8xl font-bold text-white px-2 italic tracking-tighter"
              >
                {char}
              </motion.span>
            ))}
          </div>
          <div className="h-[2px] w-16 bg-white/20 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-white"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        {/* PROGRESS BLOCK */}
        <div className="flex flex-col gap-5 mt-4">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[7px] tracking-[0.6em] uppercase text-white/20 font-bold">Process Log</span>
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-white italic min-h-[1em]">
                {displayText}
              </span>
            </div>
            <span className="text-xl font-serif italic text-white/80 tabular-nums">
              {Math.floor(progress).toString().padStart(3, '0')}
            </span>
          </div>

          <div className="relative">
            {/* MAIN PROGRESS BAR */}
            <div className="h-1 w-full bg-white/5 relative overflow-hidden border border-white/10">
              <motion.div
                className="absolute left-0 top-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>

            {/* SECONDARY GHOST BAR (SHADOW) */}
            <div className="h-px w-full bg-transparent mt-2 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-white/30"
                animate={{ width: `${progress * 1.1}%` }} // Slightly faster ghost
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM TAG */}
        <div className="flex flex-col items-center gap-2">
          <motion.span
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-[9px] tracking-[0.8em] uppercase text-white/30 font-medium"
          >
            Archive Protocol Alpha
          </motion.span>
          <div className="flex gap-1.5 opacity-10">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-1 bg-white" />)}
          </div>
        </div>
      </div>

      {/* FOOTER Diagnostic */}
      <div className="absolute bottom-8 right-8 text-[8px] font-mono text-white/10 tracking-widest uppercase flex gap-8">
        <span>VER: 1.0.4-CLONE</span>
        <span>AEP_CORE_SYNC: ACTIVE</span>
      </div>
    </div>
  );
};

export default LoadingPage;