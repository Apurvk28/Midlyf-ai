import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

// Pages
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Toxic from "./pages/Toxic";
import LifePredict from "./pages/LifePredict";
import Scenario from "./pages/Scenario";
import Reality from "./pages/Reality";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>

        {/* LANDING PAGE */}
        <Route path="/" element={<Landing />} />

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* APP (DASHBOARD WITH LAYOUT) */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="toxic" element={<Toxic />} />
          <Route path="life" element={<LifePredict />} />
          <Route path="scenario" element={<Scenario />} />
          <Route path="reality" element={<Reality />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;