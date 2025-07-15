import { Link, useLocation } from "react-router-dom";
import {useState} from "react";
import{Square, CheckSquare} from 'lucide-react';


export const Checklist=({assignmentID, title})=> {
    
  const [isChecked, setIsChecked] = useState(false);

  const icon = isChecked ? (
    <CheckSquare className='h-3 w-3 ml-3 text-green-500' />
  ) : (
    <Square className='h-3 w-3 ml-3 text-gray-400' />
  );

  return (
    

      <button
        className='flex items-center bg-white h-[38px] w-[310px] rounded-2xl border border-gray-200 mb-3 hover:bg-gray-50 transition-colors'
        onClick={() => setIsChecked(!isChecked)}
      >
        {icon}
        <p className='ml-2'>{title}</p>
      </button>
   
  );
};