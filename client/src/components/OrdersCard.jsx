import { useState } from "react";
import { User, Calendar, DollarSign, Boxes, Loader } from 'lucide-react';
import { EditStatusModal } from "./EditStatusModal";

export const OrdersCard = ({ 
  OrderID, 
  Title, 
  Description, 
  Customer, 
  Quantity, 
  Amount, 
  OrderDate, 
  DeliveryDate, 
  order_status,
  onStatusUpdate, // Add this prop to receive update function from parent
  onDelete // Add this prop for delete functionality
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(OrderID); // Pass the OrderID to delete
    setIsDeleteOpen(false);
  };

  // Status update handler now just forwards to parent
  const handleStatusUpdate = (orderId, newStatus) => {
    onStatusUpdate(orderId, newStatus);
  };

  return (
    <div className="bg-white w-[535px] border border-gray-200 rounded-xl shadow-lg p-8">
      {/* Container for title and description */}
      <div className="flex flex-col">
        <p className="text-cbvt-navy font-alegreya-sans-sc font-semibold text-2xl pb-2">{Title}</p>
        <p className="text-cbvt-dark-gray text-s pb-8">{Description}</p>
      </div>

      {/* Container for data */}
      <div className="flex flex-col">
        {/* Customer */}
        <div className="flex flex-row">
          <User className="h-4 w-4 mb-3 text-gray-700 mr-4"/>
          <p className="mt-[-4px]">
            <span className="text-cbvt-dark-gray">Customer: </span>
            <span className="text-cbvt-hover-blue">{Customer}</span>
          </p>
        </div>
        
        {/* Quantity */}
        <div className="flex flex-row">
          <Boxes className="h-4 w-4 mb-3 text-gray-700 mr-4"/>
          <p className="mt-[-4px]">
            <span className="text-cbvt-dark-gray">Quantity: </span>
            <span className="text-cbvt-hover-blue">{Quantity}</span>
          </p>
        </div>

        {/* Amount */}
        <div className="flex flex-row">
          <DollarSign className="h-4 w-4 mb-3 text-gray-700 mr-4"/>
          <p className="mt-[-4px]">
            <span className="text-cbvt-dark-gray">Amount: </span>
            <span className="text-cbvt-hover-blue">{Amount}</span>
          </p>
        </div>

        {/* Order Date */}
        <div className="flex flex-row">
          <Calendar className="h-4 w-4 mb-3 text-gray-700 mr-4"/>
          <p className="mt-[-4px]">
            <span className="text-cbvt-dark-gray">Order Date: </span>
            <span className="text-cbvt-hover-blue">{OrderDate}</span>
          </p>
        </div>

        {/* Delivery Date */}
        <div className="flex flex-row">
          <Calendar className="h-4 w-4 mb-3 text-gray-700 mr-4"/>
          <p className="mt-[-4px]">
            <span className="text-cbvt-dark-gray">Delivery Date: </span>
            <span className="text-cbvt-hover-blue">{DeliveryDate}</span>
          </p>
        </div>

        {/* Status */}
        <div className="flex flex-row">
          <Loader className="h-4 w-4 mb-3 text-gray-700 mr-4"/>
          <p className="mt-[-4px]">
            <span className="text-cbvt-dark-gray font-semibold">Status: </span>
            <span className="text-green-600">{order_status}</span>
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-4"></div>

      {/* Buttons at the bottom */}
      <div className="flex flex-row justify-center space-x-4 mt-[-5px]">
        <EditStatusModal 
          order_status={order_status}
          onStatusUpdate={handleStatusUpdate}
          orderId={OrderID}
        />

        <button 
          className="border w-[230px] h-[38px] rounded-3xl border-gray-300 p-1 flex justify-center transition-all hover:bg-red-400 cursor-pointer focus:outline-none"
          onClick={() => setIsDeleteOpen(true)}
        >
          <p className="text-cbvt-dark-gray">Delete</p>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this order?</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-3xl"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-3xl hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};