import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter } from "lucide-react";
import SortingDropdown from '../../components/SortingDropdown';
import { CardHolderMd } from "../../components/CardHolderMd";
import axios from 'axios';

const WorkersPage = () => {
  const [activeItem, setActiveItem] = useState('Workers');
 
  // Search function
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter function
  const [sortOption, setSortOption] = useState('default');

  // Raw worker data from API
  const [workerData, setWorkerData] = useState([]);
  
  // Filtered and sorted workers for display
  const [displayWorkers, setDisplayWorkers] = useState([]);
  
  // Loading state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch workers data
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const userData = JSON.parse(localStorage.getItem("user_data"));
        
        if (!userData || !userData.token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          "http://localhost/im-2-project/api/users/fetch-list",
          {
            headers: {
              Authorization: "Bearer " + userData.token,
            },
          }
        );

        console.log("Raw response:", response.data);

        // Transform and filter the data to include only workers
        const workersOnly = response.data
          .filter((user) => user.user_type === "worker")
          .map((user) => ({
            Name: user.user_full_name,
            worker_id: user.user_id,
            Position: user.user_type,
            is_removed: user.is_removed,
            Email: user.user_email,
          }));

        console.log("Formatted workers:", workersOnly);
        setWorkerData(workersOnly);
        
      } catch (error) {
        console.error("Error fetching workers:", error);
        setError(error.message || "Failed to fetch workers");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  // Combined filter and sort effect
  useEffect(() => {
    console.log("Worker data in filter effect:", workerData);
    
    // Filter out soft-deleted workers
    const activeWorkers = workerData.filter(worker => {
      console.log(`Worker ${worker.Name}: is_removed = ${worker.is_removed} (type: ${typeof worker.is_removed})`);
      return worker.is_removed === 0 || worker.is_removed === "0" || worker.is_removed === false || worker.is_removed === null || worker.is_removed === undefined;
    });
    
    console.log("Active workers after filtering:", activeWorkers);
    
    // Apply search filter
    let results = activeWorkers.filter(worker =>
      worker.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.Position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.Email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log("Results after search filter:", results);

    // Apply sorting
    results = sortWorkers(results, sortOption);
    
    console.log("Final results after sorting:", results);
    
    setDisplayWorkers(results);
  }, [searchQuery, sortOption, workerData]);

  // Sorting function
  const sortWorkers = (workers, option) => {
    const sorted = [...workers];
    switch(option) {
      case 'name-asc':
        return sorted.sort((a, b) => a.Name.localeCompare(b.Name));
      case 'name-desc':
        return sorted.sort((a, b) => b.Name.localeCompare(a.Name));
      case 'email-asc':
        return sorted.sort((a, b) => a.Email.localeCompare(b.Email));
      case 'email-desc':
        return sorted.sort((a, b) => b.Email.localeCompare(a.Email));
      default:
        return workers;
    }
  };

  const handleWorkerDelete = (workerId) => {
    // TODO: Implement delete functionality
    console.log('Deleting worker:', workerId);
    // You can add API call here to soft delete the worker
  };

  const handleWorkerEdit = (workerId) => {
    // TODO: Implement edit functionality
    console.log('Editing worker:', workerId);
    // You can add navigation to edit page or open modal here
  };

  const handleAddWorker = () => {
    // TODO: Implement add worker functionality
    console.log('Adding new worker');
    // You can add navigation to add worker page or open modal here
  };

  const handleLogout = (e)=>{
    localStorage.removeItem("user_data");
    navigate("/");
  }

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
            <p className="text-cbvt-dark-gray">Loading workers...</p>
          </div>
        </div>
      </div>
    );
  }

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
                Manage your team.
              </p>
            </div>
            <button 
              onClick={handleAddWorker}
              className='flex items-center bg-cbvt-navy h-[40px] px-4 rounded-2xl text-white mr-10 hover:bg-opacity-90 transition-colors'
            >
              <Plus className='h-3 w-3 mr-2' />
              <span className='text-xs'>Add New Worker</span>
            </button>
          </div>

          <div className='flex flex-row gap-4'>
            {/* Search Bar */}
            <div className="mb-8">
              <div className='relative bg-white border border-gray-200 rounded-3xl h-[38px] w-full max-w-[382px]'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
                <input
                  type='text'
                  placeholder='Search workers...'
                  className='w-full h-full pl-10 pr-4 rounded-3xl focus:outline-none focus:ring-2 focus:ring-cbvt-navy focus:ring-opacity-50'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Sorting Dropdown */}
            <SortingDropdown 
              onSortChange={(sortValue) => setSortOption(sortValue)}
            />
          </div>
        </div>

        {/* Workers Grid */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          {displayWorkers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-cbvt-dark-gray text-lg">
                {searchQuery ? 'No workers found matching your search.' : 'No workers found.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {displayWorkers.map((worker) => (
                <CardHolderMd
                  key={worker.worker_id}
                  Name={worker.Name}
                  Position={worker.Position}
                  Email={worker.Email}
                  is_removed={worker.is_removed}
                  onDelete={() => handleWorkerDelete(worker.worker_id)}
                  onEdit={() => handleWorkerEdit(worker.worker_id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkersPage;