import { NavLink } from "react-router-dom";
import { MessageSquare, ShieldAlert, TrendingUp, Infinity, Activity, Moon, Briefcase } from "lucide-react";

const Sidebar = () => {
  const links = [
    { name: "Future Me", icon: MessageSquare, path: "/app" },
    { name: "Toxic Check", icon: ShieldAlert, path: "/app/toxic" },
    { name: "Life Predict", icon: TrendingUp, path: "/app/life" },
    { name: "Scenarios", icon: Infinity, path: "/app/scenario" },
    { name: "Reality check", icon: Activity, path: "/app/reality" },
    { name: "Dream Analyzer", icon: Moon, path: "/app/dream" },
    { name: "Career Path", icon: Briefcase, path: "/app/career" },
  ];

  return (
    <aside className="w-20 md:w-64 h-full bg-white border-r border-slate-200 flex flex-col transition-all duration-300 z-20 shrink-0 shadow-sm pt-4 md:pt-0">
      <nav className="flex-1 w-full flex flex-col gap-2 p-3 md:p-4 mt-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `w-full flex items-center justify-center md:justify-start gap-4 px-4 py-3 border border-transparent rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold border-blue-100 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
              }`}
            >
              <Icon size={20} className="shrink-0" />
              <span className="hidden md:block">{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-6 w-full hidden md:flex items-center gap-3 border-t border-slate-100">
        <div className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">System Ready</span>
      </div>
    </aside>
  );
};
export default Sidebar;
