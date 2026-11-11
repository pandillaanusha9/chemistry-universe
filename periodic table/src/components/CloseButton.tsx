import React from 'react';
import { motion } from 'framer-motion';

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      id="close-atom-viewer"
      onClick={onClick}
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      className="absolute top-6 left-6 z-50 p-3 bg-gray-950/70 border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-400 rounded-full cursor-pointer backdrop-blur-md transition-colors shadow-[0_0_15px_rgba(0,243,255,0.2)] flex items-center justify-center"
      title="Return to Periodic Matrix"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </motion.button>
  );
};
