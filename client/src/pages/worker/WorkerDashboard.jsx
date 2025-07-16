import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
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
  FileDiff,
} from "lucide-react";
import axios from 'axios';



const WorkerDashboard = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user_data'));
  const [availableAssignment, setAvailableAssignments] = useState();
  const [recentAssignments, setRecentAssignments] = useState([]);
  const [availableAssignmentCount, setAvailableAssignmentsCount] = useState(0);

  useEffect(()=>{
    const fetchAssignment = async ()=>{
      axios.get("http://localhost/im-2-project/api/assignments/fetch-list", {
        headers: {
          Authorization: "Bearer " + userData.token
        }
      })
      .then((res)=>{
        const filteredData = res.data.filter(assignment => assignment.assignedWorkerId != null)
        setAvailableAssignments(filteredData);
        console.log(filteredData);
        setAvailableAssignmentsCount(filteredData.length)
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    const fetchRecent = ()=>{
      axios.get("http://localhost/im-2-project/api/assignments/recent", {
        headers: {
          Authorization: "Bearer " + userData.token
        }
      })
      .then((res)=>{
        console.log(res.data);
        setRecentAssignments(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    fetchAssignment();
    fetchRecent();

  }, [])

  const cardData = [
    {
      title: "Available Assignments",
      amount: availableAssignmentCount,
      icon: Calendar,
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




  
  const handleLogout = (e)=>{
    localStorage.removeItem("user_data");
    navigate("/");
  }

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
        <div className='flex flex-row space-x-7'>

             {/* container for recent updates */}
            <div className='bg-white w-[783px] shadow-lg rounded-xl border border-gray-200 p-8'>
                <p className='text-cbvt-navy font-alegreya-sans-sc font-semibold tracking-wide text-xl mb-10'>Recent New Assignments</p>

                <div className='flex flex-col ml-2 space-y-8'>

                    {recentAssignments.map((update) => (
                      <RecentNewAssignments  
                        key={update.assignment_id}
                        details={update.assignment_details}
                        title={update.service_name}
                        location={update.Location}
                        timeAgo={update.assignment_date_created}
                      />

                    ))}

                </div>

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