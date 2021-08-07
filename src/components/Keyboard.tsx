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
    <div className="">
      {buttons.map((row) => (
        <div key={Math.random()}>
          {row.map((btn) => (
            <div
              key={btnText(btn)}
              className="px-4 py-3 my-2 transition-all border-2 cursor-pointer hover:text-white hover:bg-mainGreen text-mainGreen border-mainGreen rounded-2xl"
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
