import { NavLink, Outlet } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Layout = () => {
  const links = [
    { name: "Chat", path: "/" },
    { name: "Toxicity", path: "/toxic" },
    { name: "Predictor", path: "/life" },
    { name: "Scenarios", path: "/scenario" },
    { name: "Reality", path: "/reality" },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-hidden relative">
      {/* Visuo Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Visuo Sticky Navbar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-white/10 bg-[#050505]/40 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">MIDLYF</h1>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-[#111111]/80 border border-white/10 p-1 rounded-full backdrop-blur-xl absolute left-1/2 transform -translate-x-1/2 shadow-2xl">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center">
           <button className="hidden md:block bg-white text-black font-semibold px-6 py-2.5 rounded-full hover:bg-gray-200 transition-all text-sm shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95">
             Get Started
           </button>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 overflow-hidden relative z-10 flex flex-col items-center">
         <Outlet />
      </main>
    </div>
  );
};
export default Layout;
