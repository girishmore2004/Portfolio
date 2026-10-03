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
        staggerChildren: 0.06
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* <span className="section-eyebrow">// 02 — Skills</span> */}
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring ideas to life
          </p>

          {/* Category filter — scrolls sideways on very small screens instead of wrapping awkwardly */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 mb-8 sm:mb-10 overflow-x-auto no-scrollbar">
            <div className="flex sm:flex-wrap gap-2 w-max sm:w-auto">
              {categories.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg border font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                      active
                        ? 'bg-primary-600 border-primary-600 text-white shadow-[0_4px_10px_rgba(201,108,74,0.25)]'
                        : 'border-[color:var(--border-color)] bg-[color:var(--card-bg)] text-[color:var(--text-secondary)] hover:border-primary-600 hover:text-primary-600'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skills Grid */}
          <motion.div
            key={selectedCategory}
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
          >
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill._id}
                variants={item}
                className="paper-card !p-3 xs:!p-4 sm:!p-5"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {skill.icon && (
                    <div className="w-6 h-6 sm:w-11 sm:h-11 sm:rounded-lg sm:bg-primary-600/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg sm:text-2xl leading-none">{skill.icon}</span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[0.82rem] xs:text-sm sm:text-base text-[color:var(--text-primary)] leading-tight [overflow-wrap:anywhere]">
                      {skill.name}
                    </h3>
                    {skill.yearsOfExperience > 0 && (
                      <p className="mt-1 font-mono text-[0.7rem] sm:text-xs text-primary-600">
                        {skill.yearsOfExperience}+ yrs
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm sm:text-base text-[color:var(--text-secondary)]">
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
