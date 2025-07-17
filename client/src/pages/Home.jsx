
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Brands from "../components/Brands";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import React, { useEffect } from "react"; 
import contactBg from "../assets/images/contactBg.png"
import { useNavigate } from "react-router-dom";


const Home = () => {
  const userData = JSON.parse(localStorage.getItem('user_data'));
  const navigate = useNavigate();
  useEffect(() => {
    if(userData){
      if(userData.user_type === "worker"){
        navigate("/worker/dashboard");
      }else if(userData.user_type === "manager"){
        navigate("/manager/dashboard");
      }
    }
  }, [])
  


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
