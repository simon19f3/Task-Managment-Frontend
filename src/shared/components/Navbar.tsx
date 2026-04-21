import React from 'react';
import { useTheme } from '@/shared/hooks/theme-provider'; // Adjust path based on your file structure

interface NavbarProps {
  userName: string;
  avatarUrl?: string;
}

const Navbar: React.FC<NavbarProps> = ({ userName, avatarUrl }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-card-border bg-card-bg/80 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center font-bold text-sm 
                        bg-input-bg border border-input-border text-text-primary shadow-sm">
            TT
          </div>
          <span className="font-semibold tracking-tight text-text-primary">
            Team Tasks
          </span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="h-9 w-9 rounded-lg flex items-center justify-center border border-input-border 
                       bg-input-bg text-text-primary hover:bg-card-border/30 transition-all cursor-pointer"
          >
            {theme === 'dark' ? (
              /* Sun Icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              /* Moon Icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          {/* USER INFO */}
          <div className="flex items-center gap-3 pl-2 border-l border-card-border">
            <span className="text-sm font-medium hidden sm:block text-text-secondary">
              {userName}
            </span>

            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={userName}
                className="h-9 w-9 rounded-full border border-card-border object-cover"
              />
            ) : (
              <div className="h-9 w-9 rounded-full flex items-center justify-center border border-card-border 
                            bg-background text-text-primary text-xs font-bold shadow-inner">
                {initials}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;