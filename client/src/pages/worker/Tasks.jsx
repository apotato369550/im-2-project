import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import WorkerSidebar from "../../components/WorkerSidebar";
import { Plus, Search, Filter} from "lucide-react";
import SortingDropdown from '../../components/SortingDropdown';
import { TaskCard } from '../../components/TasksCard';

const TasksPage = () => {
  const [activeItem, setActiveItem] = useState('My Tasks');
  
  //search function
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [output, setOutput] = useState([]);

  //filter function
   const [sortOption, setSortOption] = useState('default');

  const workerTasks=[
    {
        TaskID: 1111,
        Title: "AC Installation",
        Description: "Install split-type air conditioning unit in master bedroom",
        Location: "Talisay, Cebu",
        StartDate: "8/13/2025",               
        Notes: "Customer prefers installation in the afternoon. Parking available in basement.",
        Price: "Php 5,000.00",
        is_removed: 0,

    },

    {
        TaskID: 1311,
        Title: "AC Installation",
        Description: "Install split-type air conditioning unit in master bedroom",
        Location: "Talisay, Cebu",
        StartDate: "8/13/2025",               
        Notes: "Customer prefers installation in the afternoon. Parking available in basement.",
        Price: "Php 5,000.00",
        is_removed: 1,  

    },

    {
        TaskID: 1151,
        Title: "AC biot",
        Description: "Install split-type air conditioning unit in master bedroom",
        Location: "Talisay, Cebu",
        StartDate: "8/13/2025",               
        Notes: "Customer prefers installation in the afternoon. Parking available in basement.",
        Price: "Php 5,000.00",
        is_removed: 0,  

    },
    
    
];


// Filter out soft-deleted customers
  const activeAssignments = workerTasks.filter(data => data.is_removed === 0);

useEffect(() => {
  setOutput(activeAssignments);
}, [activeAssignments]); // Changed from workerTasks

// 3. Fix the filter/sort effect:
useEffect(() => {
  let results = activeAssignments.filter(task =>
    task.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.Location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  results = sortData(results, sortOption);
  setOutput(results);
}, [searchQuery, sortOption, activeAssignments]);
 
 // Sorting function
   const sortData = (data, option) => {
     const sorted = [...data];
     switch(option) {
       case 'name-asc':
         return sorted.sort((a, b) => a.Title.localeCompare(b.Title));
       case 'name-desc':
         return sorted.sort((a, b) => b.Title.localeCompare(a.Title));
       default:
         return data;
     }
   };
  

  const filteredAssignments = workerTasks.filter(assignment =>
    assignment.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.Location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      />

      {/* Main Content */}
      
      <div className="flex-1 flex flex-col pb-8">
        {/* Header Section */}
        <div className="p-8 pb-0">
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


          <div className='flex flex-row' > 
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
          />
        </div>


        </div>

        {/* Assignments Grid */}
        
        <div className='flex-1 overflow-y-auto'>
            <div className='grid  gap-5 p-8 pb-16'>
                {output.map((assignment) => (
                    <TaskCard  
                        key={assignment.TaskID}
                        Title={assignment.Title}
                        Description={assignment.Description}
                        Price={assignment.Price}
                        Location={assignment.Location}
                        StartDate={assignment.StartDate}
                        Notes={assignment.Notes}
                        is_removed={assignment.is_removed}


                    />

                ))}
            </div>

        </div>

        
      </div>
    </div>
  );
};

export default TasksPage;