import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter } from "lucide-react";
import { CardHolderMd } from "../../components/CardHolderMd";
import axios from 'axios';

const WorkersPage = () => {
  const [activeItem, setActiveItem] = useState('Workers');
  const [searchQuery, setSearchQuery] = useState('');
  const [workerData, setWorkerData] = useState([]);

  //
  /*
  const workerData = [
    {
      Name: "John Doe",
      Position: "Senior Technician",
      PhoneNumber: "+63 912 345 6789",
      Email: "john.doe@gmail.com",
      ActiveTasks: 5,
      CompletedTasks: 27,
    },
    {
      Name: "John Dab",
      Position: "Senior Technician",
      PhoneNumber: "+63 912 345 6789",
      Email: "john.doe@gmail.com",
      ActiveTasks: 5,
      CompletedTasks: 27,
    },
    {
      Name: "Jane Doe",
      Position: "Senior Technician",
      PhoneNumber: "+63 912 345 6789",
      Email: "john.doe@gmail.com",
      ActiveTasks: 5,
      CompletedTasks: 27,
    },
    {
      Name: "Jane Dab",
      Position: "Senior Technician",
      PhoneNumber: "+63 912 345 6789",
      Email: "jane.dab@gmail.com",
      ActiveTasks: 5,
      CompletedTasks: 27,
    },
    {
      Name: "Jhen Doe",
      Position: "Senior Technician",
      PhoneNumber: "+63 912 345 6789",
      Email: "john.doe@gmail.com",
      ActiveTasks: 5,
      CompletedTasks: 27,
    },
    {
      Name: "Jhen Dab",
      Position: "Senior Technician",
      PhoneNumber: "+63 912 345 6789",
      Email: "john.doe@gmail.com",
      ActiveTasks: 5,
      CompletedTasks: 27,
    }
  ];
  */

  useEffect(() => {
    console.log("Works");
    const userData = JSON.parse(localStorage.getItem("user_data"));
    console.log(userData);
    axios
      .get("http://localhost/im-2-project/api/users/fetch-list", {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      })
      .then((response) => {
        console.log(response);
        /*
        format of data from api:
        [
          {
              "image_path": null
              "order_count": 0
              "total_spent": "0.000"
              "user_email": "miggycarumba912@gmail.com"
              "user_full_name": "Jose Carumba"
              "user_id": 12
              "user_type": "worker"
          }
        ]

        format i want it turned into:
        [
          {
            Name: "Jhen Dab",
            Position: "Senior Technician",
            PhoneNumber: "+63 912 345 6789",
            Email: "john.doe@gmail.com",
          }
      ]
          ALSO! VERY IMPORTAN! Render/include only the ones where user_type: "worker"
          save it to a const variable
        */
          console.log("Raw response:", response.data);

          // 🔧 Transform + filter the data
          const workersOnly = response.data
            .filter((user) => user.user_type === "worker")
            .map((user) => ({
              Name: user.user_full_name,
              Position: "Senior Technician", // placeholder
              PhoneNumber: "+63 912 345 6789", // placeholder
              Email: user.user_email,
            }));

          console.log("Formatted workers:", workersOnly);
          setWorkerData(workersOnly)
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);


  const filteredWorkers = workerData.filter(worker =>
    worker.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.Position.toLowerCase().includes(searchQuery.toLowerCase())
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
            <button className='flex items-center bg-cbvt-navy h-[40px] px-4 rounded-2xl text-white mr-10 '>
              <Plus className='h-3 w-3 mr-2' />
              <span className='text-xs'>Add New Worker</span>
            </button>
          </div>


          <div className='flex flex-row' >
            {/* Search Bar */}
            <div className="mb-8">
              <div className='relative bg-white border border-gray-200 rounded-3xl h-[38px] w-full max-w-[382px]'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
                <input
                  type='text'
                  placeholder='Search workers...'
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

        {/* Workers Grid */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="grid grid-cols-3 gap-5 mt-5">
            {workerData.map((worker) => (
              <CardHolderMd
                key={worker.Name}
                Name={worker.Name}
                Position={worker.Position}
                PhoneNumber={worker.PhoneNumber}
                Email={worker.Email}
                ActiveTasks={worker.ActiveTasks}
                CompletedTasks={worker.CompletedTasks}
              />


            ))}


          </div>
        </div>



      </div>
    </div>
  );
};

export default WorkersPage;