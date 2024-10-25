// src/components/ui/Input.js

import React from 'react';
import './input.css'; // Optional CSS for Input

const Input = ({ className = '', ...props }) => {
  return <input className={`input ${className}`} {...props} />;
};

export default Input;
