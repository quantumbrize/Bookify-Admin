import { useState } from 'react';
import { DropdownProps } from '../interfaces/DropdownProps';

const Dropdown = ({ label, options, selected, onSelect }:DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find(option => option.value === selected)?.label || 'Select an option';

  return (
    <div className="relative">
      {
        label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        )
      }
     
      <button
        type="button"
        className="w-full px-4 p-2.5 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabel}
      </button>
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150"
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
