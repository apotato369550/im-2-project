import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadCrumbs from "../components/BreadCrumbs";
import ContactForm from "../components/ContactForm";
import contactUsBg from "../assets/images/contactUsBg.png";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <BreadCrumbs crumb="Contact" title="Contact Us" />
      
      {/* Contact Form Section */}
      <div id="contact">
        <ContactForm 
          topMargin="mt-20" 
          topPadding="pt-8" 
          backgroundImage={contactUsBg}
          backgroundSize="cover"
          height="min-h-[800px]"
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact; 