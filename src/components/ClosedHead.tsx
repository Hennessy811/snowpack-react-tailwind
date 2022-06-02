import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import ChatIcon from 'shared/icons/ChatIcon';
import CloseIcon from 'shared/icons/CloseIcon';

const ClosedHead = ({ onOpen, open }: { onOpen: () => void; open: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        'widget-flex widget-items-center widget-p-3',
        open
          ? ' widget-justify-between widget-w-full widget-rounded-tl-3xl widget-rounded-tr-3xl widget-bg-mainGreen'
          : 'widget-bg-white widget-border widget-border-gray-50 widget-text-xl widget-transition-all widget-shadow-lg widget-cursor-pointer widget-rounded-2xl hover:widget-shadow-2xl',
      )}
      onClick={() => onOpen()}
    >
      <motion.div className="widget-p-3 widget-text-white widget-rounded-full widget-bg-mainYellow">
        <ChatIcon className="widget-w-6 widget-h-6" />
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            <motion.p
              layout
              className="widget-mx-6 widget-text-xl widget-font-medium widget-text-center widget-text-white"
            >
              D3 помощник
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="widget-p-3 widget-text-white widget-cursor-pointer hover:widget-scale-105"
              onClick={() => onOpen()}
            >
              <CloseIcon className="widget-w-4 widget-h-4 " />
            </motion.div>
          </>
        )}

        {!open && (
          <motion.p className="widget-mx-5 widget-font-medium widget-text-mainGreen">
            Задайте вопрос
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ClosedHead;
