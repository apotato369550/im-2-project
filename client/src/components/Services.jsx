import React from 'react';
import ServiceCard from './ServiceCard';
import repair from '../assets/images/repair.jpg';
import installation from '../assets/images/installation.jpg';
import retail from '../assets/images/retail.png';

const Services = () => {
  return (
    <>
    
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="text-start mb-8 md:mb-16">
          <h3 className="text-4xl font-khand font-bold text-cbvt-navy capitalize mb-4">
            Check out our services!
          </h3>
          <p className="text-[19px] font-ibm-plex-sans text-cbvt-muted">
            Explore our full range of air-conditioning services—from
            installation to maintenance—tailored to meet your needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Repair Card */}
          <ServiceCard title="Repair" desc="Fast, reliable airconditioner fixes." src={repair} btn="book now!"/>
          <ServiceCard title="Installation" desc="Expert airconditioner setup." src={installation} btn="book now!"/>
          <ServiceCard title="Retail" desc="Top-brand units for sale." src={retail} btn="shop now!"/>

          
        </div>
    </div>

    </>
  )
}

export default Services