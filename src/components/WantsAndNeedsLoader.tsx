import { motion } from 'framer-motion';

const WantsAndNeedsLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Geometric background patterns */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-white rounded-lg"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: 360,
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="text-center relative">
        {/* Minimalist text with elegant animation */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-light text-white tracking-tight mb-2">
            WANTS
          </h1>
          <div className="w-32 h-px bg-linear-to-r from-transparent via-white to-transparent mx-auto my-4" />
          <h1 className="text-6xl font-light text-white tracking-tight mt-2">
            NEEDS
          </h1>
        </motion.div>

        {/* Sophisticated triple spinner */}
        <div className="relative w-32 h-32 mx-auto mb-12">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 border-4 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Middle ring */}
          <motion.div
            className="absolute inset-3 border-4 border-neutral-400 border-b-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Inner dot */}
          <motion.div
            className="absolute inset-6 bg-white rounded-full"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Elegant progress indicator */}
        <div className="w-64 mx-auto">
          <div className="flex justify-between text-neutral-400 text-sm mb-2">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              LOADING
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              ESSENTIALS
            </motion.span>
          </div>
          
          {/* Minimal progress bar */}
          <div className="w-full h-0.5 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>

        {/* Floating dots */}
        <div className="absolute -top-10 -right-10">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full absolute"
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WantsAndNeedsLoader;