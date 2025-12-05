import React from 'react';

interface WelcomeProps {
    onExampleClick: (name: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onExampleClick }) => {
  const examples = ["YBa₂Cu₃O₇ (YBCO)", "Niobium-tin (Nb₃Sn)", "MgB₂", "Iron pnictides"];

  return (
    <div className="text-center p-8 bg-slate-800/20 rounded-lg animate-fade-in-slow">
      <h2 className="text-2xl font-bold text-white mb-4">Welcome to the Superconductor Identifier</h2>
      <p className="text-slate-400 max-w-2xl mx-auto mb-6">
        Enter the name of a superconductor material to get detailed information about its type, critical temperature, applications, and more, powered by the Gemini API.
      </p>
      <div className="text-slate-400">
        <p className="mb-3 font-semibold">Try one of these examples:</p>
        <div className="flex flex-wrap justify-center gap-3">
            {examples.map(ex => (
                <button 
                    key={ex} 
                    onClick={() => onExampleClick(ex)}
                    className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-full text-sm hover:bg-slate-700/80 hover:text-white transition-all duration-200 transform hover:-translate-y-0.5"
                >
                    {ex}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;