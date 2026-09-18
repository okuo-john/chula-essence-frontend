import { Link } from 'react-router-dom';

const WigCard = ({ wig }) => {
  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <button
        type="button"
        aria-label="Add to wishlist"
        className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-white"
      >
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
          <Link
            to={`/shop-wigs/${wig.id}`}
            className="flex-1 text-center rounded-full border border-primary-pink px-3 py-2 font-body text-xs font-semibold text-primary-pink transition hover:bg-primary-pink hover:text-white"
          >
            View Product
          </Link>
          <button
            type="button"
            className="flex-1 rounded-full bg-primary-pink px-3 py-2 font-body text-xs font-semibold text-white transition hover:bg-pink-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default WigCard;