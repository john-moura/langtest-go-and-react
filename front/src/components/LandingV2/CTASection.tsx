import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gray-950">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-gray-950 to-gray-950 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-2xl overflow-hidden relative text-center">
          
          {/* Corner accents */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/30 blur-[60px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/30 blur-[60px] rounded-full"></div>

          <h2 className="relative text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to ace your Exam?
          </h2>
          <p className="relative text-lg text-gray-400 mb-10 max-w-xl mx-auto font-light">
            Stop guessing and start preparing with the most accurate B1 test simulator available. Sign up in seconds.
          </p>
          
          <div className="relative flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#/register"
              className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 rounded-xl hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
            >
              Start for Free
            </a>
            <a
              href="#/login"
              className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-gray-300 transition-all duration-200 hover:text-white"
            >
              Sign In Instead
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
