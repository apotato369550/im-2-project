import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  validateOrderForm,
  getFieldError,
  formatPhoneNumber,
} from "../../lib/validation.js";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    serviceUnit: "",
    concernDetails: "",
  });
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Check if we came from a specific unit request or service selection
  const requestedUnit = searchParams.get("unit");
  const requestedService = searchParams.get("service");
  const isUnitRequest = !!requestedUnit;
  const isServiceRequest = !!requestedService;

  useEffect(() => {
    if (requestedUnit) {
      setFormData((prev) => ({
        ...prev,
        serviceUnit: requestedUnit,
      }));
    } else if (requestedService) {
      setFormData((prev) => ({
        ...prev,
        serviceUnit: requestedService,
      }));
    }
  }, [requestedUnit, requestedService]);

  const handleInputChange = (
    e
  ) => {
    const { name, value } = e.target;

    // Special handling for phone number formatting
    if (name === "phoneNumber") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear field error when user starts typing
    if (errors.length > 0) {
      setErrors((prev) => prev.filter((error) => error.field !== name));
    }
  };

  const handlePhoneBlur = () => {
    // Format phone number when user leaves the field
    if (formData.phoneNumber) {
      const formatted = formatPhoneNumber(formData.phoneNumber);
      setFormData((prev) => ({
        ...prev,
        phoneNumber: formatted,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Validate form
    const validation = validateOrderForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);

      // Scroll to first error
      const firstErrorField = validation.errors[0]?.field;
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", formData);
      setSubmitSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        serviceUnit: requestedUnit || requestedService || "",
        concernDetails: "",
      });
      setErrors([]);

      // Hide success message after 7 seconds
      setTimeout(() => setSubmitSuccess(false), 7000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors([
        {
          field: "general",
          message: "Failed to submit form. Please try again.",
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="text-lg md:text-2xl lg:text-[41px] font-khand font-bold text-cbvt-navy capitalize">
              Cebu Best Value Trading
            </h1>
          </Link>
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/about"
              className="text-[21px] font-alegreya-sans-sc text-cbvt-navy capitalize hover:text-cbvt-blue transition-colors"
            >
              about
            </Link>
            <span className="text-[21px] font-alegreya-sans-sc text-cbvt-navy capitalize">
              Contact us
            </span>
            <Link
              to="/catalog"
              className="text-[21px] font-alegreya-sans-sc text-cbvt-navy capitalize hover:text-cbvt-blue transition-colors"
            >
              catalog
            </Link>
            <Link
              to="/login"
              className="bg-cbvt-navy text-white px-6 py-2 rounded-full text-[21px] font-alegreya-sans-sc capitalize hover:bg-opacity-90 transition-all inline-block"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 py-4">
        <p className="text-[16px] font-carme text-black capitalize">
          <Link to="/" className="text-black">
            home
          </Link>{" "}
          /{" "}
          <span className="text-cbvt-blue">
            {isUnitRequest
              ? "Installation"
              : isServiceRequest
                ? requestedService
                : "Contact"}
          </span>
        </p>
      </div>

      {/* Page Title */}
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-alegreya-sans-sc font-bold text-cbvt-navy capitalize">
          Order Form
        </h1>
      </div>

      {/* Order Form */}
      <div className="container mx-auto px-4 md:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 md:p-12">
            {/* Success Message */}
            {submitSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-2xl mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">✅</span>
                  <h3 className="font-alegreya-sans-sc font-bold text-lg">
                    Order Submitted Successfully!
                  </h3>
                </div>
                <p className="font-carme">
                  Thank you for your order. Our team will review your request
                  and contact you within 24 hours to confirm the details and
                  schedule your service.
                </p>
              </div>
            )}

            {/* General Error */}
            {getFieldError(errors, "general") && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-2xl mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">❌</span>
                  <h3 className="font-alegreya-sans-sc font-bold text-lg">
                    Submission Failed
                  </h3>
                </div>
                <p className="font-carme">{getFieldError(errors, "general")}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* General Information Section */}
              <div>
                <h2 className="text-xl md:text-2xl font-alegreya-sans-sc font-bold text-cbvt-navy uppercase tracking-wide mb-6">
                  General Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-alegreya-sans-sc font-bold text-cbvt-blue uppercase tracking-wide mb-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Juan Aloydo"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full h-12 px-4 rounded-lg text-base font-carme text-cbvt-navy placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 transition-all ${
                        getFieldError(errors, "fullName")
                          ? "bg-red-50 ring-2 ring-red-400"
                          : "bg-gray-100 focus:ring-cbvt-blue"
                      }`}
                    />
                    {getFieldError(errors, "fullName") && (
                      <p className="text-red-600 text-sm font-carme mt-1">
                        {getFieldError(errors, "fullName")}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-alegreya-sans-sc font-bold text-cbvt-blue uppercase tracking-wide mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="juanaloydo@yahoo.com.ph"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full h-12 px-4 rounded-lg text-base font-carme text-cbvt-navy placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 transition-all ${
                        getFieldError(errors, "email")
                          ? "bg-red-50 ring-2 ring-red-400"
                          : "bg-gray-100 focus:ring-cbvt-blue"
                      }`}
                    />
                    {getFieldError(errors, "email") && (
                      <p className="text-red-600 text-sm font-carme mt-1">
                        {getFieldError(errors, "email")}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-alegreya-sans-sc font-bold text-cbvt-blue uppercase tracking-wide mb-2"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="+63 912 345 6789"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      onBlur={handlePhoneBlur}
                      className={`w-full h-12 px-4 rounded-lg text-base font-carme text-cbvt-navy placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 transition-all ${
                        getFieldError(errors, "phoneNumber")
                          ? "bg-red-50 ring-2 ring-red-400"
                          : "bg-gray-100 focus:ring-cbvt-blue"
                      }`}
                    />
                    {getFieldError(errors, "phoneNumber") && (
                      <p className="text-red-600 text-sm font-carme mt-1">
                        {getFieldError(errors, "phoneNumber")}
                      </p>
                    )}
                    <p className="text-cbvt-gray text-xs font-carme mt-1">
                      Enter your Philippine mobile number (e.g., 09123456789 or
                      +63 912 345 6789)
                    </p>
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-alegreya-sans-sc font-bold text-cbvt-blue uppercase tracking-wide mb-2"
                    >
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="123 Main Street, Barangay, Cebu City"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full h-12 px-4 rounded-lg text-base font-carme text-cbvt-navy placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 transition-all ${
                        getFieldError(errors, "address")
                          ? "bg-red-50 ring-2 ring-red-400"
                          : "bg-gray-100 focus:ring-cbvt-blue"
                      }`}
                    />
                    {getFieldError(errors, "address") && (
                      <p className="text-red-600 text-sm font-carme mt-1">
                        {getFieldError(errors, "address")}
                      </p>
                    )}
                    <p className="text-cbvt-gray text-xs font-carme mt-1">
                      Please provide complete address including barangay and
                      city
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Information Section */}
              <div>
                <h2 className="text-xl md:text-2xl font-alegreya-sans-sc font-bold text-cbvt-navy uppercase tracking-wide mb-6">
                  Service Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Service/Unit */}
                  <div>
                    <label
                      htmlFor="serviceUnit"
                      className="block text-sm font-alegreya-sans-sc font-bold text-cbvt-blue uppercase tracking-wide mb-2"
                    >
                      Service/Unit <span className="text-red-500">*</span>
                    </label>
                    {isUnitRequest ? (
                      <>
                        <input
                          type="text"
                          id="serviceUnit"
                          name="serviceUnit"
                          value={formData.serviceUnit}
                          onChange={handleInputChange}
                          readOnly
                          className="w-full h-12 px-4 bg-cbvt-cream rounded-lg text-base font-carme text-cbvt-navy border-0 focus:outline-none cursor-not-allowed"
                        />
                        <p className="text-cbvt-gray text-xs font-carme mt-1">
                          Product selected from catalog
                        </p>
                      </>
                    ) : (
                      <>
                        <select
                          id="serviceUnit"
                          name="serviceUnit"
                          value={formData.serviceUnit}
                          onChange={handleInputChange}
                          className={`w-full h-12 px-4 rounded-lg text-base font-carme text-cbvt-navy border-0 focus:outline-none focus:ring-2 appearance-none cursor-pointer transition-all ${
                            getFieldError(errors, "serviceUnit")
                              ? "bg-red-50 ring-2 ring-red-400"
                              : "bg-gray-100 focus:ring-cbvt-blue"
                          }`}
                        >
                          <option value="">Select Service</option>
                          <option value="Installation">Installation</option>
                          <option value="Repair">Repair</option>
                        </select>
                        {getFieldError(errors, "serviceUnit") && (
                          <p className="text-red-600 text-sm font-carme mt-1">
                            {getFieldError(errors, "serviceUnit")}
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  {/* Concern/Details */}
                  <div className="md:col-span-1">
                    <label
                      htmlFor="concernDetails"
                      className="block text-sm font-alegreya-sans-sc font-bold text-cbvt-blue uppercase tracking-wide mb-2"
                    >
                      Concern/Details
                      <span className="text-cbvt-gray font-normal text-xs ml-2">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      id="concernDetails"
                      name="concernDetails"
                      placeholder="Please describe your specific needs or concerns... (optional but recommended)"
                      value={formData.concernDetails}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg text-base font-carme text-cbvt-navy placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 resize-none transition-all ${
                        getFieldError(errors, "concernDetails")
                          ? "bg-red-50 ring-2 ring-red-400"
                          : "bg-gray-100 focus:ring-cbvt-blue"
                      }`}
                    />
                    {getFieldError(errors, "concernDetails") && (
                      <p className="text-red-600 text-sm font-carme mt-1">
                        {getFieldError(errors, "concernDetails")}
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-cbvt-gray text-xs font-carme">
                        Help us serve you better by providing details about your
                        needs
                      </p>
                      <p className="text-cbvt-gray text-xs font-carme">
                        {formData.concernDetails.length}/1000
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-12 py-4 rounded-full text-lg font-alegreya-sans-sc font-bold uppercase tracking-wide transition-all shadow-lg ${
                    isSubmitting
                      ? "bg-cbvt-gray text-white cursor-not-allowed"
                      : "bg-cbvt-navy hover:bg-cbvt-navy/90 text-white hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                      Processing Order...
                    </span>
                  ) : (
                    "Submit Form"
                  )}
                </button>
              </div>

              {/* Form Requirements Note */}
              <div className="text-center pt-4">
                <p className="text-cbvt-gray text-sm font-carme">
                  <span className="text-red-500">*</span> Required fields. We'll
                  contact you within 24 hours to confirm your order.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-cbvt-navy py-4">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-[19px] font-carme text-cbvt-light">
            © 2025 Cebu Best Value Trading. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
