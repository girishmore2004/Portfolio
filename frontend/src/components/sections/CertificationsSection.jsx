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
      const response = await certificationsAPI.getAll({
        status: 'published',
      });

      setCertifications(response.data || []);
    } catch (error) {
      console.error('Failed to load certifications:', error);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });

  return (
    <section id="certifications">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <span className="section-eyebrow">// 04 — Certifications</span>
          <h2 className="section-title">Certifications &amp; Achievements</h2>
          <p className="section-subtitle">
            Credentials and milestones that back up the work
          </p>

          {certifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert._id || index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 2) * 0.08 }}
                  className="paper-card !p-5 sm:!p-6 flex items-start gap-4"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-accent-500/15 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600 dark:text-accent-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg leading-snug text-[color:var(--text-primary)] break-words">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-[color:var(--text-secondary)] mt-0.5">
                      {cert.issuer}
                    </p>

                    <div className="mt-3 flex items-center gap-x-4 gap-y-2 flex-wrap font-mono text-xs text-[color:var(--text-secondary)]">
                      {cert.issueDate && (
                        <span>
                          {formatDate(cert.issueDate)}
                          {cert.expiryDate && <> &middot; Expires {formatDate(cert.expiryDate)}</>}
                        </span>
                      )}

                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-primary-600 hover:text-[#d97745] transition-colors"
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
          ) : (
            <div className="text-center py-12">
              <p className="text-sm sm:text-base text-[color:var(--text-secondary)]">
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
