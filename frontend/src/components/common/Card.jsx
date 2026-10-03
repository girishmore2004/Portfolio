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
    default: 'bg-[color:var(--card-bg)] border border-[color:var(--border-color)] shadow-[0_4px_20px_var(--shadow-color)]',
    elevated: 'bg-[color:var(--card-bg)] shadow-xl border-0',
    outlined: 'bg-transparent border border-[color:var(--border-color)]',
    glass: 'glass',
  };

  const Component = hover ? motion.div : 'div';
  const hoverProps = hover ? {
    whileHover: { y: -4 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      className={`
        ${variants[variant]}
        ${paddings[padding]}
        rounded-2xl
        transition-[border-color,box-shadow] duration-300
        ${hover ? 'hover:border-primary-600' : ''}
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
