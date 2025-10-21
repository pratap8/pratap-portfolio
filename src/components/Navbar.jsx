import React from "react";
import "../styles/App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">P B R Pratap Singh</h2>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#certificates">Certificates</a></li>
        <li><a href="#resume">Resume</a></li>
        <li><a href="#publications">Publications</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
