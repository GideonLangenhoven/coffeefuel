// --- File: src/Components/LearnSolar/ArticleModal.js ---
import React, { useEffect } from 'react';
// import './ArticleModal.css'; // CSS will be handled by LearnSolar.css

const ArticleModal = ({ article, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !article) {
    return null;
  }

  return (
    <div className="article-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="article-modal-title">
      <div className="article-modal-content-container" onClick={(e) => e.stopPropagation()} role="document">
        <button className="article-modal-close-button" onClick={onClose} aria-label="Close article">
          &times;
        </button>
        <h2 id="article-modal-title" className="article-modal-title">{article.title}</h2>
        <div className="article-modal-body-content" dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  );
};

export default ArticleModal;