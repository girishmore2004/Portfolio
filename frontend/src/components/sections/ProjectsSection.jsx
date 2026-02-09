//  import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { ExternalLink, Github, Eye } from 'lucide-react';
// import { projectsAPI } from '../../services/api';

// const ProjectsSection = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     loadProjects();
//   }, []);

//   const loadProjects = async () => {
//     try {
//       const response = await projectsAPI.getAll({ status: 'published' });
//       setProjects(response.data || []);
//     } catch (error) {
//       console.error('Failed to load projects:', error);
//     }
//   };

//   return (
//     <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-4">
//         <h2 className="text-5xl font-display font-bold text-center mb-16 text-gradient">
//           Featured Projects
//         </h2>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//           {projects.map((project, index) => (
//             <motion.div
//               key={project._id}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ y: -10 }}
//               className="card group cursor-pointer"
//             >
//               <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
//                 <img
//                   src={project.thumbnail?.url || 'https://via.placeholder.com/400x300'}
//                   alt={project.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                 />
//               </div>

//               <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
//                 {project.title}
//               </h3>
              
//               <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
//                 {project.description}
//               </p>

//               <div className="flex flex-wrap gap-2 mb-4">
//                 {project.technologies.slice(0, 3).map((tech, i) => (
//                   <span key={i} className="badge badge-primary">
//                     {tech}
//                   </span>
//                 ))}
//               </div>

//               <div className="flex gap-3">
//                 {project.liveUrl && (
//                   <a
//                     href={project.liveUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-1 text-primary-600 hover:text-primary-700"
//                   >
//                     <ExternalLink className="w-4 h-4" />
//                     <span className="text-sm">Live</span>
//                   </a>
//                 )}
//                 {project.githubUrl && (
//                   <a
//                     href={project.githubUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-1 text-gray-600 hover:text-gray-700"
//                   >
//                     <Github className="w-4 h-4" />
//                     <span className="text-sm">Code</span>
//                   </a>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProjectsSection;

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsAPI } from '../../services/api';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await projectsAPI.getAll({ status: 'published' });
      setProjects(response.data || []);
    } catch (error) {
      console.error('Failed to load projects:', error);
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
          container.scrollBy({ left: 300, behavior: 'smooth' });
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
  }, [projects]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gradient">
            Featured Projects
          </h2>

          {/* Carousel Container */}
          <div className="relative">
            {/* Left Navigation Button */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors -ml-5"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 dark:text-gray-300" />
              </button>
            )}

            {/* Scrollable Projects Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="card group cursor-pointer flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px]"
                >
                  {/* Project Thumbnail */}
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 sm:mb-4 overflow-hidden">
                    <img
                      src={project.thumbnail?.url || 'https://via.placeholder.com/400x300'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        // e.target.src = 'https://via.placeholder.com/400x300';
                      }}
                    />
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-1">
                    {project.title}
                  </h3>
                  
                  {/* Project Description */}
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="badge badge-primary text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="badge badge-primary text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-3 sm:gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">Live</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm font-medium">Code</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Navigation Button */}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors -mr-5"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 dark:text-gray-300" />
              </button>
            )}
          </div>

          {/* Scroll Indicator for Mobile */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {projects.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"
              />
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                No projects available
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;