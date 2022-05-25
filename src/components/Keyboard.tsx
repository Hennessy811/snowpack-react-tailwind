import clsx from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';

export interface BtnWithData {
  data: string;
  text: string;
}
export type Btn = BtnWithData | string;

const Keyboard = ({
  buttons,
  onClick,
  disabled,
}: {
  buttons: Btn[][] | null;
  // eslint-disable-next-line no-unused-vars
  onClick: (message: Btn) => void;
  disabled?: boolean;
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
              className={clsx(
                'widget-px-4 widget-py-3 widget-bg-mainGreen-buttons widget-bg-opacity-20 widget-my-2 widget-transition-all widget-text-mainGreen widget-rounded-2xl',
                disabled && 'widget-opacity-50 widget-cursor-not-allowed',
                !disabled &&
                  'widget-cursor-pointer hover:widget-text-white hover:widget-bg-mainGreen',
              )}
              onClick={() => !disabled && onClick(btn)}
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
