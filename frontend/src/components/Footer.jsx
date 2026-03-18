import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/api/articles/')
      .then(res => {
        const articles = Array.isArray(res.data) ? res.data : res.data.results;
        setHeadlines((articles || []).slice(0, 8).map(a => a.title));
      })
      .catch(() => setHeadlines([
        'Archives of the English Press',
        'Chronicles of Campus Life',
        'Milestones and Memories',
        'The Voice of the Students',
        'Journalism with Precision',
      ]));
  }, []);

  return (
    <footer className="w-full bg-black text-white border-t border-white/10 pt-12 md:pt-16 pb-8 md:pb-12">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* TOP SECTION: TICKER */}
        <div className="mb-8 md:mb-16 overflow-hidden py-4 border-y border-white/5 relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

          <div className="flex whitespace-nowrap animate-ticker">
            {[...headlines, ...headlines].map((text, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-8 text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION: GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-8 md:mb-16">

          {/* BRAND */}
          <div className="md:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-serif text-3xl font-bold tracking-tighter">
                AEP CHRONICLES
              </span>
              <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 font-medium">
                Official Journal of Apogee English Press
              </span>
            </div>
            <p className="text-white/40 text-sm max-w-sm leading-relaxed">
              Dedicated to recording the stories and milestones of BITS Pilani with excellence and integrity.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div className="px-3 py-1 border border-white/10 text-[9px] font-mono text-white/30 uppercase tracking-widest">
                Est. 2026
              </div>
              <div className="px-3 py-1 border border-white/10 text-[9px] font-mono text-white/30 uppercase tracking-widest">
                v4.0.0
              </div>
            </div>
          </div>

          {/* NAV LINKS */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white font-bold">
              Navigation
            </span>
            <nav className="flex flex-col gap-4">
              {[
                { name: 'Articles', path: '/news' },
                { name: 'The Team', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-white/40 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* INFO */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white font-bold">
              Headquarters
            </span>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-white/30 uppercase tracking-widest">Location</span>
                <span className="text-xs text-white/60">BITS Pilani, Rajasthan</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-white/30 uppercase tracking-widest">Contact</span>
                <span className="text-xs text-white/60">press@bits-apogee.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: COPYRIGHT */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-center md:text-left">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">
            © {new Date().getFullYear()} APOGEE ENGLISH PRESS. All Rights Reserved.
          </span>
          <div className="flex items-center gap-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/20 hover:text-white/40 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/20 hover:text-white/40 cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;