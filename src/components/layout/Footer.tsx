import { Link } from "@tanstack/react-router";
import { ArrowRight, Facebook, Home, Instagram, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const columns = [
  {
    title: "Landings",
    links: [
      { label: "Homepage", to: "/" as const },
      { label: "About us", to: "/about" as const },
      { label: "Contact", to: "/contact" as const },
      { label: "Log In", to: "/login" as const },
      { label: "Register", to: "/register" as const },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Subscribed! Watch your inbox for our next update.");
    setEmail("");
  }

  return (
    <footer className="border-t border-border bg-white">
      <div className="container-x py-10">
        <div className="flex flex-col gap-4 border-b border-border pb-8 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Home className="h-4 w-4" />
            </span>
            <span className="font-display text-xl font-bold text-ink">HavenlyEst</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Contact Us: <a href="mailto:hello@havenlyest.com" className="text-ink hover:text-primary">hello@havenlyest.com</a>
          </p>
        </div>

        <div className="grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="label-eyebrow mb-4">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-ink-soft hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="label-eyebrow mb-4">Information</p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/property" className="text-ink-soft hover:text-primary">Property</Link></li>
              <li><Link to="/property/$slug" params={{ slug: "the-grand-haven" }} className="text-ink-soft hover:text-primary">Property Details</Link></li>
              <li><Link to="/agent" className="text-ink-soft hover:text-primary">Agent</Link></li>
              <li><Link to="/agent/$id" params={{ id: "amelia-chen" }} className="text-ink-soft hover:text-primary">Agent Details</Link></li>
              <li><Link to="/blog" className="text-ink-soft hover:text-primary">Blog</Link></li>
              <li><Link to="/blog/$slug" params={{ slug: "real-estate-tips-2025" }} className="text-ink-soft hover:text-primary">Blog Details</Link></li>
            </ul>
          </div>

          <div>
            <p className="label-eyebrow mb-4">Reference</p>
            <ul className="space-y-3 text-sm">
              <li><a className="text-ink-soft hover:text-primary" href="#">Style Guide</a></li>
              <li><a className="text-ink-soft hover:text-primary" href="#">Licensing</a></li>
              <li><a className="text-ink-soft hover:text-primary" href="#">Changelog</a></li>
            </ul>
          </div>

          <div>
            <p className="label-eyebrow mb-4">Newsletter</p>
            <p className="mb-4 text-sm text-ink-soft">Subscribe for exclusive real estate updates and listings.</p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 rounded-full border border-border bg-surface p-1 pl-4">
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary-light"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social" className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink-soft hover:border-primary hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-right text-xs text-muted-foreground">
          <a 
            href="https://axistechgroup.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Powered by AxisTechGroup
          </a>
        </div>
      </div>
    </footer>
  );
}
