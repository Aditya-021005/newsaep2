import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import StandardPDFViewer from '../components/StandardPDFViewer';
import CornerAccents from '../components/CornerAccents';

const IssuesPage = ({ onOpenSidebar }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const eventFilter = searchParams.get('event_category');
  const yearFilter = searchParams.get('event_year');

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    fetchIssues();
  }, [eventFilter, yearFilter]);

  const fetchIssues = () => {
    setLoading(true);
    let targetUrl = `${import.meta.env.VITE_API_BASE_URL || '/api'}/issues/`;
    const p = new URLSearchParams();
    if (eventFilter) p.append('event_category', eventFilter);
    if (yearFilter) p.append('event_year', yearFilter);
    const queryString = p.toString();
    if (queryString) targetUrl += `?${queryString}`;

    axios.get(targetUrl)
      .then(res => {
        setIssues(Array.isArray(res.data) ? res.data : res.data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const groupedIssues = issues.reduce((acc, issue) => {
    const groupKey = issue.issue_group || issue.title;
    if (!acc[groupKey]) {
      acc[groupKey] = {
        name: groupKey,
        issues: [],
        thumbnail_url: issue.thumbnail_url,
        event_category: issue.event_category,
        event_year: issue.event_year,
        id: issue.id
      };
    }
    acc[groupKey].issues.push(issue);
    return acc;
  }, {});
  const groupList = Object.values(groupedIssues);

  const closeIssue = () => {
    setSelectedIssue(null);
  };

  const closeGroup = () => {
    setSelectedGroup(null);
  };

  return (
    <div className="min-h-screen relative pt-40 pb-20 overflow-hidden">
      <div className="absolute left-[5%] arch-line-v opacity-30" />
      <div className="absolute right-[5%] arch-line-v opacity-30" />

      {/* Hero Header */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10 mb-20 text-center">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
        >
            <span className="text-[10px] tracking-[0.8em] uppercase text-white/40 font-bold">
                Archived Dispatches
            </span>
            <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tighter text-white">
                THE ISSUES
            </h1>
            <div className="w-16 h-1 bg-white" />
        </motion.div>
      </div>

      {/* Action Bar */}
      <div className="container mx-auto px-6 max-w-7xl relative z-20 mb-12 flex items-center justify-between border-b border-white/10 pb-8">
          <div className="flex items-center gap-8">
              <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest italic">
                  {issues.length} RECORDS ACCESSED
              </span>
              <div className="hidden md:flex gap-4">
                  {eventFilter && (
                      <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest text-white/40">
                          {eventFilter}
                      </span>
                  )}
                  {yearFilter && (
                      <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest text-white/40">
                          {yearFilter}
                      </span>
                  )}
              </div>
          </div>
          <button 
            onClick={onOpenSidebar}
            className="px-8 py-3 bg-white text-black font-bold text-[10px] tracking-widest uppercase hover:bg-white/90 transition-all"
          >
              Adjust Parameters
          </button>
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse border border-white/10" />
            ))}
          </div>
        ) : groupList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {groupList.map((group, idx) => (
              <motion.div 
                key={group.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedGroup(group)}
                className="group cursor-pointer relative"
              >
                {/* Issue Card */}
                <div className="aspect-[3/4] bg-neutral-900 border border-white/10 overflow-hidden relative shadow-2xl transition-all duration-500 group-hover:-translate-y-4 group-hover:border-white/30">
                  <CornerAccents />
                  {group.thumbnail_url ? (
                    <img src={group.thumbnail_url} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={group.name} />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center">
                        <span className="text-white font-serif text-3xl font-bold tracking-tighter mb-4 opacity-40">
                            {group.name}
                        </span>
                        <div className="w-8 h-px bg-white/10 mb-4" />
                        <span className="text-white/20 text-[9px] tracking-widest uppercase font-bold">
                            {group.event_category} {group.event_year}
                        </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="text-white text-[12px] font-serif italic mb-2 block opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        {group.issues.length > 1 ? `View ${group.issues.length} Editions →` : 'View Dispatch →'}
                    </span>
                    <h3 className="text-white font-serif text-2xl font-bold tracking-tighter leading-none">
                        {group.name}
                    </h3>
                  </div>
                </div>
                {/* Year Badge */}
                <div className="mt-6 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                        Ref: ARCH_{group.id.toString().padStart(3, '0')}
                    </span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">
                        {group.event_year}
                    </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="min-h-[40vh] flex flex-col items-center justify-center text-center py-20 border border-dashed border-white/10">
            <span className="text-4xl md:text-6xl font-serif italic text-white/5 mb-4">Archives Empty</span>
            <p className="text-white/20 text-[10px] tracking-widest uppercase">Select different event parameters</p>
          </div>
        )}
      </div>
      
      {/* Group Overlay */}
      {selectedGroup && createPortal(
        <AnimatePresence>
          <motion.div 
            key="group-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1500] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-neutral-900 border border-white/10 shadow-2xl relative">
              <div className="sticky top-0 z-20 bg-neutral-900 border-b border-white/10 p-8 flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 font-bold block mb-2">Available Dispatches</span>
                  <h2 className="text-white font-serif text-3xl md:text-5xl font-bold tracking-tighter italic">{selectedGroup.name}</h2>
                </div>
                <button 
                  onClick={closeGroup}
                  className="w-12 h-12 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="p-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {selectedGroup.issues.map((issue, idx) => (
                    <motion.div
                      key={issue.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => {
                        setSelectedIssue(issue);
                        closeGroup();
                      }}
                      className="group/issue cursor-pointer"
                    >
                      <div className="aspect-[3/4] bg-black border border-white/5 overflow-hidden relative mb-4 group-hover/issue:border-white/20 transition-all">
                        {issue.thumbnail_url ? (
                          <img src={issue.thumbnail_url} className="w-full h-full object-cover opacity-50 group-hover/issue:opacity-100 transition-all duration-500" alt={issue.title} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20 font-serif italic text-xl">No Preview</div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/issue:opacity-100 transition-all">
                          <span className="px-6 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest">Open Archive</span>
                        </div>
                      </div>
                      <h4 className="text-white font-serif text-lg font-bold tracking-tight">{issue.title}</h4>
                      <p className="text-white/40 text-[9px] uppercase tracking-widest mt-1">Ref: ARCH_{issue.id.toString().padStart(3, '0')}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}

      {selectedIssue && createPortal(
        <AnimatePresence>
          <motion.div 
            key="issue-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/98 backdrop-blur-3xl overflow-y-auto"
          >
            <div className="min-h-screen flex flex-col">
                <div className="p-8 flex items-center justify-between border-b border-white/10 shrink-0">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 font-bold">Secure Dispatch View</span>
                        <h2 className="text-white font-serif text-2xl font-bold tracking-tighter italic">{selectedIssue.title}</h2>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={closeIssue}
                            className="w-16 h-16 rounded-full bg-white text-black text-xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-2xl z-[2001]"
                        >
                            ✕
                        </button>
                    </div>
                </div>
                
                <div className="flex-1 flex items-center justify-center overflow-x-hidden p-4">
                    <StandardPDFViewer 
                        pdfUrl={selectedIssue.pdf_url}
                        title={selectedIssue.title}
                    />
                </div>
                
                <div className="p-8 border-t border-white/10 flex items-center justify-center gap-12 text-[10px] tracking-[0.3em] uppercase text-white/20 shrink-0">
                    <span>Precision Journalism</span>
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                    <span>Archive Entry #{selectedIssue.id}</span>
                </div>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default IssuesPage;

