import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { last } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import ClosedHead from './ClosedHead';
import type { Btn, BtnWithData } from './Keyboard';
import Message from './Message';
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

let history = getLocalHistory();

function App() {
  // const [openedConnection, setOpenedConnection] = useState(false);
  const [open, setOpen] = useState(false);
  const [sessionId, _setSessionId] = useState<string | null>(
    localStorage.getItem('sessionId') || '',
  );
  const [messageHistory, _setMessageHistory] = useState<MessageItem[]>(history);

  const lastMessage = useRef<HTMLDivElement | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const view = useRef<HTMLDivElement>(null);

  const socketUrl =
    'wss://dwdev.way2ai.ru/income_message/' +
    (sessionId ? `?sessionId=${sessionId}` : '');

  const { sendJsonMessage, readyState } = useWebSocket(socketUrl, {
    onError: (e) => {
      console.debug('socket error', e);
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      const sid = data.user_id || data.session_id;
      // console.debug('session id', sid);
      // console.debug('new message', data.text);
      history.push(data);

      if (sid !== sessionId) {
        // console.debug('sid changed!');
        // console.debug('update sid');
        setSessionId(sid);
        // console.debug('send init');
        sendInitMessage(sid);
        return;
      } else {
        // console.debug('sid ok');
        pushMessage({ ...data, createdBy: 'support' });

        if (localStorage.redirectUrl) {
          const toUrl = new URL(localStorage.redirectUrl);
          window.location.href = toUrl.toString();
        }
      }
    },
    reconnectAttempts: 30,
    reconnectInterval: 500,
    shouldReconnect: () => {
      console.debug('closed, reconnecting');
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

    clearMessageHistory();
  };

  const clearMessageHistory = (): void => {
    localStorage.removeItem('messages');
    _setMessageHistory([]);
    history = [];
  };

  const pushMessage = (message: MessageItem): void => {
    history.push(message);
    _setMessageHistory((prev) => {
      const v = prev.concat([message]);
      localStorage.setItem('messages', JSON.stringify(v));
      return v;
    });
  };

  const scrollToBottom = () => {
    lastMessage.current?.scrollIntoView({ behavior: 'smooth' });
    // view.current?.scrollBy({ top: view.current?.clientHeight / 2, behavior: 'smooth' });
  };

  const handleClickSendMessage = (msg: Btn) => {
    const text = (msg as BtnWithData).text || (msg as string);
    const data = (msg as BtnWithData).data;

    console.log('send message', text, data);

    pushMessage(getDefaultMessage(text));

    if (text === 'Перейти') {
      if (data) {
        localStorage.setItem('redirectUrl', data);
      } else {
        localStorage.setItem('redirectUrl', FAQ_URL);
      }
      sendJsonMessage({
        type: 'text',
        payload: text,
        session_id: sessionId,
      });
    } else {
      sendJsonMessage({
        type: 'text',
        payload: data || msg,
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

  useEffect(() => {
    if (localStorage.getItem('redirectUrl')) {
      localStorage.removeItem('redirectUrl');
      setOpen(true);
    }
  }, []);

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
              width: 'calc(100vw - 15px)',
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
                  .map((message, i, arr) => (
                    <div key={message.text} ref={lastMessage}>
                      <Message
                        message={message}
                        onClick={handleClickSendMessage}
                        disabled={i < arr.length - 1}
                      />
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
