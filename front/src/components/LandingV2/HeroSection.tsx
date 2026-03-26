'use client';

import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gray-900 text-white min-h-[90vh] flex flex-col justify-center">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black pointer-events-none"></div>
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm shadow-sm transition-transform hover:scale-105">
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 opacity-75 animate-pulse"></span>
          New B1 Test Simulator Layout
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 mt-4">
          Master your German <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Goethe & Telc B1
          </span>
        </h1>
        
        <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl mb-10 leading-relaxed font-light">
          Experience highly realistic mock exams, get instant grading, and practice with focused vocabulary to achieve fluency.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="#/register"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-xl overflow-hidden hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-gray-900 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.7)]"
            role="button"
          >
             <span className="relative z-10 flex items-center">
               Start Testing Free
               <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
               </svg>
             </span>
          </a>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-300 transition-all duration-200 border border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 focus:ring-offset-gray-900"
          >
            Explore Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
