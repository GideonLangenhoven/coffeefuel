// src/Components/LearnSolar/ArticleContent.js
import React from 'react';
import { Link } from 'react-router-dom';

const ArticleContent = ({ activeArticleData, isLoading, searchTerm, filteredTocDataIsEmpty }) => {
  if (isLoading) {
    return (
      <div className="learn-solar-article-pane">
        <div className="learn-solar-article-content learn-solar-loading">
          <div className="article-loading-indicator">
            <div className="spinner"></div>
            <p>Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (searchTerm && filteredTocDataIsEmpty) {
    return (
      <div className="learn-solar-article-pane">
        <div className="learn-solar-article-content learn-solar-no-selection">
          <p className="no-article-selected-message">
            No articles match your search. Try a different search term.
          </p>
        </div>
      </div>
    );
  }

  if (!activeArticleData) {
    return (
      <div className="learn-solar-article-pane">
        <div className="learn-solar-article-content learn-solar-no-selection">
          <p className="no-article-selected-message">
            Please select an article from the table of contents to view its content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="learn-solar-article-pane">
      {/* Article Header with Logo */}
      <div className="article-header">
        <div className="article-logo-container">
          <img src={require('../../assets/images/logo1.png')} alt="SolPower Logo" className="article-logo" />
        </div>
        <div className="article-cta-container">
          <Link to="/contact" className="article-cta-button">
            Get a Free Quote
          </Link>
        </div>
      </div>

      <article className="learn-solar-article-content" id="learn-solar-article-content-area">
        <h2 className="article-title">{activeArticleData.title}</h2>
        <div className="article-body" dangerouslySetInnerHTML={{ __html: activeArticleData.content }} />
        
        {/* Bottom Call to Action */}
        <div className="article-footer-cta">
          <p>Ready to start your solar journey?</p>
          <Link to="/contact" className="article-cta-button article-cta-button-large">
            Contact Us for a Free Quote
          </Link>
        </div>
      </article>
    </div>
  );
};

export default ArticleContent;
