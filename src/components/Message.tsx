import clsx from 'clsx';
import React from 'react';
import type { MessageItem } from './App';
import Keyboard, { Btn } from './Keyboard';
import Linkify from 'react-linkify';

const Message = ({
  message,
  onClick,
}: {
  message: MessageItem;
  onClick: (msg: Btn) => void;
}) => {
  const { text, createdBy } = message;
  const author = createdBy === 'support' ? 'support' : 'user';

  return (
    <div
      className={clsx(
        'widget-flex widget-flex-col',
        author === 'user' && 'widget-justify-end',
      )}
    >
      <div
        className={clsx(
          'widget-flex widget-my-2', // widget-max-w-md
          author === 'user' && 'widget-justify-end',
        )}
      >
        <div
          className={clsx(
            'widget-py-4 widget-px-4 widget-rounded-tl-3xl widget-rounded-tr-3xl message',
            author === 'support'
              ? 'widget-bg-mainGreen-light widget-shadow-md widget-font-medium widget-rounded-br-3xl widget-rounded-bl-sm'
              : 'widget-shadow-md widget-border-gray-100 widget-border widget-rounded-bl-3xl widget-rounded-br-sm',
          )}
        >
          <Linkify>{text}</Linkify>
        </div>
      </div>

      <Keyboard buttons={message.keyboard} onClick={onClick} />
      <Keyboard buttons={message.inline_keyboard} onClick={onClick} />
    </div>
  );
};

export default Message;
