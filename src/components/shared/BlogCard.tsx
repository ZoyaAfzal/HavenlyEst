import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/data";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="group">
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow duration-300 hover:shadow-lift"
      >
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>
        <h3 className="font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <div className="flex items-center gap-3">
          <img src={post.author.avatar} alt={post.author.name} className="h-9 w-9 rounded-full object-cover" loading="lazy" />
          <div>
            <p className="text-sm font-semibold text-ink">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{post.author.role}</p>
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-xl">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
      </Link>
    </motion.div>
  );
}
