import SendIcon from '@shared/icons/SendIcon';
import clsx from 'clsx';
import React, { useState } from 'react';

const SendRow = ({
  onSubmit,
  disabled,
}: {
  onSubmit: (message: string) => void;
  disabled: boolean;
}) => {
  const [value, setValue] = useState('');

  return (
    <form
      className="flex items-center px-5 py-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!disabled) {
          onSubmit(value);
          setValue('');
        }
      }}
    >
      <input
        disabled={disabled}
        type="text"
        className="w-full px-5 py-3 bg-gray-100 appearance-none rounded-xl"
        placeholder="Введите сообщение"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className={clsx(
          'flex items-center justify-center h-12 p-2 ml-4 text-white appearance-none w-14 rounded-2xl ',
          disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-mainGreen',
        )}
        type="submit"
        disabled={disabled}
      >
        <SendIcon className="w-6 h-6" />
      </button>
    </form>
  );
};

export default SendRow;
