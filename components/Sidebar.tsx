import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { db, AccessLevel } from '../utils/db';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = db.auth.getCurrentRole();

  // Define permissions matrix: Maps routes to allowed roles
  const permissions: Record<string, AccessLevel[]> = {
      '/dashboard': ['Admin', 'Developer', 'HR-Admin', 'User'],
      '/employees': ['Admin', 'HR-Admin'], // Restricted to Admin & HR
      '/projects': ['Admin', 'Developer', 'User'], // HR typically doesn't manage dev tasks
      '/tickets': ['Admin', 'Developer'], // Support tickets for dev/admin
      '/attendance': ['Admin', 'HR-Admin', 'Developer', 'User'], // Everyone needs attendance
      '/payroll': ['Admin', 'HR-Admin'], // Highly sensitive
      '/chat': ['Admin', 'Developer', 'HR-Admin', 'User'], // Communication for all
      '/leave': ['Admin', 'Developer', 'HR-Admin', 'User'], // Everyone needs leave
      '/invoices': ['Admin', 'Developer', 'User'] // Invoices for freelancers/contractors/clients
  };

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { name: 'Employees', icon: 'group', path: '/employees' },
    { name: 'Projects', icon: 'view_kanban', path: '/projects' },
    { name: 'Tickets', icon: 'confirmation_number', path: '/tickets' },
    { name: 'Attendance', icon: 'calendar_month', path: '/attendance' },
    { name: 'My Leave', icon: 'flight_takeoff', path: '/leave' },
    { name: 'Payroll', icon: 'payments', path: '/payroll' },
    { name: 'Invoices', icon: 'receipt_long', path: '/invoices' },
    { name: 'Chat', icon: 'chat', path: '/chat' },
  ];

  // Filter navigation items based on the current user's role
  const filteredNavItems = navItems.filter(item => 
      permissions[item.path]?.includes(role)
  );

  const handleLogout = () => {
      db.auth.logout();
      navigate('/login');
  };

  // Simulate dynamic user profile based on role for the sidebar footer
  const getSimulatedUserProfile = () => {
      switch(role) {
          case 'Admin': return { name: 'Sarah Jenkins', title: 'Product Manager', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ArRu2R3vywdS3aeEMrtEo_BQqowScYWF2cMLzPVK9wD3ocT7QOvHecAjd4IwJL4RE8UDbRXsTtozhYvprTPIQmS3weD2-UUOGpTs-EbRV8fDVFL3zDx6W6NEYonrl5_aaNloMH8LjHUBE2jWzynFrTkLISryqMVxrDJorkJLsPgsies5FfPosn-jNe4GNy8_3knEAH4SDITLc83FjH-wNy33MD3U1MfRsS860P-44MfjT7BLtKP6Q8WxJDvHg2E8Rwp-BjzRjX12' };
          case 'HR-Admin': return { name: 'Michael Chen', title: 'HR Manager', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUWsGzWNA2wE8O5vRbgeGp5_JFHcj6UoyXrirzMCIUqjW54EB2Io2rEjReGH6grlLHdRZmJXf1mIgRr1K7z4P0mu_kj_9sxNr39wh7zkm8JQu07vKGhsZ6EtHLsWWaluNOiOfwp79-mOucmtE3bujZ-xwWUFFpDXC1Nq8f66OzOvK9p8Hr9_MZWE2Ap-QPcFYkw26iZhKY6GG58Ak-EXy-hlGNKLnU3cSIN5cGTlCuzwhCXKyOwtFRty1ieBa7O5OGzWxFxI5wqrew' };
          case 'Developer': return { name: 'Alex Rivera', title: 'Senior Developer', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0qSHpJfpr1JQJVywh6-Dp1uuqU10lbuVaaDoiOuD6NWQg_e0vFCNJnQEQ5ucEGnjnh8IN4gmBeKggd7MOzl8rKEfffX0UmKsKFCG84ScMvq0zAIBlVi5Z0el29xQ916_Z47LOenGwbWmbJ38RGivBwnZwaGjQUMzj66ohV9Zc9at3w-MbA8TsTc8jyDoV65TAreiz8YyzXk50KcDrZfff2xDFNUp58x-KzY2bER_dG-NLXzntyNPySynlRf40AhWB-h_YsMEmeiIJ' };
          default: return { name: 'Jessica Wu', title: 'Marketing Associate', avatar: 'https://ui-avatars.com/api/?name=Jessica+Wu&background=random' };
      }
  };

  const user = getSimulatedUserProfile();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-surface-light border-r border-[#e7f1f3] h-full flex-shrink-0 z-20">
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">grid_view</span>
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight text-text-main">WorkFlow Pro</h1>
            <p className="text-xs text-text-sub font-medium">Enterprise Workspace</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {filteredNavItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-[#5d7275] hover:bg-[#f0f4f6] hover:text-text-main font-medium'
                }`
              }
            >
              <span
                className={`material-symbols-outlined text-[22px] transition-transform group-hover:scale-105 ${
                  isActive ? 'fill-current' : ''
                }`}
              >
                {item.icon}
              </span>
              <span className="text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#e7f1f3] mt-auto">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white border border-[#e7f1f3] shadow-sm">
          <div
            className="size-9 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url("${user.avatar}")`,
            }}
          ></div>
          <div className="flex flex-col overflow-hidden min-w-0">
            <p className="text-sm font-bold truncate text-text-main">{user.name}</p>
            <p className="text-xs text-text-sub truncate">{user.title}</p>
          </div>
          <button onClick={handleLogout} className="ml-auto text-text-sub hover:text-primary" title="Logout">
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;