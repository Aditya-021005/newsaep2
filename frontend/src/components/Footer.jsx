import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0d0906] text-[#f5deb3] pt-32 pb-16 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2 space-y-8">
            <h2 className="text-4xl font-bold tracking-tight font-pirate text-[#d4af37]">
              AEP BUCCANEER
            </h2>
            <p className="max-w-xs text-sm text-[#f5deb3]/50 leading-relaxed font-medium">
              The official pirate ledger of the Apogee English Press. Chronicling the voyages of the BITS Pilani fests since time immemorial.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-[0.3em] text-[#d4af37]/40 uppercase">The Directory</h3>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
              <li><Link to="/news" className="text-[#f5deb3]/60 hover:text-[#d4af37] transition-colors">Articles</Link></li>
              <li><Link to="/about" className="text-[#f5deb3]/60 hover:text-[#d4af37] transition-colors">The Team</Link></li>
              <li><Link to="/contact" className="text-[#f5deb3]/60 hover:text-[#d4af37] transition-colors">Parley</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-[0.3em] text-[#d4af37] uppercase">The Station</h3>
            <p className="text-xs font-mono text-[#f5deb3]/30 leading-loose uppercase">
              © {new Date().getFullYear()} Apogee English Press <br />
              BITS Pilani <br />
              V4.0_PIRATE_EDITION
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#d4af37]/10 gap-4">
          <div className="flex gap-8 text-[10px] font-bold tracking-[0.3em] text-[#d4af37]/30 uppercase">
            <span>Wind Speed: 12 Knots</span>
            <span>Currents: Strong</span>
          </div>
          <div className="w-12 h-px bg-[#d4af37]/10 hidden md:block flex-grow mx-8" />
          <span className="text-[10px] font-bold tracking-[0.5em] text-[#d4af37]/10 uppercase">
            Sovereign of the Seas
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
