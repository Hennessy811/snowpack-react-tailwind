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

const FAQ_URL = window.location.href.includes('detrimax.itsft')
  ? 'https://detrimax.itsft.ru/vopros-otvet'
  : 'https://detrimax.ru/vopros-otvet';

function App({}: AppProps) {
  const isFaq = window.location.href.includes(FAQ_URL);
  // const isFaq = false;
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
    <div
      className="widget-fixed widget-right-2 widget-bottom-1"
      style={{ zIndex: 9999999 }}
    >
      <ClosedHead
        open={open}
        onOpen={() => {
          setOpen(true);
          // ym(71865553, 'reachGoal', 'widget_open');
        }}
      />

      <div
        className={clsx(
          'widget-shadow-lg widget-rounded-3xl widget-max-w-md widget-w-full',
          !open && 'widget-hidden',
        )}
      >
        <OpenedHead
          onClose={() => {
            setOpen(false);
            // ym(71865553, 'reachGoal', 'widget_close');
          }}
        />

        <div
          className="widget-w-full widget-pt-0 widget-pl-5 widget-bg-white widget-rounded-bl-3xl widget-rounded-br-3xl widget-h-550"
          style={{ maxHeight: '65vh' }}
        >
          <div className="widget-flex widget-flex-col widget-w-full widget-h-full widget-pr-5 widget-overflow-y-auto">
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
