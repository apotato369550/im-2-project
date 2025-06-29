import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
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
  };

  return (
    <div className="min-h-screen bg-white">
        <nav className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg md:text-2xl lg:text-[41px] font-khand font-bold text-cbvt-navy capitalize">
          Cebu Best Value Trading
            </h1>
            <div className="hidden lg:flex items-center space-x-8">
          <a
            href="#about"
            className="text-[21px] font-alegreya-sans-sc text-cbvt-navy capitalize hover:text-cbvt-blue transition-colors"
          >
            about
          </a>
          <a
            href="#contact"
            className="text-[21px] font-alegreya-sans-sc text-cbvt-navy capitalize hover:text-cbvt-blue transition-colors"
          >
            Contact us
          </a>
          <a
            href="#catalog"
            className="text-[21px] font-alegreya-sans-sc text-cbvt-navy capitalize hover:text-cbvt-blue transition-colors"
          >
            catalog
          </a>
          <button
            className="bg-cbvt-navy text-white px-6 py-2 rounded-full text-[21px] font-alegreya-sans-sc capitalize hover:bg-opacity-90 transition-all"
            onClick={() => window.location.href = '/login'}
          >
            Login
          </button>
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

      {/* Hero Section */}
      <section className="relative px-4 md:px-8 py-8 md:py-16">
        <div className="container mx-auto">
          <div className="relative bg-cbvt-sky rounded-[30px] md:rounded-[58px] p-8 md:p-16 shadow-lg overflow-hidden min-h-[500px] md:min-h-[600px]">
            {/* Hero Content */}
            <div className="relative z-10 max-w-2xl">
              {/* Navigation Dots - Hidden on mobile */}
              <div className="hidden md:flex flex-col items-start space-y-16 mb-8 absolute -left-12 top-0">
                <div className="w-8 h-8 bg-cbvt-navy rounded-full"></div>
                <div className="w-8 h-8 border-2 border-cbvt-navy rounded-full"></div>
                <div className="w-8 h-8 border-2 border-cbvt-navy rounded-full"></div>
              </div>

              <h2 className="text-4xl md:text-6xl lg:text-[99px] font-khand font-bold leading-none mb-6 capitalize">
                <span className="text-cbvt-blue">Smarter </span>
                <span className="text-cbvt-cream">HVAC</span>
                <span className="text-cbvt-blue"> Starts Here</span>
              </h2>

              <p className="text-base md:text-[19px] font-carme text-cbvt-navy leading-normal mb-8 max-w-[619px]">
                Modernizing operations for a better customer experience. CBVT's
                new digital system simplifies service requests, improves
                record-keeping, and enhances client engagement.
              </p>

              <button className="bg-cbvt-navy text-cbvt-light px-6 md:px-10 py-3 rounded-full text-lg md:text-[22px] font-alegreya-sans-sc hover:bg-opacity-90 transition-all shadow-lg">
                Book our Services Now!
              </button>
            </div>

            {/* Hero Image */}
            <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/41af0cf3f1ed090135f802ae8c04e7da89598a66?width=1515"
                alt="Air conditioner unit"
                className="w-full h-full object-contain transform rotate-[13deg] translate-x-16 -translate-y-32"
              />
            </div>

            {/* Know More Section */}
            <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 bg-white rounded-[25px] md:rounded-[50px] px-4 md:px-8 py-3 md:py-6 shadow-lg max-w-xs">
              <div className="flex items-center space-x-2 md:space-x-4">
                <span className="text-sm md:text-[21px] font-alegreya-sans-sc font-bold text-cbvt-navy capitalize">
                  know more
                </span>
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 20 16"
                  fill="none"
                  className="text-black md:w-5 md:h-4"
                >
                  <path
                    d="M18.9378 8.96072C19.3405 8.55799 19.3405 7.90502 18.9378 7.50229L12.3748 0.939329C11.9721 0.536593 11.3191 0.536593 10.9164 0.939329C10.5137 1.34206 10.5137 1.99503 10.9164 2.39776L16.7502 8.23151L10.9164 14.0652C10.5137 14.468 10.5137 15.1209 10.9164 15.5237C11.3191 15.9264 11.9721 15.9264 12.3748 15.5237L18.9378 8.96072ZM0.677002 8.23151L0.677002 9.26278L18.2086 9.26278V8.23151V7.20024L0.677002 7.20024L0.677002 8.23151Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Team Avatars */}
              <div className="flex -space-x-2 mt-2 md:mt-4">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-300 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-300 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-300 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-300 rounded-full border-2 border-white"></div>
              </div>

              <div className="mt-2">
                <p className="text-sm md:text-[23px] font-khand font-bold text-cbvt-blue">
                  About us
                </p>
                <p className="text-xs md:text-[10px] font-carme text-cbvt-muted capitalize leading-tight">
                  The team behind CBVT Online — building better service through
                  smart solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-16">
          <h3 className="text-3xl md:text-4xl lg:text-[50px] font-khand font-bold text-cbvt-navy capitalize mb-4">
            Check out our services!
          </h3>
          <p className="text-base md:text-[19px] font-ibm-plex-sans text-cbvt-muted max-w-3xl mx-auto">
            Explore our full range of air-conditioning services—from
            installation to maintenance—tailored to meet your needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Repair Card */}
          <div className="relative">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/455e6f7866b8d7c7bd5e510f4f85bfdac303ffe0?width=619"
              alt="Air conditioner repair service"
              className="w-full h-[227px] object-cover rounded-[15px] shadow-lg"
            />
            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xl md:text-[25px] font-khand font-bold text-cbvt-navy capitalize opacity-90">
                  Repair
                </h4>
                <p className="text-xs md:text-[10px] font-carme text-cbvt-muted">
                  Fast, reliable airconditioner fixes.
                </p>
              </div>
              <button className="bg-cbvt-navy text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-[17px] font-alegreya-sans-sc hover:bg-opacity-90 transition-all whitespace-nowrap">
                book now!
              </button>
            </div>
          </div>

          {/* Installation Card */}
          <div className="relative">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0ca90c980602e8bc4f5a364610b092b363a0ca6?width=619"
              alt="Air conditioner installation service"
              className="w-full h-[227px] object-cover rounded-[15px] shadow-lg"
            />
            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xl md:text-[25px] font-khand font-bold text-cbvt-navy capitalize opacity-90">
                  installation
                </h4>
                <p className="text-xs md:text-[10px] font-carme text-cbvt-muted">
                  Expert airconditioner setup.
                </p>
              </div>
              <button className="bg-cbvt-navy text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-[17px] font-alegreya-sans-sc hover:bg-opacity-90 transition-all whitespace-nowrap">
                book now!
              </button>
            </div>
          </div>

          {/* Retail Card */}
          <div className="relative">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/785319a0c645b785f5567543f553aaf13bf6ea26?width=619"
              alt="Air conditioner retail units"
              className="w-full h-[227px] object-cover rounded-[15px] shadow-lg"
            />
            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xl md:text-[25px] font-khand font-bold text-cbvt-navy capitalize opacity-90">
                  Retail
                </h4>
                <p className="text-xs md:text-[10px] font-carme text-cbvt-muted">
                  Top-brand units for sale.
                </p>
              </div>
              <button className="bg-cbvt-navy text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-[17px] font-alegreya-sans-sc hover:bg-opacity-90 transition-all whitespace-nowrap">
                book now!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="container mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="bg-cbvt-cream rounded-[30px] md:rounded-[58px] p-8 md:p-16 shadow-lg relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block border-2 border-gray-500 rounded-full px-4 md:px-6 py-2 md:py-3 mb-6 md:mb-8">
                <span className="text-base md:text-[21px] font-khand text-gray-700 capitalize">
                  Our Trusted Brands
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl lg:text-[46px] font-khand font-bold text-cbvt-blue capitalize leading-tight mb-6 md:mb-8">
                Partnering with Industry Leaders to Bring You the Best
              </h3>

              <p className="text-sm md:text-base lg:text-[19px] font-carme text-cbvt-gray leading-relaxed mb-6 md:mb-8">
                At CBVT, quality is non-negotiable. That's why we partner with
                some of the most trusted names in the air-conditioning industry.
                From energy-efficient units to cutting-edge cooling technology,
                our official brand partners help us deliver top-tier service and
                long-lasting comfort to every home and business we serve. We're
                proud to be official dealers of:
              </p>

              {/* Brand Logos */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/308bd9f52efbe522d6fb0726ecaa5dad6fb46731?width=296"
                  alt="Matrix brand logo"
                  className="h-12 md:h-16 object-contain shadow-lg"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d1aba48dd0ddf2f073bf8f0cdb8e148625bb078d?width=354"
                  alt="Daikin brand logo"
                  className="h-8 md:h-10 object-contain shadow-lg"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7a48940c4fe7f41dc8f73f4a6533559e0ade42c?width=1077"
                alt="Professional handshake partnership"
                className="w-full h-64 md:h-96 lg:h-[543px] object-cover rounded-[21px] shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="relative py-16 md:py-32"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/edd66a22dfb9f33e73288499a9d8d439671042ec?width=2974'), url('https://cdn.builder.io/api/v1/image/assets/TEMP/988bbd69e3e8d2c2992238b1b550f7eedb318e72?width=3118')`,
          backgroundSize: "cover, cover",
          backgroundPosition: "center top, center bottom",
          backgroundBlendMode: "overlay, normal",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Contact Info */}
            <div className="text-white order-2 lg:order-1">
              <p className="text-sm md:text-lg lg:text-[24px] font-alegreya-sans-sc font-bold text-cbvt-light-blue uppercase tracking-[4px] md:tracking-[8px] mb-6 md:mb-8">
                Contact us
              </p>

              <h3 className="text-4xl md:text-6xl lg:text-[96px] font-khand font-bold text-cbvt-navy capitalize leading-none mb-8 md:mb-16">
                Get in touch
              </h3>

              <div className="space-y-8 md:space-y-12">
                {/* Location */}
                <div className="flex items-start space-x-3 md:space-x-4">
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
                  <p className="text-base md:text-lg lg:text-[24px] font-carme text-cbvt-navy capitalize leading-relaxed">
                    El Pueblo Dos, Pagutlan, Liloan, Cebu
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3 md:space-x-4">
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
                  <p className="text-base md:text-lg lg:text-[24px] font-carme text-cbvt-navy">
                    cbvt_1234@yahoo.com.ph
                  </p>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3 md:space-x-4">
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
                  <p className="text-base md:text-lg lg:text-[24px] font-carme text-cbvt-navy capitalize">
                    09185829931
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
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 md:px-6 py-3 md:py-4 rounded-full text-base md:text-lg lg:text-[24px] font-carme text-cbvt-gray placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 md:px-6 py-3 md:py-4 rounded-full text-base md:text-lg lg:text-[24px] font-carme text-cbvt-gray placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="your message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 md:px-6 py-3 md:py-4 rounded-[22px] text-base md:text-lg lg:text-[24px] font-carme text-cbvt-gray placeholder-cbvt-gray/70 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-cbvt-light-blue text-white py-3 md:py-4 rounded-full text-base md:text-lg lg:text-[24px] font-alegreya-sans-sc font-bold capitalize hover:bg-opacity-90 transition-all"
                  >
                    Send a message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cbvt-navy py-8">
        <div className="container mx-auto px-8 text-center">
          <p className="text-[19px] font-carme text-cbvt-light">
            © 2025 Cebu Best Value Trading. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

