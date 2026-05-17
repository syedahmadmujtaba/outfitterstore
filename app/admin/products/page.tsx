import { query } from '@/lib/db';
import Link from 'next/link';

export default async function AdminProducts() {
  const products = await query(`
    SELECT p.id, p.name, p.category, p.price, p.featured, p.new_arrival AS "newArrival",
           COUNT(DISTINCT pi.id) AS image_count,
           COUNT(DISTINCT pv.id) AS variant_count
    FROM products p
    LEFT JOIN product_images pi ON pi.product_id = p.id
    LEFT JOIN product_variants pv ON pv.product_id = p.id
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold font-display">Products</h2>
        <Link href="/admin/products/new" className="bg-black text-white px-6 py-3 text-[11px] uppercase tracking-widest font-bold hover:opacity-85 transition-opacity">
          Add Product
        </Link>
      </div>

      <div className="bg-white border border-black/10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/10 text-[10px] uppercase tracking-widest text-gray-500">
              <th className="px-4 py-3 font-bold">Name</th>
              <th className="px-4 py-3 font-bold">Category</th>
              <th className="px-4 py-3 font-bold">Price</th>
              <th className="px-4 py-3 font-bold">Images</th>
              <th className="px-4 py-3 font-bold">Variants</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: any) => (
              <tr key={p.id} className="border-b border-black/5 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium">{p.name}</td>
                <td className="px-4 py-3 text-sm capitalize">{p.category}</td>
                <td className="px-4 py-3 text-sm">PKR {parseFloat(p.price).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{p.image_count}</td>
                <td className="px-4 py-3 text-sm">{p.variant_count}</td>
                <td className="px-4 py-3 text-sm">
                  {p.featured && <span className="text-[9px] uppercase tracking-widest bg-black/5 px-2 py-1 mr-1">Featured</span>}
                  {p.newArrival && <span className="text-[9px] uppercase tracking-widest bg-black/5 px-2 py-1">New</span>}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <Link href={`/admin/products/${p.id}`} className="text-[10px] uppercase tracking-widest text-blue-600 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
