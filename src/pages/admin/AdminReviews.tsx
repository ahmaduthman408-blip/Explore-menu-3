import { useState } from 'react';
import { Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const initialReviews = [
  { id: 'REV-001', product: 'Oud Wood', customer: 'Jane Smith', rating: 5, comment: 'Absolutely love this scent! Lasts very long.', date: '2023-11-20' },
  { id: 'REV-002', product: 'Vanilla Royale', customer: 'John Doe', rating: 4, comment: 'Great fragrance but slightly too sweet for me.', date: '2023-11-18' },
];

export default function AdminReviews() {
  const [reviews, setReviews] = useState(initialReviews);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(r => r.id !== id));
      toast.success('Review deleted');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-900 tracking-tight">Reviews</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">Customer</th>
                <th className="px-6 py-4 font-bold">Rating</th>
                <th className="px-6 py-4 font-bold">Review</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{review.product}</td>
                  <td className="px-6 py-4">{review.customer}</td>
                  <td className="px-6 py-4">
                    <div className="flex text-orange-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} className={i < review.rating ? '' : 'text-gray-300'} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate" title={review.comment}>{review.comment}</td>
                  <td className="px-6 py-4">{new Date(review.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(review.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-block"
                      title="Delete Review"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                   <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No reviews found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
