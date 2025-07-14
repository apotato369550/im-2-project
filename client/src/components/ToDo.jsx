import React, { useState } from 'react';
import { Square, CheckSquare } from "lucide-react";

export const ToDo = ({ assignmentID, title }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div 
      className='flex items-center bg-white h-[38px] w-[310px] rounded-2xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors mb-3'
      onClick={handleToggle}
    >
      {isToggled ? (
        <CheckSquare className='h-3 w-3 ml-3 text-green-500' />
      ) : (
        <Square className='h-3 w-3 ml-3' />
      )}
      <p className='ml-2'>{isToggled ? <s>{title}</s> : title}</p>
    </div>
  );
};