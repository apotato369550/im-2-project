import { Link, useLocation } from "react-router-dom";
import{User, MapPin, Calendar, Clock} from 'lucide-react';
import { useState } from "react";

export const AssignmentCard = ({AssignmentID, Title, Description, AssignedPerson, CustomerName, Location, DueDate, onDelete, onEdit}) => {
 // for the ellipsis menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const menuRef = useRef(null);

    // Local state for current customer data
    const [currentName, setCurrentName] = useState(Name);
    const [currentAddress, setCurrentAddress] = useState(Address);
    const [currentDateJoined, setCurrentDateJoined] = useState(DateJoined);
    const [currentEmail, setCurrentEmail] = useState(Email);
    const [currentOrders, setCurrentOrders] = useState(Orders);
    const [currentTotalSpent, setCurrentTotalSpent] = useState(TotalSpent);

    // Edit form state
    const [editName, setEditName] = useState(Name);
    const [editAddress, setEditAddress] = useState(Address);
    const [editDateJoined, setEditDateJoined] = useState(DateJoined);
    const [editEmail, setEditEmail] = useState(Email);
    const [editOrders, setEditOrders] = useState(Orders);
    const [editTotalSpent, setEditTotalSpent] = useState(TotalSpent);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle soft delete
    const handleDeleteConfirm = () => {
        onDelete(CustomerID);
        setIsDeleteOpen(false);
        setIsMenuOpen(false);
    };

    // Handle edit
    const handleEditConfirm = () => {
        // Update local state
        setCurrentName(editName);
        setCurrentAddress(editAddress);
        setCurrentDateJoined(editDateJoined);
        setCurrentEmail(editEmail);
        setCurrentOrders(editOrders);
        setCurrentTotalSpent(editTotalSpent);

        // Call parent update function
        if (onEdit) {
            onEdit(CustomerID, {
                Name: editName,
                Address: editAddress,
                DateJoined: editDateJoined,
                Email: editEmail,
                Orders: editOrders,
                TotalSpent: editTotalSpent
            });
        }

        setIsEditOpen(false);
        setIsMenuOpen(false);
    };

    const handleEditCancel = () => {
        // Reset edit form to current values
        setEditName(currentName);
        setEditAddress(currentAddress);
        setEditDateJoined(currentDateJoined);
        setEditEmail(currentEmail);
        setEditOrders(currentOrders);
        setEditTotalSpent(currentTotalSpent);
        setIsEditOpen(false);
        setIsMenuOpen(false);
    };

    // Don't render if soft deleted
    if (is_removed === 1) {
        return null;
    }


    return(
        <div className="bg-white w-[349px] h-[264px] rounded-xl border border-gray-200 shadow-lg p-8">
            <div className="flex flex-wrap flex-row"> 
            <Circle className="h-[50px] w-[50px] text-gray-300 fill-current"/>
                <div className="flex flex-col ml-3">
                <p className="text-cbvt-navy font-alegreya-sans-sc font-semibold text-lg mb-[-4px]">{currentName}</p>
                <p className="text-cbvt-dark-gray text-xs">{currentEmail}</p>
                </div>
            
            {/* Ellipsis Menu */}
            <div className="relative ml-auto" ref={menuRef}>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <Ellipsis className="h-5 w-5 text-cbvt-dark-gray"/>
                </button>
                
                {isMenuOpen && (
                    <div className="absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <button 
                            onClick={() => setIsEditOpen(true)}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                        </button>
                        <button 
                            onClick={() => setIsDeleteOpen(true)}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center text-red-600"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </button>
                    </div>
                )}
            </div>
            </div>

           <div className="flex flex-col mt-8 ml-2">
                <div className="flex flex-row"> 
                <MapPin strokeWidth={2} className="h-5 w-5 text-cbvt-gray "/> 
                <p className="ml-3 mt-[-2px] text-cbvt-dark-gray">{currentAddress}</p>
                </div>

                <div className="flex flex-row"> 
                <Calendar className="h-5 w-5 mt-5 text-cbvt-gray"/>
                <p className="ml-4 mt-4 text-cbvt-dark-gray">{currentDateJoined}</p>
                </div>
            </div> 

            <div className="border-t border-gray-300 my-4"></div>

            <div className="flex flex-row justify-center mt-[-5px] space-x-20">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-cbvt-navy font-alegreya-sans-sc font-semibold text-2xl">{currentOrders}</p>
                    <p className="font-carme text-cbvt-dark-gray text-xs mt-[-4px]">Orders</p>
                </div>

                <div className="flex flex-col justify-center items-center mt-[-1px]">
                    <p className="text-cbvt-navy font-alegreya-sans-sc font-semibold text-2xl">{currentTotalSpent}</p>
                    <p className="font-carme text-cbvt-dark-gray text-xs mt-[-4px]">Total Spent</p>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="overlay"></div>
                    <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-cbvt-navy mb-6 text-center font-alegreya-sans-sc">
                                Edit Customer
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-cbvt-dark-gray mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cbvt-navy"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cbvt-dark-gray mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={editEmail}
                                        onChange={(e) => setEditEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cbvt-navy"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cbvt-dark-gray mb-2">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        value={editAddress}
                                        onChange={(e) => setEditAddress(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cbvt-navy"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cbvt-dark-gray mb-2">
                                        Date Joined
                                    </label>
                                    <input
                                        type="text"
                                        value={editDateJoined}
                                        onChange={(e) => setEditDateJoined(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cbvt-navy"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cbvt-dark-gray mb-2">
                                        Orders
                                    </label>
                                    <input
                                        type="number"
                                        value={editOrders}
                                        onChange={(e) => setEditOrders(parseInt(e.target.value) || 0)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cbvt-navy"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cbvt-dark-gray mb-2">
                                        Total Spent
                                    </label>
                                    <input
                                        type="text"
                                        value={editTotalSpent}
                                        onChange={(e) => setEditTotalSpent(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cbvt-navy"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={handleEditCancel}
                                    className="px-4 py-2 border border-gray-300 rounded-3xl shadow-md text-gray-700 hover:bg-gray-200 hover:cursor-pointer transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEditConfirm}
                                    className="px-6 py-2 bg-cbvt-navy text-white rounded-3xl shadow-md hover:bg-blue-800 hover:cursor-pointer transition-colors"
                                >
                                    Save Changes
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
                                Are you sure you want to delete this customer?
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


