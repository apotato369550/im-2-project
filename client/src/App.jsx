import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import About from "./pages/About.jsx";
import Catalog from "./pages/Catalog.jsx";
import OrderForm from "./pages/OrderForm.jsx";
import Contact from "./pages/Contact.jsx";
import ItemTestingSpace from "./components/ItemTestingSpace.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/order-form" element={<OrderForm />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </BrowserRouter>

    // <ItemTestingSpace/>

);

export default App;