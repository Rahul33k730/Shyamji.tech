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
      if (lowerText.includes("web") || lowerText.includes("development")) {
        responseText = "We specialize in modern, high-performance web development using Next.js and Tailwind CSS. Our website packages start at ₹35,000. Would you like to see our plans?";
        buttons = [{ label: "View Web Packages", action: "pricing" }];
      } else if (lowerText.includes("ai") || lowerText.includes("intelligence")) {
        responseText = "Our AI solutions include custom ML models, LLM integration, and predictive analytics. AI model training starts at ₹100,000. Want to talk to an AI specialist?";
        buttons = [{ label: "Contact AI Team", action: "contact" }];
      } else if (lowerText.includes("price") || lowerText.includes("cost")) {
        responseText = "Our pricing starts from ₹25,000 for the Starter plan. You can view all our plans here.";
        buttons = [{ label: "View Pricing", action: "pricing" }];
      } else {
        responseText = "I'm not sure I understand. Could you please specify which service you're interested in? We offer Web Development, Mobile Apps, and AI Solutions.";
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
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[550px] bg-card border border-border/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-emerald-600 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Shyamji Assistant</h4>
                  <p className="text-[10px] text-white/70 font-medium uppercase tracking-wider">Online • AI Powered</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-foreground/10"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    msg.sender === "user" ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    msg.sender === "user" 
                      ? "bg-blue-600 text-white rounded-tr-none" 
                      : "bg-foreground/5 text-primary border border-border/5 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  
                  {msg.buttons && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.buttons.map((btn) => (
                        <button
                          key={btn.action}
                          onClick={() => handleButtonClick(btn.action, btn.label)}
                          className="px-4 py-2 rounded-xl bg-foreground/5 border border-border/10 text-primary text-[12px] font-semibold hover:border-[#1ab8ff]/50 transition-all"
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-muted">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest">Assistant is typing...</span>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-border/10">
              <form 
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputText);
                }}
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask something..."
                  className="flex-1 bg-foreground/5 border border-border/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none focus:border-[#1ab8ff]/50 transition-all"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-emerald-600 shadow-2xl flex items-center justify-center relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 animate-ping bg-blue-500/20 rounded-full" />
        {isOpen ? (
          <X className="w-8 h-8 text-white relative z-10" />
        ) : (
          <MessageCircle className="w-8 h-8 text-white relative z-10" />
        )}
      </motion.button>
    </div>
  );
}
