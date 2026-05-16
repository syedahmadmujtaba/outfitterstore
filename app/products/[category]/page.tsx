import React from 'react';
import { getProductsByCategory, Category } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = resolvedParams.category as Category;
  
  if (!['shirts', 'shoes', 'accessories'].includes(category)) {
    notFound();
  }

  const products = getProductsByCategory(category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-display mb-4 capitalize">
          Core <span className="italic font-normal">{category}</span>
        </h1>
        <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
          {category === 'shirts' 
            ? 'Definitive tops designed for layering and pure statement.'
            : 'Footwear built from the ground up to redefine your silhouette.'}
        </p>
      </div>

      <div className="flex justify-between items-end mb-12 pb-4 border-b border-black/10">
        <span className="text-[10px] uppercase tracking-widest text-[#1a1a1a] font-bold">{products.length} Products</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
