// // // // import { useEffect, useState } from 'react';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { ArrowDown, Download, Eye, Sparkles, Code, Rocket } from 'lucide-react';
// // // // import Button from '../common/Button';
// // // // import { contentAPI } from '../../services/api';

// // // // const HeroSection = () => {
// // // //   const [content, setContent] = useState(null);
// // // //   const [roleIndex, setRoleIndex] = useState(0);
// // // //   const [isTyping, setIsTyping] = useState(true);
// // // //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

// // // //   useEffect(() => {
// // // //     loadContent();
// // // //   }, []);

// // // //   const loadContent = async () => {
// // // //     try {
// // // //       const data = await contentAPI.get('hero');
// // // //       setContent(data.data || {
// // // //         name: 'Your Name',
// // // //         tagline: 'Building digital experiences that inspire',
// // // //         roles: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'],
// // // //         backgroundStyle: 'particles',
// // // //         cta: {
// // // //           primary: { text: 'View Projects', link: '#projects' },
// // // //           secondary: { text: 'Download Resume', link: '#resume' }
// // // //         }
// // // //       });
// // // //     } catch (error) {
// // // //       console.error('Failed to load hero content:', error);
// // // //       // Set default content on error
// // // //       setContent({
// // // //         name: 'Your Name',
// // // //         tagline: 'Building digital experiences that inspire',
// // // //         roles: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'],
// // // //         backgroundStyle: 'particles',
// // // //         cta: {
// // // //           primary: { text: 'View Projects', link: '#projects' },
// // // //           secondary: { text: 'Download Resume', link: '#resume' }
// // // //         }
// // // //       });
// // // //     }
// // // //   };

// // // //   // Animated role switcher
// // // //   useEffect(() => {
// // // //     if (!content?.roles) return;
    
// // // //     const interval = setInterval(() => {
// // // //       setIsTyping(false);
// // // //       setTimeout(() => {
// // // //         setRoleIndex((prev) => (prev + 1) % content.roles.length);
// // // //         setIsTyping(true);
// // // //       }, 500);
// // // //     }, 3000);

// // // //     return () => clearInterval(interval);
// // // //   }, [content]);

// // // //   // Mouse tracking for parallax effect
// // // //   useEffect(() => {
// // // //     const handleMouseMove = (e) => {
// // // //       setMousePosition({
// // // //         x: (e.clientX / window.innerWidth - 0.5) * 20,
// // // //         y: (e.clientY / window.innerHeight - 0.5) * 20,
// // // //       });
// // // //     };

// // // //     window.addEventListener('mousemove', handleMouseMove);
// // // //     return () => window.removeEventListener('mousemove', handleMouseMove);
// // // //   }, []);

// // // //   const handleScroll = (sectionId) => {
// // // //     const element = document.querySelector(sectionId);
// // // //     if (element) {
// // // //       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
// // // //     }
// // // //   };

// // // //   if (!content) {
// // // //     return (
// // // //       <section className="min-h-screen flex items-center justify-center">
// // // //         <div className="loader"></div>
// // // //       </section>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <section 
// // // //       id="hero" 
// // // //       className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
// // // //     >
// // // //       {/* Animated Background */}
// // // //       <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
// // // //         {/* Gradient Orbs */}
// // // //         <motion.div
// // // //           animate={{
// // // //             x: mousePosition.x,
// // // //             y: mousePosition.y,
// // // //           }}
// // // //           transition={{ type: 'spring', stiffness: 50 }}
// // // //           className="absolute top-20 left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
// // // //         />
// // // //         <motion.div
// // // //           animate={{
// // // //             x: -mousePosition.x,
// // // //             y: -mousePosition.y,
// // // //           }}
// // // //           transition={{ type: 'spring', stiffness: 50 }}
// // // //           className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
// // // //         />

// // // //         {/* Floating Particles */}
// // // //         {[...Array(30)].map((_, i) => (
// // // //           <motion.div
// // // //             key={i}
// // // //             className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-20"
// // // //             style={{
// // // //               left: `${Math.random() * 100}%`,
// // // //               top: `${Math.random() * 100}%`,
// // // //             }}
// // // //             animate={{
// // // //               y: [0, -30, 0],
// // // //               opacity: [0.2, 0.5, 0.2],
// // // //               scale: [1, 1.2, 1],
// // // //             }}
// // // //             transition={{
// // // //               duration: 3 + Math.random() * 2,
// // // //               repeat: Infinity,
// // // //               delay: Math.random() * 2,
// // // //             }}
// // // //           />
// // // //         ))}

// // // //         {/* Grid Pattern */}
// // // //         <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
// // // //       </div>

// // // //       {/* Main Content */}
// // // //       <div className="container mx-auto px-4 relative z-10">
// // // //         <div className="max-w-5xl mx-auto text-center">
          
// // // //           {/* Greeting Animation */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: -20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ duration: 0.6 }}
// // // //             className="mb-6"
// // // //           >
// // // //             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-primary-200 dark:border-primary-800 shadow-lg">
// // // //               <Sparkles className="w-4 h-4 text-primary-600 animate-pulse" />
// // // //               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
// // // //                 Welcome to my portfolio
// // // //               </span>
// // // //             </div>
// // // //           </motion.div>

// // // //           {/* Name with Character Animation */}
// // // //           <motion.h1 
// // // //             className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
// // // //             initial={{ opacity: 0 }}
// // // //             animate={{ opacity: 1 }}
// // // //             transition={{ duration: 0.5 }}
// // // //           >
// // // //             {content.name.split('').map((char, index) => (
// // // //               <motion.span
// // // //                 key={index}
// // // //                 initial={{ opacity: 0, y: 50, rotateX: -90 }}
// // // //                 animate={{ opacity: 1, y: 0, rotateX: 0 }}
// // // //                 transition={{
// // // //                   duration: 0.5,
// // // //                   delay: index * 0.05,
// // // //                   type: 'spring',
// // // //                   stiffness: 100,
// // // //                 }}
// // // //                 className="inline-block text-gradient hover:scale-110 transition-transform cursor-default"
// // // //                 style={{ transformOrigin: 'bottom' }}
// // // //               >
// // // //                 {char === ' ' ? '\u00A0' : char}
// // // //               </motion.span>
// // // //             ))}
// // // //           </motion.h1>

// // // //           {/* Animated Role Switcher */}
// // // //           <div className="h-20 mb-8 flex items-center justify-center">
// // // //             <AnimatePresence mode="wait">
// // // //               <motion.div
// // // //                 key={roleIndex}
// // // //                 initial={{ opacity: 0, y: 20, scale: 0.8 }}
// // // //                 animate={{ opacity: 1, y: 0, scale: 1 }}
// // // //                 exit={{ opacity: 0, y: -20, scale: 0.8 }}
// // // //                 transition={{ duration: 0.5 }}
// // // //                 className="flex items-center gap-3"
// // // //               >
// // // //                 <Code className="w-8 h-8 text-primary-600 dark:text-primary-400" />
// // // //                 <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-gray-200">
// // // //                   {content.roles[roleIndex]}
// // // //                 </h2>
// // // //                 <Rocket className="w-8 h-8 text-purple-600 dark:text-purple-400" />
// // // //               </motion.div>
// // // //             </AnimatePresence>
// // // //           </div>

// // // //           {/* Tagline */}
// // // //           <motion.p
// // // //             className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
// // // //             initial={{ opacity: 0 }}
// // // //             animate={{ opacity: 1 }}
// // // //             transition={{ delay: 1.2, duration: 0.8 }}
// // // //           >
// // // //             {content.tagline}
// // // //           </motion.p>

// // // //           {/* CTA Buttons */}
// // // //           <motion.div
// // // //             className="flex flex-wrap gap-4 justify-center"
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ delay: 1.4, duration: 0.6 }}
// // // //           >
// // // //             <Button 
// // // //               icon={Eye} 
// // // //               size="lg"
// // // //               onClick={() => handleScroll(content.cta.primary.link)}
// // // //               className="shadow-xl hover:shadow-2xl"
// // // //             >
// // // //               {content.cta.primary.text}
// // // //             </Button>
// // // //             <Button 
// // // //               variant="secondary" 
// // // //               icon={Download}
// // // //               size="lg"
// // // //               onClick={() => handleScroll(content.cta.secondary.link)}
// // // //               className="shadow-xl hover:shadow-2xl"
// // // //             >
// // // //               {content.cta.secondary.text}
// // // //             </Button>
// // // //           </motion.div>

// // // //           {/* Stats/Features */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: 30 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ delay: 1.6, duration: 0.6 }}
// // // //             className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
// // // //           >
// // // //             {[
// // // //               { number: '50+', label: 'Projects Completed' },
// // // //               { number: '5+', label: 'Years Experience' },
// // // //               { number: '100%', label: 'Client Satisfaction' },
// // // //             ].map((stat, index) => (
// // // //               <motion.div
// // // //                 key={index}
// // // //                 whileHover={{ scale: 1.1, y: -5 }}
// // // //                 className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
// // // //               >
// // // //                 <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1">
// // // //                   {stat.number}
// // // //                 </div>
// // // //                 <div className="text-sm text-gray-600 dark:text-gray-400">
// // // //                   {stat.label}
// // // //                 </div>
// // // //               </motion.div>
// // // //             ))}
// // // //           </motion.div>

// // // //           {/* Scroll Indicator */}
// // // //           <motion.div
// // // //             className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
// // // //             animate={{ 
// // // //               y: [0, 10, 0],
// // // //             }}
// // // //             transition={{ 
// // // //               duration: 1.5, 
// // // //               repeat: Infinity,
// // // //               ease: 'easeInOut'
// // // //             }}
// // // //           >
// // // //             <button
// // // //               onClick={() => handleScroll('#about')}
// // // //               className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer group"
// // // //               aria-label="Scroll to about section"
// // // //             >
// // // //               <span className="text-sm font-medium">Scroll Down</span>
// // // //               <ArrowDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
// // // //             </button>
// // // //           </motion.div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Decorative Elements */}
// // // //       <motion.div
// // // //         className="absolute top-1/4 left-10 hidden lg:block"
// // // //         animate={{ 
// // // //           rotate: 360,
// // // //           scale: [1, 1.2, 1],
// // // //         }}
// // // //         transition={{ 
// // // //           rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
// // // //           scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
// // // //         }}
// // // //       >
// // // //         <div className="w-16 h-16 border-4 border-primary-300 dark:border-primary-700 rounded-lg opacity-50"></div>
// // // //       </motion.div>

// // // //       <motion.div
// // // //         className="absolute bottom-1/4 right-10 hidden lg:block"
// // // //         animate={{ 
// // // //           rotate: -360,
// // // //           y: [0, -20, 0],
// // // //         }}
// // // //         transition={{ 
// // // //           rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
// // // //           y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
// // // //         }}
// // // //       >
// // // //         <div className="w-12 h-12 border-4 border-purple-300 dark:border-purple-700 rounded-full opacity-50"></div>
// // // //       </motion.div>
// // // //     </section>
// // // //   );
// // // // };

// // // // export default HeroSection;

// // // import { useEffect, useState } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { ArrowDown, Download, Eye, Sparkles, Code, Rocket } from 'lucide-react';
// // // import Button from '../common/Button';
// // // import { contentAPI } from '../../services/api';

// // // const HeroSection = () => {
// // //   const [content, setContent] = useState(null);
// // //   const [roleIndex, setRoleIndex] = useState(0);
// // //   const [isTyping, setIsTyping] = useState(true);
// // //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
// // //   const [imageError, setImageError] = useState(false);

// // //   useEffect(() => {
// // //     loadContent();
// // //   }, []);

// // //   const loadContent = async () => {
// // //     try {
// // //       const data = await contentAPI.get('hero');
// // //       setContent(data.data || getDefaultContent());
// // //     } catch (error) {
// // //       console.error('Failed to load hero content:', error);
// // //       setContent(getDefaultContent());
// // //     }
// // //   };

// // //   const getDefaultContent = () => ({
// // //     name: 'Your Name',
// // //     tagline: 'Building digital experiences that inspire',
// // //     roles: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'],
// // //     // Using Unsplash as a reliable placeholder source
// // //     photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
// // //     backgroundStyle: 'particles',
// // //     cta: {
// // //       primary: { text: 'View Projects', link: '#projects' },
// // //       secondary: { text: 'Download Resume', link: '#resume' }
// // //     }
// // //   });

// // //   // Animated role switcher
// // //   useEffect(() => {
// // //     if (!content?.roles) return;
    
// // //     const interval = setInterval(() => {
// // //       setIsTyping(false);
// // //       setTimeout(() => {
// // //         setRoleIndex((prev) => (prev + 1) % content.roles.length);
// // //         setIsTyping(true);
// // //       }, 500);
// // //     }, 3000);

// // //     return () => clearInterval(interval);
// // //   }, [content]);

// // //   // Mouse tracking for parallax effect
// // //   useEffect(() => {
// // //     const handleMouseMove = (e) => {
// // //       setMousePosition({
// // //         x: (e.clientX / window.innerWidth - 0.5) * 20,
// // //         y: (e.clientY / window.innerHeight - 0.5) * 20,
// // //       });
// // //     };

// // //     window.addEventListener('mousemove', handleMouseMove);
// // //     return () => window.removeEventListener('mousemove', handleMouseMove);
// // //   }, []);

// // //   const handleScroll = (sectionId) => {
// // //     const element = document.querySelector(sectionId);
// // //     if (element) {
// // //       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
// // //     }
// // //   };

// // //   const handleImageError = () => {
// // //     setImageError(true);
// // //   };

// // //   // Generate gradient avatar as fallback
// // //   const getInitials = (name) => {
// // //     return name
// // //       .split(' ')
// // //       .map(word => word.charAt(0))
// // //       .join('')
// // //       .toUpperCase()
// // //       .slice(0, 2);
// // //   };

// // //   if (!content) {
// // //     return (
// // //       <section className="min-h-screen flex items-center justify-center">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
// // //       </section>
// // //     );
// // //   }

// // //   return (
// // //     <section 
// // //       id="hero" 
// // //       className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
// // //     >
// // //       {/* Animated Background */}
// // //       <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
// // //         {/* Gradient Orbs */}
// // //         <motion.div
// // //           animate={{
// // //             x: mousePosition.x,
// // //             y: mousePosition.y,
// // //           }}
// // //           transition={{ type: 'spring', stiffness: 50 }}
// // //           className="absolute top-20 left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
// // //         />
// // //         <motion.div
// // //           animate={{
// // //             x: -mousePosition.x,
// // //             y: -mousePosition.y,
// // //           }}
// // //           transition={{ type: 'spring', stiffness: 50 }}
// // //           className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
// // //         />

// // //         {/* Floating Particles */}
// // //         {[...Array(30)].map((_, i) => (
// // //           <motion.div
// // //             key={i}
// // //             className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-20"
// // //             style={{
// // //               left: `${Math.random() * 100}%`,
// // //               top: `${Math.random() * 100}%`,
// // //             }}
// // //             animate={{
// // //               y: [0, -30, 0],
// // //               opacity: [0.2, 0.5, 0.2],
// // //               scale: [1, 1.2, 1],
// // //             }}
// // //             transition={{
// // //               duration: 3 + Math.random() * 2,
// // //               repeat: Infinity,
// // //               delay: Math.random() * 2,
// // //             }}
// // //           />
// // //         ))}

// // //         {/* Grid Pattern */}
// // //         <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="container mx-auto px-4 relative z-10">
// // //         <div className="max-w-7xl mx-auto">
          
// // //           {/* Greeting Animation */}
// // //           <motion.div
// // //             initial={{ opacity: 0, y: -20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.6 }}
// // //             className="mb-8 text-center"
// // //           >
// // //             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-primary-200 dark:border-primary-800 shadow-lg">
// // //               <Sparkles className="w-4 h-4 text-primary-600 animate-pulse" />
// // //               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                 Welcome to my portfolio
// // //               </span>
// // //             </div>
// // //           </motion.div>

// // //           {/* Main Grid Layout - Photo + Content */}
// // //           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            
// // //             {/* Left Side - Photo */}
// // //             <motion.div
// // //               initial={{ opacity: 0, x: -50 }}
// // //               animate={{ opacity: 1, x: 0 }}
// // //               transition={{ duration: 0.8, delay: 0.2 }}
// // //               className="order-2 lg:order-1 flex justify-center lg:justify-end"
// // //             >
// // //               <div className="relative group">
// // //                 {/* Animated Border Rings */}
// // //                 <motion.div
// // //                   animate={{ rotate: 360 }}
// // //                   transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
// // //                   className="absolute -inset-4 bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 rounded-full opacity-75 blur-xl group-hover:opacity-100 transition-opacity"
// // //                 />
// // //                 <motion.div
// // //                   animate={{ rotate: -360 }}
// // //                   transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
// // //                   className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-primary-500 to-purple-500 rounded-full opacity-50"
// // //                 />
                
// // //                 {/* Photo Container */}
// // //                 <div className="relative">
// // //                   <motion.div
// // //                     whileHover={{ scale: 1.05 }}
// // //                     transition={{ type: 'spring', stiffness: 300 }}
// // //                     className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
// // //                   >
// // //                     {/* Image or Fallback Avatar */}
// // //                     <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl bg-gradient-to-br from-primary-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
// // //                       {!imageError ? (
// // //                         <img
// // //                           src={content.photoUrl}
// // //                           alt={content.name}
// // //                           className="w-full h-full object-cover"
// // //                           onError={handleImageError}
// // //                           loading="lazy"
// // //                         />
// // //                       ) : (
// // //                         // Fallback gradient avatar with initials
// // //                         <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-purple-600">
// // //                           <span className="text-8xl sm:text-9xl font-bold text-white">
// // //                             {getInitials(content.name)}
// // //                           </span>
// // //                         </div>
// // //                       )}
// // //                     </div>
                    
// // //                     {/* Floating Icons */}
// // //                     <motion.div
// // //                       animate={{ 
// // //                         y: [0, -10, 0],
// // //                         rotate: [0, 5, 0]
// // //                       }}
// // //                       transition={{ duration: 3, repeat: Infinity }}
// // //                       className="absolute -top-4 -right-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-primary-200 dark:border-primary-700"
// // //                     >
// // //                       <Code className="w-8 h-8 text-primary-600 dark:text-primary-400" />
// // //                     </motion.div>
                    
// // //                     <motion.div
// // //                       animate={{ 
// // //                         y: [0, 10, 0],
// // //                         rotate: [0, -5, 0]
// // //                       }}
// // //                       transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
// // //                       className="absolute -bottom-4 -left-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-purple-200 dark:border-purple-700"
// // //                     >
// // //                       <Rocket className="w-8 h-8 text-purple-600 dark:text-purple-400" />
// // //                     </motion.div>
// // //                   </motion.div>
// // //                 </div>
// // //               </div>
// // //             </motion.div>

// // //             {/* Right Side - Text Content */}
// // //             <div className="order-1 lg:order-2 text-center lg:text-left">
              
// // //               {/* Name with Character Animation */}
// // //               <motion.h1 
// // //                 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 leading-tight"
// // //                 initial={{ opacity: 0 }}
// // //                 animate={{ opacity: 1 }}
// // //                 transition={{ duration: 0.5 }}
// // //               >
// // //                 {content.name.split('').map((char, index) => (
// // //                   <motion.span
// // //                     key={index}
// // //                     initial={{ opacity: 0, y: 50, rotateX: -90 }}
// // //                     animate={{ opacity: 1, y: 0, rotateX: 0 }}
// // //                     transition={{
// // //                       duration: 0.5,
// // //                       delay: index * 0.05,
// // //                       type: 'spring',
// // //                       stiffness: 100,
// // //                     }}
// // //                     className="inline-block text-gradient hover:scale-110 transition-transform cursor-default"
// // //                     style={{ transformOrigin: 'bottom' }}
// // //                   >
// // //                     {char === ' ' ? '\u00A0' : char}
// // //                   </motion.span>
// // //                 ))}
// // //               </motion.h1>

// // //               {/* Animated Role Switcher */}
// // //               <div className="h-16 sm:h-20 mb-6 flex items-center justify-center lg:justify-start">
// // //                 <AnimatePresence mode="wait">
// // //                   <motion.div
// // //                     key={roleIndex}
// // //                     initial={{ opacity: 0, y: 20, scale: 0.8 }}
// // //                     animate={{ opacity: 1, y: 0, scale: 1 }}
// // //                     exit={{ opacity: 0, y: -20, scale: 0.8 }}
// // //                     transition={{ duration: 0.5 }}
// // //                     className="flex items-center gap-2 sm:gap-3"
// // //                   >
// // //                     <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse" />
// // //                     <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200">
// // //                       {content.roles[roleIndex]}
// // //                     </h2>
// // //                   </motion.div>
// // //                 </AnimatePresence>
// // //               </div>

// // //               {/* Tagline */}
// // //               <motion.p
// // //                 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
// // //                 initial={{ opacity: 0 }}
// // //                 animate={{ opacity: 1 }}
// // //                 transition={{ delay: 1.2, duration: 0.8 }}
// // //               >
// // //                 {content.tagline}
// // //               </motion.p>

// // //               {/* CTA Buttons */}
// // //               <motion.div
// // //                 className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ delay: 1.4, duration: 0.6 }}
// // //               >
// // //                 <Button 
// // //                   icon={Eye} 
// // //                   size="lg"
// // //                   onClick={() => handleScroll(content.cta.primary.link)}
// // //                   className="shadow-xl hover:shadow-2xl"
// // //                 >
// // //                   {content.cta.primary.text}
// // //                 </Button>
// // //                 <Button 
// // //                   variant="secondary" 
// // //                   icon={Download}
// // //                   size="lg"
// // //                   onClick={() => handleScroll(content.cta.secondary.link)}
// // //                   className="shadow-xl hover:shadow-2xl"
// // //                 >
// // //                   {content.cta.secondary.text}
// // //                 </Button>
// // //               </motion.div>
// // //             </div>
// // //           </div>

// // //           {/* Stats/Features - Centered Below */}
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 30 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ delay: 1.6, duration: 0.6 }}
// // //             className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto"
// // //           >
// // //             {[
// // //               { number: '50+', label: 'Projects Completed' },
// // //               { number: '5+', label: 'Years Experience' },
// // //               { number: '100%', label: 'Client Satisfaction' },
// // //             ].map((stat, index) => (
// // //               <motion.div
// // //                 key={index}
// // //                 whileHover={{ scale: 1.05, y: -5 }}
// // //                 className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg"
// // //               >
// // //                 <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
// // //                   {stat.number}
// // //                 </div>
// // //                 <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
// // //                   {stat.label}
// // //                 </div>
// // //               </motion.div>
// // //             ))}
// // //           </motion.div>

// // //           {/* Scroll Indicator */}
// // //           <motion.div
// // //             className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
// // //             animate={{ 
// // //               y: [0, 10, 0],
// // //             }}
// // //             transition={{ 
// // //               duration: 1.5, 
// // //               repeat: Infinity,
// // //               ease: 'easeInOut'
// // //             }}
// // //           >
// // //             <button
// // //               onClick={() => handleScroll('#about')}
// // //               className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer group"
// // //               aria-label="Scroll to about section"
// // //             >
// // //               <span className="text-sm font-medium">Scroll Down</span>
// // //               <ArrowDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
// // //             </button>
// // //           </motion.div>
// // //         </div>
// // //       </div>

// // //       {/* Decorative Elements */}
// // //       <motion.div
// // //         className="absolute top-1/4 left-10 hidden xl:block"
// // //         animate={{ 
// // //           rotate: 360,
// // //           scale: [1, 1.2, 1],
// // //         }}
// // //         transition={{ 
// // //           rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
// // //           scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
// // //         }}
// // //       >
// // //         <div className="w-16 h-16 border-4 border-primary-300 dark:border-primary-700 rounded-lg opacity-50"></div>
// // //       </motion.div>

// // //       <motion.div
// // //         className="absolute bottom-1/4 right-10 hidden xl:block"
// // //         animate={{ 
// // //           rotate: -360,
// // //           y: [0, -20, 0],
// // //         }}
// // //         transition={{ 
// // //           rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
// // //           y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
// // //         }}
// // //       >
// // //         <div className="w-12 h-12 border-4 border-purple-300 dark:border-purple-700 rounded-full opacity-50"></div>
// // //       </motion.div>
// // //     </section>
// // //   );
// // // };

// // // export default HeroSection;



// // import { useEffect, useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { ArrowDown, Download, Eye, Sparkles, Code, Rocket } from 'lucide-react';
// // import Button from '../common/Button';
// // import { contentAPI } from '../../services/api';

// // const HeroSection = () => {
// //   const [content, setContent] = useState(null);
// //   const [roleIndex, setRoleIndex] = useState(0);
// //   const [isTyping, setIsTyping] = useState(true);
// //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
// //   const [imageError, setImageError] = useState(false);

// //   useEffect(() => {
// //     loadContent();
// //   }, []);

// //   const getDefaultContent = () => ({
// //     name: 'Your Name',
// //     tagline: 'Building digital experiences that inspire',
// //     roles: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'],
// //     photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
// //     backgroundStyle: 'particles',
// //     cta: {
// //       primary: { text: 'View Projects', link: '#projects' },
// //       secondary: { text: 'Download Resume', link: '#resume' }
// //     }
// //   });

// //   const loadContent = async () => {
// //     try {
// //       const data = await contentAPI.get('hero');
      
// //       // Ensure we have valid content with all required fields
// //       const loadedContent = data.data || {};
// //       const defaultContent = getDefaultContent();
      
// //       setContent({
// //         name: loadedContent.name || defaultContent.name,
// //         tagline: loadedContent.tagline || defaultContent.tagline,
// //         roles: loadedContent.roles && loadedContent.roles.length > 0 
// //           ? loadedContent.roles 
// //           : defaultContent.roles,
// //         photoUrl: loadedContent.photoUrl || defaultContent.photoUrl,
// //         backgroundStyle: loadedContent.backgroundStyle || defaultContent.backgroundStyle,
// //         cta: loadedContent.cta || defaultContent.cta
// //       });
// //     } catch (error) {
// //       console.error('Failed to load hero content:', error);
// //       setContent(getDefaultContent());
// //     }
// //   };

// //   // Animated role switcher
// //   useEffect(() => {
// //     if (!content?.roles || content.roles.length === 0) return;
    
// //     const interval = setInterval(() => {
// //       setIsTyping(false);
// //       setTimeout(() => {
// //         setRoleIndex((prev) => (prev + 1) % content.roles.length);
// //         setIsTyping(true);
// //       }, 500);
// //     }, 3000);

// //     return () => clearInterval(interval);
// //   }, [content]);

// //   // Mouse tracking for parallax effect
// //   useEffect(() => {
// //     const handleMouseMove = (e) => {
// //       setMousePosition({
// //         x: (e.clientX / window.innerWidth - 0.5) * 20,
// //         y: (e.clientY / window.innerHeight - 0.5) * 20,
// //       });
// //     };

// //     window.addEventListener('mousemove', handleMouseMove);
// //     return () => window.removeEventListener('mousemove', handleMouseMove);
// //   }, []);

// //   const handleScroll = (sectionId) => {
// //     const element = document.querySelector(sectionId);
// //     if (element) {
// //       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
// //     }
// //   };

// //   const handleImageError = () => {
// //     setImageError(true);
// //   };

// //   // Generate gradient avatar as fallback
// //   const getInitials = (name) => {
// //     if (!name || typeof name !== 'string') return 'YN';
    
// //     return name
// //       .split(' ')
// //       .map(word => word.charAt(0))
// //       .join('')
// //       .toUpperCase()
// //       .slice(0, 2) || 'YN';
// //   };

// //   if (!content) {
// //     return (
// //       <section className="min-h-screen flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
// //       </section>
// //     );
// //   }

// //   // Safe name splitting with null check
// //   const nameCharacters = (content.name || 'Your Name').split('');

// //   return (
// //     <section 
// //       id="hero" 
// //       className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
// //     >
// //       {/* Animated Background */}
// //       <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
// //         {/* Gradient Orbs */}
// //         <motion.div
// //           animate={{
// //             x: mousePosition.x,
// //             y: mousePosition.y,
// //           }}
// //           transition={{ type: 'spring', stiffness: 50 }}
// //           className="absolute top-20 left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
// //         />
// //         <motion.div
// //           animate={{
// //             x: -mousePosition.x,
// //             y: -mousePosition.y,
// //           }}
// //           transition={{ type: 'spring', stiffness: 50 }}
// //           className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
// //         />

// //         {/* Floating Particles */}
// //         {[...Array(30)].map((_, i) => (
// //           <motion.div
// //             key={i}
// //             className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-20"
// //             style={{
// //               left: `${Math.random() * 100}%`,
// //               top: `${Math.random() * 100}%`,
// //             }}
// //             animate={{
// //               y: [0, -30, 0],
// //               opacity: [0.2, 0.5, 0.2],
// //               scale: [1, 1.2, 1],
// //             }}
// //             transition={{
// //               duration: 3 + Math.random() * 2,
// //               repeat: Infinity,
// //               delay: Math.random() * 2,
// //             }}
// //           />
// //         ))}

// //         {/* Grid Pattern */}
// //         <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="container mx-auto px-4 relative z-10">
// //         <div className="max-w-7xl mx-auto">
          
// //           {/* Greeting Animation */}
// //           <motion.div
// //             initial={{ opacity: 0, y: -20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             className="mb-8 text-center"
// //           >
// //             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-primary-200 dark:border-primary-800 shadow-lg">
// //               <Sparkles className="w-4 h-4 text-primary-600 animate-pulse" />
// //               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
// //                 Welcome to my portfolio
// //               </span>
// //             </div>
// //           </motion.div>

// //           {/* Main Grid Layout - Photo + Content */}
// //           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            
// //             {/* Left Side - Photo */}
// //             <motion.div
// //               initial={{ opacity: 0, x: -50 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.8, delay: 0.2 }}
// //               className="order-2 lg:order-1 flex justify-center lg:justify-end"
// //             >
// //               <div className="relative group">
// //                 {/* Animated Border Rings */}
// //                 <motion.div
// //                   animate={{ rotate: 360 }}
// //                   transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
// //                   className="absolute -inset-4 bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 rounded-full opacity-75 blur-xl group-hover:opacity-100 transition-opacity"
// //                 />
// //                 <motion.div
// //                   animate={{ rotate: -360 }}
// //                   transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
// //                   className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-primary-500 to-purple-500 rounded-full opacity-50"
// //                 />
                
// //                 {/* Photo Container */}
// //                 <div className="relative">
// //                   <motion.div
// //                     whileHover={{ scale: 1.05 }}
// //                     transition={{ type: 'spring', stiffness: 300 }}
// //                     className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
// //                   >
// //                     {/* Image or Fallback Avatar */}
// //                     <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl bg-gradient-to-br from-primary-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
// //                       {!imageError && content.photoUrl ? (
// //                         <img
// //                           src={content.photoUrl}
// //                           alt={content.name}
// //                           className="w-full h-full object-cover"
// //                           onError={handleImageError}
// //                           loading="lazy"
// //                         />
// //                       ) : (
// //                         // Fallback gradient avatar with initials
// //                         <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-purple-600">
// //                           <span className="text-8xl sm:text-9xl font-bold text-white">
// //                             {getInitials(content.name)}
// //                           </span>
// //                         </div>
// //                       )}
// //                     </div>
                    
// //                     {/* Floating Icons */}
// //                     <motion.div
// //                       animate={{ 
// //                         y: [0, -10, 0],
// //                         rotate: [0, 5, 0]
// //                       }}
// //                       transition={{ duration: 3, repeat: Infinity }}
// //                       className="absolute -top-4 -right-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-primary-200 dark:border-primary-700"
// //                     >
// //                       <Code className="w-8 h-8 text-primary-600 dark:text-primary-400" />
// //                     </motion.div>
                    
// //                     <motion.div
// //                       animate={{ 
// //                         y: [0, 10, 0],
// //                         rotate: [0, -5, 0]
// //                       }}
// //                       transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
// //                       className="absolute -bottom-4 -left-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-purple-200 dark:border-purple-700"
// //                     >
// //                       <Rocket className="w-8 h-8 text-purple-600 dark:text-purple-400" />
// //                     </motion.div>
// //                   </motion.div>
// //                 </div>
// //               </div>
// //             </motion.div>

// //             {/* Right Side - Text Content */}
// //             <div className="order-1 lg:order-2 text-center lg:text-left">
              
// //               {/* Name with Character Animation */}
// //               <motion.h1 
// //                 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 leading-tight"
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 transition={{ duration: 0.5 }}
// //               >
// //                 {nameCharacters.map((char, index) => (
// //                   <motion.span
// //                     key={index}
// //                     initial={{ opacity: 0, y: 50, rotateX: -90 }}
// //                     animate={{ opacity: 1, y: 0, rotateX: 0 }}
// //                     transition={{
// //                       duration: 0.5,
// //                       delay: index * 0.05,
// //                       type: 'spring',
// //                       stiffness: 100,
// //                     }}
// //                     className="inline-block text-gradient hover:scale-110 transition-transform cursor-default"
// //                     style={{ transformOrigin: 'bottom' }}
// //                   >
// //                     {char === ' ' ? '\u00A0' : char}
// //                   </motion.span>
// //                 ))}
// //               </motion.h1>

// //               {/* Animated Role Switcher */}
// //               <div className="h-16 sm:h-20 mb-6 flex items-center justify-center lg:justify-start">
// //                 <AnimatePresence mode="wait">
// //                   <motion.div
// //                     key={roleIndex}
// //                     initial={{ opacity: 0, y: 20, scale: 0.8 }}
// //                     animate={{ opacity: 1, y: 0, scale: 1 }}
// //                     exit={{ opacity: 0, y: -20, scale: 0.8 }}
// //                     transition={{ duration: 0.5 }}
// //                     className="flex items-center gap-2 sm:gap-3"
// //                   >
// //                     <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse" />
// //                     <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200">
// //                       {content.roles && content.roles[roleIndex] ? content.roles[roleIndex] : 'Developer'}
// //                     </h2>
// //                   </motion.div>
// //                 </AnimatePresence>
// //               </div>

// //               {/* Tagline */}
// //               <motion.p
// //                 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 transition={{ delay: 1.2, duration: 0.8 }}
// //               >
// //                 {content.tagline || 'Building digital experiences that inspire'}
// //               </motion.p>

// //               {/* CTA Buttons */}
// //               {content.cta && (
// //                 <motion.div
// //                   className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: 1.4, duration: 0.6 }}
// //                 >
// //                   {content.cta.primary && (
// //                     <Button 
// //                       icon={Eye} 
// //                       size="lg"
// //                       onClick={() => handleScroll(content.cta.primary.link)}
// //                       className="shadow-xl hover:shadow-2xl"
// //                     >
// //                       {content.cta.primary.text}
// //                     </Button>
// //                   )}
// //                   {content.cta.secondary && (
// //                     <Button 
// //                       variant="secondary" 
// //                       icon={Download}
// //                       size="lg"
// //                       onClick={() => handleScroll(content.cta.secondary.link)}
// //                       className="shadow-xl hover:shadow-2xl"
// //                     >
// //                       {content.cta.secondary.text}
// //                     </Button>
// //                   )}
// //                 </motion.div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Stats/Features - Centered Below */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 1.6, duration: 0.6 }}
// //             className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto"
// //           >
// //             {[
// //               { number: '50+', label: 'Projects Completed' },
// //               { number: '5+', label: 'Years Experience' },
// //               { number: '100%', label: 'Client Satisfaction' },
// //             ].map((stat, index) => (
// //               <motion.div
// //                 key={index}
// //                 whileHover={{ scale: 1.05, y: -5 }}
// //                 className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg"
// //               >
// //                 <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
// //                   {stat.number}
// //                 </div>
// //                 <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
// //                   {stat.label}
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </motion.div>

// //           {/* Scroll Indicator */}
// //           <motion.div
// //             className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
// //             animate={{ 
// //               y: [0, 10, 0],
// //             }}
// //             transition={{ 
// //               duration: 1.5, 
// //               repeat: Infinity,
// //               ease: 'easeInOut'
// //             }}
// //           >
// //             <button
// //               onClick={() => handleScroll('#about')}
// //               className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer group"
// //               aria-label="Scroll to about section"
// //             >
// //               <span className="text-sm font-medium">Scroll Down</span>
// //               <ArrowDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
// //             </button>
// //           </motion.div>
// //         </div>
// //       </div>

// //       {/* Decorative Elements */}
// //       <motion.div
// //         className="absolute top-1/4 left-10 hidden xl:block"
// //         animate={{ 
// //           rotate: 360,
// //           scale: [1, 1.2, 1],
// //         }}
// //         transition={{ 
// //           rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
// //           scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
// //         }}
// //       >
// //         <div className="w-16 h-16 border-4 border-primary-300 dark:border-primary-700 rounded-lg opacity-50"></div>
// //       </motion.div>

// //       <motion.div
// //         className="absolute bottom-1/4 right-10 hidden xl:block"
// //         animate={{ 
// //           rotate: -360,
// //           y: [0, -20, 0],
// //         }}
// //         transition={{ 
// //           rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
// //           y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
// //         }}
// //       >
// //         <div className="w-12 h-12 border-4 border-purple-300 dark:border-purple-700 rounded-full opacity-50"></div>
// //       </motion.div>
// //     </section>
// //   );
// // };

// // export default HeroSection;


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
//     // Refresh content every 10 seconds to catch updates
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

//   // Animated role switcher
//   useEffect(() => {
//     if (!content?.roles || content.roles.length === 0) return;
    
//     const interval = setInterval(() => {
//       setRoleIndex((prev) => (prev + 1) % content.roles.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [content]);

//   // Mouse tracking for parallax effect
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
//         <div className="loader animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
//       </section>
//     );
//   }

//   const nameCharacters = (content.title || 'Your Name').split('');

//   return (
//     <section 
//       id="hero" 
//       className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
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
//           className="absolute top-20 left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             x: -mousePosition.x,
//             y: -mousePosition.y,
//           }}
//           transition={{ type: 'spring', stiffness: 50 }}
//           className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
//         />

//         {/* Floating Particles */}
//         {[...Array(30)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-20"
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
//       <div className="container mx-auto px-4 relative z-10">
//         <div className="max-w-7xl mx-auto">
          
//           {/* Greeting Animation */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-8 text-center lg:text-left"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-primary-200 dark:border-primary-800 shadow-lg">
//               <Sparkles className="w-4 h-4 text-primary-600 animate-pulse" />
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Welcome to my portfolio
//               </span>
//             </div>
//           </motion.div>

//           {/* Two Column Layout */}
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
            
//             {/* Left Side - Profile Image */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8 }}
//               className="order-2 lg:order-1"
//             >
//               <div className="relative max-w-md mx-auto">
//                 <div className="relative z-10">
//                   {/* Profile Photo Circle */}
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     className="aspect-square rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl relative"
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
//                     className="absolute -top-4 -right-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-primary-200 dark:border-primary-700"
//                   >
//                     <Code className="w-8 h-8 text-primary-600 dark:text-primary-400" />
//                   </motion.div>

//                   <motion.div
//                     animate={{ 
//                       y: [0, 10, 0],
//                       rotate: [0, -5, 0]
//                     }}
//                     transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
//                     className="absolute -bottom-4 -left-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-purple-200 dark:border-purple-700"
//                   >
//                     <Rocket className="w-8 h-8 text-purple-600 dark:text-purple-400" />
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
//                 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 leading-tight"
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
//                   className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mb-4"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.8, duration: 0.6 }}
//                 >
//                   {content.subtitle}
//                 </motion.p>
//               )}

//               {/* Animated Role Switcher */}
//               {content.roles && content.roles.length > 0 && (
//                 <div className="h-16 sm:h-20 mb-6 flex items-center justify-center lg:justify-start">
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
//                       <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300">
//                         {content.roles[roleIndex]}
//                       </h2>
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>
//               )}

//               {/* Description */}
//               {content.description && (
//                 <motion.p
//                   className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
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
//                   className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
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
//                       className="shadow-xl hover:shadow-2xl"
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
//               className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto mt-16"
//             >
//               {content.stats.map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   whileHover={{ scale: 1.05, y: -5 }}
//                   className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg"
//                 >
//                   <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
//                     {stat.label}
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}

//           {/* Scroll Indicator */}
//           <motion.div
//             className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
//             animate={{ 
//               y: [0, 10, 0],
//             }}
//             transition={{ 
//               duration: 1.5, 
//               repeat: Infinity,
//               ease: 'easeInOut'
//             }}
//           >
//             <button
//               onClick={() => handleScroll('#about')}
//               className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer group"
//               aria-label="Scroll to about section"
//             >
//               <span className="text-sm font-medium">Scroll Down</span>
//               <ArrowDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
//             </button>
//           </motion.div>
//         </div>
//       </div>

//       {/* Decorative Elements */}
//       <motion.div
//         className="absolute top-1/4 left-10 hidden xl:block"
//         animate={{ 
//           rotate: 360,
//           scale: [1, 1.2, 1],
//         }}
//         transition={{ 
//           rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
//           scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
//         }}
//       >
//         <div className="w-16 h-16 border-4 border-primary-300 dark:border-primary-700 rounded-lg opacity-50"></div>
//       </motion.div>

//       <motion.div
//         className="absolute bottom-1/4 right-10 hidden xl:block"
//         animate={{ 
//           rotate: -360,
//           y: [0, -20, 0],
//         }}
//         transition={{ 
//           rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
//           y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
//         }}
//       >
//         <div className="w-12 h-12 border-4 border-purple-300 dark:border-purple-700 rounded-full opacity-50"></div>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Download, Eye, Sparkles, Code, Rocket } from 'lucide-react';
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
      {/* Animated Background */}
      <div className={`absolute inset-0 ${content.backgroundImage ? 'bg-black/50' : 'bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'}`}>
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-primary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: -mousePosition.x,
            y: -mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-500/20 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-primary-500 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
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
          
          {/* Greeting Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8 text-center lg:text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-primary-200 dark:border-primary-800 shadow-lg">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                Welcome to my portfolio
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
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-full overflow-hidden border-4 sm:border-8 border-white dark:border-gray-800 shadow-2xl relative"
                  >
                    <img
                      src={content.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'}
                      alt={content.title || 'Profile'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
                      }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20"></div>
                  </motion.div>

                  {/* Floating Badges */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-primary-200 dark:border-primary-700"
                  >
                    <Code className="w-5 h-5 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" />
                  </motion.div>

                  <motion.div
                    animate={{ 
                      y: [0, 10, 0],
                      rotate: [0, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-purple-200 dark:border-purple-700"
                  >
                    <Rocket className="w-5 h-5 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                  </motion.div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-purple-500/30 blur-3xl -z-10"></div>
              </div>
            </motion.div>

            {/* Right Side - Text Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              
              {/* Name with Character Animation */}
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-display font-bold mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {nameCharacters.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    className="inline-block text-gradient hover:scale-110 transition-transform cursor-default"
                    style={{ transformOrigin: 'bottom' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              {content.subtitle && (
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary-600 dark:text-primary-400 mb-3 sm:mb-4"
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
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse" />
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
                      className="shadow-xl hover:shadow-2xl w-full sm:w-auto"
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
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-4 sm:p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-1/4 left-4 sm:left-10 hidden xl:block"
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary-300 dark:border-primary-700 rounded-lg opacity-50"></div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-4 sm:right-10 hidden xl:block"
        animate={{ 
          rotate: -360,
          y: [0, -20, 0],
        }}
        transition={{ 
          rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-purple-300 dark:border-purple-700 rounded-full opacity-50"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;