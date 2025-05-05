// src/Views/Insights.js -> Conceptually Blog
import React, { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Added Link
// Removed Navigation import (handled by App.js)
// Removed Footer import (handled by App.js)
import './PageStyles.css'; // Import shared styles

const Insights = () => { // Rename component if file is renamed
  const location = useLocation();
  const sectionRefs = useRef({});

  const scrollToSection = (id) => { /* ... scroll logic as before ... */ };
  useEffect(() => { /* ... effect logic as before ... */ }, [location.hash]);
  const setSectionRef = (id) => (el) => { sectionRefs.current[id] = el; };

  // TODO: Update sections for SolPower blog categories
  const sections = [
    { id: 'latest-posts', title: 'Latest Posts' },
    { id: 'solar-guides', title: 'Solar Guides' },
    { id: 'energy-news', title: 'Energy News SA' },
  ];

  // TODO: Replace with actual fetched blog post data
  const posts = [
      { slug: 'why-solar-is-smart-investment', title: 'Why Solar is a Smart Investment in South Africa Now', excerpt: 'Explore the financial benefits, payback periods, and increasing value solar adds...', categoryId: 'latest-posts'},
      { slug: 'choosing-right-battery-backup', title: 'Choosing the Right Battery Backup for Load Shedding', excerpt: 'Understand battery types, sizing, and key considerations for uninterrupted power...', categoryId: 'solar-guides'},
      { slug: 'navigating-solar-rebates-sa', title: 'Navigating Solar Rebates and Incentives in SA', excerpt: 'Stay updated on government programs and how they can reduce your installation cost...', categoryId: 'energy-news'},
  ];

  return (
    // Use classes from PageStyles.css
    <div className="page-wrapper">
      <div className="page-container">
        <h1 className="page-title">SolPower Blog & News</h1>

        <nav className="section-nav" aria-label="Blog Sections">
           {sections.map(sec => ( <button key={sec.id} onClick={() => scrollToSection(sec.id)}>{sec.title}</button> ))}
        </nav>

        {/* TODO: Implement logic to fetch and display actual posts */}
        <section id="latest-posts" ref={setSectionRef('latest-posts')} className="content-section">
          <h2>{sections.find(s=>s.id==='latest-posts').title}</h2>
          {posts.filter(p => p.categoryId === 'latest-posts').map(post => (
            <article key={post.slug} className="blog-post-summary">
              <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
              <p>{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`}>Read More →</Link>
            </article>
          ))}
          {posts.filter(p => p.categoryId === 'latest-posts').length === 0 && <p>No posts yet.</p>}
        </section>

         <section id="solar-guides" ref={setSectionRef('solar-guides')} className="content-section">
          <h2>{sections.find(s=>s.id==='solar-guides').title}</h2>
           {posts.filter(p => p.categoryId === 'solar-guides').map(post => (
            <article key={post.slug} className="blog-post-summary">
              <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
              <p>{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`}>Read More →</Link>
            </article>
          ))}
           {posts.filter(p => p.categoryId === 'solar-guides').length === 0 && <p>No guides yet.</p>}
        </section>

         <section id="energy-news" ref={setSectionRef('energy-news')} className="content-section">
          <h2>{sections.find(s=>s.id==='energy-news').title}</h2>
           {posts.filter(p => p.categoryId === 'energy-news').map(post => (
            <article key={post.slug} className="blog-post-summary">
              <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
              <p>{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`}>Read More →</Link>
            </article>
          ))}
           {posts.filter(p => p.categoryId === 'energy-news').length === 0 && <p>No news yet.</p>}
        </section>
      </div>
    </div>
  );
};

// Add some basic styles for blog post summary in PageStyles.css or a new Blog.css
/* Example in PageStyles.css:
.blog-post-summary { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #eee; }
.blog-post-summary h3 { margin-bottom: 0.5rem; font-size: 1.4rem; }
.blog-post-summary h3 a { color: #343a40; }
.blog-post-summary h3 a:hover { color: #007bff; text-decoration: none; }
.blog-post-summary p { margin-bottom: 1rem; color: #495057; font-size: 1rem; }
.blog-post-summary a:last-child { font-weight: 600; }
*/

export default Insights; // Rename export if file renamed