import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { useTheme } from '../context/ThemeContext';

const Chatbot = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Shyamji AI. How can I help you with your tech needs today?", sender: 'AI' }
  ]);
  const [input, setInput] = useState('');
  const [sessionId] = useState(`session_${Math.random().toString(36).substr(2, 9)}`);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'USER' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/chatbot`, {
        sessionId,
        message: userMessage.text
      });
      
      setMessages(prev => [...prev, { id: Date.now(), text: res.data.message, sender: 'AI' }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { id: Date.now(), text: "I'm having trouble connecting to my brain. Please try again later!", sender: 'AI' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Chat Bubble */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] text-slate-950 transition-all hover:bg-cyan-400"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`absolute bottom-24 right-0 w-[350px] md:w-[400px] h-[550px] border rounded-[2rem] shadow-2xl overflow-hidden flex flex-col transition-colors duration-500 ${
              theme === 'dark' ? 'bg-[#020617] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            {/* Header */}
            <div className={`p-6 border-b flex items-center justify-between transition-colors duration-500 ${
              theme === 'dark' ? 'bg-slate-950/50 border-white/5' : 'bg-slate-50 border-slate-100'
            }`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
                  <Bot className="w-6 h-6 text-cyan-500" />
                </div>
                <div>
                  <h4 className={`font-bold transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Shyamji AI</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-cyan-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className={`flex-grow p-6 overflow-y-auto flex flex-col gap-4 transition-colors duration-500 ${
                theme === 'dark' ? 'bg-slate-900/20' : 'bg-slate-50/30'
              }`}
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'USER' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.sender === 'USER' ? 'bg-cyan-500 text-slate-950' : (theme === 'dark' ? 'bg-slate-800 text-cyan-500' : 'bg-white border border-slate-200 text-cyan-600')}`}>
                      {msg.sender === 'USER' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed transition-all duration-500 ${
                      msg.sender === 'USER' 
                        ? 'bg-cyan-500 text-slate-950 font-bold rounded-tr-none' 
                        : (theme === 'dark' ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5' : 'bg-white text-slate-700 rounded-tl-none border border-slate-200 shadow-sm')
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-slate-800 text-cyan-500' : 'bg-white border border-slate-200 text-cyan-600'}`}>
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className={`p-4 rounded-2xl text-xs italic font-medium rounded-tl-none border transition-all duration-500 ${
                      theme === 'dark' ? 'bg-slate-800 text-slate-400 border-white/5' : 'bg-white text-slate-500 border-slate-200 shadow-sm'
                    }`}>
                      Shyamji AI is typing...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className={`p-6 border-t flex gap-3 transition-colors duration-500 ${
              theme === 'dark' ? 'bg-slate-950 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <input 
                type="text" 
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`flex-grow p-3 rounded-xl text-sm focus:border-cyan-500 focus:outline-none transition-all ${
                  theme === 'dark' ? 'bg-slate-900 border-white/10 text-white placeholder:text-slate-600' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
                }`}
              />
              <button className="p-3 bg-cyan-500 text-slate-950 rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center shadow-lg">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
