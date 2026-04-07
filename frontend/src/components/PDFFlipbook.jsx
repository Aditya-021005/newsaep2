import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="bg-neutral-900 w-full h-full shadow-2xl relative overflow-hidden" ref={ref} data-density="hard">
      <div className="absolute inset-0 border-[12px] border-neutral-800" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-1 bg-white/20 mb-8" />
        <h2 className="text-white font-serif text-3xl font-bold tracking-tighter mb-4 leading-tight">
            {props.title}
        </h2>
        <span className="text-white/40 text-[10px] tracking-[0.6em] uppercase font-bold">
            {props.event} {props.year}
        </span>
        <div className="mt-12 px-6 py-2 border border-white/10 text-[9px] tracking-widest text-white/20 uppercase">
            Official Archive Release
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-white/5 flex items-center justify-center">
          <div className="w-1 h-1 bg-white/10 rounded-full" />
      </div>
    </div>
  );
});

const PDFPage = React.forwardRef((props, ref) => {
  return (
    <div className="bg-white w-full h-full shadow-lg" ref={ref}>
      <Page 
        pageNumber={props.number} 
        width={props.width}
        renderAnnotationLayer={false}
        renderTextLayer={false}
        className="shadow-inner"
        loading={
            <div className="flex items-center justify-center h-full bg-neutral-100 animate-pulse">
                <span className="text-[8px] uppercase tracking-widest text-black/20">Rendering...</span>
            </div>
        }
      />
    </div>
  );
});

const PDFFlipbook = ({ pdfUrl, title, event, year, onFallbackTriggered }) => {
  const [numPages, setNumPages] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [loadError, setLoadError] = useState(null);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF Flipbook Load Error:", error);
    setLoadError(error.message);
    setLoading(false);
    // Auto-suggest fallback after a short delay if error occurs
    if (onFallbackTriggered) {
        setTimeout(onFallbackTriggered, 1500);
    }
  };

  useEffect(() => {
    const updateSize = () => {
        const w = window.innerWidth;
        if (w < 640) setDimensions({ width: 320, height: 450 });
        else if (w < 1024) setDimensions({ width: 450, height: 630 });
        else setDimensions({ width: 550, height: 770 });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (!pdfUrl) return null;

  if (loadError) {
      return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-12 bg-neutral-900 border border-white/5 mx-auto max-w-2xl rounded-2xl">
              <div className="w-12 h-12 border border-red-500/20 rounded-full flex items-center justify-center mb-6">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
              <h3 className="text-white font-serif text-2xl font-bold italic mb-4">Transmission Fragmented</h3>
              <p className="text-white/40 text-[10px] tracking-widest uppercase mb-8 max-w-md">
                  The host server (Cloudinary) may be restricting direct archive access or CORS parameters are mismatching.
              </p>
              <button 
                onClick={onFallbackTriggered}
                className="px-12 py-4 bg-white text-black font-bold text-[10px] tracking-[0.4em] uppercase hover:bg-neutral-200 transition-all shadow-xl"
              >
                  Initiate Standard Decrypt
              </button>
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="relative">
        <Document 
            file={pdfUrl} 
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
                <div className="flex flex-col items-center gap-6 text-white/20 p-20 bg-neutral-900/50 border border-white/5 rounded-3xl">
                    <div className="w-12 h-12 border-2 border-white/5 border-t-white animate-spin rounded-full" />
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] tracking-widest uppercase font-mono animate-pulse">Establishing Nexus Connection...</span>
                        <span className="text-[8px] text-white/10 uppercase tracking-widest">Protocol: react-pdf-viewer</span>
                    </div>
                </div>
            }
        >
          {numPages && (
            <HTMLFlipBook 
                width={dimensions.width} 
                height={dimensions.height}
                size="fixed"
                minWidth={315}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1533}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                className="pdf-flipbook"
            >
              <PageCover title={title} event={event} year={year} />
              {Array.from(new Array(numPages), (el, index) => (
                <PDFPage 
                    key={`page_${index + 1}`} 
                    number={index + 1} 
                    width={dimensions.width}
                />
              ))}
              <PageCover title="End of Dispatch" event={event} year={year} />
            </HTMLFlipBook>
          )}
        </Document>
      </div>

      {numPages && (
          <div className="mt-12 flex flex-col items-center gap-6">
              <div className="w-40 h-px bg-white/10" />
              <div className="flex items-center gap-8">
                  <span className="text-[9px] tracking-[0.8em] uppercase text-white/20 font-bold">
                      {numPages} Recorded Planes
                  </span>
                  <button 
                    onClick={onFallbackTriggered}
                    className="text-[9px] tracking-widest uppercase text-white/40 hover:text-white transition-colors border-b border-white/10 flex items-center gap-2"
                  >
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      View Fullscreen PDF
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default PDFFlipbook;

