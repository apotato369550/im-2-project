import React from "react";
import { Link } from "react-router-dom";
import heroFill from "../assets/images/heroFill.png"; 
import aircon from "../assets/images/aircon.png"  
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

const Hero = () => {

    const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    vertical: false,
    verticalSwiping: false,
    appendDots: dots => (
      <ul className="flex flex-col items-center justify-center list-none h-full pr-6">
        {dots.map((dot, index) => (
          <li key={index} className="my-2">{dot}</li> 
        ))}
      </ul>
    ),
    customPaging: index => (
      <div className="dot w-8 h-8 border-2 border-cbvt-navy rounded-full bg-cbvt-sky hover:bg-cbvt-navy transition-colors cursor-pointer my-16 ml-24 z-20 relative"/>
    )
    };

    const textSlides = [
        <div className="absolute z-10 w-[40rem]">
        <h2 className="text-8xl text-cbvt-blue font-khand font-bold mb-6 text-shadow-md">Smarter <span className="text-cbvt-cream">HVAC</span> Starts Here</h2>
        <p className="text-[20px] text-cbvt-navy font-carme">Modernizing operations for a better customer experience. CBVT’s new digital system simplifies service requests, improves record-keeping, and enhances client engagement.</p>
        </div>,

        <div className="absolute z-10 w-[40rem]">
        <h2 className="text-8xl text-cbvt-blue font-khand font-bold mb-6 text-shadow-md">Service At <span className="text-cbvt-cream">Your</span> Fingertips</h2>
        <p className="text-[20px] text-cbvt-navy font-carme">Access HVAC services faster and easier than ever. From booking to real-time updates, CBVT’s new platform puts convenience, transparency, and control in your hands.</p>
        </div>,

        <div className="absolute z-10 w-[40rem]">
        <h2 className="text-8xl text-cbvt-blue font-khand font-bold mb-6 text-shadow-md">Built For <span className="text-cbvt-cream">Better</span> Business</h2>
        <p className="text-[20px] text-cbvt-navy font-carme">This digital upgrade isn’t just about going online—it’s about helping CBVT work smarter, scale faster, and serve customers with greater efficiency and reliability.</p>
        </div>,
    ];

  return (
    <>
        <div className="container flex flex-wrap h-[40rem] p-1.5 justify-center items-center space-x-0.5 relative">
        <div className="card relative w-full">
          <div className="cardimg h-[38rem] w-full relative border-8 border-white mb-10">
            <img src={heroFill} alt="heroFill" className="w-full h-full object-cover absolute z-0 rounded-[50px]"/>
            
            <div className="content">
              
              <div className="slider-wrapper w-full h-full absolute top-0 z-0">
                <div className="w-[2px] h-90 bg-cbvt-navy absolute z-10 ml-[111px] mt-[110px]"></div>
                <Slider {...settings} className="grid-slider w-full h-full">
                  {textSlides.map((slide, index) => (
                    <div key={index} className="slide-content">
                      <div className="w-full h-full flex items-center justify-center">
                        {slide}
                      </div>
                    </div>
                  ))}
                </Slider>
                <div className="absolute bottom-25 left-48 z-20">
                  <button className="bg-cbvt-navy text-cbvt-light px-10 py-3 rounded-full text-xl font-alegreya-sans-sc hover:scale-105 cursor-pointer transition-all shadow-lg">
                    Book our Services Now!
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Know More Card */}
          <Link to="/about" className="knowMore w-[26rem] h-[9.5rem] flex justify-center items-center absolute right-0 bottom-0 bg-cbvt-light-gray border-t-[12px] border-l-[12px] border-r-6 border-white rounded-tl-4xl rounded-b-4xl p-1 rounded-tr-4xl cursor-pointer">
            <div className="relative flex flex-col px-8 py-6 hover:scale-105 transition-transform duration-200 ease-in-out *:bg-cbvt-light-cream">
              <div className="flex items-center space-x-2 md:space-x-50">
                <span className="text-sm md:text-xl font-alegreya-sans-sc font-bold text-cbvt-navy capitalize">
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
              
              <div className="flex flex-row space-x-4">
                <div className="flex -space-x-2 mt-2 md:mt-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-cbvt-blue rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-cbvt-blue rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <div className="w-8 h-8 md:w-12 md:h-12 bg-cbvt-blue rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM8 15a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1-9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-sm md:text-[23px] font-khand font-bold text-cbvt-blue">
                    About CBVT
                  </p>
                  <p className="text-xs md:text-[10px] font-carme text-cbvt-muted capitalize leading-tight">
                    Driven by excellence and guided by innovation.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
          {/* Hero Image */}
            <div className="hidden xl:block absolute top-30 right-[-60px] mt-10">
              <img
                src={aircon}
                alt="Air conditioner unit"
                className="w-full h-[420px] object-contain transform translate-x-16 -translate-y-32 hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
      </div>

    </>
  )
}

export default Hero