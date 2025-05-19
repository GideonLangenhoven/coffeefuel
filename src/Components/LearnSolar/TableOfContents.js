// src/components/LearnSolar/TableOfContents.js
import React from 'react';
import { Link } from 'react-router-dom';

const TableOfContents = ({
  searchTerm,
  setSearchTerm,
  filteredTocData,
  activeArticleData,
  expandedPillars,
  togglePillar,
  expandedSections,
  toggleSection,
  handleTocLinkClick
}) => {
  return (
    <aside className="learn-solar-toc-pane">
      <section className="learn-solar-controls-section-toc">
        <div className="search-bar-container-toc">
          <input
            type="text"
            placeholder="🔍 Search articles..."
            className="learn-solar-search-bar-toc"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search articles"
          />
        </div>
      </section>
      <nav className="toc-scroll-container" aria-label="Table of Contents Navigation">
        {filteredTocData.length > 0 ? (
          filteredTocData.map((pillar) => (
            <div key={pillar.pillarId} className="toc-pillar-group">
              <button
                type="button"
                className={`toc-pillar-title-button ${expandedPillars[pillar.pillarId] ? 'expanded' : ''}`}
                onClick={() => togglePillar(pillar.pillarId)}
                aria-expanded={!!expandedPillars[pillar.pillarId]}
                aria-controls={`pillar-content-${pillar.pillarId}`}
              >
                {pillar.pillarTitle}
                <span className="toc-expander-icon" aria-hidden="true">
                  {expandedPillars[pillar.pillarId] ? '▼' : '►'}
                </span>
              </button>
              {expandedPillars[pillar.pillarId] && (
                <div id={`pillar-content-${pillar.pillarId}`} className="toc-pillar-content">
                  {pillar.sections.map((section) => (
                    <div key={section.sectionId} className="toc-section-group">
                      <button
                        type="button"
                        className={`toc-section-title-button ${expandedSections[section.sectionId] ? 'expanded' : ''}`}
                        onClick={() => toggleSection(section.sectionId)}
                        aria-expanded={!!expandedSections[section.sectionId]}
                        aria-controls={`section-content-${section.sectionId}`}
                      >
                        {section.title}
                        <span className="toc-expander-icon" aria-hidden="true">
                          {expandedSections[section.sectionId] ? '▼' : '►'}
                        </span>
                      </button>
                      {expandedSections[section.sectionId] && (
                        <ul id={`section-content-${section.sectionId}`} className="toc-article-list">
                          {section.articles.map((article) => (
                            <li
                              key={article.slug}
                              className={`toc-article-item ${activeArticleData?.slug === article.slug ? 'active' : ''}`}
                            >
                              <Link
                                to={`/learn-solar-power/${article.slug}`}
                                onClick={(e) => handleTocLinkClick(article.slug, pillar.pillarId, section.sectionId, e)}
                                className="toc-article-link"
                                // Add aria-current if it's the active article
                                aria-current={activeArticleData?.slug === article.slug ? 'page' : undefined}
                              >
                                {article.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="toc-no-results">
            No articles found matching your search: "{searchTerm}"
          </p>
        )}
      </nav>
    </aside>
  );
};

export default TableOfContents;