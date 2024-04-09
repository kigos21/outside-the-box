export default function SpecialPromos({
  specialPromos,
}: {
  specialPromos: string[];
}) {
  return (
    <div>
      <h2 className="mb-8 text-center text-4xl font-bold text-cs-orange lg:text-5xl xl:text-6xl">
        Special Promos
      </h2>
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <img
          src="specialpromo1.jpg"
          alt="Special Promo 1"
          className="xl:h-108 h-auto w-full md:h-80 md:w-auto lg:h-96"
        />
        <img
          src="specialpromo2.jpg"
          alt="Special Promo 2"
          className="xl:h-108 h-auto w-full md:h-80 md:w-auto lg:h-96"
        />
      </div>
    </div>
  );
}
