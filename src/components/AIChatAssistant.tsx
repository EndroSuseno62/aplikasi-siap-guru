/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, AlertCircle, Loader2 } from "lucide-react";

interface AIChatAssistantProps {
  onRefine: (userInstruction: string) => Promise<void>;
  isGenerating: boolean;
  activeTab: string;
}

export default function AIChatAssistant({
  onRefine,
  isGenerating,
  activeTab
}: AIChatAssistantProps) {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string; isError?: boolean }>>([
    {
      sender: "ai",
      text: "Halo Pak/Bu Guru! Saya asisten SIAP GURU. Saya bisa membantu merombak, merevisi, atau memoles dokumen pembelajaran Anda. Silakan ketik perintah, contoh:\n\n• 'Ubah studi kasus LKPD menjadi sistem telepon Puskesmas'\n• 'Tambahkan penjelasan routing statis di materi ajar'\n• 'Buat soal esai nomor 3 tingkat HOTS yang lebih sulit'"
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const getSectionLabel = () => {
    switch (activeTab) {
      case "rpp": return "Modul Ajar (RPP)";
      case "materi": return "Materi Ajar";
      case "lkpd": return "LKPD Praktikum";
      case "asesmen": return "Asesmen";
      default: return "Dokumen";
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);

    // Add a generating status
    try {
      await onRefine(userMsg);
      setMessages(prev => [
        ...prev, 
        { 
          sender: "ai", 
          text: `Saya telah memproses permintaan Anda untuk menyempurnakan bagian **${getSectionLabel()}**! Anda dapat melihat perubahan di area pratinjau sekarang.` 
        }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev, 
        { 
          sender: "ai", 
          text: `Maaf, saya menemui error saat menyempurnakan dokumen: ${err.message || err}. Silakan coba kembali.`,
          isError: true
        }
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 text-slate-200">
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          <div>
            <h2 className="font-semibold text-white tracking-tight leading-none text-xs">Asisten Penyempurnaan AI</h2>
            <span className="text-[10px] text-slate-400">Poles dokumen aktif</span>
          </div>
        </div>
        <span className="text-[10px] bg-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded uppercase">
          {activeTab}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
              msg.sender === "user"
                ? "bg-blue-600 text-white ml-auto"
                : msg.isError
                ? "bg-rose-950 border border-rose-800 text-rose-200 mr-auto"
                : "bg-slate-800 text-slate-200 border border-slate-700 mr-auto"
            }`}
          >
            {msg.sender === "ai" && !msg.isError && (
              <div className="flex items-center gap-1 mb-1 font-bold text-blue-400 text-[10px]">
                <Sparkles className="w-3 h-3" />
                <span>SIAP GURU AI</span>
              </div>
            )}
            {msg.isError && (
              <div className="flex items-center gap-1 mb-1 font-bold text-rose-400 text-[10px]">
                <AlertCircle className="w-3 h-3" />
                <span>PROSES GAGAL</span>
              </div>
            )}
            <p className="whitespace-pre-wrap">{msg.text}</p>
          </div>
        ))}

        {isGenerating && (
          <div className="flex flex-col max-w-[85%] rounded-lg p-3 text-xs leading-relaxed bg-slate-800 border border-slate-700 mr-auto">
            <div className="flex items-center gap-2 text-slate-400">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
              <span>Gemini sedang memformulasikan dokumen RPP/Administrasi...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-1.5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isGenerating}
          placeholder={`Poles bagian ${getSectionLabel()}...`}
          className="flex-1 bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isGenerating || !input.trim()}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded p-2 transition-all cursor-pointer flex items-center justify-center"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
