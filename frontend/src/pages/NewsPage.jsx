import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import ArticleHero from '../components/ArticleHero';
import ArticleDetail from '../components/ArticleDetail';
import { motion } from 'framer-motion';

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchArticles = (url = 'http://localhost:8000/api/articles/') => {
    setLoadingMore(url !== 'http://localhost:8000/api/articles/');
    axios.get(url)
      .then(res => {
        // Handle paginated response: { count, next, previous, results }
        const newArticles = Array.isArray(res.data) ? res.data : res.data.results;
        const next = res.data.next;

        setArticles(prev => url === 'http://localhost:8000/api/articles/' ? newArticles : [...prev, ...newArticles]);
        setNextPage(next);
        setLoading(false);
        setLoadingMore(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    fetchArticles();
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

      <div className="container mx-auto px-6 relative">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <header className="mb-20 md:mb-32 relative">
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
          <div className="flex flex-col gap-12">
            {/* HER0 ARTICLE */}
            {articles.length > 0 && (
              <ArticleHero
                article={articles[0]}
                onClick={setSelectedArticle}
              />
            )}

            {/* MOSAIC GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
              {articles.slice(1).map((article, idx) => {
                // Optimized 7-item cycle for perfectly balanced rows
                let spanClass = "lg:col-span-4";
                const cyclePos = idx % 7;

                if (cyclePos === 0) spanClass = "lg:col-span-8"; // Row 1 Start (8)
                if (cyclePos === 1) spanClass = "lg:col-span-4"; // Row 1 End (4)
                if (cyclePos >= 2 && cyclePos <= 4) spanClass = "lg:col-span-4"; // Row 2 (4+4+4)
                if (cyclePos === 5 || cyclePos === 6) spanClass = "lg:col-span-6"; // Row 3 (6+6)

                return (
                  <div key={article.id} className={spanClass}>
                    <ArticleCard
                      article={article}
                      onClick={setSelectedArticle}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {nextPage ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 p-20 glass-panel rounded-3xl flex flex-col items-center text-center gap-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
            <h2 className="text-3xl font-bold tracking-tight">Expand Index</h2>
            <p className="max-w-md text-white/50 text-sm leading-relaxed">
              Additional intelligence clusters detected. Synchronize for deeper archival immersion.
            </p>
            <button
              onClick={() => fetchArticles(nextPage)}
              disabled={loadingMore}
              className="premium-button mt-4"
            >
              {loadingMore ? "Synchronizing..." : "Load More Archives"}
              {!loadingMore && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
              )}
            </button>
          </motion.div>
        ) : !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 p-12 text-center"
          >
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20">
              End of Archival Stream // All Intelligence Synchronized
            </p>
          </motion.div>
        )}
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
