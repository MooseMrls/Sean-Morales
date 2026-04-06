import React, { useState, useEffect, useRef } from 'react'; 
import emailjs from 'emailjs-com';
import Lottie from 'lottie-react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Globe, X, Sun, Moon, ChevronUp, Eye, ArrowRight, ArrowLeft } from 'lucide-react';
import './App.css'; 
import './loading/Preloader.css';

import Duciel from './images/Duciel.jpg';
import AM from './images/Unused/AM.jpg';
import mapsa from './images/mapsa.jpg'
import nugits from './images/nugits.png';
import bul from './images/Unused/bulcard.png'; 
import base from './images/Unused/base.png'; 
import gw from './images/Unused/gw.png';
import rh from './images/Unused/rh.png';
import fallin from './images/Unused/fallin.jpeg';
import whatif from './images/Unused/whatif.jpeg';
import weather from './images/weather.jpg';
import mhdc from './images/mhdc.jpg';
import claw from './images/Claw.jpg';
import swift from './images/swift.png';
import ceap from './images/CEAPNCR LOGO.png';

import duc1 from './images/duc1.png';


import am1 from './images/am/am1.png';
import am2 from './images/am/am2.png';
import am3 from './images/am/am3.png';
import am4 from './images/am/am4.png';
import am5 from './images/am/am5.png';
import am6 from './images/am/am6.png';
import am7 from './images/am/am7.png';
import wet from './images/weather/wet.jpeg';
import wet2 from './images/weather/wet2.jpeg';
import map from './images/mapsa/map1.png';
import map2 from './images/mapsa/map2.png';
import map3 from './images/mapsa/map3.png';
import map4 from './images/mapsa/map4.png';
import mhdc1 from './images/mhdc/mhdc1.png';
import mhdc2 from './images/mhdc/mhdc2.png';
import mhdc3 from './images/mhdc/mhdc3.png';
import mhdc4 from './images/mhdc/mhdc4.png';
import mhdc5 from './images/mhdc/mhdc5.png';
import mhdc6 from './images/mhdc/mhdc6.png';
import mhdc7 from './images/mhdc/mhdc7.png';
import mhdc8 from './images/mhdc/mhdc8.png';
import mhdc9 from './images/mhdc/mhdc9.png';

import reg1 from './images/mreg/reg1.png';
import reg2 from './images/mreg/reg2.png';
import reg3 from './images/mreg/reg3.png';
import reg4 from './images/mreg/reg4.png';
import reg5 from './images/mreg/reg5.png';
import reg6 from './images/mreg/reg6.png';
import reg7 from './images/mreg/reg7.png';

import swift1 from './images/swift1.png';

import ceap1 from './images/ceapncr1.png';

import mapweb from './images/mapsaweb.png';

import mhdcweb from './images/mhdcweb.png';

import clev1 from './images/clev/clev1.png';
import clev2 from './images/clev/clev2.png';
import clev3 from './images/clev/clev3.png';
import clev4 from './images/clev/clev4.png';
import clev5 from './images/clev/clev5.png';
import clev6 from './images/clev/clev6.png';
import clev7 from './images/clev/clev7.png';
import clev8 from './images/clev/clev8.png';
import Clev3 from './images/Clev.3.png';

import animationData from './animations/Batman.json'; 
import amongus from './animations/amongus.json';
import mario from './animations/mario.json';
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

    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
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

// ── TiltCard (3D hover) ───────────────────────────────────
const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)';
    }
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease', willChange: 'transform' }}
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
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [isPreviewModalClosing, setIsPreviewModalClosing] = useState(false);
  const [isPreviewZoomOpen, setIsPreviewZoomOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [isPreviewZoomClosing, setIsPreviewZoomClosing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // ── Animation hooks ───────────────────────────────────

  //   useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 6500); // Match this with your preloader duration

  //   return () => clearTimeout(timer);
  // }, []);

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
    
    const nearBottom = scrollPosition + windowHeight >= documentHeight - 200;
    setIsNearBottom(nearBottom);
    
    const sections = ['hero', 'about', 'skills', 'certifications', 'projects', 'gallery', 'clients', 'contact'];
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
    .then(() => {
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

  // eslint-disable-next-line no-unused-vars
  const openPreviewModal = (project) => {
    setSelectedPreview(project);
    setIsPreviewModalOpen(true);
  };
  
  const closePreviewModal = () => {
    setIsPreviewModalClosing(true);
    setTimeout(() => {
      setIsPreviewModalOpen(false);
      setIsPreviewModalClosing(false);
      setSelectedPreview(null);
    }, 300);
  };

  const openPreviewZoom = (imageSrc) => {
    setZoomedImage(imageSrc);
    setIsPreviewZoomOpen(true);
  };
  
  const closePreviewZoom = () => {
    setIsPreviewZoomClosing(true);
    setTimeout(() => {
      setIsPreviewZoomOpen(false);
      setIsPreviewZoomClosing(false);
      setZoomedImage(null);
    }, 300);
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


  const closeProfileModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsProfileModalOpen(false);
      setIsClosing(false);
    }, 250);
  };

  // Close popover when clicking outside
  useEffect(() => {
    if (!isProfileModalOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest('.nav-logo')) {
        closeProfileModal();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isProfileModalOpen]);

  //   if (isLoading) {
  //   return <Preloader onLoadingComplete={() => setIsLoading(false)} />;
  // }

  // if (!isProfileModalOpen) return null;

  const skills = [
    { name: 'React', level: 95, color: 'skill-bar-blue-500' },
    { name: 'JavaScript', level: 90, color: 'skill-bar-blue-400' },
    { name: 'Node.js', level: 85, color: 'skill-bar-blue-600' },
    { name: 'TypeScript', level: 80, color: 'skill-bar-blue-500' },
    { name: 'HTML/CSS', level: 90, color: 'skill-bar-blue-600' },
    { name: 'Flutter', level: 75, color: 'skill-bar-blue-400' },
    { name: 'Python', level: 80, color: 'skill-bar-blue-500' },
    { name : 'Express.js', level: 85, color: 'skill-bar-blue-600' },
    { name: 'MongoDB', level: 80, color: 'skill-bar-blue-400' },
    { name: 'SQL', level: 75, color: 'skill-bar-blue-500' },
    { name: 'Multimedia Arts'},
    { name: 'IT Specialist'},
    { name: 'Github'},
  ];

  const projects = [
    {
      title: 'Du Ciel Fragrance',
      description: 'Modern e-commerce platform built exclusively for perfume enthusiasts and sellers. Designed to deliver a seamless shopping experience, this allows customers to browse, order, and review premium fragrances—while providing admins with full control over inventory, sales records, and performance reports.',
      tech: ['React', 'Node.js', 'MongoDB'],
      image: duc1,
      github: 'https://github.com/MooseMrls',
      live: 'https://duciel.vercel.app/',
      isPrivate: false 
    },
    {
      title: 'Aquamom Management System',
      description: 'An all-in-one management system designed specifically for water refilling stations. It offers seamless tracking of daily sales, maintenance schedules, and customer transactions—empowering water station owners and staff to run operations smoothly and efficiently.',
      tech: ['React', 'Express', 'MongoDB'],
      image: am1,
      github: 'https://github.com/MooseMrls',
      live: '',
      isPrivate: true,
      previewImages: [am1, am2, am3, am4, am5, am6, am7] 
    },
    {
      title: 'MaPSA Management System',
      description: 'A comprehensive employee management system designed to streamline daily time tracking and workforce administration. Ideal for small to medium-sized organizations, the app allows HR personnel and managers to efficiently monitor employee attendance, file and approve leave requests, and manage employee records.',
      tech: ['Node.js', 'Express', 'Bible API', 'HTML', 'CSS'],
      image: map4,
      github: 'https://github.com/MooseMrls',
      live: '',
      isPrivate: true,
      previewImages: [map, map2, map3, map4] 
    },
      {
      title: 'NU-GITS',
      description: 'A digital platform designed to enhance student support through a blend of emotional, academic, and personal growth tools. Built with a modern, user-friendly interface, the system empowers guidance counselors and students to connect meaningfully in a safe and supportive environment.',
      tech: ['Python', 'MongoDB'],
      image: nugits,
      github: 'https://github.com/MooseMrls',
      live: 'https://www.nu-gits.com/'
    },
    {
      title: 'Weather Mobile App',
      description: 'A simple yet powerful weather application that provides real-time weather updates and forecasts. It delivers accurate information on current conditions, hourly forecasts, and extended weather outlooks.',
      tech: ['React Native', 'OpenMeteo API'],
      image: weather,
      github:'https://github.com/MooseMrls',
      isPrivate: true,
      previewImages: [wet, wet2] 
    },
    {
      title: 'MaPSA Holistic Development Center',
      description: 'A custom-built digital platform designed to streamline the operations of the retreat house. It provides an all-in-one solution for managing reservations, schedules, guest information, and facility usage, ensuring a seamless experience for both staff and visitors.',
      tech: ['React', 'Express', 'MongoDB'],
      image: mhdc1,
      github:'https://github.com/MooseMrls',
      isPrivate: true,
      previewImages: [mhdc1, mhdc2, mhdc3, mhdc4, mhdc5, mhdc6, mhdc7, mhdc8, mhdc9] 
    },
    {
      title: 'MaPSA Online Registration',
      description: 'A streamlined portal for user registration and admin operations.',
      tech: ['React', 'Express', 'MongoDB'],
      image: reg7,
      github:'https://github.com/MooseMrls',
      isPrivate: true,
      previewImages: [reg1, reg2, reg3, reg4, reg5, reg6] 
    },
    {
      title: 'Cleverly - Attendance System',
      description: 'A smart attendance system for students and faculty, combining RFID and facial recognition to ensure fast, accurate, and secure identity verification.',
      tech: ['React', 'Express', 'MongoDB'],
      image: clev8,
      github:'https://github.com/MooseMrls',
      isPrivate: true,
      previewImages: [clev1, clev2, clev3, clev4, clev5, clev6, clev7] 
    },
    {
      title: 'Payroll & Leave Management System',
      description: 'A web-based system that simplifies employee payroll processing and leave management. It allows administrators to manage employee records, calculate salaries, and track leave requests efficiently, improving accuracy and overall workforce management.',
      tech: ['React', 'Express', 'Node.js', 'MongoDB'],
      image: swift1,
      github:'https://github.com/MooseMrls',
      isPrivate: true,
      previewImages: [] 
    },
     {
      title: 'CEAP NCR',
      description: 'An informative Website for the Catholic Educational Association of the Philippines - NCR',
      tech: ['React', 'Express', 'Node.js', 'MongoDB'],
      image: ceap1,
      github:'https://github.com/MooseMrls',
      isPrivate: true,
      previewImages: [] 
    },
     {
      title: 'MaPSA',
      description: 'Designed an informative Website for the Manila Ecclesiastical Province School Systems Association.',
      tech: ['React', 'Express', 'Node.js', 'MongoDB'],
      image: mapweb,
      github:'https://github.com/MooseMrls',
      isPrivate: true,
      previewImages: [] 
    },
      {
      title: 'MaPSA Holistic Development Center',
      description: 'Designed an informative Website for the MaPSA Holistic Development Center',
      tech: ['React', 'Express', 'Node.js', 'MongoDB'],
      image: mhdcweb,
      github:'https://github.com/MooseMrls',
      isPrivate: true,
      previewImages: [] 
    },
    {
      title: 'Claw Machine',
      description: 'A simple claw machine game.',
      tech: ['Javascript'],
      image: claw,
      github: 'https://github.com/MooseMrls',
      live: 'https://clawmachine-vert.vercel.app/',
      isPrivate: false 
    },
  ];

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Frontend Development',
      description: 'Creating responsive, interactive user interfaces with modern frameworks.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Backend Development',
      description: 'Building robust server-side applications.'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Designing intuitive user experiences with modern design principles and accessibility in mind.'
    }
  ];

  const designs = [
  { id: 1, image: fallin, title: 'Fallin In Love', category: '' },
  { id: 2, image: bul, title: 'Bulldogs Card Sticker', category: '' },
  { id: 3, image: base, title: 'The Basement', category: '' },
  { id: 4, image: rh, title: 'Royal Hooligans', category: '' },
  { id: 5, image: gw, title: 'Goldwings Insurance Agency', category: '' },
  { id: 6, image: whatif, title: 'What If', category: '' },
];

  const clients = [
    { name: 'Du Ciel Fragrance',   logo: Duciel },
    { name: 'Aquamom',             logo: AM },
    { name: 'MaPSA',               logo: mapsa },
    { name: 'National University', logo: nugits },
    { name: 'Cleverly',            logo: Clev3 },
    { name: 'Swift',            logo: swift },
    { name: 'CEAP NCR',            logo: ceap },
    { name: 'MHDC',            logo: mhdc },

  ];

  const certifications = [
    {
      title: 'Cybersecurity: Safeguarding User\'s Privacy and Data Security',
      issuer: 'Unknown Issuer',
      date: '2022',
      icon: '🔒',
      link: '#'
    },
    {
      title: 'Power Up: 8bIT "Jobs in the Gaming Industry"',
      issuer: 'Unknown Issuer',
      date: '2023',
      icon: '🎮',
      link: '#'
    },
    {
      title: 'Cisco Certified Network Associate (CCNA)',
      issuer: 'Cisco',
      date: '',
      icon: '🌐',
      link: '#'
    },
    {
      title: 'CS50W: Web Programming with Python and JavaScript',
      issuer: 'Harvard University / edX',
      date: '',
      icon: '🎓',
      link: '#'
    },
    {
      title: 'Google Ads Apps Certification',
      issuer: 'Google',
      date: '',
      icon: '📱',
      link: '#'
    },
    {
      title: 'Introduction to Generative AI',
      issuer: 'Google',
      date: '',
      icon: '🤖',
      link: '#'
    },
    {
      title: 'AI-Powered Performance Ads Certification',
      issuer: 'Google',
      date: '',
      icon: '⚡',
      link: '#'
    },
    {
      title: 'Intro to AI Ethics',
      issuer: 'LinkedIn',
      date: '',
      icon: '🧠',
      link: '#'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed-nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-inner">
          <div className="nav-logo" style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsProfileModalOpen(prev => !prev)}
              className="portfolio-logo-btn"
              aria-label="View profile"
            >
              <ArrowRight className="portfolio-arrow-right" size={18} />
              <span className="portt">Sean</span>
              <ArrowLeft className="portfolio-arrow-left" size={18} />
            </button>

            {/* Profile Popover — anchored inline below the button */}
            {isProfileModalOpen && (
              <div className={`profile-popover ${isClosing ? 'closing' : ''}`}>
                <div className="profile-popover-image-wrapper">
                  <img
                    src={profileImage}
                    alt="Sean Patrick Morales"
                    className="profile-popover-image"
                  />
                </div>
                <p className="profile-popover-name"></p>
              </div>
            )}
          </div>

              {/* Desktop Navigation */}
            <div className="nav-desktop">
              <div className="nav-desktop-items">
                {['hero', 'about', 'projects', 'skills', 'certifications', 'clients', 'contact'].map((section) => (
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
            {['hero', 'about', 'skills', 'certifications', 'projects', 'clients', 'contact'].map((section) => (
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

      <section id="hero" className="hero-section">
        <div className="hero-overlay"></div>
        <ParallaxElement speed={0.3} className="hero-content animate-fade-in">
          <ScrollReveal direction="fade" delay={200}>
            <h1 className="hero-title hero-title-glitch" data-text="Sean Patrick Morales">
              Sean Patrick Morales
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={400}>
            {/* <p className="hero-subtitle">
            Building smart solutions where technology meets real-world needs.           
             </p> */}
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
              className="hero-button magnetic-btn"
              onMouseMove={(e) => {
                const btn = e.currentTarget;
                const rect = btn.getBoundingClientRect();
                const dx = e.clientX - rect.left - rect.width / 2;
                const dy = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
              }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
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
                  I’m a software engineer and IT specialist who enjoys building practical, user-friendly digital experiences that solve real problems.
                </p>
                <p className="about-text">
                  From writing clean code to managing system infrastructure, I focus on creating efficient and scalable solutions. I’m always exploring new technologies to stay sharp and deliver my best work.
                </p>

                {/* <div className="about-badges">
                  <span className="about-badge">Full Stack Developer</span>
                  <span className='about-badge'>Systems Administrator</span>
                  <span className='about-badge'>Goal Oriented</span>
                </div> */}
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
              <TiltCard key={index} className="project-card">
                <div className="project-spotlight" onMouseMove={(e) => {
                  const card = e.currentTarget.parentElement;
                  const rect = card.getBoundingClientRect();
                  card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
                  card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
                  card.classList.add('spotlit');
                }} onMouseLeave={(e) => {
                  e.currentTarget.parentElement.classList.remove('spotlit');
                }}></div>
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
                  
                  {/* <div className="project-tech-container">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="project-tech-item">
                        {tech}
                      </span>
                    ))}
                  </div> */}
                  
                  {/* <div className="project-links">
                    {project.live && !project.isPrivate ? (
                      <a href={project.live} className="project-link">
                        <ExternalLink className="w-4 h-4" />
                        <span>Live</span>
                      </a>
                    ) : (
                    <button 
                      onClick={() => openPreviewModal(project)}
                      className="project-link preview-button"
                    >
                      <Eye className="w-4 h-4" /> 
                      <span>Preview</span>
                    </button>
                    )}
                  </div> */}
                </div>
              </TiltCard>
            ))}
          </StaggeredReveal>
        </div>
      </section>

  {/* Web Modal */}
{isPreviewModalOpen && selectedPreview && (
  <div className={`gallery-modal ${isPreviewModalClosing ? 'closing' : ''}`}>
    <div 
      className="gallery-modal-overlay" 
      onClick={closePreviewModal}
    ></div>
    <div className="gallery-modal-content">
      <button 
        className="gallery-modal-close"
        onClick={closePreviewModal}
        aria-label="Close preview"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="gallery-modal-header">
        <h3 className="gallery-modal-title">{selectedPreview.title} Preview</h3>
        <p className="gallery-modal-subtitle">Website is currently private</p>
      </div>
      
      <div className="preview-images-container">
        {selectedPreview.previewImages && selectedPreview.previewImages.length > 0 ? (
          selectedPreview.previewImages.map((image, index) => (
            <div key={index} className="preview-image-wrapper">
              <img 
                src={image} 
                alt={`${selectedPreview.title} preview ${index + 1}`}
                className="preview-image"
                onClick={() => openPreviewZoom(image)}
                style={{ cursor: 'zoom-in' }}
              />
            </div>
          ))
        ) : (
          <div className="no-preview-message">
            <Eye className="w-12 h-12 mb-4" />
            <p>Preview images coming soon</p>
            <p className="text-sm opacity-70 mt-2">This project is currently in private development</p>
          </div>
        )}
      </div>
    </div>
  </div>
)}

{isPreviewZoomOpen && zoomedImage && (
  <div className={`preview-zoom-modal ${isPreviewZoomClosing ? 'closing' : ''}`}>
    <div className="preview-zoom-overlay" onClick={closePreviewZoom}></div>
    <div className="preview-zoom-content">
      <button 
        className="preview-zoom-close"
        onClick={closePreviewZoom}
        aria-label="Close zoomed preview"
      >
        <X className="w-6 h-6" />
      </button>
      <img 
        src={zoomedImage} 
        alt="Zoomed preview"
        className="preview-zoom-img"
      />
    </div>
  </div>
)}

{/* Gallery Modal */}
{/* <section id="gallery" className="gal-section">
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
</section> */}

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

      {/* Certifications Section */}
      <section id="certifications" className="section certifications-section">
        <div className="section-container">
          <ScrollReveal direction="up" delay={100}>
            <div className="section-header">
              <h2 className="section-title">Certifications</h2>
              <div className="section-divider"></div>
            </div>
          </ScrollReveal>

          <StaggeredReveal className="certifications-grid" staggerDelay={120}>
            {certifications.map((cert, index) => (
              <div key={index} className="cert-card">
                <div className="cert-content">
                  <h3 className="cert-title">{cert.title}</h3>
                  {cert.issuer && cert.issuer !== 'Unknown Issuer' && (
                    <p className="cert-issuer">{cert.issuer}</p>
                  )}
                  <div className="cert-footer">
                    {cert.date && (
                      <span className="cert-date">{cert.date}</span>
                    )}
                    {cert.link && cert.link !== '#' && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                        <ExternalLink className="w-4 h-4" />
                        <span>Verify</span>
                      </a>
                    )}
                  </div>
                  {cert.credentialId && (
                    <p className="cert-id">ID: {cert.credentialId}</p>
                  )}
                </div>
              </div>
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="section clients-section">
        <div className="section-container">
          <ScrollReveal direction="up" delay={100}>
            <div className="section-header">
              <h2 className="section-title">Clients</h2>
              <div className="section-divider"></div>
            </div>
          </ScrollReveal>

          <StaggeredReveal className="clients-logo-grid" staggerDelay={100}>
            {clients.map((client, index) => (
              <div key={index} className="client-logo-card">
                {client.logo
                  ? <img src={client.logo} alt={client.name} className="client-logo-img" />
                  : <span className="client-logo-name">{client.name}</span>
                }
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
                    className="contact-button magnetic-btn"
                    onMouseMove={(e) => {
                      const btn = e.currentTarget;
                      const rect = btn.getBoundingClientRect();
                      const dx = e.clientX - rect.left - rect.width / 2;
                      const dy = e.clientY - rect.top - rect.height / 2;
                      btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
                    }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
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
        style={{ height: 100, paddingLeft: 40  }}
      />
      <Lottie 
        animationData={mario}
        loop={true}
        autoplay={true}
        style={{ height: 180, top: -38, left: 38, paddingLeft: 20, position: 'absolute' }}
      />
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