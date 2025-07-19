import React, { useState } from 'react';
import { Calendar, MapPin, Pencil } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDropzone } from 'react-dropzone';

const ClientDashboard = () => {
    const [activeTab, setActiveTab] = useState('order-status');
    const [user, setUser] = useState({
      name: "User Full Name",
      email: "User Email",
      profilePic: null,
    });
    const [editProfile, setEditProfile] = useState(false);
    const [profileForm, setProfileForm] = useState({
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });
    const [isDraggingProfile, setIsDraggingProfile] = useState(false);

    const onDropProfile = (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = ev => setProfileForm(f => ({ ...f, profilePic: ev.target.result }));
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

     const workerTasks=[
    {
        TaskID: 1111,
        Title: "AC Installation",
        Description: "Install split-type air conditioning unit in master bedroom",
        Location: "Talisay, Cebu",
        StartDate: "8/13/2025",               
        StatusUpdates: [
            {
                status: "Order Confirmed",
                message: "Your order has been confirmed and assigned to a technician",
                timestamp: "2025-01-15"
            },
            {
                status: "Technician En Route",
                message: "Technician is on the way to your location",
                timestamp: "2025-01-15"
            },
            {
                status: "Installation In Progress",
                message: "Technician is currently installing the AC unit",
                timestamp: "2025-01-15"
            }
        ],
        Price: "Php 5,000.00"  

    }];

    const transactionHistory = [
        {
            id: 1,
            orderId: "ORD-001",
            service: "AC Installation",
            amount: "Php 5,000.00",
            date: "2025-01-15",
            status: "Completed"
        },
        {
            id: 2,
            orderId: "ORD-002", 
            service: "AC Repair",
            amount: "Php 3,500.00",
            date: "2025-01-10",
            status: "Completed"
        }
    ];


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
                            setProfileForm({ name: user.name, email: user.email, profilePic: user.profilePic });
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
                            {workerTasks.map((task) => (
                            <div key={task.TaskID} className="border border-gray-200 shadow bg-white p-4 rounded-lg flex flex-col mb-3">
                                <div className="flex justify-between items-center flex-row mb-2"> 
                                <p className="font-alegreya-sans-sc text-cbvt-navy font-semibold text-lg">{task.Title}</p>
                                <p className="font-alegreya-sans-sc text-cbvt-navy font-semibold text-md">{task.Price}</p>
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
                                        <span className="text-cbvt-dark-gray font-semibold text-sm">Status Updates:</span>
                                    </div>
                                    <div className="space-y-2">
                                        {task.StatusUpdates.map((update, index) => (
                                            <div key={index} className="flex items-start">
                                                <div className="w-2 h-2 bg-cbvt-navy rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <p className="text-cbvt-dark-gray text-xs mt-1">{update.message}</p>
                                                        </div>
                                                        <span className="text-gray-500 text-xs ml-2">{update.timestamp}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === 'transaction-history' && (
                    <>
                        <h1 className='text-cbvt-navy font-alegreya-sans-sc text-3xl'>Transaction History</h1>
                        <p className='font-carme text-gray-400 text-md'>View your past transactions.</p>
                        <hr className='border-gray-500 mt-2 mb-4'/>
                        <div className='flex-1 overflow-y-auto pr-2'>
                            {transactionHistory.map((transaction) => (
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
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {transaction.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
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
                    >×</button>
                    <h2 className="text-xl font-bold mb-4 text-cbvt-navy">Edit Profile</h2>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            setUser(profileForm);
                            setEditProfile(false);
                        }}
                        className="flex flex-col gap-4"
                    >
                        <div {...getProfileRootProps()} className={`h-32 w-32 mx-auto border-2 border-dashed border-blue-300 rounded-full flex flex-col items-center justify-center cursor-pointer mb-2 transition ${isProfileDragActive || isDraggingProfile ? 'bg-blue-50 border-blue-400' : ''}`}>
                            <input {...getProfileInputProps()} />
                            {profileForm.profilePic ? (
                                <img src={profileForm.profilePic} alt="Profile Preview" className="h-28 w-28 object-cover rounded-full" />
                            ) : (
                                <span className="text-gray-400 text-center">Drag & drop or click to upload<br/>profile image</span>
                            )}
                        </div>
                        <p className='text-xs text-gray-500 text-center'>Only one image can be uploaded. Uploading another will replace the current image.</p>
                        <input
                            type="text"
                            value={profileForm.name}
                            onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))}
                            className="border rounded-lg p-2"
                            placeholder="Full Name"
                        />
                        <input
                            type="email"
                            value={profileForm.email}
                            onChange={e => setProfileForm(f => ({ ...f, email: e.target.value }))}
                            className="border rounded-lg p-2"
                            placeholder="Email"
                        />
                        <button
                            type="submit"
                            className="bg-cbvt-navy text-white px-4 py-2 rounded-lg font-semibold"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        )}
    </div>
  )
}

export default ClientDashboard