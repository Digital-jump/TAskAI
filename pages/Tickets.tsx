import React, { useState, useEffect } from 'react';
import { db, Ticket } from '../utils/db';

const Tickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setTickets(db.tickets.getAll());
  }, []);

  const filteredTickets = tickets.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.ticketId.toLowerCase().includes(search.toLowerCase()));

  const renderColumn = (title: string, status: string, count: number, tickets: Ticket[]) => (
    <div className="w-80 flex-shrink-0 flex flex-col h-full max-h-full bg-[#f0f4f6]/50 rounded-xl px-2 py-2">
        <div className="flex items-center justify-between mb-3 px-2 pt-1">
            <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-text-main uppercase tracking-wide">{title}</h3>
                <span className="bg-white text-[#5d7275] text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">{count}</span>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto pr-1 pb-2 flex flex-col gap-3 custom-scrollbar">
            {tickets.map(t => (
                 <div key={t.id} className="bg-white p-4 rounded-xl shadow-card border-l-4 border-l-gray-300 hover:shadow-card-hover group cursor-pointer transition-all relative">
                    <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                            {t.type}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">#{t.ticketId}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-400">{t.timestamp}</span>
                </div>
                <h4 className="text-text-main font-bold text-sm leading-snug mb-2">{t.title}</h4>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{t.description}</p>
                </div>
            ))}
        </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="h-16 border-b border-[#e7f1f3] px-6 flex items-center justify-between bg-[#f8fbfc] shrink-0">
         <div className="flex items-center w-full max-w-md">
            <div className="relative w-full group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sub group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                </span>
                <input 
                    className="w-full h-10 pl-10 pr-4 bg-white border border-[#e7f1f3] rounded-lg text-sm focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder-[#9db3b8]" 
                    placeholder="Search tickets..." 
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
         </div>
      </header>

      <div className="flex-1 overflow-x-auto overflow-y-hidden bg-[#f8fbfc] p-6">
        <div className="inline-flex h-full gap-6 items-start">
            {renderColumn('New', 'New', filteredTickets.filter(t => t.status === 'New').length, filteredTickets.filter(t => t.status === 'New'))}
            {renderColumn('In Progress', 'In Progress', filteredTickets.filter(t => t.status === 'In Progress').length, filteredTickets.filter(t => t.status === 'In Progress'))}
            {renderColumn('Resolved', 'Resolved', filteredTickets.filter(t => t.status === 'Resolved').length, filteredTickets.filter(t => t.status === 'Resolved'))}
        </div>
      </div>
    </div>
  );
};

export default Tickets;