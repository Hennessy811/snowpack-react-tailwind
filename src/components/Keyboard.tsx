/* eslint-disable jsx-a11y/click-events-have-key-events */
import { motion } from 'framer-motion';
import React from 'react';

export type Btn =
  | string
  | {
      data: string;
      text: string;
    };

const Keyboard = ({
  buttons,
  onClick,
}: {
  buttons: Btn[][] | null;
  // eslint-disable-next-line no-unused-vars
  onClick: (message: Btn) => void;
}) => {
  if (buttons === null) return null;

  const btnText = (btn: Btn) => {
    return typeof btn === 'string' ? btn : btn.text;
  };

  return (
    <motion.div
      layout
      className="widget-self-end widget-text-lg widget-flex widget-justify-end widget-flex-wrap widget-space-x-2"
      style={{ maxWidth: '90%' }}
    >
      {buttons.map((row) => (
        <div key={Math.random()}>
          {row.map((btn) => (
            <div
              role="button"
              tabIndex={0}
              key={btnText(btn)}
              className="widget-px-4 widget-py-3 widget-bg-mainGreen-buttons widget-bg-opacity-20 widget-my-2 widget-transition-all widget-cursor-pointer hover:widget-text-white hover:widget-bg-mainGreen widget-text-mainGreen widget-rounded-2xl"
              onClick={() => onClick(btn)}
            >
              {btnText(btn)}
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default Keyboard;
