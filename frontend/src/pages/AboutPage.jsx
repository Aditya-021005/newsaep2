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
            className="text-5xl sm:text-7xl md:text-[12vw] leading-[0.8] mb-12 font-bold tracking-tighter glow-text break-words"
          >
            THE<br />MANIFESTO<span className="text-blue-600">.</span>
          </motion.h1>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full -z-10" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 glass-panel p-12 md:p-16 rounded-[2rem] space-y-10"
          >
            <h2 className="text-4xl font-bold tracking-tight text-blue-500">Our Logic</h2>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed font-medium">
              <p>
                Tradition is a slow death. We choose the Monolith. We believe in data without filters, interfaces without friction, and stories without compromise.
              </p>
              <p>
                AEP News is not a publication. It is an archive of the present. Every bit of data is scrutinized, every pixel is calculated. We are the industrial hub of information.
              </p>
            </div>
            <button className="premium-button">Initialize Link</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div className="glass-panel p-12 rounded-[2rem] space-y-8 flex-grow">
              <h3 className="text-xl font-bold tracking-tight">System Metrics</h3>
              <div className="space-y-8">
                {[
                  { label: 'Node Count', value: '1,204' },
                  { label: 'Data Throughput', value: '8.4 GB/s' },
                  { label: 'Uptime Percent', value: '99.99%' },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4">
                    <span className="font-mono text-[10px] uppercase font-bold text-white/30 tracking-widest">{stat.label}</span>
                    <span className="font-bold text-2xl text-blue-500">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center font-bold tracking-[0.2em] uppercase text-xs text-indigo-400">
              Protocol_V4.0_Stable
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
