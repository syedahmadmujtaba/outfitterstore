import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data';

const getColorHex = (colorString: string) => {
  const lower = colorString.toLowerCase();
  if (lower.includes('black')) return '#1a1a1a';
  if (lower.includes('white')) return '#fcfcfc';
  if (lower.includes('blue') && lower.includes('light')) return '#bfdbfe';
  if (lower.includes('blue') && lower.includes('wash')) return '#60a5fa';
  if (lower.includes('blue')) return '#3b82f6';
  if (lower.includes('navy')) return '#1e3a8a';
  if (lower.includes('olive')) return '#4d7c0f';
  if (lower.includes('tan')) return '#d2b48c';
  if (lower.includes('charcoal')) return '#3f3f46';
  if (lower.includes('grey')) return '#9ca3af';
  if (lower.includes('neon')) return '#84cc16';
  return '#e5e7eb';
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] bg-[#f4f4f4] mb-4 overflow-hidden border border-black/5">
        {product.newArrival && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white text-black border border-black/10 text-[9px] font-bold uppercase tracking-widest px-2 py-1">
              New
            </span>
          </div>
        )}
        <Image 
          src={product.images[0]} 
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Secondary image on hover if available */}
        {product.images.length > 1 && (
           <Image 
             src={product.images[1]} 
             alt={`${product.name} alternate view`}
             fill
             className="object-cover object-center absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
             referrerPolicy="no-referrer"
           />
        )}
      </div>
      <div className="flex flex-col gap-1 mt-4">
        {/* Color Previews (mini swatches) */}
        <div className="flex gap-1.5 mb-1">
          {product.colors.slice(0, 4).map(color => (
            <div 
              key={color} 
              className="w-3 h-3 border border-black/10" 
              style={{ backgroundColor: getColorHex(color) }}
              title={color}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[9px] font-medium text-gray-400 flex items-center justify-center">+{product.colors.length - 4}</span>
          )}
        </div>
        
        <h3 className="font-bold text-[#1a1a1a] uppercase leading-tight text-[11px] tracking-wide group-hover:text-gray-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-[#1a1a1a] text-[11px] uppercase tracking-widest font-bold mt-1">PKR {product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}
