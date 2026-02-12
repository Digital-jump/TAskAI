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
                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                    <div className="relative">
                        <img src={employee.avatar} alt={employee.name} className="size-24 md:size-32 rounded-full border-4 border-white shadow-md bg-cover bg-center" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-2xl font-bold text-slate-900">{employee.name}</h1>
                        <p className="text-slate-500 font-medium text-base">{employee.role} • {employee.department}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                             <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">location_on</span> {employee.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Contact</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase">Email</p>
                            <p className="font-medium">{employee.email}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase">Phone</p>
                            <p className="font-medium">{employee.phone}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Employment</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase">Joined</p>
                            <p className="font-medium">{employee.joinedDate}</p>
                        </div>
                         <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase">Status</p>
                            <span className="font-medium">{employee.status}</span>
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