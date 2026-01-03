import React, { useState, useCallback, useEffect } from 'react';
import { OnboardingData, AnalysisResult, AppStep, ContactInfo, ProductType } from './types';
import { INITIAL_DATA, INITIAL_CONTACT_DATA } from './constants';
import OnboardingForm from './components/OnboardingForm';
import ThankYouView from './components/ThankYouView';
import ContactForm from './components/ContactForm';
import ProductPage from './components/ProductPage';
import ErrorBoundary from './components/ErrorBoundary';
import TargetCursor from './components/TargetCursor';
import LiquidEther from './components/LiquidEther';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.PRODUCTS);
  const [formData, setFormData] = useState<OnboardingData>(INITIAL_DATA);
  const [contactData, setContactData] = useState<ContactInfo>(INITIAL_CONTACT_DATA);
  const [error, setError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayStep, setDisplayStep] = useState<AppStep>(AppStep.PRODUCTS);

  // Smooth transition between steps
  useEffect(() => {
    if (step !== displayStep) {
      setIsTransitioning(true);
      const fadeOutTimer = setTimeout(() => {
        setDisplayStep(step);
        const fadeInTimer = setTimeout(() => {
          setIsTransitioning(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
        return () => clearTimeout(fadeInTimer);
      }, 150);
      return () => clearTimeout(fadeOutTimer);
    }
  }, [step, displayStep]);

  const startOnboarding = useCallback((product: ProductType) => {
    setFormData({ ...INITIAL_DATA, selected_product: product });
    setStep(AppStep.CONTACT);
  }, []);

  const handleContactSubmit = useCallback(() => {
    setStep(AppStep.FORM);
  }, []);

  const handleFormSubmit = useCallback(() => {
    setError(null);
    setStep(AppStep.RESULT);
  }, []);

  const resetApp = useCallback(() => {
    setFormData({ ...INITIAL_DATA, selected_product: formData.selected_product });
    setContactData(INITIAL_CONTACT_DATA);
    setStep(AppStep.PRODUCTS);
  }, [formData.selected_product]);

  // Render Form Header used for both Contact and Onboarding steps
  const renderHeader = (title: string) => (
      <header className="bg-[#1a1a1a] bg-opacity-95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-20">
            <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                <span className="font-light text-white tracking-wide flex items-center gap-2 text-lg">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    {title}
                </span>
                <button onClick={resetApp} className="text-xs text-gray-400 hover:text-white transition-colors duration-200 tracking-wide uppercase">Abbrechen</button>
            </div>
      </header>
  );

  return (
    <ErrorBoundary>
      <TargetCursor />
      <LiquidEther />
      <div className="min-h-screen bg-[#1a1a1a] relative">
        {displayStep === AppStep.PRODUCTS && (
          <div 
            className="absolute inset-0 page-transition"
            style={{ 
              opacity: isTransitioning && step !== AppStep.PRODUCTS ? 0 : 1,
              pointerEvents: displayStep !== AppStep.PRODUCTS ? 'none' : 'auto',
              transition: 'opacity 200ms ease-in-out'
            }}
          >
            <ProductPage onStartOnboarding={startOnboarding} />
          </div>
        )}

        {displayStep === AppStep.CONTACT && (
          <div 
            className="absolute inset-0 min-h-screen bg-[#1a1a1a] flex flex-col page-transition"
            style={{ 
              opacity: isTransitioning && step !== AppStep.CONTACT ? 0 : 1,
              pointerEvents: displayStep !== AppStep.CONTACT ? 'none' : 'auto',
              transition: 'opacity 200ms ease-in-out'
            }}
          >
            {renderHeader('Kontaktdaten')}
            <ContactForm 
              data={contactData}
              onUpdate={setContactData}
              onNext={handleContactSubmit}
              onBack={() => setStep(AppStep.PRODUCTS)}
            />
          </div>
        )}

        {displayStep === AppStep.FORM && (
          <div 
            className="absolute inset-0 min-h-screen bg-[#1a1a1a] flex flex-col page-transition"
            style={{ 
              opacity: isTransitioning && step !== AppStep.FORM ? 0 : 1,
              pointerEvents: displayStep !== AppStep.FORM ? 'none' : 'auto',
              transition: 'opacity 200ms ease-in-out'
            }}
          >
            {renderHeader('Onboarding')}
            
            {error && (
              <div className="max-w-3xl mx-auto w-full px-4 mt-6 animate-fade-in">
                  <div className="bg-gray-900 bg-opacity-50 border border-gray-700 text-white p-4 rounded-lg">
                      {error}
                  </div>
              </div>
            )}
            
            <OnboardingForm 
              data={formData} 
              onUpdate={setFormData} 
              onSubmit={handleFormSubmit} 
            />
          </div>
        )}

        {displayStep === AppStep.RESULT && (
          <div 
            className="absolute inset-0 page-transition"
            style={{ 
              opacity: isTransitioning && step !== AppStep.RESULT ? 0 : 1,
              pointerEvents: displayStep !== AppStep.RESULT ? 'none' : 'auto',
              transition: 'opacity 200ms ease-in-out'
            }}
          >
            <ThankYouView 
              formData={formData}
              contactData={contactData}
              onReset={resetApp} 
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;