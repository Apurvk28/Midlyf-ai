import ChatUI from "../components/ChatUI";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          MIDLYF.ai 🚀
        </h1>
        <p className="text-gray-400 text-lg">
          Connect with your future self to navigate your life's path.
        </p>
      </div>

      <ChatUI />
    </div>
  );
};

export default Home;
