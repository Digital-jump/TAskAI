import React, { useState, useEffect } from 'react';
import { db, Task } from '../utils/db';
import Modal from '../components/Modal';

const Kanban: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', tags: '', priority: 'Medium' });

  useEffect(() => {
    setTasks(db.tasks.getAll());
  }, [isModalOpen]);

  const refreshTasks = () => setTasks(db.tasks.getAll());

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    db.tasks.add({
        title: newTask.title,
        status: 'Backlog',
        priority: newTask.priority as any,
        tags: newTask.tags.split(',').map(t => t.trim()),
    });
    setIsModalOpen(false);
    setNewTask({ title: '', tags: '', priority: 'Medium' });
  };

  const moveTask = (task: Task) => {
      const statuses: Task['status'][] = ['Backlog', 'To Do', 'In Progress', 'Done'];
      const currentIndex = statuses.indexOf(task.status);
      const nextStatus = statuses[currentIndex + 1];
      if (nextStatus) {
          db.tasks.update(task.id, { status: nextStatus });
          refreshTasks();
      }
  };

  const renderColumn = (status: Task['status'], title: string) => {
      const columnTasks = tasks.filter(t => t.status === status);
      return (
        <div className="w-80 flex-shrink-0 flex flex-col h-full max-h-full bg-[#f0f4f6]/50 rounded-xl px-2 py-2">
            <div className="flex items-center justify-between mb-3 px-2 pt-1">
            <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-text-main uppercase tracking-wide">{title}</h3>
                <span className="bg-white text-[#5d7275] text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">{columnTasks.length}</span>
            </div>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 pb-2 flex flex-col gap-3 custom-scrollbar">
                {columnTasks.map(task => (
                    <div key={task.id} onClick={() => moveTask(task)} className="bg-white p-4 rounded-xl shadow-card hover:shadow-card-hover group cursor-pointer transition-all border border-transparent hover:border-primary/20">
                    <div className="flex justify-between items-start mb-2">
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{task.priority}</span>
                    </div>
                    <h4 className="text-text-main font-bold text-sm leading-snug mb-3">{task.title}</h4>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                        <div className="flex gap-1">
                            {task.tags.map(tag => <span key={tag} className="text-[10px] bg-slate-100 px-1 rounded text-slate-500">{tag}</span>)}
                        </div>
                        {status !== 'Done' && <span className="text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">Move &rarr;</span>}
                    </div>
                </div>
                ))}
            </div>
        </div>
      );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="h-16 border-b border-[#e7f1f3] px-6 flex items-center justify-between bg-[#f8fbfc] shrink-0">
         <div className="flex items-center w-full max-w-md">
            <div className="relative w-full group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sub group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                </span>
                <input className="w-full h-10 pl-10 pr-4 bg-white border border-[#e7f1f3] rounded-lg text-sm focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder-[#9db3b8]" placeholder="Search tasks..." type="text"/>
            </div>
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
            {renderColumn('Done', 'Done')}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Task">
         <form onSubmit={handleAddTask} className="space-y-4">
             <div>
                 <label className="block text-sm font-medium text-gray-700">Task Title</label>
                 <input required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} />
             </div>
             <div>
                 <label className="block text-sm font-medium text-gray-700">Priority</label>
                 <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})}>
                     <option>Low</option>
                     <option>Medium</option>
                     <option>High</option>
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