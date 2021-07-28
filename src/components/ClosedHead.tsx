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
        'flex items-center border border-gray-50 p-3 text-xl transition-all shadow-lg cursor-pointer rounded-2xl hover:shadow-2xl',
        open && 'hidden',
      )}
      onClick={() => onOpen()}
    >
      <div className="p-3 text-white rounded-full bg-mainYellow">
        <ChatIcon className="w-6 h-6" />
      </div>
      <p className="mx-5 font-medium text-mainGreen">Задайте вопрос</p>
    </div>
  );
};

export default ClosedHead;
