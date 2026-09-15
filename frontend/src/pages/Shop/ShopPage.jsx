import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PLANTS } from '../../data/plants';
import { useCart } from '../../context/CartContext';

export default function ShopPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  // Initial filter values from query parameters if available
  const initialPet = searchParams.get('pet') === 'true';
  const initialLight = searchParams.get('light');
  const initialDifficulty = searchParams.get('difficulty');

  const [selectedLights, setSelectedLights] = useState(
    initialLight ? [initialLight === 'low' ? 'Low Light' : initialLight] : []
  );
  const [petOnly, setPetOnly] = useState(initialPet);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState(
    initialDifficulty ? [initialDifficulty === 'easy' ? 'Easy' : initialDifficulty] : []
  );
  const [sortBy, setSortBy] = useState('New Arrivals');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const toggleLight = (light) => {
    setSelectedLights(prev =>
      prev.includes(light) ? prev.filter(l => l !== light) : [...prev, light]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleDifficulty = (diff) => {
    setSelectedDifficulties(prev =>
      prev.includes(diff) ? prev.filter(d => d !== diff) : [...prev, diff]
    );
  };

  const clearAllFilters = () => {
    setSelectedLights([]);
    setPetOnly(false);
    setSelectedSizes([]);
    setSelectedDifficulties([]);
    setSearchParams({});
  };

  // Filtered and Sorted Plants
  const filteredPlants = useMemo(() => {
    return PLANTS.filter(plant => {
      // Light filter
      if (selectedLights.length > 0) {
        const matches = selectedLights.some(l => plant.lightLevel.toLowerCase().includes(l.toLowerCase()));
        if (!matches) return false;
      }
      // Pet friendly
      if (petOnly && !plant.petFriendly) {
        return false;
      }
      // Size filter
      if (selectedSizes.length > 0 && !selectedSizes.includes(plant.size)) {
        return false;
      }
      // Care difficulty
      if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(plant.difficulty)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Popularity') return b.reviewsCount - a.reviewsCount;
      return 0; // New Arrivals default
    });
  }, [selectedLights, petOnly, selectedSizes, selectedDifficulties, sortBy]);

  return (
    <main className="flex-grow pt-28 pb-24 px-5 md:px-[60px] max-w-[1280px] mx-auto w-full">
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-surface-container pb-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-secondary mb-1">
            Complete Catalog ({filteredPlants.length} Botanical Specimens)
          </div>
          <h1 className="font-display-lg text-4xl sm:text-5xl text-on-background font-semibold mb-3">
            Botanical Collection
          </h1>
          <p className="font-body-lg text-base text-on-surface-variant">
            Curated specimens to bring life, texture, and organic warmth into your sanctuary. Explore our collection of hardy greenery and rare finds.
          </p>
        </div>

        <div className="flex items-center gap-4 self-start md:self-auto">
          <label className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wider" htmlFor="sort">
            Sort By
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-surface border border-outline-variant text-on-background font-body-md text-sm rounded-xl pl-4 pr-10 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer transition-colors hover:border-outline shadow-sm"
            >
              <option>New Arrivals</option>
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-sm">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Grid Layout: Sidebar + Products */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Mobile Filter Button */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="md:hidden w-full py-3 px-4 flex justify-between items-center border border-outline-variant rounded-xl text-on-background font-medium text-sm bg-surface"
        >
          <span>Filter & Refine ({selectedLights.length + (petOnly ? 1 : 0) + selectedSizes.length + selectedDifficulties.length})</span>
          <span className="material-symbols-outlined text-lg">tune</span>
        </button>

        {/* Filter Sidebar */}
        <aside
          className={`md:col-span-3 sticky top-28 bg-surface-container-lowest rounded-2xl p-6 border border-surface-container shadow-sm shadow-primary/5 ${
            mobileFilterOpen ? 'block mb-6' : 'hidden md:block'
          }`}
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-container">
            <h2 className="font-title-lg text-lg text-on-background font-semibold">Filters</h2>
            <button
              onClick={clearAllFilters}
              className="font-label-md text-xs text-primary hover:text-primary-container font-semibold transition-colors uppercase tracking-wider"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-6">
            {/* Light Needs */}
            <div>
              <h3 className="font-body-md text-sm font-semibold text-on-background mb-3">Light Needs</h3>
              <div className="space-y-2.5">
                {['Low Light', 'Medium Light', 'Bright Indirect', 'Bright Direct'].map((light) => (
                  <label key={light} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedLights.includes(light)}
                      onChange={() => toggleLight(light)}
                      className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary bg-surface"
                    />
                    <span className="text-sm text-on-surface-variant group-hover:text-on-background transition-colors">
                      {light}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Pet Safe Toggle */}
            <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-on-background flex items-center gap-1">
                    <span className="material-symbols-outlined text-base text-secondary">pets</span>
                    Pet-Friendly
                  </span>
                  <span className="text-[11px] text-on-surface-variant">Non-toxic to pets</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={petOnly}
                    onChange={(e) => setPetOnly(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary" />
                </label>
              </div>
            </div>

            {/* Size */}
            <div>
              <h3 className="font-body-md text-sm font-semibold text-on-background mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {['Small', 'Medium', 'Large', 'Extra Large'].map((sz) => {
                  const isSelected = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary-fixed text-primary font-semibold'
                          : 'border-outline-variant text-on-surface-variant hover:border-primary'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Care Difficulty */}
            <div>
              <h3 className="font-body-md text-sm font-semibold text-on-background mb-3">Care Difficulty</h3>
              <div className="space-y-2.5">
                {[
                  { level: 'Easy', count: 1 },
                  { level: 'Moderate', count: 2 },
                  { level: 'Advanced', count: 3 }
                ].map(({ level, count }) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedDifficulties.includes(level)}
                      onChange={() => toggleDifficulty(level)}
                      className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary bg-surface"
                    />
                    <div className="flex items-center gap-2 flex-grow">
                      <span className="text-sm text-on-surface-variant group-hover:text-on-background transition-colors">
                        {level}
                      </span>
                      <div className="flex text-secondary opacity-80 ml-auto">
                        {Array.from({ length: count }).map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-[15px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            eco
                          </span>
                        ))}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="col-span-1 md:col-span-9">
          {filteredPlants.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-surface-container">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">filter_alt_off</span>
              <h3 className="font-title-lg text-lg text-on-surface font-semibold mb-1">No plants matched your criteria</h3>
              <p className="text-sm text-on-surface-variant mb-4">Try clearing some filters to see our full botanical lineup.</p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-container transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {filteredPlants.map((plant) => (
                <div
                  key={plant.id}
                  onClick={() => navigate(`/product/${plant.id}`)}
                  className="group cursor-pointer flex flex-col gap-3"
                >
                  <div className="relative aspect-[4/5] bg-surface-container overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={plant.name}
                      src={plant.image}
                    />

                    {/* Badge */}
                    {plant.badge && (
                      <div className="absolute top-3 left-3 bg-secondary-fixed/90 text-on-secondary-fixed font-label-md text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-sm flex items-center gap-1">
                        {plant.petFriendly && <span className="material-symbols-outlined text-[13px]">pets</span>}
                        {plant.badge}
                      </div>
                    )}

                    {/* Quick Add To Cart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(plant);
                      }}
                      title="Add to Cart"
                      className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white transform translate-y-2 group-hover:translate-y-0"
                    >
                      <span className="material-symbols-outlined text-xl">shopping_bag</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-1 px-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-title-lg text-base font-semibold text-on-background group-hover:text-primary transition-colors">
                        {plant.name}
                      </h3>
                      <div className="flex text-secondary opacity-70 ml-2" title={`Care: ${plant.difficulty}`}>
                        {Array.from({ length: plant.difficultyRating }).map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-[16px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            eco
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-on-surface-variant italic">{plant.scientificName}</p>
                    <div className="flex justify-between items-baseline mt-1">
                      <p className="font-body-lg text-base text-on-background font-semibold">${plant.price.toFixed(2)}</p>
                      <span className="text-[11px] text-secondary font-medium">{plant.lightLevel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
