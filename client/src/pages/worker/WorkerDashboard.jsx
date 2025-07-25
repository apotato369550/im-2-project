import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import WorkerSidebar from "../../components/WorkerSidebar";
import {RecentNewAssignments} from "../../components/RecentNewAssignments";
import { CardHolderSm } from "../../components/CardHolderSm";
import { ToDo } from '../../components/ToDo';
import { 
  Calendar,
  FileX,
  CheckCircle,
  RefreshCw,
  Clock
} from "lucide-react";
import axios from 'axios';

const WorkerDashboard = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user_data'));
  const [availableAssignment, setAvailableAssignments] = useState([]);
  const [recentAssignments, setRecentAssignments] = useState([]);
  const [availableAssignmentCount, setAvailableAssignmentsCount] = useState(0);
  const [workerTasks, setWorkerTasks] = useState([]);

  useEffect(()=>{
    const fetchAssignment = async ()=>{
      setIsLoading(true);
      axios.get("http://localhost/im-2-project/api/assignments/fetch-list", {
        headers: {
          Authorization: "Bearer " + userData.token
        }
      })
      .then((res)=>{
        const filteredData = res.data.filter(assignment => assignment.assignedWorkerId == null)
        setAvailableAssignments(filteredData);
        setAvailableAssignmentsCount(filteredData.length)
        setWorkerTasks(res.data.filter(assignment => 
          assignment.assignedWorkerId === userData.user_id && 
          assignment.assignment_status !== 'completed' && 
          assignment.assignment_status !== 'Completed'
        ))
      })
      .catch((err)=>{
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }

    const fetchRecent = ()=>{
      axios.get("http://localhost/im-2-project/api/assignments/recent", {
        headers: {
          Authorization: "Bearer " + userData.token
        }
      })
      .then((res)=>{
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

  const handleRefresh = () => {
    window.location.reload();
  };

  // Empty state component for Recent New Assignments
  const RecentAssignmentsEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <FileX className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        No Recent Assignments
      </h3>
      <p className="text-gray-500 mb-4 max-w-sm">
        There are no recent assignments to display. New assignments will appear here once they're available.
      </p>
      <button
        onClick={handleRefresh}
        className="flex items-center gap-2 px-4 py-2 bg-cbvt-navy text-white rounded-lg hover:bg-cbvt-navy/90 transition-colors text-sm"
      >
        <RefreshCw className="h-4 w-4" />
        Refresh
      </button>
    </div>
  );

  // Empty state component for To Do List
  const ToDoEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-green-100 rounded-full p-4 mb-4">
        <CheckCircle className="h-8 w-8 text-green-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        All Caught Up!
      </h3>
      <p className="text-gray-500 text-sm max-w-xs">
        You have no pending tasks. Great job staying on top of your assignments!
      </p>
    </div>
  );

  // Loading state component
  const LoadingState = () => (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <RefreshCw className="h-6 w-6 animate-spin text-cbvt-navy mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
     
      {/* this is the sidebar*/}
      <WorkerSidebar 
        activeItem={activeItem}
        onItemChange={setActiveItem}
        onLogout={handleLogout}
        userData={userData}

      />

      {/* put main stuff here */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl">
          <p className="text-3xl font-bold font-alegreya-sans-sc text-cbvt-navy mt-2">
            Welcome back, Worker
          </p>

          <p className="text-cbvt-dark-gray mb-10">
            Here's your work overview for today.
          </p>

          {/* this is for the cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {cardData.map((card, idx) => (
              <CardHolderSm 
                key={idx} 
                title={card.title} 
                amount={card.amount}
                icon={card.icon}
              />
            ))}
          </div>

          {/* container for next content (recent updates and to-do list) */}
          <div className='flex flex-col lg:flex-row gap-8'>

            {/* container for recent updates */}
            <div className='bg-white flex-1 shadow-lg rounded-xl border border-gray-200 p-8'>
              <p className='text-cbvt-navy font-alegreya-sans-sc font-semibold tracking-wide text-xl mb-10'>
                Recent New Assignments
              </p>

              {isLoading ? (
                <LoadingState />
              ) : recentAssignments.length === 0 ? (
                <RecentAssignmentsEmptyState />
              ) : (
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
              )}
            </div>

            {/* container for To do list*/}
            <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-8 flex flex-col lg:w-96">
              <p className="text-cbvt-navy font-alegreya-sans-sc font-semibold tracking-wide text-xl mb-5">
                To Do List:
              </p>
              
              {isLoading ? (
                <LoadingState />
              ) : workerTasks.length === 0 ? (
                <ToDoEmptyState />
              ) : (
                <div className="flex flex-col space-y-3">
                  {workerTasks.map((task)=> (
                    <ToDo 
                      key={task.assignment_id}
                      title={task.service_name}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;