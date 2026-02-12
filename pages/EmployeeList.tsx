import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, Employee } from '../utils/db';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setEmployees(db.employees.getAll());
  }, []);

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
            <h1 className="text-2xl font-bold text-slate-900">Employees</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map(emp => (
                    <div key={emp.id} onClick={() => navigate(`/employees/${emp.id}`)} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={emp.avatar} alt={emp.name} className="size-16 rounded-full border-2 border-white shadow-sm" />
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{emp.name}</h3>
                                <p className="text-sm text-slate-500">{emp.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-4">
                            <span>{emp.department}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{emp.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default EmployeeList;