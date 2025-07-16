import { Link, useLocation } from "react-router-dom";
import{MapPin, Calendar, Ellipsis, Circle} from 'lucide-react';

export const CustomerCard = ({Name, Address, DateJoined, Email, Orders, TotalSpent, is_removed}) => {

//doesnt render soft deleted items
    if (is_removed === 1){
    return null;
}
    return(
        <div className="bg-white w-[349px] h-[264px] rounded-xl border border-gray-200 shadow-lg p-8">
            <div className="flex flex-wrap flex-row"> 
            <Circle className="h-[50px] w-[50px] text-gray-300 fill-current"/>
                <div className="flex flex-col ml-3">
                <p className="text-cbvt-navy font-alegreya-sans-sc font-semibold text-lg mb-[-4px]">{Name}</p>
                <p className="text-cbvt-dark-gray text-xs">{Email}</p>
                </div>
            <Ellipsis className="flex-end h-3 w-3 ml-20 text-cbvt-dark-gray"/>
            </div>

           <div className="flex flex-col mt-8 ml-2">
                <div className="flex flex-row"> 
                <MapPin strokeWidth={2} className="h-5 w-5 text-cbvt-gray "/> 
                <p className="ml-3 mt-[-2px] text-cbvt-dark-gray">{Address}</p>
                </div>

                <div className="flex flex-row"> 
                <Calendar className="h-5 w-5 mt-5 text-cbvt-gray"/>
                <p className="ml-4 mt-4 text-cbvt-dark-gray">{DateJoined}</p>
                </div>
            </div> 

            <div className="border-t border-gray-300 my-4"></div>


            <div className="flex flex-row justify-center mt-[-5px] space-x-20">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-cbvt-navy font-alegreya-sans-sc font-semibold text-2xl">{Orders}</p>
                    <p className="font-carme text-cbvt-dark-gray text-xs mt-[-4px]">Orders</p>
                </div>


                <div className="flex flex-col justify-center items-center mt-[-1px]">
                    <p className="text-cbvt-navy font-alegreya-sans-sc font-semibold text-2xl">{TotalSpent}</p>
                    <p className="font-carme text-cbvt-dark-gray text-xs mt-[-4px]">Total Spent</p>
                </div>
            </div>


        </div>


    );
};


