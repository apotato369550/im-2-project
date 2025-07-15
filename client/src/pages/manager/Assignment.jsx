import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter} from "lucide-react";
import { AssignmentCard } from "../../components/AssignmentCard";
import SortingDropdown from '../../components/SortingDropdown';

const AssignmentPage = () => {
  const [activeItem, setActiveItem] = useState('Assignment');
  

      //search function
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [output, setOutput] = useState([]);

  //filter function
   const [sortOption, setSortOption] = useState('default');

  const assignmentData=[
    {
    AssignmentID: 1121,
    Title: "Split AC Installation",
    Description: "Install 2.5HP Daikin inverter split-type in master bedroom",
    AssignedPerson: "Miguel Santos",
    CustomerName: "Carlos Reyes",
    Location: "Mandaue City",
    DueDate: "9/5/2025",
    EstimatedTime: "4 Hours",
    HVACType: "Residential"
  },
  {
    AssignmentID: 1122,
    Title: "AC Chemical Cleaning",
    Description: "Full chemical wash for 5 window-type units in office",
    AssignedPerson: "Sarah Lim",
    CustomerName: "ABC Corporation",
    Location: "Cebu Business Park",
    DueDate: "8/20/2025",
    EstimatedTime: "6 Hours",
    HVACType: "Commercial"
  },
  {
    AssignmentID: 1123,
    Title: "Chiller Maintenance",
    Description: "Quarterly preventive maintenance for 50TR centrifugal chiller",
    AssignedPerson: "James Wilson",
    CustomerName: "XYZ Mall",
    Location: "SM City Cebu",
    DueDate: "8/25/2025",
    EstimatedTime: "8 Hours",
    HVACType: "Industrial"
  },
  {
    AssignmentID: 1124,
    Title: "VRV System Repair",
    Description: "Troubleshoot and fix refrigerant leak in 5-zone Daikin VRV",
    AssignedPerson: "Juan Dela Cruz",
    CustomerName: "Marco Villaverde",
    Location: "Maria Luisa Subdivision",
    DueDate: "9/1/2025",
    EstimatedTime: "5 Hours",
    HVACType: "Residential"
  },
  {
    AssignmentID: 1125,
    Title: "Ducted AC Installation",
    Description: "Install 5HP ducted system for restaurant kitchen exhaust",
    AssignedPerson: "Luis Gomez",
    CustomerName: "Casa Verde",
    Location: "Banilad",
    DueDate: "8/30/2025",
    EstimatedTime: "7 Hours",
    HVACType: "Commercial"
  },
  {
    AssignmentID: 1126,
    Title: "AC Gas Refill",
    Description: "R22 recharge for 3HP window-type unit",
    AssignedPerson: "Pedro Martinez",
    CustomerName: "Linda Chan",
    Location: "Lahug",
    DueDate: "8/18/2025",
    EstimatedTime: "2 Hours",
    HVACType: "Residential"
  },
  {
    AssignmentID: 1127,
    Title: "AHU Maintenance",
    Description: "Annual cleaning of air handling units for hospital",
    AssignedPerson: "James Wilson",
    CustomerName: "Cebu Doctors Hospital",
    Location: "Osmeña Blvd",
    DueDate: "9/10/2025",
    EstimatedTime: "Full Day",
    HVACType: "Industrial"
  },
  {
    AssignmentID: 1128,
    Title: "Thermostat Upgrade",
    Description: "Replace old thermostat with smart Nest system",
    AssignedPerson: "Sarah Lim",
    CustomerName: "David Sy",
    Location: "Pristina North",
    DueDate: "8/22/2025",
    EstimatedTime: "1.5 Hours",
    HVACType: "Residential"
  },
  {
    AssignmentID: 1129,
    Title: "AC Capacitor Replacement",
    Description: "Replace faulty capacitor in 2HP LG split-type",
    AssignedPerson: "Miguel Santos",
    CustomerName: "Anna Lim",
    Location: "Talamban",
    DueDate: "8/15/2025",
    EstimatedTime: "1 Hour",
    HVACType: "Residential"
  },
  {
    AssignmentID: 1130,
    Title: "Cooling Tower Repair",
    Description: "Fix water circulation pump in hotel cooling tower",
    AssignedPerson: "Luis Gomez",
    CustomerName: "Waterfront Hotel",
    Location: "Salinas Drive",
    DueDate: "9/8/2025",
    EstimatedTime: "6 Hours",
    HVACType: "Commercial"
  }

  ];

   // Initialize with all workers on first render
   useEffect(() => {
     setOutput(assignmentData);
   }, []);
 
 
  // Combined filter and sort effect
   useEffect(() => {
     // Apply search filter
     let results = assignmentData.filter(data =>
       data.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.AssignedPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.CustomerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.Location.toLowerCase().includes(searchQuery.toLowerCase())
     );
 
     // Apply sorting
     results = sortData(results, sortOption);
     
     setOutput(results);
   }, [searchQuery, sortOption]); // Add sortOption to dependencies
 
 
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


  

  const filteredAssignments = assignmentData.filter(assignment =>
    assignment.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.AssignedPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.CustomerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
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
                Manage work assignments.
              </p> 
            </div>
            <button className='flex items-center bg-cbvt-navy h-[40px] px-4 rounded-2xl text-white mr-10 '>
              <Plus className='h-3 w-3 mr-2' />
              <span className='text-xs'>Create Assignment</span>
            </button>
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
                    <AssignmentCard  // AssignmentID, Title, Description, AssignedPerson, CustomerName, Location, DueDate, EstimatedTime
                        key={assignment.AssignmentID}
                        Title={assignment.Title}
                        Description={assignment.Description}
                        AssignedPerson={assignment.AssignedPerson}
                        CustomerName={assignment.CustomerName}
                        Location={assignment.Location}
                        DueDate={assignment.DueDate}
                        EstimatedTime={assignment.EstimatedTime}

                    />

                ))}
            </div>

        </div>

        
      </div>
    </div>
  );
};

export default AssignmentPage;