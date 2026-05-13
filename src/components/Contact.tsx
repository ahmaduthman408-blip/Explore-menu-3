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

      {/* Expanded Contact Sections */}
      <div className="mt-16 sm:mt-24 max-w-6xl mx-auto space-y-16">
        
        {/* Working Hours & Physical Presence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl">
            <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-wide">Business Hours</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-800">Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-800">Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-800">Sunday</span>
                <span className="text-orange-500 font-medium">Closed</span>
              </li>
              <li className="flex justify-between pt-2">
                <span className="font-bold text-gray-800">Public Holidays</span>
                <span>10:00 AM - 2:00 PM (Online Support Only)</span>
              </li>
            </ul>
            <p className="mt-6 text-xs text-gray-500 italic">
              Note: Online orders can be placed 24/7. Orders placed outside business hours will be processed on the next applicable business day.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-100 p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <MapPin size={200} />
            </div>
            <h3 className="text-xl font-black text-orange-900 mb-6 uppercase tracking-wide relative z-10">Flagship Locations</h3>
            <div className="space-y-6 relative z-10">
              <div>
                <h4 className="font-bold text-orange-800 mb-1 z-10">Lagos Head Office</h4>
                <p className="text-sm text-orange-900/80">Victoria Island, Lagos, Nigeria<br/>(By Appointment Only)</p>
              </div>
              <div>
                <h4 className="font-bold text-orange-800 mb-1 z-10">Abuja Distribution Center</h4>
                <p className="text-sm text-orange-900/80">Wuse II, Abuja, Nigeria</p>
              </div>
              <p className="text-xs text-orange-800 font-bold mt-4 pt-4 border-t border-orange-200 inline-block uppercase">
                More retail locations launching in late 2026.
              </p>
            </div>
          </div>
        </div>

        {/* Wholesale & Partnerships */}
        <div className="bg-blue-900 text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3">
            <h3 className="text-2xl md:text-3xl font-black mb-4 uppercase tracking-tight">Wholesale & Distribution</h3>
            <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-6">
              Are you a retailer, boutique owner, or aspiring distributor looking to carry our premium fragrance line? We offer highly competitive wholesale rates, dedicated account management, and marketing support for our trusted partners across Africa.
            </p>
            <ul className="text-sm text-blue-200 space-y-2 mb-6">
              <li className="flex items-center gap-2">✓ Minimum Order Quantities apply</li>
              <li className="flex items-center gap-2">✓ White-labeling options available for bulk buyers</li>
              <li className="flex items-center gap-2">✓ Branded display materials provided</li>
            </ul>
          </div>
          <div className="md:w-1/3 flex justify-center w-full">
            <a 
              href="mailto:uthmanahmad378@gmail.com?subject=Wholesale%20Inquiry" 
              className="w-full text-center bg-orange-500 hover:bg-white hover:text-blue-900 text-white font-black py-4 px-8 rounded-xl transition-all shadow-lg text-sm uppercase tracking-wider"
            >
              Partner With Us
            </a>
          </div>
        </div>

        {/* Extensive Policies */}
        <div className="bg-white border text-left border-gray-200 p-8 md:p-12 rounded-3xl">
          <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-wide text-center">Store Policies & Information</h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-bold text-blue-900 mb-3">1. Shipping & Logistics Policy</h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                All confirmed orders are handed over to our logistics partners within 24 hours. For deliveries within Lagos, we utilize dedicated dispatch riders ensuring same-day or next-day delivery depending on the time of order checkout.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                For interstate deliveries (Abuja, Port Harcourt, Kano, etc.), we partner with premium logistics companies such as GIG Logistics and DHL. Interstate deliveries take between 3 to 5 business days. You will receive a tracking link via email or SMS. Please ensure someone is available at the provided address to receive the package, as perfumes are sensitive items that shouldn't be left outdoors.
              </p>
            </div>

            <div className="w-full h-px bg-gray-100"></div>

            <div>
              <h4 className="text-lg font-bold text-blue-900 mb-3">2. Refund & Exchange Policy</h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                Due to strict hygiene standards and the nature of cosmetic products, we operate a strict "no return, no exchange" policy on all fragrance bottles that have had their shrink-wrap or security seals broken. Please select your fragrances carefully.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Exceptions are only made in the rare event that a product arrives damaged (broken bottle or faulty atomizer) or if an incorrect item was shipped. Under these circumstances, you MUST contact our support team at uthmanahmad378@gmail.com within 24 hours of package delivery, providing clear photographic or video evidence. Upon verification, a replacement will be dispatched to you at no additional cost.
              </p>
            </div>

            <div className="w-full h-px bg-gray-100"></div>

            <div>
              <h4 className="text-lg font-bold text-blue-900 mb-3">3. Privacy Configuration</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                We take your data privacy very seriously. We do not sell, rent, or distribute your personal information (including phone numbers, email addresses, and physical addresses) to any third-party marketing agencies. Your information is purely utilized for order fulfillment and internal marketing (which you can opt out of at any time). Payment details are securely processed via encrypted payment gateways; we do not store your raw credit card information on our servers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
