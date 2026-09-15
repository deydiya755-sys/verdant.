import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PLANTS } from '../../data/plants';
import { useCart } from '../../context/CartContext';

export default function PlantQuizPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [answers, setAnswers] = useState({
    light: null,
    watering: null,
    pet: null,
    experience: null
  });

  const selectOption = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(5); // Results screen
    }
  };

  const handleRestart = () => {
    setAnswers({ light: null, watering: null, pet: null, experience: null });
    setCurrentStep(1);
  };

  const isStepAnswered = () => {
    if (currentStep === 1) return answers.light !== null;
    if (currentStep === 2) return answers.watering !== null;
    if (currentStep === 3) return answers.pet !== null;
    if (currentStep === 4) return answers.experience !== null;
    return true;
  };

  // Compute matched plants based on answers
  const recommendedPlants = React.useMemo(() => {
    let matches = [...PLANTS];

    if (answers.pet === 'yes') {
      matches = matches.filter(p => p.petFriendly);
    }

    if (answers.light === 'low') {
      matches = matches.filter(p => p.lightLevel.toLowerCase().includes('low'));
    } else if (answers.light === 'direct') {
      matches = matches.filter(p => p.lightLevel.toLowerCase().includes('direct'));
    }

    if (matches.length < 3) {
      // Ensure at least 3 plants are always shown
      const remaining = PLANTS.filter(p => !matches.some(m => m.id === p.id));
      matches = [...matches, ...remaining].slice(0, 3);
    } else {
      matches = matches.slice(0, 3);
    }

    return matches;
  }, [answers]);

  const progressPercentage = (Math.min(currentStep, totalSteps) / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Top Navigation */}
      <header className="w-full fixed top-0 z-50 px-5 md:px-[60px] py-6 flex justify-between items-center backdrop-blur-md max-w-[1280px] left-1/2 -translate-x-1/2">
        <Link to="/" className="font-display-lg text-2xl font-semibold text-primary tracking-tight">
          Verdant
        </Link>
        <Link
          to="/"
          className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-container"
          title="Exit Quiz"
        >
          <span className="material-symbols-outlined">close</span>
        </Link>
      </header>

      <main className="flex-grow flex flex-col pt-28 pb-32 px-5 md:px-[60px] max-w-[1000px] mx-auto w-full relative">
        {currentStep <= totalSteps && (
          <div className="w-full max-w-xl mx-auto mb-12">
            <div className="flex justify-between text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="h-2 bg-surface-variant rounded-full overflow-hidden w-full">
              <div
                className="h-full bg-primary transition-all duration-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Light */}
        {currentStep === 1 && (
          <div className="flex flex-col items-center text-center animate-fadeIn">
            <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-on-surface font-semibold mb-10 max-w-2xl">
              How much light does your living space receive?
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {[
                { id: 'direct', icon: 'wb_sunny', title: 'Bright, Direct', desc: 'Right along an unobstructed sunny windowsill.' },
                { id: 'indirect', icon: 'brightness_5', title: 'Bright, Indirect', desc: 'Close to windows, but shielded from scorching sun.' },
                { id: 'low', icon: 'brightness_4', title: 'Low to Ambient', desc: 'Far from windows, north-facing or cozy shaded room.' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => selectOption('light', opt.id)}
                  className={`flex flex-col items-center justify-center p-8 rounded-2xl transition-all h-52 text-center cursor-pointer ${
                    answers.light === opt.id
                      ? 'border-2 border-primary bg-surface-container-low shadow-lg scale-102'
                      : 'border border-surface-container bg-surface-container-lowest hover:border-outline hover:bg-surface-container-low shadow-sm'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-4xl mb-4 text-secondary ${
                      answers.light === opt.id ? 'fill-icon text-primary' : ''
                    }`}
                  >
                    {opt.icon}
                  </span>
                  <span className="font-title-lg text-lg font-semibold mb-1.5">{opt.title}</span>
                  <span className="text-xs text-on-surface-variant leading-relaxed">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Watering */}
        {currentStep === 2 && (
          <div className="flex flex-col items-center text-center animate-fadeIn">
            <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-on-surface font-semibold mb-10 max-w-2xl">
              What does your watering cadence look like?
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {[
                { id: 'attentive', icon: 'water_drop', title: 'Attentive & Weekly', desc: 'I love tending to plants every weekend.' },
                { id: 'moderate', icon: 'opacity', title: 'Moderate / Every 2 Weeks', desc: 'I prefer steady, manageable moisture routines.' },
                { id: 'forgetful', icon: 'hourglass_bottom', title: 'Infrequent / Busy', desc: 'I travel often and need a resilient survivor.' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => selectOption('watering', opt.id)}
                  className={`flex flex-col items-center justify-center p-8 rounded-2xl transition-all h-52 text-center cursor-pointer ${
                    answers.watering === opt.id
                      ? 'border-2 border-primary bg-surface-container-low shadow-lg scale-102'
                      : 'border border-surface-container bg-surface-container-lowest hover:border-outline hover:bg-surface-container-low shadow-sm'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-4xl mb-4 text-secondary ${
                      answers.watering === opt.id ? 'fill-icon text-primary' : ''
                    }`}
                  >
                    {opt.icon}
                  </span>
                  <span className="font-title-lg text-lg font-semibold mb-1.5">{opt.title}</span>
                  <span className="text-xs text-on-surface-variant leading-relaxed">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Pets */}
        {currentStep === 3 && (
          <div className="flex flex-col items-center text-center animate-fadeIn">
            <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-on-surface font-semibold mb-10 max-w-2xl">
              Do four-legged friends share your sanctuary?
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              {[
                { id: 'yes', icon: 'pets', title: 'Yes, Curious Pets', desc: 'I require non-toxic, pet-safe certified greenery.' },
                { id: 'no', icon: 'home', title: 'No Pets / Kept Away', desc: 'Open to all botanical specimens and sculptural leaves.' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => selectOption('pet', opt.id)}
                  className={`flex flex-col items-center justify-center p-8 rounded-2xl transition-all h-52 text-center cursor-pointer ${
                    answers.pet === opt.id
                      ? 'border-2 border-primary bg-surface-container-low shadow-lg scale-102'
                      : 'border border-surface-container bg-surface-container-lowest hover:border-outline hover:bg-surface-container-low shadow-sm'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-4xl mb-4 text-secondary ${
                      answers.pet === opt.id ? 'fill-icon text-primary' : ''
                    }`}
                  >
                    {opt.icon}
                  </span>
                  <span className="font-title-lg text-lg font-semibold mb-1.5">{opt.title}</span>
                  <span className="text-xs text-on-surface-variant leading-relaxed">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Experience */}
        {currentStep === 4 && (
          <div className="flex flex-col items-center text-center animate-fadeIn">
            <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-on-surface font-semibold mb-10 max-w-2xl">
              How would you describe your plant experience?
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {[
                { id: 'beginner', icon: 'spa', title: 'Curious Beginner', desc: 'Starting my journey; need highly forgiving plants.' },
                { id: 'intermediate', icon: 'yard', title: 'Plant Enthusiast', desc: 'Comfortable repotting and monitoring humidity.' },
                { id: 'expert', icon: 'forest', title: 'Urban Botanist', desc: 'Experienced grower ready for collector rarities.' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => selectOption('experience', opt.id)}
                  className={`flex flex-col items-center justify-center p-8 rounded-2xl transition-all h-52 text-center cursor-pointer ${
                    answers.experience === opt.id
                      ? 'border-2 border-primary bg-surface-container-low shadow-lg scale-102'
                      : 'border border-surface-container bg-surface-container-lowest hover:border-outline hover:bg-surface-container-low shadow-sm'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-4xl mb-4 text-secondary ${
                      answers.experience === opt.id ? 'fill-icon text-primary' : ''
                    }`}
                  >
                    {opt.icon}
                  </span>
                  <span className="font-title-lg text-lg font-semibold mb-1.5">{opt.title}</span>
                  <span className="text-xs text-on-surface-variant leading-relaxed">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Results Screen */}
        {currentStep === 5 && (
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-secondary font-semibold block mb-2">
                Diagnostic Complete
              </span>
              <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-on-surface font-semibold mb-3">
                Your Perfect Botanical Matches
              </h1>
              <p className="text-on-surface-variant text-base max-w-2xl mx-auto">
                Based on your light conditions and lifestyle preferences, our horticulturists have matched you with these thriving companions:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {recommendedPlants.map((plant, index) => (
                <div
                  key={plant.id}
                  className="flex flex-col rounded-2xl overflow-hidden bg-surface-container-lowest border border-surface-container shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="aspect-[4/5] w-full bg-surface-variant relative overflow-hidden">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                      {index === 0 ? 'Top Match' : 'Recommended'}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-title-lg text-lg font-semibold text-on-surface">
                          {plant.name}
                        </h3>
                        <span className="font-bold text-primary text-base">${plant.price.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant italic mb-3">{plant.scientificName}</p>
                      <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2 mb-4">
                        {plant.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="bg-surface-container px-2.5 py-1 rounded-md text-[11px] font-medium text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">brightness_5</span>
                          {plant.lightLevel}
                        </span>
                        <span className="bg-surface-container px-2.5 py-1 rounded-md text-[11px] font-medium text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">water_drop</span>
                          {plant.watering}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/product/${plant.id}`)}
                        className="flex-1 py-3 px-3 border border-outline-variant text-on-surface rounded-xl text-xs font-semibold hover:border-primary hover:text-primary transition-colors text-center"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => addToCart(plant)}
                        className="flex-1 py-3 px-3 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm text-center"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 flex items-center gap-4">
              <button
                onClick={handleRestart}
                className="py-3 px-8 border border-secondary text-secondary rounded-xl text-xs font-semibold hover:bg-surface-container-low transition-colors"
              >
                Retake Quiz
              </button>
              <Link
                to="/shop"
                className="py-3 px-8 bg-secondary text-white rounded-xl text-xs font-semibold hover:bg-on-secondary-container transition-colors"
              >
                View Full Catalog
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Sticky Bottom Action */}
      {currentStep <= totalSteps && (
        <div className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md py-4 px-5 md:px-[60px] border-t border-surface-container-high z-40">
          <div className="max-w-[1000px] mx-auto flex justify-between items-center">
            <button
              disabled={currentStep === 1}
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              className="text-xs font-semibold text-on-surface-variant hover:text-on-surface disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Back
            </button>

            <button
              disabled={!isStepAnswered()}
              onClick={handleNext}
              className="py-3.5 px-8 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center gap-2"
            >
              <span>{currentStep === totalSteps ? 'See Matches' : 'Next Question'}</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
