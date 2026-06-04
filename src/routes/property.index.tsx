import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { AnimatedSection, staggerContainer, staggerItem } from "@/components/shared/AnimatedSection";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { properties } from "@/lib/data";

export const Route = createFileRoute("/property/")({
  head: () => ({
    meta: [
      { title: "Properties — HavenlyEst" },
      { name: "description", content: "Browse curated homes, apartments, villas, and commercial listings across the United States." },
      { property: "og:title", content: "Properties — HavenlyEst" },
      { property: "og:description", content: "Browse curated listings across the United States." },
    ],
  }),
  component: PropertyList,
});

const types = ["All", "House", "Apartment", "Villa", "Commercial"] as const;
const bedFilters = ["Any", "1", "2", "3", "4+"] as const;

function PropertyList() {
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [beds, setBeds] = useState<(typeof bedFilters)[number]>("Any");
  const [maxPrice, setMaxPrice] = useState(2500000);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (type !== "All" && p.type !== type) return false;
      if (beds !== "Any") {
        if (beds === "4+" ? p.beds < 4 : p.beds !== Number(beds)) return false;
      }
      if (p.status === "For Sale" && p.price > maxPrice) return false;
      if (query && !`${p.name} ${p.city} ${p.address}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [type, beds, maxPrice, query]);

  return (
    <>
      <section className="bg-surface py-16 md:py-24">
        <div className="container-x">
          <p className="label-eyebrow mb-4">All properties</p>
          <h1 className="font-display text-4xl font-bold text-ink md:text-6xl">Find your perfect property</h1>
          <p className="mt-4 max-w-xl text-base text-ink-soft">
            {filtered.length} curated listings updated daily — every home personally walked by our team.
          </p>
          <div className="mt-8 flex items-center gap-2 rounded-full border border-border bg-card p-2 shadow-soft md:max-w-2xl">
            <span className="grid h-10 w-10 place-items-center text-muted-foreground">
              <Search className="h-4 w-4" />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search by city, neighborhood, or property name"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <MagneticButton variant="green" size="sm">Search</MagneticButton>
          </div>
        </div>
      </section>

      <AnimatedSection className="section-y bg-background">
        <div className="container-x grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold text-ink">Filters</h2>
            </div>

            <div className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="label-eyebrow">Property type</p>
              <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      type === t ? "bg-primary text-primary-foreground" : "bg-surface text-ink hover:bg-border"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="label-eyebrow">Bedrooms</p>
              <div className="flex flex-wrap gap-2">
                {bedFilters.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBeds(b)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      beds === b ? "bg-primary text-primary-foreground" : "bg-surface text-ink hover:bg-border"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="label-eyebrow">Max price</p>
              <input
                type="range"
                min={250000}
                max={2500000}
                step={50000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[var(--color-primary)]"
              />
              <p className="text-sm font-semibold text-ink">${maxPrice.toLocaleString()}</p>
            </div>

            <button
              type="button"
              onClick={() => { setType("All"); setBeds("Any"); setMaxPrice(2500000); setQuery(""); }}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-ink hover:border-primary"
            >
              <Filter className="h-4 w-4" /> Reset filters
            </button>
          </aside>

          <div>
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-surface p-16 text-center">
                <p className="font-display text-xl font-semibold text-ink">No properties match your filters.</p>
                <p className="mt-2 text-sm text-ink-soft">Try widening your range or resetting filters.</p>
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filtered.map((p) => (
                  <motion.div key={p.slug} variants={staggerItem}>
                    <PropertyCard property={p} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="mt-12 flex items-center justify-center gap-2">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold ${
                    n === 1 ? "bg-primary text-primary-foreground" : "border border-border bg-card text-ink hover:border-primary"
                  }`}
                >
                  {n}
                </button>
              ))}
              <Link to="/contact" className="ml-4 text-sm font-semibold text-primary hover:underline">
                Can't find it? Ask us →
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
