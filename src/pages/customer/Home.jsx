import { Link } from 'react-router-dom';
import heroImage from '../../assets/hero-woman.png';

const Home = () => {
    return (
        <>
          <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-10 lg:py-16 flex flex-col-reverse lg:flex-row items-center lg:items-start gap-8 lg:gap-10">
                {/* Text */}
                <div className="flex-1 text-center lg:text-left">
                    <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-tight text-chula-black">
                        Your Beauty.
                        <br />
                        Your Confidence.
                        <br />
                        Your <span className="text-primary-pink">Essence.</span>
                    </h1>
                    <p className="mt-6 font-body text-base sm:text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
                        Professional beauty services and premium wigs that bring out the best in you. Luxury. Quality. You.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to="/book-service" className="inline-flex items-center justify-center rounded-full bg-primary-pink px-8 py-3 font-body font-semibold text-white shadow-sm transition hover:bg-pink-600">
                          Book a Service
                        </Link> 
                        <Link to="/shop-wigs" className="inline-flex items-center justify-center rounded-full border border-chula-black px-8 py-3 font-body font-semibold text-chula-black transition hover:bg-chula-black hover:text-white">
                          Shop Wigs
                        </Link>
                    </div>
                </div>

                {/* Image */}
                <div className="flex-1 w-full max-w-md lg:max-w-none">
                    <img src={heroImage} alt="Chula Essence client with styled hair, wearing pink" className="w-full aspect-[4/5] lg:aspect-[3/4] object-cover rounded-3xl shadow-lg" />
                </div>
            </div>
          </section>

          {/* Services, Shop Wigs, Testimonials, Contact sections go here next */}
        </>
    );
};


export default Home;