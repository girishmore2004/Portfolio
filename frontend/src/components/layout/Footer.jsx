import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Heart, 
  Send,
  MapPin,
  Phone,
  Instagram,
  Youtube,
  Code,
  ArrowUp,
  ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeLoading, setSubscribeLoading] = useState(false);

  // Social links
  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/girishmore2004', 
      label: 'GitHub'
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/girish-more-085b9924a', 
      label: 'LinkedIn'
    }
  ];

  // Quick links
  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
  ];

  const resourceLinks = [
    { name: 'Certifications', href: '#certifications' },
    { name: 'Resume', href: '#resume' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#contact' },
  ];

  // Handle newsletter subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSubscribeLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setSubscribeLoading(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const linkClass =
    'group inline-flex items-center gap-2 text-sm text-[color:var(--text-secondary)] hover:text-primary-600 transition-colors';

  const headingClass =
    'font-mono text-xs uppercase tracking-[0.14em] text-primary-600 mb-5';

  return (
    <footer className="relative border-t border-[color:var(--border-color)] bg-[color:var(--card-bg)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/" 
                onClick={scrollToTop}
                className="flex items-center gap-2.5 group mb-4"
              >
                <span className="w-9 h-9 rounded-lg bg-primary-600 text-white flex items-center justify-center shadow-[0_4px_10px_rgba(201,108,74,0.25)] group-hover:bg-[#d97745] transition-colors">
                  <Code className="w-5 h-5" />
                </span>
                <span className="text-lg font-bold tracking-tight text-[color:var(--text-primary)]">
                  Portfolio<span className="text-primary-600">.</span>
                </span>
              </Link>
              <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed">
                Building exceptional digital experiences with modern technologies. 
                Passionate about creating solutions that make a difference.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className={headingClass}>Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button onClick={() => handleNavClick(link.href)} className={linkClass}>
                      <span className="w-0 group-hover:w-3 h-px bg-primary-600 transition-all duration-300"></span>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className={headingClass}>Resources</h3>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.name}>
                    <button onClick={() => handleNavClick(link.href)} className={linkClass}>
                      <span className="w-0 group-hover:w-3 h-px bg-primary-600 transition-all duration-300"></span>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className={headingClass}>Stay Updated</h3>
              <p className="text-[color:var(--text-secondary)] text-sm mb-4">
                Subscribe to get notified about new projects and updates.
              </p>
              
              <form onSubmit={handleSubscribe}>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input !py-3 !pr-14 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={subscribeLoading}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-primary-600 hover:bg-[#d97745] text-white rounded-md transition-colors disabled:opacity-50"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <p className="font-mono text-[0.68rem] text-[color:var(--text-secondary)] opacity-80 mt-2.5">
                No spam, unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[color:var(--border-color)]"></div>

        {/* Bottom Section */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-[color:var(--border-color)] text-[color:var(--text-secondary)] hover:text-primary-600 hover:border-primary-600 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-[color:var(--text-secondary)] text-sm text-center">
              <p className="flex items-center justify-center gap-2 flex-wrap">
                <span>© {new Date().getFullYear()} Portfolio CMS.</span>
                <span className="hidden md:inline">Built with</span>
                <Heart className="w-4 h-4 text-primary-600 animate-pulse inline" />
                <span className="hidden md:inline">using React & Node.js</span>
              </p>
            </div>

            {/* Back to Top */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-[color:var(--border-color)] text-[color:var(--text-secondary)] hover:bg-primary-600 hover:border-primary-600 hover:text-white transition-colors group"
              aria-label="Back to top"
            >
              <ArrowUp className="w-[18px] h-[18px] group-hover:animate-bounce" />
            </motion.button>
          </div>
        </div>

        {/* Extra Links */}
        <div className="border-t border-[color:var(--border-color)] py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-xs text-[color:var(--text-secondary)]">
            <Link to="/privacy" className="hover:text-primary-600 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-primary-600 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link to="/sitemap" className="hover:text-primary-600 transition-colors">
              Sitemap
            </Link>
            <span>•</span>
            <a 
              href="https://github.com/yourusername/portfolio-cms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary-600 transition-colors flex items-center gap-1"
            >
              View Source <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
