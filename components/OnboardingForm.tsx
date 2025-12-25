import React, { useState, useEffect, useMemo } from 'react';
import { OnboardingData, QuestionConfig } from '../types';
import { QUESTIONS } from '../constants';
import StepIndicator from './StepIndicator';

interface Props {
  data: OnboardingData;
  onUpdate: (data: OnboardingData) => void;
  onSubmit: () => void;
}

const OnboardingForm: React.FC<Props> = ({ data, onUpdate, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Filter questions based on selected product
  const filteredQuestions = useMemo(() => {
    return QUESTIONS.filter(question => {
      // If question has productFilter, only show if product matches
      if (question.productFilter && question.productFilter.length > 0) {
        return question.productFilter.includes(data.selected_product);
      }
      // Otherwise show for all products
      return true;
    });
  }, [data.selected_product]);

  // Reset index when filtered questions change
  useEffect(() => {
    if (currentQuestionIndex >= filteredQuestions.length) {
      setCurrentQuestionIndex(0);
    }
  }, [filteredQuestions.length, currentQuestionIndex]);

  // Scroll to top on question change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestionIndex]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === filteredQuestions.length - 1;
  const currentCategory = currentQuestion?.category.split('(')[0].trim() || '';

  const handleNext = () => {
    if (isLastQuestion) {
      onSubmit();
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => {
          const next = prev + 1;
          return next < filteredQuestions.length ? next : prev;
        });
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({
      ...data,
      [currentQuestion.id]: e.target.value,
    });
  };

  const handleOptionSelect = (option: string) => {
    if (currentQuestion.multiple) {
      // Mehrfachauswahl: Array verwenden
      const currentArray = Array.isArray(data[currentQuestion.id]) 
        ? (data[currentQuestion.id] as string[])
        : (data[currentQuestion.id] ? [data[currentQuestion.id] as string] : []);
      
      const newArray = currentArray.includes(option)
        ? currentArray.filter(item => item !== option) // Entfernen wenn bereits ausgewählt
        : [...currentArray, option]; // Hinzufügen wenn nicht ausgewählt
      
      onUpdate({
        ...data,
        [currentQuestion.id]: newArray,
      });
    } else {
      // Einfachauswahl: String verwenden
      onUpdate({
        ...data,
        [currentQuestion.id]: option,
      });
    }
  };

  const currentValue = data[currentQuestion.id];
  const isMultiple = currentQuestion.multiple;
  const selectedValues = isMultiple 
    ? (Array.isArray(currentValue) ? currentValue : [])
    : [];

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <StepIndicator 
        currentStep={currentQuestionIndex} 
        totalSteps={filteredQuestions.length} 
        categoryName={currentCategory}
      />

      <div 
        className={`bg-white border border-gray-200 rounded-sm p-6 sm:p-10 transition-opacity duration-300 transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      >
        <div className="mb-4">
           <span className="text-xs text-gray-600 font-medium uppercase tracking-widest">{currentQuestion.goal}</span>
        </div>
        
        <h3 className="text-2xl sm:text-3xl font-medium text-black mb-8 leading-tight">
          {currentQuestion.label}
        </h3>
        
        {currentQuestion.context && (
          <div className="bg-gray-50 border-l-2 border-black p-4 mb-6">
            <p className="text-sm text-gray-700 font-light">
               <span className="font-normal">Hinweis:</span> {currentQuestion.context}
            </p>
          </div>
        )}

        {currentQuestion.type === 'multiple-choice' && currentQuestion.options ? (
          <>
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => {
                const isSelected = isMultiple
                  ? selectedValues.includes(option)
                  : currentValue === option;
                
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left p-4 border-2 rounded-sm transition-all duration-200 ${
                      isSelected
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white text-black hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isMultiple && (
                        <div className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'border-white bg-white'
                            : 'border-gray-400 bg-white'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      )}
                      <span className="font-light">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            {/* Bedingtes Textfeld für "Andere Branche" */}
            {currentQuestion.id === 'hero_identity' && 
             !isMultiple && currentValue === 'Andere Branche' && (
              <div className="mb-6 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bitte geben Sie Ihre Branche an:
                </label>
                <input
                  type="text"
                  value={typeof data.hero_identity === 'string' && data.hero_identity.startsWith('Andere Branche: ') 
                    ? data.hero_identity.replace('Andere Branche: ', '') 
                    : ''}
                  onChange={(e) => {
                    const otherValue = e.target.value;
                    onUpdate({
                      ...data,
                      hero_identity: otherValue ? `Andere Branche: ${otherValue}` : 'Andere Branche'
                    });
                  }}
                  placeholder="z.B. Gastronomie, Handwerk, etc."
                  className="w-full p-4 border-2 border-gray-300 rounded-sm focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 text-black bg-white"
                  autoFocus
                />
              </div>
            )}
          </>
        ) : (
          <textarea
            value={currentValue}
            onChange={handleChange}
            placeholder={currentQuestion.placeholder || "Ihre Antwort..."}
            className="w-full h-40 p-5 border-2 border-gray-400 rounded-sm focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 resize-none text-black leading-relaxed bg-white shadow-sm"
            autoFocus
          />
        )}

        <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 text-sm font-light tracking-wide transition-colors duration-200 ${
              currentQuestionIndex === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Zurück
          </button>

          <button
            onClick={handleNext}
            disabled={
              isMultiple
                ? !selectedValues || selectedValues.length < 1
                : !currentValue || (typeof currentValue === 'string' && currentValue.length < 1) ||
                  (currentQuestion.id === 'hero_identity' && currentValue === 'Andere Branche' && 
                   (!data.hero_identity || typeof data.hero_identity === 'string' && !data.hero_identity.includes(':')))
            }
            className={`px-8 py-3 text-sm font-light text-white tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 uppercase ${
              (isMultiple
                ? !selectedValues || selectedValues.length < 1
                : !currentValue || (typeof currentValue === 'string' && currentValue.length < 1))
                ? 'bg-gray-300 cursor-not-allowed transform-none'
                : 'bg-black hover:bg-gray-800'
            }`}
          >
            {isLastQuestion ? 'Absenden' : 'Weiter'}
          </button>
        </div>
      </div>
      
      <div className="mt-6 text-center text-xs text-gray-400 tracking-wide">
        Frage {currentQuestionIndex + 1} von {filteredQuestions.length}
      </div>
    </div>
  );
};

export default OnboardingForm;