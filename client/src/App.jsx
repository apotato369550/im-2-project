import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import About from "./pages/About.jsx";
import Catalog from "./pages/Catalog.jsx";
import Dashboard from "./pages/manager/Dashboard.jsx";
import Workers from "./pages/manager/Workers.jsx";
import Users from "./pages/manager/Users.jsx";
import Assignment from "./pages/manager/Assignment.jsx";
import Orders from "./pages/manager/Orders.jsx";
import WorkerDashboard from "./pages/worker/WorkerDashboard.jsx";
import WorkerAssignments from "./pages/worker/WorkerAssignments.jsx";
import Tasks from "./pages/worker/Tasks.jsx";

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
      <Route path="/manager/users" element={<Users />} />
      <Route path="/manager/assignment" element={<Assignment />} />
      <Route path="/manager/orders" element={<Orders />} />
      <Route path="/worker/dashboard" element={<WorkerDashboard />} />
      <Route path="/worker/assignments" element={<WorkerAssignments />} />
      <Route path="/worker/tasks" element={<Tasks />} />
    </Routes>
  </BrowserRouter>
);

export default App;
