import ChatIcon from '@shared/icons/ChatIcon';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';

const ClosedHead = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        'widget-flex widget-items-center widget-bg-white widget-border widget-border-gray-50 widget-p-3 widget-text-xl widget-transition-all widget-shadow-lg widget-cursor-pointer widget-rounded-2xl hover:widget-shadow-2xl',
      )}
      onClick={() => onOpen()}
    >
      <div className="widget-p-3 widget-text-white widget-rounded-full widget-bg-mainYellow">
        <ChatIcon className="widget-w-6 widget-h-6" />
      </div>
      <p className="widget-mx-5 widget-font-medium widget-text-mainGreen">
        Задайте вопрос
      </p>
    </motion.div>
  );
};

export default ClosedHead;
