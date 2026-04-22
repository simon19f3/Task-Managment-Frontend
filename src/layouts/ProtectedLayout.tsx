import { useAuth } from '@/features/auth/hooks/useAuth';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '@/shared/components/Navbar';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { 
  IconBrandTabler, 
  IconUserBolt, 
  IconSettings, 
  IconArrowLeft 
} from "@tabler/icons-react";
import { useState } from "react";
import { Logo, LogoIcon } from '@/shared/components/Sidebar';

const ProtectedLayout = () => {
  const { user, logout: logoutContext } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // 1. Handle Logout Logic
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to "/logout"
    logoutContext();    // Clears tokens/user state
    navigate('/auth/login'); // Redirect to login
  };
  
   const mainHref = user?.role === 'admin' ? '/admin' : '/dashboard';
  // const label = user?.role === 'admin' ? 'Admin Panel' : 'Dashboard';
  
  const links = [
    { label: "Dashboard", href: mainHref, icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-text-secondary" /> },
    { label: "Profile", href: "/profile", icon: <IconUserBolt className="h-5 w-5 shrink-0 text-text-secondary" /> },
    { label: "Settings", href: "/settings", icon: <IconSettings className="h-5 w-5 shrink-0 text-text-secondary" /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-background text-text-primary transition-colors duration-300">
      
      {/* 1. TOP NAVBAR - Passing real user data from context */}
      <Navbar userName={user?.name || "User"} avatarUrl={undefined} />

      {/* 2. BODY SECTION: 
          Responsive Change: Use 'flex-col' for mobile and 'md:flex-row' for desktop 
      */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 border-r border-card-border">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
                
                {/* 1. LOGOUT LINK - Integrated with onClick */}
                <div onClick={handleLogout}>
                   <SidebarLink 
                    link={{ 
                      label: "Logout", 
                      href: "#", 
                      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-text-secondary" /> 
                    }} 
                  />
                </div>
              </div>
            </div>

            {/* User Bottom Section */}
            <div>
              <SidebarLink
                link={{
                  label: user?.name || "Jane Doe",
                  href: "/profile",
                  icon: (
                    <div className="h-7 w-7 rounded-full bg-accent-2 flex items-center justify-center text-[10px] text-white font-bold border border-card-border">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>

        {/* 2. RIGHT MAIN CONTENT AREA 
            Responsive Change: Added 'w-full' and ensured it scrolls independently
        */}
        <main className="flex-1 w-full overflow-y-auto p-4 md:p-8 bg-background/50 relative">
          <div className="mx-auto max-w-7xl h-full">
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;