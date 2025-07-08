import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";

const WorkersPage = () => {
  const [activeItem, setActiveItem] = useState('Workers');

  
  const handleLogout = () => {
    console.log('Logging out...');
   
  };

  return (
    <div className="flex h-screen bg-gray-50">
     
     {/* this is the sidebar*/}
      <Sidebar 
        activeItem={activeItem}
        onItemChange={setActiveItem}
        onLogout={handleLogout}
      />

      {/* put main stuff here */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {activeItem}
          </h1>

          
        </div>
      </div>
    </div>
  );
};

export default WorkersPage;