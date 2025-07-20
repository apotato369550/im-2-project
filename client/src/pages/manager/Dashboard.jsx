import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
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
import axios from 'axios';
import { Link } from 'react-router-dom';

function getRelativeTime(dateString) {
  const now = new Date();
  const then = new Date(dateString);
  const diffMs = now - then;
  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);

  if (sec < 60) return `${sec} seconds ago`;
  if (min < 60) return `${min} minutes ago`;
  if (hr < 24) return `${hr} hours ago`;
  return `${day} days ago`;
}


const DashboardPage = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [cardData, setCardData] = useState([]);
  const [recentUpdates, setRecentUpdates] = useState([]);
  const navigate = useNavigate();
  /*
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
*/


useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const headers = {
      Authorization: "Bearer " + userData.token,
    };

    const fetchAll = async () => {
      try {
        const [usersRes, assignmentsRes, ordersRes] = await Promise.all([
          axios.get("http://localhost/im-2-project/api/users/fetch-list", { headers: headers }),
          axios.get("http://localhost/im-2-project/api/assignments/fetch-list", { headers: headers }),
          axios.get("http://localhost/im-2-project/api/orders/fetch-list", { headers: headers }),
        ]);

        const totalUsers = usersRes.data.length;
        const totalWorkers = usersRes.data.filter((u) => u.user_type === "worker").length;
        const totalAssignments = assignmentsRes.data.length;
        const totalOrders = ordersRes.data.length;

        setCardData([
          {
            index: 0,
            title: "Total Workers",
            amount: totalWorkers,
            icon: UserCheck,
          },
          {
            index: 1,
            title: "Total Users",
            amount: totalUsers,
            icon: Users,
          },
          {
            index: 2,
            title: "Assignments",
            amount: totalAssignments,
            icon: Clipboard,
          },
          {
            index: 3,
            title: "Orders",
            amount: totalOrders,
            icon: ShoppingCart,
          },
        ]);
      } catch (err) {
        console.error("Dashboard data fetch error:", err.response?.data || err.message);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
  const userData = JSON.parse(localStorage.getItem("user_data"));
  console.log("Fetching updates for:", userData);

  axios
    .get("http://localhost/im-2-project/api/updates", {
      headers: {
        Authorization: "Bearer " + userData.token,
      },
    })
    .then((response) => {
      console.log("Raw Updates:", response.data);

      const formattedUpdates = response.data.map((update) => ({
        updateId: update.update_id,
        title: `${update.user_full_name} updated an assignment`,
        description: update.update_message || "No details provided",
        timeAgo: update.date_last_update,
      }));

      console.log("Formatted Updates:", formattedUpdates);

      setRecentUpdates(formattedUpdates);
    })
    .catch((error) => {
      console.error("Error fetching updates:", error.response?.data || error.message);
    });
}, []);


  
  const handleLogout = (e)=>{
    localStorage.removeItem("user_data");
    navigate("/");
  }

  return (
    <div className="flex h-screen bg-gray-50">
     
     {/* this is the sidebar*/}
      <Sidebar 
        activeItem={activeItem}
        onItemChange={setActiveItem}
        onLogout={handleLogout}
      />

      

      {/* put main stuff here */}
      <div className="flex-1 justify-items-start overflow-y-auto p-8 ">
        <div className="flex-col  max-w-7xl">
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
            <div className='bg-white w-[783px] h-[600px] shadow-lg rounded-xl border border-gray-200 p-8 overflow-scroll scroll-smooth '>
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
                            <p ></p>
                            <Link className='ml-2' to="../manager/workers">Add New Worker</Link>
                        </div>

                        <div className='flex items-center bg-white h-[38px] w-[310px] rounded-2xl border border-gray-200 mb-3'>
                            <Plus className='h-3 w-3 ml-3'/>
                            <Link className='ml-2' to="../manager/assignment">Create Assignment</Link>
                        </div>  

                        <div className='flex items-center bg-white h-[38px] w-[310px] rounded-2xl border border-gray-200'>
                            <Plus className='h-3 w-3 ml-3'/>
                            <Link className='ml-2' to="../manager/orders">Process Order</Link>
                        </div>

                    </div>
                </div>
        </div>
           
          
       </div>
    </div>
   
  );
};

export default DashboardPage;