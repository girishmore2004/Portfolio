import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Home, Briefcase, Award, Mail, User, Code, FileText, LogIn } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '#hero', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Certifications', href: '#certifications', icon: Award },
    { name: 'Resume', href: '#resume', icon: FileText },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'header-scrolled'
            : 'bg-transparent border-transparent'
        }`}
      >
        <nav className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group min-w-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="w-9 h-9 flex-shrink-0 rounded-lg bg-primary-600 text-white flex items-center justify-center shadow-[0_4px_10px_rgba(201,108,74,0.25)] group-hover:bg-[#d97745] transition-colors">
              <Code className="w-5 h-5" />
            </span>
            <span className="font-bold text-lg tracking-tight text-[color:var(--text-primary)] truncate">
              Girish More<span className="text-primary-600">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-primary-600'
                      : 'text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-primary-600"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[color:var(--border-color)] bg-[color:var(--card-bg)] hover:border-primary-600 transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'light' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-[18px] h-[18px] text-[color:var(--text-primary)]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-[18px] h-[18px] text-accent-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Admin Login/Dashboard */}
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/admin')}
                className="hidden md:inline-flex btn-primary !py-2 !px-4 !text-sm"
              >
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="hidden md:inline-flex btn-secondary !py-2 !px-4 !text-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[color:var(--border-color)] bg-[color:var(--card-bg)] hover:border-primary-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[color:var(--text-primary)]" />
              ) : (
                <Menu className="w-5 h-5 text-[color:var(--text-primary)]" />
              )}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[color:var(--bg-color)] border-l border-[color:var(--border-color)] shadow-2xl z-[70] lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-8">
                  <span className="section-eyebrow !mb-0">// Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-[color:var(--border-color)] hover:border-primary-600 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                  {navLinks.map((link, index) => {
                    const Icon = link.icon;
                    const isActive = activeSection === link.href.substring(1);

                    return (
                      <motion.button
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        onClick={() => handleNavClick(link.href)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition-colors border ${
                          isActive
                            ? 'bg-primary-600/10 border-primary-600/30 text-primary-600'
                            : 'border-transparent text-[color:var(--text-primary)] hover:bg-primary-600/5'
                        }`}
                      >
                        <Icon className="w-[18px] h-[18px]" />
                        <span>{link.name}</span>
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Divider */}
                <div className="my-6 border-t border-[color:var(--border-color)]"></div>

                {/* Admin Section */}
                {isAuthenticated ? (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => {
                      navigate('/admin');
                      setMobileMenuOpen(false);
                    }}
                    className="btn-primary w-full"
                  >
                    <User className="w-[18px] h-[18px]" />
                    <span>Admin Dashboard</span>
                  </motion.button>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="btn-secondary w-full"
                  >
                    <LogIn className="w-[18px] h-[18px]" />
                    <span>Admin Login</span>
                  </motion.button>
                )}

                {/* User Info (if authenticated) */}
                {isAuthenticated && user && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 p-4 rounded-xl border border-[color:var(--border-color)] bg-[color:var(--card-bg)]"
                  >
                    <p className="text-xs font-mono uppercase tracking-wider text-[color:var(--text-secondary)] mb-1">
                      Logged in as
                    </p>
                    <p className="font-medium text-[color:var(--text-primary)]">
                      {user.name}
                    </p>
                    <p className="text-xs text-[color:var(--text-secondary)] break-all">
                      {user.email}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
