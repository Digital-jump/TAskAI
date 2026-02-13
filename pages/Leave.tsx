import React, { useState, useEffect } from 'react';
import { db, LeaveRequest, Holiday, AccessLevel } from '../utils/db';
import Modal from '../components/Modal';

const Leave: React.FC = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [newLeave, setNewLeave] = useState({ type: 'Sick', startDate: '', endDate: '', reason: '' });
  const [newHoliday, setNewHoliday] = useState({ name: '', date: '', type: 'National' });
  const role = db.auth.getCurrentRole();
  const canManage = ['Admin', 'HR-Admin'].includes(role);

  useEffect(() => {
    refreshData();
  }, [isModalOpen, isHolidayModalOpen]);

  const refreshData = () => {
      setRequests(db.leave.getAll());
      setHolidays(db.leave.getHolidays());
  }

  const handleApply = (e: React.FormEvent) => {
      e.preventDefault();
      // Calculate days roughly
      const start = new Date(newLeave.startDate);
      const end = new Date(newLeave.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      db.leave.add({
          employeeId: 'me', // Simulated current user
          employeeName: 'Me', // Simulated
          type: newLeave.type as any,
          startDate: newLeave.startDate,
          endDate: newLeave.endDate,
          reason: newLeave.reason,
          days: diffDays
      });
      setIsModalOpen(false);
  };

  const handleAddHoliday = (e: React.FormEvent) => {
      e.preventDefault();
      db.leave.addHoliday({
          name: newHoliday.name,
          date: newHoliday.date,
          type: newHoliday.type as any
      });
      setIsHolidayModalOpen(false);
      setNewHoliday({ name: '', date: '', type: 'National' });
  };

  const handleDeleteHoliday = (id: string) => {
      if(confirm('Are you sure you want to remove this holiday?')) {
          db.leave.deleteHoliday(id);
          refreshData();
      }
  }

  const handleStatusChange = (id: string, status: 'Approved' | 'Rejected') => {
      db.leave.updateStatus(id, status);
      setRequests(db.leave.getAll());
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light">
       <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
         <h2 className="text-xl font-bold tracking-tight text-gray-900">Leave Management</h2>
         <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg shadow-sm transition-all">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Apply for Leave
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                   <div className="flex justify-between items-start mb-2">
                       <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Annual</span>
                       <span className="material-symbols-outlined text-primary">sunny</span>
                   </div>
                   <h3 className="text-3xl font-black text-text-main">14 <span className="text-base font-medium text-gray-400">days</span></h3>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                   <div className="flex justify-between items-start mb-2">
                       <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Sick</span>
                       <span className="material-symbols-outlined text-red-500">medication</span>
                   </div>
                   <h3 className="text-3xl font-black text-text-main">5 <span className="text-base font-medium text-gray-400">days</span></h3>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                   <div className="flex justify-between items-start mb-2">
                       <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Casual</span>
                       <span className="material-symbols-outlined text-orange-500">weekend</span>
                   </div>
                   <h3 className="text-3xl font-black text-text-main">12 <span className="text-base font-medium text-gray-400">days</span></h3>
               </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Leave History / Requests */}
              <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-lg font-bold text-text-main">Leave Requests</h3>
                  {requests.map(req => (
                      <div key={req.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                              <div className={`size-12 rounded-full flex items-center justify-center text-white font-bold ${req.type === 'Sick' ? 'bg-red-400' : 'bg-blue-400'}`}>
                                  {req.employeeName.charAt(0)}
                              </div>
                              <div>
                                  <h4 className="font-bold text-text-main">{req.employeeName} <span className="text-gray-400 font-normal text-sm">• {req.type}</span></h4>
                                  <p className="text-sm text-gray-500">{req.startDate} to {req.endDate} ({req.days} days)</p>
                                  <p className="text-xs text-gray-400 mt-1 italic">"{req.reason}"</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-4 self-end md:self-center">
                              {req.status === 'Pending' && canManage ? (
                                  <div className="flex gap-2">
                                      <button onClick={() => handleStatusChange(req.id, 'Rejected')} className="px-3 py-1 bg-white border border-red-200 text-red-600 text-xs font-bold rounded hover:bg-red-50">Reject</button>
                                      <button onClick={() => handleStatusChange(req.id, 'Approved')} className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700">Approve</button>
                                  </div>
                              ) : (
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${req.status === 'Approved' ? 'bg-green-100 text-green-700' : req.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                      {req.status}
                                  </span>
                              )}
                          </div>
                      </div>
                  ))}
              </div>

              {/* Holiday Calendar */}
              <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-text-main">Holidays</h3>
                    {canManage && (
                        <button onClick={() => setIsHolidayModalOpen(true)} className="text-xs font-bold text-primary hover:underline">+ Add Holiday</button>
                    )}
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                      {holidays.map((h, i) => (
                          <div key={h.id} className={`p-4 flex items-center justify-between gap-4 ${i !== holidays.length - 1 ? 'border-b border-gray-100' : ''} group`}>
                              <div className="flex items-center gap-4">
                                <div className="text-center w-12 shrink-0">
                                    <span className="block text-xs font-bold text-red-500 uppercase">{new Date(h.date).toLocaleDateString(undefined, {month:'short'})}</span>
                                    <span className="block text-xl font-black text-gray-800">{new Date(h.date).getDate()}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 text-sm">{h.name}</p>
                                    <p className="text-xs text-gray-500">{h.type}</p>
                                </div>
                              </div>
                              {canManage && (
                                  <button onClick={() => handleDeleteHoliday(h.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <span className="material-symbols-outlined text-lg">delete</span>
                                  </button>
                              )}
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Apply for Leave">
          <form onSubmit={handleApply} className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700">Leave Type</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newLeave.type} onChange={e => setNewLeave({...newLeave, type: e.target.value})}>
                      <option value="Sick">Sick Leave</option>
                      <option value="Casual">Casual Leave</option>
                      <option value="Vacation">Annual Vacation</option>
                  </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input type="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newLeave.startDate} onChange={e => setNewLeave({...newLeave, startDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input type="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newLeave.endDate} onChange={e => setNewLeave({...newLeave, endDate: e.target.value})} />
                  </div>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700">Reason</label>
                  <textarea required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" rows={3} value={newLeave.reason} onChange={e => setNewLeave({...newLeave, reason: e.target.value})} />
              </div>
              <button type="submit" className="w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover">Submit Request</button>
          </form>
      </Modal>

      <Modal isOpen={isHolidayModalOpen} onClose={() => setIsHolidayModalOpen(false)} title="Add Holiday">
          <form onSubmit={handleAddHoliday} className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700">Holiday Name</label>
                  <input required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newHoliday.name} onChange={e => setNewHoliday({...newHoliday, name: e.target.value})} />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input type="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newHoliday.date} onChange={e => setNewHoliday({...newHoliday, date: e.target.value})} />
              </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newHoliday.type} onChange={e => setNewHoliday({...newHoliday, type: e.target.value})}>
                      <option value="National">National Holiday</option>
                      <option value="Observance">Observance</option>
                  </select>
              </div>
              <button type="submit" className="w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover">Add to Calendar</button>
          </form>
      </Modal>
    </div>
  );
};

export default Leave;