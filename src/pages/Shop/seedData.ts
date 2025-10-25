// seedData.ts
export interface ProductSize {
  small: number;
  medium: number;
  large: number;
  xlarge: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'sweatpants' | 'hoodies';
  price: number;
  images: string[];
  description: string;
  sizes: ProductSize;
  colors: string[];
  isNew: boolean;
  featured: boolean;
  createdAt: Date;
}

export const seedProducts: Product[] = [
  // GRAY SWEATPANTS
  {
    id: 'sp-gray',
    name: 'Gray Sweatpants',
    category: 'sweatpants',
    price: 45,
    images: [
      'https://wantsandneeds.com/cdn/shop/files/Gray_sweats_front.jpg?v=1755072887&width=3859',
      'https://wantsandneeds.com/cdn/shop/files/Gray_sweats_back.jpg?v=1755072887&width=4000'
    ],
    description: 'Premium comfort sweatpants in classic gray. Made with high-quality cotton blend for maximum comfort and durability.',
    sizes: {
      small: 5,
      medium: 5,
      large: 5,
      xlarge: 5
    },
    colors: ['Gray'],
    isNew: true,
    featured: true,
    createdAt: new Date('2024-01-15')
  },
  // BLACK SWEATPANTS
  {
    id: 'sp-black',
    name: 'Black Sweatpants',
    category: 'sweatpants',
    price: 45,
    images: [
      'https://wantsandneeds.com/cdn/shop/files/Black_sweats_front_V2.jpg?v=1755069309&width=3557',
      'https://wantsandneeds.com/cdn/shop/files/Black_sweats_back_d4b74483-4ea0-4abe-81a3-9f3f8af66470.jpg?v=1755069309&width=3557'
    ],
    description: 'Essential black sweatpants with perfect fit. Modern jogger style with tapered legs and comfortable waistband.',
    sizes: {
      small: 5,
      medium: 5,
      large: 5,
      xlarge: 5
    },
    colors: ['Black'],
    isNew: true,
    featured: true,
    createdAt: new Date('2024-01-14')
  },

  // GRAY HOODIE
  {
    id: 'h-gray',
    name: 'Gray Hoodie',
    category: 'hoodies',
    price: 65,
    images: [
      'https://wantsandneeds.com/cdn/shop/files/Gray_hoodie_front.jpg?v=1755069595&width=3509',
      'https://wantsandneeds.com/cdn/shop/files/Gray_hoodie_back_blnk.jpg?v=1758236518&width=3734'
    ],
    description: 'Classic pullover hoodie in versatile gray. Features front pocket and adjustable drawstrings for ultimate comfort.',
    sizes: {
      small: 5,
      medium: 5,
      large: 5,
      xlarge: 5
    },
    colors: ['Gray'],
    isNew: true,
    featured: true,
    createdAt: new Date('2024-01-12')
  },
  // BLACK HOODIE
  {
    id: 'h-black',
    name: 'Black Hoodie',
    category: 'hoodies',
    price: 65,
    images: [
      'https://wantsandneeds.com/cdn/shop/files/Black_hoodie_front.jpg?v=1755069119&width=3510',
      'https://wantsandneeds.com/cdn/shop/files/Black_hoodie_back_blnk.png?v=1758236586&width=3769'
    ],
    description: 'Essential black hoodie with clean design. Heavyweight cotton construction for warmth and durability.',
    sizes: {
      small: 5,
      medium: 5,
      large: 5,
      xlarge: 5
    },
    colors: ['Black'],
    isNew: true,
    featured: true,
    createdAt: new Date('2024-01-10')
  }
];