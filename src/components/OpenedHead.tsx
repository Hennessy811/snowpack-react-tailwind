import ChatIcon from '@shared/icons/ChatIcon';
import CloseIcon from '@shared/icons/CloseIcon';
import React from 'react';

const OpenedHead = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex items-center justify-between w-full p-3 rounded-tl-3xl rounded-tr-3xl bg-mainGreen">
      <div className="p-3 text-white rounded-full bg-mainYellow">
        <ChatIcon className="w-6 h-6" />
      </div>
      <p className="mx-6 text-xl font-medium text-center text-white">
        Ваш эл. помощник
      </p>
      <div
        className="p-3 text-white cursor-pointer hover:scale-105"
        onClick={() => onClose()}
      >
        <CloseIcon className="w-4 h-4 " />
      </div>
    </div>
  );
};

export default OpenedHead;
