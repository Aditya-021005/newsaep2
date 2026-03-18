import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationalChart from '../components/NavigationalChart';

const StatCard = ({ label, value, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="relative flex flex-col items-center gap-4 py-8 px-6 bg-white/5 border border-white/10 rounded-sm"
  >
    <span className="text-2xl opacity-40">{icon}</span>
    <span className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-white">
      {value}
    </span>
    <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-bold">
      {label}
    </span>
  </motion.div>
);

const CrewOverlay = ({ isOpen, onClose, memberData }) => {
  const [currentYearIndex, setCurrentYearIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentYearIndex(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const nextYear = () => setCurrentYearIndex(p => (p + 1) % memberData.length);
  const prevYear = () => setCurrentYearIndex(p => (p - 1 + memberData.length) % memberData.length);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="crew-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-8 z-[99999] bg-black/95 backdrop-blur-md"
        >
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative w-full max-w-4xl bg-black border border-white/10 p-8 md:p-16 flex flex-col items-center text-center rounded-sm"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors text-xl">
              ✕
            </button>

            <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 font-bold mb-4">
              Historical Records
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tighter text-white mb-8">
              THE TEAM MANIFEST
            </h2>
            <div className="w-12 h-px bg-white/20 mb-12" />

            <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={memberData[currentYearIndex]?.year}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center"
                >
                  <span className="font-serif text-6xl md:text-8xl font-bold tracking-tighter text-white/20 mb-8 leading-none">
                    {memberData[currentYearIndex]?.year}
                  </span>
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 max-w-2xl">
                    {memberData[currentYearIndex]?.members.map((name, i) => (
                      <span key={i} className="text-white/60 text-base md:text-lg font-medium">
                        {name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-12 flex items-center gap-12">
              <button
                onClick={prevYear}
                className="text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors font-bold"
              >
                Previous
              </button>
              <div className="flex gap-2">
                {memberData.map((_, i) => (
                  <div key={i} className={`w-1 h-1 rounded-full ${i === currentYearIndex ? 'bg-white' : 'bg-white/10'}`} />
                ))}
              </div>
              <button
                onClick={nextYear}
                className="text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors font-bold"
              >
                Next
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const AboutPage = () => {
  const [memberData, setMemberData] = useState([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/members/`)
      .then(res => {
        const grouped = res.data.reduce((acc, member) => {
          const display = member.role ? `${member.name} (${member.role})` : member.name;
          const group = acc.find(g => g.year === member.year);
          if (group) group.members.push(display);
          else acc.push({ year: member.year, members: [display] });
          return acc;
        }, []);
        grouped.sort((a, b) => b.year - a.year);
        setMemberData(grouped);
      })
      .catch(err => console.error('Failed to fetch crew members:', err));
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-32 px-6">
      <div className="container mx-auto max-w-5xl">

        {/* HEADER */}
        <header className="text-center mb-24 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 font-bold mb-4 block">
              The Dedicated Team · Chronicles & Records
            </span>
            <h1 className="font-serif text-6xl md:text-9xl font-bold tracking-tighter text-white mb-8">
              THE TEAM
            </h1>
            <div className="w-16 h-px bg-white/20" />
          </motion.div>
        </header>

        {/* MISSION SECTION */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 p-12 md:p-20 text-center rounded-sm"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-bold mb-8 block">
              Our Dedication
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tighter text-white mb-8 leading-tight">
              THE ENGLISH PRESS CLUB
            </h2>
            <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed max-w-3xl mx-auto mb-12 italic">
              "As the primary chroniclers of BITS Pilani, the English Press Club is committed to documenting the evolution of campus life with precision, integrity, and depth."
            </p>
            <button
              onClick={() => setIsOverlayOpen(true)}
              className="px-10 py-4 bg-white text-black text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-white/90 transition-all"
            >
              View Full History →
            </button>
          </motion.div>
        </section>

        {/* STATS SECTION */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Total Members" value="1,200+" icon="⌘" delay={0} />
            <StatCard label="Publications" value="850+" icon="◈" delay={0.1} />
            <StatCard label="Active Status" value="Online" icon="○" delay={0.2} />
          </div>
        </section>

        {/* CHART SECTION */}
        <section>
          <div className="flex items-center gap-6 mb-8">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white font-bold">
              Real-time Analytics
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="bg-black border border-white/10 p-2 rounded-sm overflow-hidden h-[500px]">
            <NavigationalChart />
          </div>
        </section>
      </div>

      <CrewOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        memberData={memberData}
      />
    </div>
  );
};

export default AboutPage;