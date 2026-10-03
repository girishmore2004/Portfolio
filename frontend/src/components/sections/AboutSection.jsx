import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, CheckCircle } from 'lucide-react';
import { contentAPI } from '../../services/api';

const AboutSection = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await contentAPI.get('about');
      if (response && response.success && response.data) {
        setContent(response.data);
      }
    } catch (error) {
      console.error('Failed to load about content:', error);
    }
  };

  const getDefaultContent = () => ({
    title: 'About Me',
    bio: 'Your story goes here...',
    image: '',
    highlights: ['Award-winning developer', 'Open source contributor', 'Tech enthusiast'],
    experience: '5+ years',
    location: 'Your City, Country',
    availability: 'Open to opportunities'
  });

  if (!content) return null;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const facts = [
    content.experience && { icon: Briefcase, label: 'Experience', value: content.experience },
    content.location && { icon: MapPin, label: 'Location', value: content.location },
  ].filter(Boolean);

  return (
    <section id="about">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          variants={fadeIn}
        >
          <span className="section-eyebrow">// 01 — About</span>
          <h2 className="section-title">{content.title || 'About Me'}</h2>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mt-12">
            {/* Photo + quick facts */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="lg:sticky lg:top-28 space-y-5 max-w-md mx-auto lg:max-w-none">
                <div className="relative">
                  <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-2 border-primary-600/30" aria-hidden="true" />
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-[color:var(--border-color)] shadow-[0_10px_30px_var(--shadow-hover)] bg-[color:var(--card-bg)]">
                    <img
                      src={content.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'}
                      alt={content.title || 'Profile'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop';
                      }}
                    />
                  </div>
                </div>

                {/* Quick facts */}
                <div className="pt-3 space-y-3">
                  {facts.length > 0 && (
                    <div className={`grid gap-3 ${facts.length > 1 ? 'grid-cols-1 xs:grid-cols-2' : 'grid-cols-1'}`}>
                      {facts.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="paper-card card-static !p-4 flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary-600/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-[18px] h-[18px] text-primary-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-[color:var(--text-secondary)]">{label}</p>
                            <p className="text-sm font-semibold text-[color:var(--text-primary)] break-words">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {content.availability && (
                    <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-olive-500/30 bg-olive-500/10 w-full">
                      <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-olive-500 opacity-60 animate-ping" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-olive-500" />
                      </span>
                      <span className="text-sm font-medium text-olive-600 dark:text-olive-400">
                        {content.availability}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Bio and highlights */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7 space-y-8"
            >
              {content.bio && (
                <p className="text-base sm:text-lg leading-relaxed text-[color:var(--text-secondary)] whitespace-pre-line">
                  {content.bio}
                </p>
              )}

              {content.highlights && content.highlights.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-primary-600 mb-4">
                    Key Highlights
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {content.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.06 }}
                        className="paper-card !p-4 flex items-start gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-olive-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-[0.95rem] text-[color:var(--text-primary)] leading-snug">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <blockquote className="relative pl-5 border-l-[3px] border-primary-600">
                <p className="text-sm sm:text-base italic text-[color:var(--text-secondary)] leading-relaxed">
                  "Passionate about creating innovative solutions and pushing the boundaries of what's possible with technology."
                </p>
              </blockquote>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
