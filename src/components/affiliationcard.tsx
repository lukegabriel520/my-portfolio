import React from 'react';
import AnimatedSection from './AnimatedSection';

interface AffiliationCardProps {
  affiliation: {
    name: string;
    role: string;
    description: string;
    logo: string;
  };
  index: number;
}

const AffiliationCard: React.FC<AffiliationCardProps> = ({ affiliation, index }) => {
  return (
    <AnimatedSection
      animation="scaleIn"
      delay={index * 100}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group h-full"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <img
          src={affiliation.logo}
          alt={affiliation.name}
          className="w-12 h-12 object-cover rounded-full"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{affiliation.name}</h3>
      <p className="text-gray-700 font-medium mb-2">{affiliation.role}</p>
      <p className="text-gray-600 text-sm line-clamp-3">{affiliation.description}</p>
    </AnimatedSection>
  );
};

export default AffiliationCard;