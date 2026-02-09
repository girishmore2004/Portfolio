// // // // import { Download } from 'lucide-react';
// // // // import Button from '../common/Button';

// // // // const ResumeSection = () => {
// // // //   return (
// // // //     <section id="resume" className="py-20 bg-gray-50 dark:bg-gray-900">
// // // //       <div className="container mx-auto px-4">
// // // //         <div className="max-w-4xl mx-auto text-center">
// // // //           <h2 className="text-5xl font-display font-bold mb-8 text-gradient">
// // // //             Resume
// // // //           </h2>
// // // //           <p className="text-gray-600 dark:text-gray-400 mb-8">
// // // //             Download my resume to learn more about my experience and qualifications
// // // //           </p>
// // // //           <Button icon={Download} size="lg">
// // // //             Download Resume
// // // //           </Button>
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // };

// // // // export default ResumeSection;

// // // import { useEffect, useState } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { Download, FileText, Calendar, ExternalLink } from 'lucide-react';
// // // import Button from '../common/Button';
// // // import { contentAPI } from '../../services/api';

// // // const ResumeSection = () => {
// // //   const [content, setContent] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     loadContent();
// // //     // Refresh content every 10 seconds to catch updates
// // //     const interval = setInterval(loadContent, 10000);
// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   const loadContent = async () => {
// // //     try {
// // //       const response = await contentAPI.get('resume');
// // //       if (response && response.success) {
// // //         setContent(response.data || getDefaultContent());
// // //       } else {
// // //         setContent(getDefaultContent());
// // //       }
// // //     } catch (error) {
// // //       console.error('Failed to load resume content:', error);
// // //       setContent(getDefaultContent());
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const getDefaultContent = () => ({
// // //     resumeUrl: '',
// // //     lastUpdated: new Date().toISOString(),
// // //     versions: []
// // //   });

// // //   const handleDownload = () => {
// // //     if (content && content.resumeUrl) {
// // //       const link = document.createElement('a');
// // //       link.href = content.resumeUrl;
// // //       link.download = 'resume.pdf';
// // //       link.target = '_blank';
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       document.body.removeChild(link);
// // //     }
// // //   };

// // //   const handleView = () => {
// // //     if (content && content.resumeUrl) {
// // //       window.open(content.resumeUrl, '_blank');
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <section id="resume" className="py-20 bg-gray-50 dark:bg-gray-900">
// // //         <div className="container mx-auto px-4">
// // //           <div className="max-w-4xl mx-auto text-center">
// // //             <div className="loader animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
// // //           </div>
// // //         </div>
// // //       </section>
// // //     );
// // //   }

// // //   return (
// // //     <section id="resume" className="py-20 bg-gray-50 dark:bg-gray-900">
// // //       <div className="container mx-auto px-4">
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           whileInView={{ opacity: 1, y: 0 }}
// // //           viewport={{ once: true }}
// // //           transition={{ duration: 0.6 }}
// // //           className="max-w-4xl mx-auto"
// // //         >
// // //           <h2 className="text-5xl font-display font-bold text-center mb-8 text-gradient">
// // //             Resume
// // //           </h2>
          
// // //           {content && content.resumeUrl ? (
// // //             <>
// // //               <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
// // //                 Download or view my resume to learn more about my experience and qualifications
// // //               </p>

// // //               {/* Resume Card */}
// // //               <motion.div
// // //                 initial={{ opacity: 0, scale: 0.95 }}
// // //                 whileInView={{ opacity: 1, scale: 1 }}
// // //                 viewport={{ once: true }}
// // //                 transition={{ delay: 0.2 }}
// // //                 className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
// // //               >
// // //                 <div className="flex items-start justify-between mb-6">
// // //                   <div className="flex items-center gap-4">
// // //                     <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
// // //                       <FileText className="w-8 h-8 text-primary-600 dark:text-primary-400" />
// // //                     </div>
// // //                     <div>
// // //                       <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
// // //                         My Resume
// // //                       </h3>
// // //                       <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
// // //                         <Calendar className="w-4 h-4" />
// // //                         <span>
// // //                           Last updated: {new Date(content.lastUpdated).toLocaleDateString('en-US', {
// // //                             month: 'long',
// // //                             day: 'numeric',
// // //                             year: 'numeric'
// // //                           })}
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex flex-col sm:flex-row gap-4">
// // //                   <Button 
// // //                     icon={Download} 
// // //                     size="lg"
// // //                     onClick={handleDownload}
// // //                     className="flex-1"
// // //                   >
// // //                     Download Resume
// // //                   </Button>
// // //                   <Button 
// // //                     variant="secondary" 
// // //                     icon={ExternalLink}
// // //                     size="lg"
// // //                     onClick={handleView}
// // //                     className="flex-1"
// // //                   >
// // //                     View Online
// // //                   </Button>
// // //                 </div>
// // //               </motion.div>

// // //               {/* Previous Versions */}
// // //               {content.versions && content.versions.length > 0 && (
// // //                 <motion.div
// // //                   initial={{ opacity: 0, y: 20 }}
// // //                   whileInView={{ opacity: 1, y: 0 }}
// // //                   viewport={{ once: true }}
// // //                   transition={{ delay: 0.4 }}
// // //                 >
// // //                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
// // //                     Previous Versions
// // //                   </h3>
// // //                   <div className="grid md:grid-cols-2 gap-4">
// // //                     {content.versions.slice(0, 4).map((version, index) => (
// // //                       <motion.div
// // //                         key={index}
// // //                         whileHover={{ scale: 1.02 }}
// // //                         className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-between"
// // //                       >
// // //                         <div className="flex items-center gap-3">
// // //                           <FileText className="w-5 h-5 text-gray-400" />
// // //                           <div>
// // //                             <p className="font-medium text-gray-900 dark:text-white text-sm">
// // //                               {version.name || 'Resume'}
// // //                             </p>
// // //                             <p className="text-xs text-gray-500 dark:text-gray-400">
// // //                               {new Date(version.uploadedAt).toLocaleDateString()}
// // //                             </p>
// // //                           </div>
// // //                         </div>
// // //                         <button
// // //                           onClick={() => window.open(version.url, '_blank')}
// // //                           className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
// // //                         >
// // //                           <ExternalLink className="w-4 h-4" />
// // //                         </button>
// // //                       </motion.div>
// // //                     ))}
// // //                   </div>
// // //                 </motion.div>
// // //               )}
// // //             </>
// // //           ) : (
// // //             <>
// // //               <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
// // //                 Resume will be available soon
// // //               </p>
              
// // //               <motion.div
// // //                 initial={{ opacity: 0, scale: 0.95 }}
// // //                 whileInView={{ opacity: 1, scale: 1 }}
// // //                 viewport={{ once: true }}
// // //                 className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center"
// // //               >
// // //                 <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// // //                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
// // //                   No Resume Available
// // //                 </h3>
// // //                 <p className="text-gray-600 dark:text-gray-400">
// // //                   The resume is being prepared and will be available for download soon.
// // //                 </p>
// // //               </motion.div>
// // //             </>
// // //           )}
// // //         </motion.div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default ResumeSection;

// // import { useEffect, useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { Download, FileText, Calendar } from 'lucide-react';
// // import Button from '../common/Button';
// // import { contentAPI } from '../../services/api';

// // const ResumeSection = () => {
// //   const [content, setContent] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadContent();
// //     const interval = setInterval(loadContent, 10000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const loadContent = async () => {
// //     try {
// //       const response = await contentAPI.get('resume');
// //       if (response && response.success) {
// //         setContent(response.data || getDefaultContent());
// //       } else {
// //         setContent(getDefaultContent());
// //       }
// //     } catch (error) {
// //       console.error('Failed to load resume content:', error);
// //       setContent(getDefaultContent());
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getDefaultContent = () => ({
// //     resumeUrl: '',
// //     lastUpdated: new Date().toISOString(),
// //     versions: []
// //   });

// //   const handleDownload = () => {
// //     if (content && content.resumeUrl) {
// //       const link = document.createElement('a');
// //       link.href = content.resumeUrl;
// //       link.download = 'resume.pdf';
// //       link.target = '_blank';
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <section id="resume" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
// //         <div className="container mx-auto">
// //           <div className="max-w-5xl mx-auto text-center">
// //             <div className="loader animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
// //           </div>
// //         </div>
// //       </section>
// //     );
// //   }

// //   return (
// //     <section id="resume" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
// //       <div className="container mx-auto">
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.6 }}
// //           className="max-w-5xl mx-auto"
// //         >
// //           <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-6 sm:mb-8 text-gradient">
// //             Resume
// //           </h2>
          
// //           {content && content.resumeUrl ? (
// //             <>
// //               <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
// //                 View my resume below or download it for offline access
// //               </p>

// //               {/* Resume Info Card */}
// //               <motion.div
// //                 initial={{ opacity: 0, scale: 0.95 }}
// //                 whileInView={{ opacity: 1, scale: 1 }}
// //                 viewport={{ once: true }}
// //                 transition={{ delay: 0.2 }}
// //                 className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
// //               >
// //                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
// //                   <div className="flex items-center gap-3 sm:gap-4">
// //                     <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
// //                       <FileText className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-600 dark:text-primary-400" />
// //                     </div>
// //                     <div>
// //                       <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
// //                         My Resume
// //                       </h3>
// //                       <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
// //                         <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
// //                         <span>
// //                           Last updated: {new Date(content.lastUpdated).toLocaleDateString('en-US', {
// //                             month: 'long',
// //                             day: 'numeric',
// //                             year: 'numeric'
// //                           })}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* PDF Viewer */}
// //                 <div className="w-full mb-4 sm:mb-6">
// //                   <div className="bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
// //                     <iframe
// //                       src={content.resumeUrl}
// //                       className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
// //                       title="Resume PDF Viewer"
// //                       style={{ border: 'none' }}
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Download Button */}
// //                 <div className="flex justify-center">
// //                   <Button 
// //                     icon={Download} 
// //                     size="lg"
// //                     onClick={handleDownload}
// //                     className="w-full sm:w-auto min-w-[200px]"
// //                   >
// //                     Download Resume
// //                   </Button>
// //                 </div>
// //               </motion.div>

// //               {/* Previous Versions */}
// //               {content.versions && content.versions.length > 0 && (
// //                 <motion.div
// //                   initial={{ opacity: 0, y: 20 }}
// //                   whileInView={{ opacity: 1, y: 0 }}
// //                   viewport={{ once: true }}
// //                   transition={{ delay: 0.4 }}
// //                 >
// //                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-center">
// //                     Previous Versions
// //                   </h3>
// //                   <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
// //                     {content.versions.slice(0, 4).map((version, index) => (
// //                       <motion.div
// //                         key={index}
// //                         whileHover={{ scale: 1.02 }}
// //                         className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 flex items-center justify-between"
// //                       >
// //                         <div className="flex items-center gap-2 sm:gap-3 min-w-0">
// //                           <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
// //                           <div className="min-w-0">
// //                             <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm truncate">
// //                               {version.name || 'Resume'}
// //                             </p>
// //                             <p className="text-xs text-gray-500 dark:text-gray-400">
// //                               {new Date(version.uploadedAt).toLocaleDateString()}
// //                             </p>
// //                           </div>
// //                         </div>
// //                         <button
// //                           onClick={() => window.open(version.url, '_blank')}
// //                           className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 p-2 flex-shrink-0"
// //                           aria-label="Download previous version"
// //                         >
// //                           <Download className="w-4 h-4" />
// //                         </button>
// //                       </motion.div>
// //                     ))}
// //                   </div>
// //                 </motion.div>
// //               )}
// //             </>
// //           ) : (
// //             <>
// //               <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
// //                 Resume will be available soon
// //               </p>
              
// //               <motion.div
// //                 initial={{ opacity: 0, scale: 0.95 }}
// //                 whileInView={{ opacity: 1, scale: 1 }}
// //                 viewport={{ once: true }}
// //                 className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-8 sm:p-10 md:p-12 text-center"
// //               >
// //                 <FileText className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
// //                 <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
// //                   No Resume Available
// //                 </h3>
// //                 <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
// //                   The resume is being prepared and will be available for download soon.
// //                 </p>
// //               </motion.div>
// //             </>
// //           )}
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default ResumeSection;

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Download, FileText, Calendar, AlertCircle, ExternalLink } from 'lucide-react';
// import Button from '../common/Button';
// import { contentAPI } from '../../services/api';

// const ResumeSection = () => {
//   const [content, setContent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('google'); // 'google', 'iframe', 'object'

//   useEffect(() => {
//     loadContent();
//     const interval = setInterval(loadContent, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const loadContent = async () => {
//     try {
//       const response = await contentAPI.get('resume');
//       if (response && response.success) {
//         setContent(response.data || getDefaultContent());
//       } else {
//         setContent(getDefaultContent());
//       }
//     } catch (error) {
//       console.error('Failed to load resume content:', error);
//       setContent(getDefaultContent());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDefaultContent = () => ({
//     resumeUrl: '',
//     lastUpdated: new Date().toISOString(),
//     versions: []
//   });

//   const handleDownload = async () => {
//     if (content && content.resumeUrl) {
//       try {
//         // Create a temporary link and trigger download
//         const link = document.createElement('a');
//         link.href = content.resumeUrl;
//         link.download = 'resume.pdf';
//         link.target = '_blank';
//         link.rel = 'noopener noreferrer';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       } catch (error) {
//         console.error('Download failed:', error);
//         // Fallback: open in new tab
//         window.open(content.resumeUrl, '_blank', 'noopener,noreferrer');
//       }
//     }
//   };

//   const handleOpenInNewTab = () => {
//     if (content && content.resumeUrl) {
//       window.open(content.resumeUrl, '_blank', 'noopener,noreferrer');
//     }
//   };

//   if (loading) {
//     return (
//       <section id="resume" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
//         <div className="container mx-auto">
//           <div className="max-w-5xl mx-auto text-center">
//             <div className="loader animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // Get Google Docs Viewer URL
//   const getGoogleDocsViewerUrl = (url) => {
//     if (!url) return '';
//     return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
//   };

//   // Get direct PDF URL
//   const getDirectPdfUrl = (url) => {
//     if (!url) return '';
//     return `${url}#view=FitH&toolbar=0&navpanes=0`;
//   };

//   return (
//     <section id="resume" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
//       <div className="container mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="max-w-5xl mx-auto"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-6 sm:mb-8 text-gradient">
//             Resume
//           </h2>
          
//           {content && content.resumeUrl ? (
//             <>
//               <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
//                 View my resume below or download it as PDF
//               </p>

//               {/* Resume Info Card */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.2 }}
//                 className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
//               >
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
//                   <div className="flex items-center gap-3 sm:gap-4">
//                     <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <FileText className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-600 dark:text-primary-400" />
//                     </div>
//                     <div>
//                       <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
//                         My Resume
//                       </h3>
//                       <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
//                         <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
//                         <span>
//                           Last updated: {new Date(content.lastUpdated).toLocaleDateString('en-US', {
//                             month: 'long',
//                             day: 'numeric',
//                             year: 'numeric'
//                           })}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* View Mode Selector */}
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   <button
//                     onClick={() => setViewMode('google')}
//                     className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg font-medium transition-all ${
//                       viewMode === 'google'
//                         ? 'bg-primary-600 text-white'
//                         : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//                     }`}
//                   >
//                     Google Viewer
//                   </button>
//                   <button
//                     onClick={() => setViewMode('iframe')}
//                     className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg font-medium transition-all ${
//                       viewMode === 'iframe'
//                         ? 'bg-primary-600 text-white'
//                         : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//                     }`}
//                   >
//                     Direct View
//                   </button>
//                   <button
//                     onClick={() => setViewMode('object')}
//                     className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg font-medium transition-all ${
//                       viewMode === 'object'
//                         ? 'bg-primary-600 text-white'
//                         : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//                     }`}
//                   >
//                     Object Embed
//                   </button>
//                 </div>

//                 {/* PDF Viewer */}
//                 <div className="w-full mb-4 sm:mb-6">
//                   <div className="bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 relative">
//                     {viewMode === 'google' && (
//                       <iframe
//                         src={getGoogleDocsViewerUrl(content.resumeUrl)}
//                         className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
//                         title="Resume PDF Viewer - Google Docs"
//                         style={{ border: 'none' }}
//                         allow="autoplay"
//                       />
//                     )}

//                     {viewMode === 'iframe' && (
//                       <iframe
//                         src={getDirectPdfUrl(content.resumeUrl)}
//                         className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
//                         title="Resume PDF Viewer - Direct"
//                         style={{ border: 'none' }}
//                         type="application/pdf"
//                       />
//                     )}

//                     {viewMode === 'object' && (
//                       <object
//                         data={content.resumeUrl}
//                         type="application/pdf"
//                         className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
//                         aria-label="Resume PDF"
//                       >
//                         <div className="w-full h-full flex items-center justify-center p-8">
//                           <div className="text-center">
//                             <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
//                             <p className="text-gray-600 dark:text-gray-400 mb-4">
//                               Unable to display PDF in this browser
//                             </p>
//                             <Button
//                               onClick={handleDownload}
//                               icon={Download}
//                               size="lg"
//                             >
//                               Download PDF
//                             </Button>
//                           </div>
//                         </div>
//                       </object>
//                     )}
//                   </div>
                  
//                   {/* PDF viewing hint */}
//                   <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
//                     Having trouble viewing? Try switching view modes above or download the PDF.
//                   </p>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
//                   <Button 
//                     icon={Download} 
//                     size="lg"
//                     onClick={handleDownload}
//                     className="w-full sm:w-auto min-w-[200px]"
//                   >
//                     Download PDF
//                   </Button>
//                   <Button 
//                     variant="secondary"
//                     icon={ExternalLink} 
//                     size="lg"
//                     onClick={handleOpenInNewTab}
//                     className="w-full sm:w-auto min-w-[200px]"
//                   >
//                     Open in New Tab
//                   </Button>
//                 </div>
//               </motion.div>

//               {/* Previous Versions */}
//               {content.versions && content.versions.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-center">
//                     Previous Versions
//                   </h3>
//                   <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
//                     {content.versions.slice(0, 4).map((version, index) => {
//                       const handleVersionDownload = (e) => {
//                         e.preventDefault();
//                         const link = document.createElement('a');
//                         link.href = version.url;
//                         link.download = `${version.name || 'resume'}.pdf`;
//                         link.target = '_blank';
//                         link.rel = 'noopener noreferrer';
//                         document.body.appendChild(link);
//                         link.click();
//                         document.body.removeChild(link);
//                       };

//                       return (
//                         <motion.div
//                           key={index}
//                           whileHover={{ scale: 1.02 }}
//                           className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 flex items-center justify-between"
//                         >
//                           <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                             <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
//                             <div className="min-w-0">
//                               <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm truncate">
//                                 {version.name || 'Resume'}
//                               </p>
//                               <p className="text-xs text-gray-500 dark:text-gray-400">
//                                 {new Date(version.uploadedAt).toLocaleDateString()}
//                               </p>
//                             </div>
//                           </div>
//                           <button
//                             onClick={handleVersionDownload}
//                             className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 p-2 flex-shrink-0 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
//                             aria-label="Download previous version"
//                             title="Download PDF"
//                           >
//                             <Download className="w-4 h-4" />
//                           </button>
//                         </motion.div>
//                       );
//                     })}
//                   </div>
//                 </motion.div>
//               )}
//             </>
//           ) : (
//             <>
//               <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
//                 Resume will be available soon
//               </p>
              
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-8 sm:p-10 md:p-12 text-center"
//               >
//                 <FileText className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
//                   No Resume Available
//                 </h3>
//                 <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
//                   The resume is being prepared and will be available for download soon.
//                 </p>
//               </motion.div>
//             </>
//           )}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ResumeSection;
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

    const interval = setInterval(() => {
      loadContent(true); // silent refresh
    }, 10000);

    return () => clearInterval(interval);
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
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600 mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section id="resume" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-8 text-gradient">
            Resume
          </h2>

          {content?.resumeUrl ? (
            <>
              <motion.div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <FileText className="w-8 h-8 text-primary-600" />
                  <div>
                    <h3 className="text-xl font-bold">My Resume</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar size={14} />
                      Last updated:{' '}
                      {new Date(content.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* View mode */}
                <div className="flex gap-2 mb-4">
                  {['google'].map(mode => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                        viewMode === mode
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      {mode === 'google'
                        ? 'Google Viewer'
                        : mode === 'iframe'
                        ? 'Direct View'
                        : 'Object Embed'}
                    </button>
                  ))}
                </div>

                {/* Viewer */}
                <div className="rounded-lg overflow-hidden border bg-gray-100 dark:bg-gray-900">
                  {viewMode === 'google' && (
                    <iframe
                      src={getGoogleDocsViewerUrl(content.resumeUrl)}
                      className="w-full h-[600px]"
                      loading="lazy"
                      title="Resume Viewer"
                      type="application/pdf"
                    />
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Button icon={Download} size="lg" onClick={handleDownload}>
                    Download PDF
                  </Button>
                  
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-10 text-center">
              <FileText className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-xl font-bold">No Resume Available</h3>
              <p className="text-gray-500">
                Resume will be available soon.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
