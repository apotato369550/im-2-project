import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ClientDashboard = () => {
    const [activeTab, setActiveTab] = useState('order-status');

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
                timestamp: "2025-01-15 10:30 AM",
                progress: 25
            },
            {
                status: "Technician En Route",
                message: "Technician is on the way to your location",
                timestamp: "2025-01-15 02:15 PM",
                progress: 50
            },
            {
                status: "Installation In Progress",
                message: "Technician is currently installing the AC unit",
                timestamp: "2025-01-15 03:45 PM",
                progress: 75
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

    const quotations = [
        {
            id: 1,
            service: "AC Installation",
            description: "Split-type air conditioning unit installation for master bedroom",
            amount: "Php 5,000.00",
            status: "Pending Review",
            date: "2025-01-14",
            validUntil: "2025-01-21" //+7 days from og date maybe?
        },
        {
            id: 2,
            service: "AC Maintenance",
            description: "Annual maintenance service for 2 units",
            amount: "Php 2,500.00", 
            status: "Pending Review",
            date: "2025-01-12",
            validUntil: "2025-01-19"
        },
        {
            id: 3,
            service: "AC Repair",
            description: "Repair and cleaning of split-type AC unit",
            amount: "Php 3,200.00",
            status: "Pending Review", 
            date: "2025-01-15",
            validUntil: "2025-01-22"
        }
    ];

  return (
    <div className="h-screen bg-white flex flex-col">
        <Navbar />
        <div className='mx-28 grid grid-cols-5 gap-3 mt-4 flex-1 overflow-hidden'>

            {/*Left div*/}
            <div className='col-span-2 py-8 px-12'>
                <div className='flex flex-row justify-start items-center gap-8 mb-8'>
                    <img src={null} alt="User Profile" className='h-36 w-36 rounded-full bg-gray-300 left-0'/>
                    <div className='flex flex-col'>
                        <h5 className='font-carme text-cbvt-blue text-2xl font-bold'>User Full Name</h5>
                        <p className='font-carme text-cbvt-navy text-lg'>User Email</p>
                    </div>
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
                    
                    <button 
                        onClick={() => setActiveTab('quotation-review')}
                        className={`w-full text-left py-3 px-6 rounded-2xl transition-colors ${
                            activeTab === 'quotation-review' 
                                ? 'bg-blue-200 text-cbvt-navy'
                                : 'text-cbvt-navy hover:bg-gray-100'
                        }`}
                    >
                        <span className='font-carme font-semibold'>Quotation Review</span>
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
                                                            <p className="text-cbvt-navy font-semibold text-sm">{update.status}</p>
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

                {activeTab === 'quotation-review' && (
                    <>
                        <h1 className='text-cbvt-navy font-alegreya-sans-sc text-3xl'>Quotation Review</h1>
                        <p className='font-carme text-gray-400 text-md'>Review and accept your service quotations.</p>
                        <hr className='border-gray-500 mt-2 mb-4'/>
                        <div className='flex-1 overflow-y-auto pr-2'>
                            {quotations.map((quotation) => (
                                <div key={quotation.id} className="border border-gray-200 shadow bg-white p-4 rounded-lg flex flex-col mb-3">
                                    <div className="flex justify-between items-center flex-row mb-2">
                                        <p className="font-alegreya-sans-sc text-cbvt-navy font-semibold text-lg">{quotation.service}</p>
                                        <p className="font-alegreya-sans-sc text-cbvt-navy font-semibold text-md">{quotation.amount}</p>
                                    </div>
                                    <p className="text-cbvt-dark-gray text-sm mb-3">{quotation.description}</p>
                                    <div className="flex justify-between items-center mb-3">
                                        <div>
                                            <p className="text-cbvt-dark-gray text-sm">Quoted on: {quotation.date}</p>
                                            <p className="text-cbvt-dark-gray text-sm">Valid until: {quotation.validUntil}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-cbvt-blue text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                                            Approve
                                        </button>
                                        <button className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-400 transition-colors">
                                            Renegotiate
                                        </button>
                                        <button className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors">
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
  )
}

export default ClientDashboard