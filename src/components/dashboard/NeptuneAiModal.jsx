import React, { useState } from 'react';
import { Sparkles, Bot, Send, User, X, Cpu, ShieldCheck } from 'lucide-react';
import { oceanAudio } from '../../utils/oceanAudio';

export function NeptuneAiModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Greetings. I am Neptune AI v4.8, your neural ocean intelligence assistant. I am currently ingesting live acoustic arrays and satellite thermals across 4,200 subsea telemetry nodes. How can I assist your mission today?'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');

  const quickPrompts = [
    'Analyze Honu Sea Turtle migration path',
    'Simulate 1.5°C ocean temperature rise impact',
    'Detect illegal sonar signals in Zone 4',
    'Generate Marine Biodiversity Report PDF'
  ];

  const handleSend = (queryText) => {
    const prompt = queryText || inputQuery;
    if (!prompt.trim()) return;

    oceanAudio.playBubblePop();
    const userMsg = { sender: 'user', text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');

    // Simulate AI neural response
    setTimeout(() => {
      oceanAudio.playSonarPing();
      let response = '';
      if (prompt.includes('Honu') || prompt.includes('Turtle')) {
        response = 'Honu Sea Turtle (Chelonia mydas) telemetry: Swimming at 1.8 knots, depth 42m. Migratory path aligns 98.4% with optimal thermal currents. Zero plastic debris obstacles detected in immediate 15km sector.';
      } else if (prompt.includes('temperature') || prompt.includes('rise')) {
        response = 'Ecosystem Impact Simulation (+1.5°C): Deep sea coral bleaching risk increases by 14.2% in shallow reefs. Abyssal zone species remain protected at 4.1°C stable temperature baseline.';
      } else if (prompt.includes('sonar') || prompt.includes('illegal')) {
        response = 'Subsea Acoustic Scan: Acoustic spectrum clear. Hydrophone array detected zero active naval low-frequency sonar signatures in protected marine sanctuary Zone 4.';
      } else {
        response = `Neptune Neural Model ingested query: "${prompt}". All live sensor parameters indicate optimal marine ecosystem health index of 97.8%.`;
      }
      setMessages((prev) => [...prev, { sender: 'ai', text: response }]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ocean-abyss/85 backdrop-blur-lg p-4">
      <div className="relative w-full max-w-2xl glass-panel p-6 border-cyan-400/50 shadow-[0_0_60px_rgba(0,243,255,0.3)] flex flex-col h-[560px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,243,255,0.4)]">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white font-display">Neptune Ocean AI Intelligence</h3>
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 rounded uppercase">
                  GPT-DeepSea
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400">Autonomous Marine Neural Network • Real-time Telemetry Processing</p>
            </div>
          </div>

          <button
            onClick={() => {
              oceanAudio.playBubblePop();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 mb-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                    : 'bg-ocean-navy/80 border border-cyan-500/30 text-slate-200 rounded-tl-none shadow-inner'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="px-3 py-1.5 rounded-lg bg-ocean-navy/60 border border-cyan-500/20 hover:border-cyan-400 text-[11px] text-cyan-300 whitespace-nowrap transition-all"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-2 border-t border-cyan-500/30"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask Neptune AI about marine life, water quality, or subsea anomalies..."
            className="flex-1 bg-ocean-abyss/80 border border-cyan-500/30 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,243,255,0.4)]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
