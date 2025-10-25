import HeroSection from './HeroSection';
import ShopByCategory from './ShopByCategory';
import TrendingProducts from './TrendingProducts';
import SloganSection from './SloganSection';
import WaitlistSection from './WaitlistSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Section 1: Hero Carousel */}
      <HeroSection />
      
      {/* Section 2: Shop by Category */}
      <ShopByCategory />
      
      {/* Section 3: Trending Products */}
      <TrendingProducts />
      
      {/* Section 4: Slogan/Grid Section */}
      <SloganSection />
      
      {/* Section 5: Waitlist Section */}
      <WaitlistSection />
    </div>
  );
};

export default Home;