import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#050505] text-white pt-32 pb-16 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold tracking-tight">
              AEP<span className="text-blue-500">NEWS</span>
            </h2>
            <p className="max-w-xs text-sm text-white/50 leading-relaxed font-medium">
              The definitive digital archive for modern intelligence. Curated data, refined presentation, uncompromising accuracy.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest text-white/30 uppercase">Directory</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/news" className="text-white/60 hover:text-blue-500 transition-colors">Archive</Link></li>
              <li><Link to="/about" className="text-white/60 hover:text-blue-500 transition-colors">Manifesto</Link></li>
              <li><Link to="/contact" className="text-white/60 hover:text-blue-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest text-blue-500 uppercase">Station</h3>
            <p className="text-xs font-mono text-white/30 leading-loose">
              © {new Date().getFullYear()} AEP_HUB_SYS <br />
              All rights reserved. <br />
              V4.0_MODERN_RELEASE
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <div className="flex gap-8 text-[10px] font-bold tracking-widest text-white/20 uppercase">
            <span>Uptime: 99.9%</span>
            <span>Latency: 24ms</span>
          </div>
          <div className="w-12 h-px bg-white/10 hidden md:block flex-grow mx-8" />
          <span className="text-[10px] font-bold tracking-[0.3em] text-white/10 uppercase">
            Monolith Core Systems
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
