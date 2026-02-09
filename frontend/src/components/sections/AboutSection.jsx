// // import { useEffect, useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { contentAPI } from '../../services/api';

// // const AboutSection = () => {
// //   const [content, setContent] = useState(null);

// //   useEffect(() => {
// //     loadContent();
// //   }, []);

// //   const loadContent = async () => {
// //     try {
// //       const data = await contentAPI.get('about');
// //       setContent(data.data);
// //     } catch (error) {
// //       console.error('Failed to load about content:', error);
// //     }
// //   };

// //   if (!content) return null;

// //   const fadeIn = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: { opacity: 1, y: 0 }
// //   };

// //   return (
// //     <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
// //       <div className="container mx-auto px-4">
// //         <motion.div
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.6 }}
// //           variants={fadeIn}
// //           className="max-w-6xl mx-auto"
// //         >
// //           <h2 className="text-5xl font-display font-bold text-center mb-16 text-gradient">
// //             About Me
// //           </h2>

// //           <div className="grid md:grid-cols-2 gap-12 items-center">
// //             <motion.div
// //               initial={{ opacity: 0, x: -50 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6 }}
// //               className="relative"
// //             >
// //               <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
// //                 <img
// //                   src={content.image?.url || 'https://via.placeholder.com/500'}
// //                   alt={content.image?.alt || 'Profile'}
// //                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
// //                 />
// //               </div>
// //               <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500 rounded-full opacity-20 blur-3xl" />
// //             </motion.div>

// //             <motion.div
// //               initial={{ opacity: 0, x: 50 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.2 }}
// //               className="space-y-8"
// //             >
// //               <div className="space-y-4">
// //                 <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
// //                   Who I Am
// //                 </h3>
// //                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
// //                   {content.whoIAm || 'Your story goes here...'}
// //                 </p>
// //               </div>

// //               <div className="space-y-4">
// //                 <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
// //                   What I Do
// //                 </h3>
// //                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
// //                   {content.whatIDo || 'What you do professionally...'}
// //                 </p>
// //               </div>

// //               <div className="space-y-4">
// //                 <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
// //                   Why I Build
// //                 </h3>
// //                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
// //                   {content.whyIBuild || 'Your motivation and passion...'}
// //                 </p>
// //               </div>

// //               {content.achievements && content.achievements.length > 0 && (
// //                 <div className="grid grid-cols-2 gap-4 pt-6">
// //                   {content.achievements.map((achievement, index) => (
// //                     <motion.div
// //                       key={index}
// //                       whileHover={{ scale: 1.05 }}
// //                       className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
// //                     >
// //                       <p className="text-3xl font-bold text-primary-600">
// //                         {achievement.value}
// //                       </p>
// //                       <p className="text-sm text-gray-600 dark:text-gray-400">
// //                         {achievement.label}
// //                       </p>
// //                     </motion.div>
// //                   ))}
// //                 </div>
// //               )}
// //             </motion.div>
// //           </div>
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default AboutSection;

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { MapPin, Briefcase, CheckCircle } from 'lucide-react';
// import { contentAPI } from '../../services/api';

// const AboutSection = () => {
//   const [content, setContent] = useState(null);

//   useEffect(() => {
//     loadContent();
//     // Refresh content every 10 seconds to catch updates
//     const interval = setInterval(loadContent, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const loadContent = async () => {
//     try {
//       const response = await contentAPI.get('about');
//       if (response && response.success) {
//         setContent(response.data || getDefaultContent());
//       } else {
//         setContent(getDefaultContent());
//       }
//     } catch (error) {
//       console.error('Failed to load about content:', error);
//       setContent(getDefaultContent());
//     }
//   };

//   const getDefaultContent = () => ({
//     title: 'About Me',
//     bio: 'Your story goes here...',
//     image: '',
//     highlights: ['Award-winning developer', 'Open source contributor', 'Tech enthusiast'],
//     experience: '5+ years',
//     location: 'Your City, Country',
//     availability: 'Open to opportunities'
//   });

//   if (!content) return null;

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   return (
//     <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           variants={fadeIn}
//           className="max-w-6xl mx-auto"
//         >
//           <h2 className="text-5xl font-display font-bold text-center mb-4 text-gradient">
//             {content.title || 'About Me'}
//           </h2>
          
//           {/* Quick Info Pills */}
//           <div className="flex flex-wrap justify-center gap-3 mb-16">
//             {content.experience && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
//               >
//                 <Briefcase className="w-4 h-4 text-primary-600" />
//                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   {content.experience}
//                 </span>
//               </motion.div>
//             )}
//             {content.location && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.1 }}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
//               >
//                 <MapPin className="w-4 h-4 text-primary-600" />
//                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   {content.location}
//                 </span>
//               </motion.div>
//             )}
//             {content.availability && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.2 }}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full shadow-md"
//               >
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="text-sm font-medium text-green-700 dark:text-green-300">
//                   {content.availability}
//                 </span>
//               </motion.div>
//             )}
//           </div>

//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             {/* Profile Image */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="relative"
//             >
//               <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative">
//                 <img
//                   src={content.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'}
//                   alt={content.title || 'Profile'}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                   onError={(e) => {
//                     e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop';
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10"></div>
//               </div>
              
//               {/* Decorative glow */}
//               <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500 rounded-full opacity-20 blur-3xl" />
//             </motion.div>

//             {/* Bio and Highlights */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="space-y-6"
//             >
//               {/* Bio */}
//               {content.bio && (
//                 <div className="space-y-4">
//                   <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
//                     {content.bio}
//                   </p>
//                 </div>
//               )}

//               {/* Key Highlights */}
//               {content.highlights && content.highlights.length > 0 && (
//                 <div className="space-y-4">
//                   <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                     Key Highlights
//                   </h3>
//                   <div className="space-y-3">
//                     {content.highlights.map((highlight, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, x: -20 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: index * 0.1 }}
//                         className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
//                       >
//                         <div className="flex-shrink-0">
//                           <CheckCircle className="w-5 h-5 text-green-500" />
//                         </div>
//                         <span className="text-gray-700 dark:text-gray-300">
//                           {highlight}
//                         </span>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Additional Info Card */}
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="p-6 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl border border-primary-200 dark:border-primary-800"
//               >
//                 <p className="text-sm text-gray-600 dark:text-gray-400 italic">
//                   "Passionate about creating innovative solutions and pushing the boundaries of what's possible with technology."
//                 </p>
//               </motion.div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutSection;

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, CheckCircle } from 'lucide-react';
import { contentAPI } from '../../services/api';

const AboutSection = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    loadContent();
    const interval = setInterval(loadContent, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadContent = async () => {
    try {
      const response = await contentAPI.get('about');
      if (response && response.success) {
        setContent(response.data || getDefaultContent());
      } else {
        setContent(getDefaultContent());
      }
    } catch (error) {
      console.error('Failed to load about content:', error);
      setContent(getDefaultContent());
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

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-3 sm:mb-4 text-gradient">
            {content.title || 'About Me'}
          </h2>
          
          {/* Quick Info Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 md:mb-16">
            {content.experience && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-white dark:bg-gray-800 rounded-full shadow-md"
              >
                <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  {content.experience}
                </span>
              </motion.div>
            )}
            {content.location && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-white dark:bg-gray-800 rounded-full shadow-md"
              >
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  {content.location}
                </span>
              </motion.div>
            )}
            {content.availability && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-green-100 dark:bg-green-900/30 rounded-full shadow-md"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">
                  {content.availability}
                </span>
              </motion.div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl relative max-w-md mx-auto">
                <img
                  src={content.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'}
                  alt={content.title || 'Profile'}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10"></div>
              </div>
              
              {/* Decorative glow */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 bg-primary-500 rounded-full opacity-20 blur-3xl" />
            </motion.div>

            {/* Bio and Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Bio */}
              {content.bio && (
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {content.bio}
                  </p>
                </div>
              )}

              {/* Key Highlights */}
              {content.highlights && content.highlights.length > 0 && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    Key Highlights
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {content.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex-shrink-0">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 sm:p-6 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl border border-primary-200 dark:border-primary-800"
              >
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic">
                  "Passionate about creating innovative solutions and pushing the boundaries of what's possible with technology."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;