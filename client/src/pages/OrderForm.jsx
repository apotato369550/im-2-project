import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadCrumbs from "../components/BreadCrumbs";

export default function OrderForm() {
  const [userAcc, setUserAcc] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    service_id: "",
    item_id: "",
    concern: "",
    requestedService: "",
  });

  // Get URL parameters
  const requestedUnit = searchParams.get("unit");
  const requestedItemID = searchParams.get("item_id");
  const requestedService = searchParams.get("service");
  
  // Get data from location state (from modal)
  const selectedProduct = location.state?.selectedProduct;
  
  const isUnitRequest = !!requestedUnit || !!selectedProduct;
  const currUser = JSON.parse(localStorage.getItem('user_data'));
  console.log(currUser);


  useEffect(() => {
    // Get user data from localStorage
    if (currUser) {
      setUserAcc(currUser);
      setFormData(prev => ({
      ...prev,
      fullName: currUser.user_full_name,
      email: currUser.user_email,
      }));
    }

    const serviceMap = {
      "Repair": "1",
      "Installation": "2",
      "Retail": "3",
    };

    // Handle retail/catalog requests
    if (requestedService === "Retail" || selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        service_id: serviceMap["Retail"] || "3",
        item_id: requestedItemID || selectedProduct?.item_id || "",
        requestedService: "Retail"
      }));
    } else if (requestedService) {
      // Handle other service requests
      setFormData((prev) => ({
        ...prev,
        service_id: serviceMap[requestedService] || "",
        requestedService: requestedService
      }));
    }
  }, [requestedUnit, requestedItemID, requestedService, selectedProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userAcc) {
      alert("Please Log in First to make an Order");
      navigate("/login");
      return;
    }

    // Create the submission data
    const submissionData = {
      ...formData,
      user_id: userAcc.user_id, // Adjust based on your user object structure
    };

    axios
      .post("http://localhost/im-2-project/api/orders/create", submissionData, {
        headers: {
          Authorization: `Bearer ${userAcc.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        alert("Form submitted successfully! We will contact you soon.");
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Submission error:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  // Generate unit name for display
  const getUnitName = () => {
    if (selectedProduct) {
      return `${selectedProduct.brand} ${selectedProduct.model} - ${selectedProduct.hp || selectedProduct.horsepower} ${selectedProduct.type}`;
    }
    return requestedUnit || "";
  };

  const unitName = getUnitName();

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
                        value={unitName}
                        readOnly
                        className="w-full h-10 px-4 bg-cbvt-cream rounded-full text-base font-carme text-cbvt-navy border-0 focus:outline-none cursor-not-allowed"
                      />
                    ) : (
                      <select
                        id="serviceUnit"
                        name="requestedService"
                        value={formData.requestedService}
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
                      htmlFor="concern"
                      className="block text-xs font-bold uppercase text-cbvt-blue mb-2 tracking-wide"
                    >
                      Concern / Details
                    </label>
                    <textarea
                      id="concern"
                      name="concern"
                      placeholder="Please describe your specific needs or concerns..."
                      value={formData.concern}
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