import { Zap, Crown, Gift } from 'lucide-react';
import { useState } from 'react';

const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Email submitted:', email);
    setIsSubscribed(true);
    setEmail('');
  };

  const benefits = [
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Early access to new drops"
    },
    {
      icon: <Crown className="w-5 h-5" />,
      text: "Exclusive notifications"
    },
    {
      icon: <Gift className="w-5 h-5" />,
      text: "First to know about sales"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-ash dark:bg-black">
      <div className="max-w-6xl mx-auto">
        {isSubscribed ? (
          // Success State
          <div className="text-center">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-12 shadow-lg border border-neutral-200 dark:border-neutral-800 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4 dark:text-white">You're on the list! ✅</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We'll notify you about new drops and exclusive updates.
              </p>
              <button
                onClick={() => setIsSubscribed(false)}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full hover:scale-105 transition-transform"
              >
                Add Another Email
              </button>
            </div>
          </div>
        ) : (
          // Main Waitlist Form - Split Layout
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <div className="text-left">
              <h2 className="text-4xl font-bold mb-6 dark:text-white leading-tight">
                Get Early Access
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                Be the first to know about new drops and exclusive updates before anyone else.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/50 dark:bg-neutral-900/50 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-neutral-800/50">
                    <div className="p-3 bg-ash dark:bg-neutral-800 rounded-xl text-black dark:text-white">
                      {benefit.icon}
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-800">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">Join the Waitlist</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get notified when new drops arrive
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-4 bg-ash dark:bg-black border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:scale-105 transition-transform duration-300"
                >
                  Notify Me
                </button>

                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    No spam, just early access notifications
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WaitlistSection;