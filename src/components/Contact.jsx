import React from "react";
import "../styles/App.css";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Contact Me</h2>
      <p className="contact-text">
        I'm open to new opportunities and collaborations. Feel free to reach out!
      </p>

      <div className="contact-links">
        <a href="mailto:phool8790@gmail.com" className="contact-btn email">
          📧 Email
        </a>
        <a 
          href="https://www.linkedin.com/in/pbrps/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn linkedin"
        >
          💼 LinkedIn
        </a>
      </div>
    </section>
  );
};

export default Contact;
