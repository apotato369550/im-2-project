import React, { useState } from 'react';

const ApplyModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* This button stays */}
      <button 
        onClick={() => setIsOpen(true)}
        className="border-[0.5px] border-[rgb(15_40_81)] bg-cbvt-navy text-white w-[100px] h-[30px] px-3 rounded-3xl text-sm flex-shrink-0 hover:bg-cbvt-hover-blue transition-colors
                              hover:!bg-white hover:text-cbvt-navy transition-colors  hover:cursor-pointer"
      >
        Apply
      </button>

      {/* Modal will render when isOpen=true */}
      {isOpen && (
        <div className="modal">
            <div className="overlay"> </div>
            <div className="modal-content">
                  <p className="text-gray-600">
              Please review your application details before submitting.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

             <div className="bg-gray-50 px-4 py-3 flex justify-end gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-3xl shadow-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button className="border w-[230px] h-[38px] rounded-3xl border-[rgb(15_40_81)] shadow-md p-1 flex justify-center bg-cbvt-navy text-white transition-all hover:!bg-white cursor-pointer hover:text-[rgb(15_40_81)] focus:outline-none">
                    Submit Application
                </button>
          </div>
            </div>
        </div>
        
      )}
    </>
  );
};

export default ApplyModal;