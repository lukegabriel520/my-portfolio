import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  BarChart3,
  Cpu,
  Code2,
  Link2,
  Cloud
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

  interface NavItem {
    id: string;
    label: string;
    href?: string;
    isExternal?: boolean;
  }

  const navItems: NavItem[] = [
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
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
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
        message: 'Message sent! I\'ll get back to you soon.'
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
            ? 'bg-white/10 backdrop-blur-md shadow-lg border-b border-white/10' 
            : 'bg-white/5 backdrop-blur-sm border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/20 p-2">
                <img 
                  src="/LL_Logo.png" 
                  alt="Luke Lumakin Logo" 
                  className="h-full w-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/48?text=LL';
                  }}
                />
              </div>
              <span className="text-xl font-bold text-gray-900 font-sans">
                {personalInfo.name}
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-gray-900/70 ${
                      activeSection === item.id
                        ? 'text-black border-gray-900'
                        : 'text-black/80 hover:text-black'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-900/80 hover:text-gray-900 hover:bg-white/20 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-lg rounded-lg mt-2 border border-white/20 shadow-lg">
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

      <section id="home" className="pt-16 min-h-screen flex items-center bg-white">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col h-full">
              <div>
                <AnimatedSection className="mb-10">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-3">
                    {personalInfo.name}
                  </h1>
                  <p className="text-2xl text-gray-600 mb-4">
                    Associate Data Analyst
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                      {[
                        { text: 'Data Analytics', icon: <BarChart3 className="w-3.5 h-3.5 mr-1.5" /> },
                        { text: 'Robotics', icon: <Cpu className="w-3.5 h-3.5 mr-1.5" /> },
                        { text: 'Machine Learning', icon: <Code2 className="w-3.5 h-3.5 mr-1.5" /> },
                        { text: 'Blockchain', icon: <Link2 className="w-3.5 h-3.5 mr-1.5" /> }
                      ].map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                          {tag.icon}
                          {tag.text}
                        </span>
                      ))}
                  </div>
                  <p className="text-gray-500 max-w-xl">
                    {personalInfo.slogan}
                  </p>
                </AnimatedSection>
              </div>
              
              <div className="mt-auto">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <AnimatedSection delay={200}>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-0.5 h-full group">
                      <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">Status</h3>
                      <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors">{personalInfo.status}</p>
                    </div>
                  </AnimatedSection>
                  <AnimatedSection delay={200}>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-0.5 h-full group">
                      <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">Languages</h3>
                      <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors">{personalInfo.languages.join(', ')}</p>
                    </div>
                  </AnimatedSection>
                </div>
                
                <AnimatedSection delay={250}>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-0.5 group">
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">Education</h3>
                    <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors">{personalInfo.school}</p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex justify-center">
              <AnimatedSection delay={300} className="relative">
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6">
                  <img
                    src="/ProfilePhoto.png"
                    alt="Luke Lumakin"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/500x500?text=Luke+Lumakin';
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => window.open(personalInfo.resume, '_blank', 'noopener,noreferrer')}
                    className="w-full flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 text-center"
                  >
                    View My Resume
                  </button>
                  <div className="flex space-x-4">
                    <a 
                      href={personalInfo.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 bg-gray-50 rounded-lg p-3 border border-gray-100 hover:shadow-sm transition-all duration-300 hover:bg-gray-100 transform hover:-translate-y-0.5 group"
                    >
                      <Github className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">GitHub</span>
                    </a>
                    <a 
                      href={personalInfo.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 bg-gray-50 rounded-lg p-3 border border-gray-100 hover:shadow-sm transition-all duration-300 hover:bg-gray-100 transform hover:-translate-y-0.5 group"
                    >
                      <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
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
              What my peers say about working with me
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
              Ready to collaborate? Send me a message!
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                  <path d="M6 8h12v8H6V8zm0 0l6 5 6-5" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-800 mb-1">Email</h3>
              <p className="text-gray-700 font-normal">{personalInfo.email}</p>
            </AnimatedSection>
            <AnimatedSection delay={400} className="text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                  <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="white" strokeWidth="2" />
                  <circle cx="7.5" cy="7" r="1.5" fill="white" />
                  <rect x="6" y="10" width="3" height="8" rx="1.5" fill="white" />
                  <path d="M12 10H14.5C16.1569 10 17.5 11.3431 17.5 13V18H15V13.5C15 13.2239 14.7761 13 14.5 13H12V18H9.5V10H12Z" fill="white" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-800 mb-1">LinkedIn</h3>
              <p className="text-gray-700 font-normal">linkedin.com/in/lukelumakin</p>
            </AnimatedSection>
            <AnimatedSection delay={500} className="text-center">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <rect width="24" height="24" rx="4" fill="#181717" />
                  <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.428 2.865 8.184 6.839 9.525.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.37-1.342-3.37-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.138 20.192 22 16.44 22 12.012 22 6.484 17.523 2 12 2z" fill="white" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">GitHub</h3>
              <p className="text-gray-600">github.com/lukegabriel520</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-gray-900 text-center">
              {personalInfo.name}
            </span>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  );
}

export default App;
