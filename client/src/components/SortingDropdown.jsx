import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SortingDropdown = ({ 
  onSortChange, 
  sortingOptions = [
    { value: 'default', label: 'Default Sorting' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' }
  ],
  defaultValue = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    sortingOptions.find(option => option.value === defaultValue) || sortingOptions[0]
  );

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSortChange(option.value);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-gray-700">{selectedOption.label}</span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-full min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            {sortingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                  selectedOption.value === option.value 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingDropdown;