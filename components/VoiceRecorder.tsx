import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader2, Sparkles } from 'lucide-react';

interface Props {
  onRecordingComplete: (audioBlob: Blob) => void;
  isProcessing: boolean;
}

export const VoiceRecorder: React.FC<Props> = ({ onRecordingComplete, isProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      } else if (MediaRecorder.isTypeSupported('audio/mp4;codecs=mp4a')) {
        mimeType = 'audio/mp4;codecs=mp4a';
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        onRecordingComplete(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-100">
           <Sparkles size={12} /> AI Powered
        </div>
        <h3 className="text-xl font-bold text-slate-800">Voice Intake</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-[200px] mx-auto">
          Tap to start recording details in any language.
        </p>
      </div>

      <div className="relative">
        {/* Ripple effect */}
        {isRecording && (
          <>
            <div className="absolute top-0 left-0 w-full h-full rounded-full bg-red-400 opacity-20 animate-ping"></div>
            <div className="absolute -inset-4 rounded-full border border-red-100 opacity-50 animate-pulse"></div>
          </>
        )}
        
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`relative z-10 flex items-center justify-center w-24 h-24 rounded-full transition-all duration-300 shadow-xl ${
            isRecording 
              ? 'bg-red-500 scale-105' 
              : 'bg-gradient-to-br from-blue-600 to-blue-800 hover:shadow-2xl hover:scale-105'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isProcessing ? (
             <Loader2 className="text-white/80 animate-spin" size={32} />
          ) : isRecording ? (
             <Square className="text-white fill-current" size={28} />
          ) : (
             <Mic className="text-white" size={36} />
          )}
        </button>
      </div>

      <div className="h-8 mt-6">
        {isRecording ? (
          <div className="font-mono text-red-500 font-bold text-lg tracking-widest">
            {formatTime(recordingTime)}
          </div>
        ) : (
          <div className="text-xs text-slate-400 font-medium">
            {isProcessing ? 'Processing audio...' : 'Ready to record'}
          </div>
        )}
      </div>
    </div>
  );
};
