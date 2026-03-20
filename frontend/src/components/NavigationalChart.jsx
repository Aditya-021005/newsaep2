import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const nodes = [
  { x: 150, y: 150, label: 'ALPHA', id: '01' },
  { x: 450, y: 120, label: 'BETA', id: '02' },
  { x: 800, y: 180, label: 'GAMMA', id: '03' },
  { x: 250, y: 450, label: 'DELTA', id: '04' },
  { x: 700, y: 400, label: 'EPSILON', id: '05' },
];

const mobileNodes = [
  { label: 'ALPHA', id: '01', status: 'ONLINE', lat: '48.2°N', lng: '16.4°E', signal: 94 },
  { label: 'BETA', id: '02', status: 'ONLINE', lat: '35.6°N', lng: '139.7°E', signal: 87 },
  { label: 'GAMMA', id: '03', status: 'RELAY', lat: '51.5°N', lng: '0.1°W', signal: 71 },
  { label: 'DELTA', id: '04', status: 'ONLINE', lat: '40.7°N', lng: '74.0°W', signal: 98 },
  { label: 'EPSILON', id: '05', status: 'WEAK', lat: '1.3°N', lng: '103.8°E', signal: 43 },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const DesktopChart = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useGSAP(() => {
    const svg = svgRef.current;
    if (!svg) return;
    gsap.to(svg.querySelectorAll('.node-ring'), {
      scale: 2, opacity: 0, duration: 2.5,
      repeat: -1, ease: 'power2.out', stagger: 0.5,
      transformOrigin: 'center',
    });
    gsap.fromTo(svg.querySelectorAll('.connection-line'),
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 8, repeat: -1, ease: 'none' }
    );
    gsap.fromTo(svg.querySelector('.scanner-line'),
      { y: 0 },
      { y: 600, duration: 4, repeat: -1, ease: 'none' }
    );
  }, { scope: containerRef });

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
        <rect width="1000" height="600" fill="url(#grid-pattern)" />
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
        {nodes.map((node, i) => (
          <g key={i} className="cursor-crosshair">
            <circle cx={node.x} cy={node.y} r="20" className="node-ring" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx={node.x} cy={node.y} r="5" fill="white" filter="url(#glow)" />
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
              {`SYS_LINK // ${node.id}`}
            </text>
          </g>
        ))}
        <line x1="0" y1="0" x2="1000" y2="0" stroke="white" strokeWidth="1" className="scanner-line opacity-10" filter="url(#glow)" />
        <rect width="1000" height="600" fill="none" stroke="white" strokeWidth="2" className="opacity-10" />
      </svg>
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-60" />
    </div>
  );
};

const SignalBar = ({ value }) => {
  const bars = 5;
  const filled = Math.round((value / 100) * bars);
  return (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '14px' }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '3px',
            height: `${5 + i * 2}px`,
            background: i < filled ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.12)',
            borderRadius: '1px',
            transition: 'background 0.3s',
          }}
        />
      ))}
    </div>
  );
};

const MobileChart = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [tick, setTick] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const statusColor = () => '#fff';

  const time = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        background: '#000',
        fontFamily: '"Courier New", Courier, monospace',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.6) 39px, rgba(255,255,255,0.6) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.6) 39px, rgba(255,255,255,0.6) 40px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.15)',
        padding: '10px 16px 8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.2em', marginBottom: '2px' }}>NAVIGATIONAL SYSTEM</div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.15em' }}>NODE TRACKER</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: '2px' }}>SYSTEM TIME</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>{time}</div>
        </div>
      </div>

      <div style={{
        padding: '8px 16px 6px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        gap: '16px',
        position: 'relative',
        zIndex: 1,
      }}>
        {[
          { label: 'NODES', value: '5' },
          { label: 'ONLINE', value: '3' },
          { label: 'RELAY', value: '1' },
          { label: 'WEAK', value: '1' },
        ].map(({ label, value }) => (
          <div key={label}>
            <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginBottom: '1px' }}>{label}</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{value}</div>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 0 6px rgba(255,255,255,0.5)',
            opacity: tick % 2 === 0 ? 1 : 0.4,
            transition: 'opacity 0.4s',
          }} />
          <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}>LIVE</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', position: 'relative', zIndex: 1 }}>
        {mobileNodes.map((node, i) => {
          const isActive = activeNode === node.id;
          return (
            <div
              key={node.id}
              onClick={() => setActiveNode(isActive ? null : node.id)}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                padding: '12px 16px',
                cursor: 'pointer',
                background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                transition: 'background 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '28px', height: '28px',
                    border: `1px solid ${statusColor(node.status)}`,
                    borderRadius: '2px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                    flexShrink: 0,
                  }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: statusColor(node.status),
                      boxShadow: `0 0 6px ${statusColor(node.status)}`,
                    }} />
                    <div style={{
                      position: 'absolute', top: '-1px', right: '-1px',
                      width: '5px', height: '5px',
                      borderTop: `1px solid ${statusColor(node.status)}`,
                      borderRight: `1px solid ${statusColor(node.status)}`,
                    }} />
                    <div style={{
                      position: 'absolute', bottom: '-1px', left: '-1px',
                      width: '5px', height: '5px',
                      borderBottom: `1px solid ${statusColor(node.status)}`,
                      borderLeft: `1px solid ${statusColor(node.status)}`,
                    }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.2em' }}>{node.label}</div>
                    <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginTop: '1px' }}>SYS_LINK // {node.id}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <SignalBar value={node.signal} />
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '8px',
                      color: 'rgba(255,255,255,0.7)',
                      letterSpacing: '0.12em',
                      marginBottom: '2px',
                    }}>{node.status}</div>
                    <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>{node.signal}%</div>
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.2)',
                    transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}>›</div>
                </div>
              </div>

              {isActive && (
                <div style={{
                  marginTop: '12px',
                  paddingTop: '10px',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                }}>
                  {[
                    { label: 'LATITUDE', value: node.lat },
                    { label: 'LONGITUDE', value: node.lng },
                    { label: 'SIGNAL STR.', value: `${node.signal}%` },
                    { label: 'LINK TYPE', value: node.status === 'RELAY' ? 'BRIDGE' : 'DIRECT' },
                    { label: 'UPTIME', value: `${Math.floor(Math.random() * 99 + 1)}h ${Math.floor(Math.random() * 59)}m` },
                    { label: 'PROTOCOL', value: 'NAV-3.2' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', marginBottom: '3px' }}>{label}</div>
                      <div style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.8)' }}>{value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>
          TAP NODE TO EXPAND
        </div>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              width: '4px', height: '4px',
              borderRadius: '50%',
              background: i < 3 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
            }} />
          ))}
        </div>
        <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>
          v3.2.1
        </div>
      </div>
    </div>
  );
};

const NavigationalChart = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileChart /> : <DesktopChart />;
};

export default NavigationalChart;