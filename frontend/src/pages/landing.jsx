import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare, ShieldAlert, TrendingUp, Infinity as InfinityIcon, Activity } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Future Me Chat",
      description: "Converse with a projected version of your future self. Get brutally honest advice before you make permanent mistakes.",
      icon: <MessageSquare className="w-8 h-8 text-purple-400" />,
      path: "/app"
    },
    {
      title: "Toxic Detector",
      description: "Paste sketchy texts from your ex or boss. We scan it for manipulation, gaslighting, and passive aggression.",
      icon: <ShieldAlert className="w-8 h-8 text-orange-400" />,
      path: "/app/toxic"
    },
    {
      title: "Life Predictor",
      description: "Input your daily habits, sleep schedule, and skills to mathematically predict your success probability.",
      icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
      path: "/app/life"
    },
    {
      title: "Scenario Generator",
      description: "What if you drop out? What if you move to Dubai? Simulate the realistic consequences of an alternate reality.",
      icon: <InfinityIcon className="w-8 h-8 text-indigo-400" />,
      path: "/app/scenario"
    },
    {
      title: "Reality Check Engine",
      description: "An ego-shattering analysis of your current bank balance, screentime, and delusions of grandeur.",
      icon: <Activity className="w-8 h-8 text-rose-400" />,
      path: "/app/reality"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* BACKGROUND AMBIENCE */}
      <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* VISUO NAVBAR */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-white/10 bg-[#050505]/60 px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">MIDLYF</h1>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-[#111111]/80 border border-white/10 p-1 rounded-full backdrop-blur-xl absolute left-1/2 transform -translate-x-1/2 shadow-2xl">
          <a href="#features" className="px-5 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">Features</a>
          <a href="#stats" className="px-5 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">Statistics</a>
        </nav>

        <div className="flex items-center gap-4">
           {/* Welcome Back (Simulated Login State) */}
           <span className="hidden md:block text-sm font-medium text-gray-400">Welcome back, User</span>
           <button 
             onClick={() => navigate("/app")}
             className="bg-white text-black font-semibold px-6 py-2.5 rounded-full hover:bg-gray-200 transition-all text-sm shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95"
           >
             Enter MIDLYF
           </button>
        </div>
      </motion.header>

      <main className="relative z-10 flex flex-col items-center w-full">
        
        {/* HERO SECTION */}
        <section className="w-full max-w-6xl mx-auto px-6 pt-32 pb-40 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Powered Life Optimization</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-[5rem] font-extrabold tracking-tight text-white mb-8 leading-[1.1] max-w-5xl"
          >
            Enhance your reality control with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400">MIDLYF.ai</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 font-medium leading-relaxed"
          >
            Talk to your future self. Predict your timeline. Analyze toxic behavior. 
            A modern AI platform designed to reduce your delusions and drive better life outcomes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button 
              onClick={() => navigate("/app")}
              className="bg-white text-black font-bold px-10 py-5 rounded-full hover:bg-gray-200 transition-all text-lg shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              Enter MIDLYF 
              <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">→</span>
            </button>
          </motion.div>
        </section>


        {/* FEATURES SECTION (Striking up one by one) */}
        <section id="features" className="w-full max-w-6xl mx-auto px-6 py-24 border-t border-white/5">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              How our platform makes your workflow easier
            </h2>
            <p className="text-gray-400 text-xl font-medium">Select an engine and start analyzing your reality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onClick={() => navigate(feature.path)}
                className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] hover:bg-[#1a1a1a] transition-all cursor-pointer group hover:border-white/20 hover:-translate-y-2 shadow-2xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#050505] border border-white/5 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed text-lg">
                  {feature.description}
                </p>
                <div className="mt-8 flex items-center text-sm font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Launch Engine <span className="ml-2">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* STATISTICS SECTION */}
        <section id="stats" className="w-full bg-[#111111] border-y border-white/5 py-32 mt-20">
          <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-20 text-center">
              The numbers that define our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">success</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full">
              {[
                { label: "Fast-Track Results", value: "10K+", color: "text-white" },
                { label: "Prediction Accuracy", value: "95%", color: "text-purple-400" },
                { label: "Performance Leap", value: "24/7", color: "text-blue-400" },
                { label: "Strategic Advantage", value: "∞", color: "text-emerald-400" }
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className={`text-5xl md:text-7xl font-black tracking-tighter ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* SARCASTIC TESTIMONIAL / CTA */}
        <section className="w-full max-w-4xl mx-auto px-6 py-40 text-center relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif italic text-gray-300 mb-12 leading-relaxed">
              "Visuo transforms financial data. MIDLYF transforms sheer panic into actionable, brutally honest sarcasm so you stop ruining your own life."
            </h2>
            
            <button 
              onClick={() => navigate("/app")}
              className="bg-white text-black font-bold px-10 py-5 rounded-full hover:bg-gray-200 transition-all text-lg shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-105"
            >
              Get Started
            </button>
          </motion.div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/10 bg-[#050505] py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">MIDLYF.ai</span>
          </div>
          
          <div className="text-gray-500 text-sm font-medium">
            © 2026 MIDLYF Systems. Elevating Reality.
          </div>

          <div className="flex gap-6 text-sm font-medium text-gray-400">
            <span className="hover:text-white cursor-pointer transition-colors">About Us</span>
            <span className="hover:text-white cursor-pointer transition-colors">Licensing</span>
            <span className="hover:text-white cursor-pointer transition-colors">Style Guide</span>
          </div>
        </div>
      </footer>

    </div>
  );
}