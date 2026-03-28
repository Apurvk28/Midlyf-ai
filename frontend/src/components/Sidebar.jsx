import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MessageSquare, ShieldAlert, TrendingUp, Infinity, Activity, LogOut } from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const links = [
    { name: "Future Me Chat", path: "/", icon: MessageSquare },
    { name: "Toxic Detector", path: "/toxic", icon: ShieldAlert },
    { name: "Life Predictor", path: "/life", icon: TrendingUp },
    { name: "Scenario Gen", path: "/scenario", icon: Infinity },
    { name: "Reality Check", path: "/reality", icon: Activity },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 text-white flex flex-col hidden md:flex">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          MIDLYF.ai
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-gray-800 text-green-400" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 truncate pr-2">{user?.name}</span>
          <button onClick={logout} className="text-red-400 hover:text-red-500 p-2 border border-red-500/20 rounded-md bg-red-500/10">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
