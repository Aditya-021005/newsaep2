import React from 'react';
import { motion } from 'framer-motion';

const StatusBlock = () => {
  return (
    <div className="premium-card rounded-3xl p-6 bg-blue-600/10 border border-blue-500/20 h-full flex flex-col justify-between overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-400">
          <path d="M12 2v20M2 12h20M12 2l10 10-10 10L2 12z" />
        </svg>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">System Pulse</span>
        </div>
        <h4 className="text-xl font-bold text-white mb-2 tracking-tight">Real-time Archive Sync</h4>
        <p className="text-xs text-white/40 font-mono leading-tight">
          {'>'} 12.4TB Indexing...<br />
          {'>'} Latency: 4ms<br />
          {'>'} Uptime: 99.98%
        </p>
      </div>

      <div className="mt-8">
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="h-full bg-blue-500"
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[8px] font-mono text-white/20 uppercase">Core Integrity</span>
          <span className="text-[8px] font-mono text-white/40">70%</span>
        </div>
      </div>
    </div>
  );
};

const NewsletterBlock = () => {
  return (
    <div className="premium-card rounded-3xl p-8 bg-white/5 border border-white/10 h-full flex flex-col justify-center items-center text-center gap-6 group hover:border-blue-500/30 transition-all duration-500">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/30 transition-all">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40 group-hover:text-blue-400">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      </div>

      <div>
        <h4 className="text-lg font-bold text-white mb-2">Neural Intel Feed</h4>
        <p className="text-sm text-white/40 max-w-[200px]">Receive encrypted updates directly to your terminal.</p>
      </div>

      <div className="w-full relative">
        <input
          type="text"
          placeholder="ENTER_DESTINATION"
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-mono focus:outline-none focus:border-blue-500/50 transition-colors uppercase tracking-widest text-center"
        />
        <button className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.3em] py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-600/20 active:scale-95">
          Execute Subscription
        </button>
      </div>
    </div>
  );
};

export { StatusBlock, NewsletterBlock };
