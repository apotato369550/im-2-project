import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import About from "./pages/About.jsx";
import Catalog from "./pages/Catalog.jsx";
import Dashboard from "./pages/manager/Dashboard.jsx";
import Workers from "./pages/manager/Workers.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/manager/dashboard" element={<Dashboard />} />
      <Route path="/manager/workers" element={<Workers />} />
    </Routes>
  </BrowserRouter>
);

export default App;
