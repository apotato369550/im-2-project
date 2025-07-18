import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter } from "lucide-react";
import { AssignmentCard } from "../../components/AssignmentCard";
import SortingDropdown from '../../components/SortingDropdown';
import axios from 'axios';

const AssignmentPage = () => {
  const [activeItem, setActiveItem] = useState('Assignment');
  
  // Core data states
  const [assignmentData, setAssignmentData] = useState([]);
  const [displayAssignments, setDisplayAssignments] = useState([]);
  
  // UI states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch assignments data
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const userData = JSON.parse(localStorage.getItem("user_data"));
        
        if (!userData || !userData.token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          "http://localhost/im-2-project/api/assignments/fetch-list",
          {
            headers: {
              Authorization: "Bearer " + userData.token,
            },
          }
        );

        console.log("Raw API data:", response.data);

        // Format the assignments data
        const formattedAssignments = response.data.map((assignment) => ({
          AssignmentID: assignment.assignment_id,
          Title: assignment.service_name || "Untitled",
          Description: assignment.assignment_details || "No description",
          AssignedPerson: assignment.assignedWorker || "None assigned",
          CustomerName: assignment.clientName || "Unknown",
          Location: assignment.Location || "N/A",
          DueDate: formatDate(assignment.assignment_due),
          Status: assignment.status || "Pending",
          is_removed: assignment.is_removed || 0,
          EstimatedTime: assignment.estimated_time || "Not specified",
        }));

        console.log("Formatted Assignments:", formattedAssignments);
        setAssignmentData(formattedAssignments);
        
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setError(error.message || "Failed to fetch assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-PH", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  // Combined filter and sort effect
  useEffect(() => {
    console.log("Assignment data in filter effect:", assignmentData);
    
    // Filter out soft-deleted assignments
    const activeAssignments = assignmentData.filter(assignment => {
      console.log(`Assignment ${assignment.Title}: is_removed = ${assignment.is_removed} (type: ${typeof assignment.is_removed})`);
      return assignment.is_removed === 0 || assignment.is_removed === "0" || assignment.is_removed === false || assignment.is_removed === null || assignment.is_removed === undefined;
    });
    
    console.log("Active assignments after filtering:", activeAssignments);
    
    // Apply search filter
    let results = activeAssignments.filter(assignment =>
      assignment.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.AssignedPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.CustomerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.Location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log("Results after search filter:", results);

    // Apply sorting
    results = sortAssignments(results, sortOption);
    
    console.log("Final results after sorting:", results);
    
    setDisplayAssignments(results);
  }, [searchQuery, sortOption, assignmentData]);

  // Sorting function
  const sortAssignments = (assignments, option) => {
    const sorted = [...assignments];
    switch(option) {
      case 'name-asc':
        return sorted.sort((a, b) => a.Title.localeCompare(b.Title));
      case 'name-desc':
        return sorted.sort((a, b) => b.Title.localeCompare(a.Title));
      case 'customer-asc':
        return sorted.sort((a, b) => a.CustomerName.localeCompare(b.CustomerName));
      case 'customer-desc':
        return sorted.sort((a, b) => b.CustomerName.localeCompare(a.CustomerName));
      case 'assigned-asc':
        return sorted.sort((a, b) => a.AssignedPerson.localeCompare(b.AssignedPerson));
      case 'assigned-desc':
        return sorted.sort((a, b) => b.AssignedPerson.localeCompare(a.AssignedPerson));
      case 'due-asc':
        return sorted.sort((a, b) => new Date(a.DueDate) - new Date(b.DueDate));
      case 'due-desc':
        return sorted.sort((a, b) => new Date(b.DueDate) - new Date(a.DueDate));
      default:
        return assignments;
    }
  };

  // Handle assignment deletion
  const handleDeleteAssignment = async (assignmentId) => {
    try {
      const userData = JSON.parse(localStorage.getItem("user_data"));
      
      console.log('Deleting assignment:', assignmentId);
      
      // TODO: Replace with actual delete API endpoint
      // await axios.patch(`http://localhost/im-2-project/api/assignments/${assignmentId}/delete`, {}, {
      //   headers: { Authorization: "Bearer " + userData.token }
      // });
      
      // For now, update local state
      setAssignmentData(prev => 
        prev.map(assignment => 
          assignment.AssignmentID === assignmentId
            ? { ...assignment, is_removed: 1 }
            : assignment
        )
      );
      
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  // Handle assignment editing
  const handleEditAssignment = (assignmentId) => {
    console.log('Editing assignment:', assignmentId);
    // TODO: Navigate to edit page or open modal
    // Example: navigate(`/assignments/${assignmentId}/edit`);
  };

  const handleCreateAssignment = () => {
    console.log('Creating new assignment');
    // TODO: Navigate to create assignment page or open modal
    // Example: navigate('/assignments/create');
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // TODO: Implement logout functionality
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          activeItem={activeItem}
          onItemChange={setActiveItem}
          onLogout={handleLogout}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cbvt-navy mx-auto mb-4"></div>
            <p className="text-cbvt-dark-gray">Loading assignments...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          activeItem={activeItem}
          onItemChange={setActiveItem}
          onLogout={handleLogout}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-cbvt-navy text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeItem}
        onItemChange={setActiveItem}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
            <button 
              onClick={handleCreateAssignment}
              className='flex items-center bg-cbvt-navy h-[40px] px-4 rounded-2xl text-white mr-10 hover:bg-opacity-90 transition-colors'
            >
              <Plus className='h-3 w-3 mr-2' />
              <span className='text-xs'>Create Assignment</span>
            </button>
          </div>

          <div className='flex flex-row gap-4'>
            {/* Search Bar */}
            <div className="mb-8">
              <div className='relative bg-white border border-gray-200 rounded-3xl h-[38px] w-full max-w-[382px]'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
                <input
                  type='text'
                  placeholder='Search assignments...'
                  className='w-full h-full pl-10 pr-4 rounded-3xl focus:outline-none focus:ring-2 focus:ring-cbvt-navy focus:ring-opacity-50'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Sort Dropdown */}
            <SortingDropdown 
              onSortChange={(sortValue) => setSortOption(sortValue)}
            />
          </div>
        </div>

        {/* Assignments Grid */}
        <div className='flex-1 overflow-y-auto px-8 pb-8'>
          {displayAssignments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-cbvt-dark-gray text-lg">
                {searchQuery ? 'No assignments found matching your search.' : 'No assignments found.'}
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
              {displayAssignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.AssignmentID}
                  Title={assignment.Title}
                  Description={assignment.Description}
                  AssignedPerson={assignment.AssignedPerson}
                  CustomerName={assignment.CustomerName}
                  Location={assignment.Location}
                  DueDate={assignment.DueDate}
                  Status={assignment.Status}
                  EstimatedTime={assignment.EstimatedTime}
                  is_removed={assignment.is_removed}
                  onDelete={() => handleDeleteAssignment(assignment.AssignmentID)}
                  onEdit={() => handleEditAssignment(assignment.AssignmentID)}
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