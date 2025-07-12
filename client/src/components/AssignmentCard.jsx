import { Link, useLocation } from "react-router-dom";
import{User, MapPin, Calendar, Clock} from 'lucide-react';

export const AssignmentCard = ({AssignmentID, Title, Description, AssignedPerson, CustomerName, Location, DueDate, EstimatedTime}) => {

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
                        <span className="text-cbvt-dark-gray">Assigned to: </span>
                        <span className="text-cbvt-hover-blue">{AssignedPerson}</span>
                    </p>
                </div>
                
                <div className="flex flex-row">
                    <User className="h-4 w-4 mb-3 text-gray-700 mr-4"/>
                    <p className="mt-[-4px]">
                        <span className="text-cbvt-dark-gray">Customer: </span>
                        <span className="text-cbvt-hover-blue">{CustomerName}</span>
                    </p>
                     </div>

                <div className="flex flex-row">
                    <MapPin className="h-4 w-4 mb-3 text-gray-700 mr-4"/>
                    <p className="mt-[-4px]">
                        <span className="text-cbvt-dark-gray">Location: </span>
                        <span className="text-cbvt-hover-blue">{Location}</span>
                    </p>
                     </div>

                <div className="flex flex-row">
                    <Calendar className="h-4 w-4 mb-3 text-gray-700 mr-4"/>
                    <p className="mt-[-4px]">
                        <span className="text-cbvt-dark-gray">Due Date: </span>
                        <span className="text-cbvt-hover-blue">{DueDate}</span>
                    </p>
                     </div>

                <div className="flex flex-row">
                    <Clock className="h-4 w-4 mb-3 text-gray-700 mr-4"/>
                    <p className="mt-[-4px]">
                        <span className="text-cbvt-dark-gray">Estimated time: </span>
                        <span className="text-cbvt-hover-blue">{EstimatedTime}</span>
                    </p>
                     </div>
    
                 </div>




        {/*continue here*/}
            <div className="border-t border-gray-300 my-4"></div>

            {/*buttons at the bottom*/}

            <div className="flex flex-row justify-center space-x-4 mt-[-5px]">

                <button className="border w-[230px] h-[38px] rounded-3xl border-gray-300 p-1 flex justify-center transition-all hover:bg-indigo-400 cursor-pointer focus:outline-none">
                    <p className="text-cbvt-dark-gray">Edit</p>
                </button>


                <div className="border w-[230px] h-[38px] rounded-3xl border-gray-300 p-1 flex justify-center transition-all hover:bg-red-400 cursor-pointer focus:outline-none">
                    <p className="text-cbvt-dark-gray">Delete</p>
                </div>

            </div>

        </div>

    );
};


