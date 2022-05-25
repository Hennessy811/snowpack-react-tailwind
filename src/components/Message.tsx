import clsx from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';
import Linkify from 'react-linkify';

import type { MessageItem } from './App';
import Keyboard, { Btn } from './Keyboard';

const Message = ({
  message,
  onClick,
  disabled,
}: {
  message: MessageItem;
  // eslint-disable-next-line no-unused-vars
  onClick: (msg: Btn) => void;
  disabled: boolean;
}) => {
  const { text, createdBy } = message;
  const author = createdBy === 'support' ? 'support' : 'user';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: author === 'user' ? -100 : 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        'widget-flex widget-flex-col',
        author === 'user' && 'widget-justify-end',
      )}
    >
      <div
        className={clsx(
          'widget-flex widget-my-2',
          author === 'user' && 'widget-justify-end',
        )}
      >
        <div
          className={clsx(
            'widget-py-4 widget-px-4 widget-text-lg widget-rounded-tl-3xl widget-rounded-tr-3xl message',
            author === 'support'
              ? 'widget-bg-mainGreen-light widget-shadow-md widget-font-medium widget-rounded-br-3xl widget-rounded-bl-sm'
              : 'widget-shadow-md widget-border-gray-100 widget-border widget-rounded-bl-3xl widget-rounded-br-sm',
          )}
        >
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a target="blank" href={decoratedHref} key={key}>
                {decoratedText}
              </a>
            )}
          >
            {text}
          </Linkify>
        </div>
      </div>

      <Keyboard disabled={disabled} buttons={message.keyboard} onClick={onClick} />
      <Keyboard disabled={disabled} buttons={message.inline_keyboard} onClick={onClick} />
    </motion.div>
  );
};

export default Message;
