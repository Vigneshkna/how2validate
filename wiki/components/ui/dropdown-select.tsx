import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  options: Option[];
  onChange: (value: string) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]?.value || '');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="w-64">
      <select
        value={selectedOption}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;