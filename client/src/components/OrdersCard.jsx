import { Link, useLocation } from "react-router-dom";
import{User, Calendar, DollarSign, Boxes} from 'lucide-react';
import { EditStatusModal } from "./EditStatusModal";
import { useState } from "react";
import { Loader } from "lucide-react";

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
  onDelete, // Add this prop for delete functionality
  onCreateAssignment, // Add this prop for creating assignments
  is_removed
}) => {

//for soft delete!!
if (is_removed === 1) {
    return null;
  }

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(OrderID, { is_removed: 1 }); // Pass the OrderID and update object for soft delete
    setIsDeleteOpen(false);
  };

  // Status update handler now just forwards to parent
  const handleStatusUpdate = (orderId, newStatus) => {
    onStatusUpdate(orderId, newStatus);
  };

  // Handle creating assignment
  const handleCreateAssignment = () => {
    // Update the order status to "Assigned"
    onStatusUpdate(OrderID, "Assigned");
    
    // If there's a callback for creating assignments, call it
    if (onCreateAssignment) {
      onCreateAssignment(OrderID, {
        Title,
        Description,
        Customer,
        Quantity,
        Amount,
        OrderDate,
        DeliveryDate
      });
    }
    
    setIsAssignmentOpen(false);
  };

  // Check if order can be converted to assignment
  const canCreateAssignment = order_status === "Quotation Confirmed";

    return(
        //main card
        <div className="bg-white h-[347px] w-[535px] border border-gray-200 rounded-xl shadow-lg p-8">
            
            {/*container for title and description*/}
            <div className="flex flex-col">
                <p className="text-cbvt-navy font-alegreya-sans-sc font-semibold text-2xl pb-2">{Title}</p>
                <p className="text-cbvt-dark-gray text-s pb-8">{Description}</p>
            </div>

            {/*container for data*/}
            <div className="flex flex-col">
                <div className="flex flex-row ">
                    <User className="h-4 w-4 mb-3 text-gray-700 mr-4"/>
                    <p className="mt-[-4px]">
                        <span className="text-cbvt-dark-gray">Customer: </span>
                        <span className="text-cbvt-hover-blue">{Customer}</span>
                    </p>
                </div>
                
                <div className="flex flex-row">
                    <Boxes className="h-4 w-4 mb-3 text-gray-700 mr-4"/>
                    <p className="mt-[-4px]">
                        <span className="text-cbvt-dark-gray">Quantity: </span>
                        <span className="text-cbvt-hover-blue">{Quantity}</span>
                    </p>
                     </div>

                <div className="flex flex-row">
                    <DollarSign className="h-4 w-4 mb-3 text-gray-700 mr-4"/>
                    <p className="mt-[-4px]">
                        <span className="text-cbvt-dark-gray">Amount: </span>
                        <span className="text-cbvt-hover-blue">{Amount}</span>
                    </p>
                     </div>

                <div className="flex flex-row">
                    <Calendar className="h-4 w-4 mb-3 text-gray-700 mr-4"/>
                    <p className="mt-[-4px]">
                        <span className="text-cbvt-dark-gray">Order Date: </span>
                        <span className="text-cbvt-hover-blue">{OrderDate}</span>
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




        <div className="flex flex-col space-y-3">
        {/* Assignment Button - Only show when status is "Quotation Confirmed" */}
        {canCreateAssignment && (
          <div className="flex justify-center">
            <button 
              className="border w-[480px] h-[38px] rounded-3xl border-green-500 bg-green-500 text-white p-1 mb-[-12px] flex justify-center items-center transition-all hover:bg-green-600 cursor-pointer focus:outline-none"
              onClick={() => setIsAssignmentOpen(true)}
            >
              <UserCheck className="h-4 w-4 mr-2"/>
              <span>Create Assignment</span>
            </button>
          </div>
        )}

        <div className="border-t border-gray-300 my-4"></div>

        {/* Regular buttons */}
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
      </div>

      {/* Assignment Confirmation Modal */}
      {isAssignmentOpen && (
        <div className="modal"> 
            <div className="overlay"></div>
            <div className="modal-content">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create Assignment</h3>
            <p className="mb-4">
              This will convert Order #{OrderID} into an assignment and change the status to "Assigned".
              <br/><br/>
              <strong>Order Details:</strong><br/>
              • Service: {Title}<br/>
              • Customer: {Customer}<br/>
              • Amount: {Amount}
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsAssignmentOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-3xl"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateAssignment}
                className="px-4 py-2 bg-green-500 text-white rounded-3xl hover:bg-green-600"
              >
                Create Assignment
              </button>
            </div>
          </div>
          </div>
        </div>
      )}

       {/* Delete Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="overlay"></div>
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-cbvt-navy mb-6 text-center font-alegreya-sans-sc">
                Are you sure you want to delete this product?
              </h2>
              <div className="bg-gray-50 px-4 py-3 flex justify-end gap-3">
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-3xl shadow-md text-gray-700 hover:bg-gray-200 hover:cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="border w-[230px] h-[38px] rounded-3xl border-[rgb(15_40_81)] shadow-md p-1 flex justify-center bg-cbvt-navy text-white transition-all hover:!bg-white hover:cursor-pointer hover:text-[rgb(15_40_81)] focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    );
};


