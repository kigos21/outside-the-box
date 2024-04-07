export default function SpecialPromos({
  specialPromos,
}: {
  specialPromos: string[];
}) {
  return (
    <div>
      <h2 className="mb-8 text-center text-6xl font-bold text-cs-orange">
        Special Promos
      </h2>
      <div className="flex items-center justify-center gap-8">
        <img
          src="specialpromo1.jpg"
          alt="Special Promo 1"
          style={{ height: '500px', width: '500px' }}
        />
        <img
          src="specialpromo2.jpg"
          alt="Special Promo 2"
          style={{ height: '500px', width: '500px' }}
        />
      </div>
    </div>
  );
}
