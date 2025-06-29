import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
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
    // Handle login submission
    console.log("Login submitted:", formData);
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
            {/* Login button - selected */}
            <div className="bg-white rounded-full px-8 py-4 shadow-lg">
              <span className="text-[40px] font-alegreya-sans-sc font-bold text-cbvt-blue capitalize">
                Login
              </span>
            </div>

            {/* Sign up button */}
            <Link to="/signup">
              <div className="px-8 py-4 cursor-pointer hover:bg-white/10 rounded-full transition-colors">
                <span className="text-[40px] font-alegreya-sans-sc font-bold text-white capitalize">
                  sign up
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white/40 via-cbvt-blue/40 to-transparent mix-blend-multiply blur-sm"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile navigation for smaller screens */}
          <div className="lg:hidden flex justify-center space-x-4 mb-8">
            <div className="bg-cbvt-blue text-white px-6 py-2 rounded-full">
              <span className="font-alegreya-sans-sc font-bold">Login</span>
            </div>
            <Link
              to="/signup"
              className="text-cbvt-blue px-6 py-2 rounded-full border border-cbvt-blue"
            >
              <span className="font-alegreya-sans-sc font-bold">Sign Up</span>
            </Link>
          </div>

          {/* Login Form */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-khand font-bold text-cbvt-blue text-center capitalize leading-tight">
              Login
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email/Username Field */}
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    name="emailOrUsername"
                    placeholder="email or username"
                    value={formData.emailOrUsername}
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
                        d="M22.9445 24.0621V21.826C22.9445 20.64 22.4733 19.5025 21.6346 18.6638C20.7959 17.8251 19.6584 17.3539 18.4723 17.3539H9.52804C8.34196 17.3539 7.20445 17.8251 6.36577 18.6638C5.52708 19.5025 5.05591 20.64 5.05591 21.826V24.0621M18.4723 8.40964C18.4723 10.8795 16.4701 12.8818 14.0002 12.8818C11.5303 12.8818 9.52804 10.8795 9.52804 8.40964C9.52804 5.93974 11.5303 3.9375 14.0002 3.9375C16.4701 3.9375 18.4723 5.93974 18.4723 8.40964Z"
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
                      <g clipPath="url(#clip0_26_461)">
                        <path
                          d="M8.40988 12.8819V8.40975C8.40988 6.92714 8.99884 5.50526 10.0472 4.4569C11.0956 3.40854 12.5174 2.81958 14.0001 2.81958C15.4827 2.81958 16.9045 3.40854 17.9529 4.4569C19.0013 5.50526 19.5902 6.92714 19.5902 8.40975V12.8819M6.17381 12.8819H21.8263C23.0612 12.8819 24.0624 13.883 24.0624 15.118V22.9442C24.0624 24.1791 23.0612 25.1803 21.8263 25.1803H6.17381C4.93887 25.1803 3.93774 24.1791 3.93774 22.9442V15.118C3.93774 13.883 4.93887 12.8819 6.17381 12.8819Z"
                          stroke="#676767"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_26_461">
                          <rect
                            width="26.8328"
                            height="26.8328"
                            fill="white"
                            transform="translate(0.58374 0.583496)"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="flex items-center cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          formData.rememberMe
                            ? "bg-cbvt-blue border-cbvt-blue"
                            : "border-gray-400"
                        }`}
                      >
                        {formData.rememberMe && (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-4 h-4"
                          >
                            <path
                              d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z"
                              fill="white"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="ml-3 text-[14px] font-ibm-plex-sans text-cbvt-gray opacity-70">
                        Remember me
                      </span>
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-[14px] font-ibm-plex-sans text-cbvt-light-blue opacity-70 hover:opacity-100 transition-opacity"
                >
                  Forgot your password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full h-[50px] bg-cbvt-blue hover:bg-cbvt-blue/90 text-white rounded-full text-[24px] font-khand font-medium transition-all shadow-lg"
              >
                Login
              </button>
            </form>

            {/* Sign up link for mobile */}
            <div className="lg:hidden text-center">
              <span className="text-cbvt-gray">Don't have an account? </span>
              <Link
                to="/signup"
                className="text-cbvt-blue font-medium hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
