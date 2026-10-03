import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Download, Code, Rocket } from 'lucide-react';
import Button from '../common/Button';
import { contentAPI } from '../../services/api';

const HeroSection = () => {
  const [content, setContent] = useState(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await contentAPI.get('hero');
      if (response && response.success && response.data) {
        setContent(response.data);
      }
    } catch (error) {
      console.error('Failed to load hero content:', error);
    }
  };

  const getDefaultContent = () => ({
    title: 'Your Name',
    subtitle: 'Full Stack Developer',
    description: 'Building digital experiences that inspire',
    roles: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'],
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    backgroundImage: '',
    ctaButtons: [
      { text: 'View Projects', link: '#projects' },
      { text: 'Download Resume', link: '#resume' }
    ],
    stats: [
      { value: '50+', label: 'Projects Completed' },
      { value: '5+', label: 'Years Experience' },
      { value: '100%', label: 'Client Satisfaction' }
    ]
  });

  useEffect(() => {
    if (!content?.roles || content.roles.length === 0) return;
    
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % content.roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [content]);

  const handleScroll = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!content) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="loader" />
      </section>
    );
  }

  // Animate word-by-word so long names still wrap nicely on small screens
  const nameWords = (content.title || 'Your Name').split(' ');

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{
        backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Optional custom background image gets a warm scrim so text stays readable */}
      {content.backgroundImage && (
        <div className="absolute inset-0 bg-[#171311]/60" aria-hidden="true" />
      )}

      <div className="section-container w-full !pt-28 !pb-14 sm:!pt-32 md:!pb-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Text column */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            <motion.span
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="tag !text-[0.72rem] gap-2 mb-5 sm:mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-600 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-600" />
              </span>
              Welcome
            </motion.span>

            <motion.h1
              className="text-[2.5rem] leading-[1.08] sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight mb-4 sm:mb-5 text-[color:var(--text-primary)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {nameWords.map((word, wIndex) => (
                <span key={wIndex} className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0">
                  {word.split('').map((char, cIndex) => (
                    <motion.span
                      key={cIndex}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: (wIndex * 4 + cIndex) * 0.035 }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            {content.subtitle && (
              <motion.p
                className="text-lg sm:text-xl md:text-2xl font-semibold text-primary-600 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {content.subtitle}
              </motion.p>
            )}

            {content.roles && content.roles.length > 0 && (
              <div className="h-8 mb-5 flex items-center justify-center lg:justify-start font-mono text-sm sm:text-base text-[color:var(--text-secondary)]">
                <span className="text-primary-600 mr-2">&gt;</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {content.roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="ml-1 inline-block w-[2px] h-[1.1em] bg-primary-600 animate-blink" />
              </div>
            )}

            {content.description && (
              <motion.p
                className="text-base sm:text-lg text-[color:var(--text-secondary)] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.7 }}
              >
                {content.description}
              </motion.p>
            )}

            {content.ctaButtons && content.ctaButtons.length > 0 && (
              <motion.div
                className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                {content.ctaButtons.map((button, index) => (
                  <Button
                    key={index}
                    icon={index === 0 ? Eye : Download}
                    size="lg"
                    variant={index === 0 ? 'primary' : 'secondary'}
                    onClick={() => handleScroll(button.link)}
                    className="w-full xs:w-auto"
                  >
                    {button.text}
                  </Button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <div className="relative w-56 xs:w-64 sm:w-72 lg:w-full max-w-[22rem] mx-auto">
              {/* Offset frame */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-3xl border-2 border-primary-600/40" aria-hidden="true" />

              <div className="relative aspect-square rounded-3xl overflow-hidden border border-[color:var(--border-color)] bg-[color:var(--card-bg)] shadow-[0_12px_40px_var(--shadow-hover)]">
                <img
                  src={content.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'}
                  alt={content.title || 'Profile'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
                  }}
                />
              </div>

              {/* Floating chips */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-[color:var(--card-bg)] border border-[color:var(--border-color)] shadow-md flex items-center justify-center"
              >
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-[color:var(--card-bg)] border border-[color:var(--border-color)] shadow-md flex items-center justify-center"
              >
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-accent-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        {content.stats && content.stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="grid grid-cols-3 gap-2.5 sm:gap-5 max-w-3xl mx-auto mt-14 sm:mt-16"
          >
            {content.stats.map((stat, index) => (
              <div
                key={index}
                className="paper-card card-static !p-3 sm:!p-6 text-center"
              >
                <div className="text-xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="font-mono text-[0.6rem] xs:text-[0.65rem] sm:text-xs uppercase tracking-wider text-[color:var(--text-secondary)] leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
