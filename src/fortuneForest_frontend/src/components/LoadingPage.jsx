import React from 'react';
import { motion } from 'framer-motion';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 bg-green-600 flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-24 h-24"
      >
        <img src="/fortuneforest.jpg" alt="FortuneForest logo" className="w-full h-full rounded-full" />
      </motion.div>
    </div>
  );
};

export default LoadingPage;
