import React, { useState } from 'react';
import { useStore, Product } from '../../store/useStore';
import { supabase } from '../../lib/supabase';
import { Edit, Trash2, Plus, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useFetchProducts } from '../../hooks/useFetchProducts';

export default function AdminProducts() {
  const { loading: fetchLoading } = useFetchProducts();
  const products = useStore(state => state.products);
  const addProduct = useStore(state => state.addProduct);
  const updateProduct = useStore(state => state.updateProduct);
  const deleteProductLocally = useStore(state => state.deleteProduct);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    urgency_minutes: '',
    video_url: ''
  });

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        image: product.image || '',
        urgency_minutes: product.urgency_minutes ? product.urgency_minutes.toString() : '',
        video_url: product.video_url || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', description: '', image: '', urgency_minutes: '', video_url: '' });
    }
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      image: formData.image,
      urgency_minutes: formData.urgency_minutes ? parseInt(formData.urgency_minutes, 10) : null,
      video_url: formData.video_url
    };

    try {
      if (editingProduct) {
        // Update
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        
        if (error) {
          console.warn('Supabase update failed, updating local state only:', error);
          // If no connection, update locally anyway
        }
        updateProduct({ ...editingProduct, ...productData } as Product);
        toast.success('Product updated successfully!');
      } else {
        // Create
        let newId = `prod-${Date.now()}`;
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select();

        if (error || !data) {
          console.warn('Supabase insert failed, adding to local state only:', error);
        } else if (data && data[0]) {
          newId = data[0].id;
        }

        addProduct({ id: newId, ...productData } as Product);
        toast.success('Product added successfully!');
      }
      handleCloseModal();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    // Attempt backend delete
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        console.warn('Supabase delete failed, removing locally only:', error);
      }
    } catch (err) {
      console.warn('Failed to delete product from Supabase:', err);
    }
    
    // Always delete locally for immediate UI update
    deleteProductLocally(id);
    toast.success('Product deleted.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Products</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm w-fit"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">Price</th>
                <th className="px-6 py-4 font-bold">Stock Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetchLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    <Loader2 className="animate-spin inline-block text-blue-700" size={24} />
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No products found. Add one to get started.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                          ) : (
                            <ImageIcon size={20} className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[200px]">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-gray-900">
                      ₦{product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-200">
                        In Stock
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-black text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-900">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Product Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Price (₦)</label>
                <input 
                  type="number" 
                  required
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Product Image</label>
                <div className="flex items-center gap-4">
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Video Link (YouTube, Drive, etc.)</label>
                <input 
                  type="url" 
                  value={formData.video_url}
                  onChange={e => setFormData({...formData, video_url: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Urgency Timer (Minutes) - Optional</label>
                <input 
                  type="number" 
                  value={formData.urgency_minutes}
                  onChange={e => setFormData({...formData, urgency_minutes: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. 30"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 text-sm font-bold bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-sm disabled:opacity-70"
                >
                  {loading ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
