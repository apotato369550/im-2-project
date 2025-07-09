import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Brands from "../components/Brands";
import Contact from "../components/Contact";
 
import React from "react"; 

const Home = () => {
  return (
    <>
    <div className="overflow-hidden">
      <Navbar/>
      <Hero/>
      <Services/>
      <Brands/>
      <Contact/>
    </div>  
      
    </>
  );
};

export default Home;