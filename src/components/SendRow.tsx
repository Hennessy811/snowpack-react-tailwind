import SendIcon from '@shared/icons/SendIcon';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';

const SendRow = ({
  onSubmit,
  disabled,
  lastMessage,
}: {
  onSubmit: (message: string) => void;
  disabled: boolean;
  lastMessage: string;
}) => {
  const [value, setValue] = useState('');

  const type = useMemo(() => {
    switch (lastMessage) {
      case 'Введите ваш email':
        return 'email';
      case 'Введите ваш номер телефона':
        return 'phone';
      default:
        return 'text';
    }
  }, [lastMessage]);

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
        type={type}
        className="w-full px-5 py-3 bg-gray-100 appearance-none rounded-xl"
        placeholder={
          type === 'email'
            ? 'sample@mail.com'
            : type === 'phone'
            ? '+7 999 777 66 55'
            : 'Введите сообщение'
        }
        name={type}
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
