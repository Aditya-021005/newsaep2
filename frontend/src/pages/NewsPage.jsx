import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import ArticleDetail from '../components/ArticleDetail';
import { motion } from 'framer-motion';

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/articles/')
      .then(res => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* MARQUEE */}
      <div className="w-full bg-white/5 border-y border-white/5 overflow-hidden mb-20 backdrop-blur-sm">
        <div className="animate-monolith-marquee py-3 flex items-center">
          {[1, 2, 3, 4, 1, 2, 3, 4].map((i, idx) => (
            <span key={idx} className="marquee-item whitespace-nowrap">
              AEP_INTEL_FEED // PRIORITY_DATA_STREAM // GLOBAL_ARCHIVE_ACCESS // V4.0_MODERN_CORE
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        <header className="mb-20 md:mb-24 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] glow-text break-words">
              THE<br />ARCHIVE<span className="text-blue-600">.</span>
            </h1>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="h-px bg-blue-600 w-8 md:w-12" />
              <p className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">
                Verified Intelligence Stream
              </p>
            </div>
          </motion.div>

          <div className="absolute top-0 right-0 hidden lg:block">
            <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 text-center">
              <span className="text-4xl font-black text-blue-500">AEP</span>
              <div className="h-px bg-white/10" />
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Sys_Node_01</span>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i, idx) => (
              <div key={idx} className="h-[450px] bg-white/5 border border-white/10 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={setSelectedArticle}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 p-20 glass-panel rounded-3xl flex flex-col items-center text-center gap-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
          <h2 className="text-3xl font-bold tracking-tight">End of Index</h2>
          <p className="max-w-md text-white/50 text-sm leading-relaxed">
            You have reached the end of the current briefing. Initialize deep scan for legacy records or check back for live updates.
          </p>
          <button className="premium-button mt-4">
            Reload Archives
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            </svg>
          </button>
        </motion.div>
      </div>

      <ArticleDetail
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
};

export default NewsPage;
