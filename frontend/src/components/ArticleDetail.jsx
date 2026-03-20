import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
const ArticleDetail = ({ article, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [lastArticle, setLastArticle] = useState(null);
  React.useEffect(() => {
    if (article) setLastArticle(article);
  }, [article]);
  const activeArticle = article || lastArticle;
  if (!activeArticle) return null;
  const content = activeArticle.content || '';
  const summary = activeArticle.summary || '';
  const wordCount = (content + ' ' + summary).split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  let dateStr = '';
  try {
    const d = new Date(activeArticle.published_date);
    dateStr = isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch { dateStr = ''; }
  const paragraphs = content.split('\n').filter(p => p.trim());
  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.focus();
      textArea.select();
    }
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  };
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = activeArticle.title || '';
    if (platform === 'twitter') window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    if (platform === 'whatsapp') window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
    if (platform === 'copy') {
      const textToCopy = `${title} — ${url}`;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
      } else {
        fallbackCopyTextToClipboard(textToCopy);
      }
    }
  };
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[20000] bg-black/95 backdrop-blur-xl"
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="fixed top-4 right-4 md:top-8 md:right-8 z-[21000] w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white text-black rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300"
            aria-label="Close article"
          >
            <span className="text-xl md:text-2xl font-light">✕</span>
          </motion.button>
          <div className="absolute inset-0 overflow-y-auto" onClick={onClose}>
            <div className="min-h-screen flex items-start justify-center p-0 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                onClick={e => e.stopPropagation()}
                className="w-full max-w-5xl bg-black border-x border-b border-white/10 overflow-hidden relative shadow-2xl"
              >
                <div className="relative h-[35vh] md:h-[50vh] overflow-hidden">
                  <img
                    src={activeArticle.image_url}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
                    <span className="px-3 py-2 md:px-5 md:py-2.5 bg-white text-black text-[10px] md:text-[11px] font-bold tracking-[0.5em] uppercase shadow-2xl">
                      {activeArticle.category || 'Archive'}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-16 lg:p-24 bg-black">
                  <div className="grid grid-cols-2 md:flex md:items-center gap-y-8 gap-x-12 mb-12 border-b border-white/10 pb-12">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/30 font-bold">Published</span>
                      <span className="text-white text-[11px] md:text-xs font-mono">{dateStr}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/30 font-bold">Read Time</span>
                      <span className="text-white text-[11px] md:text-xs font-mono">{readingTime} MIN</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/30 font-bold">ID</span>
                      <span className="text-white text-[11px] md:text-xs font-mono">#{activeArticle.id.toString().padStart(4, '0')}</span>
                    </div>
                  </div>
                  <div className="max-w-3xl mx-auto mb-16 text-center">
                    <h1 className="font-serif text-4xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-none">
                      {activeArticle.title}
                    </h1>
                    {summary && (
                      <p className="text-lg md:text-xl text-white/50 italic leading-relaxed font-medium">
                        "{summary}"
                      </p>
                    )}
                  </div>
                  <div className="max-w-2xl mx-auto prose prose-invert prose-white">
                    {paragraphs.map((para, i) => (
                      <p key={i} className="text-white/70 text-lg leading-relaxed mb-8 first-letter:text-4xl first-letter:font-serif first-letter:mr-2">
                        {para}
                      </p>
                    ))}
                  </div>
                  <div className="mt-20 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] tracking-[0.4em] uppercase text-white/20 font-bold text-center md:text-left">
                        End of Chronicle
                      </span>
                      <span className="text-[9px] text-white/10 font-mono tracking-widest uppercase">
                        Verification Secured
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      {[
                        { key: 'copy', label: copied ? 'Link Copied' : 'Copy Link' },
                        { key: 'twitter', label: 'Post' },
                        { key: 'whatsapp', label: 'Share' },
                      ].map(btn => (
                        <button
                          key={btn.key}
                          onClick={() => handleShare(btn.key)}
                          className="px-6 py-2.5 border border-white/10 text-[9px] font-bold tracking-[0.4em] uppercase text-white/40 hover:text-black transition-colors duration-300 relative overflow-hidden group/btn"
                        >
                          <span className="relative z-10 group-hover/btn:scale-105 transition-transform inline-block">
                            {btn.label}
                          </span>
                          <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
export default ArticleDetail;