import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Award,
  Bus,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  GraduationCap,
  Home as HomeIcon,
  Mountain,
  Search,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { AnimatedSection, staggerContainer, staggerItem } from "@/components/shared/AnimatedSection";
import { CounterNumber } from "@/components/shared/CounterNumber";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { BlogCard } from "@/components/shared/BlogCard";
import { IMAGES, blogPosts, properties, stats, testimonials } from "@/lib/data";

/* ---------- HERO ---------- */
export function HeroSection() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, -60]);
  const headline = ["Find", "your", "dream", "home", "with", "HavenlyEst"];

  return (
    <section className="relative overflow-hidden bg-background pt-10 pb-32 md:pt-16 md:pb-40">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="flex -space-x-3">
              {[IMAGES.agentW, IMAGES.agentM, IMAGES.agent3, IMAGES.couple, IMAGES.family].map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt=""
                  initial={{ opacity: 0, scale: 0.6, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 220 }}
                  className="h-9 w-9 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div className="text-xs text-ink-soft">
              <span className="mr-1.5 text-accent">★★★★☆</span>
              Trusted by 40+ clients
            </div>
          </motion.div>

          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
            {headline.map((word, i) => (
              <span key={i} className="mr-3 inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`inline-block ${word === "HavenlyEst" ? "text-primary" : ""}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 max-w-lg text-base text-ink-soft md:text-lg"
          >
            Explore top listings, schedule visits in a tap, and work with vetted agents who actually listen. A calmer way to buy, sell, or rent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link to="/property">
              <MagneticButton variant="yellow" size="lg">
                Explore Property <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
            <Link to="/contact" className="text-sm font-semibold text-ink hover:text-primary">
              Talk to an advisor →
            </Link>
          </motion.div>
        </div>

        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
            <img src={IMAGES.hero} alt="Featured home" className="h-full w-full object-cover" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute -left-4 bottom-10 hidden rounded-2xl border border-border bg-card p-4 shadow-lift md:flex md:items-center md:gap-3"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-ink">+112 new homes</p>
              <p className="text-muted-foreground">listed this week</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="container-x relative mt-16"
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-3 rounded-3xl border border-border bg-card p-4 shadow-lift md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] md:gap-2 md:p-3"
        >
          <SearchField label="Location" placeholder="San Francisco" />
          <SearchField label="Property Type" placeholder="Any" />
          <SearchField label="Price Range" placeholder="$0 — $1.5M" />
          <SearchField label="Bedrooms" placeholder="2+" />
          <Link to="/property" className="md:justify-self-end">
            <MagneticButton variant="green" className="w-full md:w-auto">
              <Search className="h-4 w-4" /> Search
            </MagneticButton>
          </Link>
        </form>
      </motion.div>
    </section>
  );
}

function SearchField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="rounded-2xl px-4 py-2 hover:bg-surface">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-ink-soft"
      />
    </div>
  );
}

/* ---------- TRUST / STATS ---------- */
export function TrustSection() {
  return (
    <AnimatedSection className="section-y bg-background">
      <div className="container-x">
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <div>
            <p className="label-eyebrow mb-4">Why HavenlyEst</p>
            <h2 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
              Built on trust & focused on your future
            </h2>
          </div>
          <p className="text-base text-ink-soft">
            We've helped thousands of families and investors find homes that fit how they actually live not how the market wants them to live. Our agents are vetted, salaried, and incentivized for outcomes, not transactions.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={staggerItem} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="font-display text-4xl font-bold text-primary md:text-5xl">
                <CounterNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {[
            { src: IMAGES.modern1, h: "h-64 md:h-80" },
            { src: IMAGES.family, h: "h-56 md:h-72 mt-6 md:mt-12" },
            { src: IMAGES.modern2, h: "h-64 md:h-72" },
            { src: IMAGES.couple, h: "h-56 md:h-80 mt-6 md:mt-6" },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className={`overflow-hidden rounded-2xl shadow-soft ${img.h}`}
            >
              <img src={img.src} alt="" className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ---------- WHY CHOOSE ---------- */
const features = [
  { icon: Award, title: "Expert Guidance", desc: "Vetted, full-time agents with 10+ years experience on average." },
  { icon: HomeIcon, title: "Premium Property Selection", desc: "Each listing personally reviewed before it reaches your shortlist." },
  { icon: Shield, title: "Stress-Free Process", desc: "From offer to closing, we coordinate every detail on your behalf." },
  { icon: TrendingUp, title: "Proven Track Record", desc: "99% client satisfaction across 17K+ successful transactions." },
];

export function WhyChooseSection() {
  return (
    <AnimatedSection className="section-y bg-surface">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="aspect-[4/5] overflow-hidden rounded-3xl shadow-lift"
          >
            <img src={IMAGES.exterior} alt="House exterior" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="absolute -bottom-8 -right-4 aspect-square w-2/3 overflow-hidden rounded-3xl border-4 border-background shadow-lift"
          >
            <img src={IMAGES.couple} alt="Consultation" className="h-full w-full object-cover" />
          </motion.div>
          <motion.svg
            viewBox="0 0 120 80"
            className="absolute -top-6 right-8 hidden h-16 w-24 md:block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.path
              d="M5,40 C30,5 60,75 115,30"
              stroke="oklch(0.88 0.17 95)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              variants={{
                hidden: { pathLength: 0 },
                visible: { pathLength: 1, transition: { duration: 1.5, ease: "easeInOut" } },
              }}
            />
          </motion.svg>
        </div>

        <div>
          <p className="label-eyebrow mb-4">Why choose us</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
            A smarter way to discover, evaluate, and own
          </h2>
          <p className="mt-4 text-base text-ink-soft">
            Four reasons our clients keep coming back and refer their friends.
          </p>
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 space-y-4"
          >
            {features.map((f) => (
              <motion.li
                key={f.title}
                variants={staggerItem}
                whileHover={{ x: 4 }}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lift"
              >
                <motion.span
                  whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.4 }}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"
                >
                  <f.icon className="h-5 w-5" />
                </motion.span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{f.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{f.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ---------- PROPERTY LISTINGS ---------- */
export function PropertyListings() {
  const [index, setIndex] = useState(0);
  const visible = 3;
  const max = properties.length - visible;

  return (
    <AnimatedSection className="section-y bg-background">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-eyebrow mb-4">Featured listings</p>
            <h2 className="max-w-xl font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
              HavenlyEst's exclusive property listings
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-ink transition-transform hover:scale-110 hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => Math.min(max, i + 1))}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-ink transition-transform hover:scale-110 hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <Link to="/property" className="ml-2">
              <MagneticButton variant="yellow" size="sm">Explore Property →</MagneticButton>
            </Link>
          </div>
        </div>

        <div className="mt-10 overflow-hidden">
          <motion.div
            animate={{ x: `calc(-${index} * (100% / 3) - ${index} * 0.5rem)` }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="flex gap-6"
          >
            {properties.map((p) => (
              <div key={p.slug} className="w-full shrink-0 md:w-[calc((100%-3rem)/2)] lg:w-[calc((100%-3rem)/3)]">
                <PropertyCard property={p} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ---------- HOW IT WORKS ---------- */
const steps = [
  { icon: HomeIcon, title: "Discover House", desc: "Browse curated listings tailored to your criteria." },
  { icon: Calendar, title: "Schedule to Visit", desc: "Book in-person or virtual tours in one tap." },
  { icon: CreditCard, title: "Hassle-Free Purchase", desc: "We handle paperwork, financing, and inspections." },
  { icon: Shield, title: "Buyback Guarantee", desc: "Change of plans? We'll repurchase within 12 months." },
];

const processPanels = [
  {
    title: "Find the perfect house",
    image: IMAGES.modern1,
    bullets: [
      "AI-personalized recommendations refreshed daily",
      "Save searches and get instant alerts",
      "Detailed neighborhood reports for every listing",
    ],
  },
  {
    title: "Tour without the friction",
    image: IMAGES.living,
    bullets: [
      "One-tap virtual or in-person showings",
      "Recorded walk-throughs for every visit",
      "Live Q&A with the listing agent",
    ],
  },
  {
    title: "Close with confidence",
    image: IMAGES.kitchen,
    bullets: [
      "Pre-underwritten offers move first",
      "Dedicated transaction coordinator",
      "Buyback guarantee within 12 months",
    ],
  },
];

export function HowItWorksSection() {
  const [panel, setPanel] = useState(0);
  return (
    <section className="bg-primary text-primary-foreground">
      <AnimatedSection className="section-y">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">How it works</p>
            <h2 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
              The seamless way to buy property
            </h2>
          </div>

          <div className="relative mt-12 grid gap-8 md:grid-cols-4">
            <motion.svg
              viewBox="0 0 1000 4"
              preserveAspectRatio="none"
              className="pointer-events-none absolute left-0 right-0 top-7 hidden h-1 w-full md:block"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.path
                d="M50,2 L950,2"
                stroke="oklch(0.88 0.17 95)"
                strokeWidth="2"
                strokeDasharray="6 8"
                fill="none"
                variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.6, ease: "easeInOut" } } }}
              />
            </motion.svg>
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className={`grid h-14 w-14 place-items-center rounded-full bg-white text-primary ${i === 0 ? "ring-4 ring-accent" : ""}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 max-w-[200px] text-sm text-white/75">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 overflow-hidden rounded-3xl bg-card text-ink shadow-lift">
            <AnimatePresence mode="wait">
              <motion.div
                key={panel}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="grid gap-0 md:grid-cols-2"
              >
                <div className="aspect-[4/3] overflow-hidden md:aspect-auto">
                  <img src={processPanels[panel].image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col justify-between gap-8 p-8 md:p-10">
                  <div>
                    <p className="label-eyebrow mb-3">Step {panel + 1} of 3</p>
                    <h3 className="font-display text-3xl font-bold text-ink">{processPanels[panel].title}</h3>
                    <ul className="mt-6 space-y-3">
                      {processPanels[panel].bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-ink-soft">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {processPanels.map((_, i) => (
                        <span key={i} className={`h-1.5 rounded-full transition-all ${i === panel ? "w-8 bg-primary" : "w-3 bg-border"}`} />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPanel((p) => (p === 0 ? processPanels.length - 1 : p - 1))}
                        aria-label="Previous step"
                        className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink hover:bg-surface"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPanel((p) => (p + 1) % processPanels.length)}
                        aria-label="Next step"
                        className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary-light"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

/* ---------- UNLOCK VALUE ---------- */
const valueCards = [
  { icon: GraduationCap, title: "Schools", desc: "School quality scores for every listing." },
  { icon: Bus, title: "Public Transport", desc: "Transit access and walk scores." },
  { icon: TrendingUp, title: "Market Comparison", desc: "See how prices compare nearby." },
  { icon: Mountain, title: "Natural Hazards", desc: "Climate and hazard reports included." },
];

export function UnlockValueSection() {
  return (
    <AnimatedSection className="section-y bg-background">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-eyebrow mb-4">Beyond the listing</p>
            <h2 className="max-w-xl font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
              Unlock more value with HavenlyEst
            </h2>
          </div>
          <Link to="/property">
            <MagneticButton variant="yellow" size="sm">Explore Property →</MagneticButton>
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-3 md:gap-6"
        >
          {[
            <ValueTextCard key="s" {...valueCards[0]} />,
            <motion.div key="i1" variants={staggerItem} whileHover={{ scale: 1.02 }} className="row-span-2 overflow-hidden rounded-3xl">
              <img src={IMAGES.modern2} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </motion.div>,
            <ValueTextCard key="m" {...valueCards[2]} />,
            <ValueTextCard key="t" {...valueCards[1]} />,
            <ValueTextCard key="n" {...valueCards[3]} />,
          ]}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

function ValueTextCard({ icon: Icon, title, desc }: { icon: typeof GraduationCap; title: string; desc: string }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4 }}
      className="flex flex-col justify-between rounded-3xl border border-border bg-surface p-6 transition-shadow hover:shadow-soft"
    >
      <div className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm text-ink-soft">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ---------- TESTIMONIALS ---------- */
export function TestimonialsSection() {
  const [start, setStart] = useState(0);
  const max = testimonials.length - 2;
  const visible = [testimonials[start], testimonials[start + 1]];

  return (
    <AnimatedSection className="section-y bg-surface">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label-eyebrow mb-4">Testimonials</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
            Hear from our happy customers
          </h2>
        </div>

        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={start}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {visible.filter(Boolean).map((t) => (
                <motion.div
                  key={t.id}
                  whileHover={{ y: -4 }}
                  className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                      <div>
                        <p className="font-display text-base font-semibold text-ink">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.company}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-primary">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="font-display text-lg italic text-ink">"{t.quote}"</p>
                  <div className="mt-auto flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span>{t.propertyName} · {t.propertyAddress}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setStart((s) => Math.max(0, s - 1))}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setStart((s) => Math.min(max, s + 1))}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ---------- BLOG PREVIEW ---------- */
export function BlogPreviewSection() {
  return (
    <AnimatedSection className="section-y bg-background">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-eyebrow mb-4">Insights</p>
            <h2 className="max-w-xl font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
              Explore the latest in real estate
            </h2>
          </div>
          <Link to="/blog">
            <MagneticButton variant="yellow" size="sm">View All Blog →</MagneticButton>
          </Link>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.slice(0, 3).map((p) => (
            <motion.div key={p.slug} variants={staggerItem}>
              <BlogCard post={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ---------- CTA BANNER ---------- */
export function CtaBannerSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [3000, 5000], [0, -80]);
  return (
    <section className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img src={IMAGES.cta} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
      </motion.div>
      <div className="container-x py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center text-white"
        >
          <h2 className="font-display text-4xl font-bold md:text-5xl text-white">
            Get in touch - find your dream home today
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-white/85">
            From the first showing to the final signature, HavenlyEst is the calm, capable partner that makes it happen.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/property">
              <MagneticButton variant="yellow" size="lg">
                Explore Property <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
            <Link to="/contact">
              <MagneticButton variant="ghost" size="lg" className="bg-white/10 text-white hover:bg-white/20">
                Contact us
              </MagneticButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
