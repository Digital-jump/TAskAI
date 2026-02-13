import React from 'react';
import PublicNavbar from '../components/PublicNavbar';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-display text-text-main">
      <PublicNavbar />
      <div className="pt-20">
         <div className="max-w-7xl mx-auto px-6 py-20">
             <div className="text-center max-w-2xl mx-auto mb-16">
                 <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">Get in Touch</h1>
                 <p className="text-xl text-gray-500 leading-relaxed">
                     Have questions about our enterprise plans? Our team is ready to help you optimize your workflow.
                 </p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                 {/* Contact Info */}
                 <div className="space-y-10">
                     <div className="flex items-start gap-6">
                         <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                             <span className="material-symbols-outlined text-2xl">mail</span>
                         </div>
                         <div>
                             <h3 className="text-lg font-bold text-slate-900 mb-1">Email Us</h3>
                             <p className="text-gray-500 mb-2">For general inquiries and support.</p>
                             <a href="mailto:support@workflow.pro" className="text-primary font-bold hover:underline">support@workflow.pro</a>
                         </div>
                     </div>
                     <div className="flex items-start gap-6">
                         <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                             <span className="material-symbols-outlined text-2xl">location_on</span>
                         </div>
                         <div>
                             <h3 className="text-lg font-bold text-slate-900 mb-1">Our Office</h3>
                             <p className="text-gray-500 mb-2">Come say hello at our HQ.</p>
                             <p className="font-medium text-slate-900">123 Innovation Dr, Suite 400<br/>San Francisco, CA 94103</p>
                         </div>
                     </div>
                     <div className="flex items-start gap-6">
                         <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                             <span className="material-symbols-outlined text-2xl">call</span>
                         </div>
                         <div>
                             <h3 className="text-lg font-bold text-slate-900 mb-1">Phone</h3>
                             <p className="text-gray-500 mb-2">Mon-Fri from 8am to 5pm.</p>
                             <p className="font-medium text-slate-900">+1 (555) 123-4567</p>
                         </div>
                     </div>
                 </div>

                 {/* Form */}
                 <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100">
                     <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                         <div className="grid grid-cols-2 gap-5">
                             <div>
                                 <label className="block text-sm font-bold text-gray-700 mb-1.5">First Name</label>
                                 <input type="text" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-primary transition-colors py-3" placeholder="John" />
                             </div>
                             <div>
                                 <label className="block text-sm font-bold text-gray-700 mb-1.5">Last Name</label>
                                 <input type="text" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-primary transition-colors py-3" placeholder="Doe" />
                             </div>
                         </div>
                         <div>
                             <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                             <input type="email" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-primary transition-colors py-3" placeholder="john@company.com" />
                         </div>
                         <div>
                             <label className="block text-sm font-bold text-gray-700 mb-1.5">Message</label>
                             <textarea rows={4} className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-primary transition-colors py-3 resize-none" placeholder="How can we help you?"></textarea>
                         </div>
                         <button className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                             Send Message
                         </button>
                     </form>
                 </div>
             </div>
         </div>

         {/* Footer */}
        <footer className="bg-background-dark text-white py-12 px-6 border-t border-white/10 mt-auto">
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
            </div>
        </footer>
      </div>
    </div>
  );
};

export default Contact;