import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, Star } from "lucide-react";
import type { Agent } from "@/lib/data";

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
      <div className="aspect-square overflow-hidden">
        <img
          src={agent.image}
          alt={agent.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">{agent.name}</h3>
            <p className="text-xs text-muted-foreground">{agent.role}</p>
          </div>
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
            {agent.propertiesSold} sold
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="font-semibold text-ink">{agent.rating}</span>
          <span className="text-muted-foreground">({agent.reviews} reviews)</span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex gap-2">
            <a href={`mailto:${agent.email}`} aria-label="Email" className="grid h-8 w-8 place-items-center rounded-full bg-surface text-ink hover:bg-primary hover:text-primary-foreground transition-colors">
              <Mail className="h-3.5 w-3.5" />
            </a>
            <a href={agent.linkedin} aria-label="LinkedIn" className="grid h-8 w-8 place-items-center rounded-full bg-surface text-ink hover:bg-primary hover:text-primary-foreground transition-colors">
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          </div>
          <Link
            to="/agent/$id"
            params={{ id: agent.id }}
            className="text-sm font-semibold text-primary hover:underline"
          >
            View Profile →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
