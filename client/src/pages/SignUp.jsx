import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    userType: "client", // "client" or "worker"
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      userType: type,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup submission
    console.log("Sign up submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Visual/Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative">
        <div className="w-full bg-cbvt-sky relative overflow-hidden">
          {/* Background pattern/image overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cbvt-sky/90 to-cbvt-blue/30"></div>

          {/* Navigation buttons */}
          <div className="absolute bottom-32 right-16 space-y-6">
            {/* Login button */}
            <Link to="/login">
              <div className="px-8 py-4 cursor-pointer hover:bg-white/10 rounded-full transition-colors">
                <span className="text-[40px] font-alegreya-sans-sc font-bold text-white capitalize">
                  Login
                </span>
              </div>
            </Link>

            {/* Sign up button - selected */}
            <div className="bg-white rounded-full px-8 py-4 shadow-lg">
              <span className="text-[40px] font-alegreya-sans-sc font-bold text-cbvt-blue capitalize">
                sign up
              </span>
            </div>
          </div>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white/40 via-cbvt-blue/40 to-transparent mix-blend-multiply blur-sm"></div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile navigation for smaller screens */}
          <div className="lg:hidden flex justify-center space-x-4 mb-8">
            <Link
              to="/login"
              className="text-cbvt-blue px-6 py-2 rounded-full border border-cbvt-blue"
            >
              <span className="font-alegreya-sans-sc font-bold">Login</span>
            </Link>
            <div className="bg-cbvt-blue text-white px-6 py-2 rounded-full">
              <span className="font-alegreya-sans-sc font-bold">Sign Up</span>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-khand font-bold text-cbvt-blue text-center capitalize leading-tight">
              Sign up
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-[59px] px-16 py-4 bg-gray-200 rounded-full text-[21px] font-carme text-cbvt-gray placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                  />
                  <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      className="w-7 h-7"
                    >
                      <path
                        d="M5.05589 22.9442C4.44097 22.9442 3.91457 22.7253 3.47667 22.2874C3.03877 21.8495 2.81982 21.3231 2.81982 20.7081V7.29173C2.81982 6.67681 3.03877 6.15041 3.47667 5.71251C3.91457 5.27461 4.44097 5.05566 5.05589 5.05566H22.9444C23.5594 5.05566 24.0858 5.27461 24.5237 5.71251C24.9616 6.15041 25.1805 6.67681 25.1805 7.29173V20.7081C25.1805 21.3231 24.9616 21.8495 24.5237 22.2874C24.0858 22.7253 23.5594 22.9442 22.9444 22.9442H5.05589ZM14.0002 15.118L5.05589 9.5278V20.7081H22.9444V9.5278L14.0002 15.118ZM14.0002 12.8819L22.9444 7.29173H5.05589L14.0002 12.8819ZM5.05589 9.5278V7.29173V20.7081V9.5278Z"
                        fill="#676767"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Username Field */}
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full h-[59px] px-16 py-4 bg-gray-200 rounded-full text-[21px] font-carme text-cbvt-gray placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                  />
                  <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      className="w-7 h-7"
                    >
                      <path
                        d="M22.9442 24.0621V21.826C22.9442 20.64 22.473 19.5025 21.6343 18.6638C20.7957 17.8251 19.6582 17.3539 18.4721 17.3539H9.5278C8.34172 17.3539 7.20421 17.8251 6.36552 18.6638C5.52683 19.5025 5.05566 20.64 5.05566 21.826V24.0621M18.4721 8.40964C18.4721 10.8795 16.4698 12.8818 13.9999 12.8818C11.53 12.8818 9.5278 10.8795 9.5278 8.40964C9.5278 5.93974 11.53 3.9375 13.9999 3.9375C16.4698 3.9375 18.4721 5.93974 18.4721 8.40964Z"
                        stroke="#676767"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full h-[59px] px-16 py-4 bg-gray-200 rounded-full text-[21px] font-carme text-cbvt-gray placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                  />
                  <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      className="w-7 h-7"
                    >
                      <g clipPath="url(#clip0_33_157)">
                        <path
                          d="M8.40964 12.8816V8.40951C8.40964 6.9269 8.9986 5.50502 10.047 4.45666C11.0953 3.4083 12.5172 2.81934 13.9998 2.81934C15.4824 2.81934 16.9043 3.4083 17.9527 4.45666C19.001 5.50502 19.59 6.9269 19.59 8.40951V12.8816M6.17357 12.8816H21.826C23.061 12.8816 24.0621 13.8828 24.0621 15.1177V22.9439C24.0621 24.1789 23.061 25.18 21.826 25.18H6.17357C4.93862 25.18 3.9375 24.1789 3.9375 22.9439V15.1177C3.9375 13.8828 4.93862 12.8816 6.17357 12.8816Z"
                          stroke="#676767"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_33_157">
                          <rect
                            width="26.8328"
                            height="26.8328"
                            fill="white"
                            transform="translate(0.583496 0.583496)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2"
                  >
                    <svg
                      width="26"
                      height="20"
                      viewBox="0 0 26 20"
                      fill="none"
                      className="w-6 h-5"
                    >
                      <path
                        d="M13.0288 0C4.84943 0 0 9.69886 0 9.69886C0 9.69886 4.84943 19.3977 13.0288 19.3977C21.0142 19.3977 25.8636 9.69886 25.8636 9.69886C25.8636 9.69886 21.0142 0 13.0288 0ZM12.9318 3.23295C16.5204 3.23295 19.3977 6.14261 19.3977 9.69886C19.3977 13.2874 16.5204 16.1648 12.9318 16.1648C9.37557 16.1648 6.46591 13.2874 6.46591 9.69886C6.46591 6.14261 9.37557 3.23295 12.9318 3.23295ZM12.9318 6.46591C11.1537 6.46591 9.69886 7.92074 9.69886 9.69886C9.69886 11.477 11.1537 12.9318 12.9318 12.9318C14.7099 12.9318 16.1648 11.477 16.1648 9.69886C16.1648 9.37557 16.0355 9.0846 15.9708 8.79364C15.7122 9.31091 15.1949 9.69886 14.5483 9.69886C13.6431 9.69886 12.9318 8.98761 12.9318 8.08239C12.9318 7.43579 13.3198 6.91852 13.837 6.65988C13.5461 6.5629 13.2551 6.46591 12.9318 6.46591Z"
                        fill="#676767"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* User Type Toggle */}
              <div className="relative">
                <div className="h-[59px] bg-gray-200 rounded-full p-2 flex">
                  <button
                    type="button"
                    onClick={() => handleUserTypeChange("client")}
                    className={`flex-1 h-full rounded-full text-[21px] font-carme transition-all ${
                      formData.userType === "client"
                        ? "bg-cbvt-navy text-white shadow-lg"
                        : "text-cbvt-navy opacity-70 hover:opacity-100"
                    }`}
                  >
                    client
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUserTypeChange("worker")}
                    className={`flex-1 h-full rounded-full text-[21px] font-carme transition-all ${
                      formData.userType === "worker"
                        ? "bg-cbvt-navy text-white shadow-lg"
                        : "text-cbvt-navy opacity-70 hover:opacity-100"
                    }`}
                  >
                    worker
                  </button>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full h-[50px] bg-cbvt-blue hover:bg-cbvt-blue/90 text-white rounded-full text-[24px] font-khand font-medium transition-all shadow-lg"
              >
                Sign Up
              </button>
            </form>

            {/* Login link for mobile */}
            <div className="lg:hidden text-center">
              <span className="text-cbvt-gray">Already have an account? </span>
              <Link
                to="/login"
                className="text-cbvt-blue font-medium hover:underline"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
