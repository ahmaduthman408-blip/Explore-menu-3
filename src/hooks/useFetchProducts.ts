import { useEffect, useState } from 'react';
import { supabase, isPlaceholder } from '../lib/supabase';
import { useStore, Product } from '../store/useStore';

const SEED_PRODUCTS: Partial<Product>[] = [
  { name: '24K', price: 25000, description: 'A luxurious fragrance radiating warmth and elegance.', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop', urgency_minutes: 30 },
  { name: 'Rigg', price: 18000, description: 'Bold and confident, perfect for the modern professional.', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop', urgency_minutes: 120 },
  { name: 'Smart Collection', price: 12000, description: 'Fresh, clean, and versatile for everyday wear.', image: 'https://images.unsplash.com/photo-1523293115678-d2902f52f46d?q=80&w=600&auto=format&fit=crop' },
  { name: 'Incidence', price: 22000, description: 'A mysterious blend of woody and spicy notes.', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600&auto=format&fit=crop', urgency_minutes: 30 },
  { name: 'Explore', price: 28000, description: 'Signature scent of the brand. Captivating and unique.', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=600&auto=format&fit=crop', urgency_minutes: 45 },
  { name: 'Eskoda', price: 15000, description: 'Sweet floral notes mixed with a hint of citrus.', image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=600&auto=format&fit=crop' },
  { name: 'Chairman', price: 35000, description: 'The ultimate scent for leadership and power.', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop', urgency_minutes: 120 },
  { name: 'Cool Breeze', price: 14000, description: 'Light, airy, and incredibly refreshing.', image: 'https://images.unsplash.com/photo-1587403332156-f6d396eeccd6?q=80&w=600&auto=format&fit=crop' },
  { name: 'Pure Love', price: 19000, description: 'Romantic and soft, perfect for evening wear.', image: 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=600&auto=format&fit=crop' },
  { name: 'Mousouf', price: 21000, description: 'A rich oriental fragrance with deep oud notes.', image: 'https://images.unsplash.com/photo-1616406432452-07bc5938759d?q=80&w=600&auto=format&fit=crop', urgency_minutes: 30 },
  { name: 'Maker', price: 23000, description: 'Creative and inspiring, a scent that stands out.', image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=600&auto=format&fit=crop', urgency_minutes: 60 },
  { name: 'Passion', price: 26000, description: 'Intense and alluring, designed to captivate.', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=600&auto=format&fit=crop' },
  { name: 'Techno', price: 17000, description: 'Vibrant, energetic, and completely modern.', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop' },
];

export function useFetchProducts() {
  const setProducts = useStore((state) => state.setProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      // If we already have products in store, don't show loading spinner again initially
      if (useStore.getState().products.length > 0) {
        setLoading(false);
      }

      // If URL is placeholder, use mock data immediately
      if (isPlaceholder) {
        if (useStore.getState().products.length === 0) {
          const seeded = SEED_PRODUCTS.map((p, i) => ({
            id: `seed-${i}`,
            name: p.name!,
            price: p.price!,
            description: p.description!,
            image: p.image!,
            urgency_minutes: p.urgency_minutes
          }));
          setProducts(seeded as Product[]);
        }
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.from('products').select('*');
        
        if (error || !data || data.length === 0) {
          // If no data or error (like missing anon key), use seed data with dummy IDs
          if (useStore.getState().products.length === 0) {
            const seeded = SEED_PRODUCTS.map((p, i) => ({
              id: `seed-${i}`,
              name: p.name!,
              price: p.price!,
              description: p.description!,
              image: p.image!,
              urgency_minutes: p.urgency_minutes
            }));
            setProducts(seeded as Product[]);
          }
        } else {
          const decodedData = data.map((item: any) => {
            let video_url = item.video_url || '';
            let gallery: string[] = [];
            if (video_url.startsWith('{')) {
              try {
                const parsed = JSON.parse(video_url);
                video_url = parsed.v || '';
                gallery = parsed.g || [];
              } catch (e) {}
            }
            return {
              ...item,
              video_url,
              gallery
            };
          });
          setProducts(decodedData as Product[]);
        }
      } catch (err) {
        // Fallback
        if (useStore.getState().products.length === 0) {
          const seeded = SEED_PRODUCTS.map((p, i) => ({
            id: `seed-${i}`,
            name: p.name!,
            price: p.price!,
            description: p.description!,
            image: p.image!,
            urgency_minutes: p.urgency_minutes
          }));
          setProducts(seeded as Product[]);
        }
      } finally {
        setLoading(false);
      }
    }

    loadProducts();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        loadProducts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setProducts]);

  return { loading };
}
