import React from 'react';

const StandardPDFViewer = ({ pdfUrl, title }) => {
  if (!pdfUrl) return null;

  return (
    <div className="flex flex-col w-full h-[85vh] md:max-w-7xl mx-auto bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden rounded-lg">
      <div className="bg-neutral-800 p-4 border-b border-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-[10px] tracking-widest uppercase text-white/40 font-mono">
            Secure Dispatch Protocol: {title}
          </span>
        </div>
        <div className="flex gap-4">
            <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[9px] tracking-widest uppercase text-white/60 hover:text-white transition-colors border-b border-white/10"
            >
                External View
            </a>
        </div>
      </div>
      
      <div className="flex-1 bg-neutral-950 relative overflow-hidden">
        {/* Loading Indicator behind Iframe */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
             <div className="flex flex-col items-center gap-4 text-white/10">
                <div className="w-8 h-8 border border-white/10 border-t-white animate-spin rounded-full" />
                <span className="text-[9px] tracking-[0.4em] uppercase">Reticulating Splines...</span>
            </div>
        </div>
        
        <iframe 
          src={`${pdfUrl}#view=FitH&toolbar=1&navpanes=0&scrollbar=1`}
          className="absolute inset-0 w-full h-full border-none"
          title="PDF Content"
        />
      </div>
      
      <div className="p-4 bg-neutral-900/50 border-t border-white/5 text-center">
          <p className="text-[9px] tracking-[0.2em] text-white/20 uppercase">
              End of Dispatch — Secure Transmission via Browser Engine
          </p>
      </div>
    </div>
  );
};

export default StandardPDFViewer;
