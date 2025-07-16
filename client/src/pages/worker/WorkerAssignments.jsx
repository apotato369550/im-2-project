import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import WorkerSidebar from "../../components/WorkerSidebar";
import { Plus, Search, Filter} from "lucide-react";
import SortingDropdown from '../../components/SortingDropdown';
import { AvailableAssignments } from "../../components/AvailableAssignments";

const AssignmentPage = () => {
  const [activeItem, setActiveItem] = useState('Available Assignments');
 

   //search function
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [output, setOutput] = useState([]);

  //filter function
   const [sortOption, setSortOption] = useState('default');


  const availableAssignments=[
    {
        AssignmentID: 1111,
        Title: "AC Installation",
        Description: "Install split-type air conditioning unit in master bedroom",
        CustomerName: "Jhen Aloyon",
        Location: "Talisay, Cebu",
        DueDate: "8/13/2025",               
        EstimatedTime: "4 Hours",
        Price: "Php 5,000.00",
        is_removed: 0,

    },
    {
        AssignmentID: 1111,
        Title: "AC Installation",
        Description: "Install split-type air conditioning unit in master bedroom",
        CustomerName: "Jhen Aloyon",
        Location: "Talisay, Cebu",
        DueDate: "8/13/2025",               
        EstimatedTime: "4 Hours",
        Price: "Php 5,000.00",
        is_removed: 1,

    },
    {
        AssignmentID: 1112,
        Title: "Zx",
        Description: "Install split-type air conditioning unit in master bedroom",
        CustomerName: "Jhen Aloyon",
        Location: "Talisay, Cebu",
        DueDate: "8/13/2025",               
        EstimatedTime: "4 Hours",
        Price: "Php 5,000.00",
        is_removed: 0,

    },
];

// Filter out soft-deleted customers
  const activeAssignments = availableAssignments.filter(data => data.is_removed === 0);

 // Initialize with all workers on first render
   useEffect(() => {
     setOutput(activeAssignments);
   }, [availableAssignments]);
 
 
  // Combined filter and sort effect
   useEffect(() => {
     // Apply search filter
     let results = activeAssignments.filter(assignment =>
       assignment.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.CustomerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.Description.toLowerCase().includes(searchQuery.toLowerCase())
     );
 
     // Apply sorting
     results = sortData(results, sortOption);
     
     setOutput(results);
   }, [searchQuery, sortOption, availableAssignments]); 
 
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
   
  

  const filteredAssignments = availableAssignments.filter(assignment =>
    assignment.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.CustomerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    console.log('Logging out...');
  };

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
                Browse and apply for new assignments.
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
                placeholder='Search assignments...' 
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
            <div className='grid grid-cols-2 gap-5 p-8 pb-16'>
                {output.map((assignment) => (
                    <AvailableAssignments  // AssignmentID, Title, Description, AssignedPerson, CustomerName, Location, DueDate, EstimatedTime
                        key={assignment.AssignmentID}
                        Title={assignment.Title}
                        Description={assignment.Description}
                        Price={assignment.Price}
                        CustomerName={assignment.CustomerName}
                        Location={assignment.Location}
                        DueDate={assignment.DueDate}
                        EstimatedTime={assignment.EstimatedTime}
                        is_removed={assignment.is_removed}


                    />

                ))}
            </div>

        </div>

        
      </div>
    </div>
  );
};

export default AssignmentPage;