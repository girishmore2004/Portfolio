import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Calendar, AlertCircle, ExternalLink } from 'lucide-react';
import Button from '../common/Button';
import { contentAPI } from '../../services/api';

const ResumeSection = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('google');

  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    loadContent();
  }, []);

  const getDefaultContent = () => ({
    resumeUrl: '',
    lastUpdated: new Date().toISOString(),
    versions: []
  });

  const loadContent = async (silent = false) => {
    try {
      const response = await contentAPI.get('resume');

      if (response?.success && response.data?.resumeUrl) {
        setContent(prev => {
          // Prevent overwrite with same data
          if (prev?.resumeUrl === response.data.resumeUrl) return prev;
          return response.data;
        });
        hasLoadedOnce.current = true;
      } else if (!hasLoadedOnce.current) {
        setContent(getDefaultContent());
      }
    } catch (error) {
      console.error('Failed to load resume content:', error);
      if (!hasLoadedOnce.current) {
        setContent(getDefaultContent());
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleDownload = async () => {
   if (!content?.resumeUrl) return;
  
   try {
     const response = await fetch(content.resumeUrl, {
       mode: 'cors'
     });
  
     if (!response.ok) {
       throw new Error('Failed to fetch PDF');
     }
  
     const blob = await response.blob();
  
     const url = window.URL.createObjectURL(
       new Blob([blob], { type: 'application/pdf' })
     );
  
     const link = document.createElement('a');
     link.href = url;
     link.download = 'resume.pdf';
  
     document.body.appendChild(link);
     link.click();
  
     document.body.removeChild(link);
     window.URL.revokeObjectURL(url);
   } catch (error) {
     console.error('PDF download failed:', error);
     // fallback
     window.open(content.resumeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const getGoogleDocsViewerUrl = (url) => {
    if (!url) return '';
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  const getDirectPdfUrl = (url) => {
    if (!url) return '';
    return `${url}#view=FitH&toolbar=0&navpanes=0`;
  };

  if (loading) {
    return (
      <section>
        <div className="section-container text-center">
          <div className="loader" />
        </div>
      </section>
    );
  }

  return (
    <section id="resume">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          {/* <span className="section-eyebrow">// 05 — Resume</span> */}
          <h2 className="section-title">Resume</h2>
          <p className="section-subtitle">
            Preview my latest resume below or download a copy
          </p>

          {content?.resumeUrl ? (
            <div className="paper-card card-static !p-0 max-w-5xl">
              {/* Header bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 border-b border-[color:var(--border-color)]">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-primary-600/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-[color:var(--text-primary)]">My Resume</h3>
                    <p className="font-mono text-xs text-[color:var(--text-secondary)] flex items-center gap-2 mt-0.5">
                      <Calendar size={13} />
                      Last updated:{' '}
                      {new Date(content.lastUpdated).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <Button icon={Download} size="md" onClick={handleDownload} className="w-full sm:w-auto">
                  Download PDF
                </Button>
              </div>

              {/* Viewer */}
              <div className="p-3 sm:p-5">
                <div className="rounded-xl overflow-hidden border border-[color:var(--border-color)] bg-[color:var(--bg-color)]">
                  {viewMode === 'google' && (
                    <iframe
                      src={getGoogleDocsViewerUrl(content.resumeUrl)}
                      className="w-full h-[460px] sm:h-[620px] lg:h-[760px]"
                      loading="lazy"
                      title="Resume Viewer"
                      type="application/pdf"
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="paper-card card-static max-w-xl text-center !py-12">
              <FileText className="mx-auto mb-4 text-primary-600/60" size={44} />
              <h3 className="text-xl font-bold text-[color:var(--text-primary)]">No Resume Available</h3>
              <p className="mt-2 text-[color:var(--text-secondary)]">
                Resume will be available soon.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
