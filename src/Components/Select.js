// src/components/ui/Select.js

import React from 'react';
import './select.css'; // Optional CSS for Select

const Select = ({ className = '', children, ...props }) => {
  return (
    <select className={`select ${className}`} {...props}>
      {children}
    </select>
  );
};

export default Select;
