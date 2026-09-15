import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PLANTS } from '../../data/plants';
import { useCart } from '../../context/CartContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const curatedPlants = PLANTS.slice(0, 4);

  return (
    <div className="pt-20">
      {/* Hero Section (Asymmetrical Layout) */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-[60px] py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center min-h-[700px]">
        <div className="md:col-span-5 order-2 md:order-1 flex flex-col items-start gap-8 z-10 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Autumn Botanical Drop 2024
          </div>
          <h1 className="font-display-lg text-4xl sm:text-5xl md:text-[54px] font-semibold text-on-surface leading-[1.15] tracking-tight">
            Bring the <br className="hidden md:block" />
            <span className="text-primary italic font-serif font-normal">Outdoors</span> In.
          </h1>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-md leading-relaxed">
            Curated botanical statements for the modern sanctuary. Grown with organic intention, delivered directly to your doorstep.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="bg-primary text-white font-medium px-8 py-4 rounded-xl hover:bg-primary-container transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
            >
              <span>Shop the Collection</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
            <Link
              to="/quiz"
              className="px-6 py-4 rounded-xl border border-outline-variant text-on-surface hover:border-primary hover:text-primary transition-colors font-medium text-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-secondary">psychology_alt</span>
              <span>Find My Plant Quiz</span>
            </Link>
          </div>
        </div>

        <div className="md:col-span-7 order-1 md:order-2 h-[420px] md:h-[620px] w-full rounded-2xl overflow-hidden relative custom-shadow bg-surface-container">
          <img
            className="w-full h-full object-cover rounded-2xl transition-transform duration-1000 hover:scale-105"
            alt="Monstera Deliciosa living room botanical setting"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB20vkrdpCSMv3bpx9P2gQE6CDJALMSPaftnITYK6s3m8i59PV_j6GD2QezdhFzu8oAF1JARS8yCPOxkYTu91WT8mb98VgIeQLNTmTjhpWEOwWf9AYIWluferryX9QYSVSCPXZi1lm99MBXFEU1-JOM-QKZ62tHv_f4GxUIscVNxdoQJn9zsT8QJusm_PNLYqakiAag_0Ig6sH7KzUY9fP3aXoo-MBF8XAlWMbku2ApE4G9X7sk90bm"
          />
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-surface/85 backdrop-blur-md border border-white/40 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">Featured Statement</p>
              <h3 className="font-title-lg font-semibold text-on-surface">Monstera Deliciosa Sanctuary</h3>
            </div>
            <Link
              to="/product/monstera-deliciosa"
              className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-container transition-colors"
            >
              View Specimen
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-surface-container-low py-8 border-y border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[60px] flex flex-col md:flex-row justify-between items-center gap-6 text-on-surface-variant text-sm font-medium">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_shipping
            </span>
            <span className="tracking-wider uppercase text-xs font-semibold">Free shipping over $100</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span className="tracking-wider uppercase text-xs font-semibold">30-day plant health guarantee</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              pets
            </span>
            <span className="tracking-wider uppercase text-xs font-semibold">Certified Pet-safe options</span>
          </div>
        </div>
      </section>

      {/* Featured Products (Horizontal Scroll) */}
      <section className="max-w-[1280px] mx-auto py-20 overflow-hidden">
        <div className="px-5 md:px-[60px] mb-10 flex justify-between items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary block mb-1">
              Hand-Selected
            </span>
            <h2 className="font-display-lg text-3xl md:text-4xl text-on-surface font-semibold">
              Curated Specimens
            </h2>
          </div>
          <Link
            to="/shop"
            className="font-medium text-sm text-primary hover:text-primary-container transition-colors border-b border-primary/40 pb-1 flex items-center gap-1"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto hide-scrollbar px-5 md:px-[60px] pb-6 snap-x snap-mandatory">
          {curatedPlants.map((plant) => (
            <div
              key={plant.id}
              className="min-w-[280px] md:min-w-[320px] flex flex-col gap-4 snap-start group cursor-pointer"
              onClick={() => navigate(`/product/${plant.id}`)}
            >
              <div className="aspect-[4/5] bg-surface-container-low rounded-2xl overflow-hidden relative custom-shadow transition-all duration-500 group-hover:-translate-y-2">
                <img
                  className="w-full h-full object-cover object-center mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                  alt={plant.name}
                  src={plant.image}
                />
                <span className="absolute top-4 left-4 bg-secondary/15 text-secondary font-semibold text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                  {plant.badge}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(plant);
                  }}
                  title="Quick Add"
                  className="absolute bottom-4 right-4 bg-surface text-primary p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-white"
                >
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    add_shopping_cart
                  </span>
                </button>
              </div>

              <div className="flex justify-between items-start px-1">
                <div>
                  <h3 className="font-title-lg text-lg text-on-surface font-semibold group-hover:text-primary transition-colors">
                    {plant.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">{plant.lightLevel}</p>
                </div>
                <span className="font-title-lg text-lg font-bold text-on-surface">
                  ${plant.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category (Bento Grid) */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-[60px] py-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary block mb-1">
            Categorical Curation
          </span>
          <h2 className="font-display-lg text-3xl md:text-4xl text-on-surface font-semibold mb-3">
            Explore the Sanctuary
          </h2>
          <p className="text-on-surface-variant text-base">
            Whether your room receives dim morning shadows or bright direct sunlight, there is a thriving botanical companion for your space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[580px]">
          {/* Large Feature Category */}
          <Link
            to="/shop?category=statement"
            className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative group custom-shadow min-h-[300px]"
          >
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Statement Plants collection"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVbMwml0tZFbx1555WfwZ3MWKwvli1lp1I2FeKUeZsyAyQkj3dQv9_xQTLDdLCTMUqEkGxadiXk2Lik6AA9pLvqSmwQGYH2VvhCZz363pmxxhSiD69mxljjThruNC6J-F-nXE5UYxUXO5Mei94KNwT3icAuJsIk_2w2aAChMieKs4G4brdhmlbfa8Achx5NKcQcSLtZvNbRuNkPmLTT4EUm0BGmDu7cO9PcVDaML4mT85q3qKJ9yKz"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 flex flex-col gap-2 z-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary-fixed">
                Large Scale
              </span>
              <h3 className="font-display-lg text-3xl md:text-4xl text-white font-semibold">
                Statement Plants
              </h3>
              <span className="text-xs font-medium text-surface-container-lowest/80 group-hover:text-primary-fixed transition-colors flex items-center gap-1.5 mt-1">
                Explore Specimens <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </div>
          </Link>

          {/* Small Category 1 */}
          <Link
            to="/shop?light=low"
            className="md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden relative group bg-surface-container-low custom-shadow h-[220px] md:h-auto"
          >
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="font-title-lg text-xl text-white font-semibold group-hover:text-primary-fixed transition-colors">
                Low Light Thrivers
              </h3>
              <p className="text-xs text-white/80 mt-1">For dim rooms & desks</p>
            </div>
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              alt="Low light plants"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8EwUz3jNPYkyt06Bcd3IahrF9zBOtviIFFfktcL5pXVWAzWwHOr3x3WCRsFl8Iz-ZJziCNNKneFqEfkuCByrEQLj0sEcg2QeYBGcOt8jF9zQaAZjl6YlVf_ywQ_W3LLvXB-wPbg9jHFpP-ZgkNJFrh4vwPYJq1EHP0uMF98nSMgs_s4j92iq3RI9G5gBCeyuDrricBilCP5GgYFJwcqjbQUhdP8R8j23nflJqEBK1CKjmsOhs3tvP"
            />
          </Link>

          {/* Small Category 2 */}
          <Link
            to="/shop?pet=true"
            className="md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden relative group bg-surface-container-low custom-shadow h-[220px] md:h-auto"
          >
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="font-title-lg text-xl text-white font-semibold group-hover:text-primary-fixed transition-colors">
                Pet-Safe Greens
              </h3>
              <p className="text-xs text-white/80 mt-1">Non-toxic to cats & dogs</p>
            </div>
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              alt="Pet safe plants"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtAYUJkECGOTXO-cAHFGHq44aJxNfPTqYvvaRExFH6M3aX9sdxDzK26tCkPiLhjJQg4bWTnzQXALhSqgVsi-1vlYWUdAHrU5EKMj1CBE3vTkOUdZWruxs6CLDLJ4KkJ98lUTR6HQYY796V-YJ950wdI9ap6yp2htKSS6NScV1GvRhjCqE_TeQ5B6zA-XM3yELGAr5TkdAylGFAElWAMJh3qFel8PBcE_TApb_e-l8cut7B0jHxnr45"
            />
          </Link>

          {/* Wide Category */}
          <Link
            to="/shop?difficulty=easy"
            className="md:col-span-2 md:row-span-1 rounded-2xl overflow-hidden relative group bg-secondary-fixed/30 custom-shadow h-[220px] md:h-auto flex items-center p-8 border border-secondary-fixed/40"
          >
            <div className="flex flex-col gap-2 z-10 md:w-3/5">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Forgiving & Resilient
              </span>
              <h3 className="font-title-lg text-2xl text-on-surface font-semibold">
                Beginner-Friendly
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Resilient greenery requiring minimal attention—flourishing even if you miss a watering.
              </p>
              <span className="text-xs font-semibold text-primary mt-1 flex items-center gap-1 group-hover:gap-2 transition-all">
                Shop Easy Care <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
              </span>
            </div>
            <img
              className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              alt="Beginner friendly plants"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk4lj0ix4UIqSgHEIKg_3OTDxHmQOiUXH9PDFpJo6EUfYseQHn1y0MuvFg0YEAlkoGeCl2ZJryorYSH3ar3Q9wIl18dHVv-ulsBLFXj4uyTFCKF1MUZziEWuyJ-aWmoG-q_-04LRF10gXBxhyOFB4j2-jw3ETmrgwAbPOJbNeXAqhVAsUiBTnxvoUlj8lbv-ZwxiVIzZ1K4EyxbrfJQ32uRrH_SH6C-RAMrXzbkASly9UztXBTX_XK"
              style={{ maskImage: 'linear-gradient(to right, transparent, black 35%)' }}
            />
          </Link>
        </div>
      </section>

      {/* Quiz Interactive Callout Banner */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-[60px] py-12">
        <div className="bg-surface-container-low rounded-3xl p-8 md:p-14 border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="max-w-xl z-10">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold block mb-2">
              Interactive Diagnostic
            </span>
            <h3 className="font-display-lg text-3xl md:text-4xl text-on-surface font-semibold mb-4">
              Not sure which specimen suits your space?
            </h3>
            <p className="text-on-surface-variant text-base leading-relaxed mb-6">
              Take our 2-minute Plant Finder Quiz. We calculate your light angles, watering habits, and pet safety needs to curate your ideal botanical match.
            </p>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3.5 rounded-xl font-medium text-sm hover:bg-on-secondary-container transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-lg">psychology_alt</span>
              Start the Plant Finder
            </Link>
          </div>
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white shrink-0 rotate-3 transition-transform hover:rotate-0 duration-500">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChj86yAN_cR4z_tFB3od1rFeuwIz5YpwyvjsX13lVitEGbQEJhmrDjMPTYFBaN1sHGAhHRVssRuVK2ca0alzoKcqMznhGqptzfb1RSrWTFnBkpyRN9cltqKLMynsIcvhpgcq8UBwcovfewlTa985j3DwIxyiHgRpo_8Yj0ja9J1Vjag9ghxVmB7lrY-K4Hn8IaWJugxSlhLxgniVt5a74oV3HMB9naZ843rYl11kIF1A62w1KFpCCo"
              alt="Quiz recommendation preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
