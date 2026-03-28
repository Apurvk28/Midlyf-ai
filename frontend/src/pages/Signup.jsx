import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { registerCall } from "../services/api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await registerCall(name, email, password);
      login(data);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Email might exist.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Join MIDLYF.ai</h2>
        {error && <div className="bg-red-500/10 text-red-500 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-green-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded transition-colors shadow-lg">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account? <Link to="/login" className="text-green-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
