import React from 'react';

interface Props {
  currentStep: number;
  totalSteps: number;
  categoryName: string;
}

const StepIndicator: React.FC<Props> = ({ currentStep, totalSteps, categoryName }) => {
  const percentage = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-end mb-3">
        <div>
          <span className="text-xs font-light inline-block py-1 px-2 uppercase tracking-widest text-gray-400 border border-gray-700 rounded">
            Fortschritt
          </span>
        </div>
        <div className="text-right">
          <span className="text-sm font-light inline-block text-white">
            {percentage}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-0.5 mb-6 text-xs flex bg-gray-800">
        <div
          style={{ width: `${percentage}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white transition-all duration-500 ease-out"
        ></div>
      </div>
      <h2 className="text-2xl font-light text-white tracking-wide">{categoryName}</h2>
    </div>
  );
};

export default StepIndicator;