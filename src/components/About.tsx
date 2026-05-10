import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function About() {
  const [siteName, setSiteName] = useState('EXPLORE MENU');
  const [siteStory, setSiteStory] = useState('EXPLORE MENU delivers premium, affordable fragrances tailored to your personality and lifestyle. We believe that luxury shouldn\'t be a privilege, but an accessible expression of who you are.\n\nFounded on the principles of authenticity and elegance, every bottle represents a journey. Whether you\'re heading to a boardroom meeting or a casual evening out, we have the perfect scent to boost your confidence and leave a lasting impression.');

  useEffect(() => {
    const loadConfig = () => {
      setSiteName(localStorage.getItem('siteName') || 'EXPLORE MENU');
      const story = localStorage.getItem('siteStory');
      if (story) setSiteStory(story);
    };
    loadConfig();
    window.addEventListener('settingsUpdated', loadConfig);
    return () => window.removeEventListener('settingsUpdated', loadConfig);
  }, []);

  return (
    <section id="about" className="py-20 p-6 md:p-12 lg:p-16 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold tracking-widest uppercase rounded-full mb-8">
            Our Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-8">
            The <span className="text-orange-500">{siteName}</span> Story
          </h2>
          <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed whitespace-pre-wrap max-w-3xl mx-auto font-medium">
            {siteStory}
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 bg-blue-50 p-8 md:p-10 rounded-2xl border border-blue-100 shadow-sm w-full mx-auto">
            <div className="flex flex-col items-center">
              <h4 className="text-3xl font-black text-blue-900 mb-2">10k+</h4>
              <p className="text-xs text-blue-700 font-bold uppercase tracking-wider">Happy Customers</p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-3xl font-black text-blue-900 mb-2">100%</h4>
              <p className="text-xs text-blue-700 font-bold uppercase tracking-wider">Authenticity</p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-3xl font-black text-blue-900 mb-2">24/7</h4>
              <p className="text-xs text-blue-700 font-bold uppercase tracking-wider">Premium Support</p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-3xl font-black text-blue-900 mb-2">5+</h4>
              <p className="text-xs text-blue-700 font-bold uppercase tracking-wider">Years of Excellence</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
