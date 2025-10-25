// import React from 'react';
import { motion } from 'framer-motion';
import wn from '../assets/logo.png';

const WantsAndNeedsLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1] 
          }}
        >
          <img
            src={wn}
            alt="Wants & Needs"
            className="h-20 w-20 object-contain mx-auto mb-4 filter brightness-0 invert"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto animate-spin" />
        </motion.div>
      </div>
    </div>
  );
};

export default WantsAndNeedsLoader;