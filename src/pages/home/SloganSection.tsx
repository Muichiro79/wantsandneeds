import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.jpeg";



const SloganSection = () => {
 const cards = [
    {
      title: '',
      description: "Where street meets sophistication",
      image: image1,
      cta: "Explore Style",
      link: "/collections/urban"
    },
    {
      title: "Premium Essentials",
      description: "Elevate your everyday wardrobe",
      image: image2,
      cta: "Shop Collection",
      link: "/collections/essentials"
    },
    {
      title: "Signature Sweatsuits",
      description: "Comfort meets street-ready style",
      image: image3,
      cta: "Shop Now",
      link: "/collections/sweatsuits"
    },
    {
      title: "Limited Edition",
      description: "Exclusive drops, limited quantities",
      image: image4,
      cta: "View Drops",
      link: "/collections/limited"
    }
];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, index) => (
          <div key={index} className="group relative h-96 rounded-3xl overflow-hidden bg-black">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">{card.title}</h3>
              <p className="text-lg text-white/80 mb-6">{card.description}</p>
              <a
                href={card.link}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-black hover:text-white border-2 border-white transition-all duration-300 w-fit group/btn"
              >
                {card.cta}
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SloganSection;