import React, { useState, useEffect, useRef } from 'react';
import { db, Message } from '../utils/db';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(db.messages.getAll());
    const interval = setInterval(() => {
        setMessages(db.messages.getAll());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
      if (!inputValue.trim()) return;
      db.messages.add({
          senderId: 'me',
          senderName: 'Me',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ArRu2R3vywdS3aeEMrtEo_BQqowScYWF2cMLzPVK9wD3ocT7QOvHecAjd4IwJL4RE8UDbRXsTtozhYvprTPIQmS3weD2-UUOGpTs-EbRV8fDVFL3zDx6W6NEYonrl5_aaNloMH8LjHUBE2jWzynFrTkLISryqMVxrDJorkJLsPgsies5FfPosn-jNe4GNy8_3knEAH4SDITLc83FjH-wNy33MD3U1MfRsS860P-44MfjT7BLtKP6Q8WxJDvHg2E8Rwp-BjzRjX12',
          content: inputValue,
          type: 'text'
      });
      setInputValue('');
      setMessages(db.messages.getAll());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
      }
  };

  return (
    <div className="flex h-full w-full bg-[#f8fbfc] relative">
       {/* Secondary Sidebar (Channels) */}
       <aside className="hidden md:flex w-72 bg-white border-r border-[#e7f1f3] flex-col shrink-0 z-10">
          <div className="p-4 pb-2 border-b border-[#e7f1f3]">
             <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Navigation</h3>
             </div>
             <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary cursor-pointer border-l-4 border-primary">
                    <span className="material-symbols-outlined text-[22px] filled">tag</span>
                    <p className="text-sm font-bold leading-normal truncate">project-alpha</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f0f4f6] cursor-pointer group text-text-main">
                    <span className="material-symbols-outlined text-[22px] text-gray-400 group-hover:text-text-main transition-colors">tag</span>
                    <p className="text-sm font-medium leading-normal truncate">design-team</p>
                </div>
             </div>
          </div>
       </aside>

       {/* Chat Area */}
       <main className="flex-1 flex flex-col min-w-0 bg-[#f8fbfc] relative">
           {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#e7f1f3] bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400 text-lg">tag</span>
                        <h2 className="text-lg font-bold text-text-main">project-alpha</h2>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex gap-4 ${msg.senderId === 'me' ? 'flex-row-reverse' : ''}`}>
                         <div className="size-10 rounded-lg bg-cover bg-center shrink-0 mt-1 shadow-sm" style={{backgroundImage: `url('${msg.avatar}')`}}></div>
                         <div className={`flex flex-col max-w-[80%] lg:max-w-[65%] ${msg.senderId === 'me' ? 'items-end' : ''}`}>
                            <div className={`flex items-baseline gap-2 mb-1 ${msg.senderId === 'me' ? 'flex-row-reverse' : ''}`}>
                                <span className="text-sm font-bold text-text-main">{msg.senderName}</span>
                                <span className="text-xs text-gray-400 font-medium">{msg.timestamp}</span>
                            </div>
                            <div className={`p-4 rounded-xl shadow-sm text-text-main text-sm font-medium leading-relaxed ${msg.senderId === 'me' ? 'bg-primary/10 rounded-tr-none' : 'bg-white border border-gray-100 rounded-tl-none'}`}>
                                {msg.type === 'text' ? <p>{msg.content}</p> : (
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-2xl">description</span>
                                        <span>{msg.fileName}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 pt-2 pb-6">
                <div className="bg-white rounded-xl shadow-lg border border-[#e7f1f3] overflow-hidden">
                     <div className="relative">
                        <textarea 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent border-none focus:ring-0 p-4 min-h-[60px] max-h-[200px] resize-none text-sm text-text-main placeholder:text-gray-400" 
                            placeholder="Message #project-alpha..."
                        ></textarea>
                    </div>
                    <div className="flex justify-between items-center p-2 px-3 bg-[#fbfdfd] border-t border-[#e7f1f3]">
                        <div className="flex items-center gap-2"></div>
                        <button onClick={handleSend} className="flex items-center gap-2 bg-primary hover:bg-[#085a6b] text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm">
                            Send
                            <span className="material-symbols-outlined text-[18px]">send</span>
                        </button>
                    </div>
                </div>
            </div>
       </main>
    </div>
  );
};

export default Chat;