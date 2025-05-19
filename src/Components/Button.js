// src/Components/Button.js
import React from 'react';
import './button.css'; // Import CSS

// Reusable Button component using CSS classes
const Button = ({
  children,
  className = '', // Allows adding custom classes
  variant = 'primary', // Example: 'primary', 'secondary'
  type = 'button',
  disabled = false,
  ...props
}) => {
  // Combine base 'button' class, variant class, and custom classes
  const buttonClasses = `button ${variant} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;