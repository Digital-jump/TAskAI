import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-display text-text-main scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
               <span className="material-symbols-outlined text-2xl">grid_view</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">WorkFlow Pro</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About Us</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30"
          >
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 bg-gradient-to-b from-white to-background-light">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/20">
                 <span className="flex size-2 rounded-full bg-primary animate-pulse"></span>
                 v2.0 is now live
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
                 Manage your team <br/>
                 <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">with confidence.</span>
              </h1>
              <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed font-medium">
                 The all-in-one platform for project management, HR, payroll, and team collaboration. Built for modern enterprises to scale efficiently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <button onClick={() => navigate('/login')} className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all transform hover:-translate-y-1">
                    Get Started Free
                 </button>
                 <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white text-text-main border border-gray-200 font-bold rounded-xl hover:bg-gray-50 transition-all">
                    Learn More
                 </button>
              </div>
              <div className="mt-10 flex items-center gap-4 text-sm text-gray-400 font-medium">
                  <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                          <div key={i} className="size-9 rounded-full bg-gray-200 border-2 border-white bg-cover bg-center" style={{backgroundImage: `url('https://i.pravatar.cc/100?img=${i + 10}')`}}></div>
                      ))}
                  </div>
                  <p>Trusted by 500+ companies worldwide</p>
              </div>
           </div>
           <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl transform rotate-3 scale-95 blur-3xl -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                alt="Dashboard Preview" 
                className="rounded-2xl shadow-2xl border border-gray-200/50 w-full object-cover h-[400px] lg:h-[500px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block animate-bounce" style={{animationDuration: '3s'}}>
                  <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <span className="material-symbols-outlined">trending_up</span>
                      </div>
                      <div>
                          <p className="text-xs text-gray-500 font-bold uppercase">Productivity</p>
                          <p className="text-lg font-bold text-text-main">+24% Increase</p>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white px-6">
         <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Features</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-text-main">Why WorkFlow Pro?</h3>
                <p className="text-gray-500 text-lg">We integrate every aspect of your business into a single, intuitive interface so you can focus on what matters most.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                   { icon: 'groups', title: 'HR Management', desc: 'Complete employee profiles, attendance tracking, and leave management in one place.' },
                   { icon: 'payments', title: 'Payroll Processing', desc: 'Automated payroll calculation with tax deductions, bonuses, and instant reporting.' },
                   { icon: 'view_kanban', title: 'Project Tracking', desc: 'Kanban boards, task assignments, and real-time updates to keep your team aligned.' }
               ].map((item, i) => (
                   <div key={i} className="bg-background-light p-8 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all group cursor-default">
                       <div className="size-14 rounded-xl bg-white shadow-sm text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                           <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                       </div>
                       <h3 className="text-xl font-bold mb-3 text-text-main">{item.title}</h3>
                       <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                   </div>
               ))}
            </div>
         </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-text-main text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-full blur-3xl pointer-events-none"></div>
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
             <div>
                 <span className="text-primary font-bold tracking-widest uppercase text-sm">Contact Us</span>
                 <h2 className="text-4xl font-extrabold mb-6 mt-2">Let's start a conversation</h2>
                 <p className="text-gray-400 mb-10 text-lg max-w-md">Have questions about our enterprise plans? Our team is ready to help you optimize your workflow.</p>
                 
                 <div className="space-y-8">
                     <div className="flex items-center gap-5">
                         <div className="size-12 rounded-full bg-white/10 flex items-center justify-center text-primary border border-white/10">
                             <span className="material-symbols-outlined">mail</span>
                         </div>
                         <div>
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</p>
                             <p className="font-bold text-lg">support@workflow.pro</p>
                         </div>
                     </div>
                     <div className="flex items-center gap-5">
                         <div className="size-12 rounded-full bg-white/10 flex items-center justify-center text-primary border border-white/10">
                             <span className="material-symbols-outlined">location_on</span>
                         </div>
                         <div>
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Office</p>
                             <p className="font-bold text-lg">123 Innovation Dr, San Francisco</p>
                         </div>
                     </div>
                     <div className="flex items-center gap-5">
                         <div className="size-12 rounded-full bg-white/10 flex items-center justify-center text-primary border border-white/10">
                             <span className="material-symbols-outlined">call</span>
                         </div>
                         <div>
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</p>
                             <p className="font-bold text-lg">+1 (555) 123-4567</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             <div className="bg-white p-8 rounded-3xl shadow-2xl text-text-main">
                 <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                 <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                     <div className="grid grid-cols-2 gap-4">
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">First Name</label>
                             <input type="text" className="w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-primary transition-colors font-medium" placeholder="John" />
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Last Name</label>
                             <input type="text" className="w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-primary transition-colors font-medium" placeholder="Doe" />
                         </div>
                     </div>
                     <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                         <input type="email" className="w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-primary transition-colors font-medium" placeholder="john@company.com" />
                     </div>
                     <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Message</label>
                         <textarea rows={4} className="w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-primary transition-colors font-medium resize-none" placeholder="Tell us about your team..."></textarea>
                     </div>
                     <button className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                         Send Message
                     </button>
                 </form>
             </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-background-dark text-white py-12 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                 <div className="size-8 rounded bg-primary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-xl">grid_view</span>
                 </div>
                 <span className="font-bold text-lg tracking-tight">WorkFlow Pro</span>
              </div>
              <div className="text-gray-400 text-sm font-medium">
                  © 2023 WorkFlow Pro Inc. All rights reserved.
              </div>
              <div className="flex gap-6 text-gray-400">
                  <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-twitter"></i> Twitter</a>
                  <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-white transition-colors">Instagram</a>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default Landing;