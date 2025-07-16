
  import { useState, useEffect } from 'react';
  import { Outlet, useNavigate } from 'react-router-dom';
  import WorkerSidebar from "../../components/WorkerSidebar";
  import { Plus, Search, Filter} from "lucide-react";
  import { AvailableAssignments } from "../../components/AvailableAssignments";
  import axios from 'axios'

  const AssignmentPage = () => {
    const [activeItem, setActiveItem] = useState('Available Assignments');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const [availableAssignments, setAvailableAssignments] = useState([]);

    useEffect(()=>{
      const fetchAssignment = async ()=>{
        axios.get("http://localhost/im-2-project/api/assignments/fetch-list", {
          headers: {
            Authorization: "Bearer " + userData.token
          }
        })
        .then((res)=>{
          const filteredData = res.data
          .filter(assignment => assignment.assignedWorkerId != null)
          .map(assignment => ({
            ...assignment,
            total_payment: assignment.total_payment === null ? 0 : assignment.total_payment
          }));
          
          setAvailableAssignments(filteredData)
          
          console.log(filteredData);
          setAvailableAssignmentsCount(filteredData.length)
        })
        .catch((err)=>{
          console.log(err);
        })
      }

      // const fetchRecent = ()=>{
      //   axios.get("http://localhost/im-2-project/api/assignments/recent", {
      //     headers: {
      //       Authorization: "Bearer " + userData.token
      //     }
      //   })
      //   .then((res)=>{
      //     console.log(res.data);
      //     setRecentAssignments(res.data);
      //   })
      //   .catch((err)=>{
      //     console.log(err);
      //   })
      // }

      fetchAssignment();
      // fetchRecent();
     setOutput(activeAssignments);


    }, [availableAssignments])
    

 // Initialize with all workers on first rende 
 
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
   


    // const filteredAssignments = availableAssignments.filter(assignment =>
    //   assignment.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //   assignment.CustomerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //   assignment.Description.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    const acceptAssignment = ()=>{
      
    }

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
            <div className='h-[38px] w-[101px] bg-white border border-gray-200 ml-[17px] rounded-3xl p-1 flex items-center'>
              <Filter className='h-3 w-3 ml-3 text-gray-500'/>
              <p className='text-gray-500 ml-2'>Filter</p>
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
                  {availableAssignments.map((assignment) => (
                      <AvailableAssignments  // AssignmentID, Title, Description, AssignedPerson, CustomerName, Location, DueDate, EstimatedTime
                          key={assignment.assignment_id}
                          Title={assignment.service_name}
                          Description={assignment.service_details}
                          Price={parseFloat(assignment.total_payment).toLocaleString('en-PH', {
                          style: 'currency',
                          currency: 'PHP'
                          }) }
                          CustomerName={assignment.clientName}
                          Location={assignment.Location}
                          DueDate={assignment.assignment_due}


                      />

                  ))}
              </div>


          </div>

          
        </div>
    );
  };

  export default AssignmentPage;