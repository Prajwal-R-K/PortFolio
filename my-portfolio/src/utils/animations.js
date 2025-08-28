import { motion } from 'framer-motion';

// Common animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

// Common transition settings
export const transition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1]
};

// Common viewport settings
export const viewport = {
  once: false,
  amount: 0.25,
  margin: '-100px 0px 0px 0px' // Adjusts when the animation triggers (negative = earlier)
};

// Staggered children animation
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const staggerContainer = {
  variants: container,
  initial: "hidden",
  whileInView: "show",
  viewport: { once: false, amount: 0.1 }
};

export const staggerItem = {
  variants: item
};

// Section wrapper component with consistent animation
const AnimatedSection = ({ children, className = '', ...props }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.2 }}
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.section>
);

export default AnimatedSection;
