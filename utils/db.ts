import { v4 as uuidv4 } from 'uuid';

// Types
export type AccessLevel = 'Admin' | 'Developer' | 'HR-Admin' | 'User';

export interface Employee {
  id: string;
  name: string;
  role: string; // Job Title
  accessLevel: AccessLevel; // Permission Role
  department: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  joinedDate: string;
  location: string;
  socials?: {
      linkedin?: string;
      twitter?: string;
      github?: string;
  };
}

export interface Task {
  id: string;
  title: string;
  status: 'Backlog' | 'To Do' | 'In Progress' | 'In Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  assigneeId?: string;
  comments: number;
  tags: string[];
  dueDate?: string;
  blockedBy?: string; // ID of the task that must be completed first
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
  location?: {
      lat: number;
      lng: number;
      address?: string;
  };
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

export interface LeaveRequest {
    id: string;
    employeeId: string;
    employeeName: string;
    type: 'Sick' | 'Casual' | 'Vacation';
    startDate: string;
    endDate: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    days: number;
}

export interface Holiday {
    id: string;
    name: string;
    date: string;
    type: 'National' | 'Observance';
}

export interface Invoice {
    id: string;
    invoiceNo: string;
    date: string;
    client: string;
    amount: number;
    status: 'Paid' | 'Pending' | 'Overdue';
}

export interface Meeting {
    id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    attendees: string[]; // employee IDs
    type: 'Video' | 'Audio' | 'In-Person';
    link?: string;
}

export interface Post {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    image?: string;
    type: 'Announcement' | 'Celebration' | 'General';
    timestamp: string;
    likes: number;
    comments: number;
}

// Seed Data
const seedData = () => {
  const employees: Employee[] = [
    {
      id: '1',
      name: 'Sarah Jenkins',
      role: 'Product Manager',
      accessLevel: 'Admin',
      department: 'Product',
      email: 'sarah.j@workflow.pro',
      phone: '+1 (555) 123-4567',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ArRu2R3vywdS3aeEMrtEo_BQqowScYWF2cMLzPVK9wD3ocT7QOvHecAjd4IwJL4RE8UDbRXsTtozhYvprTPIQmS3weD2-UUOGpTs-EbRV8fDVFL3zDx6W6NEYonrl5_aaNloMH8LjHUBE2jWzynFrTkLISryqMVxrDJorkJLsPgsies5FfPosn-jNe4GNy8_3knEAH4SDITLc83FjH-wNy33MD3U1MfRsS860P-44MfjT7BLtKP6Q8WxJDvHg2E8Rwp-BjzRjX12',
      status: 'Active',
      joinedDate: '2021-08-15',
      location: 'San Francisco, CA',
      socials: { linkedin: 'sarahjenkins', twitter: 'sjenkins_pm' }
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'HR Manager',
      accessLevel: 'HR-Admin',
      department: 'Human Resources',
      email: 'm.chen@workflow.pro',
      phone: '+1 (555) 987-6543',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUWsGzWNA2wE8O5vRbgeGp5_JFHcj6UoyXrirzMCIUqjW54EB2Io2rEjReGH6grlLHdRZmJXf1mIgRr1K7z4P0mu_kj_9sxNr39wh7zkm8JQu07vKGhsZ6EtHLsWWaluNOiOfwp79-mOucmtE3bujZ-xwWUFFpDXC1Nq8f66OzOvK9p8Hr9_MZWE2Ap-QPcFYkw26iZhKY6GG58Ak-EXy-hlGNKLnU3cSIN5cGTlCuzwhCXKyOwtFRty1ieBa7O5OGzWxFxI5wqrew',
      status: 'On Leave',
      joinedDate: '2020-03-10',
      location: 'New York, NY',
      socials: { linkedin: 'michaelchenhr' }
    },
    {
      id: '3',
      name: 'Alex Rivera',
      role: 'Senior Developer',
      accessLevel: 'Developer',
      department: 'Engineering',
      email: 'alex.r@workflow.pro',
      phone: '+1 (555) 456-7890',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0qSHpJfpr1JQJVywh6-Dp1uuqU10lbuVaaDoiOuD6NWQg_e0vFCNJnQEQ5ucEGnjnh8IN4gmBeKggd7MOzl8rKEfffX0UmKsKFCG84ScMvq0zAIBlVi5Z0el29xQ916_Z47LOenGwbWmbJ38RGivBwnZwaGjQUMzj66ohV9Zc9at3w-MbA8TsTc8jyDoV65TAreiz8YyzXk50KcDrZfff2xDFNUp58x-KzY2bER_dG-NLXzntyNPySynlRf40AhWB-h_YsMEmeiIJ',
      status: 'Active',
      joinedDate: '2022-01-20',
      location: 'Remote',
      socials: { github: 'arivera', twitter: 'alexcodes' }
    },
    {
      id: '4',
      name: 'Jessica Wu',
      role: 'Marketing Associate',
      accessLevel: 'User',
      department: 'Marketing',
      email: 'j.wu@workflow.pro',
      phone: '+1 (555) 333-2222',
      avatar: 'https://ui-avatars.com/api/?name=Jessica+Wu&background=random',
      status: 'Active',
      joinedDate: '2023-05-12',
      location: 'San Francisco, CA',
      socials: { linkedin: 'jessicawu_mkt' }
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
      assigneeId: '1',
      dueDate: '2023-10-30'
    },
    {
      id: 't2',
      title: 'Fix navigation bug on mobile responsiveness',
      status: 'To Do',
      priority: 'High',
      tags: ['Bug'],
      comments: 3,
      assigneeId: '3',
      dueDate: '2023-10-25',
      blockedBy: 't1' // Example dependency
    },
    {
      id: 't3',
      title: 'Frontend React Setup & Component Library',
      status: 'In Progress',
      priority: 'Medium',
      tags: ['Dev'],
      comments: 6,
      assigneeId: '3',
      dueDate: '2023-11-01'
    },
    {
        id: 't4',
        title: 'Project Kickoff Meeting',
        status: 'Done',
        priority: 'Medium',
        tags: ['Meeting'],
        comments: 1,
        dueDate: '2023-10-10'
    },
    {
        id: 't5',
        title: 'API Integration for Payment Gateway',
        status: 'In Review',
        priority: 'High',
        tags: ['Backend'],
        comments: 2,
        assigneeId: '3',
        dueDate: '2023-10-28'
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

  const leaveRequests: LeaveRequest[] = [
      {
          id: 'l1',
          employeeId: '1',
          employeeName: 'Sarah Jenkins',
          type: 'Sick',
          startDate: '2023-10-24',
          endDate: '2023-10-26',
          reason: 'Flu',
          status: 'Approved',
          days: 3
      },
      {
          id: 'l2',
          employeeId: '3',
          employeeName: 'Alex Rivera',
          type: 'Vacation',
          startDate: '2023-11-15',
          endDate: '2023-11-20',
          reason: 'Family trip',
          status: 'Pending',
          days: 5
      }
  ];

  const holidays: Holiday[] = [
      { id: 'h1', name: 'Thanksgiving', date: '2023-11-23', type: 'National' },
      { id: 'h2', name: 'Christmas Day', date: '2023-12-25', type: 'National' },
      { id: 'h3', name: 'New Year', date: '2024-01-01', type: 'National' }
  ];

  const invoices: Invoice[] = [
      { id: 'i1', invoiceNo: 'INV-2023-001', date: '2023-10-15', client: 'Acme Corp', amount: 4500, status: 'Paid' },
      { id: 'i2', invoiceNo: 'INV-2023-002', date: '2023-10-20', client: 'Stark Ind', amount: 2100, status: 'Pending' }
  ];

  const meetings: Meeting[] = [
      { 
          id: 'mt1', 
          title: 'Q4 Product Roadmap Review', 
          date: '2023-10-25', 
          startTime: '10:00', 
          endTime: '11:00', 
          attendees: ['1', '3', '4'], 
          type: 'Video' 
      },
      { 
          id: 'mt2', 
          title: 'Weekly Standup', 
          date: '2023-10-26', 
          startTime: '09:00', 
          endTime: '09:30', 
          attendees: ['1', '2', '3', '4'], 
          type: 'Audio' 
      }
  ];

  const posts: Post[] = [
      {
          id: 'po1',
          authorId: '1',
          authorName: 'Sarah Jenkins',
          authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ArRu2R3vywdS3aeEMrtEo_BQqowScYWF2cMLzPVK9wD3ocT7QOvHecAjd4IwJL4RE8UDbRXsTtozhYvprTPIQmS3weD2-UUOGpTs-EbRV8fDVFL3zDx6W6NEYonrl5_aaNloMH8LjHUBE2jWzynFrTkLISryqMVxrDJorkJLsPgsies5FfPosn-jNe4GNy8_3knEAH4SDITLc83FjH-wNy33MD3U1MfRsS860P-44MfjT7BLtKP6Q8WxJDvHg2E8Rwp-BjzRjX12',
          content: 'Huge shoutout to @AlexRivera for shipping the new mobile dashboard ahead of schedule! 🚀',
          type: 'Celebration',
          timestamp: '2 hours ago',
          likes: 12,
          comments: 4
      },
      {
          id: 'po2',
          authorId: '2',
          authorName: 'Michael Chen',
          authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUWsGzWNA2wE8O5vRbgeGp5_JFHcj6UoyXrirzMCIUqjW54EB2Io2rEjReGH6grlLHdRZmJXf1mIgRr1K7z4P0mu_kj_9sxNr39wh7zkm8JQu07vKGhsZ6EtHLsWWaluNOiOfwp79-mOucmtE3bujZ-xwWUFFpDXC1Nq8f66OzOvK9p8Hr9_MZWE2Ap-QPcFYkw26iZhKY6GG58Ak-EXy-hlGNKLnU3cSIN5cGTlCuzwhCXKyOwtFRty1ieBa7O5OGzWxFxI5wqrew',
          content: 'Just a reminder that the office will be closed this Friday for the holiday. Enjoy the long weekend everyone!',
          type: 'Announcement',
          timestamp: '1 day ago',
          likes: 24,
          comments: 0
      }
  ];

  localStorage.setItem('db_employees', JSON.stringify(employees));
  localStorage.setItem('db_tasks', JSON.stringify(tasks));
  localStorage.setItem('db_tickets', JSON.stringify(tickets));
  localStorage.setItem('db_messages', JSON.stringify(messages));
  localStorage.setItem('db_payroll', JSON.stringify(payroll));
  localStorage.setItem('db_leave', JSON.stringify(leaveRequests));
  localStorage.setItem('db_holidays', JSON.stringify(holidays));
  localStorage.setItem('db_invoices', JSON.stringify(invoices));
  localStorage.setItem('db_meetings', JSON.stringify(meetings));
  localStorage.setItem('db_posts', JSON.stringify(posts));
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
  auth: {
      login: (role: AccessLevel) => {
          localStorage.setItem('currentUserRole', role);
      },
      getCurrentRole: (): AccessLevel => {
          return (localStorage.getItem('currentUserRole') as AccessLevel) || 'User';
      },
      logout: () => {
          localStorage.removeItem('currentUserRole');
      }
  },
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
    clockIn: (location?: {lat: number, lng: number}) => {
        const session = {
            startTime: new Date().toISOString(),
            status: 'Active',
            location: location
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
  },
  leave: {
      getAll: () => getCollection<LeaveRequest>('db_leave'),
      add: (request: Omit<LeaveRequest, 'id' | 'status'>) => {
          const list = getCollection<LeaveRequest>('db_leave');
          const newItem = { ...request, id: uuidv4(), status: 'Pending' as const };
          setCollection('db_leave', [...list, newItem]);
          return newItem;
      },
      updateStatus: (id: string, status: 'Approved' | 'Rejected') => {
           const list = getCollection<LeaveRequest>('db_leave');
           const updated = list.map(l => l.id === id ? {...l, status} : l);
           setCollection('db_leave', updated);
      },
      getHolidays: () => getCollection<Holiday>('db_holidays'),
      addHoliday: (holiday: Omit<Holiday, 'id'>) => {
        const list = getCollection<Holiday>('db_holidays');
        const newItem = { ...holiday, id: uuidv4() };
        setCollection('db_holidays', [...list, newItem]);
        return newItem;
      },
      deleteHoliday: (id: string) => {
        const list = getCollection<Holiday>('db_holidays');
        setCollection('db_holidays', list.filter(h => h.id !== id));
      }
  },
  invoices: {
      getAll: () => getCollection<Invoice>('db_invoices'),
      add: (inv: Omit<Invoice, 'id'>) => {
          const list = getCollection<Invoice>('db_invoices');
          const newItem = { ...inv, id: uuidv4() };
          setCollection('db_invoices', [...list, newItem]);
          return newItem;
      }
  },
  meetings: {
      getAll: () => getCollection<Meeting>('db_meetings'),
      add: (meeting: Omit<Meeting, 'id'>) => {
          const list = getCollection<Meeting>('db_meetings');
          const newItem = { ...meeting, id: uuidv4() };
          setCollection('db_meetings', [...list, newItem]);
          return newItem;
      }
  },
  posts: {
      getAll: () => getCollection<Post>('db_posts'),
      add: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'timestamp'>) => {
          const list = getCollection<Post>('db_posts');
          const newItem = { 
              ...post, 
              id: uuidv4(), 
              likes: 0, 
              comments: 0, 
              timestamp: 'Just now' 
          };
          setCollection('db_posts', [newItem, ...list]);
          return newItem;
      }
  }
};