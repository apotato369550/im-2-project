import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadCrumbs from "../components/BreadCrumbs";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <BreadCrumbs crumb="About" title="About CBVT"/>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 pb-16 flex flex-col items-center justify-center">
        <div className="max-w-4xl space-y-12 w-full">
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
          <div className="flex flex-col items-center justify-center gap-4 mt-12">
            <Link
              to="/contact"
              className="bg-cbvt-navy text-white px-10 py-2 rounded-full text-xl font-alegreya-sans-sc font-bold hover: scale-105 transition-transform duration-500 ease-in-out"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
