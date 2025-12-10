
import React, { useState } from 'react';
import { processLoanEntry } from './services/geminiService';
import { LoanApplicationData } from './types';
import { Dashboard } from './components/Dashboard';
import { LoanWizard } from './components/LoanWizard';
import { VoiceRecorder } from './components/VoiceRecorder';
import { INTERVIEW_QUESTIONS_STRUCTURED } from './constants';
import { Send, Menu, Bell, Mic, FileText, ChevronDown } from 'lucide-react';

type ViewState = 'dashboard' | 'intake' | 'wizard';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [data, setData] = useState<LoanApplicationData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [manualText, setManualText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const startNewApplication = () => {
    setData(null);
    setManualText('');
    setError(null);
    setView('intake');
  };

  const handleAudioComplete = async (blob: Blob) => {
    setIsProcessing(true);
    setError(null);
    try {
      const result = await processLoanEntry(blob);
      setData(result);
      setView('wizard');
    } catch (err) {
      console.error(err);
      setError("Failed to process audio. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextSubmit = async () => {
    if (!manualText.trim()) return;
    setIsProcessing(true);
    setError(null);
    try {
      const result = await processLoanEntry(manualText);
      setData(result);
      setView('wizard');
    } catch (err) {
      console.error(err);
      setError("Failed to process text. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Navigation Bar */}
      <header className="bg-blue-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu size={20} className="text-blue-200" />
            <span className="font-bold tracking-tight">FinCorp Field Agent</span>
          </div>
          <div className="relative">
            <Bell size={20} className="text-blue-200" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-md mx-auto w-full">
        
        {/* VIEW: DASHBOARD */}
        {view === 'dashboard' && (
          <div className="p-4">
             <div className="mb-6">
               <h1 className="text-2xl font-bold text-slate-800">Good Morning, Alex</h1>
               <p className="text-slate-500 text-sm">You have 3 site visits scheduled today.</p>
             </div>
             <Dashboard onNewApplication={startNewApplication} />
          </div>
        )}

        {/* VIEW: INTAKE (Voice/Text) */}
        {view === 'intake' && (
          <div className="flex flex-col h-[calc(100vh-3.5rem)]">
            <div className="p-4 pb-0 bg-white border-b border-slate-100 z-10">
              <button onClick={() => setView('dashboard')} className="text-sm text-slate-500 hover:text-blue-600 mb-2 flex items-center gap-1">← Back to Dashboard</button>
              <h2 className="text-xl font-bold text-slate-800">New Application</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              
              {/* Recorder Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 flex flex-col items-center justify-center sticky top-0 z-0">
                 <VoiceRecorder onRecordingComplete={handleAudioComplete} isProcessing={isProcessing} />
                 
                 {isProcessing && (
                   <div className="mt-4 text-center animate-pulse">
                     <div className="text-blue-600 font-semibold text-sm">Processing Loan Data...</div>
                     <div className="text-xs text-slate-400">Translating & Extracting Details</div>
                   </div>
                 )}
              </div>

              {/* Interview Script */}
              {!isProcessing && (
                <div className="mb-8 animate-fade-in">
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <FileText size={16} className="text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Field Interview Guide</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {INTERVIEW_QUESTIONS_STRUCTURED.map((section, idx) => (
                      <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center">
                          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{section.category}</span>
                        </div>
                        <div className="p-3">
                          <ul className="space-y-2">
                            {section.questions.map((q, qIdx) => (
                              <li key={qIdx} className="flex gap-3 text-sm text-slate-600">
                                <span className="text-blue-400 font-bold">•</span>
                                {q}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual Entry */}
              {!isProcessing && (
                <div className="bg-slate-100 rounded-xl p-4 border border-slate-200 mb-20">
                   <div className="flex items-center justify-between mb-2">
                     <div className="text-slate-700 font-medium text-sm flex items-center gap-2">
                       <Mic size={14} className="text-slate-400" />
                       Or type details manually
                     </div>
                   </div>
                   <div className="relative">
                     <textarea
                       className="w-full h-20 p-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none bg-white"
                       placeholder="Enter details here..."
                       value={manualText}
                       onChange={(e) => setManualText(e.target.value)}
                     />
                     <button
                       onClick={handleTextSubmit}
                       disabled={!manualText.trim()}
                       className="absolute bottom-2 right-2 bg-blue-600 text-white p-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                     >
                       <Send size={14} />
                     </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW: WIZARD (Stages) */}
        {view === 'wizard' && data && (
          <LoanWizard 
            data={data} 
            onBackToDashboard={() => setView('dashboard')} 
          />
        )}

        {/* Error Notification */}
        {error && (
          <div className="fixed top-16 left-0 w-full px-4 z-50">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm shadow-md flex justify-between items-center">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="font-bold text-lg leading-none">&times;</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
