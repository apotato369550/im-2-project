import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import heroFill from "./assets/images/heroFill.png";
import "slick-carousel/slick/slick.css"; 
 
import React from "react";
import Slider from "react-slick";

const App = () => {
  
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
      <Navbar/>
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
          
          <div className="knowMore w-[26rem] h-[9.5rem] flex justify-center items-center absolute right-0 bottom-0 bg-cbvt-light-cream border-t-[12px] border-l-[12px] border-r-6 border-white rounded-tl-4xl rounded-b-4xl p-1 rounded-tr-4xl">
            know more
          </div>
        </div>
          {/* Hero Image */}
            <div className="absolute top-0 right-[-60px] overflow-hidden">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/41af0cf3f1ed090135f802ae8c04e7da89598a66?width=1515"
                alt="Air conditioner unit"
                className="w-full h-full object-contain transform rotate-[13deg] translate-x-16 -translate-y-32"
              />
            </div>
      </div>
    </>
  );
};

export default App;