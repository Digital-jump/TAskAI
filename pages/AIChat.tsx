import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { db } from '../utils/db';

interface AIMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
      { id: '1', role: 'assistant', content: 'Hello! I am your WorkFlow Pro Assistant. I have access to your tasks, team directory, and HR policies. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getSystemContext = () => {
      const employees = db.employees.getAll();
      const tasks = db.tasks.getAll();
      const leaves = db.leave.getAll();
      const currentUserRole = db.auth.getCurrentRole();

      return `You are a helpful HR and Project Assistant for WorkFlow Pro.
      
      Current User Role: ${currentUserRole}

      Company Data:
      - Employees Directory: ${JSON.stringify(employees.map(e => ({ name: e.name, role: e.role, department: e.department, status: e.status, email: e.email })))}
      - Active Tasks: ${JSON.stringify(tasks.map(t => ({ title: t.title, status: t.status, priority: t.priority, assigneeId: t.assigneeId })))}
      - Leave Requests: ${JSON.stringify(leaves.map(l => ({ employee: l.employeeName, type: l.type, days: l.days, status: l.status })))}
      
      HR Policies:
      - Remote Work: Allowed 3 days/week with manager approval.
      - Standard Hours: 9 AM - 5 PM.
      - Leave Entitlement: 12 Casual, 5 Sick, 14 Annual days per year.

      Instructions:
      - Provide concise answers.
      - You can draft professional emails if asked.
      - You can summarize project status based on tasks.
      - If asked about "my" tasks, look for tasks assigned to the current user (assume context if possible, otherwise list all).
      `;
  };

  const handleSend = async () => {
      if (!input.trim()) return;
      
      const userText = input;
      const userMsg: AIMessage = { id: Date.now().toString(), role: 'user', content: userText };
      setMessages(prev => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          
          // Construct history for the model
          const history = messages.map(m => ({
              role: m.role === 'user' ? 'user' : 'model',
              parts: [{ text: m.content }]
          }));

          const systemInstruction = getSystemContext();

          const response = await ai.models.generateContent({
              model: 'gemini-3-flash-preview',
              contents: [...history, { role: 'user', parts: [{ text: userText }] }],
              config: {
                  systemInstruction: systemInstruction
              }
          });

          const reply = response.text || "I'm sorry, I couldn't generate a response.";
          
          const aiMsg: AIMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: reply };
          setMessages(prev => [...prev, aiMsg]);

      } catch (error) {
          console.error("AI Error:", error);
          const errorMsg: AIMessage = { 
              id: (Date.now() + 1).toString(), 
              role: 'assistant', 
              content: "I'm having trouble connecting to the AI service right now. Please check your API key configuration." 
          };
          setMessages(prev => [...prev, errorMsg]);
      } finally {
          setIsTyping(false);
      }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
      }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
        <header className="h-16 flex items-center justify-between px-6 border-b border-[#e7f1f3] bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                    <span className="material-symbols-outlined">smart_toy</span>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-text-main leading-tight">WorkFlow AI</h2>
                    <p className="text-xs text-gray-500">Powered by Gemini 3 Flash</p>
                </div>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8fbfc]">
            {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] lg:max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white border border-gray-100 text-text-main rounded-bl-none'}`}>
                        {msg.content}
                    </div>
                </div>
            ))}
            {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                        <span className="size-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></span>
                        <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></span>
                    </div>
                </div>
            )}
            <div ref={endRef} />
        </div>

        <div className="p-4 bg-white border-t border-[#e7f1f3]">
            <div className="max-w-4xl mx-auto relative">
                <input 
                    type="text" 
                    className="w-full pl-4 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-primary shadow-sm transition-all"
                    placeholder="Ask about tasks, policies, or draft an email..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping}
                />
                <button onClick={handleSend} disabled={isTyping} className="absolute right-2 top-2 p-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors disabled:opacity-50">
                    <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default AIChat;