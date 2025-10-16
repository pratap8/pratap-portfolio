import React from "react";
import "../styles/App.css";

const Certificate = () => {
  return (
    <section id="certificate" className="certificate-section">
      <h2 className="section-title">Certificate</h2>
      <p className="contact-text">
        Below are the Certifications:
      </p>

      <div className="contact-links">
        <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=6A9A38B971D667150AF032CAD22D9B57D8672D190EEECC73F310C0EF230FF291">
          <b>Oracle Certified Professional: Java SE 11 Developer</b>
        </a>
      </div>
      <div>
        <a href="https://www.credly.com/badges/c86ea5d6-ccbc-4a74-8938-75f94c3e9035?source=linked_in_profile">
          <b>Microsoft Certified: Azure Fundamentals</b>
        </a>
      </div>
      <div>
        <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=AC96673CC4202633A20710F68D79506C0BBA84CE91554DD9BD24EFE9981C2358">
          <b>Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate</b>
        </a>
      </div>
    </section>
  );
};

export default Certificate;
