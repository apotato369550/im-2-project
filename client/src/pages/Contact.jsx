import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadCrumbs from "../components/BreadCrumbs";
import ContactForm from "../components/ContactForm";
import contactUsBg from "../assets/images/contactUsBg.png";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  validateOrderForm,
  getFieldError,
  formatPhoneNumber,
} from "../../lib/validation.js";

// export default function Contact() {
//   const [searchParams] = useSearchParams();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     address: "",
//     serviceUnit: "",
//     concernDetails: "",
//   });
//   const [errors, setErrors] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   // Check if we came from a specific unit request or service selection
//   const requestedUnit = searchParams.get("unit");
//   const requestedService = searchParams.get("service");
//   const isUnitRequest = !!requestedUnit;
//   const isServiceRequest = !!requestedService;

//   useEffect(() => {
//     if (requestedUnit) {
//       setFormData((prev) => ({
//         ...prev,
//         serviceUnit: requestedUnit,
//       }));
//     } else if (requestedService) {
//       setFormData((prev) => ({
//         ...prev,
//         serviceUnit: requestedService,
//       }));
//     }
//   }, [requestedUnit, requestedService]);

//   const handleInputChange = (
//     e
//   ) => {
//     const { name, value } = e.target;

//     // Special handling for phone number formatting
//     if (name === "phoneNumber") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }

//     // Clear field error when user starts typing
//     if (errors.length > 0) {
//       setErrors((prev) => prev.filter((error) => error.field !== name));
//     }
//   };

//   const handlePhoneBlur = () => {
//     // Format phone number when user leaves the field
//     if (formData.phoneNumber) {
//       const formatted = formatPhoneNumber(formData.phoneNumber);
//       setFormData((prev) => ({
//         ...prev,
//         phoneNumber: formatted,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitSuccess(false);

//     // Validate form
//     const validation = validateOrderForm(formData);

//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       setIsSubmitting(false);

//       // Scroll to first error
//       const firstErrorField = validation.errors[0]?.field;
//       if (firstErrorField) {
//         const element = document.getElementById(firstErrorField);
//         element?.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//       return;
//     }

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       console.log("Form submitted:", formData);
//       setSubmitSuccess(true);
//       setFormData({
//         fullName: "",
//         email: "",
//         phoneNumber: "",
//         address: "",
//         serviceUnit: requestedUnit || requestedService || "",
//         concernDetails: "",
//       });
//       setErrors([]);

//       // Hide success message after 7 seconds
//       setTimeout(() => setSubmitSuccess(false), 7000);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setErrors([
//         {
//           field: "general",
//           message: "Failed to submit form. Please try again.",
//         },
//       ]);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

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