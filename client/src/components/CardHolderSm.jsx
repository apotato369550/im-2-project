import { Link, useLocation } from "react-router-dom";

export const CardHolderSm = ({ title, amount, icon: Icon }) => {
  return (
    <div className='bg-white shadow-lg rounded-xl border border-gray-200 h-[140px] w-[276px] p-5'>
      <div className="flex flex-row justify-between items-start">
        <p className='text-gray-700 mt-2'>{title}</p>
        <div className="flex items-center justify-center h-10 w-10 bg-cbvt-navy rounded-lg">
          <Icon className="h-5 w-5 text-blue-200" />
        </div>
      </div>
      <p className='text-cbvt-navy font-alegreya-sans-sc text-3xl font-bold mt-3'>
        {amount}
      </p>
    </div>
  );
};