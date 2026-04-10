import { Home, Stethoscope, Settings, User, IdCardLanyard } from "lucide-react";
import { NavLink } from "react-router-dom";


const navItems = [
  { to: "/home", icon: Home },
  { to: "/doctors", icon: Stethoscope },
  { to: "/settings", icon: Settings },
  { to: "/profile", icon: User},
  { to: "/my-tokens", icon: IdCardLanyard},
];

export default function BottomNav() {

  return (
    <>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
        <div className="flex items-center justify-between px-11 py-3 bg-white shadow-lg border border-gray-200">
          {navItems.map(({ to, icon: Icon }, index) => (
            <NavLink key={index} to={to}>
              {({ isActive }) => (
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all
                  ${isActive ? "bg-gray-200" : ""}`}
                >
                  <Icon
                    className={`w-5.5 h-5.5 transition-colors
                    ${isActive ? "text-gray-700" : "text-gray-400"}`}
                  />
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      
    </>
  );
}