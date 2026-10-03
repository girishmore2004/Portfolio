import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick, 
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon,
  loading = false,
  fullWidth = false,
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary-600 text-white shadow-[0_4px_10px_rgba(201,108,74,0.18)] hover:bg-[#d97745] hover:shadow-[0_6px_16px_rgba(201,108,74,0.3)] border border-primary-600',
    secondary: 'bg-transparent border border-[color:var(--border-color)] text-[color:var(--text-primary)] hover:border-primary-600 hover:bg-primary-600/5',
    ghost: 'bg-transparent border border-transparent hover:bg-black/5 dark:hover:bg-white/10 text-[color:var(--text-primary)]',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg border border-red-600',
    success: 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg border border-green-600',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-[0.95rem]',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <motion.button
      whileHover={disabled || loading ? {} : { y: -2 }}
      whileTap={disabled || loading ? {} : { y: 0, scale: 0.98 }}
      className={`
        btn 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
        inline-flex items-center justify-center gap-2 font-medium 
        transition-all duration-200 rounded-lg
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-color)]
      `}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-[18px] h-[18px] flex-shrink-0" />}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
