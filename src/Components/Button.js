// src/components/ui/Button.js

import React from 'react';
import './button.css'; // Optional CSS for Button

const Button = ({ children, className = '', ...props }) => {
  return (
    <button className={`button ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
