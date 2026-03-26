import React from 'react';

const testimonials = [
  {
    name: 'Ana García',
    exam: 'Goethe-Zertifikat B1',
    text: "The mock exams on Langtest were exactly like the real thing. I felt completely prepared and passed on my first try with a Gut rating!",
    score: 'Passed with 89%',
    image: 'https://i.pravatar.cc/150?u=ana'
  },
  {
    name: 'Carlos Mendez',
    exam: 'Telc Deutsch B1',
    text: "The vocabulary lists and instant grading saved me months of study time. Knowing exactly where my weaknesses were helped me focus my efforts.",
    score: 'Passed with 92%',
    image: 'https://i.pravatar.cc/150?u=carlos'
  },
  {
    name: 'Elena Silva',
    exam: 'Goethe-Zertifikat B1',
    text: "I was terrified of the speaking and reading parts, but practicing here made it routine. The interface is beautiful and encourages daily practice.",
    score: 'Passed with 95%',
    image: 'https://i.pravatar.cc/150?u=elena'
  }
];

const TestimonialsSlider: React.FC = () => {
  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Success Stories
          </h2>
          <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
            Join thousands of learners who have already achieved their B1 certification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-md hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full border-2 border-indigo-500/50 object-cover"
                />
                <div>
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-xs text-indigo-400 uppercase tracking-widest mt-1 font-semibold">{testimonial.exam}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="inline-block px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                {testimonial.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
