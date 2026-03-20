import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import ArticleHero from '../components/ArticleHero';
import ArticleDetail from '../components/ArticleDetail';
import { SkeletonCard, SkeletonHero } from '../components/SkeletonLoader';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSearchParams } from 'react-router-dom';
import LandingHero from '../components/LandingHero';

gsap.registerPlugin(ScrollTrigger);

const NewsPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const categoryFilter = searchParams.get('category');

  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedArticle, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const containerRef = useRef(null);

  const fetchArticles = (url = null) => {
    const isInitial = !url;
    let targetUrl = url || `${import.meta.env.VITE_API_BASE_URL || '/api'}/articles/`;

    // Add filtering params to initial fetch
    if (isInitial) {
      const p = new URLSearchParams();
      if (searchQuery) p.append('search', searchQuery);
      if (categoryFilter) p.append('category', categoryFilter);
      const queryString = p.toString();
      if (queryString) targetUrl += `?${queryString}`;
    }

    setLoading(isInitial);
    setLoadingMore(!isInitial);

    axios.get(targetUrl)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.results;
        setArticles(prev => isInitial ? data : [...prev, ...data]);
        setTotalCount(res.data.count || data.length);
        setNextPage(res.data.next ?? null);
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
  }, [searchQuery, categoryFilter]);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      { }
      <div className="absolute left-[5%] arch-line-v opacity-50" />
      <div className="absolute right-[5%] arch-line-v opacity-50" />

      {(!searchQuery && !categoryFilter) && <LandingHero total={totalCount} />}

      <div className={`container mx-auto px-4 sm:px-6 relative pb-20 ${(searchQuery || categoryFilter) ? 'pt-40' : 'pt-32'}`}>

        { }
        {(searchQuery || categoryFilter) && (
          <div className="mb-16 flex flex-col gap-4">
            <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 font-bold">
              Secure Search Results
            </span>
            <div className="flex items-end justify-between border-b border-white/10 pb-8">
              <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tighter text-white">
                {searchQuery ? `"${searchQuery}"` : categoryFilter}
              </h2>
              <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest pb-2">
                {articles.length} RECAPS FOUND
              </span>
            </div>
          </div>
        )}
        {loading ? (
          <div className="flex flex-col gap-12">
            <SkeletonHero />
            <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 md:gap-8">
              <div className="col-span-2 lg:col-span-8 lg:row-span-2"><SkeletonCard variant="full" isTall /></div>
              <div className="col-span-1 lg:col-span-4"><SkeletonCard variant="compact" /></div>
              <div className="col-span-1 lg:col-span-4"><SkeletonCard variant="compact" /></div>
              <div className="col-span-2 lg:col-span-6"><SkeletonCard variant="full" /></div>
              <div className="col-span-2 lg:col-span-6"><SkeletonCard variant="full" /></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {articles.length > 0 && <ArticleHero article={articles[0]} onClick={setSelected} />}
            <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-8 article-grid">
              {(() => {
                const slice = articles.slice(1);
                return slice.map((article, idx) => {
                  const remaining = slice.length - idx;
                  const pos = idx % 5;
                  let dSpan = 'lg:col-span-4', dRow = 'lg:row-span-1', mSpan = 'col-span-1', variant = 'compact', isTall = false;
                  if (pos === 0) {
                    if (remaining === 1) { dSpan = 'lg:col-span-12'; mSpan = 'col-span-2'; variant = 'full'; }
                    else { dSpan = 'lg:col-span-8'; dRow = 'lg:row-span-2'; mSpan = 'col-span-2'; variant = 'full'; isTall = true; }
                  } else if (pos === 1) { dSpan = 'lg:col-span-4'; mSpan = 'col-span-1'; }
                  else if (pos === 2) { dSpan = 'lg:col-span-4'; mSpan = 'col-span-1'; }
                  else if (pos === 3) { dSpan = remaining === 1 ? 'lg:col-span-12' : 'lg:col-span-6'; mSpan = remaining === 1 ? 'col-span-2' : 'col-span-2 md:col-span-1 lg:col-span-6'; variant = 'full'; }
                  else if (pos === 4) { dSpan = 'lg:col-span-6'; mSpan = 'col-span-2 md:col-span-1 lg:col-span-6'; variant = 'full'; }
                  return (
                    <motion.div
                      key={article.id}
                      className={`${mSpan} ${dSpan} ${dRow} article-grid-item`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                    >
                      <ArticleCard article={article} onClick={setSelected} variant={variant} isTall={isTall} />
                    </motion.div>
                  );
                });
              })()}
            </div>
          </div>
        )}

        {nextPage ? (
          <div className="mt-20 flex flex-col items-center gap-8">
            <div className="w-full max-w-2xl h-px bg-white/10" />
            <button
              onClick={() => fetchArticles(nextPage)}
              disabled={loadingMore}
              className="px-12 py-4 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white/90 transition-all disabled:opacity-50"
            >
              {loadingMore ? 'Loading...' : 'Load More Articles'}
            </button>
          </div>
        ) : !loading && (
          <div className="mt-20 py-10 text-center text-white/20 text-[10px] uppercase tracking-[0.5em]">
            End of Chronicles
          </div>
        )}
      </div>

      <ArticleDetail article={selectedArticle} isOpen={!!selectedArticle} onClose={() => setSelected(null)} />
    </div>
  );
};

export default NewsPage;