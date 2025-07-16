import { Briefcase } from 'lucide-react';
import ApplyModal from './ApplyModal';


export const RecentNewAssignments = ({ assignmentID, title, details, location, timeAgo }) => {
  return (
    <div className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors">
      {/* for the icon */}
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
        <Briefcase className="h-4 w-4 text-cbvt-hover-blue" />
      </div>

      {/* content */}
      <div className="flex-1 min-w-0"> 
        <div className="flex justify-between items-baseline gap-2">
          <p className="font-medium truncate font-carme">{title}</p>
        
          <ApplyModal />

        </div>
          <p className="font-[10px] truncate">{details}</p>
        
        <div className="mt-1">
          <p className="text-gray-600 text-sm truncate font-carme">
            <span className="font-semibold font-carme">Location:</span> {location}
          </p>
          <p className="text-gray-500 text-xs mt-1 font-carme">{timeAgo}</p>
        </div>
      </div>
    </div>
  );
};