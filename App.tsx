import React, { useState, useCallback } from 'react';
import type { SuperconductorData } from './types';
import { getSuperconductorInfo } from './services/geminiService';
import InputForm from './components/InputForm';
import SuperconductorCard from './components/SuperconductorCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Welcome from './components/Welcome';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [superconductorName, setSuperconductorName] = useState<string>('');
  const [data, setData] = useState<SuperconductorData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async (name: string) => {
    if (!name.trim() || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await getSuperconductorInfo(name);
      setData(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console and ensure your API key is configured correctly.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);


  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    performSearch(superconductorName);
  }, [superconductorName, performSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuperconductorName(event.target.value);
  };

  const handleExampleClick = useCallback((name: string) => {
    const materialName = name.split('(')[0].trim();
    setSuperconductorName(materialName);
    // Use a timeout to allow the state to update before triggering the search
    setTimeout(() => performSearch(materialName), 0);
  }, [performSearch]);

  const handleClear = () => {
    setData(null);
    setError(null);
    setSuperconductorName('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-700/[0.2] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-cyan-900/30 to-transparent -z-10"></div>
      
      <main className="flex-grow flex flex-col items-center p-4 z-10">
        <Header />
        
        <div className="w-full max-w-2xl mx-auto mt-8">
          <InputForm
            value={superconductorName}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
        
        <div className="w-full max-w-4xl mx-auto mt-8 flex-grow flex flex-col items-center justify-start">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {data && <SuperconductorCard data={data} />}
          {!isLoading && !error && !data && <Welcome onExampleClick={handleExampleClick} />}
        </div>
        
        {(data || error) && !isLoading && (
            <div className="mt-8 animate-fade-in">
                 <button 
                    onClick={handleClear}
                    className="bg-slate-700/50 text-slate-300 hover:bg-slate-700/80 hover:text-white transition-all duration-200 px-6 py-2 rounded-full"
                 >
                    Search Another Material
                 </button>
            </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default App;