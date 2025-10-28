import { Leaf, Heart, Eye, Target, Users, Award, Sparkles, TrendingUp, Recycle, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Enhanced Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(0,0,0,0))]" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-8">
              <Sparkles className="w-4 h-4 text-black dark:text-white" />
              <span className="text-sm font-medium text-black dark:text-white">Since 2018</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 bg-linear-to-br from-black via-black to-neutral-700 dark:from-white dark:via-white dark:to-neutral-300 bg-clip-text text-transparent">
              About Us
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Redefining fashion with <span className="font-semibold text-black dark:text-white">conscious design</span>, 
              exceptional quality, and <span className="font-semibold text-black dark:text-white">timeless aesthetics</span> 
              that transcend seasons.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section - Enhanced */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl shadow-blue-500/25">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Our Journey</span>
                  <h2 className="text-4xl font-bold bg-linear-to-br from-black to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">Our Story</h2>
                </div>
              </div>
              
              <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                  Founded in 2018, we started as a small team of designers and environmental 
                  enthusiasts who believed fashion could be both <span className="font-semibold text-black dark:text-white">beautiful and responsible</span>.
                </p>
                <p>
                  Our journey began with a simple observation: the fashion industry was creating 
                  beautiful pieces at the cost of our planet. We knew there had to be a better way.
                </p>
                <p>
                  Today, we're a community of passionate individuals dedicated to 
                  creating clothing that not only looks good but <span className="font-semibold text-black dark:text-white">does good</span>. Every piece in our 
                  collection is crafted with intention, from design to delivery.
                </p>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="bg-linear-to-br from-white to-gray-50 dark:from-neutral-800 dark:to-neutral-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-black dark:text-white">50+</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Team Members</p>
                  </div>
                </div>
              </div>
              <div className="bg-linear-to-br from-white to-gray-50 dark:from-neutral-800 dark:to-neutral-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-black dark:text-white">6</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=700&fit=crop"
                alt="Our team working together"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Element */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-2xl border border-gray-100 dark:border-neutral-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-linear-to-br from-orange-500 to-red-500 rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-black dark:text-white">Innovation</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Driving Change</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lookability Section - Enhanced */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-linear-to-br from-gray-50 to-blue-50 dark:from-neutral-900 dark:to-blue-900/10 rounded-3xl p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-size[24px_24px]" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl shadow-2xl shadow-purple-500/25">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Design Philosophy</span>
                  <h2 className="text-4xl font-bold bg-linear-to-br from-black to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">Lookability</h2>
                </div>
              </div>
              
              <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                  Lookability is our design philosophy that combines <span className="font-semibold text-black dark:text-white">timeless aesthetics</span> 
                  with modern functionality.
                </p>
                <p>
                  We create pieces that transition seamlessly from day to night, season 
                  to season, and trend to trend. Our designs are characterized by clean 
                  lines, versatile silhouettes, and attention to detail that stands the 
                  test of time.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: Target, label: "Timeless Design", color: "text-blue-500" },
                  { icon: Award, label: "Premium Fabrics", color: "text-purple-500" },
                  { icon: Zap, label: "Perfect Fit", color: "text-pink-500" },
                  { icon: Sparkles, label: "Versatile Styling", color: "text-orange-500" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="p-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="text-sm font-medium text-black dark:text-white group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=700&fit=crop"
                    alt="Fashionable clothing showcasing lookability"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                {/* Decorative Element */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl rotate-12 shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section - Enhanced */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl shadow-green-500/25">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">Our Commitment</span>
                <h2 className="text-4xl font-bold bg-linear-to-br from-black to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">Sustainability</h2>
              </div>
            </div>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <p>
                Our commitment to sustainability is woven into every aspect of our business, 
                from material sourcing to packaging.
              </p>
              <p>
                We use organic, recycled, and regenerated materials whenever possible, 
                and we're constantly exploring new ways to reduce our environmental footprint.
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              {[
                { value: "85%", label: "Organic Materials", icon: Leaf },
                { value: "100%", label: "Plastic-Free", icon: Recycle },
                { value: "50K+", label: "Bottles Recycled", icon: TrendingUp },
                { value: "Carbon", label: "Neutral Shipping", icon: Zap }
              ].map((stat, index) => (
                <div key={index} className="bg-linear-to-br from-white to-gray-50 dark:from-neutral-800 dark:to-neutral-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <stat.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-black dark:text-white">{stat.value}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=700&fit=crop"
                alt="Sustainable fashion and eco-friendly materials"
                className="w-full h-[600px] object-cover"
              />
            </div>
            
            {/* 1% for the Planet Badge */}
            <div className="absolute -bottom-6 -right-6 bg-linear-to-br from-green-500 to-emerald-600 p-8 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-4 text-white">
                <Heart className="w-8 h-8" />
                <div>
                  <p className="text-xl font-bold">1% for the</p>
                  <p className="text-xl font-bold">Planet</p>
                  <p className="text-sm opacity-90 mt-1">Member Since 2019</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-linear-to-br from-black to-neutral-900 dark:from-white dark:to-neutral-100 p-16 rounded-3xl relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          </div>
          
          <div className="text-center relative">
            <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-white/10 dark:bg-black/10 mb-8">
              <Sparkles className="w-6 h-6 text-white dark:text-black" />
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold text-white dark:text-black mb-8">
              Our Mission
            </h3>
            
            <p className="text-xl md:text-2xl text-white/80 dark:text-black/80 leading-relaxed">
              To create beautiful, high-quality clothing that respects both people and planet, 
              inspiring a more <span className="font-semibold text-white dark:text-black">conscious approach to fashion</span> that lasts beyond seasons and trends.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;