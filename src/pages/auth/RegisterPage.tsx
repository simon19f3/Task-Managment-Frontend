import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import LightRays from '../../components/LightRays';
import { NoiseBackground } from "@/components/ui/noise-background";
const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { register, isRegistering, registerError } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 overflow-hidden">
      
      {/* BACKGROUND EFFECT */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={3}
          className="opacity-100"
        />
      </div>

      {/* REGISTER CARD */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Join the Team</h1>
            <p className="text-slate-400">Create your account to start managing tasks</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {registerError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm text-center">
                Registration failed. Please try again.
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder:text-slate-500"
              />
            </div>

            <NoiseBackground
                containerClassName="relative overflow-hidden rounded-xl mt-2"
                gradientColors={[
                    "rgb(255, 100, 150)",
                    "rgb(100, 150, 255)",
                    "rgb(255, 200, 100)",
                ]}
                >
                {/* Content layer (must be above noise) */}
                <div className="relative z-10 w-full p-1">
                    <button
                    type="submit"
                    disabled={isRegistering}
                    className="group relative h-12 w-full overflow-hidden rounded-lg p-[1px]
                                disabled:cursor-not-allowed disabled:opacity-50"
                    >
                    {/* Animated gradient border */}
                    <span
                        className="absolute inset-[-200%] animate-[spin_2s_linear_infinite]
                        bg-[conic-gradient(from_90deg_at_50%_50%,rgb(255,100,150),rgb(100,150,255),rgb(255,200,100),rgb(255,100,150))]"
                    />

                    {/* Button content */}
                    <span
                        className="relative inline-flex h-full w-full items-center justify-center
                                rounded-lg bg-neutral-950 px-6 text-sm font-semibold text-white
                                backdrop-blur-xl transition-colors"
                    >
                        {isRegistering ? "Creating Account..." : "Register"}
                    </span>
                    </button>
                </div>
                </NoiseBackground>

          </form>

          {/* REDIRECT TO LOGIN */}
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-400">Already have an account? </span>
            <Link 
              to="/auth/login" 
              className="text-white font-semibold hover:underline decoration-blue-500 underline-offset-4"
            >
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;