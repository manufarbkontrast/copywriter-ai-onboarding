import React from 'react';
import { ContactInfo } from '../types';

interface Props {
  data: ContactInfo;
  onUpdate: (data: ContactInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

const ContactForm: React.FC<Props> = ({ data, onUpdate, onNext, onBack }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ ...data, [name]: value });
  };

  const isFormValid = data.name.trim() !== '';

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-8">
      <div className="bg-white backdrop-blur-sm border border-black rounded-lg p-6 sm:p-10 animate-fade-in">
        <div className="mb-10 border-b-2 border-black pb-6">
          <h2 className="text-3xl font-light text-black tracking-wide mb-3">Kontaktdaten</h2>
          <p className="text-sm text-black font-light">Bitte gib zuerst deine Kontaktdaten ein.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black mb-3 uppercase tracking-wider">
              Firma / Name Kunde *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={data.name}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-white text-black placeholder-gray-700"
              placeholder="z.B. Acme GmbH oder Max Mustermann"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-black mb-3 uppercase tracking-wider">
              Adresse
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={data.address}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-white text-black placeholder-gray-700"
              placeholder="Musterstraße 1, 12345 Berlin"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-black mb-3 uppercase tracking-wider">
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={data.phone}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-white text-black placeholder-gray-700"
                placeholder="+49 123 456789"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-3 uppercase tracking-wider">
                E-Mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-white text-black placeholder-gray-700"
                placeholder="info@beispiel.de"
              />
            </div>
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-black mb-3 uppercase tracking-wider">
              Website
            </label>
            <input
              type="url"
              name="website"
              id="website"
              value={data.website}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-white text-black placeholder-gray-700"
              placeholder="https://www.meine-firma.de"
            />
          </div>

          <div>
            <label htmlFor="social_media" className="block text-sm font-medium text-black mb-3 uppercase tracking-wider">
              Social Media Links
            </label>
            <input
              type="text"
              name="social_media"
              id="social_media"
              value={data.social_media}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-black rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-white text-black placeholder-gray-700"
              placeholder="LinkedIn, Instagram, Facebook..."
            />
          </div>
        </div>

        <div className="flex justify-between mt-10 pt-6 border-t border-black">
          <button
            onClick={onBack}
            className="px-6 py-3 text-sm font-light bg-white border border-black text-black hover:bg-white transition-colors duration-200 tracking-wide"
          >
            Zurück
          </button>
          
          <button
            onClick={onNext}
            disabled={!isFormValid}
            className={`px-8 py-3 text-sm font-light tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 uppercase bg-white border border-black text-black ${
              !isFormValid
                ? 'cursor-not-allowed transform-none opacity-50'
                : 'hover:bg-white'
            }`}
          >
            Weiter zum Onboarding
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;