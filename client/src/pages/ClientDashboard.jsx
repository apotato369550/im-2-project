import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Pencil } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ClientDashboard = () => {
    const [activeTab, setActiveTab] = useState('order-status');
    const [user, setUser] = useState({
      name: "User Full Name",
      email: "User Email",
      profilePic: null,
    });
    const [userOrders, setUserOrders] = useState([]);
    const [orderUpdates, setOrderUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editProfile, setEditProfile] = useState(false);
    const [profileForm, setProfileForm] = useState({
      name: "",
      email: "",
      profilePic: null,
      profileFile: null, // Add this to store the actual file object
    });
    const [isDraggingProfile, setIsDraggingProfile] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false); // Add loading state for profile update

    const onDropProfile = (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = ev => setProfileForm(f => ({ 
          ...f, 
          profilePic: ev.target.result,
          profileFile: file // Store the actual file object
        }));
        reader.readAsDataURL(file);
      }
      setIsDraggingProfile(false);
    };

    const {
      getRootProps: getProfileRootProps,
      getInputProps: getProfileInputProps,
      isDragActive: isProfileDragActive,
    } = useDropzone({
      accept: { 'image/*': [] },
      multiple: false,
      onDrop: onDropProfile,
      onDragEnter: () => setIsDraggingProfile(true),
      onDragLeave: () => setIsDraggingProfile(false),
    });

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user_data'));
        setUser({
            name: userData.user_full_name,
            email: userData.user_email,
            profilePic: userData.image_path || null
        });

        setProfileForm({
            name: userData.user_full_name,
            email: userData.email,
            profilePic: userData.image_path || null,
            profileFile: null
        });

        const getClientOrder = async () => {
            try {
                const response = await axios.get('http://localhost/im-2-project/api/orders', {
                    headers: {
                        Authorization: "Bearer " + userData.token
                    }
                });
                
                // Handle different response structures
                let ordersData = [];
                if (response.data.data && Array.isArray(response.data.data)) {
                    ordersData = response.data.data;
                } else if (response.data && Array.isArray(response.data)) {
                    ordersData = response.data;
                } else if (response.data.orders && Array.isArray(response.data.orders)) {
                    ordersData = response.data.orders;
                }
                 console.log(response);
                setUserOrders(ordersData);
            } catch (error) {
                setUserOrders([]);
            }
        };

        const getOrderUpdates = async () => {
            try {
                const response = await axios.get(`http://localhost/im-2-project/api/updates/${userData.user_id}`, { 
                    headers: { 
                        Authorization: "Bearer " + userData.token
                    }
                });
               
                // Handle different response structures
                let updatesData = [];
                if (response.data.data && Array.isArray(response.data.data)) {
                    updatesData = response.data.data;
                } else if (response.data && Array.isArray(response.data)) {
                    updatesData = response.data;
                } else if (response.data.updates && Array.isArray(response.data.updates)) {
                    updatesData = response.data.updates;
                }
                
                setOrderUpdates(updatesData);
            } catch (err) {
                setOrderUpdates([]);
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([getOrderUpdates(), getClientOrder()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    // Transform and combine orders with their updates
    const transformedOrders = userOrders.map(order => {
        // For retail orders, don't show assignment updates
        let assignmentUpdates = [];
        
        if (order.service_type !== 'Retail') {
            // Find assignment updates for this order using the assignment_id
            assignmentUpdates = orderUpdates.filter(update => {
                return update.assignment_id === order.assignment_id;
            });
        }

        const transformedOrder = {
            TaskID: order.order_id,
            Title: order.service_type || "Service Order",
            Description: order.service_details || order.description || "No description available",
            Location: order.address || "Location not specified", 
            StartDate: order.order_date_created || "Date not specified",
            AssignmentUpdates: assignmentUpdates,
            Price: order.total_payment ? `Php ${parseFloat(order.total_payment).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "Quotation Still Pending",
            OrderStatus: order.order_status || "Pending",
            ServiceType: order.service_type || "Service"
        };

        return transformedOrder;
    });

    // Create transaction history from completed orders
    const transactionHistory = userOrders
        .filter(order => order.order_status === 'Completed' || order.order_status === 'Assigned')
        .map((order, index) => ({
            id: order.order_id,
            orderId: `ORD-${String(order.order_id).padStart(3, '0')}`,
            service: order.service_type || "Service",
            amount: order.total_payment ? `Php ${parseFloat(order.total_payment).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "Amount not available",
            date: order.order_date_created || "Date not available",
            status: order.order_status || "Unknown"
        }));

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const userData = JSON.parse(localStorage.getItem('user_data'));
        
        try {
            setIsUpdatingProfile(true);
            
            // Create FormData object
            const formData = new FormData();
            
            // Append text fields
            formData.append('user_full_name', profileForm.name);
            formData.append('user_email', profileForm.email);
            
            // Handle profile image if a new file was uploaded
            if (profileForm.profileFile) {
                formData.append('image', profileForm.profileFile);
            }
            
            // Send the request
            const response = await axios.post(
                `http://localhost/im-2-project/api/users/update-profile/${userData.user_id}`, 
                formData,
                { 
                    headers: { 
                        Authorization: "Bearer " + userData.token,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
            console.log('Profile update response:', response.data);
            
            // Update local state
            const updatedUser = {
                name: profileForm.name,
                email: profileForm.email,
                profilePic: response.data.image_path || profileForm.profilePic
            };
            setUser(updatedUser);
            
            // Update localStorage with new user data
            const updatedUserData = {
                ...userData,
                user_full_name: profileForm.name,
                email: profileForm.email,
                image_path: response.data.image_path || profileForm.profilePic
            };
            localStorage.setItem('user_data', JSON.stringify(updatedUserData));
            
            // Close modal and reset form
            setEditProfile(false);
            setProfileForm({
                ...profileForm,
                profileFile: null // Reset the file object
            });
            
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    if (loading) {
        return (
            <div className="h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cbvt-navy mx-auto"></div>
                        <p className="mt-4 text-cbvt-navy font-carme">Loading your dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-white flex flex-col">
            <Navbar />
            <div className='mx-28 grid grid-cols-5 gap-3 mt-4 flex-1 overflow-hidden'>

                {/*Left div*/}
                <div className='col-span-2 py-8 px-12'>
                    <div className='flex flex-row justify-between items-center gap-8 mb-8'>
                        <div className='flex flex-row items-center gap-8'>
                            <img
                                src={user.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)}
                                alt="User Profile"
                                className='h-36 w-36 rounded-full bg-gray-300 left-0 object-cover'
                            />
                            <div className='flex flex-col'>
                                <h5 className='font-carme text-cbvt-blue text-2xl font-bold'>{user.name}</h5>
                                <p className='font-carme text-cbvt-navy text-lg'>{user.email}</p>
                            </div>
                        </div>
                        <button
                            className="p-2 rounded-full hover:bg-gray-200 text-cbvt-navy"
                            onClick={() => {
                                // Pre-populate the form with current user data
                                setProfileForm({ 
                                    name: user.name, 
                                    email: user.email, 
                                    profilePic: user.profilePic,
                                    profileFile: null
                                });
                                setEditProfile(true);
                            }}
                            aria-label="Edit Profile"
                        >
                            <Pencil size={28} />
                        </button>
                    </div>
                    
                    {/* Navigation Links */}
                    <div className='space-y-2'>
                        <button 
                            onClick={() => setActiveTab('order-status')}
                            className={`w-full text-left py-3 px-6 rounded-2xl transition-colors ${
                                activeTab === 'order-status' 
                                    ? 'bg-blue-200 text-cbvt-navy' 
                                    : 'text-cbvt-navy hover:bg-gray-100'
                            }`}
                        >
                            <span className='font-carme font-semibold'>Order Status</span>
                        </button>
                        
                        <button 
                            onClick={() => setActiveTab('transaction-history')}
                            className={`w-full text-left py-3 px-6 rounded-2xl transition-colors ${
                                activeTab === 'transaction-history' 
                                    ? 'bg-blue-200 text-cbvt-navy'
                                    : 'text-cbvt-navy hover:bg-gray-100'
                            }`}
                        >
                            <span className='font-carme font-semibold'>Transaction History</span>
                        </button>
                    </div>
                </div>

                {/*Right div*/}
                <div className='col-span-3 py-6 flex flex-col overflow-hidden'>
                    {activeTab === 'order-status' && (
                        <>
                            <h1 className='text-cbvt-navy font-alegreya-sans-sc text-3xl'>Order Status</h1>
                            <p className='font-carme text-gray-400 text-md'>Monitor your order.</p>
                            <hr className='border-gray-500 mt-2 mb-4'/>
                            <div className='flex-1 overflow-y-auto pr-2'>
                                {transformedOrders.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 font-carme">No orders found.</p>
                                    </div>
                                ) : (
                                    transformedOrders.map((task) => (
                                        <div key={task.TaskID} className="border border-gray-200 shadow bg-white p-4 rounded-lg flex flex-col mb-3">
                                            <div className="flex justify-between items-center flex-row mb-2"> 
                                                <p className="font-alegreya-sans-sc text-cbvt-navy font-semibold text-lg">{task.Title}</p>
                                                <p className="font-alegreya-sans-sc text-cbvt-navy font-semibold text-md">{task.Price}</p>
                                            </div>

                                            {/* Order Status Badge */}
                                            <div className="mb-2">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                                    task.OrderStatus === 'Completed' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : task.OrderStatus === 'Assigned'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : task.OrderStatus === 'Pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    Order Status: {task.OrderStatus}
                                                </span>
                                            </div>

                                            <div className="flex items-center flex-row mb-1">
                                                <Calendar className="h-3 w-3 text-gray-600"/>
                                                <p className="pl-2 text-cbvt-dark-gray text-sm">{task.StartDate}</p>
                                            </div>

                                            <div className="flex items-center flex-row mb-3">
                                                <MapPin className="h-3 w-3 text-gray-600"/>
                                                <p className="pl-2 text-cbvt-dark-gray text-sm">{task.Location}</p>
                                            </div>

                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="mb-2">
                                                    <span className="text-cbvt-dark-gray font-semibold text-sm">
                                                        {task.ServiceType === 'Retail' ? 'Order Status:' : 'Assignment Updates:'}
                                                    </span>
                                                </div>
                                                <div className="space-y-2">
                                                    {task.ServiceType === 'Retail' ? (
                                                        // For retail, just show the order status
                                                        <div className="flex items-start">
                                                            <div className="w-2 h-2 bg-cbvt-navy rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                                                            <div className="flex-1">
                                                                <div className="flex justify-between items-start">
                                                                    <div className="flex-1">
                                                                        <p className="text-cbvt-dark-gray text-xs font-medium">{task.OrderStatus}</p>
                                                                        <p className="text-cbvt-dark-gray text-xs mt-1">Order status: {task.OrderStatus.toLowerCase()}</p>
                                                                    </div>
                                                                    <span className="text-gray-500 text-xs ml-2">{task.StartDate}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        // For non-retail, show assignment updates
                                                        task.AssignmentUpdates.length === 0 ? (
                                                            <div className="flex items-start">
                                                                <div className="w-2 h-2 bg-cbvt-navy rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                                                                <div className="flex-1">
                                                                    <div className="flex justify-between items-start">
                                                                        <div className="flex-1">
                                                                            <p className="text-cbvt-dark-gray text-xs font-medium">Order Created</p>
                                                                            <p className="text-cbvt-dark-gray text-xs mt-1">Order has been {task.OrderStatus.toLowerCase()}</p>
                                                                        </div>
                                                                        <span className="text-gray-500 text-xs ml-2">{task.StartDate}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            task.AssignmentUpdates.map((update, index) => (
                                                                <div key={update.update_id || index} className="flex items-start">
                                                                    <div className="w-2 h-2 bg-cbvt-navy rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                                                                    <div className="flex-1">
                                                                        <div className="flex justify-between items-start">
                                                                            <div className="flex-1">
                                                                                <p className="text-cbvt-dark-gray text-xs font-medium">Assignment Update</p>
                                                                                <p className="text-cbvt-dark-gray text-xs mt-1">{update.update_message || "Assignment status updated"}</p>
                                                                            </div>
                                                                            <span className="text-gray-500 text-xs ml-2">{update.date_last_update || "Date not available"}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === 'transaction-history' && (
                        <>
                            <h1 className='text-cbvt-navy font-alegreya-sans-sc text-3xl'>Transaction History</h1>
                            <p className='font-carme text-gray-400 text-md'>View your past transactions.</p>
                            <hr className='border-gray-500 mt-2 mb-4'/>
                            <div className='flex-1 overflow-y-auto pr-2'>
                                {transactionHistory.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 font-carme">No completed transactions found.</p>
                                    </div>
                                ) : (
                                    transactionHistory.map((transaction) => (
                                        <div key={transaction.id} className="border border-gray-200 shadow bg-white p-4 rounded-lg flex flex-col mb-3">
                                            <div className="flex justify-between items-center flex-row mb-2">
                                                <p className="font-alegreya-sans-sc text-cbvt-navy font-semibold text-lg">{transaction.service}</p>
                                                <p className="font-alegreya-sans-sc text-cbvt-navy font-semibold text-md">{transaction.amount}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-cbvt-dark-gray text-sm">Order ID: {transaction.orderId}</p>
                                                    <p className="text-cbvt-dark-gray text-sm">Date: {transaction.date}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    transaction.status === 'Completed' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : transaction.status === 'Assigned'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {transaction.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
            
            {editProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-cbvt-navy text-2xl font-bold"
                            onClick={() => setEditProfile(false)}
                            disabled={isUpdatingProfile}
                        >×</button>
                        <h2 className="text-xl font-bold mb-4 text-cbvt-navy">Edit Profile</h2>
                        <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
                            <div {...getProfileRootProps()} className={`h-32 w-32 mx-auto border-2 border-dashed border-blue-300 rounded-full flex flex-col items-center justify-center cursor-pointer mb-2 transition ${isProfileDragActive || isDraggingProfile ? 'bg-blue-50 border-blue-400' : ''}`}>
                                <input {...getProfileInputProps()} />
                                {profileForm.profilePic ? (
                                    <img src={profileForm.profilePic} alt="Profile Preview" className="h-28 w-28 object-cover rounded-full" />
                                ) : (
                                    <span className="text-gray-400 text-center text-xs">Drag & drop or click to upload<br/>profile image</span>
                                )}
                            </div>
                            <p className='text-xs text-gray-500 text-center'>Only one image can be uploaded. Uploading another will replace the current image.</p>
                            <input
                                type="text"
                                value={profileForm.name}
                                onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))}
                                className="border rounded-lg p-2"
                                placeholder="Full Name"
                                required
                                disabled={isUpdatingProfile}
                            />
                            <input
                                type="email"
                                value={profileForm.email}
                                onChange={e => setProfileForm(f => ({ ...f, email: e.target.value }))}
                                className="border rounded-lg p-2"
                                placeholder="Email"
                                required
                                disabled={isUpdatingProfile}
                            />
                            <button
                                type="submit"
                                className="bg-cbvt-navy text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isUpdatingProfile}
                            >
                                {isUpdatingProfile ? 'Updating...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ClientDashboard