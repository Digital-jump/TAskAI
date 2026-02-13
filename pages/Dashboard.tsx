import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip, BarChart, Bar, CartesianGrid, YAxis } from 'recharts';
import { db, Employee, AccessLevel, LeaveRequest, Holiday } from '../utils/db';
import Modal from '../components/Modal';

const areaData = [
  { name: 'Oct 1', value: 20 },
  { name: 'Oct 5', value: 45 },
  { name: 'Oct 10', value: 30 },
  { name: 'Oct 15', value: 50 },
  { name: 'Oct 20', value: 40 },
  { name: 'Oct 25', value: 65 },
  { name: 'Today', value: 58 },
];

const productivityData = [
    { name: 'Mon', worked: 7.5, expected: 8 },
    { name: 'Tue', worked: 8.2, expected: 8 },
    { name: 'Wed', worked: 6.5, expected: 8 },
    { name: 'Thu', worked: 8.0, expected: 8 },
    { name: 'Fri', worked: 7.8, expected: 8 },
];

// Mock data for HR view
const teamProductivity = [
    { name: 'Sarah Jenkins', score: 95, hours: 42, role: 'Product Manager' },
    { name: 'Alex Rivera', score: 98, hours: 45, role: 'Senior Developer' },
    { name: 'Jessica Wu', score: 88, hours: 38, role: 'Marketing Associate' },
    { name: 'Michael Chen', score: 92, hours: 40, role: 'HR Manager' },
    { name: 'John Doe', score: 75, hours: 32, role: 'Developer' }
];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ employees: 0, payrollStatus: 'Loading...' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '', department: '', email: '' });
  const [userRole, setUserRole] = useState<AccessLevel>('User');
  const [activeLeaves, setActiveLeaves] = useState<LeaveRequest[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [attendanceSession, setAttendanceSession] = useState<{startTime: string, status: string} | null>(null);

  useEffect(() => {
    const employees = db.employees.getAll();
    const payroll = db.payroll.getAll();
    const role = db.auth.getCurrentRole();
    const leaves = db.leave.getAll().filter(l => l.status === 'Approved');
    const h = db.leave.getHolidays();
    const sess = db.attendance.getSession();

    setUserRole(role);
    setStats({
      employees: employees.length,
      payrollStatus: payroll.length > 0 ? 'Active' : 'Pending'
    });
    setActiveLeaves(leaves);
    setHolidays(h);
    setAttendanceSession(sess);
  }, [isModalOpen]);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    db.employees.add({
        ...newEmployee,
        phone: '+1 (555) 000-0000',
        avatar: `https://ui-avatars.com/api/?name=${newEmployee.name}&background=random`,
        status: 'Active',
        accessLevel: 'User',
        joinedDate: new Date().toISOString().split('T')[0],
        location: 'Remote'
    });
    setIsModalOpen(false);
    setNewEmployee({ name: '', role: '', department: '', email: '' });
  };

  const toggleClock = () => {
      if (attendanceSession) {
          db.attendance.clockOut();
          setAttendanceSession(null);
      } else {
          setAttendanceSession(db.attendance.clockIn());
      }
  };

  const isAdminOrHR = ['Admin', 'HR-Admin'].includes(userRole);

  // --- RENDER ADMIN / HR DASHBOARD ---
  if (isAdminOrHR) {
    return (
      <div className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-text-main">Org Overview</h2>
            <p className="text-text-sub mt-1 text-sm font-medium">
              Dashboard for <span className="font-bold text-primary">{userRole}</span>.
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
          <div className="xl:col-span-8 bg-white rounded-xl shadow-soft border border-slate-100 p-6">
               <div className="flex flex-wrap justify-between items-center mb-6">
                  <div>
                      <h3 className="text-lg font-bold text-text-main">Team Productivity</h3>
                      <p className="text-sm text-gray-500">Weekly performance and hours tracked</p>
                  </div>
                  <button onClick={() => window.location.hash = '#/employees'} className="text-sm font-bold text-primary hover:underline">View All Employees</button>
              </div>
              <div className="overflow-x-auto">
                   <table className="w-full text-left">
                       <thead className="bg-slate-50 border-b border-slate-100">
                           <tr>
                               <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Employee</th>
                               <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Role</th>
                               <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center">Efficiency Score</th>
                               <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-right">Hours Logged</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                           {teamProductivity.map((p, i) => (
                               <tr key={i} className="hover:bg-gray-50 transition-colors">
                                   <td className="px-4 py-3 text-sm font-bold text-text-main">{p.name}</td>
                                   <td className="px-4 py-3 text-xs text-gray-500">{p.role}</td>
                                   <td className="px-4 py-3 text-center">
                                       <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${p.score >= 90 ? 'bg-green-100 text-green-700' : p.score >= 80 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                           {p.score}/100
                                       </span>
                                   </td>
                                   <td className="px-4 py-3 text-sm font-bold text-text-main text-right">{p.hours}h</td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
              </div>
          </div>

          <div className="xl:col-span-4 flex flex-col gap-6">
              <div className="flex-1 bg-white rounded-xl shadow-soft border border-slate-100 p-6">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-text-main">Who's Out?</h3>
                      <a href="#/leave" className="text-xs font-bold text-primary hover:underline">View All</a>
                  </div>
                  <div className="space-y-4">
                       {activeLeaves.length === 0 ? <p className="text-sm text-gray-500">No one is currently on leave.</p> : activeLeaves.slice(0, 3).map(leave => (
                           <div key={leave.id} className="flex items-center gap-3">
                              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{leave.employeeName.charAt(0)}</div>
                              <div className="flex-1">
                                  <h4 className="text-sm font-bold text-text-main">{leave.employeeName}</h4>
                                  <p className="text-xs text-gray-500">{leave.type} Leave</p>
                              </div>
                              <div className="text-right">
                                  <span className="block text-xs font-bold text-accent-amber bg-amber-50 px-2 py-1 rounded">Until {new Date(leave.endDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
                              </div>
                          </div>
                       ))}
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
  }

  // --- RENDER USER / DEVELOPER DASHBOARD ---
  return (
      <div className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
          <header className="flex items-center justify-between mb-8">
              <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-text-main">My Dashboard</h2>
                  <p className="text-text-sub mt-1 text-sm font-medium">
                      Welcome back. You have <span className="font-bold text-primary">3 tasks</span> pending review.
                  </p>
              </div>
              <div className="flex gap-3">
                  <button 
                    onClick={toggleClock} 
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold shadow-lg transition-all ${attendanceSession ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' : 'bg-primary text-white hover:bg-primary-hover shadow-primary/20'}`}
                   >
                      <span className="material-symbols-outlined text-[18px]">{attendanceSession ? 'timer_off' : 'timer'}</span>
                      {attendanceSession ? 'Clock Out' : 'Clock In'}
                  </button>
              </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Productivity Card */}
              <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-xl shadow-soft border border-slate-100">
                   <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-text-main">My Productivity</h3>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+1.2hrs overtime</span>
                   </div>
                   <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={productivityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                                <YAxis hide />
                                <Tooltip />
                                <Bar dataKey="worked" fill="#0a6c7f" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                   </div>
              </div>

              {/* Leave Balance Card */}
              <div className="bg-white p-6 rounded-xl shadow-soft border border-slate-100 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-text-main mb-1">Leave Balance</h3>
                    <p className="text-xs text-gray-500">Remaining days for 2023</p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                      <div className="text-center">
                          <span className="block text-2xl font-black text-text-main">12</span>
                          <span className="text-xs text-gray-400 font-bold uppercase">Casual</span>
                      </div>
                      <div className="h-8 w-px bg-gray-200"></div>
                      <div className="text-center">
                          <span className="block text-2xl font-black text-text-main">5</span>
                          <span className="text-xs text-gray-400 font-bold uppercase">Sick</span>
                      </div>
                      <div className="h-8 w-px bg-gray-200"></div>
                       <div className="text-center">
                          <span className="block text-2xl font-black text-text-main">14</span>
                          <span className="text-xs text-gray-400 font-bold uppercase">Annual</span>
                      </div>
                  </div>
                  <button onClick={() => window.location.hash = '#/leave'} className="mt-6 w-full py-2 bg-background-light text-text-main border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
                      Apply for Leave
                  </button>
              </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Holidays */}
              <div className="bg-white p-6 rounded-xl shadow-soft border border-slate-100">
                  <h3 className="text-lg font-bold text-text-main mb-4">Upcoming Holidays</h3>
                  <div className="space-y-4">
                      {holidays.map(holiday => (
                          <div key={holiday.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                              <div className="flex flex-col items-center justify-center bg-primary/5 w-12 h-12 rounded-lg text-primary">
                                  <span className="text-xs font-bold uppercase">{new Date(holiday.date).toLocaleDateString(undefined, {month:'short'})}</span>
                                  <span className="text-lg font-black">{new Date(holiday.date).getDate()}</span>
                              </div>
                              <div>
                                  <h4 className="font-bold text-text-main">{holiday.name}</h4>
                                  <p className="text-xs text-gray-500">{holiday.type}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Who's on Leave */}
              <div className="bg-white p-6 rounded-xl shadow-soft border border-slate-100">
                  <h3 className="text-lg font-bold text-text-main mb-4">Teammates on Leave</h3>
                  <div className="space-y-4">
                       {activeLeaves.length === 0 ? <p className="text-sm text-gray-500">Everyone is in today.</p> : activeLeaves.map(leave => (
                           <div key={leave.id} className="flex items-center gap-3">
                              <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-bold">{leave.employeeName.charAt(0)}</div>
                              <div className="flex-1">
                                  <h4 className="text-sm font-bold text-text-main">{leave.employeeName}</h4>
                                  <p className="text-xs text-gray-500">{leave.type} Leave</p>
                              </div>
                              <div className="text-right">
                                  <span className="block text-xs font-bold text-gray-500">Return:</span>
                                  <span className="block text-xs font-bold text-text-main">{new Date(leave.endDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
                              </div>
                          </div>
                       ))}
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Dashboard;