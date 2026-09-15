import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { PLANTS } from '../../data/plants';

export default function CareDashboardPage() {
  const { lastCompletedOrder } = useCart();
  const [activeCareModal, setActiveCareModal] = useState(null);
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  // Use completed order items, or fallback to the two plants shown in Google Stitch prototype
  const displayItems = (lastCompletedOrder && lastCompletedOrder.items.length > 0)
    ? lastCompletedOrder.items
    : [
        {
          plantId: 'ficus-elastica-burgundy',
          name: 'Ficus Elastica',
          scientificName: 'Burgundy Rubber Tree',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFNanNZZFzVG5YGjkcbr3DvxwOmgL_btDCHNGZKIBa7O4LI1mCv4-rKP7fw6cjJL1cdrtylAPDCUWFbtcj-jAbAraLjemfdxt2YL6sImLtr5OiiJPQ6FFymuqfZOByAmpNbn0DqOCkttIsrf5U6vlphPZ3qtd4_oLqXftjO_3ZsQTgFII_VjT3T5pZ5-18Hb4GlbbEqh1fU60b1tmxU6S82vn2s3pVNPeLgCYWTs_yrm4OfK8DpOnK',
          potSize: 'Medium (6")',
          planter: 'Terracotta Clay'
        },
        {
          plantId: 'golden-pothos',
          name: 'Golden Pothos',
          scientificName: 'Epipremnum Aureum',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBWB1SINQrM9M7N9f-3zcm1PGV1FUqTsQHOLQJe5N5Nw-K07qN7C59e1UgfIGLL3byq0nAX2XYyyVpecYJjPdvT3Nqgu5_xb3299fOOCKnMkroHDE01YTkznxSPqO-B997M1IJq6aToUHc1i5oW8kFhmooLwk4J5V8IBOr6A6wZ09tb2YhHGZpEiLb6zELaEzrGqiJE98ESY9BxxjjCMedk_nIYxsI3OKzDsjPFXOfYt-syp0v6jSv',
          potSize: 'Medium (6")',
          planter: 'Hanging Planter'
        }
      ];

  const orderId = lastCompletedOrder ? lastCompletedOrder.orderId : 'VRD-84920';
  const customerEmail = lastCompletedOrder?.customer?.email || 'eleanor.vane@sanctuary.com';

  return (
    <main className="pt-28 pb-24 px-5 md:px-[60px] max-w-[1280px] mx-auto w-full">
      {/* Order Confirmed Banner */}
      <section className="text-center max-w-2xl mx-auto mb-16 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-secondary/15 text-secondary mx-auto flex items-center justify-center mb-6 shadow-sm">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary block mb-1">
          Order Confirmed • #{orderId}
        </span>
        <h1 className="font-display-lg text-4xl sm:text-5xl text-on-surface font-semibold mb-4 leading-tight">
          Your Living Sanctuary Awaits
        </h1>
        <p className="font-body-lg text-base text-on-surface-variant leading-relaxed mb-4">
          Thank you for welcoming these botanical companions into your home. A full confirmation receipt has been sent to{' '}
          <strong className="text-on-surface">{customerEmail}</strong>.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full text-xs text-on-surface-variant">
          <span className="material-symbols-outlined text-base text-primary">local_shipping</span>
          Estimated Arrival: <strong className="text-on-surface">Wednesday, Oct 12</strong> (Insulated Climate Shipping)
        </div>
      </section>

      {/* Calendar & Reminders Banner */}
      <section className="bg-surface-container-low rounded-3xl p-6 md:p-8 mb-16 border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">calendar_month</span>
          </div>
          <div>
            <h3 className="font-title-lg text-base font-semibold text-on-surface">
              Smart Watering Reminders
            </h3>
            <p className="text-xs text-on-surface-variant">
              Sync watering schedules directly to your Apple or Google Calendar to avoid overwatering.
            </p>
          </div>
        </div>
        <button
          onClick={() => setRemindersEnabled(true)}
          className={`px-6 py-3 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
            remindersEnabled
              ? 'bg-secondary text-white'
              : 'bg-surface border border-outline-variant text-on-surface hover:border-primary hover:text-primary'
          }`}
        >
          {remindersEnabled ? '✓ Calendar Synced!' : 'Add to Calendar'}
        </button>
      </section>

      {/* Personalized Care Dashboard Section */}
      <section>
        <div className="mb-10 text-center sm:text-left">
          <h2 className="font-display-lg text-2xl sm:text-3xl text-on-surface font-semibold mb-2">
            Personalized Plant Care Dashboard
          </h2>
          <p className="text-sm text-on-surface-variant">
            Care regimens tailored specifically to the specimens arriving in your delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayItems.map((item, idx) => {
            const plantData = PLANTS.find(p => p.id === item.plantId) || PLANTS[idx % PLANTS.length];

            return (
              <article
                key={idx}
                className="flex flex-col sm:flex-row bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-surface-container"
              >
                <div className="w-full sm:w-2/5 h-64 sm:h-auto bg-surface relative overflow-hidden">
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    alt={item.name}
                    src={item.image}
                  />
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="inline-block px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                      Arriving Wed, Oct 12
                    </div>
                    <h3 className="font-title-lg text-xl text-on-surface font-semibold mb-0.5">
                      {item.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant italic mb-6">
                      {item.scientificName || plantData.scientificName}
                    </p>

                    <ul className="space-y-4 mb-6">
                      <li className="flex items-start gap-3">
                        <span
                          className="material-symbols-outlined text-secondary mt-0.5 text-xl"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          water_drop
                        </span>
                        <div>
                          <span className="block text-xs font-bold text-on-surface uppercase tracking-wider">
                            Watering Routine
                          </span>
                          <span className="block text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                            {plantData.wateringSchedule}
                          </span>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-secondary mt-0.5 text-xl">
                          light_mode
                        </span>
                        <div>
                          <span className="block text-xs font-bold text-on-surface uppercase tracking-wider">
                            Light Requirements
                          </span>
                          <span className="block text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                            {plantData.lightDescription}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setActiveCareModal(plantData)}
                    className="inline-flex items-center gap-1.5 text-secondary font-semibold text-xs hover:text-on-secondary-container transition-colors mt-2"
                  >
                    <span>View full botanical care guide</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Navigation Return Links */}
      <div className="mt-16 text-center flex justify-center gap-4">
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-container transition-colors shadow-md"
        >
          Explore More Houseplants
        </Link>
        <Link
          to="/"
          className="px-8 py-3.5 border border-outline-variant text-on-surface rounded-xl text-xs font-semibold hover:border-primary transition-colors"
        >
          Back to Homepage
        </Link>
      </div>

      {/* Modal Care Guide */}
      {activeCareModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveCareModal(null)}
        >
          <div
            className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-surface-container max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-secondary font-semibold">
                  Botanical Master Guide
                </span>
                <h3 className="font-display-lg text-2xl font-semibold text-on-surface mt-1">
                  {activeCareModal.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveCareModal(null)}
                className="p-1 rounded-full text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed">
              <div className="p-4 bg-surface-container-low rounded-xl">
                <h4 className="font-semibold text-on-surface mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-lg">water_drop</span>
                  Hydration & Soil
                </h4>
                <p className="text-xs">{activeCareModal.wateringSchedule}</p>
              </div>

              <div className="p-4 bg-surface-container-low rounded-xl">
                <h4 className="font-semibold text-on-surface mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-lg">light_mode</span>
                  Lighting Placement
                </h4>
                <p className="text-xs">{activeCareModal.lightDescription}</p>
              </div>

              <div className="p-4 bg-surface-container-low rounded-xl">
                <h4 className="font-semibold text-on-surface mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-lg">pets</span>
                  Toxicity & Safety
                </h4>
                <p className="text-xs">
                  {activeCareModal.petFriendly
                    ? 'Certified non-toxic and pet-safe for cats and dogs.'
                    : 'Contains insoluble calcium oxalate crystals; keep out of reach of nibbling pets.'}
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex justify-end">
                <button
                  onClick={() => setActiveCareModal(null)}
                  className="px-6 py-2.5 bg-secondary text-white text-xs font-semibold rounded-xl hover:bg-on-secondary-container transition-colors"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
