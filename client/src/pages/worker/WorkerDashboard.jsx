import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import WorkerSidebar from "../../components/WorkerSidebar";
import {RecentNewAssignments} from "../../components/RecentNewAssignments";
import { CardHolderSm } from "../../components/CardHolderSm";
import { ToDo } from '../../components/ToDo';
import { 
  Briefcase,
  Calendar,
  Clock,
  Circle,
  Square,
} from "lucide-react";



const WorkerDashboard = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const cardData = [
{
    title: "Active Tasks",
    amount: 24,
    icon: Briefcase,
},
{
  title: "Available Assignments",
  amount: 56,
  icon: Calendar,
}
];

const recentNewAssignments = [
  {
    assignmentID: 111,
    title:"AC Installation",
    location:"Cebu City",
    timeAgo:"2 hours ago",
  },
  {
    assignmentID: 112,
    title:"AC Maintenance",
    location:"Mandaue",
    timeAgo:"4 hours ago",
  },
  {
    assignmentID: 113,
    title:"AC Check-Up",
    location:"Banilad",
    timeAgo:"7 hours ago",
  }
];

const toDO = [
  {
    assignmentID: 111,
    title: "AC Installation",
  },

  {
    assignmentID: 112,
    title: "AC Maintenance",
  },

  {
    assignmentID: 113,
    title: "AC Check-up",
  }
];




  
  const handleLogout = () => {
    console.log('Logging out...');
   
  };

  return (
    <div className="flex h-screen bg-gray-50">
     
     {/* this is the sidebar*/}
      <WorkerSidebar 
        activeItem={activeItem}
        onItemChange={setActiveItem}
        onLogout={handleLogout}
      />

      

      {/* put main stuff here */}
      <div className="flex-1 overflow-y-auto p-8 ">
        <div className="max-w-7xl mx-auto">
          <p className="text-3xl font-bold font-alegreya-sans-sc text-cbvt-navy mt-2">
            Welcome back, Worker
          </p>

          <p className="text-cbvt-dark-gray mb-10">
            Here's your work overview for today.
          </p>
        </div>

        {/* this is for the cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 max-w-7xl mx-auto">
          {cardData.map((card, idx) => (
            <CardHolderSm 
              key={idx} 
              title={card.title} 
              amount={card.amount}
              icon={card.icon}
            />
          ))}
        </div>

        {/* container for next content (recent updates and quick actions) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* container for recent updates */}
          <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-8 col-span-2 flex flex-col">
            <p className="text-cbvt-navy font-alegreya-sans-sc font-semibold tracking-wide text-xl mb-8">Recent New Assignments</p>
            <div className="flex flex-col space-y-6 flex-1">
              {recentNewAssignments.map((update) => (
                <RecentNewAssignments  
                  key={update.assignmentID}
                  title={update.title}
                  location={update.location}
                  timeAgo={update.timeAgo}
                />
              ))}
            </div>
          </div>

          {/* container for To do list*/}
          <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-8 flex flex-col">
            <p className="text-cbvt-navy font-alegreya-sans-sc font-semibold tracking-wide text-xl mb-5">To Do List:</p>
            <div className="flex flex-col space-y-3">
              {toDO.map((task)=> (
                <ToDo 
                  key={task.assignmentID}
                  title={task.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
           
          
       </div>

   
  );
};

export default WorkerDashboard;