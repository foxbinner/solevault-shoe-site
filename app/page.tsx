import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import EditorialSplit from "@/components/EditorialSplit";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { gridProducts, products } from "@/lib/products";

const trustItems = [
  "Free Returns",
  "Handcrafted",
  "Premium Materials",
  "2-Year Warranty",
];

const bestsellers = products.slice(0, 4);

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      <section className="border-y border-[--border] bg-[--bg-card] py-6">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-center gap-x-2 gap-y-2 px-8 md:justify-between">
          {trustItems.map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              <p className="font-sans text-xs uppercase tracking-widest text-[--text-muted]">
                {item}
              </p>
              {i < trustItems.length - 1 && (
                <span className="hidden text-[--border] md:inline">·</span>
              )}
            </span>
          ))}
        </div>
      </section>

      <section
        id="products-section"
        className="mx-auto w-full max-w-[1440px] px-8 py-24"
      >
        <div className="grid gap-8 md:grid-cols-3 md:items-end md:justify-between">
          <div className="md:col-span-2">
            <SectionLabel>Curated Selection</SectionLabel>
            <h2 className="mt-3 font-display text-4xl italic">New Arrivals</h2>
          </div>
          <div className="md:justify-self-end">
            <Button variant="ghost" href="#bestsellers">
              View All →
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gridProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <EditorialSplit />

      <section id="materials" className="scroll-mt-20 border-t border-[--border] py-24">
        <div className="mx-auto grid w-full max-w-[1440px] px-8 md:grid-cols-3">
          {[
            {
              no: "01",
              title: "Leather",
              copy: "Full-grain vegetable-tanned hide, aged to character.",
            },
            {
              no: "02",
              title: "Cork",
              copy: "Harvested without harm, naturally shock-absorbing.",
            },
            {
              no: "03",
              title: "Recycled",
              copy: "Reclaimed rubber outsoles, zero-waste finishing.",
            },
          ].map((material, idx) => (
            <div
              key={material.no}
              className={`px-0 py-8 md:px-12 ${idx < 2 ? "md:border-r md:border-[--border]" : ""}`}
            >
              <p className="font-display text-7xl text-[--border]">
                {material.no}
              </p>
              <p className="mt-4 font-sans text-xs uppercase tracking-[0.2em]">
                {material.title}
              </p>
              <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-[--text-muted]">
                {material.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-[--text] py-12 text-[--bg]">
        <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
          <p className="font-display text-2xl italic">
            — AIR VAULT 01 — OBSIDIAN LOW — CREST MULE — SAND RUNNER — DUSK BOOT
            — PAVE SLIP —
          </p>
          <p className="font-display text-2xl italic">
            — AIR VAULT 01 — OBSIDIAN LOW — CREST MULE — SAND RUNNER — DUSK BOOT
            — PAVE SLIP —
          </p>
        </div>
      </section>

      <section
        id="bestsellers"
        className="mx-auto w-full max-w-[1440px] px-8 py-24"
      >
        <div className="grid gap-8 md:grid-cols-3 md:items-end md:justify-between">
          <div className="md:col-span-2">
            <SectionLabel>Customer Favorites</SectionLabel>
            <h2 className="mt-3 font-display text-4xl italic">Bestsellers</h2>
          </div>
          <div className="md:justify-self-end">
            <Button variant="ghost" href="#hero-slider">
              Back to Top ↑
            </Button>
          </div>
        </div>
        <Divider className="mt-10" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
