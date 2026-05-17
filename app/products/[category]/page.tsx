import React from 'react';
import { query } from '@/lib/db';
import { formatProduct } from '@/lib/format';
import { ProductCard } from '@/components/ProductCard';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [
    { category: 'shirts' },
    { category: 'shoes' },
    { category: 'accessories' },
  ];
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = resolvedParams.category;
  
  if (!['shirts', 'shoes', 'accessories'].includes(category)) {
    notFound();
  }

  const products = await query(`
    SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      p.category,
      p.featured,
      p.new_arrival AS "newArrival",
      json_agg(
        json_build_object(
          'id', pi.id,
          'url', pi.cloudinary_url,
          'alt', pi.alt_text,
          'sortOrder', pi.sort_order
        ) ORDER BY pi.sort_order
      ) FILTER (WHERE pi.id IS NOT NULL) AS images,
      json_agg(
        json_build_object(
          'id', pv.id,
          'size', pv.size,
          'color', pv.color,
          'stock', pv.stock
        )
      ) FILTER (WHERE pv.id IS NOT NULL) AS variants
    FROM products p
    LEFT JOIN product_images pi ON pi.product_id = p.id
    LEFT JOIN product_variants pv ON pv.product_id = p.id
    WHERE p.category = $1
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `, [category]);

  const formattedProducts = products.map(formatProduct);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-display mb-4 capitalize">
          Core <span className="italic font-normal">{category}</span>
        </h1>
        <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
          {category === 'shirts' 
            ? 'Definitive tops designed for layering and pure statement.'
            : category === 'shoes'
            ? 'Footwear built from the ground up to redefine your silhouette.'
            : 'Essential accessories to complete your look.'}
        </p>
      </div>

      <div className="flex justify-between items-end mb-12 pb-4 border-b border-black/10">
        <span className="text-[10px] uppercase tracking-widest text-[#1a1a1a] font-bold">{formattedProducts.length} Products</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
        {formattedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
