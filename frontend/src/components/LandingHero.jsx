import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const LandingHero = ({ total = 0 }) => {
  const word = "CHRONICLES";
  const containerRef = useRef(null);
  const tickerRef = useRef(null);
  const lineRef = useRef(null);
  const counterRef = useRef(null);
  const headlineRef = useRef(null);
  const metaRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(tickerRef.current, {
        x: '-50%',
        duration: 22,
        ease: 'none',
        repeat: -1,
      });
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.6, delay: 1.4, ease: 'power4.inOut', transformOrigin: 'left center' }
      );
      gsap.to(headlineRef.current, {
        y: -100,
        opacity: 0,
        filter: 'blur(20px)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      gsap.to(tickerRef.current.parentElement, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '30% top',
          scrub: true,
        }
      });
      gsap.to(metaRef.current, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []); 
  useEffect(() => {
    if (total === 0) return;
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 1,
        duration: 2.2,
        delay: 0.5, 
        ease: 'power2.out',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.floor(obj.val * total)).padStart(4, '0');
          }
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [total]);
  const tickerItems = Array(4).fill([
    'Breaking — New edition now live', 'Editorial', 'World',
    'Culture', 'Opinion', 'Science', 'Technology', 'Archives',
  ]).flat();
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,400&family=DM+Sans:wght@400;500&display=swap');
        .hero-root {
          font-family: 'DM Sans', sans-serif;
          background: #000;
          color: #fff;
        }
        .ticker-wrap {
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          flex-shrink: 0;
        }
        .ticker-inner {
          display: flex;
          white-space: nowrap;
          width: max-content;
        }
        .ticker-item {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 9px 32px;
          font-weight: 500;
          color: rgba(255,255,255,0.35);
        }
        .ticker-item::after {
          content: '·';
          margin-left: 32px;
          opacity: 0.25;
        }
        .divider {
          height: 1px;
          background: rgba(255,255,255,0.15);
          transform-origin: left center;
          flex-shrink: 0;
        }
        .headline {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #fff;
          white-space: nowrap;
          font-size: clamp(36px, 11.25vw, 148px);
        }
        .headline-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
          color: rgba(255,255,255,0.45);
          font-size: clamp(20px, 5.5vw, 72px);
          line-height: 1.1;
        }
        .meta {
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 500;
          color: rgba(255,255,255,0.28);
        }
        .badge {
          border: 1px solid rgba(255,255,255,0.18);
          padding: 5px 12px;
          font-size: 8px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 500;
          color: rgba(255,255,255,0.35);
          flex-shrink: 0;
        }
        .scroll-line {
          width: 1px;
          height: 36px;
          background: rgba(255,255,255,0.25);
          transform-origin: top center;
          flex-shrink: 0;
        }
        .col-rule {
          width: 1px;
          background: #fff;
          opacity: 0.04;
          position: absolute;
          top: 0; bottom: 0;
          pointer-events: none;
        }
      `}</style>
      <div
        ref={containerRef}
        className="hero-root relative flex flex-col overflow-hidden select-none"
        style={{ minHeight: '100svh' }}
      >
        <div className="col-rule" style={{ left: '33.33%' }} />
        <div className="col-rule" style={{ left: '66.66%' }} />
        <div className="shrink-0" style={{ height: '90px' }} />
        <div className="ticker-wrap">
          <div ref={tickerRef} className="ticker-inner">
            {tickerItems.map((item, i) => (
              <span key={i} className="ticker-item">{item}</span>
            ))}
          </div>
        </div>
        <div
          className="relative z-10 flex flex-col justify-center flex-1 px-6 md:px-14"
          style={{ paddingTop: '6vh', paddingBottom: '4vh' }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="meta">Official Record</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="badge">New</div>
          </motion.div>
          <div className="overflow-hidden mb-1" ref={headlineRef}>
            <motion.div
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="headline">{word}</span>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '5vh' }}
          >
            <span className="headline-italic">of record.</span>
          </motion.div>
          <div ref={lineRef} className="divider" style={{ marginBottom: '4vh' }} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.8 }}
            className="flex items-end justify-between"
          >
            <span className="meta">Record · Verify · Transmit</span>
            <div className="flex flex-col items-end gap-2">
              <span className="meta">Scroll</span>
              <motion.div
                className="scroll-line"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 2.1, duration: 0.7, ease: 'circOut' }}
              />
            </div>
          </motion.div>
        </div>
        <motion.div
          ref={metaRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 0.6 }}
          className="shrink-0 px-6 md:px-14 py-3 flex items-center justify-between flex-wrap gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <span className="meta">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
          <span className="meta">
            Vol. I — Issue <span ref={counterRef}>0000</span>
          </span>
        </motion.div>
      </div>
    </>
  );
};
export default LandingHero;