import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { name: 'Employees', icon: 'group', path: '/employees' },
    { name: 'Projects', icon: 'view_kanban', path: '/projects' },
    { name: 'Tickets', icon: 'confirmation_number', path: '/tickets' },
    { name: 'Attendance', icon: 'calendar_month', path: '/attendance' },
    { name: 'Payroll', icon: 'payments', path: '/payroll' },
    { name: 'Chat', icon: 'chat', path: '/chat' },
  ];

  return (
    <aside class="hidden md:flex flex-col w-64 bg-surface-light border-r border-[#e7f1f3] h-full flex-shrink-0 z-20">
      <div class="p-6 pb-2">
        <div class="flex items-center gap-3">
          <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <span class="material-symbols-outlined text-2xl">grid_view</span>
          </div>
          <div>
            <h1 class="text-base font-bold leading-tight text-text-main">WorkFlow Pro</h1>
            <p class="text-xs text-text-sub font-medium">Enterprise Workspace</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {navItems.map((item) => {
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
                class={`material-symbols-outlined text-[22px] transition-transform group-hover:scale-105 ${
                  isActive ? 'fill-current' : ''
                }`}
              >
                {item.icon}
              </span>
              <span class="text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div class="p-4 border-t border-[#e7f1f3] mt-auto">
        <div class="flex items-center gap-3 px-3 py-2 rounded-xl bg-white border border-[#e7f1f3] shadow-sm">
          <div
            class="size-9 rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3ArRu2R3vywdS3aeEMrtEo_BQqowScYWF2cMLzPVK9wD3ocT7QOvHecAjd4IwJL4RE8UDbRXsTtozhYvprTPIQmS3weD2-UUOGpTs-EbRV8fDVFL3zDx6W6NEYonrl5_aaNloMH8LjHUBE2jWzynFrTkLISryqMVxrDJorkJLsPgsies5FfPosn-jNe4GNy8_3knEAH4SDITLc83FjH-wNy33MD3U1MfRsS860P-44MfjT7BLtKP6Q8WxJDvHg2E8Rwp-BjzRjX12")',
            }}
          ></div>
          <div class="flex flex-col overflow-hidden">
            <p class="text-sm font-bold truncate text-text-main">Admin User</p>
            <p class="text-xs text-text-sub truncate">Super Admin</p>
          </div>
          <button class="ml-auto text-text-sub hover:text-primary">
            <span class="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;