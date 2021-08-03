import clsx from 'clsx';
import React from 'react';
import type { MessageItem } from './App';
import Keyboard from './Keyboard';

const Message = ({
  message,
  onClick,
}: {
  message: MessageItem;
  onClick: (msg: string) => void;
}) => {
  const { text, createdBy } = message;
  const author = createdBy === 'support' ? 'support' : 'user';

  return (
    <div>
      <div
        className={clsx(
          'flex my-2 max-w-xs',
          author === 'user' && 'justify-end',
        )}
      >
        <div
          className={clsx(
            'py-3 px-4 rounded-tl-3xl rounded-tr-3xl',
            author === 'support'
              ? 'bg-mainGreen-light rounded-br-3xl rounded-bl-sm'
              : 'shadow-md border-gray-100 border rounded-bl-3xl rounded-br-sm',
          )}
        >
          {text}
        </div>
      </div>

      <Keyboard buttons={message.keyboard} onClick={onClick} />
      <Keyboard buttons={message.inline_keyboard} onClick={onClick} />
    </div>
  );
};

export default Message;
