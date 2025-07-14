import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumbs = (prop) => {

    return (
        <>
        <div className="container mx-auto px-12 py-4">
            <p className="text-[16px] font-carme text-cbvt-navy capitalize">
            <Link to="/" className="hover:font-bold">
                home
            </Link>{" "}
            / <span className="text-cbvt-blue hover:underline cursor-pointer">{prop.crumb}</span>
            </p>
        </div>  

        <div className="container mx-auto px-12 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-alegreya-sans-sc font-bold text-cbvt-navy capitalize">
            {prop.title}
            </h1>
        </div>
        </>
    )
}

export default BreadCrumbs;