import { Link, useLocation } from "react-router-dom";
import{MapPin, Calendar, Ellipsis, Circle, Trash2} from 'lucide-react';
import { useStat, useRef, useEffect } from "react";
import { useState } from "react";


export const CustomerCard = ({Name, Address, DateJoined, Email, Orders, TotalSpent, is_removed,onDelete}) => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const menuRef = useRef(null);

    // Local state for current customer data
    const [currentName, setCurrentName] = useState(Name);
    const [currentAddress, setCurrentAddress] = useState(Address);
    const [currentDateJoined, setCurrentDateJoined] = useState(DateJoined);
    const [currentEmail, setCurrentEmail] = useState(Email);
    const [currentOrders, setCurrentOrders] = useState(Orders);
    const [currentTotalSpent, setCurrentTotalSpent] = useState(TotalSpent);

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



//doesnt render soft deleted items
    if (is_removed === 1){
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