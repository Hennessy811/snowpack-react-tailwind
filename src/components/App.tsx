import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { last } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import ClosedHead from './ClosedHead';
import type { Btn } from './Keyboard';
import Message from './Message';
import OpenedHead from './OpenedHead';
import SendRow from './SendRow';

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

const getLocalHistory = () => {
  const history = JSON.parse(localStorage.getItem('messages') || '[]') as MessageItem[];
  return history;
};

const FAQ_URL = window.location.href.includes('detrimax.itsft')
  ? 'https://detrimax.itsft.ru/vopros-otvet'
  : 'https://detrimax.ru/vopros-otvet';

function App() {
  const [openedConnection, setOpenedConnection] = useState(false);
  const [open, setOpen] = useState(false);
  const [sessionId, _setSessionId] = useState<string | null>(
    localStorage.getItem('sessionId') || '',
  );
  const bottom = useRef<HTMLDivElement>(null);
  const view = useRef<HTMLDivElement>(null);
  // const bottom = useRef<HTMLDivElement>(null);
  const socketUrl =
    'wss://dwdev.way2ai.ru/income_message/' +
    (sessionId ? `?sessionId=${sessionId}` : '');

  const [messageHistory, _setMessageHistory] = useState<MessageItem[]>(getLocalHistory());

  console.log(socketUrl);

  const setSessionId = (id: string) => {
    localStorage.setItem('sessionId', id);
    _setSessionId(id);
  };

  const setMessageHistory = (messages: MessageItem[]): void => {
    localStorage.setItem('messages', JSON.stringify(messages));
    _setMessageHistory(messages);
  };

  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => {
      if (sessionId) {
        sendJsonMessage({
          type: `init`,
          payload: `${'YESFAQ'}`,
          session_id: sessionId,
          user_id: sessionId,
        });
      }
    },
    reconnectAttempts: 30,
    reconnectInterval: 500,
    shouldReconnect: () => {
      console.log('closed, reconnecting');

      return true;
    },
  });

  useEffect(() => {
    if (lastJsonMessage) {
      console.log(lastJsonMessage, openedConnection);
      const _sessionId = lastJsonMessage.user_id;

      console.log({
        _sessionId,
        sessionId,
      });

      if (!openedConnection && _sessionId) {
        if (_sessionId !== sessionId) {
          setSessionId(_sessionId);
          setMessageHistory([]);
        }

        // sendJsonMessage({
        //   type: `init`,
        //   payload: `${'YESFAQ'}`,
        //   session_id: _sessionId,
        //   user_id: _sessionId,
        // });

        setOpenedConnection(true);
      }

      setMessageHistory([
        ...messageHistory,
        { ...lastJsonMessage, createdBy: 'support' },
      ]);

      if (localStorage.redirectUrl) {
        const toUrl = localStorage.redirectUrl;
        localStorage.removeItem('redirectUrl');
        window.location.href = toUrl;
      }
    }
  }, [lastJsonMessage]);

  const scrollToBottom = () => {
    view.current?.scrollBy({ top: 100, behavior: 'smooth' });
  };

  const handleClickSendMessage = (msg: Btn) => {
    // @ts-ignore
    setMessageHistory([...messageHistory, getDefaultMessage(msg.text || msg)]);

    // @ts-ignore
    if (msg?.text === 'Перейти') {
      // @ts-ignore
      if (msg?.data) {
        // @ts-ignore
        localStorage.setItem('redirectUrl', msg.data)
      } else {
        localStorage.setItem('redirectUrl', FAQ_URL)
      }
      sendJsonMessage({
        type: 'text',
        // @ts-ignore
        payload: msg.text,
        session_id: sessionId,
      });
    } else {
      sendJsonMessage({
        type: 'text',
        // @ts-ignore
        payload: msg.data || msg,
        session_id: sessionId,
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageHistory]);

  useEffect(() => {
    if (open) {
      bottom.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open]);

  return (
    <div
      className="widget-fixed widget-right-2 widget-ml-2"
      style={{ zIndex: 9999999, bottom: 'calc(10vh + 8px)' }}
    >
      <AnimatePresence>
        {!open ? (
          <ClosedHead
            onOpen={() => {
              setOpen(true);
            }}
          />
        ) : (
          <OpenedHead
            onClose={() => {
              setOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              'widget-shadow-lg widget-rounded-3xl widget-bg-white widget-w-full',
              // !open && 'widget-hidden',
            )}
            style={{
              maxWidth: 380,
            }}
          >
            <div
              className="widget-w-full widget-pt-0 widget-pl-5 widget-bg-white widget-rounded-bl-3xl widget-rounded-br-3xl widget-h-550"
              style={{ maxHeight: '45vh' }}
            >
              <div
                className="widget-flex widget-flex-col widget-w-full widget-h-full widget-pr-5 widget-overflow-y-auto widget-overflow-x-hidden"
                ref={view}
                onScroll={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
