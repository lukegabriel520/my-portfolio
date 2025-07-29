import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page: number) => {
    setCurrentIndex(page);
  };

  const getCurrentPageItems = () => {
    const startIndex = currentIndex * itemsPerPage;
    return testimonials.slice(startIndex, startIndex + itemsPerPage);
  };

  if (!testimonials.length) return null;

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        {getCurrentPageItems().map((testimonial, index) => (
          <AnimatedSection
            key={`${currentIndex}-${index}`}
            animation="fadeInUp"
            delay={index * 100}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
          >
            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {testimonial.name}
              </h3>
              <p className="text-gray-700 font-medium text-sm">
                {testimonial.role}
              </p>
            </div>
            <blockquote className="text-gray-600 text-center italic">
              "{testimonial.content}"
            </blockquote>
          </AnimatedSection>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <AnimatedSection delay={300} className="flex justify-center items-center space-x-4">
          <button
            onClick={prevPage}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-gray-900' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial page ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextPage}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </AnimatedSection>
      )}
    </div>
  );
};

export default TestimonialCarousel;