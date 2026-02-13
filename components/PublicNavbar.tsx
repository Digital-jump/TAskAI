import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PublicNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
             <span className="material-symbols-outlined text-2xl">grid_view</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">WorkFlow Pro</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
          <button onClick={() => navigate('/')} className={`hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary' : ''}`}>Home</button>
          <button onClick={() => navigate('/about')} className={`hover:text-primary transition-colors ${location.pathname === '/about' ? 'text-primary' : ''}`}>About Us</button>
          <button onClick={() => navigate('/contact')} className={`hover:text-primary transition-colors ${location.pathname === '/contact' ? 'text-primary' : ''}`}>Contact</button>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30"
        >
          Log In
        </button>
      </div>
    </nav>
  );
};

export default PublicNavbar;