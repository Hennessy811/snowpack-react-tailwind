import { motion } from 'framer-motion';
import React from 'react';
import ChatIcon from 'shared/icons/ChatIcon';
import CloseIcon from 'shared/icons/CloseIcon';

const OpenedHead = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="widget-flex widget-items-center widget-justify-between widget-w-full widget-p-3 widget-rounded-tl-3xl widget-rounded-tr-3xl widget-bg-mainGreen"
    >
      <div className="widget-p-3 widget-text-white widget-rounded-full widget-bg-mainYellow">
        <ChatIcon className="widget-w-6 widget-h-6" />
      </div>
      <p className="widget-mx-6 widget-text-xl widget-font-medium widget-text-center widget-text-white">
        D3-Бот
      </p>
      <div
        className="widget-p-3 widget-text-white widget-cursor-pointer hover:widget-scale-105"
        onClick={() => onClose()}
      >
        <CloseIcon className="widget-w-4 widget-h-4 " />
      </div>
    </motion.div>
  );
};

export default OpenedHead;
