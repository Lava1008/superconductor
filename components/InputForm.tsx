
import React from 'react';

interface InputFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ value, onChange, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="e.g., YBCO or Niobium-tin"
          className="w-full px-5 py-4 pr-24 bg-slate-800 border border-slate-600 rounded-full text-lg text-gray-200 placeholder-slate-500 focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500 focus:outline-none transition-all duration-300 shadow-lg"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 bg-cyan-600 text-white rounded-full font-semibold text-base flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Analyze'
          )}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
