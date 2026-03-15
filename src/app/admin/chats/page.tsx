"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  Search, 
  Calendar, 
  User, 
  Trash2, 
  ChevronRight,
  ChevronLeft,
  Clock,
  Mail,
  MoreVertical
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Chat {
  id: string;
  sessionId: string;
  messages: string;
  leadName: string | null;
  leadEmail: string | null;
  createdAt: string;
}

export default function ChatsManagement() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await fetch("/api/chat");
      if (res.ok) {
        const data = await res.json();
        setChats(data);
      }
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this chat history?")) return;
    try {
      const res = await fetch(`/api/chat/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchChats();
        if (selectedChat?.id === id) setSelectedChat(null);
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const filteredChats = chats.filter(chat => 
    (chat.leadName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (chat.leadEmail?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    chat.sessionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const parseMessages = (messagesStr: string) => {
    try {
      return JSON.parse(messagesStr);
    } catch (e) {
      return [];
    }
  };

  return (
    <div className="space-y-8 h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-blue-500" />
            Chat History
          </h1>
          <p className="text-gray-400 mt-1">Review AI chatbot interactions with visitors.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-250px)]">
        {/* Chat List */}
        <div className="lg:col-span-1 flex flex-col gap-4 overflow-hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse" />
              ))
            ) : filteredChats.length === 0 ? (
              <div className="text-center py-20 text-gray-500 text-sm">No chats found.</div>
            ) : (
              filteredChats.map((chat) => (
                <Card 
                  key={chat.id} 
                  variant="glass" 
                  onClick={() => setSelectedChat(chat)}
                  className={cn(
                    "p-4 cursor-pointer transition-all border-white/5 hover:border-white/10",
                    selectedChat?.id === chat.id ? "bg-white/10 border-blue-500/30" : "hover:bg-white/5"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                        {chat.leadName ? chat.leadName[0].toUpperCase() : <User className="w-5 h-5" />}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold truncate text-white">
                          {chat.leadName || "Anonymous Visitor"}
                        </p>
                        <p className="text-[10px] text-gray-500 font-mono truncate">
                          ID: {chat.sessionId.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-600 font-medium whitespace-nowrap">
                      {new Date(chat.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Chat Details */}
        <div className="lg:col-span-2 overflow-hidden flex flex-col h-full">
          <AnimatePresence mode="wait">
            {selectedChat ? (
              <motion.div
                key={selectedChat.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <Card variant="glass" className="flex-1 flex flex-col border-white/5 overflow-hidden">
                  {/* Chat Header */}
                  <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center font-black text-lg">
                        {selectedChat.leadName ? selectedChat.leadName[0].toUpperCase() : "?"}
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-white">{selectedChat.leadName || "Anonymous Visitor"}</h2>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {new Date(selectedChat.createdAt).toLocaleString()}
                          </span>
                          {selectedChat.leadEmail && (
                            <span className="text-xs text-blue-400 flex items-center gap-1">
                              <Mail className="w-3 h-3" /> {selectedChat.leadEmail}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(selectedChat.id)}
                        className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Message History */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
                    {parseMessages(selectedChat.messages).map((msg: any, i: number) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex flex-col max-w-[80%]",
                          msg.role === "user" ? "ml-auto items-end" : "items-start"
                        )}
                      >
                        <div className={cn(
                          "px-4 py-3 rounded-2xl text-sm",
                          msg.role === "user" 
                            ? "bg-blue-600 text-white rounded-tr-none" 
                            : "bg-white/5 text-gray-200 border border-white/5 rounded-tl-none"
                        )}>
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-gray-600 mt-1 uppercase font-black tracking-widest">
                          {msg.role === "user" ? "Visitor" : "AI Assistant"}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <MessageCircle className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Select a Chat</h3>
                <p className="text-gray-500 max-w-xs mx-auto">
                  Click on a conversation from the list to view the full history and interaction details.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
