import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
      />
    </div>
  );
});

const PDFFlipbook = ({ pdfUrl, title, event, year }) => {
  const [numPages, setNumPages] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    // Basic responsive width calculation
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

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="relative">
        <Document 
            file={pdfUrl} 
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
                <div className="flex flex-col items-center gap-4 text-white/20">
                    <div className="w-12 h-12 border-2 border-white/5 border-t-white animate-spin rounded-full" />
                    <span className="text-[10px] tracking-widest uppercase font-mono">Initializing Matrix...</span>
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
          <div className="mt-12 flex flex-col items-center gap-4">
              <div className="w-40 h-px bg-white/10" />
              <span className="text-[9px] tracking-[0.8em] uppercase text-white/20 font-bold">
                  {numPages} Recorded Planes
              </span>
          </div>
      )}
    </div>
  );
};

export default PDFFlipbook;
