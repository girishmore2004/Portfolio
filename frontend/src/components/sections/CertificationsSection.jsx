//  import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Award, ExternalLink } from 'lucide-react';
// import { certificationsAPI } from '../../services/api';

// const CertificationsSection = () => {
//   const [certifications, setCertifications] = useState([]);

//   useEffect(() => {
//     loadCertifications();
//   }, []);

//   const loadCertifications = async () => {
//     try {
//       const response = await certificationsAPI.getAll({ status: 'published' });
//       setCertifications(response.data || []);
//     } catch (error) {
//       console.error('Failed to load certifications:', error);
//     }
//   };

//   return (
//     <section id="certifications" className="py-20 bg-white dark:bg-gray-800">
//       <div className="container mx-auto px-4">
//         <h2 className="text-5xl font-display font-bold text-center mb-16 text-gradient">
//           Certifications & Achievements
//         </h2>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {certifications.map((cert, index) => (
//             <motion.div
//               key={cert._id}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{ y: -5 }}
//               className="card"
//             >
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 rounded-lg bg-accent-100 dark:bg-accent-900 flex items-center justify-center flex-shrink-0">
//                   <Award className="w-6 h-6 text-accent-600 dark:text-accent-400" />
//                 </div>

//                 <div className="flex-1">
//                   <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">
//                     {cert.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
//                     {cert.issuer}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
//                     {new Date(cert.issueDate).toLocaleDateString('en-US', {
//                       month: 'short',
//                       year: 'numeric'
//                     })}
//                   </p>

//                   {cert.verificationUrl && (
//                     <a
//                       href={cert.verificationUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
//                     >
//                       <ExternalLink className="w-4 h-4" />
//                       Verify
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CertificationsSection;

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { certificationsAPI } from '../../services/api';

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState([]);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      const response = await certificationsAPI.getAll({ status: 'published' });
      setCertifications(response.data || []);
    } catch (error) {
      console.error('Failed to load certifications:', error);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    };

    checkScroll();
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    // Auto-scroll setup
    let autoScrollInterval;
    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 280, behavior: 'smooth' });
        }
      }, 3000);
    };

    const stopAutoScroll = () => {
      clearInterval(autoScrollInterval);
    };

    startAutoScroll();
    container.addEventListener('mouseenter', stopAutoScroll);
    container.addEventListener('mouseleave', startAutoScroll);
    container.addEventListener('touchstart', stopAutoScroll);

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      container.removeEventListener('mouseenter', stopAutoScroll);
      container.removeEventListener('mouseleave', startAutoScroll);
      container.removeEventListener('touchstart', stopAutoScroll);
      clearInterval(autoScrollInterval);
    };
  }, [certifications]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="certifications" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gradient">
            Certifications & Achievements
          </h2>

          {/* Carousel Container */}
          <div className="relative">
            {/* Left Navigation Button */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors -ml-5"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 dark:text-gray-300" />
              </button>
            )}

            {/* Scrollable Certifications Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px]"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Award Icon */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg bg-accent-100 dark:bg-accent-900 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600 dark:text-accent-400" />
                    </div>

                    {/* Certification Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base sm:text-lg mb-1 text-gray-900 dark:text-white line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                        {cert.issuer}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                        {new Date(cert.issueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric'
                        })}
                        {cert.expiryDate && (
                          <span className="ml-2">
                            • Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        )}
                      </p>

                      {/* Verification Link */}
                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs sm:text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          Verify Credential
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Navigation Button */}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors -mr-5"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 dark:text-gray-300" />
              </button>
            )}
          </div>

          {/* Scroll Indicator for Mobile */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {certifications.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"
              />
            ))}
          </div>

          {certifications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                No certifications available
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;