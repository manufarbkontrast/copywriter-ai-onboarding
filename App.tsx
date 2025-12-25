import React, { useState, useCallback } from 'react';
import { OnboardingData, AnalysisResult, AppStep, ContactInfo, ProductType } from './types';
import { INITIAL_DATA, INITIAL_CONTACT_DATA } from './constants';
import OnboardingForm from './components/OnboardingForm';
import ThankYouView from './components/ThankYouView';
import ContactForm from './components/ContactForm';
import ProductPage from './components/ProductPage';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.PRODUCTS);
  const [formData, setFormData] = useState<OnboardingData>(INITIAL_DATA);
  const [contactData, setContactData] = useState<ContactInfo>(INITIAL_CONTACT_DATA);
  const [error, setError] = useState<string | null>(null);

  const startOnboarding = useCallback((product: ProductType) => {
    setFormData({ ...INITIAL_DATA, selected_product: product });
    setStep(AppStep.CONTACT);
    window.scrollTo(0, 0);
  }, []);

  const handleContactSubmit = useCallback(() => {
    setStep(AppStep.FORM);
    window.scrollTo(0, 0);
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

  // Render Product Page
  if (step === AppStep.PRODUCTS) {
    return (
      <ErrorBoundary>
        <ProductPage onStartOnboarding={startOnboarding} />
      </ErrorBoundary>
    );
  }

  // Render Thank You
  if (step === AppStep.RESULT) {
    return (
      <ErrorBoundary>
        <ThankYouView 
          formData={formData}
          contactData={contactData}
          onReset={resetApp} 
        />
      </ErrorBoundary>
    );
  }

  // Render Form Header used for both Contact and Onboarding steps
  const renderHeader = (title: string) => (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
            <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                <span className="font-medium text-black tracking-wide flex items-center gap-2 text-lg">
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                    {title}
                </span>
                <button onClick={resetApp} className="text-xs text-gray-500 hover:text-black transition-colors duration-200 tracking-wide uppercase">Abbrechen</button>
            </div>
      </header>
  );

  if (step === AppStep.CONTACT) {
      return (
          <ErrorBoundary>
            <div className="min-h-screen bg-white flex flex-col">
              {renderHeader('Kontaktdaten')}
              <ContactForm 
                data={contactData}
                onUpdate={setContactData}
                onNext={handleContactSubmit}
                onBack={() => setStep(AppStep.PRODUCTS)}
              />
          </div>
          </ErrorBoundary>
      )
  }

  // Render Onboarding Form
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white flex flex-col">
      {renderHeader('Onboarding')}
      
      {error && (
        <div className="max-w-3xl mx-auto w-full px-4 mt-6 animate-fade-in">
            <div className="bg-gray-100 text-black p-4 rounded-sm border border-gray-300">
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
    </ErrorBoundary>
  );
};

export default App;