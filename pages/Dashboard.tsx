import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { db, Employee } from '../utils/db';
import Modal from '../components/Modal';

const data = [
  { name: 'Oct 1', value: 20 },
  { name: 'Oct 5', value: 45 },
  { name: 'Oct 10', value: 30 },
  { name: 'Oct 15', value: 50 },
  { name: 'Oct 20', value: 40 },
  { name: 'Oct 25', value: 65 },
  { name: 'Today', value: 58 },
];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ employees: 0, payrollStatus: 'Loading...' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '', department: '', email: '' });

  useEffect(() => {
    const employees = db.employees.getAll();
    const payroll = db.payroll.getAll();
    setStats({
      employees: employees.length,
      payrollStatus: payroll.length > 0 ? 'Active' : 'Pending'
    });
  }, [isModalOpen]);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    db.employees.add({
        ...newEmployee,
        phone: '+1 (555) 000-0000',
        avatar: `https://ui-avatars.com/api/?name=${newEmployee.name}&background=random`,
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0],
        location: 'Remote'
    });
    setIsModalOpen(false);
    setNewEmployee({ name: '', role: '', department: '', email: '' });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-text-main">Good Morning, Admin</h2>
          <p className="text-text-sub mt-1 text-sm font-medium">
            Here's your organization's overview for <span className="text-primary font-bold">Oct 24, 2023</span>.
          </p>
        </div>
        <div className="flex gap-3">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-text-main shadow-sm hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export Report
            </button>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add Employee
            </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-soft border border-slate-100 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <span className="material-symbols-outlined">groups</span>
                </div>
                <span className="flex items-center text-xs font-bold text-accent-green bg-green-50 px-2 py-1 rounded-full">+3 this month</span>
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">Total Employees</p>
                <h3 className="text-2xl font-bold text-text-main mt-1">{stats.employees}</h3>
            </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-soft border border-slate-100 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start">
                <div className="p-2 bg-teal-50 rounded-lg text-primary">
                    <span className="material-symbols-outlined">how_to_reg</span>
                </div>
                <span className="flex items-center text-xs font-bold text-accent-green bg-green-50 px-2 py-1 rounded-full">
                    <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span> 5%
                </span>
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">Attendance Today</p>
                <h3 className="text-2xl font-bold text-text-main mt-1">92%</h3>
            </div>
        </div>

         <div className="bg-white p-6 rounded-xl shadow-soft border border-slate-100 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start">
                <div className="p-2 bg-amber-50 rounded-lg text-accent-amber">
                    <span className="material-symbols-outlined">playlist_add_check</span>
                </div>
                <span className="flex items-center text-xs font-bold text-accent-amber bg-amber-50 px-2 py-1 rounded-full">Action Req.</span>
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">Leave Requests</p>
                <h3 className="text-2xl font-bold text-text-main mt-1">8 Pending</h3>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-soft border border-slate-100 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <span className="material-symbols-outlined">account_balance</span>
                </div>
                <span className="flex items-center text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Automated</span>
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">Next Payroll</p>
                <h3 className="text-2xl font-bold text-text-main mt-1">In 4 Days</h3>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Chart */}
        <div className="xl:col-span-8 bg-white rounded-xl shadow-soft border border-slate-100 p-6">
             <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-text-main">Attendance Trends</h3>
                    <p className="text-sm text-gray-500">Daily check-ins over last 30 days</p>
                </div>
                <select className="bg-slate-50 border-none text-sm rounded-lg px-3 py-2 font-medium text-gray-600 focus:ring-1 focus:ring-primary cursor-pointer">
                    <option>Last 30 Days</option>
                    <option>This Quarter</option>
                    <option>This Year</option>
                </select>
            </div>
            <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0a6c7f" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#0a6c7f" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#0a6c7f" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                 </ResponsiveContainer>
            </div>
        </div>

        {/* Widgets */}
        <div className="xl:col-span-4 flex flex-col gap-6">
            <div className="flex-1 bg-white rounded-xl shadow-soft border border-slate-100 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-text-main">Who's Out?</h3>
                    <a href="#" className="text-xs font-bold text-primary hover:underline">View Calendar</a>
                </div>
                <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAzM810IrXqGql7Ohr0RKvpCgT2sJzlQRlD5RqJOdoV1qqcedi4f0WT4BdumGT_2ZJ_0ibQIVLg4bGIhXQDHA-mrdMRnGXw0_esM0qje1XiP3ZbqFz4YYKCbq3snQvubV3Qxc0ms0I-lem9VQzE3dIoHmd_XkIuwasGxwX-YvUSogdYu3JSdki6DSr7iXu3vc5iD96Ux0mNSPW1je1u2394U2zMBk6z4Ux0-P5QHGcTq7U_E2-w4ks_33wgI78DRFvskdcw9OGl6FCA')"}}></div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-text-main">Sarah Jenkins</h4>
                            <p className="text-xs text-gray-500">Sick Leave</p>
                        </div>
                        <div className="text-right">
                            <span className="block text-xs font-bold text-accent-amber bg-amber-50 px-2 py-1 rounded">Until Oct 26</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-soft border border-slate-100 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-text-main">System Status</h3>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-50 text-accent-green text-xs font-bold uppercase tracking-wide">
                        <span className="size-2 rounded-full bg-accent-green animate-pulse"></span>
                        Healthy
                    </div>
                </div>
                <div className="flex items-center gap-6 mt-2">
                    <div className="relative size-20 rounded-full bg-gray-100 flex items-center justify-center shadow-inner">
                        <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            <path className="text-accent-green" strokeDasharray="99.9, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-xs font-bold text-text-main">99.9%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Employee">
          <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newEmployee.name} onChange={e => setNewEmployee({...newEmployee, name: e.target.value})} />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input required type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newEmployee.email} onChange={e => setNewEmployee({...newEmployee, email: e.target.value})} />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <input required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newEmployee.role} onChange={e => setNewEmployee({...newEmployee, role: e.target.value})} />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newEmployee.department} onChange={e => setNewEmployee({...newEmployee, department: e.target.value})}>
                      <option value="">Select Department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Product">Product</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                  </select>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button type="submit" className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:col-start-2">Create</button>
                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
          </form>
      </Modal>
    </div>
  );
};

export default Dashboard;