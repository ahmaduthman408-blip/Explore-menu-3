import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  created_at?: string;
  urgency_minutes?: number; // Custom field for frontend urgency
  video_url?: string; // New field for video
  gallery?: string[]; // Array of additional images
}

export interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  isCartOpen: boolean;
  isAuthModalOpen: boolean;
  user: User | null;
  products: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  toggleAuthModal: (isOpen?: boolean) => void;
  setUser: (user: User | null) => void;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  isCartOpen: false,
  isAuthModalOpen: false,
  user: null,
  products: [],
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return { cart: state.cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }], isCartOpen: true };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item => item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item)
  })),
  clearCart: () => set({ cart: [] }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  toggleAuthModal: (isOpen) => set((state) => ({ isAuthModalOpen: isOpen !== undefined ? isOpen : !state.isAuthModalOpen })),
  setUser: (user) => set({ user }),
  setProducts: (products) => set({ products }),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (product) => set((state) => ({ products: state.products.map(p => p.id === product.id ? product : p) })),
  deleteProduct: (productId) => set((state) => ({ products: state.products.filter(p => p.id !== productId) })),
}));
