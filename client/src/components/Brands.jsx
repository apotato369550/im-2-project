import React from 'react';
import handshake from '../assets/images/handshake.jpg';

const Brands = () => {
  return (
    <>
        <div className="w-full flex justify-center mt-12">
        <div className=" w-[90%]  relative overflow-hidden">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div className="order-2 pl-16 py-16">
              <div className="inline-block border-2 border-gray-400 rounded-full px-4 md:px-6 py-2 md:py-3 mb-6 md:mb-8">
                <span className="text-[21px] font-khand font-bold text-gray-400 capitalize">
                  Our Trusted Brands
                </span>
              </div>

              <h3 className="text-[46px] font-khand font-bold text-cbvt-blue capitalize leading-tight mb-8">
                Partnering with Industry Leaders to Bring You the Best
              </h3>

              <p className="text-xl font-carme text-cbvt-gray leading-relaxed mb-8">
                At CBVT, quality is non-negotiable. That's why we partner with
                some of the most trusted names in the air-conditioning industry.
                From energy-efficient units to cutting-edge cooling technology,
                our official brand partners help us deliver top-tier service and
                long-lasting comfort to every home and business we serve. We're
                proud to be official dealers of:
              </p>

              {/* Brand Logos */}
              <div className="flex flex-row items-center gap-8 w-full">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/308bd9f52efbe522d6fb0726ecaa5dad6fb46731?width=296"
                  alt="Matrix brand logo"
                  className="h-16 object-contain"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d1aba48dd0ddf2f073bf8f0cdb8e148625bb078d?width=354"
                  alt="Daikin brand logo"
                  className="h-10 object-contain"
                />
              </div>
            </div>

            <div className="order-2 rounded-2xl">
              <img
                src={handshake}
                alt="Professional handshake partnership"
                className="w-full h-full object-cover rounded-2xl shadow-2xl hover: scale-100 transition-transform duration-300 ease-in-out
"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Brands