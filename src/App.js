import React, { useState, useEffect, useRef } from 'react'; 
import emailjs from 'emailjs-com';
import Lottie from 'lottie-react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Smartphone, Globe, Menu, X, Sun, Moon, ChevronUp, User } from 'lucide-react';
import './App.css'; 

import Duciel from './images/Duciel.jpg';
import AM from './images/AM.jpg';
import mapsa from './images/mapsa.jpg'
import nugits from './images/nugits.png';
import bul from './images/bulcard.png'; 
import base from './images/base.png'; 
import gw from './images/gw.png';
import rh from './images/rh.png';

import animationData from './animations/Batman.json'; 
import amongus from './animations/amongus.json';
import mario from './animations/mario.json';
import arcade from './animations/arcade.json';
import pp from './animations/Paper Plane.json';

import profileImage from './images/me.jpg'; 

const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollY;
};

const useIntersectionObserver = (threshold = 0.1) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isIntersecting];
};

const ScrollReveal = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const [ref, isIntersecting] = useIntersectionObserver(0.1);
  
  const getAnimationClass = () => {
    switch (direction) {
      case 'left': return 'scroll-reveal-left';
      case 'right': return 'scroll-reveal-right';
      case 'scale': return 'scroll-reveal-scale';
      case 'fade': return 'scroll-reveal-fade';
      default: return 'scroll-reveal';
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${isIntersecting ? 'revealed' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const StaggeredReveal = ({ children, className = '', staggerDelay = 100 }) => {
  const [ref, isIntersecting] = useIntersectionObserver(0.1);
  
  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`scroll-reveal-stagger ${isIntersecting ? 'revealed' : ''}`}
          style={{
            transitionDelay: `${index * staggerDelay}ms`
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

const ParallaxElement = ({ children, speed = 0.5, className = '' }) => {
  const scrollY = useScrollAnimation();
  const [ref, isIntersecting] = useIntersectionObserver(0.1);
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isIntersecting ? `translateY(${scrollY * speed}px)` : 'translateY(0px)',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isGalleryModalClosing, setIsGalleryModalClosing] = useState(false);
  const [isDesignModalClosing, setIsDesignModalClosing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
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
    
    const isNearBottom = scrollPosition + windowHeight >= documentHeight - 200;
    setIsNearBottom(isNearBottom);
    
    const sections = ['hero', 'about', 'skills', 'projects', 'gallery', 'contact'];
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

// Modal functions
const closeGalleryModal = () => {
  setIsGalleryModalClosing(true);
  setTimeout(() => {
    setIsGalleryModalOpen(false);
    setIsGalleryModalClosing(false);
  }, 300);
};

const openModal = (design) => {
  setSelectedDesign(design);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsDesignModalClosing(true);
  setTimeout(() => {
    setIsModalOpen(false);
    setIsDesignModalClosing(false);
    setSelectedDesign(null);
  }, 300);
};

const openProfileModal = () => {
  // Scroll to top first
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // Wait for scroll to complete (approximately 500ms)
  setTimeout(() => {
    setIsProfileModalOpen(true);
  }, 500);
};

const closeProfileModal = () => {
    setIsClosing(true);
    
    // Wait for animation to complete before hiding modal
    setTimeout(() => {
      setIsProfileModalOpen(false);
      setIsClosing(false);
    }, 300); // 300ms matches the animation duration
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isProfileModalOpen) {
        closeProfileModal();
      }
    };

    if (isProfileModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isProfileModalOpen]);

  // if (!isProfileModalOpen) return null;

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
    },
      {
      title: 'Guidance Web App',
      description: 'A digital platform designed to enhance student support through a blend of emotional, academic, and personal growth tools. Built with a modern, user-friendly interface, the system empowers guidance counselors and students to connect meaningfully in a safe and supportive environment.',
      tech: ['Python', 'MongoDB'],
      image: nugits,
      github: 'https://github.com/MooseMrls',
      live: 'https://www.nu-gits.com/'
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

  const designs = [
  { id: 1, image: AM, title: 'Aquamom Water Station', category: '' },
  { id: 2, image: bul, title: 'Bulldogs Card Sticker', category: '' },
  { id: 3, image: base, title: 'The Basement', category: '' },
  { id: 4, image: rh, title: 'Royal Hooligans', category: '' },
  { id: 5, image: gw, title: 'Goldwings Insurance Agency', category: '' },
  // { id: 6, image: design6, title: 'Design 6', category: 'Digital' },
  // Add more designs as needed
];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed-nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-inner">
            <div className="nav-logo">
              <button 
                onClick={openProfileModal}
                className="portfolio-logo-btn"
                aria-label="View profile"
              >
                <span className="portt">Portfolio</span>
              </button>
            </div>

            {/* Profile Modal */}
            {isProfileModalOpen && (
              <div className={`profile-modal ${isClosing ? 'closing' : ''}`}>
                <div className="profile-modal-overlay" onClick={closeProfileModal}></div>
                <div className="profile-modal-content">
                
                  <div className="profile-modal-inner">
                    <div className="profile-image-container">
                      <div className="profile-image-wrapper">
                        <img 
                          src={profileImage} 
                          alt="Sean Patrick Morales"
                          className="profile-image"
                        />
                      </div>
                      <div className="profile-rings">
                        <div className="profile-ring profile-ring-1"></div>
                        <div className="profile-ring profile-ring-2"></div>
                        <div className="profile-ring profile-ring-3"></div>
                      </div>
                    </div>
                    
                    <div className="profile-info">
                      <h2 className="profile-name">Sean Patrick Morales</h2>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Desktop Navigation */}
            <div className="nav-desktop">
              <div className="nav-desktop-items">
                {['hero', 'about', 'projects', 'gallery', 'skills', 'contact'].map((section) => (
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
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-items">
            {['hero', 'about', 'skills', 'projects', 'gallery', 'contact'].map((section) => (
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
        <ParallaxElement speed={0.3} className="hero-content animate-fade-in">
          <ScrollReveal direction="fade" delay={200}>
            <h1 className="hero-title">
              Sean Patrick Morales
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={400}>
            <p className="hero-subtitle">
               Web Developer crafting exceptional digital experiences with modern technologies
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={600}>
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
          </ScrollReveal>
          <ScrollReveal direction="up" delay={800}>
            <button
              onClick={() => scrollToSection('about')}
              className="hero-button"
            >
              Get Started
            </button>
          </ScrollReveal>
        </ParallaxElement>
        
        <div className="hero-scroll-indicator">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="section-container">
          <ScrollReveal direction="up" delay={100}>
            <div className="section-header">
              <h2 className="section-title">
                About Me
              </h2>
              <div className="section-divider"></div>
            </div>
          </ScrollReveal>
          
          <div className="about-grid">
            <ScrollReveal direction="left" delay={200}>
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
            </ScrollReveal>
            
            <StaggeredReveal className="services-grid" staggerDelay={150}>
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              ))}
            </StaggeredReveal>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="section-container">
          <ScrollReveal direction="up" delay={100}>
            <div className="section-header">
              <h2 className="section-title">
                Featured Projects
              </h2>
              <div className="section-divider"></div>
            </div>
          </ScrollReveal>
          
          <StaggeredReveal className="projects-grid" staggerDelay={200}>
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
          </StaggeredReveal>
        </div>
      </section>

{/* Gallery Modal */}
<section id="gallery" className="gal-section">
  <div className="section-container">
    <ScrollReveal direction="up" delay={100}>
      <div className="section-header">
        <h2 className="section-title">
          Gallery
        </h2>
        <div className="section-divider"></div>
        <p className="contact-description">
          Explore my graphic design portfolio
        </p>
      </div>
    </ScrollReveal>

    <ScrollReveal direction="up" delay={200}>
      <div className="gallery-button-container">
        <button 
          className="gallery-button"
          onClick={() => setIsGalleryModalOpen(true)}
          aria-label="Open gallery"
        >
          View Gallery
        </button>
      </div>
    </ScrollReveal>
  </div>
</section>

      {/* Gallery Modal */}
      {isGalleryModalOpen && (
        <div className={`gallery-modal ${isGalleryModalClosing ? 'closing' : ''}`}>
          <div 
            className="gallery-modal-overlay" 
            onClick={closeGalleryModal}
          ></div>
          <div className="gallery-modal-content gallery-modal-full">
            <button 
            className="gallery-modal-close"
            onClick={closeGalleryModal} 
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>
      
      <div className="gallery-modal-header">
        <h3 className="gallery-modal-title">Gallery</h3>
        <p className="gallery-modal-subtitle">Click on any image to view</p>
      </div>
      
      <div className="gallery-modal-grid">
        {designs.map((design) => (
          <button 
            key={design.id} 
            className="gallery-item"
            onClick={() => openModal(design)}
            aria-label={`View ${design.title}`}
          >
            <div className="gallery-image-container">
              <img 
                src={design.image} 
                alt={design.title}
                className="gallery-image"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <h3 className="gallery-title">{design.title}</h3>
                <span className="gallery-category">{design.category}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
)}

{/* Individual Design Modal */}
{isModalOpen && selectedDesign && (
  <div className={`gallery-modal ${isDesignModalClosing ? 'closing' : ''}`}>
    <div 
      className="gallery-modal-overlay" 
      onClick={closeModal}
    ></div>
    <div className="gallery-modal-content">
      <button 
        className="gallery-modal-close"
        onClick={closeModal}
        aria-label="Close modal"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="gallery-modal-image-container">
        <img 
          src={selectedDesign.image} 
          alt={selectedDesign.title}
          className="gallery-modal-image"
        />
      </div>
      <div className="gallery-modal-info">
        <h3 className="gallery-modal-title">{selectedDesign.title}</h3>
        <span className="gallery-modal-category">{selectedDesign.category}</span>
        {selectedDesign.description && (
          <p className="gallery-modal-description">{selectedDesign.description}</p>
        )}
      </div>
    </div>
  </div>
)}

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="section-container">
          <ScrollReveal direction="up" delay={100}>
            <div className="section-header">
              <h2 className="section-title">
                Skills & Technologies
              </h2>
              <div className="section-divider"></div>
            </div>
          </ScrollReveal>
          
          <StaggeredReveal className="skills-grid" staggerDelay={100}>
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="contact-container">
          <ScrollReveal direction="up" delay={100}>
            <div className="section-header">
              <h2 className="section-title">
                Get In Touch
              </h2>
              <div className="section-divider"></div>
              <p className="contact-description">
                Ready to start your next project? Let's collaborate and create something amazing together.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="contact-grid">
            <ScrollReveal direction="left" delay={200}>
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
                    <p className="contact-info-text">linkedin.com/in/sean-patrick-morales-22a697268</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={400}>
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
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
       <footer className="footer">
  <div className="footer-container">  
    <div className="footer-animation">
      <Lottie 
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ height: 90 }}
      />
      <Lottie 
        animationData={amongus}
        loop={true}
        autoplay={true}
        style={{ height: 100,  }}
      />
      <Lottie 
        animationData={mario}
        loop={true}
        autoplay={true}
        style={{ height: 180, top: -38, left: 28, position: 'absolute' }}
      />
      {/* <Lottie 
        animationData={arcade}
        loop={true}
        autoplay={true}
        style={{ height: 80 }}
      /> */}
       <Lottie 
        animationData={pp}
        loop={true}
        autoplay={true}
        style={{ height: 80, transform:'scaleX(-1)' }}
      />
    </div>
    <ScrollReveal direction="fade" delay={100}>
      <p className="footer-text">
        © 2025 Sean Patrick Morales. All rights reserved.
      </p>
    </ScrollReveal>
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