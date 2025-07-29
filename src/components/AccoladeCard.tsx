import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const getLogoPath = (organization: string): string => {
  const logoMap: Record<string, string> = {
    'Department of Education': 'deped.png',
    'Department of Science and Technology': 'dost.png',
    'Southeast Asian Mathematical Olympiad Society': 'seamo.png',
    'ICP Philippines': 'icp.png',
    'freeCodeCamp': 'freecodecamp.png',
    'Vercel': 'vercel.png',
    'Amazon Web Services': 'amazon.png',
    'University of the Philippines': 'up.png',
    'De La Salle University': 'dlsu.png',
    'Google': 'google.png',
    'DataCamp': 'datacamp.png',
    'World Computer Hacker League': 'wchl.png'
  };

  const logoName = logoMap[organization] || 
    organization.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') + '.png';
  
  return `/logos/${logoName}`;
};

interface Accolade {
  title: string;
  organization: string;
  year: string;
  link: string;
  issuer?: string;
  logo?: string; 
}

interface AccoladeCardProps {
  accolades: Accolade[];
}

const AccoladeCard: React.FC<AccoladeCardProps> = ({ accolades }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(accolades.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const renderOrganizationLogo = (accolade: Accolade) => {
    const logoPath = getLogoPath(accolade.organization);
    
    return (
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-200 p-1.5 flex items-center justify-center group-hover:shadow-sm transition-shadow duration-200">
        <img 
          src={logoPath} 
          alt={`${accolade.organization} logo`} 
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/40?text=' + accolade.organization.charAt(0);
          }}
        />
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: Math.min(itemsPerPage, accolades.length - currentPage * itemsPerPage) }).map((_, index) => {
            const accolade = accolades[currentPage * itemsPerPage + index];
            if (!accolade) return null;
            
            return (
              <a
                key={index}
                href={accolade.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="h-full bg-white/95 rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 flex flex-col group-hover:border-gray-300 relative">
                  <a 
                    href={accolade.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <div className="flex items-start space-x-3 pr-5">
                    {renderOrganizationLogo(accolade)}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-800 transition-colors">
                        {accolade.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {accolade.issuer || accolade.organization}
                      </p>
                      
                      <div className="mt-3 pt-2.5 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-medium">
                          {accolade.year}
                        </span>
                        <div className="ml-auto">
                          <div className="inline-flex items-center justify-center px-3 h-7 rounded-full text-xs font-medium bg-white/80 text-gray-700 border border-white/80 group-hover:bg-white group-hover:border-white transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            <span className="leading-none">View Details</span>
                            <ChevronRight className="w-3 h-3 ml-1.5 -mr-0.5 opacity-80" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="mt-6">
            <AnimatedSection delay={400} className="flex justify-center items-center space-x-3">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`p-2 rounded-full transition-all ${
                  currentPage === 0
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 border border-gray-200'
                } shadow-sm`}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-7 h-7 rounded-full text-xs font-medium transition-all ${
                      index === currentPage
                        ? 'bg-gray-800 text-white shadow-sm'
                        : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 border border-gray-200'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className={`p-2 rounded-full transition-all ${
                  currentPage === totalPages - 1
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 border border-gray-200'
                } shadow-sm`}
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </AnimatedSection>
          </div>
        )}
      </AnimatedSection>
    </div>
  );
};

export default AccoladeCard;