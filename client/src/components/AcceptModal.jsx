import React, { useState } from 'react';

const AcceptModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* This button stays */}
      <button 
        onClick={() => setIsOpen(true)}
        className="border-[0.5px] border-[rgb(15_40_81)] bg-cbvt-navy text-white w-[100px] h-[30px] px-3 rounded-3xl text-sm flex-shrink-0 hover:bg-cbvt-hover-blue transition-colors
                              hover:!bg-white hover:!text-[rgb(15_40_81)] transition-colors  hover:cursor-pointer"
      >
        Accept
      </button>

      {/* Modal will render when isOpen=true */}
      {isOpen && (
        
            <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content"> 
                <h2 className='text-cbvt-navy font-alegreya-sans-sc text-lg font-semibold'>Are you sure you want to accept this assignment?</h2>
             <div className=" px-4 py-3 flex justify-end gap-3">
                
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-3xl shadow-md text-gray-700 hover:bg-gray-200 hover:cursor-pointer transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="border w-[230px] h-[38px] rounded-3xl border-[rgb(15_40_81)] shadow-md p-1 flex justify-center bg-cbvt-navy text-white transition-all hover:!bg-white hover:cursor-pointer hover:text-[rgb(15_40_81)] focus:outline-none">
                            Confirm Submission
                        </button>
          </div>
        </div>
        </div>
        
      )}
    </>
  );
};

export default AcceptModal;