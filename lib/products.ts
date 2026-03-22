import { Product } from "@/types";

export const products: Product[] = [
  {
    id: 1,
    name: "Casual Core Black",
    price: 89.99,
    oldPrice: 129.99,
    description:
      "Clean leather silhouette with a tonal sole and minimal branding — built for everyday wear.",
    image: "/images/shoe-1.jpg",
    hoverImage: "/images/shoe-1-alt.jpg",
    badge: "Bestseller",
    tagline: "Minimal. Everyday. Yours.",
  },
  {
    id: 2,
    name: "Casual Core",
    price: 74.99,
    oldPrice: 119.99,
    description:
      "Off-white leather and suede construction with a cushioned midsole for all-day comfort.",
    image: "/images/shoe-2.jpg",
    hoverImage: "/images/shoe-2-alt.jpg",
    badge: "New",
    tagline: "Street Style Redefined",
  },
  {
    id: 3,
    name: "Volcanic Edge",
    price: 119.99,
    oldPrice: 179.99,
    description:
      "Bold textured upper with aggressive tread and a high-contrast sole — for those who move with intention.",
    image: "/images/shoe-3.jpg",
    hoverImage: "/images/shoe-3-alt.jpg",
    badge: "Popular",
    tagline: "Edge Meets Street",
  },
  {
    id: 4,
    name: "Noir Craft",
    price: 64.99,
    oldPrice: 99.99,
    description:
      "All-black premium build with tonal stitching and a sculpted outsole for refined street presence.",
    image: "/images/shoe-4.jpg",
    hoverImage: "/images/shoe-4-alt.jpg",
    badge: "Sale",
    tagline: "Dark. Deliberate. Crafted.",
  },
  {
    id: 5,
    name: "Midnight Viper",
    price: 134.99,
    description:
      "Sleek panelled upper with a low-profile sole and contrast detailing — made for late-night energy.",
    image: "/images/shoe-5.jpg",
    hoverImage: "/images/shoe-5-alt.jpg",
    badge: "Pro",
  },
  {
    id: 6,
    name: "Forest Craft",
    price: 99.99,
    description:
      "Earth-tone mixed materials with natural textures and a grounded, trail-ready sole.",
    image: "/images/shoe-6.jpg",
    hoverImage: "/images/shoe-6-alt.jpg",
    badge: "Hot",
  },
  {
    id: 7,
    name: "Artisan Street",
    price: 59.99,
    description:
      "Handcrafted panelled design with artistic detailing and a premium suede trim.",
    image: "/images/shoe-7.jpg",
    hoverImage: "/images/shoe-7-alt.jpg",
    badge: "Trending",
  },
  {
    id: 8,
    name: "Cream Cheese",
    price: 149.99,
    description:
      "Cream-coloured street sneaker with camouflage suede overlay and a clean stacked sole.",
    image: "/images/shoe-8.jpg",
    hoverImage: "/images/shoe-8-alt.jpg",
    badge: "Premium",
  },
  {
    id: 9,
    name: "Archive One",
    price: 49.99,
    description:
      "Archive-inspired women's silhouette with a streamlined upper and vintage sole profile.",
    image: "/images/shoe-9.jpg",
    hoverImage: "/images/shoe-9-alt.jpg",
    badge: "Sale",
  },
  {
    id: 10,
    name: "Arctic Blaze",
    price: 109.99,
    description:
      "High-energy orange and white colourway with a chunky sole and bold contrast panels.",
    image: "/images/shoe-10.jpg",
    hoverImage: "/images/shoe-10-alt.jpg",
    badge: "New",
  },
];

export const bannerProducts = products.slice(0, 4);
export const gridProducts = products.slice(4);

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
