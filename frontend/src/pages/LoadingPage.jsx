import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/news');
    }, 2400);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[1000] p-8 overflow-hidden">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="w-full max-w-sm relative z-10 space-y-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-[0.2em] glow-text">AEP_CORE</h1>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <span className="text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase">Initializing Archives</span>
          </div>
        </motion.div>

        <div className="w-full h-px bg-white/5 relative overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent w-1/2"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-y-4 font-mono text-[9px] uppercase font-bold text-white/20"
        >
          <div className="text-left">V4.0.0_STABLE</div>
          <div className="text-right">SRC: SECURE_CORE</div>
          <div className="text-left">AUTH: VERIFIED</div>
          <div className="text-right">INTEL: LOADING</div>
        </motion.div>
      </div>

      <div className="absolute bottom-16">
        <span className="text-[9px] font-bold tracking-[0.8em] text-white/10 uppercase">
          Monolith Systems // Hub_Release
        </span>
      </div>
    </div>
  );
};

export default LoadingPage;
