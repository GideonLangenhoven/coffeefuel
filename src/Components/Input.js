// src/components/Input.js - Consider moving to src/components/ui/
import React from 'react';
import './Input.css'; // Ensure CSS path is correct

// Reusable Input component
const Input = ({ className = '', ...props }) => {
  // Combine default 'input' class with any additional classes passed via props
  return <input className={`input ${className}`.trim()} {...props} />;
};

export default Input;