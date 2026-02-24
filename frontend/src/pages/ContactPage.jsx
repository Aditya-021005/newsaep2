import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      await axios.post('http://localhost:8000/api/contact/', data);
      setStatus({ type: 'success', message: 'The bird has returned. Your message is safely plundered.' });
      e.target.reset();
    } catch (err) {
      setStatus({ type: 'error', message: 'Rough seas ahead. The relay was lost to the depths.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* INFO SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none glow-text font-pirate text-[#d4af37]">
              PARLEY<span className="text-[#f5deb3]">.</span>
            </h1>
            <p className="max-w-md text-lg text-[#f5deb3]/50 leading-relaxed font-garamond italic">
              A secure channel for secret maps, bounty inquiries, or requests to join the brotherhood of the high seas.
            </p>

            <div className="space-y-8 pt-12">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#d4af37]">Carrier Bird Point</span>
                <p className="text-2xl font-bold tracking-tight text-[#f5deb3]">captain@aep_buccaneer.org</p>
              </div>

              <div className="flex gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-sm bg-amber-900/10 border border-amber-900/20 flex items-center justify-center hover:bg-amber-900/20 transition-colors cursor-pointer">
                    <div className="w-1.5 h-1.5 bg-[#d4af37]/40 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FORM SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-8 md:p-12 rounded-sm relative overflow-hidden bg-[#1a120b]/40 border-[#d4af37]/20"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/5 blur-[50px] -z-10" />

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]/40 ml-4 font-mono">Pirate Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="e.g. Blackbeard"
                  required
                  className="premium-input bg-black/20"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]/40 ml-4 font-mono">Carrier Bird Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="pirate@tortuga.com"
                  required
                  className="premium-input bg-black/20"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]/40 ml-4 font-mono">The Scroll</label>
                <textarea
                  name="message"
                  placeholder="Write your parley requests here..."
                  rows="4"
                  required
                  className="premium-input resize-none bg-black/20"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full premium-button h-16 text-lg"
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-[#120c08]/30 border-t-[#120c08] rounded-full animate-spin" />
                ) : (
                  "Send the Bird"
                )}
              </button>
            </form>

            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-8 p-6 rounded-2xl text-sm font-medium flex items-center gap-4 ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
              >
                <div className={`w-2 h-2 rounded-full ${status.type === 'success' ? 'bg-green-400' : 'bg-red-400'}`} />
                {status.message}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
