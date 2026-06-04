import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MagneticButton } from "@/components/shared/MagneticButton";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact HavenlyEst" },
      { name: "description", content: "Reach out to HavenlyEst for a personal consultation, agent introduction, or property question." },
      { property: "og:title", content: "Contact HavenlyEst" },
      { property: "og:description", content: "Talk to a real person — we typically reply within 2 hours." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", interest: "Buying", message: "" });
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill out name, email, and message");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent — we'll reply within 2 hours");
      setForm({ name: "", email: "", interest: "Buying", message: "" });
    }, 900);
  }

  return (
    <>
      <section className="section-y bg-background">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="label-eyebrow mb-4">Contact us</p>
            <h1 className="font-display text-4xl font-bold leading-tight text-ink md:text-6xl">Let's find your next home</h1>
            <p className="mt-4 text-base text-ink-soft">
              Whether you're starting your search or finalizing a deal, our team is one quick message away.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <form onSubmit={submit} className="space-y-4 rounded-3xl border border-border bg-card p-8 shadow-lift">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">I'm interested in</label>
                <select
                  value={form.interest}
                  onChange={(e) => setForm((f) => ({ ...f, interest: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
                >
                  {["Buying", "Selling", "Renting", "Investment", "Other"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  rows={5}
                  placeholder="Tell us a bit about what you're looking for..."
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <MagneticButton variant="green" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </MagneticButton>
            </form>

            <div className="space-y-4">
              {[
                { icon: Mail, title: "Email us", text: "hello@havenlyest.com\nWe reply within 2 hours" },
              ].map((c) => (
                <motion.div
                  key={c.title}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-ink">{c.title}</p>
                    <p className="mt-1 whitespace-pre-line text-sm text-ink-soft">{c.text}</p>
                  </div>
                </motion.div>
              ))}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <p className="label-eyebrow">Follow us</p>
                <div className="mt-3 flex gap-2">
                  {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" aria-label="Social" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-primary hover:text-primary">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
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
