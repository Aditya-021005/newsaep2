import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-40 pb-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <header className="relative mb-20 md:mb-32">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] leading-none mb-12 font-bold tracking-tighter glow-text font-pirate text-[#d4af37]"
          >
            THE TEAM<span className="text-[#f5deb3]">.</span>
          </motion.h1>
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 blur-[60px] rounded-full -z-10" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-12 glass-panel p-12 md:p-16 rounded-sm space-y-10 border-[#d4af37]/20"
          >
            <h2 className="text-4xl font-bold tracking-tight text-[#d4af37] font-pirate uppercase">The English Press Club</h2>
            <div className="space-y-6 text-xl text-[#f5deb3]/70 leading-relaxed font-garamond">
              <p>
                As the sovereign chroniclers of BITS Pilani, the English Press Club stands watch over the high seas of campus life. When the Great Voyage of Apogee begins, our crew is ready to document every battle, every discovery, and every tale worth telling.
              </p>
              <p>
                AEP Buccaneer is our digital ledger—a repository of the raw truth plundered from the heart of the fest. We don't just report; we capture the spirit of the voyage.
              </p>
            </div>
            <button className="premium-button">Summon the Club</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-12 flex flex-col gap-8"
          >
            <div className="glass-panel p-12 rounded-sm space-y-8 flex-grow border-[#d4af37]/10">
              <h3 className="text-2xl font-bold tracking-tight font-pirate text-[#d4af37] uppercase">Voyage Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: 'Crew Size', value: '1,204' },
                  { label: 'Loot Weight', value: '8.4 Tons' },
                  { label: 'Wave Resistance', value: '99.9%' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-2 border-b md:border-b-0 md:border-r border-[#d4af37]/10 pb-4 md:pb-0 md:pr-8 last:border-0">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#f5deb3]/30 tracking-widest">{stat.label}</span>
                    <span className="font-bold text-4xl text-[#d4af37] font-pirate">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-sm bg-amber-900/10 border border-amber-900/20 flex items-center justify-center font-bold tracking-[0.4em] uppercase text-xs text-[#d4af37]/60">
              Pirate_Protocol_V4.0_Stable
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000"
            alt="Hardware"
            className="w-full h-[500px] object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
