import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    demoUrl: string;
    image: string;
  };
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <AnimatedSection
      animation="fadeInUp"
      delay={index * 100}
      className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
    >
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="p-6 h-64 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full border border-gray-300">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        <div className="flex space-x-3 mt-auto">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>View Code</span>
          </a>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Demo</span>
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProjectCard;