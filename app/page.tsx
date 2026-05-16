import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://picsum.photos/seed/editorialhero/1920/1080"
          alt="Editorial Fashion Campaign"
          fill
          className="object-cover object-center"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-20">
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold text-white font-display leading-none mb-6 text-balance">
            Defy Typical<br /><span className="italic font-normal">Silhouettes.</span>
          </h1>
          <p className="text-sm md:text-md text-gray-200 mb-10 max-w-xl font-light leading-relaxed">
            Engineered garments and footwear for the modern landscape. Precision crafted, unapologetically bold.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/products/shirts"
              className="bg-white text-[#1a1a1a] px-10 py-4 font-bold uppercase tracking-[0.2em] text-[11px] hover:opacity-85 transition-opacity inline-block"
            >
              Shop Apparel
            </Link>
            <Link 
              href="/products/shoes"
              className="bg-transparent border border-white text-white px-10 py-4 font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-[#1a1a1a] transition-colors inline-block"
            >
              Shop Footwear
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection Strip */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-16 pb-4 border-b border-black/10">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-[10px] uppercase tracking-widest text-gray-400">Curated pieces</span>
              <div className="h-px w-12 bg-gray-200"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display">The Editor&apos;s <span className="italic font-normal">Edit</span></h2>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-gray-500 transition-colors uppercase">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-16 sm:hidden flex justify-center border-t border-black/10 pt-8">
          <Link href="/products" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-gray-500 transition-colors">
            View All Products
          </Link>
        </div>
      </section>

      {/* Large Featured Category Split */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-y border-black/10">
        <div className="relative aspect-square md:aspect-auto md:h-[800px] overflow-hidden group border-b md:border-b-0 md:border-r border-black/10">
          <Image
            src="https://picsum.photos/seed/shirtscat/1000/1000"
            alt="New Shirts Collection"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-500" />
          <div className="absolute inset-0 p-12 flex flex-col justify-end items-center text-center">
            <h3 className="text-4xl font-bold text-white font-display mb-4">Core <span className="italic font-normal">Shirts</span></h3>
            <Link 
              href="/products/shirts"
              className="w-fit border border-white text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              Explore
            </Link>
          </div>
        </div>
        
        <div className="relative aspect-square md:aspect-auto md:h-[800px] overflow-hidden group">
          <Image
            src="https://picsum.photos/seed/shoescat/1000/1000"
            alt="New Footwear Collection"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-500" />
          <div className="absolute inset-0 p-12 flex flex-col justify-end items-center text-center">
            <h3 className="text-4xl font-bold text-white font-display mb-4">Statement <span className="italic font-normal">Footwear</span></h3>
            <Link 
              href="/products/shoes"
              className="w-fit border border-white text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-24 bg-white px-4 border-t border-black/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="md:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight font-sans tracking-tight">
              Be the first<br />to know
            </h2>
          </div>
          <div className="md:w-1/2 w-full flex flex-col gap-8">
            <p className="text-[11px] font-bold uppercase text-[#1a1a1a] tracking-wider">
              Get an update of all our latest collections, discounts & features coming up
            </p>
            <form className="flex flex-col gap-6 w-full">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL"
                className="w-full border-b border-black py-2 focus:outline-none focus:border-gray-500 bg-transparent text-sm placeholder:text-gray-400 font-medium"
              />
              <button 
                type="button"
                className="bg-black text-white px-6 py-3 font-bold uppercase text-[11px] hover:opacity-85 transition-opacity w-fit tracking-wider"
              >
                Sign me up!
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
