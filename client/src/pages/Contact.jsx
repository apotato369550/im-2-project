import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

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

  // Check if we came from a specific unit request
  const requestedUnit = searchParams.get("unit");
  const isUnitRequest = !!requestedUnit;

  useEffect(() => {
    if (requestedUnit) {
      setFormData((prev) => ({
        ...prev,
        serviceUnit: requestedUnit,
      }));
    }
  }, [requestedUnit]);

  const handleInputChange = (
    e,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Form submitted successfully! We will contact you soon.");
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
            {isUnitRequest ? "Installation" : "Contact"}
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
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Juan Aloydo"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 px-4 bg-gray-100 rounded-lg text-base font-carme text-cbvt-navy placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-alegreya-sans-sc font-bold text-cbvt-blue uppercase tracking-wide mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="juanaloydo@yahoo.com.ph"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 px-4 bg-gray-100 rounded-lg text-base font-carme text-cbvt-navy placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                    />
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
                      required
                      className="w-full h-12 px-4 bg-gray-100 rounded-lg text-base font-carme text-cbvt-navy placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                    />
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
                      placeholder="123 Main Street, Cebu City"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 px-4 bg-gray-100 rounded-lg text-base font-carme text-cbvt-navy placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                    />
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
                      Service/Unit
                    </label>
                    {isUnitRequest ? (
                      <input
                        type="text"
                        id="serviceUnit"
                        name="serviceUnit"
                        value={formData.serviceUnit}
                        onChange={handleInputChange}
                        readOnly
                        className="w-full h-12 px-4 bg-cbvt-cream rounded-lg text-base font-carme text-cbvt-navy border-0 focus:outline-none cursor-not-allowed"
                      />
                    ) : (
                      <select
                        id="serviceUnit"
                        name="serviceUnit"
                        value={formData.serviceUnit}
                        onChange={handleInputChange}
                        required
                        className="w-full h-12 px-4 bg-gray-100 rounded-lg text-base font-carme text-cbvt-navy border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue appearance-none cursor-pointer"
                      >
                        <option value="">Select Service</option>
                        <option value="Installation">Installation</option>
                        <option value="Repair">Repair</option>
                      </select>
                    )}
                  </div>

                  {/* Concern/Details */}
                  <div className="md:col-span-1">
                    <label
                      htmlFor="concernDetails"
                      className="block text-sm font-alegreya-sans-sc font-bold text-cbvt-blue uppercase tracking-wide mb-2"
                    >
                      Concern/Details
                    </label>
                    <textarea
                      id="concernDetails"
                      name="concernDetails"
                      placeholder="Please describe your specific needs or concerns..."
                      value={formData.concernDetails}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg text-base font-carme text-cbvt-navy placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="bg-cbvt-navy hover:bg-cbvt-navy/90 text-white px-12 py-4 rounded-full text-lg font-alegreya-sans-sc font-bold uppercase tracking-wide transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Submit Form
                </button>
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
