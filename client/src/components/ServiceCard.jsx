import React from 'react'

const ServiceCard = (prop) => {
  return (
    <>
        <div className="relative">
            <img
              src={prop.src}
              alt="Air conditioner repair service"
              className="w-full h-[227px] object-cover rounded-[15px] shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out
"
            />
            <div className="mt-6 flex flex-row items-center justify-between gap-3">
              <div>
                <h4 className="text-xl md:text-[25px] font-khand font-bold text-cbvt-navy capitalize opacity-90">
                  {prop.title}
                </h4>
                <p className="text-xs md:text-[10px] font-carme text-cbvt-muted">
                  {prop.desc}
                </p>
              </div>
              <button className="bg-cbvt-navy text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-[17px] font-alegreya-sans-sc hover:scale-105 transition-all whitespace-nowrap">
                {prop.btn}
              </button>
            </div>
          </div>
    </>
  )
}

export default ServiceCard