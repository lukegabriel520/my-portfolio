import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import AnimatedSection from './animatedsection';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    demoUrl: string;
    image: string;
    year: number;
    category: string;
  };
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isResearchProject = project.category === 'Research';
  
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatedSection
      animation="fadeInUp"
      delay={index * 100}
      className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group hover:border-gray-200 flex flex-col h-full"
    >
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
        <div className={`w-full h-full overflow-hidden ${project.title === 'PaintedPages' ? 'scale-110 origin-center' : ''}`}>
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 ${project.title === 'PaintedPages' ? 'scale-110' : 'group-hover:scale-105'}`}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3">
          {project.title}
        </h3>
        <div className="mb-4 flex-grow">
          <p className={`text-gray-600 ${isExpanded ? '' : 'line-clamp-3'}`}>
            {project.description}
          </p>
          {project.description.length > 120 && (
            <button 
              onClick={toggleExpand}
              className="text-gray-600 hover:text-black text-sm font-normal mt-1 focus:outline-none hover:underline underline-offset-2 transition-colors"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          {!isResearchProject && project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium group/code"
            >
              <Github className="w-4 h-4 group-hover/code:scale-110 transition-transform" />
              <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gray-900 after:transition-all after:duration-300 group-hover/code:after:w-full">
                Code
              </span>
            </a>
          )}
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium group/demo"
          >
            <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gray-900 after:transition-all after:duration-300 group-hover/demo:after:w-full">
              {isResearchProject ? 'View Paper' : 'View Demo'}
            </span>
            <ExternalLink className="w-4 h-4 group-hover/demo:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProjectCard;