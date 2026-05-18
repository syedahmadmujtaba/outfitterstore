'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { Plus, ShoppingBag, Minus } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { getColorHex, formatPrice } from '@/lib/utils';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { addItem, setIsCartOpen } = useCart();

  const sizes = [...new Set(product.variants?.map(v => v.size) || [])];
  const colors = [...new Set(product.variants?.map(v => v.color) || [])];

  const normalizeSize = (s: string) => {
    const map: Record<string, string> = { small: 'S', medium: 'M', large: 'L', 'extra large': 'XL', 'extra-large': 'XL', extralarge: 'XL' };
    return map[s.toLowerCase()] || s;
  };

  const displaySizes = sizes.map(normalizeSize);

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || '');
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setError('Please select a size and color.');
      return;
    }
    setError('');
    addItem(product, selectedSize, selectedColor, 1);
    setAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const imageUrls = product.images?.filter(img => img.url).map(img => img.url) || [];
  const displayImages = imageUrls.length > 0 ? [...imageUrls, ...imageUrls, ...imageUrls].slice(0, 4) : [];

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-[65%] xl:w-[70%]">
          {displayImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-1 p-1">
              {displayImages.map((img, idx) => (
                <div key={idx} className="relative aspect-[3/4] bg-[#f4f4f4]">
                  <Image 
                    src={img} 
                    alt={`${product.name} view ${idx + 1}`} 
                    fill 
                    className="object-cover object-center"
                    priority={idx < 2}
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="aspect-[3/4] bg-[#f4f4f4] flex items-center justify-center">
              <p className="text-gray-400 text-sm">No images available</p>
            </div>
          )}
        </div>

        <div className="w-full lg:w-[35%] xl:w-[30%] px-6 py-10 lg:py-12 lg:px-12">
          <div className="sticky top-28">
            <h1 className="text-sm font-bold uppercase tracking-wide leading-snug mb-2 font-sans text-[#1a1a1a]">
              {product.name}
            </h1>
            <p className="text-sm font-bold text-[#1a1a1a] mb-2 uppercase tracking-wide">
              PKR {formatPrice(product.price)}
            </p>

            <div className="mb-8">
              <span className="text-[11px] text-gray-500 mb-3 block capitalize">{selectedColor}</span>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 border transition-all ${
                      selectedColor === color 
                        ? 'ring-1 ring-black ring-offset-2 border-black/20' 
                        : 'border-black/10 hover:border-black/30'
                    }`}
                    style={{ backgroundColor: getColorHex(color) }}
                    title={color}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">Select Size</span>
                <button className="text-[10px] font-semibold underline uppercase tracking-widest text-[#1a1a1a]">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {displaySizes.map((displaySize, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(sizes[idx])}
                    className={`text-[12px] uppercase transition-all ${
                      selectedSize === sizes[idx]
                        ? 'text-[#1a1a1a] font-bold underline underline-offset-4'
                        : 'text-gray-500 hover:text-[#1a1a1a] font-medium'
                    }`}
                  >
                    {displaySize}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className={`w-full text-white px-6 py-4 font-bold uppercase tracking-[0.1em] text-[12px] transition-all flex items-center justify-between ${
                added ? 'bg-green-600 hover:bg-green-700' : 'bg-[#1a1a1a] hover:bg-black'
              }`}
            >
              <span>{added ? 'Added to Cart ✓' : 'Add to Cart'}</span>
              {!added && <ShoppingBag className="w-5 h-5 stroke-[1.5]" />}
            </button>
            {error && <p className="text-red-500 text-xs font-semibold uppercase tracking-widest mt-2">{error}</p>}

            <div className="mt-10 mb-8">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#1a1a1a] mb-4">Product Description</h3>
              <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="border-t border-black/10">
              {[
                { id: 'size', title: 'Size Guide', content: 'Detailed measurements and sizing information.' },
                { id: 'details', title: 'Product Details & Composition', content: 'Material details, care instructions, and manufacturing info.' },
                { id: 'delivery', title: 'Deliveries & Returns', content: 'Free standard shipping on orders over PKR 15,000. 30-day return policy.' }
              ].map(section => (
                <div key={section.id} className="border-b border-black/10">
                  <button 
                    onClick={() => toggleSection(section.id)}
                    className="w-full py-4 flex items-center gap-4 text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="w-4 flex items-center justify-center text-gray-400">
                      {expandedSection === section.id ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-widest text-[#1a1a1a]">
                      {section.title}
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedSection === section.id ? 'max-h-40 pb-4 pl-8' : 'max-h-0'}`}>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t border-black/10 pt-16 px-4 sm:px-6 lg:px-8 mb-24 max-w-[1600px] mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a] mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map(related => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
