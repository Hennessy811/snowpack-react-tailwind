import React from 'react';
import ChatIcon from '@shared/icons/ChatIcon';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="fixed z-10 right-2 bottom-2">
      <div className="flex items-center p-3 text-xl transition-all shadow-lg cursor-pointer rounded-2xl hover:shadow-2xl">
        <div className="p-3 text-white rounded-full bg-mainYellow">
          <ChatIcon className="w-6 h-6" />
        </div>
        <p className="mx-5 font-medium text-mainGreen">Задайте вопрос</p>
      </div>
    </div>
  );
}

export default App;
