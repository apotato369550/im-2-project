import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import WorkerSidebar from "../../components/WorkerSidebar";
import { Plus, Search, Filter} from "lucide-react";
import SortingDropdown from '../../components/SortingDropdown';
import { TaskCard } from '../../components/TasksCard';
import axios from 'axios'

const TasksPage = () => {
  const [activeItem, setActiveItem] = useState('My Tasks');
  
  //search function
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [output, setOutput] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user_data'));
  const [workerTasks, setWorkerTask] = useState([]);

  //filter function
  const [sortOption, setSortOption] = useState('default');

  useEffect(()=>{
    axios
    .get("http://localhost/im-2-project/api/assignments", {
      headers: {
        Authorization: "Bearer " + userData.token
      }
    })
    .then((response)=>{
      setWorkerTask(response.data);
      console.log(response.data);
    })
    .catch((Err)=>{
      console.log(Err);
    })

  }, []);
  
  // Function to handle task updates from child components
  const handleTaskUpdate = (taskId, newStatus) => {
    setWorkerTask(prevTasks => 
      prevTasks.map(task => 
        task.assignment_id === taskId 
          ? { ...task, assignment_status: newStatus }
          : task
      )
    );
  };

  const activeAssignments = workerTasks;

  // Sorting function
  const sortData = (data, option) => {
    const sorted = [...data];
    switch(option) {
      case 'Completed':
        return sorted.filter(task => task.assignment_status === 'Completed');
      case 'Not-Completed':
        return sorted.filter(task => task.assignment_status !== 'Completed');
      default:
        return data;
    }
  };

  // Combined filter and sort effect
  useEffect(() => {
    let results = activeAssignments.filter(task =>
      task.serviceName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.notes?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    results = sortData(results, sortOption);
    setOutput(results);
  }, [searchQuery, sortOption, workerTasks]); 
  
  const handleLogout = (e)=>{
    localStorage.removeItem("user_data");
    navigate("/");
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <WorkerSidebar 
        activeItem={activeItem}
        onItemChange={setActiveItem}
        onLogout={handleLogout}
        userData={userData}
      />  

      {/* Main Content */}
      
      <div className="flex-1 flex flex-col pb-8">
        {/* Header Section */}
        <div className="p-8 pb-0 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold font-alegreya-sans-sc text-cbvt-navy">
                {activeItem}
              </h1>
              <p className="text-cbvt-dark-gray mb-6">
                Manage your tasks and track progress.
              </p> 
            </div>
          </div>

          <div className='flex flex-row gap-4 relative z-20' > 
            {/* Search Bar */}
            <div className="mb-8">
              <div className='relative bg-white border border-gray-200 rounded-3xl h-[38px] w-full max-w-[382px]'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500'/>
                <input 
                  type='text' 
                  placeholder='Search tasks...' 
                  className='w-full h-full pl-10 pr-4 rounded-3xl focus:outline-none'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <SortingDropdown 
              onSortChange={(sortValue) => setSortOption(sortValue)}
              sortingOptions={[
                { value: 'default', label: 'Default Sorting' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Not-Completed', label: 'Not Completed' }
              ]}
              defaultValue="default"
            />
          </div>
        </div>

        {/* Assignments Grid */}
        <div className='flex-1 overflow-y-auto relative z-0'>
          <div className='grid gap-5 p-8 pb-16'>
            {output.map((assignment) => (
              <TaskCard  
                key={assignment.assignment_id}
                TaskID={assignment.assignment_id}
                Title={assignment.serviceName}
                Description={assignment.assignment_status}
                Price={parseFloat(assignment.total_payment || 0).toLocaleString('en-PH', {
                  style: 'currency',
                  currency: 'PHP'
                })}
                Location={assignment.location}
                StartDate={assignment.assignment_due}
                Notes={assignment.notes}
                OrderId={assignment.order_id}
                onTaskUpdate={handleTaskUpdate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;