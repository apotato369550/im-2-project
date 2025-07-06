import { Link } from "react-router-dom";

export default function About() {
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
            <span className="text-[21px] font-alegreya-sans-sc text-cbvt-navy capitalize">
              about
            </span>
            <Link
              to="#contact"
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

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 py-4">
        <p className="text-[16px] font-carme text-black capitalize">
          <Link to="/" className="text-black">
            home
          </Link>{" "}
          / <span className="text-cbvt-blue">About</span>
        </p>
      </div>

      {/* Page Title */}
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-alegreya-sans-sc font-bold text-cbvt-navy capitalize">
          About CBVT
        </h1>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 pb-16">
        <div className="max-w-4xl space-y-12">
          {/* Our Story Section */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-khand font-bold text-cbvt-navy">
              Our Story
            </h2>
            <div className="space-y-4 text-lg font-carme text-cbvt-gray leading-relaxed">
              <p>
                Founded in the heart of Cebu, Philippines, Cebu Best Value
                Trading (CBVT) has been at the forefront of the air conditioning
                industry for over two decades. What started as a small family
                business has grown into one of the most trusted HVAC service
                providers in the region.
              </p>
              <p>
                Our journey began with a simple mission: to provide reliable,
                affordable, and high-quality air conditioning solutions to homes
                and businesses across Cebu. Through years of dedicated service,
                innovation, and unwavering commitment to excellence, we have
                built lasting relationships with our clients and established
                ourselves as industry leaders.
              </p>
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-cbvt-cream rounded-lg p-8">
              <h3 className="text-2xl md:text-3xl font-khand font-bold text-cbvt-navy mb-4">
                Our Mission
              </h3>
              <p className="text-base font-carme text-cbvt-gray leading-relaxed">
                To deliver exceptional HVAC services that exceed customer
                expectations while maintaining the highest standards of quality,
                reliability, and professionalism. We strive to create
                comfortable environments that enhance the quality of life for
                our clients.
              </p>
            </div>

            <div className="bg-cbvt-sky rounded-lg p-8">
              <h3 className="text-2xl md:text-3xl font-khand font-bold text-cbvt-navy mb-4">
                Our Vision
              </h3>
              <p className="text-base font-carme text-cbvt-gray leading-relaxed">
                To be the leading HVAC service provider in the Philippines,
                recognized for our innovation, expertise, and commitment to
                sustainable cooling solutions that benefit both our customers
                and the environment.
              </p>
            </div>
          </section>

          {/* Services Section */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-khand font-bold text-cbvt-navy">
              What We Do
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-cbvt-sky rounded-lg">
                <h4 className="text-xl font-alegreya-sans-sc font-bold text-cbvt-navy mb-3">
                  Installation Services
                </h4>
                <p className="text-sm font-carme text-cbvt-gray">
                  Professional installation of residential and commercial air
                  conditioning systems with precision and care.
                </p>
              </div>

              <div className="text-center p-6 border border-cbvt-sky rounded-lg">
                <h4 className="text-xl font-alegreya-sans-sc font-bold text-cbvt-navy mb-3">
                  Repair & Maintenance
                </h4>
                <p className="text-sm font-carme text-cbvt-gray">
                  Fast, reliable repair services and preventive maintenance to
                  keep your units running efficiently year-round.
                </p>
              </div>

              <div className="text-center p-6 border border-cbvt-sky rounded-lg">
                <h4 className="text-xl font-alegreya-sans-sc font-bold text-cbvt-navy mb-3">
                  Retail Solutions
                </h4>
                <p className="text-sm font-carme text-cbvt-gray">
                  Wide selection of top-brand air conditioning units from
                  trusted manufacturers like Daikin and Matrix.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-khand font-bold text-cbvt-navy">
              Why Choose CBVT?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-cbvt-blue rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-alegreya-sans-sc font-bold text-cbvt-navy mb-1">
                      Expert Technicians
                    </h4>
                    <p className="text-sm font-carme text-cbvt-gray">
                      Our certified professionals bring years of experience and
                      technical expertise to every project.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-cbvt-blue rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-alegreya-sans-sc font-bold text-cbvt-navy mb-1">
                      Quality Assurance
                    </h4>
                    <p className="text-sm font-carme text-cbvt-gray">
                      We use only premium parts and materials, backed by
                      comprehensive warranties for your peace of mind.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-cbvt-blue rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-alegreya-sans-sc font-bold text-cbvt-navy mb-1">
                      24/7 Support
                    </h4>
                    <p className="text-sm font-carme text-cbvt-gray">
                      Round-the-clock customer support ensures help is always
                      available when you need it most.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-cbvt-blue rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-alegreya-sans-sc font-bold text-cbvt-navy mb-1">
                      Competitive Pricing
                    </h4>
                    <p className="text-sm font-carme text-cbvt-gray">
                      Fair, transparent pricing with no hidden costs. We believe
                      quality service should be accessible to everyone.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-cbvt-blue rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-alegreya-sans-sc font-bold text-cbvt-navy mb-1">
                      Fast Response Time
                    </h4>
                    <p className="text-sm font-carme text-cbvt-gray">
                      Quick scheduling and prompt service delivery to minimize
                      your downtime and discomfort.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-cbvt-blue rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-alegreya-sans-sc font-bold text-cbvt-navy mb-1">
                      Eco-Friendly Solutions
                    </h4>
                    <p className="text-sm font-carme text-cbvt-gray">
                      Energy-efficient systems and environmentally responsible
                      practices that reduce your carbon footprint.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-khand font-bold text-cbvt-navy">
              Our Team
            </h2>
            <div className="bg-cbvt-cream rounded-lg p-8">
              <p className="text-lg font-carme text-cbvt-gray leading-relaxed mb-6">
                Behind every successful service call is our dedicated team of
                professionals. From our experienced technicians to our friendly
                customer service representatives, each team member is committed
                to delivering the exceptional service that has made CBVT a
                trusted name in the industry.
              </p>
              <p className="text-base font-carme text-cbvt-gray leading-relaxed">
                Our technicians undergo continuous training to stay current with
                the latest HVAC technologies and best practices, ensuring that
                our customers always receive the most effective and efficient
                solutions available.
              </p>
            </div>
          </section>

          {/* Contact CTA Section */}
          <section className="bg-cbvt-navy rounded-lg p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-khand font-bold text-white mb-4">
              Ready to Experience the CBVT Difference?
            </h2>
            <p className="text-lg font-carme text-cbvt-light mb-6">
              Contact us today to schedule a consultation or service
              appointment. Let us show you why thousands of customers trust CBVT
              for all their air conditioning needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-cbvt-blue hover:bg-cbvt-blue/90 text-white px-8 py-3 rounded-full text-lg font-alegreya-sans-sc transition-all inline-block"
              >
                Contact Us
              </Link>
              <Link
                to="/catalog"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-cbvt-navy text-white px-8 py-3 rounded-full text-lg font-alegreya-sans-sc transition-all inline-block"
              >
                View Catalog
              </Link>
            </div>
          </section>
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
