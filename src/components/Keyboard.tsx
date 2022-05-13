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
  onClick: (message: Btn) => void;
}) => {
  if (buttons === null) return null;

  const btnText = (btn: Btn) => {
    return typeof btn === 'string' ? btn : btn.text;
  };

  return (
    <div className="widget-self-end" style={{ maxWidth: '70%' }}>
      {buttons.map((row) => (
        <div key={Math.random()}>
          {row.map((btn) => (
            <div
              key={btnText(btn)}
              className="widget-px-4 widget-py-3 widget-bg-mainGreen-buttons widget-bg-opacity-20 widget-my-2 widget-transition-all widget-cursor-pointer hover:widget-text-white hover:widget-bg-mainGreen widget-text-mainGreen widget-rounded-2xl"
              onClick={() => onClick(btn)}
            >
              {btnText(btn)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
