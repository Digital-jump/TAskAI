import React, { useState, useEffect } from 'react';
import { db, PayrollRecord, Employee, AccessLevel } from '../utils/db';

const Payroll: React.FC = () => {
  const [records, setRecords] = useState<(PayrollRecord & { employee?: Employee })[]>([]);
  const [hasPermission, setHasPermission] = useState(true);

  const loadData = () => {
      const payrollData = db.payroll.getAll();
      const employeeData = db.employees.getAll();
      
      const combined = payrollData.map(record => ({
          ...record,
          employee: employeeData.find(e => e.id === record.employeeId)
      }));
      setRecords(combined);
  };

  useEffect(() => {
    const role = db.auth.getCurrentRole();
    if (!['Admin', 'HR-Admin'].includes(role)) {
        setHasPermission(false);
        return;
    }
    loadData();
  }, []);

  const handleRunPayroll = () => {
      if (confirm('Generate payroll for all active employees?')) {
        db.payroll.generate();
        loadData();
      }
  };

  if (!hasPermission) {
      return (
          <div className="flex h-full items-center justify-center">
              <div className="text-center">
                  <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">lock</span>
                  <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
                  <p className="text-gray-500 mt-2">You do not have permission to view payroll information.</p>
              </div>
          </div>
      );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white/80 backdrop-blur-md z-10">
         <div className="flex items-center gap-4">
             <h2 className="text-xl font-bold tracking-tight text-gray-900">Payroll Processing</h2>
         </div>
         <div className="flex items-center gap-4">
             <button onClick={handleRunPayroll} className="hidden md:flex items-center justify-center h-10 px-4 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg shadow-sm shadow-primary/30 transition-all gap-2">
                <span className="material-symbols-outlined text-[20px]">play_circle</span>
                <span>Run Payroll</span>
            </button>
         </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-200">
                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Base Salary</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Bonus</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Deductions</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Net Pay</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {records.map(record => (
                            <tr key={record.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 shadow-sm border border-gray-100" style={{backgroundImage: `url('${record.employee?.avatar}')`}}></div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{record.employee?.name || 'Unknown'}</p>
                                            <p className="text-xs text-gray-500">{record.employee?.department}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-600">${record.baseSalary.toLocaleString()}</td>
                                <td className="py-4 px-6 text-sm text-green-600 font-medium">+${record.bonus.toLocaleString()}</td>
                                <td className="py-4 px-6 text-sm text-red-500 font-medium">-${record.deductions.toLocaleString()}</td>
                                <td className="py-4 px-6 text-right"><span className="text-sm font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-md">${record.netPay.toLocaleString()}</span></td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${record.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                        {record.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Payroll;