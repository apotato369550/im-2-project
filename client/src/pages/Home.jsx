
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Brands from "../components/Brands";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import React from "react"; 
import contactBg from "../assets/images/contactBg.png"

const Home = () => {
  return (
    <>
    <div className="overflow-hidden">
      <Navbar/>
      <Hero/>
      <Services/>
      <Brands/>
      <div id="contact">
        <ContactForm 
          height="min-h-[800px]" 
          topMargin="mt-20" 
          topPadding="pt-8"
          backgroundSize="cover"
          backgroundImage={contactBg}
        />
      </div>
      <Footer/>
    </div>  
      
    </>
  );
};

export default Home;
