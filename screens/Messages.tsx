import React, { useState } from 'react';
import { useChatStore, useAuthStore } from '../store';
import { MOCK_HELPERS } from '../constants';
import { Send, User } from 'lucide-react';
import { Input } from '../components/ui/Input';

export const Messages: React.FC = () => {
  const { messages, sendMessage } = useChatStore();
  const { user } = useAuthStore();
  const [selectedChatId, setSelectedChatId] = useState<string>('h1');
  const [inputText, setInputText] = useState('');

  // Get active chats (in a real app, this would be derived differently)
  const activeChats = Object.keys(messages).map(helperId => {
    const helper = MOCK_HELPERS.find(h => h.id === helperId);
    return {
      id: helperId,
      name: helper?.name || 'Unknown User',
      avatar: helper?.avatar,
      lastMessage: messages[helperId][messages[helperId].length - 1]
    };
  });

  const currentMessages = messages[selectedChatId] || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(selectedChatId, inputText, user?.id || 'u1');
    setInputText('');
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
      {/* Sidebar List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="font-bold text-lg">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {activeChats.map(chat => (
            <div 
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`p-4 flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ${selectedChatId === chat.id ? 'bg-primary-50 dark:bg-slate-800' : ''}`}
            >
              <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                   <h3 className="font-medium truncate">{chat.name}</h3>
                   <span className="text-xs text-gray-400">{new Date(chat.lastMessage.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center space-x-3">
           <img src={MOCK_HELPERS.find(h => h.id === selectedChatId)?.avatar} className="w-8 h-8 rounded-full" alt="Avatar" />
           <span className="font-bold">{MOCK_HELPERS.find(h => h.id === selectedChatId)?.name}</span>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentMessages.map(msg => {
            const isMe = msg.senderId === user?.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                  isMe 
                    ? 'bg-primary-600 text-white rounded-br-none' 
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <span className={`text-[10px] block text-right mt-1 ${isMe ? 'text-primary-200' : 'text-gray-400'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2">
          <input 
            className="flex-1 bg-gray-50 dark:bg-slate-800 border-0 rounded-full px-4 py-2 focus:ring-2 focus:ring-primary-500"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};