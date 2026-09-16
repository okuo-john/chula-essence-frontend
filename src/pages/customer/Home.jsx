import { Link } from 'react-router-dom';
import heroImage from '../../assets/hero-woman.png';
import installationImg from '../../assets/installation.png';
import lashesImg from '../../assets/lashes.png'
import nailsImg from '../../assets/nails.png';
import pedicureImg from '../../assets/pedicure.png';
import wiggingImg from '../../assets/wigging.png';
import bodyWaveImg from '../../assets/body-wave.png';
import boneStraightImg from '../../assets/bone-straight.png';
import curlyBobImg from '../../assets/curly-bob.png';
import deepWaveImg from '../../assets/deep-wave.png';

const services = [
    { id: 'installation', name: 'installation', price: '₦20,000', image: installationImg },
    { id: 'cluster-lashes', name: 'Cluster Lashes', price: '₦12,000', image: lashesImg },
    { id: 'nails', name: 'Nails', price: '₦10,000', image: nailsImg },
    { id: 'pedicure', name: 'Pedicure', price: '₦8,000', image: pedicureImg },
    { id: 'wigging-revamping', name: 'Wigging & Revamping', price: '₦15,000', image: wiggingImg },
];

const wigs = [
    { id: 'body-wave', name: 'Body Wave Wig', price: "₦85,000", available: 3, image: bodyWaveImg },
    { id: 'bone-straight', name: 'Bone Straight Wig', price: '₦120,000', available: 5, image: boneStraightImg },
    { id: 'curly-bob', name: 'Curly Bob Wig', price: '₦75,000', available: 2, image: curlyBobImg },
    { id: 'deep-wave', name: 'Deep Wave Wig', price: '₦90,000', available: 4, image: deepWaveImg },
];

const Home = () => {
    return (
        <>
          <section className="bg-white">
  <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">

    <div className="relative min-h-[550px] overflow-hidden rounded-lg bg-[#fff0f6] lg:min-h-[600px]">

      {/* Hero Image */}
      <img
        src={heroImage}
        alt="Chula Essence beauty model"
        className="absolute inset-0 h-full w-full object-cover object-right"
      />

      {/* Soft gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#fff0f6] via-[#fff0f6]/40 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[620px] items-center lg:min-h-[650px]">

        <div className="px-8 sm:px-12 lg:text-left">

          <h1 className="font-heading text-4xl leading-tight text-chula-black sm:text-5xl lg:text-6xl">
            Your Beauty.
            <br />
            Your Confidence.
            <br />
            Your <span className="text-primary-pink">Essence.</span>
          </h1>

          <p className="mt-6 max-w-md font-body text-base sm:text-lg text-gray-600 lg-mx-0">
            Professional beauty services and premium wigs that bring out
            the best in you. Luxury. Quality. You.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

            <Link
              to="/book-service"
              className="inline-flex items-center justify-center rounded-full bg-primary-pink px-8 py-3 font-body font-semibold text-white shadow-sm transition duration-200 hover:bg-pink-600"
            >
              Book a Service
            </Link>

            <Link
              to="/shop-wigs"
              className="inline-flex items-center justify-center rounded-full border border-chula-black bg-white/80 px-8 py-3 font-body font-semibold text-chula-black transition duration-200 hover:bg-chula-black hover:text-white"
            >
              Shop Wigs
            </Link>

          </div>

        </div>
      </div>

    </div>
  </div>
</section>

          {/* Services */}
          <section className="bg-white py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-3xl lg:text-4xl text-chula-black">Our Services</h2>
                    <p className="mt-3 font-body text-gray-600">Indulge in our premium beauty services</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {services.map((service) => (
                        <div key={service.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover: -translate-y-1 hover:border-primary-pink/60">
                            <img src={service.image} alt={service.name} className="w-full aspect-square object-cover transition-transform duration-500 ease-out group-hover:scale-110"/>
                            <div className="p-4">
                                <h3 className="relative inline-block font-body font-semibold text-chula-black">{service.name}<span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" /></h3>
                                <p className="font-body text-sm text-gray-500 mt-2"> From <span className="text-primary-pink font-semibold">{service.price}</span></p>
                                <Link to="/book-service" className="mt-4 block text-center rounded-full bg-primary-pink px-4 py-2 font-body text-sm font-semibold text-white transition hover:bg-pink-600">
                                     Book Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </section>

          {/* Shop Premium Wigs */}
          <section className="bg-soft-pink py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-3xl lg:text-4xl text-chula-black">Shop Premium Wigs</h2>
                    <p className="mt-3 font-body text-gray-600">High quality wigs for every queen</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {wigs.map((wig) => (
                        <div key={wig.id} className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                            <button type="button" aria-label="Add to wishlist" className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-white">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-chula-black">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                             </svg>
                            </button>

                            <img src={wig.image} alt={wig.name} className="w-full aspect-[4/5] object-cover" />

                            <div className="p-4">
                                <h3 className="font-body font-semibold text-chula-black">{wig.name}</h3>
                                <p className="font-body text-primary-pink font-semibold mt-1">{wig.price}</p>
                                <p className="font-body text-xs text-gray-500 mt-1">Available: {wig.available}</p>
                                
                                <div className="mt-4 flex gap-2">
                                    <Link to={`/shop-wigs/${wig.id}`} className="flex-1 text-center rounded-full border border-primary-pink px-3 py-2 font-body text-xs font-semibold text-primary-pink transition hover:bg-primary-pink hover:text-white">
                                     View Product
                                     </Link>
                                     <button type="button" className="flex-1 rounded-full bg-primary-pink px-3 py-2 font-body text-xs font-semibold text-white transition hover:bg-pink-600">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link to="/shop-wigs" className="bg-white inline-block rounded-full border border-chula-black px-8 py-3 font-body font-semibold text-chula-black transition hover:bg-chula-black hover:text-white">
                     View All Wigs
                    </Link>
                </div>
            </div>
          </section>
        </>
    );
};


export default Home;