import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadCrumbs from "../components/BreadCrumbs";

export default function OrderForm() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    serviceUnit: "",
    concernDetails: "",
  });

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
    } else if (searchParams.get("service")) {
      setFormData((prev) => ({
        ...prev,
        serviceUnit: searchParams.get("service"),
      }));
    }
  }, [requestedUnit, requestedService, searchParams]);

  const handleInputChange = (
    e
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully! We will contact you soon.");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <BreadCrumbs crumb="Order Form" title="Order Form"/>

      {/* Order Form */}
      <div className="container mx-auto px-4 md:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#f6f8fa] rounded-3xl shadow-lg p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold uppercase text-cbvt-navy mb-8 tracking-wide text-shadow-2xs">
                  General Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold uppercase text-cbvt-blue mb-2 tracking-wide"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full h-10 px-4 bg-white rounded-full text-base font-carme text-cbvt-navy border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase text-cbvt-blue mb-2 tracking-wide"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full h-10 px-4 bg-white rounded-full text-base font-carme text-cbvt-navy border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-xs font-bold uppercase text-cbvt-blue mb-2 tracking-wide"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full h-10 px-4 bg-white rounded-full text-base font-carme text-cbvt-navy border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-xs font-bold uppercase text-cbvt-blue mb-2 tracking-wide"
                    >
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full h-10 px-4 bg-white rounded-full text-base font-carme text-cbvt-navy border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold uppercase text-cbvt-navy mb-8 tracking-wide">
                  Service Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="serviceUnit"
                      className="block text-xs font-bold uppercase text-cbvt-blue mb-2 tracking-wide"
                    >
                      Service
                    </label>
                    {isUnitRequest ? (
                      <input
                        type="text"
                        id="serviceUnit"
                        name="serviceUnit"
                        value={formData.serviceUnit}
                        onChange={handleInputChange}
                        readOnly
                        className="w-full h-10 px-4 bg-cbvt-cream rounded-full text-base font-carme text-cbvt-navy border-0 focus:outline-none cursor-not-allowed"
                      />
                    ) : (
                      <select
                        id="serviceUnit"
                        name="serviceUnit"
                        value={formData.serviceUnit}
                        onChange={handleInputChange}
                        required
                        className="w-full h-10 px-4 bg-white rounded-full text-base font-carme text-cbvt-navy border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-cbvt-blue appearance-none cursor-pointer"
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
                      className="block text-xs font-bold uppercase text-cbvt-blue mb-2 tracking-wide"
                    >
                      Concern / Details
                    </label>
                    <textarea
                      id="concernDetails"
                      name="concernDetails"
                      placeholder="Please describe your specific needs or concerns..."
                      value={formData.concernDetails}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white rounded-3xl text-base font-carme text-cbvt-navy border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-cbvt-blue resize-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="bg-cbvt-navy hover:bg-cbvt-navy/90 text-white px-12 py-3 rounded-full text-lg font-bold uppercase tracking-wide transition-all shadow-md w-full hover:scale-105 cursor-pointer"
                >
                  Submit Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 