import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className=" bg-white flex justify-center">
      <nav className="container mx-auto px-12  py-8 mt-4">
        <div className="flex items-center justify-between">
            <Link to="/">
              <h1 className="text-5xl font-khand font-bold capitalize text-cbvt-navy hover:text-cbvt-blue transition-colors">Cebu Best Value Trading</h1>
            </Link>
          <div className="links flex flex-row space-x-18">
            <Link to="/about" className="text-xl text-cbvt-navy font-alegreya-sans-sc capitalize hover:text-cbvt-blue transition-colors self-center cursor-pointer duration-300">
              about
            </Link>
            <Link to="/contact" className="text-xl text-cbvt-navy font-alegreya-sans-sc capitalize hover:text-cbvt-blue transition-colors self-center">
              contact us
            </Link>
            <Link to="/catalog" className="text-xl text-cbvt-navy font-alegreya-sans-sc capitalize hover:text-cbvt-blue transition-colors self-center">
              catalog
            </Link>
            <Link to="/login" className="bg-cbvt-navy px-11 py-2 text-white rounded-full capitalize font-alegreya-sans-sc text-xl transition-colors duration-300 hover:scale-105 hover:bg-cbvt-light-blue transition-transform duration-500 ease-in-out">
                login
            </Link>
          </div>
        </div>
      </nav>
    </div>
    </>
  )
}

export default Navbar