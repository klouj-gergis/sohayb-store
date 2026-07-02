export default function WhyChooseUs() {
  return (
    <section className="w-full h-[80vh] bg-white  max-h-screen overflow-hidden p-6 flex flex-col gap-6">
      <h3 className="text-3xl text-olive font-semibold text-left md:text-center">
        Why Choose Us?
      </h3>

      {/* Scrollable Card Container */}
      <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory h-full pb-4">
        {/* Card 1 */}
        <div className="snap-start flex-shrink-0 w-72 bg-gray-100 p-5 rounded-md text-olive flex flex-col gap-4">
          <h4 className="text-xl font-semibold">1. 100% Pure & Natural</h4>
          <p>
            Free from additives or blends. Pure olive oil straight from our groves in North Sinai, Egypt.
          </p>
        </div>

        {/* Card 2 */}
        <div className="snap-start flex-shrink-0 w-72 bg-gray-100 rounded-md text-olive flex flex-col gap-4">
          <img src="/images/natural.jpg" alt="natural" className="rounded-t-md w-full h-40 object-cover" />
          <div className="px-5 pb-5">
            <h4 className="text-xl font-semibold">2. From a Proud Family Farm</h4>
            <p>
              A family-run project since 2017. Every tree is carefully nurtured from planting to harvest to ensure top quality.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="snap-start flex-shrink-0 w-72 bg-gray-100 p-5 rounded-md text-olive flex flex-col gap-4">
          <h4 className="text-xl font-semibold">3. Rich Flavor & Balanced Taste</h4>
          <p>
            Smooth, slightly bitter with a mild peppery finish – perfect for cooking, drizzling, or salad dressings.
          </p>
        </div>

        {/* Card 4 */}
        <div className="snap-start flex-shrink-0 w-72 bg-gray-100 p-5 rounded-md text-olive flex flex-col gap-4">
          <h4 className="text-xl font-semibold">4. Rich in Antioxidants</h4>
          <p>
            Packed with Omega-9, Vitamin E, and polyphenols – great for heart health and immunity.
          </p>
        </div>
      </div>
    </section>
  );
}
