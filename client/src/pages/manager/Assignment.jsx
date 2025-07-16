import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter } from "lucide-react";
import { AssignmentCard } from "../../components/AssignmentCard";
import axios from 'axios';

const AssignmentPage = () => {
  const [activeItem, setActiveItem] = useState('Assignment');
  const [searchQuery, setSearchQuery] = useState('');
  const [assignmentData, setAssignmentData] = useState([]);

    useEffect(() => {
      console.log("Works");
      const userData = JSON.parse(localStorage.getItem("user_data"));
      console.log(userData);
      axios
        .get("http://localhost/im-2-project/api/assignments/fetch-list", {
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        })
        .then((response) => {
          console.log("Data from API");
          console.log(response);
           
            const formattedAssignments = response.data.map((assignment) => ({
              AssignmentID: assignment.assignment_id,
              Title: assignment.service_name || "Untitled",
              Description: assignment.assignment_details || "No description",
              AssignedPerson: assignment.assignedWorker ?? "None assigned",
              CustomerName: assignment.clientName || "Unknown",
              Location: assignment.Location || "N/A",
              DueDate: new Date(assignment.assignment_due).toLocaleDateString(
                "en-PH",
                {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                }
              ),
            }));

            console.log("Formatted Assignments:", formattedAssignments);
            setAssignmentData(formattedAssignments)
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }, []);

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
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
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
              <Filter className='h-3 w-3 ml-3 text-gray-500' />
              <p className='text-gray-500 ml-2'>Filter</p>
            </div>
          </div>


        </div>

        {/* Assignments Grid */}

        <div className='flex-1 overflow-y-auto'>
          <div className='grid grid-cols-2 gap-5 p-8 pb-16'>
            {assignmentData.map((assignment) => (
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