import React, { useState, useEffect } from 'react';
import { db, Meeting, Employee } from '../utils/db';
import Modal from '../components/Modal';

const Meetings: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCall, setActiveCall] = useState<Meeting | null>(null);
  const [newMeeting, setNewMeeting] = useState({ title: '', date: '', startTime: '', endTime: '', type: 'Video', attendees: [] as string[] });

  useEffect(() => {
    setMeetings(db.meetings.getAll());
    setEmployees(db.employees.getAll());
  }, [isModalOpen]);

  const handleSchedule = (e: React.FormEvent) => {
      e.preventDefault();
      db.meetings.add({
          title: newMeeting.title,
          date: newMeeting.date,
          startTime: newMeeting.startTime,
          endTime: newMeeting.endTime,
          type: newMeeting.type as any,
          attendees: newMeeting.attendees
      });
      setIsModalOpen(false);
      setNewMeeting({ title: '', date: '', startTime: '', endTime: '', type: 'Video', attendees: [] });
  };

  const toggleAttendee = (id: string) => {
      setNewMeeting(prev => ({
          ...prev,
          attendees: prev.attendees.includes(id) 
            ? prev.attendees.filter(a => a !== id) 
            : [...prev.attendees, id]
      }));
  };

  const isTimeOverlapping = (start1: string, end1: string, start2: string, end2: string) => {
      return (start1 < end2 && start2 < end1);
  }

  const checkAvailability = (empId: string) => {
      if (!newMeeting.date || !newMeeting.startTime || !newMeeting.endTime) return 'Unknown';
      
      const empMeetings = meetings.filter(m => m.attendees.includes(empId) && m.date === newMeeting.date);
      const conflict = empMeetings.find(m => isTimeOverlapping(newMeeting.startTime, newMeeting.endTime, m.startTime, m.endTime));
      
      return conflict ? 'Busy' : 'Available';
  }

  if (activeCall) {
      return (
          <div className="h-full flex flex-col bg-slate-900 text-white">
              <div className="flex-1 flex items-center justify-center p-4">
                  <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
                      <div className="aspect-video bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg border border-slate-700">
                          <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-bold">You</div>
                          <div className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-xs">Sarah Jenkins (You)</div>
                      </div>
                      {activeCall.attendees.map((attId, i) => {
                          const emp = employees.find(e => e.id === attId);
                          return (
                            <div key={i} className="aspect-video bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg border border-slate-700">
                                {emp?.avatar ? <img src={emp.avatar} className="size-20 rounded-full" /> : <span className="material-symbols-outlined text-4xl text-slate-600">person</span>}
                                <div className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-xs">{emp?.name || 'Guest'}</div>
                            </div>
                          );
                      })}
                  </div>
              </div>
              <div className="h-20 bg-slate-950 flex items-center justify-center gap-4">
                  <button className="size-12 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center"><span className="material-symbols-outlined">mic</span></button>
                  <button className="size-12 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center"><span className="material-symbols-outlined">videocam</span></button>
                  <button onClick={() => setActiveCall(null)} className="size-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-lg shadow-red-500/30"><span className="material-symbols-outlined">call_end</span></button>
                  <button className="size-12 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center"><span className="material-symbols-outlined">present_to_all</span></button>
                  <button className="size-12 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center"><span className="material-symbols-outlined">chat</span></button>
              </div>
          </div>
      );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      <header className="h-16 flex items-center justify-between px-6 border-b border-[#e7f1f3] bg-[#f8fbfc] sticky top-0 z-10">
         <h2 className="text-xl font-bold tracking-tight text-text-main">Meetings</h2>
         <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg shadow-sm transition-all">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Schedule Meeting
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meetings.map(meeting => (
                  <div key={meeting.id} className="bg-white p-6 rounded-xl shadow-card border border-gray-100 hover:border-primary/30 transition-all flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${meeting.type === 'Video' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                              {meeting.type}
                          </span>
                          <span className="text-sm font-bold text-gray-400">{meeting.startTime} - {meeting.endTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-text-main mb-2">{meeting.title}</h3>
                      <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">event</span> 
                          {new Date(meeting.date).toLocaleDateString(undefined, {weekday: 'long', month: 'long', day: 'numeric'})}
                      </p>
                      
                      <div className="mt-auto">
                          <div className="flex items-center justify-between">
                              <div className="flex -space-x-2">
                                  {meeting.attendees.map((att, i) => {
                                      const emp = employees.find(e => e.id === att);
                                      if (!emp) return null;
                                      return <img key={i} src={emp.avatar} className="size-8 rounded-full border-2 border-white" title={emp.name} />;
                                  })}
                                  {meeting.attendees.length > 3 && (
                                      <div className="size-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">+{meeting.attendees.length - 3}</div>
                                  )}
                              </div>
                              {meeting.type === 'Video' && (
                                  <button onClick={() => setActiveCall(meeting)} className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover transition-colors">
                                      Join
                                  </button>
                              )}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule Meeting">
          <form onSubmit={handleSchedule} className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newMeeting.title} onChange={e => setNewMeeting({...newMeeting, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newMeeting.date} onChange={e => setNewMeeting({...newMeeting, date: e.target.value})} />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newMeeting.type} onChange={e => setNewMeeting({...newMeeting, type: e.target.value})}>
                          <option>Video</option>
                          <option>Audio</option>
                          <option>In-Person</option>
                      </select>
                  </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input type="time" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newMeeting.startTime} onChange={e => setNewMeeting({...newMeeting, startTime: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <input type="time" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newMeeting.endTime} onChange={e => setNewMeeting({...newMeeting, endTime: e.target.value})} />
                  </div>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attendees (Availability)</label>
                  <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2 space-y-2 bg-gray-50">
                      {employees.map(emp => {
                          const status = checkAvailability(emp.id);
                          return (
                            <div key={emp.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id={`att-${emp.id}`} checked={newMeeting.attendees.includes(emp.id)} onChange={() => toggleAttendee(emp.id)} className="rounded border-gray-300 text-primary focus:ring-primary" />
                                    <label htmlFor={`att-${emp.id}`} className="text-sm text-gray-700 cursor-pointer select-none">{emp.name}</label>
                                </div>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${status === 'Busy' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    {status}
                                </span>
                            </div>
                        )})}
                  </div>
              </div>
              <button type="submit" className="w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover">Schedule</button>
          </form>
      </Modal>
    </div>
  );
};

export default Meetings;