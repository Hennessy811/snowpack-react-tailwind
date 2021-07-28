import React from 'react';

const Keyboard = ({
  buttons,
  onClick,
}: {
  buttons: string[][] | null;
  onClick: (message: string) => void;
}) => {
  if (buttons === null) return null;

  return (
    <div className="">
      {buttons.map((row) => (
        <div>
          {row.map((btn) => (
            <div
              className="px-4 py-3 my-2 transition-all border-2 cursor-pointer hover:text-white hover:bg-mainGreen text-mainGreen border-mainGreen rounded-2xl"
              onClick={() => onClick(btn)}
            >
              {btn}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
