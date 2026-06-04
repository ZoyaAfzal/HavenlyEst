import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Compass, HeartHandshake, Leaf, Shield, Sparkles } from "lucide-react";
import { AnimatedSection, staggerContainer, staggerItem } from "@/components/shared/AnimatedSection";
import { AgentCard } from "@/components/shared/AgentCard";
import { CounterNumber } from "@/components/shared/CounterNumber";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { IMAGES, agents, stats } from "@/lib/data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About HavenlyEst — Built on trust" },
      { name: "description", content: "Our story, mission, and the team behind HavenlyEst's premium property service." },
      { property: "og:title", content: "About HavenlyEst" },
      { property: "og:description", content: "Our story, mission, and the team behind HavenlyEst." },
    ],
  }),
  component: About,
});

const milestones = [
  { year: "2010", title: "Founded in San Francisco", desc: "Two former architects open a boutique agency focused on design-led listings." },
  { year: "2014", title: "First 1,000 transactions", desc: "Expanded to Los Angeles and Seattle with a vetted agent network." },
  { year: "2018", title: "HavenlyEst rebrand", desc: "Launched our digital platform and dedicated transaction coordinators." },
  { year: "2021", title: "10,000+ families served", desc: "Crossed a milestone we never imagined when we started." },
  { year: "2024", title: "Buyback guarantee launched", desc: "First major brand to back every sale with a 12-month repurchase option." },
];

const values = [
  { icon: Shield, title: "Integrity first", desc: "We say no to deals that aren't right, even when the commission is good." },
  { icon: HeartHandshake, title: "Client outcomes", desc: "Our agents are salaried so they're never incentivized to push a sale." },
  { icon: Compass, title: "Local expertise", desc: "Every market has its own rhythms. Our teams live where they sell." },
  { icon: Sparkles, title: "Design taste", desc: "A founder background in architecture shapes how we curate listings." },
  { icon: Leaf, title: "Built to last", desc: "We invest in long-term relationships, not transactions." },
  { icon: Award, title: "Quality bar", desc: "Every listing is personally walked before it goes on the platform." },
];

function About() {
  return (
    <>
      <section className="section-y bg-background">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="label-eyebrow mb-4">About HavenlyEst</p>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-ink md:text-6xl">
              Built on trust. Focused on your future.
            </h1>
            <p className="mt-6 max-w-lg text-base text-ink-soft">
              Since 2010, HavenlyEst has helped families and investors find homes that feel right. We blend old-school relationship work with the calmest, most modern home-buying experience anywhere.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/property"><MagneticButton variant="green">Explore Property</MagneticButton></Link>
              <Link to="/contact"><MagneticButton variant="outline">Contact us</MagneticButton></Link>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="aspect-[4/5] overflow-hidden rounded-3xl shadow-lift"
          >
            <img src={IMAGES.modern1} alt="HavenlyEst home" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <AnimatedSection className="section-y bg-surface">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-primary p-10 text-primary-foreground shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Our mission</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
              Make finding home the calmest part of your year.
            </h2>
            <p className="mt-4 text-white/85">
              We treat every transaction like our own patient, careful, and focused on long-term fit, not short-term closings.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-10 shadow-soft">
            <p className="label-eyebrow">Our vision</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-ink md:text-4xl">
              A real estate industry that earns the trust people give it.
            </h2>
            <p className="mt-4 text-ink-soft">
              Salaried agents. Vetted listings. Honest market intel. A 12-month buyback. We're building the standard we wish existed when we started.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-y bg-background">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="label-eyebrow mb-4">Our story</p>
            <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">Fourteen years of compounding trust</h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="relative pl-8">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                style={{ transformOrigin: "top" }}
                className="absolute left-3 top-1 h-full w-0.5 bg-primary"
              />
              <ul className="space-y-10">
                {milestones.map((m, i) => (
                  <motion.li
                    key={m.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="relative"
                  >
                    <span className="absolute -left-8 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      ●
                    </span>
                    <p className="font-display text-sm font-semibold uppercase tracking-wider text-primary">{m.year}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-ink">{m.title}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{m.desc}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-y bg-surface">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
                <p className="font-display text-4xl font-bold text-primary md:text-5xl">
                  <CounterNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-y bg-background">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="label-eyebrow mb-4">Our team</p>
            <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">The people behind every deal</h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {agents.map((a) => (
              <motion.div key={a.id} variants={staggerItem}>
                <AgentCard agent={a} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-y bg-surface">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="label-eyebrow mb-4">Values</p>
            <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">What we stand for</h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="grid h-11 w-11 place-items-center rounded-full bg-accent text-accent-foreground">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </>
  );
}
