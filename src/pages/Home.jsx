import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Resume from '../components/Resume';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Certifications />
            <Resume /> 
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;