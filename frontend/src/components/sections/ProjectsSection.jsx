import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code } from 'lucide-react';
import { projectsAPI } from '../../services/api';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

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

  return (
    <section id="projects">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <span className="section-eyebrow">// 03 — Projects</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of things I've designed, built and shipped
          </p>

          {/* Every project visible in a responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {projects.map((project, index) => {
              const technologies = project.technologies || [];
              return (
                <motion.article
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  className="paper-card card-flush group flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video overflow-hidden border-b border-[color:var(--border-color)] bg-primary-600/5">
                    {project.thumbnail?.url ? (
                      <img
                        src={project.thumbnail.url}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-grid-pattern">
                        <Code className="w-10 h-10 text-primary-600/60" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-[color:var(--text-primary)] line-clamp-1 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-[0.95rem] text-[color:var(--text-secondary)] mb-4 line-clamp-3 flex-grow leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="tag">{tech}</span>
                        ))}
                        {technologies.length > 3 && (
                          <span className="tag">+{technologies.length - 3}</span>
                        )}
                      </div>
                    )}

                    {/* Links */}
                    {(project.liveUrl || project.githubUrl) && (
                      <div className="flex gap-4 pt-4 border-t border-[color:var(--border-color)]">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-[#d97745] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--text-secondary)] hover:text-primary-600 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm sm:text-base text-[color:var(--text-secondary)]">
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
