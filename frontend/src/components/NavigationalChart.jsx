import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NavigationalChart = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useGSAP(() => {
    const svg = svgRef.current;
    if (!svg) return;

    /* ── Node pulse ── */
    gsap.to(svg.querySelectorAll('.node-ring'), {
      scale: 2, opacity: 0, duration: 2.5,
      repeat: -1, ease: 'power2.out', stagger: 0.5,
      transformOrigin: 'center',
    });

    /* ── Connection march ── */
    gsap.fromTo(svg.querySelectorAll('.connection-line'),
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 8, repeat: -1, ease: 'none' }
    );

    /* ── Scanner line ── */
    gsap.fromTo(svg.querySelector('.scanner-line'),
      { y: 0 },
      { y: 600, duration: 4, repeat: -1, ease: 'none' }
    );

  }, { scope: containerRef });

  const nodes = [
    { x: 150, y: 150, label: 'ALPHA' },
    { x: 450, y: 120, label: 'BETA' },
    { x: 800, y: 180, label: 'GAMMA' },
    { x: 250, y: 450, label: 'DELTA' },
    { x: 700, y: 400, label: 'EPSILON' },
  ];

  return (
    <div ref={containerRef} className="w-full h-full relative bg-black overflow-hidden flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* GRID */}
        <rect width="1000" height="600" fill="url(#grid-pattern)" />

        {/* CONNECTIONS */}
        <path
          d="M 150 150 L 450 120 L 800 180 L 700 400 L 250 450 Z"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="6 6"
          className="connection-line opacity-30"
          filter="url(#glow)"
        />
        <path
          d="M 450 120 L 700 400 M 150 150 L 250 450"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          className="connection-line opacity-20"
        />

        {/* NODES */}
        {nodes.map((node, i) => (
          <g key={i} className="cursor-crosshair">
            {/* Base indicator */}
            <circle cx={node.x} cy={node.y} r="20" className="node-ring" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx={node.x} cy={node.y} r="5" fill="white" filter="url(#glow)" />

            {/* Label Background */}
            <rect
              x={node.x - 30}
              y={node.y - 32}
              width="60"
              height="14"
              fill="black"
              stroke="white"
              strokeWidth="0.5"
              className="opacity-40"
            />

            <text
              x={node.x}
              y={node.y - 22}
              textAnchor="middle"
              className="font-mono text-[10px] fill-white font-bold tracking-[0.3em] uppercase"
            >
              {node.label}
            </text>
            <text
              x={node.x}
              y={node.y + 35}
              textAnchor="middle"
              className="font-mono text-[7px] fill-white/40 tracking-tighter"
            >
              {`SYS_LINK // ${node.x}.${node.y}`}
            </text>
          </g>
        ))}

        {/* SCANNER */}
        <line x1="0" y1="0" x2="1000" y2="0" stroke="white" strokeWidth="1" className="scanner-line opacity-10" filter="url(#glow)" />

        {/* OVERLAYS */}
        <rect width="1000" height="600" fill="none" stroke="white" strokeWidth="2" className="opacity-10" />
      </svg>

      {/* VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-60" />
    </div>
  );
};

export default NavigationalChart;