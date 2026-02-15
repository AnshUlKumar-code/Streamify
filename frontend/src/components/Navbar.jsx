import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, LogOutIcon, MenuIcon, ShipWheelIcon, UsersIcon, XIcon } from "lucide-react";
import { useState } from "react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { logoutMutation } = useLogout();

  const navLinks = [
    { to: "/", icon: HomeIcon, label: "Home" },
    { to: "/friends", icon: UsersIcon, label: "Friends" },
    { to: "/notification", icon: BellIcon, label: "Notifications" },
  ];

  return (
    <>
      <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full">
            {/* Left: Hamburger Menu (Mobile Only) */}
            <button
              className="lg:hidden btn btn-ghost btn-circle"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon className="h-6 w-6" />
            </button>

            {/* Center: Logo (Mobile Only) */}
            <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2">
              <Link to="/" className="flex items-center gap-2">
                <ShipWheelIcon className="size-8 text-primary" />
                <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider hidden sm:block">
                  Streamify
                </span>
              </Link>
            </div>

            {/* Spacer for desktop (since logo is in sidebar) */}
            <div className="hidden lg:block" />

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/notification" className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </Link>

              <div className="hidden sm:block">
                <ThemeSelector />
              </div>

              <div className="avatar hidden sm:block">
                <div className="w-9 rounded-full">
                  <img src={authUser?.profilePic} alt="User Avatar" />
                </div>
              </div>

              <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
                <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-64 bg-base-200 border-r border-base-300 flex flex-col">
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-base-300">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <ShipWheelIcon className="size-8 text-primary" />
                <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Streamify
                </span>
              </Link>
              <button 
                className="btn btn-ghost btn-circle btn-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "hover:bg-base-300 text-base-content"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="size-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-base-300">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={authUser?.profilePic} alt={authUser?.fullName} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{authUser?.fullName}</p>
                  <p className="text-xs text-success flex items-center gap-1">
                    <span className="size-2 rounded-full bg-success" />
                    Online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;