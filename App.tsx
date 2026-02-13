import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Kanban from './pages/Kanban';
import Tickets from './pages/Tickets';
import Attendance from './pages/Attendance';
import Chat from './pages/Chat';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetail from './pages/EmployeeDetail';
import Payroll from './pages/Payroll';
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import Leave from './pages/Leave';
import Invoices from './pages/Invoices';
import Sidebar from './components/Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Pages that don't need the sidebar
  const isPublicPage = ['/login', '/', '/about', '/contact'].includes(location.pathname);

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden">
        {children}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Kanban />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;