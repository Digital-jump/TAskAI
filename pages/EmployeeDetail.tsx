import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, Employee } from '../utils/db';

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | undefined>(undefined);

  useEffect(() => {
    if (id) {
        const found = db.employees.get(id);
        setEmployee(found);
    }
  }, [id]);

  if (!employee) return <div className="p-8">Loading or Employee not found... <button onClick={() => navigate('/employees')} className="text-primary underline">Go back</button></div>;

  // Calculate tenure
  const joined = new Date(employee.joinedDate);
  const now = new Date();
  const years = now.getFullYear() - joined.getFullYear();
  
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-2 text-sm">
          <button onClick={() => navigate('/employees')} className="text-slate-500 hover:text-primary transition-colors">Employees</button>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-900">{employee.name}</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
         <div className="max-w-6xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 flex gap-3">
                    {employee.socials?.linkedin && (
                        <a href={`https://linkedin.com/in/${employee.socials.linkedin}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0077b5] transition-colors">
                            <span className="material-symbols-outlined">post</span>
                        </a>
                    )}
                    {employee.socials?.twitter && (
                        <a href={`https://twitter.com/${employee.socials.twitter}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#1DA1F2] transition-colors">
                             <span className="material-symbols-outlined">flutter_dash</span>
                        </a>
                    )}
                    {employee.socials?.github && (
                        <a href={`https://github.com/${employee.socials.github}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                            <span className="material-symbols-outlined">code</span>
                        </a>
                    )}
                </div>
                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                    <div className="relative">
                        <img src={employee.avatar} alt={employee.name} className="size-24 md:size-32 rounded-full border-4 border-white shadow-md bg-cover bg-center" />
                        <div className={`absolute bottom-1 right-1 size-5 rounded-full border-2 border-white ${employee.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-2xl font-bold text-slate-900">{employee.name}</h1>
                        <p className="text-slate-500 font-medium text-base">{employee.role} • {employee.department}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                             <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">location_on</span> {employee.location}</span>
                             <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">calendar_today</span> Joined {new Date(employee.joinedDate).getFullYear()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Celebrations / Momentum */}
                 <div className="lg:col-span-3 bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-6 border border-primary/10 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                         <div className="size-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                             <span className="material-symbols-outlined text-2xl">celebration</span>
                         </div>
                         <div>
                             <h3 className="font-bold text-slate-900">Momentum</h3>
                             <p className="text-sm text-slate-600">Celebrating {years > 0 ? `${years} years` : 'new beginnings'} with WorkFlow Pro!</p>
                         </div>
                     </div>
                     {years >= 1 && (
                         <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm border border-primary/10">
                             {years} Year Anniversary
                         </span>
                     )}
                 </div>

                <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Contact</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-400">mail</span>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase">Email</p>
                                <p className="font-medium text-sm break-all">{employee.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-400">call</span>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase">Phone</p>
                                <p className="font-medium text-sm">{employee.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Overview</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 rounded-lg bg-gray-50">
                            <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Status</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {employee.status}
                            </span>
                        </div>
                        <div className="p-4 rounded-lg bg-gray-50">
                            <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Access Level</p>
                            <p className="font-bold text-slate-700">{employee.accessLevel}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-gray-50">
                            <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Reports To</p>
                            <p className="font-bold text-slate-700">Michael Chen</p>
                        </div>
                        <div className="p-4 rounded-lg bg-gray-50">
                            <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Team Size</p>
                            <p className="font-bold text-slate-700">8 Members</p>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;