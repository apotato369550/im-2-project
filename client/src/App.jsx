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
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

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
      <Route path="/contact" element={<Contact />} />
      {/* added notfound page for when user enters invalid url */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>

      // <ItemTestingSpace/>

);

export default App;