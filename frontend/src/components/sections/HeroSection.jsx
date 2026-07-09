// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowDown, Download, Eye, Sparkles, Code, Rocket } from 'lucide-react';
// import Button from '../common/Button';
// import { contentAPI } from '../../services/api';

// const HeroSection = () => {
//   const [content, setContent] = useState(null);
//   const [roleIndex, setRoleIndex] = useState(0);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     loadContent();
//     const interval = setInterval(loadContent, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const loadContent = async () => {
//     try {
//       const response = await contentAPI.get('hero');
//       if (response && response.success) {
//         setContent(response.data || getDefaultContent());
//       } else {
//         setContent(getDefaultContent());
//       }
//     } catch (error) {
//       console.error('Failed to load hero content:', error);
//       setContent(getDefaultContent());
//     }
//   };

//   const getDefaultContent = () => ({
//     title: 'Your Name',
//     subtitle: 'Full Stack Developer',
//     description: 'Building digital experiences that inspire',
//     roles: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'],
//     photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
//     backgroundImage: '',
//     ctaButtons: [
//       { text: 'View Projects', link: '#projects' },
//       { text: 'Download Resume', link: '#resume' }
//     ],
//     stats: [
//       { value: '50+', label: 'Projects Completed' },
//       { value: '5+', label: 'Years Experience' },
//       { value: '100%', label: 'Client Satisfaction' }
//     ]
//   });

//   useEffect(() => {
//     if (!content?.roles || content.roles.length === 0) return;
    
//     const interval = setInterval(() => {
//       setRoleIndex((prev) => (prev + 1) % content.roles.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [content]);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth - 0.5) * 20,
//         y: (e.clientY / window.innerHeight - 0.5) * 20,
//       });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const handleScroll = (sectionId) => {
//     const element = document.querySelector(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   if (!content) {
//     return (
//       <section className="min-h-screen flex items-center justify-center">
//         <div className="loader animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary-600"></div>
//       </section>
//     );
//   }

//   const nameCharacters = (content.title || 'Your Name').split('');

//   return (
//     <section 
//       id="hero" 
//       className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8"
//       style={{
//         backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : undefined,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center'
//       }}
//     >
//       {/* Animated Background */}
//       <div className={`absolute inset-0 ${content.backgroundImage ? 'bg-black/50' : 'bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'}`}>
//         {/* Gradient Orbs */}
//         <motion.div
//           animate={{
//             x: mousePosition.x,
//             y: mousePosition.y,
//           }}
//           transition={{ type: 'spring', stiffness: 50 }}
//           className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-primary-500/20 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             x: -mousePosition.x,
//             y: -mousePosition.y,
//           }}
//           transition={{ type: 'spring', stiffness: 50 }}
//           className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-500/20 rounded-full blur-3xl"
//         />

//         {/* Floating Particles */}
//         {[...Array(30)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-primary-500 rounded-full opacity-20"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, -30, 0],
//               opacity: [0.2, 0.5, 0.2],
//               scale: [1, 1.2, 1],
//             }}
//             transition={{
//               duration: 3 + Math.random() * 2,
//               repeat: Infinity,
//               delay: Math.random() * 2,
//             }}
//           />
//         ))}

//         {/* Grid Pattern */}
//         <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto relative z-10 w-full">
//         <div className="max-w-7xl mx-auto">
          
//           {/* Greeting Animation */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-6 sm:mb-8 text-center lg:text-center"
//           >
//             <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-primary-200 dark:border-primary-800 shadow-lg">
//               <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 animate-pulse" />
//               <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Welcome to my portfolio
//               </span>
//             </div>
//           </motion.div>

//           {/* Two Column Layout */}
//           <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            
//             {/* Left Side - Profile Image */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8 }}
//               className="order-2 lg:order-1"
//             >
//               <div className="relative max-w-xs sm:max-w-md mx-auto">
//                 <div className="relative z-10">
//                   {/* Profile Photo Circle */}
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     className="aspect-square rounded-full overflow-hidden border-4 sm:border-8 border-white dark:border-gray-800 shadow-2xl relative"
//                   >
//                     <img
//                       src={content.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'}
//                       alt={content.title || 'Profile'}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
//                       }}
//                     />
//                     {/* Overlay gradient */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20"></div>
//                   </motion.div>

//                   {/* Floating Badges */}
//                   <motion.div
//                     animate={{ 
//                       y: [0, -10, 0],
//                       rotate: [0, 5, 0]
//                     }}
//                     transition={{ duration: 3, repeat: Infinity }}
//                     className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-primary-200 dark:border-primary-700"
//                   >
//                     <Code className="w-5 h-5 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" />
//                   </motion.div>

//                   <motion.div
//                     animate={{ 
//                       y: [0, 10, 0],
//                       rotate: [0, -5, 0]
//                     }}
//                     transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
//                     className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-purple-200 dark:border-purple-700"
//                   >
//                     <Rocket className="w-5 h-5 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
//                   </motion.div>
//                 </div>

//                 {/* Glow effect */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-purple-500/30 blur-3xl -z-10"></div>
//               </div>
//             </motion.div>

//             {/* Right Side - Text Content */}
//             <div className="order-1 lg:order-2 text-center lg:text-left">
              
//               {/* Name with Character Animation */}
//               <motion.h1 
//                 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-display font-bold mb-4 sm:mb-6 leading-tight"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {nameCharacters.map((char, index) => (
//                   <motion.span
//                     key={index}
//                     initial={{ opacity: 0, y: 50, rotateX: -90 }}
//                     animate={{ opacity: 1, y: 0, rotateX: 0 }}
//                     transition={{
//                       duration: 0.5,
//                       delay: index * 0.05,
//                       type: 'spring',
//                       stiffness: 100,
//                     }}
//                     className="inline-block text-gradient hover:scale-110 transition-transform cursor-default"
//                     style={{ transformOrigin: 'bottom' }}
//                   >
//                     {char === ' ' ? '\u00A0' : char}
//                   </motion.span>
//                 ))}
//               </motion.h1>

//               {/* Subtitle */}
//               {content.subtitle && (
//                 <motion.p
//                   className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary-600 dark:text-primary-400 mb-3 sm:mb-4"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.8, duration: 0.6 }}
//                 >
//                   {content.subtitle}
//                 </motion.p>
//               )}

//               {/* Animated Role Switcher */}
//               {content.roles && content.roles.length > 0 && (
//                 <div className="h-12 sm:h-16 md:h-20 mb-4 sm:mb-6 flex items-center justify-center lg:justify-start">
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={roleIndex}
//                       initial={{ opacity: 0, y: 20, scale: 0.8 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: -20, scale: 0.8 }}
//                       transition={{ duration: 0.5 }}
//                       className="flex items-center gap-2 sm:gap-3"
//                     >
//                       <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse" />
//                       <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-700 dark:text-gray-300">
//                         {content.roles[roleIndex]}
//                       </h2>
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>
//               )}

//               {/* Description */}
//               {content.description && (
//                 <motion.p
//                   className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed px-4 lg:px-0"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 1.2, duration: 0.8 }}
//                 >
//                   {content.description}
//                 </motion.p>
//               )}

//               {/* CTA Buttons */}
//               {content.ctaButtons && content.ctaButtons.length > 0 && (
//                 <motion.div
//                   className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 lg:px-0"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.4, duration: 0.6 }}
//                 >
//                   {content.ctaButtons.map((button, index) => (
//                     <Button 
//                       key={index}
//                       icon={index === 0 ? Eye : Download} 
//                       size="lg"
//                       variant={index === 0 ? 'primary' : 'secondary'}
//                       onClick={() => handleScroll(button.link)}
//                       className="shadow-xl hover:shadow-2xl w-full sm:w-auto"
//                     >
//                       {button.text}
//                     </Button>
//                   ))}
//                 </motion.div>
//               )}
//             </div>
//           </div>

//           {/* Stats/Features - Centered Below */}
//           {content.stats && content.stats.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1.6, duration: 0.6 }}
//               className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-8 max-w-3xl mx-auto mt-6 sm:mt-10 center"
//             >
//               {content.stats.map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   whileHover={{ scale: 1.05, y: -5 }}
//                   className="text-center p-4 sm:p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg"
//                 >
//                   <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
//                     {stat.value}
//                   </div>
//                   <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
//                     {stat.label}
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}

//           {/* Scroll Indicator */}
//           <motion.div
//             className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
//             animate={{ 
//               y: [0, 10, 0],
//             }}
//             transition={{ 
//               duration: 1.5, 
//               repeat: Infinity,
//               ease: 'easeInOut'
//             }}
//           >
            
//           </motion.div>
//         </div>
//       </div>

//       {/* Decorative Elements */}
//       <motion.div
//         className="absolute top-1/4 left-4 sm:left-10 hidden xl:block"
//         animate={{ 
//           rotate: 360,
//           scale: [1, 1.2, 1],
//         }}
//         transition={{ 
//           rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
//           scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
//         }}
//       >
//         <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary-300 dark:border-primary-700 rounded-lg opacity-50"></div>
//       </motion.div>

//       <motion.div
//         className="absolute bottom-1/4 right-4 sm:right-10 hidden xl:block"
//         animate={{ 
//           rotate: -360,
//           y: [0, -20, 0],
//         }}
//         transition={{ 
//           rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
//           y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
//         }}
//       >
//         <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-purple-300 dark:border-purple-700 rounded-full opacity-50"></div>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;





import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Download, Sparkles, Code, Rocket } from 'lucide-react';
import Button from '../common/Button';
import { contentAPI } from '../../services/api';

const HeroSection = () => {
  const [content, setContent] = useState(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadContent();
    const interval = setInterval(loadContent, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadContent = async () => {
    try {
      const response = await contentAPI.get('hero');
      if (response && response.success) {
        setContent(response.data || getDefaultContent());
      } else {
        setContent(getDefaultContent());
      }
    } catch (error) {
      console.error('Failed to load hero content:', error);
      setContent(getDefaultContent());
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScroll = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!content) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="loader animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary-600"></div>
      </section>
    );
  }

  const nameCharacters = (content.title || 'Your Name').split('');

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background */}
      <div className={`absolute inset-0 ${content.backgroundImage ? 'bg-black/50' : 'bg-paper dark:bg-ink'}`}>
        {/* Two restrained gradient accents instead of a busy multi-color blend */}
        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: -mousePosition.x,
            y: -mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-accent-500/10 rounded-full blur-3xl"
        />

        {/* Floating Particles — fewer, quieter */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary-500 rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto relative z-10 w-full">
        <div className="max-w-7xl mx-auto">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8 text-center lg:text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-hairline dark:border-hairline-dark">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
              <span className="font-mono text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                // 01 &mdash; Welcome
              </span>
            </div>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            
            {/* Left Side - Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative max-w-xs sm:max-w-md mx-auto">
                <div className="relative z-10">
                  {/* Profile Photo Circle */}
                  <div className="aspect-square rounded-full overflow-hidden border-4 sm:border-8 border-white dark:border-gray-800 shadow-xl relative">
                    <img
                      src={content.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'}
                      alt={content.title || 'Profile'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
                      }}
                    />
                  </div>

                  {/* Floating Badges */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center border border-hairline dark:border-hairline-dark"
                  >
                    <Code className="w-5 h-5 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" />
                  </motion.div>

                  <motion.div
                    animate={{ 
                      y: [0, 10, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center border border-hairline dark:border-hairline-dark"
                  >
                    <Rocket className="w-5 h-5 sm:w-8 sm:h-8 text-accent-600 dark:text-accent-400" />
                  </motion.div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary-500/10 blur-3xl -z-10"></div>
              </div>
            </motion.div>

            {/* Right Side - Text Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              
              {/* Name with Character Animation */}
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold mb-4 sm:mb-6 leading-tight text-ink dark:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {nameCharacters.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.04,
                    }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              {content.subtitle && (
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary-700 dark:text-primary-400 mb-3 sm:mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  {content.subtitle}
                </motion.p>
              )}

              {/* Animated Role Switcher */}
              {content.roles && content.roles.length > 0 && (
                <div className="h-12 sm:h-16 md:h-20 mb-4 sm:mb-6 flex items-center justify-center lg:justify-start">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={roleIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full" />
                      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-700 dark:text-gray-300">
                        {content.roles[roleIndex]}
                      </h2>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* Description */}
              {content.description && (
                <motion.p
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed px-4 lg:px-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  {content.description}
                </motion.p>
              )}

              {/* CTA Buttons */}
              {content.ctaButtons && content.ctaButtons.length > 0 && (
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 lg:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  {content.ctaButtons.map((button, index) => (
                    <Button 
                      key={index}
                      icon={index === 0 ? Eye : Download} 
                      size="lg"
                      variant={index === 0 ? 'primary' : 'secondary'}
                      onClick={() => handleScroll(button.link)}
                      className="w-full sm:w-auto"
                    >
                      {button.text}
                    </Button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Stats/Features - Centered Below */}
          {content.stats && content.stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-8 max-w-3xl mx-auto mt-6 sm:mt-10 center"
            >
              {content.stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 sm:p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-hairline dark:border-hairline-dark"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-primary-700 dark:text-primary-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
