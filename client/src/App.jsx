import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import About from "./pages/About.jsx";
import Catalog from "./pages/Catalog.jsx";
import Dashboard from "./pages/manager/Dashboard.jsx";
import Workers from "./pages/manager/Workers.jsx";
import Users from "./pages/manager/Users.jsx";
import Assignment from "./pages/manager/Assignment.jsx";
import Orders from "./pages/manager/Orders.jsx";
import Inventory from "./pages/manager/Inventory.jsx";
import WorkerDashboard from "./pages/worker/WorkerDashboard.jsx";
import WorkerAssignments from "./pages/worker/WorkerAssignments.jsx";
import Tasks from "./pages/worker/Tasks.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import OrderForm from "./pages/OrderForm.jsx";
import { ForgetPasswordTestingSpace, ChangePasswordTestingSpace } from './testing/AssignmentCreationTestingSpace.jsx'
import ClientDashboard from "./pages/ClientDashboard.jsx";

import PrivateRoute from "./security/PrivateRoute";

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/clientdashboard" element={<ClientDashboard/>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/order-form" element={<OrderForm />} />
      <Route path="/forget-password" element={<ForgetPasswordTestingSpace />} />
      <Route path="/reset-password" element={<ChangePasswordTestingSpace />} /> */

        
      {/* Manager Routes */}
      <Route element={<PrivateRoute allowedRoles={['manager']} />}>
        <Route path="/manager/dashboard" element={<Dashboard />} />
        <Route path="/manager/workers" element={<Workers />} />
        <Route path="/manager/inventory" element={<Inventory />} />
        <Route path="/manager/users" element={<Users />} />
        <Route path="/manager/assignment" element={<Assignment />} />
        <Route path="/manager/orders" element={<Orders />} />
      </Route>
      {/* Worker Routes */}

        
      <Route element={<PrivateRoute allowedRoles={['worker']} />}>
        <Route path="/worker/dashboard" element={<WorkerDashboard />} />
        <Route path="/worker/assignments" element={<WorkerAssignments />} />
        <Route path="/worker/tasks" element={<Tasks />} />
      {/* Worker Routes */}
      <Route element={<PrivateRoute allowedRoles={['worker']} />}>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
      </Routes>

    </Routes>
  </BrowserRouter>
);

export default App;