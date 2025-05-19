// src/Components/Select.js
import React from 'react';
import './select.css'; // Import CSS

// Reusable Select component
const Select = ({ className = '', children, ...props }) => {
  // Combine base 'select' class with any additional classes
  const selectClasses = `select ${className}`.trim();
  return (
    <select className={selectClasses} {...props}>
      {children}
    </select>
  );
};

export default Select;