import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import heroFill from "../assets/images/heroFill.png";
import { Mail, KeyRound, Eye, EyeOff, Home as HomeIcon } from "lucide-react";
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost/im-2-project/api/users/login", formData)
      .then((data) => {
        localStorage.setItem("user_data", JSON.stringify(data.data));
        setError('');
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response?.data?.error || "Login failed");
      });
  };

  return (
    <div className="min-h-screen bg-white flex relative">
      <Link
        to="/"
        className="absolute top-6 right-6 z-50 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
        title="Go to Home"
      >
        <HomeIcon size={28} color="#93C5FD" />
      </Link>

      {/* Left Panel */}
      <div className="w-2/5 h-screen relative">
        <div className="bg-transparent relative overflow-hidden h-full shadow-none flex items-end">
          <img src={heroFill} alt="#" className="object-cover w-full h-full rounded-br-[60px] rounded-tr-[60px] shadow-none border-0 outline-none opacity-90" />
          <div className="absolute inset-0 flex flex-col items-end justify-end pb-60">
            <div className="relative w-10 h-10">
              <b className="bg-white h-10 w-10 absolute top-0 left-0 z-0 block"></b>
              <b className="bg-cbvt-sky h-10 w-10 absolute top-0 left-0 z-20 block rounded-br-4xl opacity-90"></b>
            </div>
            <div className="bg-white px-16 py-4 rounded-tl-full rounded-bl-full w-60 flex items-center justify-center">
              <p className="font-alegreya-sans-sc text-cbvt-blue text-3xl font-bold drop-shadow-lg">LOGIN</p>
            </div>
            <div className="relative w-10 h-10">
              <b className="bg-white h-10 w-10 absolute top-0 left-0 z-0 block"></b>
              <b className="bg-cbvt-sky h-10 w-10 absolute top-0 left-0 z-20 block rounded-tr-4xl opacity-90"></b>
            </div>
            <Link to={"/signup"}>
              <div className="px-16 py-4 rounded-tl-full rounded-bl-full w-60 flex items-center justify-center hover:bg-white/20">
                <p className="font-alegreya-sans-sc text-white text-3xl font-bold drop-shadow-lg">Sign-Up</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white/40 via-cbvt-blue/40 to-transparent mix-blend-multiply blur-sm"></div>
      </div>

      {/* Right Panel / Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-khand font-bold text-cbvt-blue text-center capitalize leading-tight">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <input
                type="text"
                name="user_email"
                placeholder="Email"
                value={formData.user_email}
                onChange={handleInputChange}
                className="w-full h-[59px] px-16 py-4 bg-gray-200 rounded-full text-[21px] font-carme text-cbvt-navy placeholder-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
              />
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                <Mail color="gray" size={20} />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="user_password"
                placeholder="Password"
                value={formData.user_password}
                onChange={handleInputChange}
                className="w-full h-[59px] px-16 py-4 bg-gray-200 rounded-full text-[21px] font-carme text-cbvt-navy placeholder-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
              />
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                <KeyRound color="gray" size={20} />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <Eye color="gray" size={20} />
                ) : (
                  <EyeOff color="gray" size={20} />
                )}
              </button>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label htmlFor="rememberMe" className="flex items-center cursor-pointer space-x-3 px-4">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    formData.rememberMe ? "bg-cbvt-blue border-cbvt-blue" : "border-gray-400"
                  }`}
                >
                  {formData.rememberMe && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z" fill="white" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <span className="text-[14px] font-ibm-plex-sans text-cbvt-gray opacity-70">Remember me</span>
              </label>
              <a
                href="#"
                className="text-[14px] font-ibm-plex-sans text-cbvt-light-blue opacity-70 hover:underline transition-opacity"
              >
                Forgot your password?
              </a>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[50px] bg-cbvt-blue hover:scale-105 text-white rounded-full text-[24px] font-khand font-medium transition-all shadow-lg duration-300 ease-in-out mt-8"
            >
              Login
            </button>
          </form>

          {/* Mobile Sign-up */}
          <div className="lg:hidden text-center">
            <span className="text-cbvt-gray">Don't have an account? </span>
            <Link to="/signup" className="text-cbvt-blue font-medium hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}