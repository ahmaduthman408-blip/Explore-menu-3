import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/2349135670770?text=Hello,%20I'm%20interested%20in%20your%20perfumes";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      aria-label="Contact on WhatsApp"
    >
      <div className="absolute -left-36 bg-white text-gray-800 text-[10px] font-bold py-1 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Order via WhatsApp
      </div>
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.53.909 3.255 1.389 5.011 1.39h.005c5.648 0 10.245-4.595 10.248-10.243.001-2.737-1.064-5.31-2.999-7.247-1.935-1.937-4.509-3.003-7.246-3.004-5.655 0-10.252 4.597-10.255 10.245 0 1.861.503 3.674 1.455 5.253l-1.01 3.687 3.782-.992z"/></svg>
    </a>
  );
}
