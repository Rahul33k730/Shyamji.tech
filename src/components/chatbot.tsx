"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Bot, 
  Loader2, 
  ArrowRight,
  Globe,
  Cpu,
  Smartphone,
  DollarSign,
  PhoneCall
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  buttons?: { label: string; action: string }[];
}

const GREETING = "Hi 👋 I'm the Shyamji Tech assistant. How can I help you today?";

const QUICK_BUTTONS = [
  { label: "Website Development", icon: Globe, action: "web_dev" },
  { label: "AI Solutions", icon: Cpu, action: "ai_solutions" },
  { label: "Mobile App Development", icon: Smartphone, action: "mobile_app" },
  { label: "Pricing", icon: DollarSign, action: "pricing" },
  { label: "Contact Support", icon: PhoneCall, action: "contact" },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate unique session ID
    let sid = localStorage.getItem("chat_session_id");
    if (!sid) {
      sid = `sid_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("chat_session_id", sid);
    }
    setSessionId(sid);

    // Initial greeting
    setMessages([{
      id: "initial",
      text: GREETING,
      sender: "bot",
      timestamp: new Date(),
      buttons: QUICK_BUTTONS.map(b => ({ label: b.label, action: b.action }))
    }]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    // Save to DB
    if (sessionId && messages.length > 1) {
      saveChat();
    }
  }, [messages]);

  const saveChat = async () => {
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, messages }),
      });
    } catch (error) {
      console.error("Failed to save chat:", error);
    }
  };

  const handleSend = (text: string, sender: "user" | "bot" = "user") => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    if (sender === "user") {
      setInputText("");
      generateBotResponse(text);
    }
  };

  const generateBotResponse = (userText: string) => {
    setIsTyping(true);
    setTimeout(() => {
      let responseText = "";
      let buttons: { label: string; action: string }[] | undefined;

      const lowerText = userText.toLowerCase();
      if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
        responseText = "Hello there! 👋 I'm your Shyamji Assistant. I can help you build amazing websites, craft custom AI solutions, or design next-gen mobile apps. What's on your mind?";
        buttons = QUICK_BUTTONS.map(b => ({ label: b.label, action: b.action }));
      } else if (lowerText.includes("web") || lowerText.includes("development")) {
        responseText = "We specialize in modern, high-performance web development using Next.js and Tailwind CSS. Our website packages start at ₹35,000. Would you like to see our plans?";
        buttons = [{ label: "View Web Packages", action: "pricing" }];
      } else if (lowerText.includes("ai") || lowerText.includes("intelligence")) {
        responseText = "Our AI solutions include custom ML models, LLM integration, and predictive analytics. AI model training starts at ₹100,000. Want to talk to an AI specialist?";
        buttons = [{ label: "Contact AI Team", action: "contact" }];
      } else if (lowerText.includes("price") || lowerText.includes("cost")) {
        responseText = "Our pricing starts from ₹25,000 for the Starter plan. You can view all our plans here.";
        buttons = [{ label: "View Pricing", action: "pricing" }];
      } else if (lowerText.includes("contact") || lowerText.includes("support") || lowerText.includes("talk")) {
        responseText = "I can definitely help with that! You can reach our team via the contact form, or I can provide our direct line. Would you like to go to the contact page?";
        buttons = [{ label: "Go to Contact", action: "contact" }];
      } else {
        responseText = "That sounds interesting! While I'm still learning, I can definitely help you with Web Development, AI Solutions, or Mobile Apps. Which one should we explore?";
        buttons = QUICK_BUTTONS.map(b => ({ label: b.label, action: b.action }));
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
        buttons
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleButtonClick = (action: string, label: string) => {
    handleSend(label, "user");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-24 right-0 w-[380px] sm:w-[420px] h-[650px] bg-white/98 backdrop-blur-3xl border border-white/30 rounded-[2.5rem] shadow-[0_40px_160px_-16px_rgba(0,0,0,0.18)] flex flex-col overflow-hidden ring-1 ring-black/5"
          >
            {/* Header */}
            <div className="p-7 bg-gradient-to-br from-[#3B82F6] via-[#60A5FA] to-[#93C5FD] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full -ml-12 -mb-12 blur-2xl" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-[inset_0_1px_4px_rgba(255,255,255,0.4)]">
                      <Bot className="w-8 h-8 text-white drop-shadow-sm" />
                    </div>
                    {/* Refined Status Dot */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5">
                      <div className="absolute inset-0 bg-blue-300 rounded-full animate-ping opacity-30" />
                      <div className="relative w-full h-full bg-blue-300 border-2 border-white rounded-full shadow-[0_0_8px_rgba(147,197,253,0.8)]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-xl tracking-tight drop-shadow-md">Shyamji Assistance</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-blue-200 shadow-[0_0_6px_rgba(147,197,253,1)] animate-pulse" />
                      <p className="text-[11px] text-white/95 font-black uppercase tracking-[0.12em] drop-shadow-sm">Online • AI Active</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-3 hover:bg-white/10 active:scale-90 rounded-full transition-all border border-white/0 hover:border-white/20 group"
                >
                  <X className="w-7 h-7 text-white/90 group-hover:text-white" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-7 space-y-7 scroll-smooth bg-slate-50/30"
            >
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[88%]",
                    msg.sender === "user" ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "p-4.5 rounded-[1.75rem] text-[15.5px] leading-relaxed shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]",
                    msg.sender === "user" 
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none shadow-blue-200/50" 
                      : "bg-white text-slate-800 border border-slate-200/50 rounded-tl-none ring-1 ring-black/[0.02]"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-400 mt-2.5 px-3 uppercase tracking-tighter opacity-80">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  
                  {msg.buttons && (
                    <div className="flex flex-wrap gap-3 mt-5">
                      {msg.buttons.map((btn) => (
                        <motion.button
                          whileHover={{ y: -3, scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          key={btn.action}
                          onClick={() => handleButtonClick(btn.action, btn.label)}
                          className="px-6 py-3 rounded-2xl bg-white border border-slate-200/80 text-[#3B82F6] text-[14px] font-extrabold hover:border-blue-400/50 hover:bg-blue-50/30 hover:shadow-[0_8px_20px_-8px_rgba(59,130,246,0.2)] transition-all flex items-center gap-2.5 group"
                        >
                          {btn.label}
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-300" />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex gap-2 p-5 bg-white border border-slate-200/50 rounded-2xl rounded-tl-none shadow-sm ring-1 ring-black/[0.02]">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-7 bg-white border-t border-slate-100/80 shadow-[0_-4px_16px_rgba(0,0,0,0.02)]">
              <form 
                className="flex items-center gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputText);
                }}
              >
                <div className="flex-1 relative group">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your question..."
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-[1.25rem] px-6 py-4 text-[15.5px] text-slate-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-4 rounded-[1.25rem] bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl shadow-blue-200/60 hover:shadow-blue-300/80 active:scale-90 disabled:opacity-40 disabled:shadow-none transition-all flex items-center justify-center group"
                >
                  <Send className="w-7 h-7 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 rounded-full bg-[#3B82F6] shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] flex items-center justify-center relative group overflow-hidden border-4 border-white"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X className="w-10 h-10 text-white relative z-10" />
        ) : (
          <div className="relative flex items-center justify-center w-full h-full">
            <MessageCircle className="w-10 h-10 text-white relative z-10" strokeWidth={1.5} />
            {/* Refined Status Dot - Top Right */}
            <div className="absolute top-3.5 right-3.5 w-4 h-4">
              <div className="absolute inset-0 bg-blue-300 rounded-full animate-ping opacity-30" />
              <div className="relative w-full h-full bg-blue-300 border-2 border-white rounded-full shadow-[0_0_6px_rgba(147,197,253,0.8)]" />
            </div>
          </div>
        )}
      </motion.button>
    </div>
  );
}
