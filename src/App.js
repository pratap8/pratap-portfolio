import React from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Certificate from "./components/Certifications";
import Resume from "./components/Resume";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Resume />
      <Certificate />
      <Contact />
    </div>
  );
}

export default App;
