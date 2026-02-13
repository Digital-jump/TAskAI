import React, { useState, useEffect } from 'react';
import { db, Invoice } from '../utils/db';
import Modal from '../components/Modal';

const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInv, setNewInv] = useState({ client: '', amount: '' });

  useEffect(() => {
    setInvoices(db.invoices.getAll());
  }, [isModalOpen]);

  const handleCreate = (e: React.FormEvent) => {
      e.preventDefault();
      db.invoices.add({
          invoiceNo: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
          date: new Date().toISOString().split('T')[0],
          client: newInv.client,
          amount: Number(newInv.amount),
          status: 'Pending'
      });
      setIsModalOpen(false);
      setNewInv({ client: '', amount: '' });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light">
       <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
         <h2 className="text-xl font-bold tracking-tight text-text-main">Invoices & Reimbursements</h2>
         <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg shadow-sm transition-all">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Create Invoice
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Invoice No</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Client / Description</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-right">Amount</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-center">Status</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {invoices.map(inv => (
                          <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 text-sm font-bold text-primary">{inv.invoiceNo}</td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">{inv.client}</td>
                              <td className="px-6 py-4 text-sm text-gray-500">{inv.date}</td>
                              <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">${inv.amount.toLocaleString()}</td>
                              <td className="px-6 py-4 text-center">
                                  <span className={`px-2 py-1 rounded text-xs font-bold ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                      {inv.status}
                                  </span>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              {invoices.length === 0 && <div className="p-8 text-center text-gray-500">No invoices generated yet.</div>}
          </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Invoice">
          <form onSubmit={handleCreate} className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700">Client / Reason</label>
                  <input required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newInv.client} onChange={e => setNewInv({...newInv, client: e.target.value})} placeholder="e.g. Travel Reimbursement" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
                  <input required type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newInv.amount} onChange={e => setNewInv({...newInv, amount: e.target.value})} />
              </div>
              <button type="submit" className="w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover">Generate</button>
          </form>
      </Modal>
    </div>
  );
};

export default Invoices;