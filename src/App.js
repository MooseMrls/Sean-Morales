import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Smartphone, Globe, Menu, X, Sun, Moon, ChevronUp } from 'lucide-react';
import './App.css'; 

import Duciel from './images/Duciel.jpg';
import AM from './images/AM.jpg';
import mapsa from './images/mapsa.jpg'

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setIsScrolled(scrollPosition > 50);
      setShowScrollTop(scrollPosition > 300);
      
      // Check if near bottom (within 200px of bottom)
      const isNearBottom = scrollPosition + windowHeight >= documentHeight - 200;
      setIsNearBottom(isNearBottom);
      
      const sections = ['hero', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const skills = [
    { name: 'React', level: 95, color: 'skill-bar-blue-500' },
    { name: 'JavaScript', level: 90, color: 'skill-bar-blue-400' },
    { name: 'Node.js', level: 85, color: 'skill-bar-blue-600' },
    { name: 'TypeScript', level: 80, color: 'skill-bar-blue-500' },
    { name: 'HTML/CSS', level: 90, color: 'skill-bar-blue-600' },
    { name: 'Multimedia Arts'},
    { name: 'Graphic Design'},
    { name: 'IT Specialist'}
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce platform built exclusively for perfume enthusiasts and sellers. Designed to deliver a seamless shopping experience, this allows customers to browse, order, and review premium fragrances—while providing admins with full control over inventory, sales records, and performance reports.',
      tech: ['React', 'Node.js', 'MongoDB'],
      image: Duciel,
      github: 'https://github.com/MooseMrls',
      live: 'https://duciel.vercel.app/'
    },
    {
      title: 'Management System',
      description: 'An all-in-one management system designed specifically for water refilling stations. It offers seamless tracking of daily sales, maintenance schedules, and customer transactions—empowering water station owners and staff to run operations smoothly and efficiently.',
      tech: ['React', 'Express', 'MongoDB'],
      image: AM,
      github: 'https://github.com/MooseMrls',
      live: 'https://aquamom.vercel.app/'
    },
    {
      title: 'Management App',
      description: 'A comprehensive employee management system designed to streamline daily time tracking and workforce administration. Ideal for small to medium-sized organizations, the app allows HR personnel and managers to efficiently monitor employee attendance, file and approve leave requests, and manage employee records.',
      tech: ['Node.js', 'Express', 'Bible API', 'HTML', 'CSS'],
      image: mapsa,
      github: 'https://github.com/MooseMrls',
      live: 'https://mapsa.onrender.com/home.html'
    }
  ];

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Frontend Development',
      description: 'Creating responsive, interactive user interfaces with modern frameworks like React.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Backend Development',
      description: 'Building robust server-side applications with Node.js, and Python.'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Designing intuitive user experiences with modern design principles and accessibility in mind.'
    }
  ];

const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  
  const serviceId = 'service_wsbuoxp';
  const templateId = 'template_dim6sic';
  const userId = 'HECJM-eRsITMpWKj5';
  
  emailjs.send(serviceId, templateId, {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: 'morales.seanpatrick@gmail.com'
  }, userId)
  .then((response) => {
    alert('Message sent successfully!');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  }, (error) => {
    alert('Failed to send message. Please try again later.');
    console.error('EmailJS error:', error);
  });
};

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed-nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-inner">
            <div className="nav-logo">
              <span className="text-blue-400">Portfolio</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="nav-desktop">
              <div className="nav-desktop-items">
                {['hero', 'about', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`nav-item ${activeSection === section ? 'nav-item-active' : 'nav-item-inactive'}`}
                  >
                    {section === 'hero' ? 'Home' : section}
                  </button>
                ))}
                
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="theme-toggle-btn"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile menu button and theme toggle */}
            <div className="mobile-controls">
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn mobile-theme-toggle"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              {/* <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mobile-menu-btn"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button> */}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-items">
              {['hero', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="mobile-menu-item"
                >
                  {section === 'hero' ? 'Home' : section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content animate-fade-in">
          <h1 className="hero-title">
            Sean Patrick Morales
          </h1>
          <p className="hero-subtitle">
             Web Developer crafting exceptional digital experiences with modern technologies
          </p>
          <div className="hero-social-icons">
            <a href="https://github.com/MooseMrls" className="social-icon">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/sean-patrick-morales-22a697268/" className="social-icon">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://mail.google.com/mail/u/3/#inbox?compose=CllgCKCDlKxkWmnzBCVMSZmxdNZFCgGFBsWrbjzSMqphjVNLDvlGTZcrNFMnmWwXpMPDGclrdBV" className="social-icon">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <button
            onClick={() => scrollToSection('about')}
            className="hero-button"
          >
            Get Started
          </button>
        </div>
        
        <div className="hero-scroll-indicator">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              About Me
            </h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="about-grid">
            <div className="about-text-container">
              <p className="about-text">
                I'm a passionate web developer with over 2 years of experience creating 
                innovative digital solutions.
              </p>
              <p className="about-text">
                My approach combines technical expertise with creative problem-solving to deliver 
                exceptional user experiences. I'm constantly learning and adapting to new technologies 
                to stay at the forefront of web development.
              </p>
              <div className="about-badges">
                <span className="about-badge">2+ Years Experience</span>
                <span className="about-badge">Remote Work</span>
              </div>
            </div>
            
            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Featured Projects
            </h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="project-image-overlay"></div>
                </div>
                
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech-container">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="project-tech-item">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="project-links">
                    <a href={project.github} className="project-link">
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                    <a href={project.live} className="project-link">
                      <ExternalLink className="w-4 h-4" />
                      <span>Live</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Skills & Technologies
            </h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="contact-container">
          <div className="section-header">
            <h2 className="section-title">
              Get In Touch
            </h2>
            <div className="section-divider"></div>
            <p className="contact-description">
              Ready to start your next project? Let's collaborate and create something amazing together.
            </p>
          </div>
          
          <div className="contact-grid">
            <div className="contact-info-container">
              <div className="contact-info-item">
                <div className="contact-icon">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="contact-info-title">Email</h3>
                  <p className="contact-info-text">morales.seanpatrick@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="contact-info-title">GitHub</h3>
                  <p className="contact-info-text">github.com/moosemorales</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="contact-info-title">LinkedIn</h3>
                  <p className="contact-info-text">linkedin.com/in/sean-patrick-morales</p>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="contact-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="contact-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    className="contact-input contact-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="contact-button"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p className="footer-text">
            © 2025 Sean Patrick Morales. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`scroll-to-top ${isNearBottom ? 'scroll-to-top-prominent' : ''}`}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default App;