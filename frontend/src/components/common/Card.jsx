import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  padding = 'default',
  variant = 'default',
  onClick,
  ...props 
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 shadow-xl border-0',
    outlined: 'bg-transparent border-2 border-gray-300 dark:border-gray-600',
    glass: 'glass',
  };

  const Component = hover ? motion.div : 'div';
  const hoverProps = hover ? {
    whileHover: { 
      y: -5, 
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)' 
    },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      className={`
        ${variants[variant]}
        ${paddings[padding]}
        rounded-xl
        transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;