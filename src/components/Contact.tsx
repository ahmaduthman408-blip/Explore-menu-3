import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const name = (form.elements[0] as HTMLInputElement).value;
    const email = (form.elements[1] as HTMLInputElement).value;
    const subject = (form.elements[2] as HTMLInputElement).value;
    const message = (form.elements[3] as HTMLTextAreaElement).value;

    const mailtoLink = `mailto:uthmanahmad378@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    window.location.href = mailtoLink;
    
    toast.success('Opening your email client...');
    form.reset();
  };

  return (
    <section id="contact" className="py-20 p-6 md:p-10 bg-white border-b border-gray-100 relative">
      <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Contact Info */}
        <div className="w-full lg:w-2/5 p-8 md:p-10 bg-blue-700 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <h3 className="text-2xl font-black mb-8 relative z-10 tracking-tight">Contact Us</h3>
          
          <div className="space-y-8 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <Phone size={24} className="text-orange-500" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Phone / WhatsApp</h4>
                <p className="text-blue-100 text-sm">0913 567 0770</p>
                <a href="https://wa.me/2349135670770" target="_blank" rel="noreferrer" className="text-orange-500 hover:text-white text-xs font-bold mt-2 uppercase inline-block transition-colors tracking-wide">
                  Chat with us &rarr;
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <Mail size={24} className="text-orange-500" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Email</h4>
                <p className="text-blue-100 text-sm">uthmanahmad378@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <MapPin size={24} className="text-orange-500" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Delivery</h4>
                <p className="text-blue-100 text-sm">Nationwide delivery across Nigeria. Fast and secure.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full lg:w-3/5 p-8 md:p-10 flex flex-col justify-center">
          <h3 className="text-xl font-black text-gray-900 uppercase tracking-wide mb-8">Send us a message</h3>
          
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" placeholder="Your Name" />
              </div>
              <div>
                <input type="email" required className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" placeholder="Email Address" />
              </div>
            </div>
            
            <div>
              <input type="text" required className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" placeholder="Subject" />
            </div>

            <div>
              <textarea required rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm resize-none" placeholder="Message"></textarea>
            </div>

            <button type="submit" className="bg-blue-700 hover:bg-orange-500 text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wide flex justify-center items-center gap-2 transition-colors w-full sm:w-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
              Send Message <Send size={16} />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
