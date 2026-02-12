import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-display bg-background-light">
      {/* Left Side: Hero Image Section */}
      <div className="hidden md:flex w-full md:w-5/12 lg:w-1/2 relative overflow-hidden bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQHQA3HRPG1PJ5OrVbYgca9K113KnMbKeOEHfGCZTDoyIOJZ7nmwpg89Xb8Y2BE7UNxcz5D1LrHRbA3kfEifORAGvNCZE6aqlo4SW-tcINx6Pi8QlkrpPDDqGROm3Kty6O_a8qDfl80aVLtwX4qI7AhyBNzDPcZOOycp_raq8knuWKfwu7_eNMSthE2zjW3VOwT0_4yVl9U1w_G4ki9fFQtYcmVLJD8m23jLm9nGTXMVAVrHezivp108g7h7GabIkWO5e3qiwgSIxV")',
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(10, 108, 127, 0.85) 0%, rgba(13, 38, 74, 0.7) 100%)',
          }}
        ></div>
        <div className="relative z-10 flex flex-col justify-between h-full p-12 lg:p-16 text-white">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-4xl">work_history</span>
              <h1 className="text-2xl font-bold tracking-tight">WorkFlow Pro</h1>
            </div>
          </div>
          <div className="max-w-md">
            <p className="text-3xl lg:text-4xl font-extrabold leading-tight mb-6">
              Elevate your team's productivity.
            </p>
            <p className="text-lg opacity-90 font-medium">
              Seamlessly manage attendance, payroll, and collaboration in one unified workspace.
            </p>
          </div>
          <div className="text-sm opacity-70">© 2023 WorkFlow Pro Inc.</div>
        </div>
      </div>

      {/* Right Side: Login Form Section */}
      <div className="w-full md:w-7/12 lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3"></div>

        <div className="w-full max-w-[440px] flex flex-col">
          {/* Mobile Header (Logo) */}
          <div className="md:hidden flex items-center gap-2 mb-8 justify-center">
            <span className="material-symbols-outlined text-primary text-3xl">work_history</span>
            <h2 className="text-text-main text-xl font-bold">WorkFlow Pro</h2>
          </div>

          {/* Card Container */}
          <div className="bg-surface-light p-8 md:p-10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-extrabold text-text-main mb-2">
                Log in to your account
              </h2>
              <p className="text-text-sub text-sm">
                Enter your credentials to access your workspace.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-main" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    className="block w-full rounded-lg border-gray-300 bg-white text-text-main shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 placeholder:text-gray-400"
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    defaultValue="admin@workflow.pro"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-main" htmlFor="password">
                  Password
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <input
                    className="block w-full rounded-lg border-gray-300 bg-white text-text-main shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 pr-10 placeholder:text-gray-400"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    defaultValue="password"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-text-main">
                    Keep me logged in
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-primary hover:text-primary-hover underline decoration-transparent hover:decoration-current transition-all"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-lg bg-primary px-3 py-3.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 transform active:scale-[0.99]"
                >
                  Log In
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-text-sub">
                Don't have an account?
                <a
                  href="#"
                  className="font-medium text-primary hover:text-primary-hover ml-1"
                >
                  Contact Admin
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-6 text-xs text-text-sub">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;