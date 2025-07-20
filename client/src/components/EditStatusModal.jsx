
import { useState, useEffect } from 'react';

export const EditStatusModal = ({ order_status: initialStatus, orderId, onStatusUpdate }) => { // Changed from key to orderId
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  

  // Update internal state when prop changes
  useEffect(() => {
    setSelectedStatus(initialStatus);
  }, [initialStatus]);

  const statusOptions = [
    'Pending',
    'Quotation Pending',
    'Quotation Sent',
    'Quotation Confirmed',
    'Quotation Rejected',
    'Cancelled',
    'Assigned'
  ];

  const handleSubmit = () => {
    if (selectedStatus && selectedStatus !== initialStatus) {
      console.log('Updating status for order:', orderId, 'to:', selectedStatus); // Debug log
      onStatusUpdate?.(orderId, selectedStatus);
    }
    setIsOpen(false);
  };

  return (
    <>
      <button 
        className="border w-[230px] h-[38px] rounded-3xl border-gray-300 text-cbvt-dark-gray p-1 flex justify-center transition-all hover:bg-indigo-400 cursor-pointer focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        Edit Status
      </button>

      {isOpen && (
        <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md z-50">
            <h2 className="text-xl font-semibold mb-4">Edit Order Status (Order #{orderId})</h2>
            
            <select
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            
            <div className="flex justify-center space-x-6 gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-3xl shadow-md text-gray-700 hover:bg-gray-200 hover:cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="border w-[230px] h-[38px] rounded-3xl border-cbvt-navy shadow-md p-1 flex justify-center bg-cbvt-navy text-white transition-all hover:!bg-white hover:cursor-pointer hover:text-[rgb(15_40_81)] focus:outline-none"
                disabled={!selectedStatus || selectedStatus === initialStatus}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>

        </div>
      )}
    </>
  );
};