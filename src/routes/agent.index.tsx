import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedSection, staggerContainer, staggerItem } from "@/components/shared/AnimatedSection";
import { AgentCard } from "@/components/shared/AgentCard";
import { agents } from "@/lib/data";

export const Route = createFileRoute("/agent/")({
  head: () => ({
    meta: [
      { title: "Meet our agents — HavenlyEst" },
      { name: "description", content: "Work with vetted, salaried HavenlyEst agents specialized in buying, selling, and commercial real estate." },
      { property: "og:title", content: "Meet our agents — HavenlyEst" },
      { property: "og:description", content: "Vetted, salaried agents across buying, selling, and commercial." },
    ],
  }),
  component: AgentList,
});

const tabs = ["All", "Buying", "Selling", "Commercial"] as const;

function AgentList() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const filtered = tab === "All" ? agents : agents.filter((a) => a.specializations.includes(tab));

  return (
    <>
      <section className="bg-surface py-16 md:py-24">
        <div className="container-x">
          <p className="label-eyebrow mb-4">Our team</p>
          <h1 className="font-display text-4xl font-bold text-ink md:text-6xl">Meet our expert agents</h1>
          <p className="mt-4 max-w-xl text-base text-ink-soft">
            Every HavenlyEst agent is vetted, salaried, and rewarded for client outcomes — not transaction count.
          </p>

          <div className="relative mt-10 inline-flex rounded-full border border-border bg-card p-1 shadow-soft">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  tab === t ? "text-primary-foreground" : "text-ink-soft hover:text-ink"
                }`}
              >
                {tab === t && (
                  <motion.span
                    layoutId="agent-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection className="section-y bg-background">
        <div className="container-x">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((a) => (
              <motion.div key={a.id} variants={staggerItem}>
                <AgentCard agent={a} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </>
  );
}
