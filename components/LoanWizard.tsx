import React, { useState } from 'react';
import { LoanApplicationData } from '../types';
import { StageOneView, StageTwoView } from './FormSections';
import { ChevronRight, ChevronLeft, Save, CheckCircle2 } from 'lucide-react';

interface Props {
  data: LoanApplicationData;
  onBackToDashboard: () => void;
}

const STEPS = [
  { id: 1, title: "Applicant & Loan", short: "Basics" },
  { id: 2, title: "Assessment & Docs", short: "Assessment" },
];

export const LoanWizard: React.FC<Props> = ({ data, onBackToDashboard }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LoanApplicationData>(data);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFieldUpdate = (section: keyof LoanApplicationData, field: string, value: string) => {
    setFormData(prev => {
      // Handle array fields if necessary, but mostly we are updating objects
      if (Array.isArray(prev[section])) {
        return prev; 
      }
      
      return {
        ...prev,
        [section]: {
          ...(prev[section] as object),
          [field]: value
        }
      };
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Simulate API call
    console.log("Submitting Data:", formData);
    setTimeout(() => {
      onBackToDashboard();
    }, 2500);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[50vh] animate-fade-in p-6">
        <div className="bg-emerald-100 p-6 rounded-full mb-6 shadow-sm">
          <CheckCircle2 size={64} className="text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Application Submitted</h2>
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm mt-6 w-full max-w-xs text-center">
          <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Application Reference</p>
          <p className="text-xl font-mono text-blue-600 font-bold mt-1">#LN-{Math.floor(1000 + Math.random() * 9000)}</p>
          <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-1/2 animate-pulse"></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Forwarding to Credit Manager...</p>
        </div>
      </div>
    );
  }

  // Calculate progress percentage
  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Stepper Header */}
      <div className="bg-white border-b border-gray-200 pt-4 pb-0 px-4 sticky top-14 z-20 shadow-sm">
        <div className="flex justify-between items-center mb-6 relative max-w-xs mx-auto">
          {/* Progress Bar Background */}
          <div className="absolute top-4 left-0 w-full h-[2px] bg-slate-100 -z-0"></div>
          {/* Active Progress Bar */}
          <div 
            className="absolute top-4 left-0 h-[2px] bg-blue-600 transition-all duration-500 -z-0"
            style={{ width: `${progress}%` }}
          ></div>

          {STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2
                  ${currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-110' 
                    : 'bg-white border-slate-200 text-slate-400'}`}
              >
                {step.id}
              </div>
              <span className={`text-[10px] mt-1 font-medium transition-colors duration-300 ${currentStep >= step.id ? 'text-blue-700' : 'text-slate-400'}`}>
                {step.short}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-end pb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-800 leading-none">
              {STEPS[currentStep - 1].title}
            </h2>
            <p className="text-xs text-gray-500 mt-1">Step {currentStep} of {STEPS.length}</p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        <div className="transition-opacity duration-300 animate-fade-in">
          {currentStep === 1 && (
            <StageOneView 
              data={formData} 
              onUpdate={handleFieldUpdate} 
            />
          )}
          {currentStep === 2 && (
            <StageTwoView 
              data={formData} 
              onUpdate={handleFieldUpdate} 
            />
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30">
        <div className="max-w-md mx-auto flex gap-3">
          <button 
            onClick={handlePrev} 
            disabled={currentStep === 1}
            className="flex-1 py-3.5 px-4 rounded-xl border border-slate-300 text-slate-600 font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={20} /> Back
          </button>
          
          {currentStep === STEPS.length ? (
            <button 
              onClick={handleSubmit}
              className="flex-[2] py-3.5 px-4 rounded-xl bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Save size={20} /> Complete
            </button>
          ) : (
             <button 
              onClick={handleNext}
              className="flex-[2] py-3.5 px-4 rounded-xl bg-blue-900 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-800 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              Next <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};