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
    const data = Object.fromEntries(new FormData(e.target));
    try {
      await axios.post('http://localhost:8001/api/contact/', data);
      setStatus({ type: 'success', message: 'Transmission received. The chronicles will be updated shortly.' });
      e.target.reset();
    } catch {
      setStatus({ type: 'error', message: 'Transmission interrupted. Please check your connection and retry.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-32 px-6">
      <div className="container mx-auto max-w-4xl">

        {/* HEADER */}
        <header className="text-center mb-24 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 font-bold mb-4 block">
              High-Frequency Transmission · Secure Channel
            </span>
            <h1 className="font-serif text-6xl md:text-9xl font-bold tracking-tighter text-white mb-8">
              CONTACT
            </h1>
            <div className="w-16 h-px bg-white/20" />
          </motion.div>
        </header>

        {/* FORM SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

          {/* INFO */}
          <div className="md:col-span-5 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.4em] uppercase text-white font-bold">
                Correspondence
              </span>
              <p className="text-white/40 text-base leading-relaxed font-medium">
                Submit your inquiries, secure chronicles, or join the brotherhood through our official channels.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">Official Email</span>
                <span className="text-white/80 font-mono text-sm tracking-tight">chronicles@bits-apogee.org</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">Location</span>
                <span className="text-white/80 font-mono text-sm tracking-tight">BITS Pilani, Sector 7G</span>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold">Frequency Active</span>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="grid grid-cols-1 gap-12">
                <div className="flex flex-col gap-3 group">
                  <span className="text-[10px] text-white/20 group-focus-within:text-white group-focus-within:translate-x-1 uppercase tracking-[0.4em] font-bold transition-all duration-300">
                    Full Name
                  </span>
                  <div className="relative">
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white text-lg focus:outline-none focus:border-white transition-all duration-500 placeholder:text-white/5"
                      placeholder="Enter identity"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-focus-within:w-full transition-all duration-700" />
                  </div>
                </div>

                <div className="flex flex-col gap-3 group">
                  <span className="text-[10px] text-white/20 group-focus-within:text-white group-focus-within:translate-x-1 uppercase tracking-[0.4em] font-bold transition-all duration-300">
                    Archive Address
                  </span>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white text-lg focus:outline-none focus:border-white transition-all duration-500 placeholder:text-white/5"
                      placeholder="you@matrix.com"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-focus-within:w-full transition-all duration-700" />
                  </div>
                </div>

                <div className="flex flex-col gap-3 group">
                  <span className="text-[10px] text-white/20 group-focus-within:text-white group-focus-within:translate-x-1 uppercase tracking-[0.4em] font-bold transition-all duration-300">
                    The Message
                  </span>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    className="w-full bg-white/[0.02] border border-white/10 p-6 text-white text-lg focus:outline-none focus:border-white/40 focus:bg-white/[0.04] transition-all duration-500 rounded-sm placeholder:text-white/5"
                    placeholder="Compose encrypted chronicle..."
                  />
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-white text-black font-bold uppercase tracking-[0.5em] text-[11px] hover:bg-black hover:text-white border border-white transition-all duration-500 disabled:opacity-50 relative overflow-hidden group/btn"
                >
                  <span className="relative z-10 group-hover/btn:scale-110 transition-transform inline-block">
                    {loading ? 'Transmitting...' : 'Initiate Dispatch'}
                  </span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                </button>
              </div>

              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 border ${status.type === 'success' ? 'border-green-500/20 bg-green-500/5 text-green-400' : 'border-red-500/20 bg-red-500/5 text-red-400'} text-xs font-bold tracking-widest uppercase text-center`}
                >
                  {status.message}
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;