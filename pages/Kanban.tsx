import React, { useState, useEffect } from 'react';
import { db, Task, AccessLevel, Employee } from '../utils/db';
import Modal from '../components/Modal';

const Kanban: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', tags: '', priority: 'Medium', assigneeId: '', dueDate: '', blockedBy: '' });
  const [role, setRole] = useState<AccessLevel>('User');

  useEffect(() => {
    setTasks(db.tasks.getAll());
    setEmployees(db.employees.getAll());
    setRole(db.auth.getCurrentRole());
  }, [isModalOpen]);

  const refreshTasks = () => setTasks(db.tasks.getAll());

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    db.tasks.add({
        title: newTask.title,
        status: 'Backlog',
        priority: newTask.priority as any,
        tags: newTask.tags.split(',').map(t => t.trim()),
        assigneeId: newTask.assigneeId,
        dueDate: newTask.dueDate,
        blockedBy: newTask.blockedBy
    });
    setIsModalOpen(false);
    setNewTask({ title: '', tags: '', priority: 'Medium', assigneeId: '', dueDate: '', blockedBy: '' });
  };

  const moveTask = (task: Task) => {
      // Check dependency
      if (task.blockedBy) {
          const blocker = tasks.find(t => t.id === task.blockedBy);
          if (blocker && blocker.status !== 'Done') {
              alert(`Cannot start this task. It is blocked by: "${blocker.title}"`);
              return;
          }
      }

      const statuses: Task['status'][] = ['Backlog', 'To Do', 'In Progress', 'In Review', 'Done'];
      const currentIndex = statuses.indexOf(task.status);
      
      let nextStatus = statuses[currentIndex + 1];
      
      const isManager = ['Admin', 'HR-Admin'].includes(role);

      if (task.status === 'In Review' && !isManager) {
          alert('Only managers can approve tasks.');
          return;
      }
      
      if (nextStatus) {
          db.tasks.update(task.id, { status: nextStatus });
          refreshTasks();
      }
  };

  const getAssignee = (id?: string) => employees.find(e => e.id === id);

  const renderColumn = (status: Task['status'], title: string, isApprovalColumn = false) => {
      const columnTasks = tasks.filter(t => t.status === status);
      return (
        <div className={`w-80 flex-shrink-0 flex flex-col h-full max-h-full ${isApprovalColumn ? 'bg-orange-50 border border-orange-100' : 'bg-[#f0f4f6]/50'} rounded-xl px-2 py-2`}>
            <div className="flex items-center justify-between mb-3 px-2 pt-1">
            <div className="flex items-center gap-2">
                <h3 className={`text-sm font-bold uppercase tracking-wide ${isApprovalColumn ? 'text-orange-700' : 'text-text-main'}`}>{title}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full shadow-sm ${isApprovalColumn ? 'bg-orange-200 text-orange-800' : 'bg-white text-[#5d7275]'}`}>{columnTasks.length}</span>
            </div>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 pb-2 flex flex-col gap-3 custom-scrollbar">
                {columnTasks.map(task => {
                    const assignee = getAssignee(task.assigneeId);
                    const blocker = tasks.find(t => t.id === task.blockedBy);
                    const isBlocked = blocker && blocker.status !== 'Done';
                    
                    return (
                        <div key={task.id} onClick={() => moveTask(task)} className={`bg-white p-4 rounded-xl shadow-card hover:shadow-card-hover group cursor-pointer transition-all border border-transparent ${status === 'In Review' ? 'border-l-4 border-l-orange-400' : 'hover:border-primary/20'} ${isBlocked ? 'opacity-80 bg-gray-50' : ''}`}>
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${task.priority === 'High' ? 'bg-red-100 text-red-700' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{task.priority}</span>
                                {task.dueDate && (
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold bg-gray-50 px-1.5 py-0.5 rounded">
                                        <span className="material-symbols-outlined text-[12px]">calendar_today</span>
                                        {new Date(task.dueDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                                    </div>
                                )}
                            </div>
                            <h4 className="text-text-main font-bold text-sm leading-snug mb-3 flex items-start gap-1">
                                {isBlocked && <span className="material-symbols-outlined text-[16px] text-red-500 mt-0.5" title={`Blocked by: ${blocker.title}`}>link_off</span>}
                                {task.title}
                            </h4>
                            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                                <div className="flex items-center gap-2">
                                    {assignee ? (
                                        <img src={assignee.avatar} alt={assignee.name} title={`Assigned to ${assignee.name}`} className="size-6 rounded-full border border-white shadow-sm" />
                                    ) : (
                                        <div className="size-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-white shadow-sm">
                                            <span className="material-symbols-outlined text-[14px]">person</span>
                                        </div>
                                    )}
                                    <div className="flex gap-1">
                                        {task.tags.map(tag => <span key={tag} className="text-[10px] bg-slate-100 px-1 rounded text-slate-500">{tag}</span>)}
                                    </div>
                                </div>
                                {status !== 'Done' && (
                                    <span className="text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                        {status === 'In Review' ? (role === 'Admin' ? 'Approve' : 'Waiting') : (isBlocked ? 'Blocked' : 'Move')}
                                        {status !== 'In Review' && !isBlocked && <span>&rarr;</span>}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="h-16 border-b border-[#e7f1f3] px-6 flex items-center justify-between bg-[#f8fbfc] shrink-0">
         <div className="flex items-center gap-4">
             <h2 className="text-lg font-bold text-text-main">Project Kanban</h2>
             {role === 'Developer' && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">Role: Developer</span>}
         </div>
         <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-bold shadow-sm hover:shadow-md transition-all">
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Task
         </button>
      </header>

      {/* Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden bg-[#f8fbfc] p-6">
        <div className="inline-flex h-full gap-6 items-start">
            {renderColumn('Backlog', 'Backlog')}
            {renderColumn('To Do', 'To Do')}
            {renderColumn('In Progress', 'In Progress')}
            {renderColumn('In Review', 'In Review', true)}
            {renderColumn('Done', 'Done')}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Task">
         <form onSubmit={handleAddTask} className="space-y-4">
             <div>
                 <label className="block text-sm font-medium text-gray-700">Task Title</label>
                 <input required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} />
             </div>
             <div className="grid grid-cols-2 gap-4">
                 <div>
                     <label className="block text-sm font-medium text-gray-700">Priority</label>
                     <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})}>
                         <option>Low</option>
                         <option>Medium</option>
                         <option>High</option>
                     </select>
                 </div>
                 <div>
                     <label className="block text-sm font-medium text-gray-700">Due Date</label>
                     <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newTask.dueDate} onChange={e => setNewTask({...newTask, dueDate: e.target.value})} />
                 </div>
             </div>
             <div>
                 <label className="block text-sm font-medium text-gray-700">Assign To</label>
                 <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newTask.assigneeId} onChange={e => setNewTask({...newTask, assigneeId: e.target.value})}>
                     <option value="">Unassigned</option>
                     {employees.map(emp => (
                         <option key={emp.id} value={emp.id}>{emp.name}</option>
                     ))}
                 </select>
             </div>
             <div>
                 <label className="block text-sm font-medium text-gray-700">Blocked By (Dependency)</label>
                 <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newTask.blockedBy} onChange={e => setNewTask({...newTask, blockedBy: e.target.value})}>
                     <option value="">No Dependency</option>
                     {tasks.filter(t => t.status !== 'Done').map(t => (
                         <option key={t.id} value={t.id}>{t.title} ({t.status})</option>
                     ))}
                 </select>
             </div>
             <div>
                 <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                 <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newTask.tags} onChange={e => setNewTask({...newTask, tags: e.target.value})} />
             </div>
             <button type="submit" className="w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover">Add Task</button>
         </form>
      </Modal>
    </div>
  );
};

export default Kanban;