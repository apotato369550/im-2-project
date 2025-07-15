import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import {RecentUpdates} from "../../components/RecentUpdates";
import { CardHolderSm } from "../../components/CardHolderSm";
import { 
  UserCheck,
  Users,
  Clipboard,
  ShoppingCart,
  Circle,
  Plus,
} from "lucide-react";



const DashboardPage = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const cardData = [
{
    index: 0,
    title: "Total Workers",
    amount: 24,
    icon: UserCheck,
},
{
  index: 1,
  title: "Total Users",
  amount: 56,
  icon: Users,
},
{
  index: 2,
  title: "Assignments",
  amount: 32,
  icon: Clipboard,
},
{
  index: 3,
  title: "Orders",
  amount: 75,
  icon: ShoppingCart
}
];

const recentUpdates = [
  {
    updateId: 111,
    title:"John Doe Completed Assignment",
    description:"AC Installation",
    timeAgo:"2 hours ago",
  },
  {
    updateId: 112,
    title:"Jhen Aloyon completed an assignment",
    description:"Window Type AC - AC1001",
    timeAgo:"4 hours ago",
  },
  {
    updateId: 113,
    title:"Ethan Dalocanog updated worker status",
    description:"Assignment 32 - ASS10032",
    timeAgo:"7 hours ago",
  }
];


  
  const handleLogout = () => {
    console.log('Logging out...');
   
  };

  return (
    <div className="flex h-screen bg-gray-50">
     
     {/* this is the sidebar*/}
      <Sidebar 
        activeItem={activeItem}
        onItemChange={setActiveItem}
        onLogout={handleLogout}
      />

      

      {/* put main stuff here */}
      <div className="flex-1 overflow-y-auto p-8 ">
        <div className="max-w-7xl mx-auto">
          <p className="text-3xl font-bold font-alegreya-sans-sc text-cbvt-navy mt-2">
            Welcome back, Manager
          </p>

              <p className="text-cbvt-dark-gray mb-10">
                Here's what's happening with your team today.
              </p>
        </div>

        {/* this is for the cards */}
        <div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cardData.map((card) => (
              <CardHolderSm 
              key={card.index} 
              title={card.title} 
              amount={card.amount}
              icon={card.icon}
              />
            ))}
          </div>

        </div>

         {/* container for next content (recent updates and quick actions) */}
        <div className='flex flex-row space-x-7'>

             {/* container for recent updates */}
            <div className='bg-white w-[783px] shadow-lg rounded-xl border border-gray-200 p-8'>
                <p className='text-cbvt-navy font-alegreya-sans-sc font-semibold tracking-wide text-xl mb-10'>Recent Updates</p>

                <div className='flex flex-col ml-2 space-y-8'>

                    {recentUpdates.map((update) => (
                      <RecentUpdates 
                        key={update.updateId}
                        title={update.title}
                        description={update.description}
                        timeAgo={update.timeAgo}
                      />

                    ))}

                </div>

            </div>



             {/* container for quick actions */}
                <div>
                    <div className='bg-white h-[245px] w-[376px] shadow-lg rounded-xl border border-gray-200 p-8'>
                        <p className='text-cbvt-navy font-alegreya-sans-sc font-semibold tracking-wide  text-xl mb-5'>Quick Actions</p>

                        <div className='flex items-center bg-white h-[38px] w-[310px] rounded-2xl border border-gray-200 mb-3'>
                            <Plus className='h-3 w-3 ml-3'/>
                            <p className='ml-2'>Add New Worker</p>
                        </div>

                        <div className='flex items-center bg-white h-[38px] w-[310px] rounded-2xl border border-gray-200 mb-3'>
                            <Plus className='h-3 w-3 ml-3'/>
                            <p className='ml-2'>Create Assignment</p>
                        </div>  

                        <div className='flex items-center bg-white h-[38px] w-[310px] rounded-2xl border border-gray-200'>
                            <Plus className='h-3 w-3 ml-3'/>
                            <p className='ml-2'>Process Order</p>
                        </div>

                    </div>
                </div>
        </div>
           
          
       </div>
    </div>
   
  );
};

export default DashboardPage;