import { useState } from 'react';
import { ChevronDown } from "lucide-react";

const SortingDropdown = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Default Sorting');

  const sortingOptions = [
    { value: 'default', label: 'Default Sorting' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
  ];

  const handleSelect = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    onSortChange(option.value); // Notify parent component of the change
  };

  return (
    <div className="relative ml-[17px]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className='h-[38px] w-[180px] bg-white border border-gray-200 rounded-3xl px-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200'
      >
        <p className='text-gray-500 text-sm'>{selectedOption}</p>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1">
          {sortingOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                selectedOption === option.label ? 'text-blue-500 font-medium' : 'text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortingDropdown;