import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Message from './Message';
import SendRow from './SendRow';
import ClosedHead from './ClosedHead';
import OpenedHead from './OpenedHead';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { last } from 'lodash';
import type { Btn } from './Keyboard';

export interface MessageItem {
  checkbox: null;
  delete_keyboard: false;
  inline_keyboard: null;
  keyboard: string[][] | null;
  photo_url: null;
  rich_media: null;
  text: string | null;
  user_id: string;
  video_url: null;
  createdBy?: string | 'support';
}

const getDefaultMessage = (msg: string): MessageItem => ({
  checkbox: null,
  delete_keyboard: false,
  inline_keyboard: null,
  keyboard: null,
  photo_url: null,
  rich_media: null,
  text: msg,
  user_id: '270ea848-a9ae-4d08-b4b4-ecd38667cc2d',
  video_url: null,
});

interface AppProps {}

const FAQ_URL = 'https://detrimax.ru/vopros-otvet';

function App({}: AppProps) {
  // const isFaq = window.location.href.includes(FAQ_URL);
  const isFaq = true;
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const [socketUrl] = useState('wss://dwbakend.way2ai.ru/income_message/');
  const [messageHistory, setMessageHistory] = useState<MessageItem[]>([]);

  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        sendJsonMessage({
          type: `init`,
          payload: `${isFaq ? 'YESFAQ' : 'NOFAQ'}`,
          session_id: 'simple',
        });
      },
      reconnectAttempts: 30,
      reconnectInterval: 500,
      shouldReconnect: (closeEvent) => {
        console.log('closed, reconnecting');

        return true;
      },
    },
  );

  useEffect(() => {
    if (!sessionId && lastJsonMessage?.user_id) {
      setSessionId(lastJsonMessage.user_id);
    }
  }, [lastJsonMessage]);

  const scrollToBottom = () => {
    bottom.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setMessageHistory([
      ...messageHistory,
      { ...lastJsonMessage, createdBy: 'support' },
    ]);
  }, [lastJsonMessage]);

  const handleClickSendMessage = (msg: Btn) => {
    if (msg === 'Перейти') {
      window.location.href = FAQ_URL;
    }
    // @ts-ignore
    setMessageHistory([...messageHistory, getDefaultMessage(msg.text || msg)]);
    sendJsonMessage({
      type: 'text',
      // @ts-ignore
      payload: msg.data || msg,
      session_id: 'simple',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageHistory]);

  return (
    <div className="fixed z-10 right-2 bottom-2">
      <ClosedHead open={open} onOpen={() => setOpen(true)} />

      <div
        className={clsx(
          'shadow-lg rounded-3xl max-w-md w-full',
          !open && 'hidden',
        )}
      >
        <OpenedHead onClose={() => setOpen(false)} />

        <div className="w-full pt-0 pl-5 bg-white rounded-bl-3xl rounded-br-3xl h-550">
          <div className="flex flex-col w-full h-full pr-5 overflow-y-auto">
            {messageHistory
              .filter((i) => !!i.text)
              .map((message) => (
                <Message
                  key={`${message.text}`}
                  message={message}
                  onClick={handleClickSendMessage}
                />
              ))}

            <div ref={bottom}></div>
          </div>
        </div>

        <SendRow
          disabled={readyState !== ReadyState.OPEN}
          onSubmit={handleClickSendMessage}
          lastMessage={last(messageHistory.filter((i) => !!i.text))?.text || ''}
        />
      </div>
    </div>
  );
}

export default App;
