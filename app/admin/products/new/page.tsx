'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState<{ url: string; publicId: string }[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setError('File size must be under 100MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const result = await uploadToCloudinary(file);
      setImages(prev => [...prev, { url: result.url, publicId: result.publicId }]);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    }

    setUploading(false);
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category'),
      featured: formData.get('featured') === 'on',
      newArrival: formData.get('newArrival') === 'on',
      images,
      variants: [],
    };

    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || 'Failed to create product');
    } else {
      router.push('/admin/products');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold font-display">Add Product</h2>
        <button onClick={() => router.back()} className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-black">
          ← Back
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 border border-black/10 space-y-6 max-w-2xl">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2 block">Name</label>
          <input name="name" required className="w-full border border-black/10 bg-[#fbfbfb] p-4 text-sm focus:border-black outline-none" />
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2 block">Description</label>
          <textarea name="description" required rows={4} className="w-full border border-black/10 bg-[#fbfbfb] p-4 text-sm focus:border-black outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2 block">Price (PKR)</label>
            <input name="price" type="number" step="0.01" required className="w-full border border-black/10 bg-[#fbfbfb] p-4 text-sm focus:border-black outline-none" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2 block">Category</label>
            <select name="category" required className="w-full border border-black/10 bg-[#fbfbfb] p-4 text-sm focus:border-black outline-none">
              <option value="shirts">Shirts</option>
              <option value="shoes">Shoes</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" className="accent-black" />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="newArrival" className="accent-black" />
            New Arrival
          </label>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2 block">Images</label>
          <div className="flex gap-4 mb-4">
            <label className="border border-black/10 bg-[#fbfbfb] px-4 py-3 text-sm cursor-pointer hover:bg-gray-100">
              {uploading ? 'Uploading...' : 'Upload Image'}
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
            </label>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square bg-gray-100 border border-black/10">
                <img src={img.url} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-black text-white text-[9px] w-5 h-5 flex items-center justify-center">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-black text-white py-5 text-[11px] uppercase tracking-widest font-bold hover:opacity-85 transition-opacity disabled:opacity-50">
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
