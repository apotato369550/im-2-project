import { Link, useLocation } from "react-router-dom";
import{User, Calendar, DollarSign, Boxes, UserCheck, Edit} from 'lucide-react';
import { EditStatusModal } from "./EditStatusModal";
import { useState } from "react";
import { Loader } from "lucide-react";
import axios from 'axios';

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
  onUpdateQuotation, // Add this prop for updating quotations
  serviceId,
  is_removed
}) => {

//for soft delete!!
if (is_removed === 1) {
    return null;
  }

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);
  const [isQuotationOpen, setIsQuotationOpen] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({
    assignmentDetails: '',
    assignmentDue: ''
  });
  const [quotationForm, setQuotationForm] = useState({
    totalPayment: Amount || '',
    description: ''
  });

  const handleDeleteConfirm = () => {
    onDelete(OrderID, { is_removed: 1 }); // Pass the OrderID and update object for soft delete
    setIsDeleteOpen(false);
  };
  // Status update handler now just forwards to parent
  const handleStatusUpdate = (orderId, newStatus) => {
    onStatusUpdate(orderId, newStatus);
  };

  // Handle assignment form changes
  const handleAssignmentFormChange = (e) => {
    const { name, value } = e.target;
    setAssignmentForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle creating assignment
  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('user_data'))
    
    // Validate that assignment details are provided
    if (!assignmentForm.assignmentDetails.trim()) {
      alert('Please enter assignment details');
      return;
    }

    // Validate that assignment due date is provided
    if (!assignmentForm.assignmentDue) {
      alert('Please select an assignment due date');
      return;
    }

    axios.post('http://localhost/im-2-project/api/assignments/create', {
      order_id: OrderID,
      assignment_details: assignmentForm.assignmentDetails,
      assignment_due: assignmentForm.assignmentDue
    }, {
      headers: {
        Authorization: "Bearer " + userData.token
      }
    })
    .then((response) => {
      // Update the order status to "Assigned"
      onStatusUpdate(OrderID, "Assignment Created");
      
      // If there's a callback for creating assignments, call it
      if (onCreateAssignment) {
        onCreateAssignment(OrderID, {
          Title,
          Description,
          Customer,
          Quantity,
          Amount,
          OrderDate,
          DeliveryDate,
          assignmentDetails: assignmentForm.assignmentDetails,
          assignmentDue: assignmentForm.assignmentDue
        });
      }
      
      setIsAssignmentOpen(false);
      setAssignmentForm({ assignmentDetails: '', assignmentDue: '' });
    })
    .catch((err) => {
      console.error('Error creating assignment:', err);
      alert('Failed to create assignment. Please try again.');
    });
  };

  const closeAssignmentModal = () => {
    setIsAssignmentOpen(false);
    setAssignmentForm({ assignmentDetails: '', assignmentDue: '' });
  };

  // Handle quotation form changes
  const handleQuotationFormChange = (e) => {
    const { name, value } = e.target;
    setQuotationForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle quotation update
  const handleUpdateQuotation = (e) => {
    const userData = JSON.parse(localStorage.getItem('user_data'))
    e.preventDefault();

  axios.post('http://localhost/im-2-project/api/quotations/create', {
    total_payment: quotationForm.totalPayment,
    description: quotationForm.description,
    order_id: OrderID
  }, {
    headers:{
      Authorization: "Bearer " + userData.token 
    }
  })
  .then((response)=>{
    const formattedAmount = `Php ${parseFloat(quotationForm.totalPayment).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

    if (onUpdateQuotation) {
      onUpdateQuotation(OrderID, {
        Amount: formattedAmount,
        description: quotationForm.description
      });
    }
    onStatusUpdate(OrderID, "Quotation Confirmed");
    setIsQuotationOpen(false);
    setQuotationForm({ totalPayment: Amount || '', description: '' });
  })
  .catch((err)=>{
    console.log(err);
  })
    
  };

  const closeQuotationModal = () => {
    setIsQuotationOpen(false);
    setQuotationForm({ totalPayment: Amount || '', description: '' });
  };

  // Check if order can be converted to assignment
  const canCreateAssignment = order_status === "Quotation Confirmed" && Title !== "Retail";
  
  // Check if quotation can be edited
  const canEditQuotation = ["Pending", "Quotation Pending", "Quotation Sent"].includes(order_status);

    return(
        //main card
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8" style={{height: canCreateAssignment || canEditQuotation ? '420px' : '347px', width: '535px'}}>
            
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

        <div className="flex flex-col space-y-3 mt-6">
        {/* Special Action Buttons - Only show one at a time */}
        {canCreateAssignment && (
          <div className="flex justify-center mb-3">
            <button 
              className="border w-[470px] h-[38px] rounded-3xl border-green-500 bg-green-500 text-white p-1 flex justify-center items-center transition-all hover:bg-green-600 cursor-pointer focus:outline-none"
              onClick={() => setIsAssignmentOpen(true)}
            >
              <UserCheck className="h-4 w-4 mr-2"/>
              <span>Create Assignment</span>
            </button>
          </div>
        )}

        {canEditQuotation && (
          <div className="flex justify-center mb-3">
            <button 
              className="border w-[470px] h-[38px] rounded-3xl border-blue-500 bg-blue-500 text-white p-1 flex justify-center items-center transition-all hover:bg-blue-600 cursor-pointer focus:outline-none"
              onClick={() => setIsQuotationOpen(true)}
            >
              <Edit className="h-4 w-4 mr-2"/>
              <span>Edit Quotation</span>
            </button>
          </div>
        )}

        {/* Divider - only show if there are special buttons */}
        {(canCreateAssignment || canEditQuotation) && (
          <div className="border-t border-gray-300 my-4"></div>
        )}

        {/* Regular buttons */}
        <div className="flex flex-row justify-center space-x-4">
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

      {/* Assignment Creation Modal */}
      {isAssignmentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="relative w-full max-w-2xl mx-auto bg-white rounded-[24px] p-8 shadow-2xl">
            <button 
              onClick={closeAssignmentModal} 
              className="absolute top-4 right-4 text-gray-400 hover:text-cbvt-navy text-2xl font-bold focus:outline-none" 
              aria-label="Close"
            >
              ×
            </button>
            
            <h2 className="font-alegreya-sans-sc text-cbvt-navy text-2xl font-semibold mb-6">
              Create Assignment - Order #{OrderID}
            </h2>
            
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Order Details:</strong><br/>
                • Service: {Title}<br/>
                • Customer: {Customer}<br/>
                • Amount: {Amount}
              </p>
            </div>
            
            <form onSubmit={handleCreateAssignment} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block font-carme text-cbvt-navy mb-2">
                    Assignment Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="assignmentDetails"
                    value={assignmentForm.assignmentDetails}
                    onChange={handleAssignmentFormChange}
                    rows={4}
                    className="w-full border rounded-lg p-3 text-cbvt-navy focus:outline-none focus:ring-2 focus:ring-cbvt-blue resize-vertical"
                    placeholder="Enter specific details and requirements for this assignment..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block font-carme text-cbvt-navy mb-2">
                    Assignment Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="assignmentDue"
                    value={assignmentForm.assignmentDue}
                    onChange={handleAssignmentFormChange}
                    className="w-full border rounded-lg p-3 text-cbvt-navy focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-center space-x-4 pt-4">
                <button
                  type="button"
                  onClick={closeAssignmentModal}
                  className="px-6 py-2 border border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition font-semibold"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Quotation Modal */}
      {isQuotationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="relative w-full max-w-2xl mx-auto bg-white rounded-[24px] p-8 shadow-2xl">
            <button 
              onClick={closeQuotationModal} 
              className="absolute top-4 right-4 text-gray-400 hover:text-cbvt-navy text-2xl font-bold focus:outline-none" 
              aria-label="Close"
            >
              ×
            </button>
            
            <h2 className="font-alegreya-sans-sc text-cbvt-navy text-2xl font-semibold mb-6">
              Edit Quotation - Order #{OrderID}
            </h2>
            
            <form onSubmit={handleUpdateQuotation} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block font-carme text-cbvt-navy mb-2">
                    Total Payment
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="totalPayment"
                    value={quotationForm.totalPayment}
                    onChange={handleQuotationFormChange}
                    className="w-full border rounded-lg p-3 text-cbvt-navy focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                    placeholder="Enter total payment amount"
                    required
                  />
                </div>
                
                <div>
                  <label className="block font-carme text-cbvt-navy mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={quotationForm.description}
                    onChange={handleQuotationFormChange}
                    rows={4}
                    className="w-full border rounded-lg p-3 text-cbvt-navy focus:outline-none focus:ring-2 focus:ring-cbvt-blue resize-vertical"
                    placeholder="Detail the changes/charges of the order..."
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-center space-x-4 pt-4">
                <button
                  type="button"
                  onClick={closeQuotationModal}
                  className="px-6 py-2 border border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-cbvt-navy text-white rounded-2xl hover:bg-cbvt-blue transition font-semibold"
                >
                  Update Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

       {/* Delete Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
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