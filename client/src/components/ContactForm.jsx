import React from 'react';
import contactBg from "../assets/images/contactBg.png"
import contactUsBg from "../assets/images/contactUsBg.png"

const ContactForm = ({ 
  topMargin = "mt-76", 
  topPadding = "pt-28",
  backgroundImage = contactBg,
  backgroundSize = "contain",
  height = "min-h-[1360px]"
}) => {

    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      message: '',
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
        console.log("Form submitted:", formData);
      };

  return (
    <>
      <section
        className={`bg-cover bg-center bg-no-repeat w-full overflow-hidden ${height}`}
        style={{ backgroundImage: `url(${backgroundImage})`,
        backgroundSize: backgroundSize
       }}
      >
        <div className={`relative ${topMargin} mx-32 z-10`}>
          <div className="grid gap-8 grid-cols-2 items-start">
            {/* Contact Info */}
            <div className={`text-white order-1 w-full pl-24 ${topPadding}`}>
              <p className="text-lg font-alegreya-sans-sc font-bold text-cbvt-light-blue uppercase tracking-[8px] mb-6">
                Contact us
              </p>

              <h3 className="text-8xl font-khand font-bold text-cbvt-navy capitalize leading-none mb-16">
                Get in touch
              </h3>

              <div className="space-y-12">
                {/* Location */}
                <div className="flex items-center space-x-4">
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
                  <p className="text-xl font-carme text-cbvt-navy capitalize leading-relaxed">
                    President Magsaysay Villa Aurora Kasambagan, Cebu City
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4">
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
                  <p className="text-xl font-carme text-cbvt-navy">
                    cebubestvaluetradingcorp@yahoo.com.ph
                  </p>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-4">
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
                  <p className="text-xl font-carme text-cbvt-navy capitalize">
                    (032) 342-8743
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-cbvt-navy rounded-4xl px-12 py-18 relative overflow-hidden order-2 opacity-80 mr-20 flex flex-col items-center">

              <div className="relative z-10 self-start w-full">
                <h4 className="text-5xl font-khand font-bold text-cbvt-cream capitalize mb-2">
                  You have a question?
                </h4>

                <p className="text-lg font-carme text-white mb-12">
                  Feel free to drop a message down below!
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 space-y-6"
                >
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-full text-xl font-carme text-cbvt-navy capitalize placeholder-gray-400 bg-cbvt-light-cream focus:ring-2 focus:ring-cbvt-blue"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-full text-xl font-carme text-cbvt-navy placeholder-gray-400 bg-cbvt-light-cream focus:ring-2 focus:ring-cbvt-blue"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-6 py-4 rounded-4xl text-xl font-carme text-cbvt-navy  placeholder-gray-400 bg-cbvt-light-cream focus:ring-2 focus:ring-cbvt-blue  flex items-center"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-cbvt-light-blue text-white py-3 rounded-full text-xl font-alegreya-sans-sc font-bold  hover:scale-105 shadow-lg transition-all mt-4"
                  >
                    Send a message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactForm