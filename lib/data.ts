export type Category = 'shirts' | 'shoes' | 'accessories';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  sizes: string[];
  colors: string[];
  featured?: boolean;
  newArrival?: boolean;
}

export const PRODUCTS: Product[] = [
  // --- SHIRTS ---
  {
    id: 'shirt-1',
    name: 'Oversized Graphic Tee',
    description: 'Heavyweight cotton blend oversized t-shirt with custom back graphic. Drop shoulder fit.',
    price: 4500,
    category: 'shirts',
    images: [
      'https://picsum.photos/seed/fixed/800/800',
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black'],
    featured: true,
    newArrival: true
  },
  {
    id: 'shirt-2',
    name: 'Minimalist Oxford Button-Down',
    description: 'Crisp, structured oxford shirt tailored for a modern silhouette. Perfect for layering.',
    price: 6500,
    category: 'shirts',
    images: [
      'https://picsum.photos/seed/fixed/800/800',
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Light Blue', 'White', 'Navy'],
    featured: false
  },
  {
    id: 'shirt-3',
    name: 'Vintage Wash Denim Shirt',
    description: 'Rugged denim shirt broken in for everyday comfort. Features snap-button closures.',
    price: 8000,
    category: 'shirts',
    images: [
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Washed Blue', 'Black'],
    featured: true
  },
  {
    id: 'shirt-4',
    name: 'Tech-Knit Long Sleeve',
    description: 'Moisture-wicking technical fabric engineered for movement and breathability.',
    price: 5000,
    category: 'shirts',
    images: [
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['Olive', 'Black', 'Charcoal'],
    newArrival: true
  },
  {
    id: 'shirt-5',
    name: 'Striped Collar Polo',
    description: 'Classic fit polo shirt with a modern striped collar accent. Breathable pique cotton.',
    price: 4800,
    category: 'shirts',
    images: [
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'White'],
    featured: false
  },
  {
    id: 'shirt-6',
    name: 'Relaxed Fit Flannel',
    description: 'Ultra-soft brushed flannel shirt in a versatile plaid pattern. Excellent for layering.',
    price: 5500,
    category: 'shirts',
    images: [
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Red/Black', 'Blue/Grey'],
    featured: true
  },
  {
    id: 'shirt-7',
    name: 'Basic Essential Tee',
    description: 'The perfectly cut basic crewneck tee. 100% organic cotton for everyday wear.',
    price: 2500,
    category: 'shirts',
    images: [
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Grey', 'Navy'],
    featured: false,
    newArrival: true
  },
  {
    id: 'shirt-8',
    name: 'Printed Cuban Collar',
    description: 'Breezy short-sleeve shirt with a relaxed Cuban collar and subtle abstract print.',
    price: 6000,
    category: 'shirts',
    images: [
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'Light Blue'],
    featured: true
  },

  // --- SHOES ---
  {
    id: 'shoe-1',
    name: 'Classic Court Sneaker',
    description: 'Clean, minimalist leather sneaker that goes with absolutely everything.',
    price: 12000,
    category: 'shoes',
    images: [
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['White', 'Off-White'],
    featured: true,
    newArrival: true
  },
  {
    id: 'shoe-2',
    name: 'Chunky Platform Sneakers',
    description: 'Elevate your street style. Premium leather upper sitting on a dramatic chunky sole.',
    price: 14500,
    category: 'shoes',
    images: [
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Red/White', 'Black'],
    featured: true
  },
  {
    id: 'shoe-3',
    name: 'Retro Runner Silhouettes',
    description: '90s inspired running aesthetics updated with modern cushioning technology.',
    price: 9500,
    category: 'shoes',
    images: [
      'https://picsum.photos/seed/fixed/800/800',
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Blue/White', 'Neon Green'],
    featured: false
  },
  {
    id: 'shoe-4',
    name: 'Classic Canvas High-Tops',
    description: 'The quintessential everyday shoe. Durable canvas construction with contrasting stitching.',
    price: 5500,
    category: 'shoes',
    images: [
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['7', '8', '9', '10'],
    colors: ['Black/White', 'White'],
    newArrival: true
  },
  {
    id: 'shoe-5',
    name: 'Suede Chelsea Boots',
    description: 'Sleek and versatile. Crafted from soft suede with elastic side panels and a stacked heel.',
    price: 16000,
    category: 'shoes',
    images: [
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['8', '9', '10', '11'],
    colors: ['Tan', 'Black', 'Charcoal'],
    featured: true
  },
  {
    id: 'shoe-6',
    name: 'Slip-on Skate Shoes',
    description: 'Easy slip-on design with a durable canvas upper and a vulcanized rubber sole for grip.',
    price: 6500,
    category: 'shoes',
    images: [
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['7', '8', '9', '10'],
    colors: ['Black/White', 'Navy'],
    featured: false
  },
  {
    id: 'shoe-7',
    name: 'Lightweight Trainer',
    description: 'Breathable knit upper and ultra-light foam midsole for all-day comfort.',
    price: 11000,
    category: 'shoes',
    images: [
      'https://picsum.photos/seed/fixed/800/800'
    ],
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['White/Grey', 'All Black'],
    featured: false,
    newArrival: true
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured);
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter(p => p.newArrival);
}

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}
