import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PLANTS, ACCESSORIES } from '../../data/plants';
import { useCart } from '../../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Find plant or fallback to Monstera
  const plant = PLANTS.find(p => p.id === id) || PLANTS[0];

  const [activeImage, setActiveImage] = useState(plant.heroImage || plant.gallery[0]);
  const [selectedSize, setSelectedSize] = useState(plant.potSizes ? plant.potSizes[1] || plant.potSizes[0] : { name: 'Medium (6")', inStock: true, priceDelta: 0 });
  const [selectedPlanter, setSelectedPlanter] = useState(plant.planters ? plant.planters[0] : { name: "None", color: "#fcf9f8", price: 0 });
  const [activeTab, setActiveTab] = useState('description');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Calculate current price based on options
  const calculatedPrice = plant.price + (selectedSize.priceDelta || 0) + (selectedPlanter.price || 0);

  const handleAddToCart = () => {
    addToCart(plant, {
      potSize: selectedSize.name,
      planter: selectedPlanter.name,
      planterPrice: selectedPlanter.price,
      priceDelta: selectedSize.priceDelta
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-[60px] py-4 text-xs text-on-surface-variant flex items-center gap-2">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary transition-colors">Houseplants</Link>
        <span>/</span>
        <span className="text-on-surface font-semibold">{plant.name}</span>
      </div>

      {/* Main Product Stage */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-[60px] grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-16">
        {/* Left: Image Gallery (Col 1-7) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="aspect-[4/5] bg-surface-container-low rounded-2xl overflow-hidden relative custom-shadow border border-outline-variant/20">
            <img
              src={activeImage}
              alt={plant.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {plant.badge && (
              <div className="absolute top-6 left-6 bg-secondary/15 text-secondary font-semibold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md">
                {plant.badge}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {plant.gallery && plant.gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {plant.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === img
                      ? 'border-primary opacity-100 shadow-sm'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details (Col 8-12) */}
        <div className="md:col-span-5 flex flex-col pt-2">
          <h1 className="font-display-lg text-3xl sm:text-4xl md:text-[42px] font-semibold text-on-surface mb-1">
            {plant.name}
          </h1>
          <p className="font-body-lg text-base text-on-surface-variant italic mb-4">
            {plant.scientificName}
          </p>
          <div className="text-3xl font-bold text-primary mb-6">
            ${calculatedPrice.toFixed(2)}
          </div>

          {/* Care Meter Card */}
          <div className="bg-surface-container-low rounded-2xl p-6 mb-8 border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-on-surface uppercase tracking-widest">
                Care Level
              </span>
              <div className="flex gap-1.5 items-center">
                <div className={`w-8 h-2 rounded-full ${plant.difficultyRating >= 1 ? 'bg-secondary' : 'bg-surface-variant'}`} />
                <div className={`w-8 h-2 rounded-full ${plant.difficultyRating >= 2 ? 'bg-secondary' : 'bg-surface-variant'}`} />
                <div className={`w-8 h-2 rounded-full ${plant.difficultyRating >= 3 ? 'bg-secondary' : 'bg-surface-variant'}`} />
                <span className="ml-2 text-xs font-semibold text-secondary">
                  {plant.difficulty}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-outline-variant/30 text-center">
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-primary text-2xl">light_mode</span>
                <span className="text-xs font-medium text-on-surface">{plant.lightLevel}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-primary text-2xl">water_drop</span>
                <span className="text-xs font-medium text-on-surface">{plant.watering}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className={`material-symbols-outlined text-2xl ${plant.petFriendly ? 'text-secondary' : 'text-error'}`}>
                  pets
                </span>
                <span className="text-xs font-medium text-on-surface">
                  {plant.petFriendly ? 'Pet Safe' : 'Toxic to Pets'}
                </span>
              </div>
            </div>
          </div>

          {/* Size Selector */}
          {plant.potSizes && (
            <div className="mb-6">
              <div className="flex justify-between mb-2.5">
                <label className="text-xs font-bold text-on-surface uppercase tracking-widest">
                  Select Size
                </label>
                <span className="text-xs text-primary font-medium">Standard Nursery Pot</span>
              </div>
              <div className="flex gap-3">
                {plant.potSizes.map((sz) => {
                  const isSelected = selectedSize.name === sz.name;
                  return (
                    <button
                      key={sz.name}
                      disabled={!sz.inStock}
                      onClick={() => setSelectedSize(sz)}
                      className={`flex-1 py-3 px-2 rounded-xl text-xs font-semibold transition-all relative overflow-hidden ${
                        !sz.inStock
                          ? 'border border-outline-variant opacity-60 cursor-not-allowed bg-surface-container-low'
                          : isSelected
                          ? 'border-2 border-primary bg-surface-container-low text-primary shadow-sm'
                          : 'border border-outline-variant text-on-surface hover:border-primary'
                      }`}
                    >
                      {sz.name}
                      {!sz.inStock && (
                        <div className="absolute inset-0 bg-surface/80 flex items-center justify-center">
                          <span className="text-[10px] text-on-surface font-semibold bg-surface-variant px-1.5 py-0.5 rounded">
                            Sold Out
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Planter Option */}
          {plant.planters && (
            <div className="mb-8">
              <div className="flex justify-between mb-2.5">
                <label className="text-xs font-bold text-on-surface uppercase tracking-widest">
                  Add Ceramic Planter
                </label>
                <span className="text-xs text-on-surface-variant">
                  {selectedPlanter.name} {selectedPlanter.price > 0 && `(+$${selectedPlanter.price})`}
                </span>
              </div>
              <div className="flex gap-3">
                {plant.planters.map((pl) => (
                  <button
                    key={pl.name}
                    onClick={() => setSelectedPlanter(pl)}
                    title={pl.name}
                    className={`w-14 h-14 rounded-xl p-1 border-2 transition-all ${
                      selectedPlanter.name === pl.name ? 'border-primary scale-105 shadow-md' : 'border-transparent hover:border-outline-variant'
                    }`}
                  >
                    <div
                      className="w-full h-full rounded-lg flex items-center justify-center shadow-inner"
                      style={{ backgroundColor: pl.color }}
                    >
                      {pl.border && (
                        <span className="material-symbols-outlined text-sm text-on-surface-variant">block</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart & Shipping */}
          <div className="mt-auto pt-4 border-t border-outline-variant/30">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl font-medium text-base text-white transition-all flex items-center justify-center gap-2 shadow-md active:scale-98 ${
                addedAnimation ? 'bg-secondary' : 'bg-primary hover:bg-primary-container'
              }`}
            >
              <span className="material-symbols-outlined">
                {addedAnimation ? 'check' : 'shopping_bag'}
              </span>
              <span>
                {addedAnimation ? 'Added to Botanical Cart!' : `Add to Cart — $${calculatedPrice.toFixed(2)}`}
              </span>
            </button>
            <p className="text-center text-xs text-on-surface-variant mt-3 flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-base text-secondary">local_shipping</span>
              Free standard shipping on orders over $100 • 30-day health guarantee
            </p>
          </div>
        </div>
      </section>

      {/* Product Information Tabs */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-[60px] mb-20">
        <div className="border-b border-outline-variant/30 flex gap-8 mb-8">
          <button
            onClick={() => setActiveTab('description')}
            className={`font-title-lg text-lg pb-4 font-semibold transition-colors ${
              activeTab === 'description' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`font-title-lg text-lg pb-4 font-semibold transition-colors ${
              activeTab === 'care' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Care Guide
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`font-title-lg text-lg pb-4 font-semibold transition-colors ${
              activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Reviews ({plant.reviewsCount || 24})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 text-on-surface-variant text-base leading-relaxed space-y-4">
            {activeTab === 'description' && (
              <>
                <p>{plant.description}</p>
                <p>{plant.secondaryDescription}</p>
                <ul className="space-y-3 pt-4">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary mt-0.5">eco</span>
                    <span><strong>Air Purifying:</strong> {plant.airPurifying}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary mt-0.5">psychiatry</span>
                    <span><strong>Growth Habit:</strong> {plant.growthHabit}</span>
                  </li>
                </ul>
              </>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-on-surface text-base">Watering Routine</h4>
                  <p className="text-sm mt-1">{plant.wateringSchedule}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-on-surface text-base">Light Exposure</h4>
                  <p className="text-sm mt-1">{plant.lightDescription}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-on-surface text-base">Humidity & Temperature</h4>
                  <p className="text-sm mt-1">Average room humidity (45-65%). Maintain temperatures between 65°F and 85°F.</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-amber-500">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i} className="text-lg">{star}</span>
                    ))}
                  </div>
                  <span className="font-bold text-on-surface text-base">{plant.rating || 4.9} out of 5</span>
                  <span className="text-xs text-on-surface-variant">({plant.reviewsCount} customer reviews)</span>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl border border-surface-container">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-semibold text-on-surface">Eleanor V.</span>
                    <span className="text-on-surface-variant">Verified Buyer • 2 weeks ago</span>
                  </div>
                  <p className="text-sm text-on-surface">
                    "Arrived packaged with immense care! The leaves are glossy and already unfurled a new shoot within 10 days. The terracotta pot matches my aesthetic seamlessly."
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-4 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 h-fit">
            <h3 className="font-title-lg text-base font-semibold text-on-surface mb-3">
              What's Included
            </h3>
            <ul className="text-sm text-on-surface-variant space-y-2.5">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Healthy specimen in nursery drainage pot
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Artisan well-draining organic soil blend
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Verdant Botanical Care Card with calendar QR
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                30-day health guarantee & horticulturist chat
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Complete the Sanctuary (Cross-sell) */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[60px]">
          <h2 className="font-display-lg text-2xl md:text-3xl text-center font-semibold mb-10 text-on-surface">
            Complete the Sanctuary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {ACCESSORIES.map((acc) => (
              <div
                key={acc.id}
                className="group p-3 rounded-2xl bg-surface-bright border border-surface-container hover:border-outline-variant transition-all cursor-pointer shadow-sm hover:shadow-md"
                onClick={() => {
                  addToCart({
                    id: acc.id,
                    name: acc.name,
                    price: acc.price,
                    image: acc.image,
                    heroImage: acc.image
                  }, { potSize: 'Standard', planter: 'N/A' });
                }}
              >
                <div className="aspect-square bg-surface rounded-xl overflow-hidden mb-3">
                  <img
                    src={acc.image}
                    alt={acc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-title-lg text-sm font-semibold text-on-surface">
                      {acc.name}
                    </h3>
                    <p className="text-xs font-semibold text-primary mt-1">
                      ${acc.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="p-1.5 rounded-full bg-surface-container text-primary hover:bg-primary hover:text-white transition-colors"
                    title="Add accessory"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
