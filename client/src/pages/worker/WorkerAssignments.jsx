import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import WorkerSidebar from "../../components/WorkerSidebar";
import { Plus, Search, Filter, FileX, RefreshCw } from "lucide-react";
import { AvailableAssignments } from "../../components/AvailableAssignments";
import SortingDropdown from "../../components/SortingDropdown"; 
import axios from 'axios'

const AssignmentPage = () => {
  const [activeItem, setActiveItem] = useState('Available Assignments');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState(''); 
  const [output, setOutput] = useState([]); 
  const [availableAssignmentsCount, setAvailableAssignmentsCount] = useState(0); 
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user_data'));
  const [availableAssignments, setAvailableAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []); 

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost/im-2-project/api/assignments/fetch-list", {
        headers: {
          Authorization: "Bearer " + userData.token
        }
      });
      
      const filteredData = res.data
        .filter(assignment => assignment.assignedWorkerId === null)
        .map(assignment => ({
          ...assignment,
          total_payment: assignment.total_payment === null ? 0 : assignment.total_payment
        }));
      
      setAvailableAssignments(filteredData);
      console.log(filteredData);
      setAvailableAssignmentsCount(filteredData.length);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setOutput(availableAssignments);
  }, [availableAssignments]);

  // Combined filter and sort effect
  useEffect(() => {
    // Apply search filter
    let results = availableAssignments.filter(assignment =>
      assignment.service_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.service_details?.toLowerCase().includes(searchQuery.toLowerCase())
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
        return sorted.sort((a, b) => a.service_name?.localeCompare(b.service_name) || 0);
      case 'name-desc':
        return sorted.sort((a, b) => b.service_name?.localeCompare(a.service_name) || 0);
      default:
        return data;
    }
  };

  // Handle successful assignment acceptance
  const handleAcceptSuccess = (assignmentId) => {
    // Remove the accepted assignment from the list
    setAvailableAssignments(prev => 
      prev.filter(assignment => assignment.assignment_id !== assignmentId)
    );
    
    // Update the count
    setAvailableAssignmentsCount(prev => prev - 1);
    
    // Optional: You might want to refetch assignments to get the latest data
    // fetchAssignments();
  };

  const handleLogout = (e) => {
    localStorage.removeItem("user_data");
    navigate("/");
  };

  const handleRefresh = () => {
    fetchAssignments();
  };

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <FileX className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Available Assignments
      </h3>
      <p className="text-gray-500 mb-6 max-w-md">
        {searchQuery 
          ? `No assignments found matching "${searchQuery}". Try adjusting your search terms.`
          : "There are currently no assignments available. Check back later for new opportunities."
        }
      </p>
      <button
        onClick={handleRefresh}
        className="flex items-center gap-2 px-4 py-2 bg-cbvt-navy text-white rounded-lg hover:bg-cbvt-navy/90 transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        Refresh
      </button>
    </div>
  );

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

          <div className='flex flex-row gap-5'> 
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
              sortingOptions={[
                { value: 'default', label: 'Default Sorting' },
                { value: 'name-asc', label: 'A-Z' },
                { value: 'name-desc', label: 'Z-A' }
              ]}
            />
          </div>
        </div>
        
        {/* Assignments Grid or Empty State */}
        <div className='flex-1 overflow-y-auto'>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 animate-spin text-cbvt-navy mx-auto mb-4" />
                <p className="text-gray-500">Loading assignments...</p>
              </div>
            </div>
          ) : output.length === 0 ? (
            <EmptyState />
          ) : (
            <div className='grid grid-cols-2 gap-5 p-8 pb-16'>
              {output.map((assignment) => (
                <AvailableAssignments
                  key={assignment.assignment_id}
                  AssignmentID={assignment.assignment_id}
                  Title={assignment.service_name}
                  Description={assignment.service_details}
                  Price={parseFloat(assignment.total_payment || 0).toLocaleString('en-PH', {
                    style: 'currency',
                    currency: 'PHP'
                  })}
                  CustomerName={assignment.clientName}
                  Location={assignment.Location}
                  DueDate={assignment.assignment_due}
                  onAcceptSuccess={handleAcceptSuccess}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;