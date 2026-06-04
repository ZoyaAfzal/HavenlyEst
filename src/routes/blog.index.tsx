import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { AnimatedSection, staggerContainer, staggerItem } from "@/components/shared/AnimatedSection";
import { BlogCard } from "@/components/shared/BlogCard";
import { blogPosts } from "@/lib/data";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — HavenlyEst" },
      { name: "description", content: "Real estate insights, market trends, buying tips, and lifestyle stories from HavenlyEst." },
      { property: "og:title", content: "Blog — HavenlyEst" },
      { property: "og:description", content: "Insights, trends, and lifestyle stories." },
    ],
  }),
  component: BlogList,
});

const categories = ["All", "Buying Tips", "Market Trends", "Investment", "Lifestyle"] as const;

function BlogList() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [visible, setVisible] = useState(6);
  const filtered = useMemo(() => (cat === "All" ? blogPosts : blogPosts.filter((p) => p.category === cat)), [cat]);

  return (
    <>
      <section className="bg-surface py-16 md:py-24">
        <div className="container-x">
          <p className="label-eyebrow mb-4">Insights</p>
          <h1 className="font-display text-4xl font-bold text-ink md:text-6xl">Explore the latest in real estate</h1>
          <p className="mt-4 max-w-xl text-base text-ink-soft">
            Practical advice, market intel, and stories from our agents and clients across the country.
          </p>

          <div className="relative mt-10 inline-flex flex-wrap rounded-full border border-border bg-card p-1 shadow-soft">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  cat === c ? "text-primary-foreground" : "text-ink-soft hover:text-ink"
                }`}
              >
                {cat === c && (
                  <motion.span layoutId="blog-tab" className="absolute inset-0 -z-10 rounded-full bg-primary" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
                )}
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection className="section-y bg-background">
        <div className="container-x">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, visible).map((p) => (
              <motion.div key={p.slug} variants={staggerItem}>
                <BlogCard post={p} />
              </motion.div>
            ))}
          </motion.div>
          {visible < filtered.length && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + 3)}
                className="rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </AnimatedSection>
    </>
  );
}
