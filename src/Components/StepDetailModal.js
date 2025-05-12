// --- File: src/Components/StepDetailModal.js ---

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// NO CSS import here

const StepDetailModal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') { onClose(); }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) { return null; }

  return (
    <div className="step-detail-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="step-modal-title">
      <div className="step-detail-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="step-detail-modal-close" onClick={onClose} aria-label="Close details">
          <span className="material-icons-outlined">close</span>
        </button>
        <h2 id="step-modal-title" className="step-detail-modal-title">{title}</h2>
        <div className="step-detail-modal-body">{children}</div>
      </div>
    </div>
  );
};
StepDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default StepDetailModal;