import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import { MagneticButton } from "@/components/shared/MagneticButton";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-soft"
          : "bg-white shadow-[0_1px_0_0_var(--color-border)]"
      }`}
    >
      <nav className="container-x flex h-18 items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Home className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            HavenlyEst
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className="group relative text-sm font-medium text-ink-soft transition-colors hover:text-ink data-[status=active]:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login" className="text-sm font-semibold text-ink hover:text-primary">
            Log In
          </Link>
          <Link to="/property">
            <MagneticButton variant="yellow" size="sm">
              Explore Property →
            </MagneticButton>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="border-t border-border bg-white lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={link.to}
                    activeOptions={{ exact: link.to === "/" }}
                    className="block rounded-lg px-3 py-3 text-sm font-medium text-ink hover:bg-surface"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-2 flex gap-2 px-3">
                <Link to="/login" className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-semibold">
                  Log In
                </Link>
                <Link to="/property" className="flex-1 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-semibold text-accent-foreground">
                  Explore →
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
