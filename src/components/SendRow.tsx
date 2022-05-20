import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import SendIcon from 'shared/icons/SendIcon';

const SendRow = ({
  onSubmit,
  disabled: _disabled,
  lastMessage,
}: {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (message: string) => void;
  disabled: boolean;
  lastMessage: string;
}) => {
  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(_disabled);

  const type = useMemo(() => {
    switch (lastMessage) {
      case 'Введите Ваш вопрос:':
        setDisabled(false);
        return 'textarea';
      case 'Введите Ваш email:':
        setDisabled(false);
        return 'email';
      case 'Некорректный email. Пожалуйста, введите Ваш email:':
        setDisabled(false);
        return 'email';
      case 'Введите Ваш номер телефона:':
        setDisabled(false);
        return 'tel';
      case 'Некорректный номер телефона. Пожалуйста, введите Ваш номер телефона:':
        setDisabled(false);
        return 'tel';
      case 'Как вас зовут?':
        setDisabled(false);
        return 'text';
      default:
        setDisabled(true);
        return 'text';
    }
  }, [lastMessage]);

  // useEffect(() => {
  //   setDisabled(_disabled);
  // }, [disabled]);

  console.log({ _disabled, disabled });

  return (
    <form
      className="widget-flex widget-text-lg widget-leading-6 widget-items-end widget-px-5 widget-py-4"
      noValidate={true}
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
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (!disabled) {
                onSubmit(value);
                setValue('');
              }
            }
          }}
        />
      ) : (
        <input
          disabled={disabled}
          type={type}
          className="widget-w-full widget-h-12 widget-px-5 widget-py-3 widget-bg-gray-100 widget-appearance-none widget-rounded-xl"
          placeholder={
            type === 'email'
              ? 'sample@mail.com'
              : type === 'tel'
              ? '+79997776655'
              : 'Введите сообщение'
          }
          pattern="+[0-9]{11}"
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
