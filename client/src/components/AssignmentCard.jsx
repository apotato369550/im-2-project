import { useState, useEffect, useRef } from "react";
import { User, MapPin, Calendar, Clock, Circle, Ellipsis, Edit, Trash2 } from 'lucide-react';

export const AssignmentCard = ({
  AssignmentID, 
  Title, 
  Description, 
  AssignedPerson, 
  CustomerName, 
  Location, 
  DueDate, 
  Status,
  EstimatedTime,
  is_removed,
  onDelete, 
  onEdit
}) => {
  // For the ellipsis menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const menuRef = useRef(null);

  // Local state for current assignment data
  const [currentTitle, setCurrentTitle] = useState(Title);
  const [currentDescription, setCurrentDescription] = useState(Description);
  const [currentAssignedPerson, setCurrentAssignedPerson] = useState(AssignedPerson);
  const [currentCustomerName, setCurrentCustomerName] = useState(CustomerName);
  const [currentLocation, setCurrentLocation] = useState(Location);
  const [currentDueDate, setCurrentDueDate] = useState(DueDate);
  const [currentStatus, setCurrentStatus] = useState(Status);
  const [currentEstimatedTime, setCurrentEstimatedTime] = useState(EstimatedTime);

  // Edit form state
  const [editTitle, setEditTitle] = useState(Title);
  const [editDescription, setEditDescription] = useState(Description);
  const [editAssignedPerson, setEditAssignedPerson] = useState(AssignedPerson);
  const [editCustomerName, setEditCustomerName] = useState(CustomerName);
  const [editLocation, setEditLocation] = useState(Location);
  const [editDueDate, setEditDueDate] = useState(DueDate);
  const [editStatus, setEditStatus] = useState(Status);
  const [editEstimatedTime, setEditEstimatedTime] = useState(EstimatedTime);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle soft delete
  const handleDeleteConfirm = () => {
    onDelete(AssignmentID);
    setIsDeleteOpen(false);
    setIsMenuOpen(false);
  };

  // Handle edit
  const handleEditConfirm = () => {
    // Update local state
    setCurrentTitle(editTitle);
    setCurrentDescription(editDescription);
    setCurrentAssignedPerson(editAssignedPerson);
    setCurrentCustomerName(editCustomerName);
    setCurrentLocation(editLocation);
    setCurrentDueDate(editDueDate);
    setCurrentStatus(editStatus);
    setCurrentEstimatedTime(editEstimatedTime);

    // Call parent update function
    if (onEdit) {
      onEdit(AssignmentID, {
        Title: editTitle,
        Description: editDescription,
        AssignedPerson: editAssignedPerson,
        CustomerName: editCustomerName,
        Location: editLocation,
        DueDate: editDueDate,
        Status: editStatus,
        EstimatedTime: editEstimatedTime
      });
    }

    setIsEditOpen(false);
    setIsMenuOpen(false);
  };

  const handleEditCancel = () => {
    // Reset edit form to current values
    setEditTitle(currentTitle);
    setEditDescription(currentDescription);
    setEditAssignedPerson(currentAssignedPerson);
    setEditCustomerName(currentCustomerName);
    setEditLocation(currentLocation);
    setEditDueDate(currentDueDate);
    setEditStatus(currentStatus);
    setEditEstimatedTime(currentEstimatedTime);
    setIsEditOpen(false);
    setIsMenuOpen(false);
  };

  // Don't render if soft deleted
  if (is_removed === 1) {
    return null;
  }

  // Get status color
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white w-full h-auto rounded-xl border border-gray-200 shadow-lg p-6">
      {/* Header with Title and Menu */}
      <div className="flex justify-between items-start mb-4"> 
        <div className="flex items-start flex-1">
          <Circle className="h-[40px] w-[40px] text-gray-300 fill-current flex-shrink-0"/>
          <div className="flex flex-col ml-3 flex-1 min-w-0">
            <h3 className="text-cbvt-navy font-alegreya-sans-sc font-semibold text-lg mb-1 truncate">
              {currentTitle}
            </h3>
            <p className="text-cbvt-dark-gray text-sm line-clamp-2">
              {currentDescription}
            </p>
          </div>
        </div>
        
        {/* Ellipsis Menu */}
        <div className="relative ml-2" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Ellipsis className="h-5 w-5 text-cbvt-dark-gray"/>
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button 
                onClick={() => setIsEditOpen(true)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button 
                onClick={() => setIsDeleteOpen(true)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Assignment Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center">
          <User className="h-4 w-4 text-cbvt-gray mr-3 flex-shrink-0"/>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-cbvt-dark-gray">Assigned to</span>
            <span className="text-sm text-cbvt-navy font-medium truncate">
              {currentAssignedPerson}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <User className="h-4 w-4 text-cbvt-gray mr-3 flex-shrink-0"/>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-cbvt-dark-gray">Customer</span>
            <span className="text-sm text-cbvt-navy font-medium truncate">
              {currentCustomerName}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <MapPin className="h-4 w-4 text-cbvt-gray mr-3 flex-shrink-0"/>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-cbvt-dark-gray">Location</span>
            <span className="text-sm text-cbvt-navy truncate">
              {currentLocation}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-cbvt-gray mr-3 flex-shrink-0"/>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-cbvt-dark-gray">Due Date</span>
            <span className="text-sm text-cbvt-navy">
              {currentDueDate}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <Clock className="h-4 w-4 text-cbvt-gray mr-3 flex-shrink-0"/>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-cbvt-dark-gray">Estimated Time</span>
            <span className="text-sm text-cbvt-navy">
              {currentEstimatedTime}
            </span>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex justify-end">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(currentStatus)}`}>
          {currentStatus}
        </span>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-cbvt-navy mb-6 text-center font-alegreya-sans-sc">
                Edit Assignment
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cbvt-dark-gray mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cbvt-navy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cbvt-dark-gray mb-2">
                    Description
                  </label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cbvt-navy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cbvt-dark-gray mb-2">
                    Assigned Person
                  </label>
                  <input
                    type="text"
                    value={editAssignedPerson}
                    onChange={(e) => setEditAssignedPerson(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cbvt-navy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cbvt-dark-gray mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={editCustomerName}
                    onChange={(e) => setEditCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cbvt-navy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cbvt-dark-gray mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cbvt-navy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cbvt-dark-gray mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cbvt-navy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cbvt-dark-gray mb-2">
                    Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cbvt-navy"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cbvt-dark-gray mb-2">
                    Estimated Time
                  </label>
                  <input
                    type="text"
                    value={editEstimatedTime}
                    onChange={(e) => setEditEstimatedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cbvt-navy"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleEditCancel}
                  className="px-4 py-2 border border-gray-300 rounded-3xl shadow-md text-gray-700 hover:bg-gray-200 hover:cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditConfirm}
                  className="px-6 py-2 bg-cbvt-navy text-white rounded-3xl shadow-md hover:bg-blue-800 hover:cursor-pointer transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto mx-4">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-cbvt-navy mb-6 text-center font-alegreya-sans-sc">
                Delete Assignment
              </h2>
              <p className="text-center text-cbvt-dark-gray mb-6">
                Are you sure you want to delete "{currentTitle}"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-3xl shadow-md text-gray-700 hover:bg-gray-200 hover:cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="px-6 py-2 bg-red-600 text-white rounded-3xl shadow-md hover:bg-red-700 hover:cursor-pointer transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};