import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X
} from 'lucide-react';
import AnimatedSection from './components/AnimatedSection';
import ProjectCard from './components/ProjectCard';
import AccoladeCard from './components/AccoladeCard';
import AffiliationCard from './components/AffiliationCard';
import TestimonialCarousel from './components/TestimonialCarousel';
import { projects, accolades, affiliations, testimonials, personalInfo } from './data/portfolioData';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'accolades', label: 'Accolades' },
    { id: 'affiliations', label: 'Affiliations' },
    { id: 'recommendations', label: 'Recommendations' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    } else {
      console.error('EmailJS public key is not set');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('Missing required environment variables');
      setSubmitStatus({
        success: false,
        message: 'Contact form is not properly configured. Please contact me directly at ' + personalInfo.email
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const templateParams = {
        from_name: formData.get('name') as string,
        from_email: formData.get('email') as string,
        subject: (formData.get('subject') as string) || 'New message from portfolio contact form',
        message: formData.get('message') as string
      };

      console.log('Sending email with params:', templateParams);

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      console.log('Email sent successfully:', response);
      
      setSubmitStatus({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      form.reset();
    } catch (error) {
      console.error('Email sending failed:', error);
      
      let errorMessage = 'Sorry, something went wrong. ';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Network error. Please check your internet connection.';
        } else if (error.message.includes('Invalid template')) {
          errorMessage = 'Invalid email template configuration.';
        } else {
          errorMessage += error.message;
        }
      }
      
      setSubmitStatus({
        success: false,
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/30' 
            : 'bg-white/90 backdrop-blur-sm border-b border-gray-200/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/90 backdrop-blur-sm border-2 border-gray-200/80 p-1.5 shadow-sm">
                <img 
                  src="/LL_Logo.png" 
                  alt="Luke Lumakin Logo" 
                  className="h-full w-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/40?text=LL';
                  }}
                />
              </div>
            </div>

            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-black bg-gray-100'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-50"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 border border-gray-200 shadow-lg">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'text-black bg-gray-100'
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <AnimatedSection className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                  {personalInfo.name}
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 font-medium">
                  {personalInfo.role}
                </p>
                <p className="text-lg text-gray-600 max-w-lg">
                  {personalInfo.slogan}
                </p>
              </AnimatedSection>
      
              <AnimatedSection delay={200} className="grid grid-cols-2 gap-6 max-w-md">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900">Languages</h3>
                  <p className="text-gray-600">{personalInfo.languages.join(', ')}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900">Status</h3>
                  <p className="text-gray-600">{personalInfo.status}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-sm col-span-2">
                  <h3 className="font-semibold text-gray-900">Education</h3>
                  <p className="text-gray-600">{personalInfo.school}</p>
                </div>
              </AnimatedSection>
            </div>
      
            <AnimatedSection delay={600} className="relative space-y-6">
              <div className="w-full max-w-md mx-auto relative">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-100 rounded-full z-0"></div>
                <div className="absolute bottom-0 -right-10 w-20 h-20 bg-pink-100 rotate-12 rounded-lg z-0"></div>
                <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/ProfilePhoto.png"
                    alt="Profile"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
      
              <div className="flex justify-center space-x-4 z-10">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              My latest works
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="accolades" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Awards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Achievements I've accomplished
            </p>
          </AnimatedSection>

          <AccoladeCard accolades={accolades} />
        </div>
      </section>

      <section id="affiliations" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Affiliations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Organizations I'm involved with
            </p>
          </AnimatedSection>
      
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliations.map((affiliation, index) => (
              <AffiliationCard key={index} affiliation={affiliation} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="recommendations" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recommendations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What others say about working with me
            </p>
          </AnimatedSection>

          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to collaborate on your next project
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200} className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-lg" id="contact-form">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-colors bg-white"
                    placeholder="Your full name..."
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-colors bg-white"
                    placeholder="juandelacruz@gmail.com"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-colors bg-white"
                  placeholder="What's this about?"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-colors bg-white resize-none"
                  placeholder="Tell me about your project or opportunity..."
                ></textarea>
              </div>
              <div className="space-y-2">
                {submitStatus && (
                  <div 
                    className={`p-3 rounded-lg text-sm ${
                      submitStatus.success 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-md ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </div>
            </form>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <AnimatedSection delay={300} className="text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">{personalInfo.email}</p>
            </AnimatedSection>
            <AnimatedSection delay={400} className="text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">LinkedIn</h3>
              <p className="text-gray-600">linkedin.com/in/lukelumakin</p>
            </AnimatedSection>
            <AnimatedSection delay={500} className="text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Github className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">GitHub</h3>
              <p className="text-gray-600">github.com/lukegabriel520</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-center justify-center space-x-4">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center"></div>
            <span className="text-lg font-bold text-gray-900">
              {personalInfo.name}
            </span>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  );
}

export default App;
