import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Copy, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { BlogCard } from "@/components/shared/BlogCard";
import { blogPosts, type BlogPost } from "@/lib/data";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const p = blogPosts.find((x) => x.slug === params.slug);
    const title = p ? `${p.title} — HavenlyEst Blog` : "Blog — HavenlyEst";
    return {
      meta: [
        { title },
        { name: "description", content: p?.excerpt ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.excerpt ?? "" },
        ...(p?.image ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  loader: ({ params }): { post: BlogPost } => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-4xl font-bold">Article not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">← Back to blog</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: BlogDetail,
});

function BlogDetail() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  function copyLink() {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  }

  return (
    <>
      <section className="bg-background pt-12">
        <div className="container-x mx-auto max-w-4xl">
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground">{post.category}</span>
            <span className="text-muted-foreground">{post.readTime}</span>
            <span className="text-muted-foreground">· {post.date}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-ink md:text-5xl">{post.title}</h1>
          <div className="mt-6 flex items-center gap-3">
            <img src={post.author.avatar} alt={post.author.name} className="h-12 w-12 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-ink">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">{post.author.role}</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-10 aspect-[16/9] overflow-hidden rounded-3xl shadow-lift"
          >
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_280px]">
          <article
            className="prose prose-zinc max-w-none font-sans text-ink-soft prose-headings:font-display prose-headings:text-ink prose-h2:mt-8 prose-h2:text-2xl prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="label-eyebrow">Share</p>
              <div className="mt-3 flex gap-2">
                <a href="#" aria-label="Twitter" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-primary hover:text-primary"><Twitter className="h-4 w-4" /></a>
                <a href="#" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-primary hover:text-primary"><Linkedin className="h-4 w-4" /></a>
                <button type="button" onClick={copyLink} aria-label="Copy link" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-primary hover:text-primary"><Copy className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="label-eyebrow">Categories</p>
              <ul className="mt-3 space-y-2 text-sm">
                {["Buying Tips", "Market Trends", "Investment", "Lifestyle"].map((c) => (
                  <li key={c}><Link to="/blog" className="text-ink-soft hover:text-primary">{c}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <AnimatedSection className="section-y bg-surface">
        <div className="container-x">
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Related articles</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
