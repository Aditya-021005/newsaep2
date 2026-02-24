import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Pirate3D from '../components/Pirate3D';
import SmallCompass3D from '../components/SmallCompass3D';

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/news');
    }, 2400);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-[#120c08] flex flex-col items-center justify-center z-[1000] p-8 overflow-hidden">
      {/* 3D BACKGROUND LAYER */}
      <Pirate3D />

      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="w-full max-w-sm relative z-10 space-y-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Focused 3D Element */}
          <div className="scale-150">
            <SmallCompass3D />
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-[0.1em] text-[#d4af37] font-pirate glow-text">AEP BUCCANEER</h1>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-ping shadow-[0_0_10px_#d4af37]" />
              <span className="text-[10px] font-bold tracking-[0.5em] text-[#f5deb3]/40 uppercase font-mono">Hoisting Sails & Chronicling the Voyage</span>
            </div>
          </div>
        </motion.div>

        <div className="w-full h-px bg-[#d4af37]/20 relative overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent w-full opacity-50"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 gap-y-4 font-mono text-[9px] uppercase font-bold text-[#f5deb3]/20"
        >
          <div className="text-left">VESSEL: EPIC_BITS</div>
          <div className="text-right">WIND: 15 KNOTS</div>
          <div className="text-left">CREW: EPC_PILANI</div>
          <div className="text-right">MAP: UNROLLED</div>
        </motion.div>
      </div>

      <div className="absolute bottom-16 text-center opacity-30">
        <span className="text-[9px] font-bold tracking-[0.8em] text-[#d4af37] uppercase">
          Apogee English Press // The Pirate Ledger
        </span>
      </div>
    </div>
  );
};

export default LoadingPage;
