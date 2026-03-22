export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  image: string;
  hoverImage?: string;
  badge: string;
  tagline?: string;
}

export interface CartItem extends Product {
  cartKey: string; // unique key for each cart entry (allows duplicates)
}
