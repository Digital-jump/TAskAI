import { v4 as uuidv4 } from 'uuid';

// Types
export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  joinedDate: string;
  location: string;
}

export interface Task {
  id: string;
  title: string;
  status: 'Backlog' | 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  assigneeId?: string;
  comments: number;
  tags: string[];
  dueDate?: string;
}

export interface Ticket {
  id: string;
  ticketId: string;
  title: string;
  description: string;
  status: 'New' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  type: 'Email' | 'Bot' | 'Issue';
  requester: string;
  timestamp: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
}

export interface Message {
  id: string;
  senderId: string; // 'me' for current user
  senderName: string;
  avatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file';
  fileName?: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netPay: number;
  status: 'Draft' | 'Pending' | 'Approved' | 'Paid';
  month: string;
}

// Seed Data
const seedData = () => {
  const employees: Employee[] = [
    {
      id: '1',
      name: 'Sarah Jenkins',
      role: 'Senior Product Designer',
      department: 'Product',
      email: 'sarah.j@workflow.pro',
      phone: '+1 (555) 123-4567',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ArRu2R3vywdS3aeEMrtEo_BQqowScYWF2cMLzPVK9wD3ocT7QOvHecAjd4IwJL4RE8UDbRXsTtozhYvprTPIQmS3weD2-UUOGpTs-EbRV8fDVFL3zDx6W6NEYonrl5_aaNloMH8LjHUBE2jWzynFrTkLISryqMVxrDJorkJLsPgsies5FfPosn-jNe4GNy8_3knEAH4SDITLc83FjH-wNy33MD3U1MfRsS860P-44MfjT7BLtKP6Q8WxJDvHg2E8Rwp-BjzRjX12',
      status: 'Active',
      joinedDate: '2021-08-15',
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Engineering Manager',
      department: 'Engineering',
      email: 'm.chen@workflow.pro',
      phone: '+1 (555) 987-6543',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUWsGzWNA2wE8O5vRbgeGp5_JFHcj6UoyXrirzMCIUqjW54EB2Io2rEjReGH6grlLHdRZmJXf1mIgRr1K7z4P0mu_kj_9sxNr39wh7zkm8JQu07vKGhsZ6EtHLsWWaluNOiOfwp79-mOucmtE3bujZ-xwWUFFpDXC1Nq8f66OzOvK9p8Hr9_MZWE2Ap-QPcFYkw26iZhKY6GG58Ak-EXy-hlGNKLnU3cSIN5cGTlCuzwhCXKyOwtFRty1ieBa7O5OGzWxFxI5wqrew',
      status: 'On Leave',
      joinedDate: '2020-03-10',
      location: 'New York, NY'
    },
    {
      id: '3',
      name: 'Alex Rivera',
      role: 'Frontend Developer',
      department: 'Engineering',
      email: 'alex.r@workflow.pro',
      phone: '+1 (555) 456-7890',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0qSHpJfpr1JQJVywh6-Dp1uuqU10lbuVaaDoiOuD6NWQg_e0vFCNJnQEQ5ucEGnjnh8IN4gmBeKggd7MOzl8rKEfffX0UmKsKFCG84ScMvq0zAIBlVi5Z0el29xQ916_Z47LOenGwbWmbJ38RGivBwnZwaGjQUMzj66ohV9Zc9at3w-MbA8TsTc8jyDoV65TAreiz8YyzXk50KcDrZfff2xDFNUp58x-KzY2bER_dG-NLXzntyNPySynlRf40AhWB-h_YsMEmeiIJ',
      status: 'Active',
      joinedDate: '2022-01-20',
      location: 'Remote'
    }
  ];

  const tasks: Task[] = [
    {
      id: 't1',
      title: 'Competitor analysis for mobile navigation patterns',
      status: 'Backlog',
      priority: 'Low',
      tags: ['Research'],
      comments: 0,
      assigneeId: '1'
    },
    {
      id: 't2',
      title: 'Fix navigation bug on mobile responsiveness',
      status: 'To Do',
      priority: 'High',
      tags: ['Bug'],
      comments: 3,
      assigneeId: '3',
      dueDate: 'Today'
    },
    {
      id: 't3',
      title: 'Frontend React Setup & Component Library',
      status: 'In Progress',
      priority: 'Medium',
      tags: ['Dev'],
      comments: 6,
      assigneeId: '3'
    },
    {
        id: 't4',
        title: 'Project Kickoff Meeting',
        status: 'Done',
        priority: 'Medium',
        tags: ['Meeting'],
        comments: 1,
        dueDate: 'Oct 10'
    }
  ];

  const tickets: Ticket[] = [
    {
      id: 'tk1',
      ticketId: 'T-420',
      title: 'Cannot reset password on staging environment',
      description: 'User reporting 500 error when clicking the reset link sent via email.',
      status: 'New',
      priority: 'Medium',
      type: 'Email',
      requester: 'internal',
      timestamp: '2m ago'
    },
    {
      id: 'tk2',
      ticketId: 'T-419',
      title: 'Sentry Alert: Unhandled Exception in Billing Service',
      description: 'Null reference exception in payment gateway handler.',
      status: 'New',
      priority: 'Critical',
      type: 'Bot',
      requester: 'System',
      timestamp: '15m ago'
    },
     {
      id: 'tk3',
      ticketId: 'T-355',
      title: 'Update copyright year in footer',
      description: 'Simple text change request.',
      status: 'In Progress',
      priority: 'Low',
      type: 'Issue',
      requester: 'Marketing',
      timestamp: '1h ago'
    }
  ];

  const messages: Message[] = [
    {
      id: 'm1',
      senderId: '2',
      senderName: 'Michael Chen',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUWsGzWNA2wE8O5vRbgeGp5_JFHcj6UoyXrirzMCIUqjW54EB2Io2rEjReGH6grlLHdRZmJXf1mIgRr1K7z4P0mu_kj_9sxNr39wh7zkm8JQu07vKGhsZ6EtHLsWWaluNOiOfwp79-mOucmtE3bujZ-xwWUFFpDXC1Nq8f66OzOvK9p8Hr9_MZWE2Ap-QPcFYkw26iZhKY6GG58Ak-EXy-hlGNKLnU3cSIN5cGTlCuzwhCXKyOwtFRty1ieBa7O5OGzWxFxI5wqrew',
      content: 'Hey everyone, just uploaded the Q3 financials for review. Please take a look before the call at 2 PM.',
      timestamp: '10:42 AM',
      type: 'text'
    },
    {
        id: 'm2',
        senderId: '2',
        senderName: 'Michael Chen',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUWsGzWNA2wE8O5vRbgeGp5_JFHcj6UoyXrirzMCIUqjW54EB2Io2rEjReGH6grlLHdRZmJXf1mIgRr1K7z4P0mu_kj_9sxNr39wh7zkm8JQu07vKGhsZ6EtHLsWWaluNOiOfwp79-mOucmtE3bujZ-xwWUFFpDXC1Nq8f66OzOvK9p8Hr9_MZWE2Ap-QPcFYkw26iZhKY6GG58Ak-EXy-hlGNKLnU3cSIN5cGTlCuzwhCXKyOwtFRty1ieBa7O5OGzWxFxI5wqrew',
        content: '',
        timestamp: '10:42 AM',
        type: 'file',
        fileName: 'Q3_Financials_Draft.pdf'
    },
    {
      id: 'm3',
      senderId: 'me',
      senderName: 'Me',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ArRu2R3vywdS3aeEMrtEo_BQqowScYWF2cMLzPVK9wD3ocT7QOvHecAjd4IwJL4RE8UDbRXsTtozhYvprTPIQmS3weD2-UUOGpTs-EbRV8fDVFL3zDx6W6NEYonrl5_aaNloMH8LjHUBE2jWzynFrTkLISryqMVxrDJorkJLsPgsies5FfPosn-jNe4GNy8_3knEAH4SDITLc83FjH-wNy33MD3U1MfRsS860P-44MfjT7BLtKP6Q8WxJDvHg2E8Rwp-BjzRjX12',
      content: "Thanks Michael! I'll review these right now. Did we account for the marketing spend in September?",
      timestamp: '10:45 AM',
      type: 'text'
    }
  ];
  
  const payroll: PayrollRecord[] = [
       {
          id: 'p1',
          employeeId: '1',
          baseSalary: 5000,
          bonus: 200,
          deductions: 800,
          netPay: 4400,
          status: 'Draft',
          month: 'October 2023'
       },
       {
          id: 'p2',
          employeeId: '2',
          baseSalary: 6200,
          bonus: 0,
          deductions: 1100,
          netPay: 5100,
          status: 'Approved',
          month: 'October 2023'
       }
  ];

  localStorage.setItem('db_employees', JSON.stringify(employees));
  localStorage.setItem('db_tasks', JSON.stringify(tasks));
  localStorage.setItem('db_tickets', JSON.stringify(tickets));
  localStorage.setItem('db_messages', JSON.stringify(messages));
  localStorage.setItem('db_payroll', JSON.stringify(payroll));
  localStorage.setItem('db_initialized', 'true');
};

const getCollection = <T>(key: string): T[] => {
  if (!localStorage.getItem('db_initialized')) seedData();
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setCollection = (key: string, data: any[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const db = {
  employees: {
    getAll: () => getCollection<Employee>('db_employees'),
    get: (id: string) => getCollection<Employee>('db_employees').find(e => e.id === id),
    add: (employee: Omit<Employee, 'id'>) => {
        const list = getCollection<Employee>('db_employees');
        const newItem = { ...employee, id: uuidv4() };
        setCollection('db_employees', [...list, newItem]);
        return newItem;
    },
    update: (id: string, updates: Partial<Employee>) => {
        const list = getCollection<Employee>('db_employees');
        const updated = list.map(item => item.id === id ? { ...item, ...updates } : item);
        setCollection('db_employees', updated);
    }
  },
  tasks: {
    getAll: () => getCollection<Task>('db_tasks'),
    add: (task: Omit<Task, 'id' | 'comments'>) => {
        const list = getCollection<Task>('db_tasks');
        const newItem = { ...task, id: uuidv4(), comments: 0 };
        setCollection('db_tasks', [...list, newItem]);
        return newItem;
    },
    update: (id: string, updates: Partial<Task>) => {
        const list = getCollection<Task>('db_tasks');
        const updated = list.map(item => item.id === id ? { ...item, ...updates } : item);
        setCollection('db_tasks', updated);
    },
    delete: (id: string) => {
        const list = getCollection<Task>('db_tasks');
        setCollection('db_tasks', list.filter(t => t.id !== id));
    }
  },
  tickets: {
    getAll: () => getCollection<Ticket>('db_tickets'),
  },
  messages: {
    getAll: () => getCollection<Message>('db_messages'),
    add: (msg: Omit<Message, 'id' | 'timestamp'>) => {
        const list = getCollection<Message>('db_messages');
        const newItem = { 
            ...msg, 
            id: uuidv4(), 
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        };
        setCollection('db_messages', [...list, newItem]);
        return newItem;
    }
  },
  attendance: {
    getSession: () => {
        const session = localStorage.getItem('db_attendance_session');
        return session ? JSON.parse(session) : null;
    },
    clockIn: () => {
        const session = {
            startTime: new Date().toISOString(),
            status: 'Active'
        };
        localStorage.setItem('db_attendance_session', JSON.stringify(session));
        return session;
    },
    clockOut: () => {
        localStorage.removeItem('db_attendance_session');
    }
  },
  payroll: {
    getAll: () => getCollection<PayrollRecord>('db_payroll'),
    generate: () => {
        const employees = getCollection<Employee>('db_employees');
        const currentPayroll = getCollection<PayrollRecord>('db_payroll');
        // Only generate if not exists for this month roughly
        const newRecords = employees.map(emp => ({
            id: uuidv4(),
            employeeId: emp.id,
            baseSalary: 5000 + Math.floor(Math.random() * 2000),
            bonus: Math.floor(Math.random() * 500),
            deductions: 800 + Math.floor(Math.random() * 200),
            netPay: 0, // Calculated below
            status: 'Draft' as const,
            month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
        })).map(r => ({...r, netPay: r.baseSalary + r.bonus - r.deductions}));
        
        // Simple append for demo
        setCollection('db_payroll', [...currentPayroll, ...newRecords]);
        return newRecords;
    }
  }
};