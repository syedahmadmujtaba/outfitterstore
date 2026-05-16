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
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1489987707023-afc232dce9f2?q=80&w=800&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3db8?q=80&w=800&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=800&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1584735174965-99c43a32f6fa?q=80&w=800&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop'
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
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop'
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
