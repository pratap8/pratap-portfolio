import React from "react";
import "../styles/App.css";

const Publications = () => {
  const publications = [
    {
      description: "A review on theoretical analysis for solar powered thermal system by using acetone",
      publishedIn: "AIP Publishing",
      date: "May 22, 2023",
      link: "https://pubs.aip.org/aip/acp/article-abstract/2492/1/020068/2891984/A-review-on-theoretical-analysis-for-solar-powered?redirectedFrom=fulltext",
    },
    {
      description: "Design Patent of Pepper Processing Machine",
      publishedIn: "Intellectual Property of India",
      date: "Aug 6, 2021",
      Application: "202141034362 A",
      journalNumber: "32/2021",
      link: "https://search.ipindia.gov.in/IPOJournal/Journal/ViewJournal",
    },
    
  ];

  return (
    <section id="publications" className="publications-section">
      <h2 className="section-title">Publications</h2>

      <div className="publications-grid">
        {publications.map((pub, index) => (
          <div key={index} className="publication-card">
            {/* Description */}
            <p className="pub-description">{pub.description}</p>

            {/* Details */}
            <div className="pub-details">
              {pub.publishedIn && (
                <p>
                  <strong>Published In:</strong> {pub.publishedIn}
                </p>
              )}
              {pub.date && (
                <p>
                  <strong>Date:</strong> {pub.date}
                </p>
              )}
              {pub.application && (
                <p>
                  <strong>Application No:</strong> {pub.application}
                </p>
              )}
              {pub.journalNumber && (
                <p>
                  <strong>Journal No:</strong> {pub.journalNumber}
                </p>
              )}
              {pub.volume && (
                <p>
                  <strong>Volume:</strong> {pub.volume}
                </p>
              )}
            </div>

            {/* Button */}
            <a
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="view-btn"
            >
              View Publication
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Publications;