import { useState, useRef, useEffect } from "react";

// Custom Sort Dropdown Component
function SortDropdown({ value, onChange, options }: {
  value: string;
  onChange: (value: string) => void;
  options: { id: string; label: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.id === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-56 px-5 py-3.5 bg-linear-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-800 border-2 border-gray-200 dark:border-neutral-700 rounded-2xl text-black dark:text-white focus:outline-none focus:ring-4 focus:ring-black/20 dark:focus:ring-white/20 transition-all duration-300 hover:scale-105 hover:border-gray-300 dark:hover:border-neutral-600 hover:shadow-2xl shadow-lg group"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-black/5 dark:bg-white/10 rounded-lg group-hover:scale-110 transition-transform">
            <svg className="w-4 h-4 text-gray-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
          </div>
          <span className="font-semibold text-sm tracking-wide">{selectedOption?.label}</span>
        </div>
        <div className={`transform transition-all duration-300 ${isOpen ? 'rotate-180 scale-110' : 'group-hover:scale-110'}`}>
          <svg className="w-5 h-5 text-gray-500 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-linear-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-800 border-2 border-gray-200 dark:border-neutral-700 rounded-2xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden transform origin-top transition-all duration-300 scale-95 animate-in fade-in slide-in-from-top-2">
          
          {/* Dropdown Header */}
          <div className="px-5 py-3.5 border-b border-gray-100 dark:border-neutral-700 bg-linear-to-r from-black/5 to-transparent dark:from-white/5">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-black/10 dark:bg-white/20 rounded-lg">
                <svg className="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              </div>
              <span className="font-bold text-sm text-black dark:text-white tracking-wide">SORT BY</span>
            </div>
          </div>

          {/* Options List */}
          <div className="p-2 space-y-1">
            {options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-300 group relative overflow-hidden ${
                  value === option.id
                    ? 'bg-linear-to-r from-black to-gray-800 dark:from-white dark:to-gray-300 text-white dark:text-black shadow-lg transform scale-105'
                    : 'text-gray-700 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10 hover:scale-102 hover:shadow-md'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInUp 0.3s ease-out forwards'
                }}
              >
                {/* Animated background effect */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  value === option.id 
                    ? 'opacity-100' 
                    : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <div className="absolute inset-0 bg-linear-to-r from-black/5 to-transparent dark:from-white/5"></div>
                </div>

                {/* Selection indicator */}
                <div className={`relative z-10 w-2 h-2 rounded-full border-2 transition-all duration-300 ${
                  value === option.id
                    ? 'bg-white dark:bg-black border-white dark:border-black scale-125'
                    : 'border-gray-400 dark:border-neutral-600 group-hover:border-black dark:group-hover:border-white'
                }`}>
                  {value === option.id && (
                    <div className="absolute inset-0 bg-white dark:bg-black rounded-full animate-ping opacity-75"></div>
                  )}
                </div>

                {/* Option label */}
                <span className={`relative z-10 font-medium text-sm tracking-wide transition-all duration-300 ${
                  value === option.id 
                    ? 'text-white dark:text-black font-semibold' 
                    : 'group-hover:text-black dark:group-hover:text-white'
                }`}>
                  {option.label}
                </span>

                {/* Hover arrow */}
                <svg 
                  className={`w-4 h-4 ml-auto transition-all duration-300 ${
                    value === option.id 
                      ? 'opacity-100 translate-x-0 text-white dark:text-black' 
                      : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-gray-500 dark:text-neutral-400'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          {/* Dropdown Footer */}
          <div className="px-5 py-3 border-t border-gray-100 dark:border-neutral-700 bg-linear-to-r from-transparent to-black/5 dark:to-white/5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-neutral-400 font-medium">Currently selected</span>
              <span className="text-black dark:text-white font-bold">{selectedOption?.label}</span>
            </div>
          </div>
        </div>
      )}

      {/* Custom animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default SortDropdown;