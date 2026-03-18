import React from 'react';

const CornerAccents = () => (
  <>
    {/* TOP LEFT */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 z-10" />
    <div className="absolute top-0 left-0 w-px h-6 bg-gradient-to-b from-white/20 to-transparent z-10" />
    <div className="absolute top-0 left-0 w-6 h-px bg-gradient-to-r from-white/20 to-transparent z-10" />

    {/* TOP RIGHT */}
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 z-10" />
    <div className="absolute top-0 right-0 w-px h-6 bg-gradient-to-b from-white/20 to-transparent z-10" />
    <div className="absolute top-0 right-0 w-6 h-px bg-gradient-to-l from-white/20 to-transparent z-10" />

    {/* BOTTOM LEFT */}
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 z-10" />
    <div className="absolute bottom-0 left-0 w-px h-6 bg-gradient-to-t from-white/20 to-transparent z-10" />
    <div className="absolute bottom-0 left-0 w-6 h-px bg-gradient-to-r from-white/20 to-transparent z-10" />

    {/* BOTTOM RIGHT */}
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 z-10" />
    <div className="absolute bottom-0 right-0 w-px h-6 bg-gradient-to-t from-white/20 to-transparent z-10" />
    <div className="absolute bottom-0 right-0 w-6 h-px bg-gradient-to-l from-white/20 to-transparent z-10" />
  </>
);

export default CornerAccents;
