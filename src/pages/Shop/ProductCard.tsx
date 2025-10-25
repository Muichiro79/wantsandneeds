// src/pages/shop/ProductCard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  images: string[];
  colors: string[];
}

export default function ProductCard({ id, name, price, images, colors }: ProductProps) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/shop/${id}`, {
      state: { id, name, price, images, colors },
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group bg-white dark:bg-neutral-900 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer border border-gray-200 dark:border-neutral-800"
    >
      {/* Image Container with Enhanced Effects */}
      <div className="relative overflow-hidden">
        <img 
          src={images[currentImageIndex]} 
          alt={name} 
          className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 ${
          isHovered ? 'bg-black/10' : ''
        }`} />
        
        {/* View Details Badge */}
        <div className={`absolute top-4 right-4 bg-white/95 dark:bg-black/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-black dark:text-white transform transition-all duration-500 ${
          isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
        }`}>
          View Details →
        </div>

        {/* Image Indicator Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentImageIndex === index
                    ? 'bg-white scale-125'
                    : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-black dark:text-white line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            {name}
          </h3>
          <div className="flex flex-col items-end">
            <p className="text-2xl font-black text-black dark:text-white">${price}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Free Shipping</p>
          </div>
        </div>

        {/* Color Variants */}
        {colors.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Colors:
            </span>
            <div className="flex gap-1.5">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quick Info Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-neutral-800">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Quick View</span>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>Premium</span>
          </div>
        </div>

        {/* Hover Action Indicator */}
        <div className={`mt-4 text-center py-2 bg-gradient-to-r from-black/5 to-transparent dark:from-white/5 rounded-lg transform transition-all duration-500 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}>
          <span className="text-sm font-semibold text-black dark:text-white">Click to View Details</span>
        </div>
      </div>

      {/* Enhanced Border Effect */}
      <div className={`absolute inset-0 border-2 border-transparent group-hover:border-black/10 dark:group-hover:border-white/10 rounded-2xl transition-all duration-500 pointer-events-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
}