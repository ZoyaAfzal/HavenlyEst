import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bath, BedDouble, Calendar, Car, CheckCircle2, Home, MapPin, Maximize2, Ruler } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AnimatedSection, staggerContainer, staggerItem } from "@/components/shared/AnimatedSection";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { agents, properties } from "@/lib/data";

export const Route = createFileRoute("/property/$slug")({
  head: ({ params }) => {
    const p = properties.find((x) => x.slug === params.slug);
    const title = p ? `${p.name} — HavenlyEst` : "Property — HavenlyEst";
    const desc = p ? `${p.name} in ${p.city}. ${p.beds} bed, ${p.baths} bath, ${p.area}m².` : "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(p?.images[0] ? [{ property: "og:image", content: p.images[0] }] : []),
      ],
    };
  },
  loader: ({ params }): { property: (typeof properties)[number] } => {
    const property = properties.find((p) => p.slug === params.slug);
    if (!property) throw notFound();
    return { property };
  },
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-4xl font-bold">Property not found</h1>
      <Link to="/property" className="mt-4 inline-block text-primary hover:underline">← Back to listings</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property } = Route.useLoaderData() as { property: (typeof properties)[number] };
  const agent = agents.find((a) => a.id === property.agentId);
  const related = properties.filter((p) => p.slug !== property.slug).slice(0, 3);
  const [active, setActive] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "10:00" });

  function submitVisit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.date) {
      toast.error("Please fill out all fields");
      return;
    }
    toast.success(`Visit booked for ${form.date} at ${form.time}`);
    setForm({ name: "", email: "", date: "", time: "10:00" });
  }

  const formattedPrice =
    property.status === "For Rent"
      ? `$${property.price.toLocaleString()}/mo`
      : `$${property.price.toLocaleString()}`;

  return (
    <>
      <section className="border-b border-border bg-surface py-6">
        <div className="container-x flex flex-wrap items-center gap-2 text-xs text-ink-soft">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/property" className="hover:text-primary">Property</Link>
          <span>/</span>
          <span className="text-ink">{property.name}</span>
        </div>
      </section>

      <section className="bg-background pt-8">
        <div className="container-x">
          <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-[4/3] overflow-hidden rounded-3xl shadow-soft"
            >
              <img src={property.images[active]} alt={property.name} className="h-full w-full object-cover" />
            </motion.div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
              {property.images.slice(0, 4).map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`aspect-[4/3] overflow-hidden rounded-2xl border-2 transition-all ${active === i ? "border-primary" : "border-transparent"}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container-x grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{property.status}</span>
              <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink">{property.type}</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold text-ink md:text-5xl">{property.name}</h1>
            <p className="mt-3 flex items-center gap-2 text-base text-ink-soft">
              <MapPin className="h-4 w-4 text-primary" /> {property.city}
            </p>
            <p className="mt-4 font-display text-4xl font-bold text-primary">{formattedPrice}</p>

            <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <Stat icon={BedDouble} label="Bedrooms" value={`${property.beds}`} />
              <Stat icon={Bath} label="Bathrooms" value={`${property.baths}`} />
              <Stat icon={Maximize2} label="Area" value={`${property.area}m²`} />
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold text-ink">About this property</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{property.description}</p>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold text-ink">Property features</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {property.features.map((f) => (
                  <span key={f} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft md:grid-cols-3">
              <Stat icon={Home} label="Year built" value={`${property.yearBuilt}`} />
              <Stat icon={Ruler} label="Lot size" value={property.lotSize} />
              <Stat icon={Car} label="Garage" value={`${property.garage}`} />
            </div>

            {agent && (
              <div className="mt-10 flex flex-col gap-5 rounded-3xl border border-border bg-surface p-6 sm:flex-row sm:items-center">
                <img src={agent.image} alt={agent.name} className="h-20 w-20 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="label-eyebrow">Listing agent</p>
                  <p className="mt-1 font-display text-lg font-semibold text-ink">{agent.name}</p>
                  <p className="text-sm text-ink-soft">{agent.role}</p>
                </div>
                <Link to="/agent/$id" params={{ id: agent.id }}>
                  <MagneticButton variant="green">Contact Agent</MagneticButton>
                </Link>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <form onSubmit={submitVisit} className="rounded-3xl border border-border bg-card p-6 shadow-lift">
              <p className="label-eyebrow">Schedule a visit</p>
              <h3 className="mt-2 font-display text-xl font-bold text-ink">Book a tour</h3>
              <div className="mt-5 space-y-3">
                <Field label="Date" type="date" value={form.date} onChange={(v) => setForm((f) => ({ ...f, date: v }))} icon={Calendar} />
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Time</label>
                  <select
                    value={form.time}
                    onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
                  >
                    {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <Field label="Your name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
                <MagneticButton variant="green" className="w-full">Book Visit</MagneticButton>
              </div>
            </form>
          </aside>
        </div>
      </section>

      <AnimatedSection className="section-y bg-surface">
        <div className="container-x">
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Related properties</h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <motion.div key={p.slug} variants={staggerItem}>
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Home; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-surface text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="font-display text-base font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", icon: Icon }: { label: string; value: string; onChange: (v: string) => void; type?: string; icon?: typeof Calendar }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <div className="mt-1 flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5 focus-within:border-primary">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent text-sm outline-none" />
      </div>
    </div>
  );
}
