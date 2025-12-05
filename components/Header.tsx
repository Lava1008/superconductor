import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center w-full max-w-3xl mx-auto">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 tracking-tight [text-shadow:0_0_15px_rgba(78,177,219,0.4)]">
        Superconductor Identifier
      </h1>
      <p className="mt-4 text-lg text-slate-400">
        Unlock the properties of superconductive materials with AI.
      </p>
    </header>
  );
};

export default Header;