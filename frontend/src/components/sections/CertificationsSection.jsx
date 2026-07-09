import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { certificationsAPI } from '../../services/api';

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState([]);

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

  return (
    <section id="certifications" className="py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-center font-mono text-xs sm:text-sm tracking-wider text-primary-600 dark:text-primary-400 mb-3">
            // 04 &mdash; Certifications
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-center mb-10 sm:mb-12 text-ink dark:text-white">
            Certifications &amp; Achievements
          </h2>

          {/* Scannable list instead of a carousel of cards — reads more confident for a short list */}
          <div className="divide-y divide-hairline dark:divide-hairline-dark border-t border-b border-hairline dark:border-hairline-dark">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 py-5 sm:py-6"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-accent-100 dark:bg-accent-900 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600 dark:text-accent-400" />
                </div>

                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0 text-xs sm:text-sm text-gray-500 dark:text-gray-500 font-mono">
                    <span>
                      {new Date(cert.issueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                      {cert.expiryDate && (
                        <>
                          {' '}&middot; Expires {new Date(cert.expiryDate).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric'
                          })}
                        </>
                      )}
                    </span>
                    {cert.verificationUrl && (
                      
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Verify
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
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
