import React from 'react';
import type { SuperconductorData, SuperconductorType } from '../types';

const TypeBadge: React.FC<{ type: SuperconductorType }> = ({ type }) => {
  const typeColors: Record<SuperconductorType, string> = {
    'Type I': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    'Type II': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'High-Temperature': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    'Unconventional': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    'Unknown': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  };

  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${typeColors[type] || typeColors['Unknown']}`}>
      {type}
    </span>
  );
};

const InfoItem: React.FC<{ icon: React.ReactElement; label: string; value: string | number | null }> = ({ icon, label, value }) => (
  value ? (
    <div className="flex items-start space-x-3">
      <div className="text-cyan-400 mt-1">{icon}</div>
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-lg font-semibold text-slate-200">{value}</p>
      </div>
    </div>
  ) : null
);


const SuperconductorCard: React.FC<{ data: SuperconductorData }> = ({ data }) => {
  return (
    <div className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-in">
      
      {/* Header Section */}
      <div className="animate-enter" style={{ animationDelay: '100ms' }}>
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{data.name}</h2>
          <div className="flex-shrink-0 mt-1 md:mt-0">
            <TypeBadge type={data.type} />
          </div>
        </div>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">{data.description}</p>
      </div>
      
      {/* Main Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Critical Temperature */}
        <div className="animate-enter md:col-span-1 bg-slate-900/50 p-6 rounded-xl flex flex-col items-center justify-center text-center border border-slate-700" style={{ animationDelay: '200ms' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-sm text-slate-400">Critical Temperature</p>
            {data.criticalTemperatureKelvin !== null ? (
                <>
                    <p className="text-4xl font-bold text-white my-1">{data.criticalTemperatureKelvin.toFixed(2)} K</p>
                    <p className="text-lg text-slate-300">{data.criticalTemperatureCelsius?.toFixed(2)} °C</p>
                </>
            ) : (
                <p className="text-2xl font-bold text-slate-400 my-1">N/A</p>
            )}
        </div>
        
        {/* Other Info */}
        <div className="animate-enter md:col-span-2 bg-slate-900/50 p-6 rounded-xl border border-slate-700 space-y-4" style={{ animationDelay: '300ms' }}>
           <InfoItem 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
            label="Crystal Structure"
            value={data.crystalStructure}
           />
           <InfoItem 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            label="Year of Discovery"
            value={data.yearOfDiscovery}
           />
           <InfoItem 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            label="Discovered By"
            value={data.discoveredBy}
           />
        </div>
      </div>

      {/* Applications Section */}
      {data.applications && data.applications.length > 0 && (
        <div className="animate-enter" style={{ animationDelay: '400ms' }}>
          <h3 className="text-xl font-semibold text-white mb-4">Potential Applications</h3>
          <div className="flex flex-wrap gap-3">
            {data.applications.map((app, index) => (
              <span key={index} className="bg-slate-700/50 text-cyan-200 text-sm font-medium px-4 py-2 rounded-lg border border-slate-600 transition-transform duration-200 hover:scale-105 hover:bg-slate-700/80">
                {app}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperconductorCard;