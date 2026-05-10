import { Users } from 'lucide-react';

const dummyCustomers = [
  { id: 'CUS-001', name: 'John Doe', email: 'john@example.com', orders: 3, joined: '2023-10-15' },
  { id: 'CUS-002', name: 'Jane Smith', email: 'jane@example.com', orders: 1, joined: '2023-11-02' },
  { id: 'CUS-003', name: 'Michael Johnson', email: 'michael@example.com', orders: 5, joined: '2023-09-20' },
];

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-900 tracking-tight">Customers</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold">Customer ID</th>
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Email</th>
                <th className="px-6 py-4 font-bold text-center">Total Orders</th>
                <th className="px-6 py-4 font-bold">Joined</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{customer.id}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs">
                        {customer.name.charAt(0)}
                      </div>
                      {customer.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4 text-center font-black text-gray-900">{customer.orders}</td>
                  <td className="px-6 py-4">{new Date(customer.joined).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-bold text-xs bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                      Reset Password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
