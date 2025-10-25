// src/components/home/HeroSection.tsx
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import female from '../../assets/female.png';
import bmw from '../../assets/bmw.jpg';
import duo from '../../assets/duo.jpg';

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: HeroSlide[] = [
    {
      image: bmw, // Direct reference, not {bmw}
      title: "SUMMER DROP 2024",
      subtitle: "Bold styles for the season. Heat Wave Collection",
      ctaText: "Shop Now",
      ctaLink: "/shop"
    },
    {
      image: female, // Direct reference, not {female}
      title: "URBAN ESSENTIALS",
      subtitle: "Timeless pieces, modern edge. Street Ready",
      ctaText: "Explore",
      ctaLink: "/collections"
    },
    {
      image: duo, // Direct reference, not {duo}
      title: "URBAN ESSENTIALS",
      subtitle: "Timeless pieces, modern edge. Street Ready",
      ctaText: "Explore",
      ctaLink: "/collections"
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Changed from 50000 to 5000 for better UX
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image} // Now this will be the actual image path
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-5xl">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
                {slide.subtitle}
              </p>
              <a
                href={slide.ctaLink}
                className="inline-block px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 border-2 border-white"
              >
                {slide.ctaText}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full transition-all z-10 group"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full transition-all z-10 group"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;