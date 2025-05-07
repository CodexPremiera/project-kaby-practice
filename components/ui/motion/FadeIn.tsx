import React from 'react';
import { fadeIn } from '@/variants';
import { motion } from 'framer-motion';

function FadeIn({ children, direction, className = '', delay = 0.2 }) {
  return (
    <motion.div
      variants={fadeIn(direction, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
