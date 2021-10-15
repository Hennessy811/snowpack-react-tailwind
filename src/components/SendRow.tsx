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
      case 'Задайте Ваш вопрос:':
        return 'textarea';
      case 'Введите адрес Вашей электронной почты:':
        return 'email';
      case 'Введите Ваш номер телефона:':
        return 'phone';
      default:
        return 'text';
    }
  }, [lastMessage]);

  return (
    <form
      className="widget-flex widget-items-end widget-px-5 widget-py-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!disabled) {
          onSubmit(value);
          setValue('');
        }
      }}
    >
      {type === 'textarea' ? (
        <textarea
          className="widget-w-full widget-px-5 widget-py-3 widget-bg-gray-100 widget-appearance-none widget-rounded-xl"
          placeholder="Например, Детримакс актив доза"
          rows={3}
          name={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <input
          disabled={disabled}
          type={type}
          className="widget-w-full widget-px-5 widget-py-3 widget-bg-gray-100 widget-appearance-none widget-rounded-xl"
          placeholder={
            type === 'email'
              ? 'sample@mail.com'
              : type === 'phone'
              ? '+79997776655'
              : 'Введите сообщение'
          }
          name={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      <button
        className={clsx(
          'widget-flex widget-items-center widget-justify-center widget-h-12 widget-p-2 widget-ml-4 widget-text-white widget-appearance-none widget-w-14 widget-rounded-2xl ',
          disabled
            ? 'widget-bg-gray-200 widget-cursor-not-allowed'
            : 'widget-bg-mainGreen',
        )}
        type="submit"
        disabled={disabled}
      >
        <SendIcon className="widget-w-6 widget-h-6" />
      </button>
    </form>
  );
};

export default SendRow;
