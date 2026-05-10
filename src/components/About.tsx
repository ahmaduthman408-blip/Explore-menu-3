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
    <section id="about" className="py-20 p-6 md:p-10 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="aspect-square rounded-2xl overflow-hidden relative z-10 shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1616406432452-07bc5938759d?q=80&w=800&auto=format&fit=crop" 
              alt="About Explore Menu" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2"
        >
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
            {siteStory}
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-6 bg-blue-50 p-6 rounded-xl border border-blue-100">
            <div>
              <h4 className="text-2xl font-black text-blue-900 mb-1">10k+</h4>
              <p className="text-xs text-blue-700 font-bold uppercase">Happy Customers</p>
            </div>
            <div>
              <h4 className="text-2xl font-black text-blue-900 mb-1">100%</h4>
              <p className="text-xs text-blue-700 font-bold uppercase">Authenticity</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
