import React from 'react';
import PublicNavbar from '../components/PublicNavbar';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-display text-text-main">
      <PublicNavbar />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Our Story</span>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">Empowering Teams Everywhere</h1>
                <p className="text-xl text-gray-500 leading-relaxed">
                    We believe that productivity tools should be intuitive, powerful, and accessible. 
                    WorkFlow Pro was built to bridge the gap between complex enterprise software and modern design.
                </p>
            </div>
            
            {/* Values/Mission Grid */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                <div className="relative">
                     <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-3 scale-95"></div>
                     <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070" className="relative rounded-2xl shadow-xl z-10" alt="Team meeting" />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        To simplify the complexities of modern work. We provide a unified platform where teams can manage projects, 
                        track attendance, and handle payroll without switching between a dozen different apps.
                    </p>
                    <div className="grid grid-cols-2 gap-6 mt-8">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <h3 className="text-4xl font-extrabold text-primary mb-1">500+</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Companies</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <h3 className="text-4xl font-extrabold text-primary mb-1">10k+</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Users</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Team Section */}
            <div className="bg-gray-50 -mx-6 px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Meet the Leadership</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah Jenkins", role: "CEO & Founder", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3ArRu2R3vywdS3aeEMrtEo_BQqowScYWF2cMLzPVK9wD3ocT7QOvHecAjd4IwJL4RE8UDbRXsTtozhYvprTPIQmS3weD2-UUOGpTs-EbRV8fDVFL3zDx6W6NEYonrl5_aaNloMH8LjHUBE2jWzynFrTkLISryqMVxrDJorkJLsPgsies5FfPosn-jNe4GNy8_3knEAH4SDITLc83FjH-wNy33MD3U1MfRsS860P-44MfjT7BLtKP6Q8WxJDvHg2E8Rwp-BjzRjX12" },
                            { name: "Michael Chen", role: "CTO", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUWsGzWNA2wE8O5vRbgeGp5_JFHcj6UoyXrirzMCIUqjW54EB2Io2rEjReGH6grlLHdRZmJXf1mIgRr1K7z4P0mu_kj_9sxNr39wh7zkm8JQu07vKGhsZ6EtHLsWWaluNOiOfwp79-mOucmtE3bujZ-xwWUFFpDXC1Nq8f66OzOvK9p8Hr9_MZWE2Ap-QPcFYkw26iZhKY6GG58Ak-EXy-hlGNKLnU3cSIN5cGTlCuzwhCXKyOwtFRty1ieBa7O5OGzWxFxI5wqrew" },
                            { name: "Emily Davis", role: "Head of Product", img: "https://ui-avatars.com/api/?name=Emily+Davis&background=random" }
                        ].map((member, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center group hover:-translate-y-1 transition-transform">
                                <div className="relative mb-4 inline-block">
                                    <img src={member.img} alt={member.name} className="size-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                                <p className="text-primary font-medium text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        
        {/* Footer (Simplified) */}
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
            </div>
        </footer>
      </div>
    </div>
  );
};

export default About;