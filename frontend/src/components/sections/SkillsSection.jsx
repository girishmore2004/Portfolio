// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { skillsAPI } from '../../services/api';

// const SkillsSection = () => {
//   const [skills, setSkills] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   useEffect(() => {
//     loadSkills();
//   }, []);

//   const loadSkills = async () => {
//     try {
//       const response = await skillsAPI.getAll({ visible: true });
//       setSkills(response.data || []);
//     } catch (error) {
//       console.error('Failed to load skills:', error);
//     }
//   };

//   const categories = ['all', 'frontend', 'backend', 'database', 'devops', 'tools'];

//   const filteredSkills = selectedCategory === 'all'
//     ? skills
//     : skills.filter(skill => skill.category === selectedCategory);

//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 }
//   };

//   return (
//     <section id="skills" className="py-20 bg-white dark:bg-gray-800">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="max-w-6xl mx-auto"
//         >
//           <h2 className="text-5xl font-display font-bold text-center mb-8 text-gradient">
//             Skills & Technologies
//           </h2>
//           <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
//             Technologies and tools I use to bring ideas to life
//           </p>

//           {/* Category Filter */}
//           <div className="flex flex-wrap justify-center gap-3 mb-12">
//             {categories.map((category) => (
//               <motion.button
//                 key={category}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-6 py-2 rounded-full font-medium transition-all ${
//                   selectedCategory === category
//                     ? 'bg-primary-600 text-white shadow-lg'
//                     : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//                 }`}
//               >
//                 {category.charAt(0).toUpperCase() + category.slice(1)}
//               </motion.button>
//             ))}
//           </div>

//           {/* Skills Grid */}
//           <motion.div
//             variants={container}
//             initial="hidden"
//             animate="show"
//             className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//           >
//             {filteredSkills.map((skill) => (
//               <motion.div
//                 key={skill._id}
//                 variants={item}
//                 whileHover={{ y: -10, scale: 1.05 }}
//                 className="card relative overflow-hidden group cursor-pointer"
//               >
//                 <div className="relative z-10">
//                   <div className="flex items-center gap-3 mb-4">
//                     {skill.icon && (
//                       <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
//                         <span className="text-2xl">{skill.icon}</span>
//                       </div>
//                     )}
//                     <h3 className="font-semibold text-gray-900 dark:text-white">
//                       {skill.name}
//                     </h3>
//                   </div>

//                   {/* Proficiency Bar */}
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-600 dark:text-gray-400">
//                         Proficiency
//                       </span>
//                       <span className="font-medium text-primary-600 dark:text-primary-400">
//                         {skill.proficiency}%
//                       </span>
//                     </div>
//                     <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                       <motion.div
//                         initial={{ width: 0 }}
//                         whileInView={{ width: `${skill.proficiency}%` }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 1, delay: 0.2 }}
//                         className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
//                       />
//                     </div>
//                   </div>

//                   {skill.yearsOfExperience > 0 && (
//                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
//                       {skill.yearsOfExperience}+ years
//                     </p>
//                   )}
//                 </div>

//                 {/* Hover Effect */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
//               </motion.div>
//             ))}
//           </motion.div>

//           {filteredSkills.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-gray-500 dark:text-gray-400">
//                 No skills found in this category
//               </p>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default SkillsSection;


import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { skillsAPI } from '../../services/api';

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await skillsAPI.getAll({ visible: true });
      setSkills(response.data || []);
    } catch (error) {
      console.error('Failed to load skills:', error);
    }
  };

  const categories = ['all', 'frontend', 'backend', 'database', 'devops', 'tools'];

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-6 sm:mb-8 text-gradient">
            Skills & Technologies
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4">
            Technologies and tools I use to bring ideas to life
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 rounded-full font-medium transition-all text-xs sm:text-sm md:text-base ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Skills Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
          >
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill._id}
                variants={item}
                whileHover={{ y: -10, scale: 1.05 }}
                className="card relative overflow-hidden group cursor-pointer"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    {skill.icon && (
                      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg sm:text-xl md:text-2xl">{skill.icon}</span>
                      </div>
                    )}
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Proficiency Bar */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Proficiency
                      </span>
                      <span className="font-medium text-primary-600 dark:text-primary-400">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                      />
                    </div>
                  </div>

                  {skill.yearsOfExperience > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {skill.yearsOfExperience}+ years
                    </p>
                  )}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-8 sm:py-10 md:py-12">
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                No skills found in this category
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;