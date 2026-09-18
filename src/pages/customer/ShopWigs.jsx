import { wigs } from "../../utils/mockWigs";
import WigCard from "../../components/products/WigCard";

const ShopWigs = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl lg:text-4xl text-chula-black">
            Shop All Wigs
          </h1>
          <p className="mt-3 font-body text-gray-600">
            High quality wigs for every queen
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {wigs.map((wig) => (
            <WigCard key={wig.id} wig={wig} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopWigs;