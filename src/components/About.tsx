import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function About() {
  const [siteName, setSiteName] = useState('EXPLORE MENU');
  const [siteStory, setSiteStory] = useState(`EXPLORE MENU delivers premium, affordable fragrances tailored to your personality and lifestyle. We believe that luxury shouldn't be a privilege, but an accessible expression of who you are.

Founded on the principles of authenticity and elegance, every bottle represents a journey. Whether you're heading to a boardroom meeting or a casual evening out, we have the perfect scent to boost your confidence and leave a lasting impression.

Our journey began with a simple question: Why must high-quality, long-lasting fragrances come with an exorbitant price tag? We traversed the globe, meeting with master perfumers and sourcing the finest available raw ingredients—from the rich oud of the Middle East to the delicate florals of the French Riviera. The result is a curated collection that rivals the world's most luxurious perfume houses, but without the markup.

Every scent profile we offer is meticulously balanced. Our top notes provide an immediate burst of attraction, leading into complex and evocative middle notes, before settling into a deep, resonant base that lingers elegantly throughout the day. We don't just sell perfumes; we curate olfactory experiences that become an intimate part of your daily routine and personal brand.

Sustainability and ethical sourcing are at the core of our philosophy. We partner with local farmers and distillers who share our commitment to the environment and fair labor practices. Not only are you investing in a magnificent fragrance, but you are also supporting a global community of artisans dedicated to their craft.

As we continue to grow, our mission remains the same: To democratize luxury, offering you an exquisite array of scents that empower you to author your own story, one spray at a time.`);

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

          <div className="mt-24 space-y-16 text-left w-full mt-24 max-w-4xl mx-auto">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 md:p-12 shadow-sm">
              <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">The Art of Perfumery</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Creating the perfect scent requires more than just mixing oils—it's alchemy, art, and science combined. It takes months, sometimes years, of iteration to finalize a single scent in our collection. We meticulously tune the evaporation curves of each note to ensure that the transition from top to middle, and middle to base, is absolutely seamless.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our perfumers are trained in Grasse, France, the perfumery capital of the world. They bring generation-spanning knowledge to our modern, state-of-the-art labs, ensuring that traditional craftsmanship meets contemporary tastes perfectly.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight text-center">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-xl text-blue-900 mb-3">Uncompromising Quality</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">We never dilute our products to cut costs. Every bottle we sell has a high concentration of parfum oils to guarantee long-lasting projection.</p>
                </div>
                <div className="p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-xl text-blue-900 mb-3">Accessibility</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">By cutting out the middlemen, excessive marketing campaigns, and expensive retail real estate, we pass the savings directly onto you.</p>
                </div>
                <div className="p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-xl text-blue-900 mb-3">Transparency</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">We are honest about our ingredients. All our formulations are cruelty-free and strictly adhere to international safety standards.</p>
                </div>
                <div className="p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-xl text-blue-900 mb-3">Customer First</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Your satisfaction is our primary goal. From secure packaging to rapid delivery, your experience is prioritized at every step.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 text-white rounded-2xl p-8 md:p-12 shadow-xl my-24">
              <h3 className="text-2xl md:text-3xl font-black mb-6 uppercase tracking-tight text-center">Join The Exploration</h3>
              <p className="text-blue-100 text-center max-w-2xl mx-auto leading-relaxed mb-8">
                We invite you to step beyond the ordinary and discover a world where every scent tells a story. 
                Our fragrance specialists are always ready to help you find your signature scent. Dive into our collection today.
              </p>
              <div className="flex justify-center">
                <a href="/products" className="bg-orange-500 hover:bg-white hover:text-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all uppercase text-sm tracking-widest shadow-lg">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
