import { notFound } from 'next/navigation';
import { getProductById, products } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';
import type { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductById(Number(params.id));
  if (!product) return {};
  return {
    title: `${product.name} — SoleVault`,
    description: product.description,
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductById(Number(params.id));
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
