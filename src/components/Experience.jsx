import React from "react";
import "../styles/App.css";

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <h2 className="section-title">Experience</h2>

      <div className="experience-card">
        <h3>Software Engineer – LTIMindtree</h3>
        <p className="duration">March 2022 – June 2025 | Chennai (Hybrid)</p>
        <ul>
          <li>Developed executable code and optimized SQL queries, improving performance by 30%.</li>
          <li>Enhanced UX using Chart.js with dynamic visualizations for personalized user data.</li>
          <li>Built RESTful APIs using Spring Boot ensuring scalable backend systems.</li>
          <li>Performed code analysis with SonarQube & JUnit (90% coverage).</li>
          <li>Collaborated with cross-functional teams in agile sprints for smooth deliverables.</li>
        </ul>
      </div>
    </section>
  );
};

export default Experience;
