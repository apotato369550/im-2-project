import { Link, useLocation } from "react-router-dom";
import{User, Calendar, MapPin} from 'lucide-react';


export const TaskCard = ({TaskID, Title, Description, Price, StartDate, Location, Notes}) => {
    return(
        //title
        <div className="border border-gray-200 shadow shadow-lg bg-white p-6 rounded-xl flex flex-col">
            <div className="flex justify-between items-center flex-row"> 
                <p className="font-alegreya-sans-sc text-cbvt-navy font-semibold text-2xl pb-4 ">{Title}</p>
                <p className="font-alegreya-sans-sc text-cbvt-navy font-semibold text-lg">{Price}</p>
            </div>
            

            {/*date and location*/}
                <div className="flex items-center flex-row">
                    <Calendar className="h-4 w-4 text-gray-600"/>
                    <p className="pl-3 text-cbvt-dark-gray">{StartDate}</p>
                </div>

                <div className="flex items-center flex-row">
                    <MapPin className="h-4 w-4 text-gray-600"/>
                    <p className="pl-3 text-cbvt-dark-gray pb-2">{Location}</p>
                </div>



                {/*notes*/}
                <div className="p-3 bg-gray-50 rounded-xl">
                    <p>
                        <span className="text-cbvt-dark-gray font-semibold">Notes:</span>
                        <span className="pl-2 text-cbvt-dark-gray">{Notes}</span>
                    </p>
                </div>


                {/*buttons at the bottom*/}
                <div className="flex flex-row items-center space-x-4"> 
                    <button className="border border-gray-200 p-1 bg-white rounded-xl w-[70px] shadow-sm text-cbvt-dark-gray
                                hover:cursor-pointer hover:bg-gray-200 transition-colors">
                        Pause
                    </button>

                    <button className="border border-gray-200 p-1 rounded-xl w-[120px] bg-cbvt-navy shadow-sm text-white
                                hover:cursor-pointer hover:!bg-white transition-colors hover:!text-[rgb(15_40_81)]">
                       Complete
                    </button>

            
                </div>

        </div>


    );
};

