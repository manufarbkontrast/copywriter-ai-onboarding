import React from 'react';
import { AnalysisResult, ContactInfo } from '../types';

interface Props {
  result: AnalysisResult;
  contactData: ContactInfo;
  onReset: () => void;
}

const AnalysisView: React.FC<Props> = ({ result, contactData, onReset }) => {
  
  const copyToClipboard = () => {
    // Merge client info and analysis result for export
    const exportData = {
      client_profile: contactData,
      marketing_analysis: result
    };
    
    const text = JSON.stringify(exportData, null, 2);
    navigator.clipboard.writeText(text);
    alert("Vollständiges Profil (inkl. Kundendaten) in die Zwischenablage kopiert!");
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
           <h1 className="text-3xl font-light text-black tracking-wide">Marketing Profil</h1>
           <p className="text-sm text-black mt-2 font-light">Für: <span className="font-normal text-black">{contactData.name}</span></p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
            <button 
                onClick={copyToClipboard}
                className="flex-1 md:flex-none px-5 py-2.5 bg-black hover:bg-black text-white rounded-lg text-xs font-light tracking-wide transition-all duration-200 uppercase"
            >
                JSON Exportieren
            </button>
            <button 
                onClick={onReset}
                className="px-5 py-2.5 bg-black bg-opacity-50 border border-black text-black hover:bg-black hover:border-black rounded-lg text-xs font-light tracking-wide transition-all duration-200 uppercase"
            >
                Neu
            </button>
        </div>
      </div>

      {/* Client Data Summary */}
      <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-black rounded-lg p-6 mb-8">
        <h3 className="text-xs font-light text-black uppercase tracking-widest mb-5">Kundendaten</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
                <p className="text-xs text-black mb-1 font-light uppercase tracking-wider">Firma / Name</p>
                <p className="font-normal text-black">{contactData.name}</p>
            </div>
            <div>
                <p className="text-xs text-black mb-1 font-light uppercase tracking-wider">Webseite</p>
                <a href={contactData.website} target="_blank" rel="noopener noreferrer" className="text-black hover:underline truncate block font-light border-b border-transparent hover:border-white transition-all duration-200">
                    {contactData.website || "-"}
                </a>
            </div>
             <div>
                <p className="text-xs text-black mb-1 font-light uppercase tracking-wider">Kontakt</p>
                <p className="text-black font-light">{contactData.email}</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Summary Card */}
        <div className="col-span-1 md:col-span-2 bg-black rounded-lg p-8 text-white">
          <h3 className="text-black uppercase text-xs font-light tracking-widest mb-4">Zusammenfassung</h3>
          <p className="text-xl md:text-2xl font-light leading-relaxed">
            {result.summary}
          </p>
        </div>

        {/* Big Idea Hook */}
        <div className="col-span-1 md:col-span-2 bg-black bg-opacity-50 backdrop-blur-sm border-l-2 border-white rounded-lg p-8">
           <h3 className="text-black uppercase text-xs font-light tracking-widest mb-5">Big Idea Hook</h3>
           <p className="text-2xl font-light italic text-black leading-relaxed">
             "{result.big_idea_hook}"
           </p>
        </div>

        {/* Avatar Psychogram */}
        <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-black rounded-lg p-6">
          <h3 className="text-black uppercase text-xs font-light tracking-widest mb-5">Avatar Psychogramm (Vorher)</h3>
          <ul className="space-y-4">
            {result.avatar_psychogram.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-light mr-3 mt-0.5">!</span>
                <span className="text-black font-light leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Unique Mechanism */}
        <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-black rounded-lg p-6 flex flex-col justify-center">
           <h3 className="text-black uppercase text-xs font-light tracking-widest mb-5">Unique Mechanism</h3>
           <div className="text-center py-6 bg-black bg-opacity-50 rounded-lg border border-black">
             <span className="text-xl font-light text-black">{result.unique_mechanism_name}</span>
           </div>
        </div>

        {/* Story Arc */}
        <div className="col-span-1 md:col-span-2 bg-black bg-opacity-50 backdrop-blur-sm border border-black rounded-lg p-6">
           <h3 className="text-black uppercase text-xs font-light tracking-widest mb-6">Story Arc (Die Heldenreise)</h3>
           <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-5 bg-black bg-opacity-50 border border-black rounded-lg">
                <h4 className="font-light text-black text-sm mb-3 tracking-wide">1. Das Problem</h4>
                <p className="text-sm text-black font-light leading-relaxed">{result.story_arc.problem}</p>
              </div>
              <div className="p-5 bg-black bg-opacity-70 border border-black rounded-lg">
                <h4 className="font-light text-black text-sm mb-3 tracking-wide">2. Der falsche Weg</h4>
                <p className="text-sm text-black font-light leading-relaxed">{result.story_arc.failed_way}</p>
              </div>
              <div className="p-5 bg-black bg-opacity-50 border border-black rounded-lg">
                <h4 className="font-light text-black text-sm mb-3 tracking-wide">3. Die Entdeckung</h4>
                <p className="text-sm text-black font-light leading-relaxed">{result.story_arc.discovery}</p>
              </div>
              <div className="p-5 bg-black bg-opacity-70 border border-black rounded-lg">
                <h4 className="font-light text-black text-sm mb-3 tracking-wide">4. Das neue Leben</h4>
                <p className="text-sm text-black font-light leading-relaxed">{result.story_arc.new_life}</p>
              </div>
           </div>
        </div>

        {/* Emotional Triggers */}
        <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-black rounded-lg p-6">
          <h3 className="text-black uppercase text-xs font-light tracking-widest mb-5">Emotionale Trigger (Cialdini)</h3>
          <ul className="space-y-4">
             {result.emotional_triggers.map((item, idx) => (
               <li key={idx} className="flex items-start">
                 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-black mt-2 mr-3"></span>
                 <span className="text-black font-light leading-relaxed">{item}</span>
               </li>
             ))}
          </ul>
        </div>

        {/* Force4Good Notes */}
        <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-black rounded-lg p-6">
          <h3 className="text-black uppercase text-xs font-light tracking-widest mb-5">Notizen für Force4Good</h3>
          <p className="text-black font-light italic leading-relaxed">
            {result.copywriter_notes}
          </p>
        </div>

      </div>
    </div>
  );
};

export default AnalysisView;