import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Calendar, MapPin, Clock, Truck, Wrench, Settings, Package, CheckCircle, Pause, Check } from 'lucide-react';
import StatusUpdateModal from './StatusUpdateModal';

export const TaskCard = ({ TaskID, Title, Description, Price, StartDate, Location, Notes, is_removed, status = 'pending', onStatusUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status);

    // Doesn't render soft deleted items
    if (is_removed === 1) {
        return null;
    }

    // Status configuration
    const statusConfig = {
        pending: { 
            label: 'Pending', 
            icon: Clock, 
            color: 'text-yellow-700 bg-yellow-100 border-yellow-300',
            textColor: 'text-yellow-700'
        },
        en_route: { 
            label: 'En Route', 
            icon: Truck, 
            color: 'text-blue-700 bg-blue-100 border-blue-300',
            textColor: 'text-blue-700'
        },
        on_site: { 
            label: 'On Site', 
            icon: MapPin, 
            color: 'text-purple-700 bg-purple-100 border-purple-300',
            textColor: 'text-purple-700'
        },
        repairing: { 
            label: 'Repairing', 
            icon: Wrench, 
            color: 'text-orange-700 bg-orange-100 border-orange-300',
            textColor: 'text-orange-700'
        },
        installing: { 
            label: 'Installing', 
            icon: Settings, 
            color: 'text-indigo-700 bg-indigo-100 border-indigo-300',
            textColor: 'text-indigo-700'
        },
        maintaining: { 
            label: 'Maintaining', 
            icon: Settings, 
            color: 'text-teal-700 bg-teal-100 border-teal-300',
            textColor: 'text-teal-700'
        },
        delivering: { 
            label: 'Delivering', 
            icon: Package, 
            color: 'text-cyan-700 bg-cyan-100 border-cyan-300',
            textColor: 'text-cyan-700'
        },
        final_checks: { 
            label: 'Final Checks', 
            icon: CheckCircle, 
            color: 'text-lime-700 bg-lime-100 border-lime-300',
            textColor: 'text-lime-700'
        },
        completed: { 
            label: 'Completed', 
            icon: Check, 
            color: 'text-green-700 bg-green-100 border-green-300',
            textColor: 'text-green-700'
        },
        on_hold: { 
            label: 'On Hold', 
            icon: Pause, 
            color: 'text-red-700 bg-red-100 border-red-300',
            textColor: 'text-red-700'
        }
    };

    const currentStatusConfig = statusConfig[currentStatus] || statusConfig.pending;
    const StatusIcon = currentStatusConfig.icon;

    const handleStatusUpdate = (taskId, newStatus) => {
        setCurrentStatus(newStatus);
        // Call parent component's callback if provided
        if (onStatusUpdate) {
            onStatusUpdate(taskId, newStatus);
        }
    };

    const handleCompleteClick = () => {
        if (currentStatus === 'completed') {
            // If already completed, just close any modal
            return;
        }
        // Set to completed directly
        handleStatusUpdate(TaskID, 'completed');
    };

    const handlePauseClick = () => {
        if (currentStatus === 'on_hold') {
            // If already on hold, maybe resume to pending
            handleStatusUpdate(TaskID, 'pending');
        } else {
            // Set to on hold
            handleStatusUpdate(TaskID, 'on_hold');
        }
    };

    return (
        <>
            {/* Task Card */}
            <div className="border border-gray-200 shadow shadow-lg bg-white p-6 rounded-xl flex flex-col">
                {/* Title and Price */}
                <div className="flex justify-between items-center flex-row"> 
                    <p className="font-alegreya-sans-sc text-cbvt-navy font-semibold text-2xl pb-4">{Title}</p>
                    <p className="font-alegreya-sans-sc text-cbvt-navy font-semibold text-lg">{Price}</p>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                    <div className={`
                        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border
                        ${currentStatusConfig.color}
                    `}>
                        <StatusIcon className="h-4 w-4 mr-2" />
                        {currentStatusConfig.label}
                    </div>
                </div>

                {/* Date and Location */}
                <div className="flex items-center flex-row">
                    <Calendar className="h-4 w-4 text-gray-600"/>
                    <p className="pl-3 text-cbvt-dark-gray">{StartDate}</p>
                </div>

                <div className="flex items-center flex-row">
                    <MapPin className="h-4 w-4 text-gray-600"/>
                    <p className="pl-3 text-cbvt-dark-gray pb-2">{Location}</p>
                </div>

                {/* Notes */}
                <div className="p-3 bg-gray-50 rounded-xl mb-4">
                    <p>
                        <span className="text-cbvt-dark-gray font-semibold">Notes:</span>
                        <span className="pl-2 text-cbvt-dark-gray">{Notes}</span>
                    </p>
                </div>

                {/* Buttons at the bottom */}
                <div className="flex flex-row items-center space-x-4 mt-auto"> 
                    <button 
                        onClick={handlePauseClick}
                        className={`
                            border p-1 rounded-3xl w-[70px] shadow-sm transition-colors
                            ${currentStatus === 'on_hold' 
                                ? 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100' 
                                : 'border-gray-200 bg-white text-cbvt-dark-gray hover:bg-gray-200'
                            }
                        `}
                    >
                        {currentStatus === 'on_hold' ? 'Resume' : 'Pause'}
                    </button>

                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="border border-blue-500 p-1 rounded-3xl w-30 bg-blue-50 shadow-sm text-blue-700
                                    hover:cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                        Update Status
                    </button>

                    <button 
                        onClick={handleCompleteClick}
                        className={`
                            border p-1 rounded-3xl w-[120px] shadow-sm transition-colors
                            ${currentStatus === 'completed'
                                ? 'border-green-500 bg-green-500 text-white cursor-default'
                                : 'border-cbvt-navy bg-cbvt-navy text-white hover:bg-white hover:text-cbvt-navy'
                            }
                        `}
                        disabled={currentStatus === 'completed'}
                    >
                        {currentStatus === 'completed' ? 'Completed ✓' : 'Complete'}
                    </button>
                </div>
            </div>

            {/* Status Update Modal */}
            <StatusUpdateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                taskId={TaskID}
                currentStatus={currentStatus}
                onStatusUpdate={handleStatusUpdate}
            />
        </>
    );
};