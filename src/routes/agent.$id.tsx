import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CounterNumber } from "@/components/shared/CounterNumber";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { agents, properties, type Agent } from "@/lib/data";

export const Route = createFileRoute("/agent/$id")({
  head: ({ params }) => {
    const a = agents.find((x) => x.id === params.id);
    const title = a ? `${a.name} — HavenlyEst` : "Agent — HavenlyEst";
    const desc = a ? `${a.role} at HavenlyEst. ${a.propertiesSold} properties sold.` : "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(a?.image ? [{ property: "og:image", content: a.image }] : []),
      ],
    };
  },
  loader: ({ params }): { agent: Agent } => {
    const agent = agents.find((a) => a.id === params.id);
    if (!agent) throw notFound();
    return { agent };
  },
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-4xl font-bold">Agent not found</h1>
      <Link to="/agent" className="mt-4 inline-block text-primary hover:underline">← Back to agents</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: AgentDetail,
});

function AgentDetail() {
  const { agent } = Route.useLoaderData() as { agent: Agent };
  const listings = properties.filter((p) => agent.propertyIds.includes(p.slug));
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please complete the form");
      return;
    }
    toast.success(`Message sent to ${agent.name}`);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <>
      <section className="section-y bg-background">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="aspect-[4/5] overflow-hidden rounded-3xl shadow-lift"
          >
            <img src={agent.image} alt={agent.name} className="h-full w-full object-cover" />
          </motion.div>
          <div>
            <p className="label-eyebrow mb-3">{agent.role}</p>
            <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">{agent.name}</h1>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-ink">{agent.rating}</span>
              <span className="text-muted-foreground">({agent.reviews} reviews)</span>
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">{agent.bio}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {agent.specializations.map((s) => (
                <span key={s} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{s}</span>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <a href={`mailto:${agent.email}`}>
                <MagneticButton variant="green"><Mail className="h-4 w-4" /> Email {agent.name.split(" ")[0]}</MagneticButton>
              </a>
              <a href={agent.linkedin}>
                <MagneticButton variant="outline"><Linkedin className="h-4 w-4" /> LinkedIn</MagneticButton>
              </a>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection className="bg-surface section-y">
        <div className="container-x grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: "Properties sold", value: agent.propertiesSold, prefix: "+", suffix: "" },
            { label: "Years experience", value: agent.yearsExperience, prefix: "", suffix: "" },
            { label: "Reviews", value: agent.reviews, prefix: "+", suffix: "" },
            { label: "Cities", value: 6, prefix: "", suffix: "" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <p className="font-display text-4xl font-bold text-primary md:text-5xl">
                <CounterNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {listings.length > 0 && (
        <AnimatedSection className="section-y bg-background">
          <div className="container-x">
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Current listings</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {listings.map((p) => <PropertyCard key={p.slug} property={p} />)}
            </div>
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection className="section-y bg-surface">
        <div className="container-x mx-auto max-w-2xl">
          <p className="label-eyebrow mb-4 text-center">Get in touch</p>
          <h2 className="text-center font-display text-3xl font-bold text-ink md:text-4xl">Send {agent.name.split(" ")[0]} a message</h2>
          <form onSubmit={submit} className="mt-8 space-y-3 rounded-3xl border border-border bg-card p-7 shadow-soft">
            <SimpleField label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
            <SimpleField label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                rows={4}
                className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <MagneticButton variant="green" className="w-full">Send Message</MagneticButton>
          </form>
        </div>
      </AnimatedSection>
    </>
  );
}

function SimpleField({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
