// src/Components/Input.js
import React from 'react';
import './Input.css'; // Import CSS

// Reusable Input component
const Input = ({ className = '', type = 'text', ...props }) => {
  // Combine base 'input' class with any additional classes
  const inputClasses = `input ${className}`.trim();
  return <input type={type} className={inputClasses} {...props} />;
};

export default Input;