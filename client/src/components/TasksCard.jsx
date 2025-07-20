import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Calendar, MapPin, Send } from 'lucide-react';
import axios from 'axios';

export const TaskCard = ({TaskID, Title, Description, Price, StartDate, Location, Notes, OrderId, onTaskUpdate}) => {
    const [statusUpdate, setStatusUpdate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const userData = JSON.parse(localStorage.getItem('user_data'));

    // Check if task is completed based on Description
    const isCompleted = Description && (Description.toLowerCase() === 'completed' || Description === 'Completed');

    const handleStatusUpdate = async (updateMessage) => {
        setIsSubmitting(true);
        setSubmitSuccess(false);

        const payload = {
          order_id: OrderId,
          assignment_status: updateMessage
        };
        console.log(payload.order_id);

        try {
            const response = await axios.put(`http://localhost/im-2-project/api/assignments/editStatus/${TaskID}`, payload, {
                headers:{
                    Authorization: "Bearer " + userData.token
                }
            });
            
            setStatusUpdate('');
            setSubmitSuccess(true);
            
            // Call the callback to update parent component
            if (onTaskUpdate) {
                onTaskUpdate(TaskID, updateMessage);
            }
            
            setTimeout(() => setSubmitSuccess(false), 3000);
        } catch (err) {
            console.log(err);
            setSubmitSuccess(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCompleteTask = async () => {
        setIsSubmitting(true);
 
        try {
            console.log('Completing task:', TaskID);
            const payload = {
                order_id: OrderId,
                assignment_status: 'Completed'
            };
            
            const response = await axios.put(`http://localhost/im-2-project/api/assignments/editStatus/${TaskID}`, payload, {
                headers:{
                    Authorization: "Bearer " + userData.token
                }
            });
            
            // Call the callback to update parent component
            if (onTaskUpdate) {
                onTaskUpdate(TaskID, 'Completed');
            }
            
        } catch (error) {
            console.error('Error completing task:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        if (statusUpdate.trim()) {
            handleStatusUpdate(statusUpdate.trim());
        }
    };            
   
    return(
        <div className="relative border border-gray-200 shadow-lg bg-white p-6 rounded-xl flex flex-col">
            {/* Main card content */}
            <div>
                {/* Title */}
                <div className="flex justify-between items-center flex-row"> 
                    <p className="font-alegreya-sans-sc text-cbvt-navy font-semibold text-2xl pb-4">{Title}</p>
                    <p className="font-alegreya-sans-sc text-cbvt-navy font-semibold text-lg">{Price}</p>
                </div>

                {/* Date and location */}
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

                {/* Status update here */}
                <form onSubmit={handleSubmitUpdate} className="mb-4">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={statusUpdate}
                            onChange={(e) => setStatusUpdate(e.target.value)}
                            placeholder="Enter status update..."
                            className="flex-1 p-2 border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-cbvt-navy focus:border-transparent"
                            disabled={isSubmitting || isCompleted}
                        />
                        <button
                            type="submit"
                            disabled={!statusUpdate.trim() || isSubmitting || isCompleted}
                            className="p-2 bg-cbvt-navy text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                    {submitSuccess && (
                      <div className="text-green-600 text-sm font-carme mt-2">Status update sent successfully!</div>
                    )}
                </form>

                {/* Action buttons */}
                <div className="flex flex-row items-center space-x-4"> 
                    <button 
                        onClick={handleCompleteTask}
                        disabled={isSubmitting || isCompleted}
                        className="border border-[rgb(15_40_81)] p-1 rounded-3xl w-[120px] bg-cbvt-navy shadow-sm text-white
                                   hover:cursor-pointer hover:!bg-white transition-colors hover:!text-[rgb(15_40_81)]
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Loading...' : 'Complete'}
                    </button>
                </div>
            </div>

            {/* Blurred Completed Overlay */}
            {isCompleted && (
                <div className="absolute inset-0 rounded-xl flex items-center justify-center z-10 pointer-events-none" 
                     style={{
                         background: 'rgba(255, 255, 255, 0.4)',
                         backdropFilter: 'blur(2px)',
                         WebkitBackdropFilter: 'blur(2px)'
                     }}>
                    <div className="text-center bg-white bg-opacity-80 px-6 py-4 rounded-lg shadow-lg">
                        <div className="text-4xl font-bold text-green-600 mb-2">✓</div>
                        <div className="text-2xl font-semibold text-green-600">COMPLETED</div>
                    </div>
                </div>
            )}
        </div>
    );
};