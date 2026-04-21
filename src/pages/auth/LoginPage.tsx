import React, { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import LightRays from '../../components/LightRays'; // Adjust path if needed
import { NoiseBackground } from "@/components/ui/noise-background";
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, isLoggingIn, loginError } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    login({ email, password });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 overflow-hidden">
      
      {/* BACKGROUND EFFECT */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={3}
          lightSpread={1}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
          className="opacity-100" // Soften the rays for background use
        />
      </div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Team Tasks</h1>
            <p className="text-slate-400">Internal Team Management Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {loginError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm text-center">
                Invalid email or password. Please try again.
              </div>
            )}

            <div className="space-y-2">
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

            <div className="space-y-2">
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
              containerClassName="relative overflow-hidden rounded-xl"
              gradientColors={[
                "rgb(255, 100, 150)",
                "rgb(100, 150, 255)",
                "rgb(255, 200, 100)",
              ]}
            >
              <div className="relative z-10 w-full">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="group relative w-full h-12 overflow-hidden rounded-lg p-px
                            disabled:opacity-50 disabled:cursor-not-allowed"
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
                    {isLoggingIn ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 animate-spin text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </span>
                </button>

              </div>
            </NoiseBackground>

          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-slate-500 uppercase tracking-widest">
            Company Property &bull; Team Only
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;