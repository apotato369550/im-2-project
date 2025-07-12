import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft, Wrench, Phone } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cbvt-light-cream to-cbvt-sky">
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
            <Link
              to="/contact"
              className="text-[21px] font-alegreya-sans-sc text-cbvt-navy capitalize hover:text-cbvt-blue transition-colors"
            >
              Contact us
            </Link>
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

      {/* 404 Content */}
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Large 404 Number */}
          <div className="relative mb-8">
            <h1 className="text-8xl md:text-9xl lg:text-[200px] font-khand font-bold text-cbvt-navy/20 leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
                <Wrench className="w-16 h-16 md:w-24 md:h-24 text-cbvt-blue mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-alegreya-sans-sc font-bold text-cbvt-navy mb-4">
                  Page Not Found
                </h2>
                <p className="text-lg md:text-xl font-carme text-cbvt-gray max-w-md mx-auto">
                  Oops! It looks like this page went for maintenance and never
                  came back.
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl mb-12">
            <div className="mb-8">
              <Search className="w-12 h-12 text-cbvt-blue mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-alegreya-sans-sc font-bold text-cbvt-navy mb-4">
                We Couldn't Find What You're Looking For
              </h3>
              <p className="text-base md:text-lg font-carme text-cbvt-gray mb-2">
                The page{" "}
                <span className="font-bold text-cbvt-navy bg-cbvt-cream px-2 py-1 rounded font-mono">
                  {location.pathname}
                </span>{" "}
                doesn't exist.
              </p>
              <p className="text-base font-carme text-cbvt-gray">
                But don't worry! Our HVAC solutions are still working perfectly.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/"
                className="flex items-center gap-3 bg-cbvt-navy text-white px-8 py-4 rounded-full text-lg font-alegreya-sans-sc font-bold capitalize hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Link>

              <Link
                to="/catalog"
                className="flex items-center gap-3 bg-cbvt-blue text-white px-8 py-4 rounded-full text-lg font-alegreya-sans-sc font-bold capitalize hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Search className="w-5 h-5" />
                Browse Products
              </Link>

              <Link
                to="/contact"
                className="flex items-center gap-3 bg-cbvt-light-blue text-white px-8 py-4 rounded-full text-lg font-alegreya-sans-sc font-bold capitalize hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Contact Us
              </Link>
            </div>
          </div>

          {/* Helpful Links */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <h4 className="text-xl font-alegreya-sans-sc font-bold text-cbvt-navy mb-6">
              Popular Destinations
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/about"
                className="flex flex-col items-center p-4 rounded-2xl hover:bg-white/50 transition-all group"
              >
                <div className="w-12 h-12 bg-cbvt-sky rounded-2xl flex items-center justify-center mb-2 group-hover:bg-cbvt-blue transition-colors">
                  <span className="text-2xl">ℹ️</span>
                </div>
                <span className="font-carme text-cbvt-navy text-sm font-medium">
                  About Us
                </span>
              </Link>

              <Link
                to="/catalog"
                className="flex flex-col items-center p-4 rounded-2xl hover:bg-white/50 transition-all group"
              >
                <div className="w-12 h-12 bg-cbvt-sky rounded-2xl flex items-center justify-center mb-2 group-hover:bg-cbvt-blue transition-colors">
                  <span className="text-2xl">🛍️</span>
                </div>
                <span className="font-carme text-cbvt-navy text-sm font-medium">
                  Catalog
                </span>
              </Link>

              <Link
                to="/contact"
                className="flex flex-col items-center p-4 rounded-2xl hover:bg-white/50 transition-all group"
              >
                <div className="w-12 h-12 bg-cbvt-sky rounded-2xl flex items-center justify-center mb-2 group-hover:bg-cbvt-blue transition-colors">
                  <span className="text-2xl">📞</span>
                </div>
                <span className="font-carme text-cbvt-navy text-sm font-medium">
                  Contact
                </span>
              </Link>

              <Link
                to="/login"
                className="flex flex-col items-center p-4 rounded-2xl hover:bg-white/50 transition-all group"
              >
                <div className="w-12 h-12 bg-cbvt-sky rounded-2xl flex items-center justify-center mb-2 group-hover:bg-cbvt-blue transition-colors">
                  <span className="text-2xl">🔐</span>
                </div>
                <span className="font-carme text-cbvt-navy text-sm font-medium">
                  Login
                </span>
              </Link>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-cbvt-blue hover:text-cbvt-navy transition-colors font-carme font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back to Previous Page
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-cbvt-navy py-8 mt-16">
        <div className="container mx-auto px-8 text-center">
          <p className="text-[19px] font-carme text-cbvt-light">
            © 2025 Cebu Best Value Trading. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
