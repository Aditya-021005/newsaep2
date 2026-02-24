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

      <div className="container mx-auto px-6 relative">
        {/* TREASURE MAP PATTERN (Replacing modern grid) */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#d4af37 0.5px, transparent 0.5px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
          }}
        />

        <header className="mb-20 md:mb-32 relative flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-8 leading-none glow-text font-pirate text-[#d4af37]">
              THE PIRATE'S MAP<span className="text-[#f5deb3]">.</span>
            </h1>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="h-px bg-[#d4af37] w-8 md:w-12" />
              <p className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-[#f5deb3]/40">
                Tales of the High Seas // Recorded Booty
              </p>
            </div>
          </motion.div>

          <div className="hidden lg:block shrink-0 mb-4">
            <div className="glass-panel p-6 rounded-sm flex flex-col gap-4 text-center border-[#d4af37]/30">
              <span className="text-4xl font-black text-[#d4af37] font-pirate uppercase">AEP</span>
              <div className="h-px bg-[#d4af37]/10" />
              <span className="text-[10px] font-mono text-[#f5deb3]/30 uppercase tracking-widest">Vessel_Node_77</span>
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
            {articles.length > 0 && (
              <ArticleHero
                article={articles[0]}
                onClick={setSelectedArticle}
              />
            )}

            <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 md:gap-8">
              {(() => {
                const slice = articles.slice(1);
                return slice.map((article, idx) => {
                  const remaining = slice.length - idx;
                  const posInCycle = idx % 5;

                  let desktopSpan = "lg:col-span-4";
                  let desktopRowSpan = "lg:row-span-1";
                  let mobileSpan = "col-span-1";
                  let variant = "compact";
                  let isTall = false;

                  // Pattern logic
                  if (posInCycle === 0) {
                    if (remaining === 1) {
                      desktopSpan = "lg:col-span-12";
                      variant = "full";
                    } else {
                      desktopSpan = "lg:col-span-8";
                      desktopRowSpan = "lg:row-span-2";
                      mobileSpan = "col-span-2";
                      variant = "full";
                      isTall = true;
                    }
                  } else if (posInCycle === 1) {
                    desktopSpan = "lg:col-span-4";
                    desktopRowSpan = "lg:row-span-1";
                    mobileSpan = "col-span-1";
                    variant = "compact";
                  } else if (posInCycle === 2) {
                    desktopSpan = "lg:col-span-4";
                    desktopRowSpan = "lg:row-span-1";
                    mobileSpan = "col-span-1";
                    variant = "compact";
                  } else if (posInCycle === 3) {
                    // Handle logic to avoid blank space if only 1 left in pattern
                    if (remaining === 1) {
                      desktopSpan = "lg:col-span-12";
                    } else {
                      desktopSpan = "lg:col-span-6";
                    }
                    mobileSpan = "col-span-2";
                    variant = "full";
                  } else if (posInCycle === 4) {
                    desktopSpan = "lg:col-span-6";
                    mobileSpan = "col-span-2";
                    variant = "full";
                  }

                  return (
                    <div key={article.id} className={`${mobileSpan} ${desktopSpan} ${desktopRowSpan}`}>
                      <ArticleCard
                        article={article}
                        onClick={setSelectedArticle}
                        variant={variant}
                        isTall={isTall}
                      />
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}

        {nextPage ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 p-20 glass-panel rounded-sm flex flex-col items-center text-center gap-8 relative overflow-hidden bg-[#1a120b]/40"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            <h2 className="text-4xl font-bold tracking-tight text-[#d4af37] font-pirate">Seek More Treasures</h2>
            <p className="max-w-md text-[#f5deb3]/50 text-sm leading-relaxed">
              Distant islands detected on the horizon. Signal the crew to uncover further plunder.
            </p>
            <button
              onClick={() => fetchArticles(nextPage)}
              disabled={loadingMore}
              className="premium-button mt-4"
            >
              {loadingMore ? "Sailing..." : "Seek More Treasures"}
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
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#d4af37]/20">
              End of the Map // All Plunder Claimed
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
