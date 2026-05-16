import React from 'react';
import { PRODUCTS } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  let products = [...PRODUCTS];

  if (resolvedSearchParams.filter === 'new') {
    products = products.filter(p => p.newArrival);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
          All <span className="italic font-normal">Archive</span>
        </h1>
        <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
          Our complete collection. Every piece engineered for endurance and aesthetics.
        </p>
      </div>

      <div className="flex justify-between items-end mb-12 pb-4 border-b border-black/10">
        <span className="text-[10px] uppercase tracking-widest text-[#1a1a1a] font-bold">{products.length} Products</span>
        <select className="text-[10px] uppercase tracking-widest text-gray-400 border-none bg-transparent font-bold focus:ring-0 cursor-pointer outline-none hover:text-[#1a1a1a] transition-colors">
          <option>Sort by: Newest</option>
          <option>Sort by: Price (Low to High)</option>
          <option>Sort by: Price (High to Low)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
