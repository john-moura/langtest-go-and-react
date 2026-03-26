import React from 'react';

const features = [
  {
    title: 'Realistic Mock Exams',
    description: 'Practice with test formats identical to the official Goethe-Zertifikat and Telc B1 exams. Get comfortable with the real testing environment.',
    icon: (
      <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'from-blue-500/20 to-indigo-500/20',
    border: 'border-blue-500/30'
  },
  {
    title: 'Instant AI Grading',
    description: 'Submit your writing and reading tasks and receive immediate, detailed feedback on your performance, highlighting areas for improvement.',
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30'
  },
  {
    title: 'Targeted Vocabulary',
    description: 'Master the exact vocabulary lists mandated for B1 exams. Our spaced-repetition exercises ensure you remember words when it counts.',
    icon: (
      <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30'
  }
];

const FeaturesGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">pass</span>
          </h2>
          <p className="text-lg text-gray-400 font-light">
            Langtest is purpose-built to get you certified. We focus entirely on the format and requirements of Goethe and Telc exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Decorative blur behind grid */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className={`group relative p-8 rounded-2xl bg-gray-900 border ${feature.border} backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] z-10 flex flex-col items-start`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`}></div>
              
              <div className="relative mb-6 p-4 rounded-xl bg-gray-800 border border-gray-700 group-hover:bg-gray-800/80 transition-colors">
                {feature.icon}
              </div>
              <h3 className="relative text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="relative text-gray-400 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
