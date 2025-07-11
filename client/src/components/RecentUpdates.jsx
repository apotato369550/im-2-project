import {Circle} from 'lucide-react';

export const RecentUpdates = ({updateId, title, description, timeAgo})=> {
    return (
        <div className='flex flex-row'>
                        <Circle className='h-12 w-12 text-gray-300 fill-current mr-4 mt-3'/>

                        <div className='flex flex-col'> 
                        <p className=''>John Doe completed assignment</p>
                        <p className='text-gray-600'>AC Installation</p>
                        <p className='text-gray-600 text-xs'>2 hours ago</p>
                        </div>
                    </div>

    );
};