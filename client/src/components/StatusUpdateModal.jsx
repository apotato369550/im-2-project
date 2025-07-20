import { useState } from 'react';
import { X, Check, Clock, Truck, MapPin, Wrench, Settings, Package, CheckCircle, Pause } from 'lucide-react';

const StatusUpdateModal = ({ isOpen, onClose, taskId, currentStatus, onStatusUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus || 'pending');
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { 
      value: 'pending', 
      label: 'Pending', 
      icon: Clock, 
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      description: 'Task is waiting to be started'
    },
    { 
      value: 'en_route', 
      label: 'En Route', 
      icon: Truck, 
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Worker is traveling to the location'
    },
    { 
      value: 'on_site', 
      label: 'On Site', 
      icon: MapPin, 
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      description: 'Worker has arrived at the location'
    },
    { 
      value: 'repairing', 
      label: 'Repairing', 
      icon: Wrench, 
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      description: 'Currently performing repair work'
    },
    { 
      value: 'installing', 
      label: 'Installing', 
      icon: Settings, 
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      description: 'Currently installing equipment'
    },
    { 
      value: 'maintaining', 
      label: 'Maintaining', 
      icon: Settings, 
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      description: 'Performing maintenance work'
    },
    { 
      value: 'delivering', 
      label: 'Delivering', 
      icon: Package, 
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      description: 'Delivering equipment or materials'
    },
    { 
      value: 'final_checks', 
      label: 'Final Checks', 
      icon: CheckCircle, 
      color: 'text-lime-600 bg-lime-50 border-lime-200',
      description: 'Performing final quality checks'
    },
    { 
      value: 'completed', 
      label: 'Completed', 
      icon: Check, 
      color: 'text-green-600 bg-green-50 border-green-200',
      description: 'Task has been completed successfully'
    },
    { 
      value: 'on_hold', 
      label: 'On Hold', 
      icon: Pause, 
      color: 'text-red-600 bg-red-50 border-red-200',
      description: 'Task is temporarily paused'
    }
  ];

  const handleStatusUpdate = async () => {
    if (selectedStatus === currentStatus) {
      onClose();
      return;
    }

    setIsUpdating(true);
    
    try {
      // Here you would make your API call to update the status
      // For now, I'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the callback function to update the parent component
      onStatusUpdate(taskId, selectedStatus);
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error updating status:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center">
        <div className="overlay"></div>
        <div className=" relative z-10 w-full max-w-md mx-4 my-8">
    
      <div className="bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold font-alegreya-sans-sc text-cbvt-navy">
            Update Task Status
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-cbvt-dark-gray mb-6">
            Select the new status for Task ID: <span className="font-semibold">#{taskId}</span>
          </p>

          {/* Status Options */}
          <div className="space-y-3">
            {statusOptions.map((status) => {
              const IconComponent = status.icon;
              const isSelected = selectedStatus === status.value;
              
              return (
                <div
                  key={status.value}
                  onClick={() => setSelectedStatus(status.value)}
                  className={`
                    border-2 rounded-lg p-4 cursor-pointer transition-all
                    ${isSelected 
                      ? `${status.color} border-current` 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      p-2 rounded-full
                      ${isSelected ? 'bg-current bg-opacity-20' : 'bg-gray-100'}
                    `}>
                      <IconComponent className={`
                        h-5 w-5
                        ${isSelected ? 'text-current' : 'text-gray-600'}
                      `} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`
                        font-semibold
                        ${isSelected ? 'text-current' : 'text-gray-900'}
                      `}>
                        {status.label}
                      </h3>
                      <p className={`
                        text-sm
                        ${isSelected ? 'text-current text-opacity-80' : 'text-gray-600'}
                      `}>
                        {status.description}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="h-5 w-5 text-current" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-cbvt-dark-gray border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleStatusUpdate}
            disabled={isUpdating}
            className={`
              px-6 py-2 bg-cbvt-navy text-white rounded-lg transition-colors
              ${isUpdating 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-700'
              }
            `}
          >
            {isUpdating ? 'Updating...' : 'Update Status'}
          </button>
        </div>
        </div>
      </div>
    </div>
 
  );
};

export default StatusUpdateModal;