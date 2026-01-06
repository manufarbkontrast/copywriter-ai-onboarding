import React, { useState } from 'react';
import { OnboardingData, ContactInfo } from '../types';
import { sendToN8n } from '../services/n8nService';

interface Props {
  formData: OnboardingData;
  contactData: ContactInfo;
  onReset: () => void;
}

const ThankYouView: React.FC<Props> = ({ formData, contactData, onReset }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showAbout, setShowAbout] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('🚀 Starting submission...');
      console.log('📋 Contact Data:', contactData);
      console.log('📋 Form Data:', formData);
      
      const result = await sendToN8n(contactData, formData);

      if (result.success) {
        console.log('✅ Submission successful');
        setSubmitStatus('success');
      } else {
        console.error('❌ n8n Error:', result.error);
        setSubmitStatus('error');
      }
    } catch (error: any) {
      console.error('❌ Unexpected error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ff4500] p-4">
      <div className="max-w-2xl w-full text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-wide">
            Danke für deine Antworten
          </h1>
          <p className="text-base text-black font-light leading-relaxed">
            Deine Informationen wurden gespeichert.
          </p>
        </div>

        {submitStatus === 'idle' && (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-12 py-4 text-sm font-light tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 uppercase bg-[#ff4500] border border-black text-black ${
              isSubmitting
                ? 'cursor-not-allowed transform-none opacity-50'
                : 'hover:bg-[#ff4500]'
            }`}
          >
            {isSubmitting ? 'Wird gesendet...' : 'Absenden'}
          </button>
        )}

        {submitStatus === 'success' && (
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => setShowAbout(true)}
              className="px-8 py-3 text-xs font-light bg-[#ff4500] border border-black text-black hover:bg-[#ff4500] transition-colors duration-200 tracking-wide uppercase"
            >
              Lern uns kennen
            </button>
          </div>
        )}

        {/* About Modal */}
        {showAbout && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setShowAbout(false)}
          >
            <div 
              className="bg-black bg-opacity-95 backdrop-blur-sm border border-black max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-lg animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-black bg-opacity-95 backdrop-blur-sm border-b border-black px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-light text-black tracking-wide">Über FORCE4GOOD</h2>
                <button
                  onClick={() => setShowAbout(false)}
                  className="w-8 h-8 flex items-center justify-center bg-[#ff4500] border border-black text-black hover:bg-[#ff4500] transition-colors duration-200 text-2xl leading-none rounded"
                >
                  ×
                </button>
              </div>
              <div className="px-6 py-8 space-y-6">
                <div>
                  <h3 className="text-xl font-light text-black mb-4 tracking-wide">Unser Unternehmen</h3>
                  <p className="text-base text-black font-light leading-relaxed">
                    FORCE4GOOD ist ein KI-Unternehmen, das sich darauf spezialisiert hat, kleine und mittelständische Unternehmen (KMU) in der modernen KI-Welt zu befähigen. Wir verstehen die Herausforderungen, vor denen KMUs stehen, wenn es darum geht, innovative Technologien zu nutzen und gleichzeitig wettbewerbsfähig zu bleiben.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-light text-black mb-4 tracking-wide">Unser Ziel</h3>
                  <p className="text-base text-black font-light leading-relaxed mb-4">
                    Unser Ziel ist es, kleinen und mittelständischen Unternehmen den Zugang zu modernen KI-Lösungen zu ermöglichen, die bisher oft nur großen Konzernen vorbehalten waren. Wir glauben daran, dass jedes Unternehmen – unabhängig von seiner Größe – von den Vorteilen der künstlichen Intelligenz profitieren sollte.
                  </p>
                  <p className="text-base text-black font-light leading-relaxed">
                    Wir entwickeln maßgeschneiderte KI-Lösungen, die genau auf die Bedürfnisse und Anforderungen deines Unternehmens zugeschnitten sind. Dabei legen wir besonderen Wert auf:
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-base text-black font-light">
                    <li>Individuelle Lösungen statt Standard-Produkte</li>
                    <li>Einfache Integration in bestehende Prozesse</li>
                    <li>Transparente Kommunikation und Beratung</li>
                    <li>Nachhaltige und skalierbare Implementierung</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-light text-black mb-4 tracking-wide">Unsere Vision</h3>
                  <p className="text-base text-black font-light leading-relaxed">
                    Wir möchten eine Welt schaffen, in der jedes Unternehmen – ob groß oder klein – die Werkzeuge und das Wissen hat, um in der digitalen Zukunft erfolgreich zu sein. Durch die Befähigung von KMUs mit KI-Technologien tragen wir dazu bei, dass Innovation und Wachstum nicht nur den Großen vorbehalten sind, sondern allen Unternehmen offenstehen.
                  </p>
                </div>
                <div className="pt-4 border-t border-black">
                  <button
                    onClick={() => setShowAbout(false)}
                    className="px-8 py-3 text-xs font-light bg-[#ff4500] border border-black text-black hover:bg-[#ff4500] transition-colors duration-200 tracking-wide uppercase"
                  >
                    Schließen
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6">
            <div className="bg-[#ff4500] border border-black rounded-lg p-4 mb-4 text-left">
              <p className="text-xs text-black font-medium mb-1 uppercase tracking-wide">Fehler-Details:</p>
              <p className="text-sm text-black font-light">
                Öffne die Browser-Konsole (F12 → Console) für detaillierte Fehlerinformationen.
              </p>
            </div>
            <p className="text-sm text-black font-light mb-2">
              Fehler beim Senden. Bitte versuche es erneut.
            </p>
            <p className="text-xs text-black font-light mb-4">
              Stelle sicher, dass der n8n Workflow aktiviert ist.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-8 py-3 text-xs font-light tracking-wide uppercase transition-colors duration-200 bg-[#ff4500] border border-black text-black ${
                  isSubmitting
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-[#ff4500]'
                }`}
              >
                {isSubmitting ? 'Wird gesendet...' : 'Erneut versuchen'}
              </button>
              <button
                onClick={onReset}
                className="px-8 py-3 text-xs font-light bg-[#ff4500] border border-black text-black hover:bg-[#ff4500] transition-colors duration-200 tracking-wide uppercase"
              >
                Neu starten
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThankYouView;

