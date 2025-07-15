import React from 'react';
import contactBg from "../assets/images/contactBg.png"
import contactUsBg from "../assets/images/contactUsBg.png"
import { useState } from 'react';
import {
  validateHomeContactForm,
  getFieldError
} from "../../lib/validation.js";
import axios from 'axios';

const ContactForm = ({ 
  topMargin = "mt-76", 
  topPadding = "pt-28",
  backgroundImage = contactBg,
  backgroundSize = "contain",
  height = "min-h-[1360px]"
}) => {

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Validate form
    const validation = validateHomeContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

  axios.post('http://localhost/im-2-project/api/feedbacks/create', formData)
  .then(() => {
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    console.log("Form submitted:", formData);
    setErrors([]);
    
    // Hide success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  })
  .catch((error) => {
    console.error("Error submitting form:", error);
    setErrors([
      {
        field: "general",
        message: "Failed to send message. Please try again.",
      },
    ]);
  })
  .finally(() => {
    setIsSubmitting(false);
  });
};

  return (
    <>
      <section

        className={`bg-cover bg-center bg-no-repeat w-full overflow-hidden ${height}`}
        style={{ backgroundImage: `url(${contactUsBg})`,
        backgroundSize: backgroundSize
       }}
      >
        <div className={`relative ${topMargin} mx-32 z-10`}>
          <div className="grid gap-8 grid-cols-2 items-start">
            {/* Contact Info */}
            <div className={`text-white order-1 w-full pl-24 ${topPadding}`}>
              <p className="text-lg font-alegreya-sans-sc font-bold text-cbvt-light-blue uppercase tracking-[8px] mb-6">
                Contact us
              </p>

              <h3 className="text-8xl font-khand font-bold text-cbvt-navy capitalize leading-none mb-16">
                Get in touch
              </h3>

              <div className="space-y-12">
                {/* Location */}
                <div className="flex items-center space-x-4">
                  <svg
                    width="20"
                    height="27"
                    viewBox="0 0 26 35"
                    fill="none"
                    className="mt-1 md:mt-2 flex-shrink-0 md:w-[26px] md:h-[35px]"
                  >
                    <path
                      d="M12.9253 0.453369C5.77328 0.453369 0 6.22665 0 13.3786C0 21.9955 12.9253 34.9207 12.9253 34.9207C12.9253 34.9207 25.8505 21.9955 25.8505 13.3786C25.8505 6.22665 20.0772 0.453369 12.9253 0.453369ZM12.9253 4.76179C17.7076 4.76179 21.5421 8.63937 21.5421 13.3786C21.5421 18.161 17.7076 21.9955 12.9253 21.9955C8.186 21.9955 4.30842 18.161 4.30842 13.3786C4.30842 8.63937 8.186 4.76179 12.9253 4.76179Z"
                      fill="#0F2851"
                    />
                  </svg>
                  <p className="text-xl font-carme text-cbvt-navy capitalize leading-relaxed">
                    President Magsaysay Villa Aurora Kasambagan, Cebu City
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4">
                  <svg
                    width="25"
                    height="19"
                    viewBox="0 0 33 25"
                    fill="none"
                    className="mt-2 md:mt-4 flex-shrink-0 md:w-[33px] md:h-[25px]"
                  >
                    <path
                      d="M0.73584 0.590942V4.55339L16.5856 12.4783L32.4354 4.55339V0.590942H0.73584ZM0.73584 8.51584V24.3656H32.4354V8.51584L16.5856 16.4407L0.73584 8.51584Z"
                      fill="#0F2851"
                    />
                  </svg>
                  <p className="text-xl font-carme text-cbvt-navy">
                    cebubestvaluetradingcorp@yahoo.com.ph
                  </p>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <svg
                    width="19"
                    height="30"
                    viewBox="0 0 25 39"
                    fill="none"
                    className="mt-1 md:mt-2 flex-shrink-0 md:w-[25px] md:h-[39px]"
                  >
                    <path
                      d="M1.63385 0.717773C1.11395 0.717773 0.73584 1.09588 0.73584 1.61579V37.6781C0.73584 38.198 1.11395 38.5761 1.63385 38.5761H23.517C24.0369 38.5761 24.415 38.198 24.415 37.6781V1.61579C24.415 1.09588 24.0369 0.717773 23.517 0.717773L1.63385 0.717773ZM5.46223 5.44416H19.6414V29.0761H5.46223V5.44416ZM12.5518 31.4393C13.8752 31.4393 14.915 32.4791 14.915 33.8025C14.915 35.1259 13.8752 36.1657 12.5518 36.1657C11.2284 36.1657 10.1886 35.1259 10.1886 33.8025C10.1886 32.4791 11.2284 31.4393 12.5518 31.4393Z"
                      fill="#0F2851"
                    />
                  </svg>
                  <p className="text-xl font-carme text-cbvt-navy capitalize">
                    (032) 342-8743
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-cbvt-navy rounded-[30px] md:rounded-[57px] p-6 md:p-12 relative overflow-hidden order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-cbvt-navy/90 to-cbvt-navy opacity-90"></div>

              <div className="relative z-10">
                <h4 className="text-2xl md:text-3xl lg:text-[48px] font-khand font-bold text-cbvt-cream text-center capitalize leading-tight mb-4">
                  You have a question?
                </h4>

                <p className="text-base md:text-lg lg:text-[20px] font-carme text-white text-center mb-8 md:mb-12">
                  Feel free to drop a message down below!
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Success Message */}
                  {submitSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-full text-center">
                      <span className="font-carme text-sm md:text-base">
                        ✅ Message sent successfully! We'll get back to you
                        soon.
                      </span>
                    </div>
                  )}

                  {/* General Error */}
                  {getFieldError(errors, "general") && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-full text-center">
                      <span className="font-carme text-sm md:text-base">
                        {getFieldError(errors, "general")}
                      </span>
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 md:px-6 py-3 md:py-4 rounded-full text-base md:text-lg lg:text-[24px] font-carme text-cbvt-gray placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 transition-all ${getFieldError(errors, "name")
                          ? "ring-2 ring-red-400 bg-red-50"
                          : "focus:ring-cbvt-blue"
                        }`}
                    />
                    {getFieldError(errors, "name") && (
                      <p className="text-red-600 text-sm font-carme mt-2 ml-4">
                        {getFieldError(errors, "name")}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 md:px-6 py-3 md:py-4 rounded-full text-base md:text-lg lg:text-[24px] font-carme text-cbvt-gray placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 transition-all ${getFieldError(errors, "email")
                          ? "ring-2 ring-red-400 bg-red-50"
                          : "focus:ring-cbvt-blue"
                        }`}
                    />
                    {getFieldError(errors, "email") && (
                      <p className="text-red-600 text-sm font-carme mt-2 ml-4">
                        {getFieldError(errors, "email")}
                      </p>
                    )}
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="your message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 md:px-6 py-3 md:py-4 rounded-[22px] text-base md:text-lg lg:text-[24px] font-carme text-cbvt-gray placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 resize-none transition-all ${getFieldError(errors, "message")
                          ? "ring-2 ring-red-400 bg-red-50"
                          : "focus:ring-cbvt-blue"
                        }`}
                    />
                    {getFieldError(errors, "message") && (
                      <p className="text-red-600 text-sm font-carme mt-2 ml-4">
                        {getFieldError(errors, "message")}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 md:py-4 rounded-full text-base md:text-lg lg:text-[24px] font-alegreya-sans-sc font-bold capitalize transition-all ${isSubmitting
                        ? "bg-cbvt-gray text-white cursor-not-allowed"
                        : "bg-cbvt-light-blue text-white hover:bg-opacity-90 hover:shadow-lg transform hover:scale-105"
                      }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send a message"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactForm