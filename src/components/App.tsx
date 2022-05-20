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
  const [messageHistory, _setMessageHistory] = useState<MessageItem[]>(getLocalHistory());

  const lastMessage = useRef<HTMLDivElement | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const view = useRef<HTMLDivElement>(null);

  const socketUrl =
    'wss://dwdev.way2ai.ru/income_message/' +
    (sessionId ? `?sessionId=${sessionId}` : '');

  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(socketUrl, {
    // onOpen: () => {
    //   if (sessionId) {
    //     sendJsonMessage({
    //       type: `init`,
    //       payload: `${'YESFAQ'}`,
    //       session_id: sessionId,
    //       user_id: sessionId,
    //     });
    //   }
    // },
    onError: (e) => {
      console.log('socket error', e);
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      const sid = data.user_id || data.session_id;
      console.log('session id', sid);
      console.log('new message', data);

      if (sid !== sessionId) {
        console.log('sid changed!');
        console.log('update sid');
        setSessionId(sid);
        console.log('send init');
        sendInitMessage(sid);
        return;
      } else {
        console.log('sid ok');

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
    },
    reconnectAttempts: 30,
    reconnectInterval: 500,
    shouldReconnect: () => {
      console.log('closed, reconnecting');
      return true;
    },
  });

  const sendInitMessage = (id: string) => {
    sendJsonMessage({
      type: `init`,
      payload: `${'YESFAQ'}`,
      session_id: id,
      user_id: id,
    });
  };

  const setSessionId = (id: string) => {
    localStorage.setItem('sessionId', id);
    _setSessionId(id);

    setMessageHistory([]);
  };

  const setMessageHistory = (messages: MessageItem[]): void => {
    const items = messages.filter((i) => !!i.text || !!i.keyboard || !!i.inline_keyboard);
    localStorage.setItem('messages', JSON.stringify(items));
    _setMessageHistory(items);
  };

  // useEffect(() => {
  //   if (lastJsonMessage) {
  //     const _sessionId = lastJsonMessage.user_id;

  //     console.log('session ids unchanged', sessionId === _sessionId);

  //     if (!openedConnection && _sessionId) {
  //       if (_sessionId !== sessionId) {
  //         setSessionId(_sessionId);
  //       }

  //       // sendJsonMessage({
  //       //   type: `init`,
  //       //   payload: `${'YESFAQ'}`,
  //       //   session_id: _sessionId,
  //       //   user_id: _sessionId,
  //       // });

  //       setOpenedConnection(true);
  //     }

  //     setMessageHistory([
  //       ...messageHistory,
  //       { ...lastJsonMessage, createdBy: 'support' },
  //     ]);

  //     if (sessionId !== _sessionId) {
  //       setSessionId(_sessionId);

  //       sendJsonMessage({
  //         type: `init`,
  //         payload: `${'YESFAQ'}`,
  //         session_id: _sessionId,
  //         user_id: _sessionId,
  //       });
  //     }

  //     if (localStorage.redirectUrl) {
  //       const toUrl = localStorage.redirectUrl;
  //       localStorage.removeItem('redirectUrl');
  //       window.location.href = toUrl;
  //     }
  //   }
  // }, [lastJsonMessage]);

  const scrollToBottom = () => {
    lastMessage.current?.scrollIntoView({ behavior: 'smooth' });
    // view.current?.scrollBy({ top: view.current?.clientHeight / 2, behavior: 'smooth' });
  };

  const handleClickSendMessage = (msg: Btn) => {
    // @ts-ignore
    setMessageHistory([...messageHistory, getDefaultMessage(msg.text || msg)]);

    // @ts-ignore
    if (msg?.text === 'Перейти') {
      // @ts-ignore
      if (msg?.data) {
        // @ts-ignore
        localStorage.setItem('redirectUrl', msg.data);
      } else {
        localStorage.setItem('redirectUrl', FAQ_URL);
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
    if (messageHistory.length > 4) scrollToBottom();
  }, [messageHistory]);

  useEffect(() => {
    if (open && messageHistory?.length > 4) {
      bottom.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [open]);

  console.log(messageHistory);

  return (
    <div
      className="widget-fixed widget-right-2 widget-ml-2"
      style={{ zIndex: 9999999, bottom: 'calc(10vh + 8px)' }}
    >
      <AnimatePresence>
        <ClosedHead open={open} onOpen={() => setOpen(!open)} />
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              'widget-shadow-lg widget-rounded-3xl widget-bg-white widget-w-full',
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
                    <div key={message.text} ref={lastMessage}>
                      <Message message={message} onClick={handleClickSendMessage} />
                    </div>
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
