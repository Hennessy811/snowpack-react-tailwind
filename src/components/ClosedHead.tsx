import ChatIcon from '@shared/icons/ChatIcon';
import clsx from 'clsx';
import React from 'react';

const ClosedHead = ({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: () => void;
}) => {
  return (
    <div
      className={clsx(
        'widget-flex widget-items-center widget-bg-white widget-border widget-border-gray-50 widget-p-3 widget-text-xl widget-transition-all widget-shadow-lg widget-cursor-pointer widget-rounded-2xl hover:widget-shadow-2xl',
        open && 'widget-hidden',
      )}
      onClick={() => onOpen()}
    >
      <div className="widget-p-3 widget-text-white widget-rounded-full widget-bg-mainYellow">
        <ChatIcon className="widget-w-6 widget-h-6" />
      </div>
      <p className="widget-mx-5 widget-font-medium widget-text-mainGreen">
        Задайте вопрос
      </p>
    </div>
  );
};

export default ClosedHead;
