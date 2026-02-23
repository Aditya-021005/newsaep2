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
      setStatus({ type: 'success', message: 'Uplink established. Data transmitted successfully.' });
      e.target.reset();
    } catch (err) {
      setStatus({ type: 'error', message: 'Relay failure. Connection interrupted.' });
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
            <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none glow-text">
              CONNECT<br />UPLINK<span className="text-blue-600">.</span>
            </h1>
            <p className="max-w-md text-lg text-white/50 leading-relaxed font-medium">
              Secure communication channel for data submission, editorial inquiries, or archival access requests.
            </p>

            <div className="space-y-8 pt-12">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-blue-500">Direct Relay</span>
                <p className="text-2xl font-bold tracking-tight">hq_core@aep_hub.net</p>
              </div>

              <div className="flex gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FORM SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[50px] -z-10" />

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-4">Identity Tag</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  required
                  className="premium-input"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-4">Relay Protocol</label>
                <input
                  name="email"
                  type="email"
                  placeholder="name@domain.com"
                  required
                  className="premium-input"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-4">Data Payload</label>
                <textarea
                  name="message"
                  placeholder="Input broadcast message..."
                  rows="4"
                  required
                  className="premium-input resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full premium-button h-16 text-lg"
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Initiate Uplink"
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
