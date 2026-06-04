import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { IMAGES } from "@/lib/data";

export function AuthShell({
  mode,
}: {
  mode: "login" | "register";
}) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [shake, setShake] = useState(0);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (mode === "register" && !form.name) errs.name = true;
    if (!form.email.includes("@")) errs.email = true;
    if (form.password.length < 6) errs.password = true;
    if (mode === "register" && form.password !== form.confirm) errs.confirm = true;
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setShake((s) => s + 1);
      toast.error("Please fix the highlighted fields");
      return;
    }
    toast.success(mode === "login" ? "Welcome back!" : "Account created — welcome to HavenlyEst");
  }

  return (
    <section className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src={IMAGES.luxury} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-black/20 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">HavenlyEst</p>
          <p className="mt-3 font-display text-3xl font-bold leading-tight text-white">
            "Finding our home felt impossible — until HavenlyEst made it the calmest week of our year."
          </p>
          <p className="mt-3 text-sm text-white/80">— Olivia Park, Palo Alto</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-6 py-16">
        <motion.div
          key={shake}
          animate={shake > 0 ? { x: [0, -8, 8, -6, 6, 0] } : undefined}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md"
        >
          <p className="label-eyebrow mb-3">{mode === "login" ? "Welcome back" : "Get started"}</p>
          <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">
            {mode === "login" ? "Sign in to HavenlyEst" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            {mode === "login" ? "Pick up where you left off." : "Save listings, schedule visits, and message agents."}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-3">
            {mode === "register" && (
              <AuthField label="Full name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} error={errors.name} />
            )}
            <AuthField label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} error={errors.email} />
            <AuthField label="Password" type="password" value={form.password} onChange={(v) => setForm((f) => ({ ...f, password: v }))} error={errors.password} />
            {mode === "register" && (
              <AuthField label="Confirm password" type="password" value={form.confirm} onChange={(v) => setForm((f) => ({ ...f, confirm: v }))} error={errors.confirm} />
            )}

            {mode === "login" && (
              <div className="flex justify-end">
                <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot password?</a>
              </div>
            )}

            <MagneticButton variant="green" className="w-full">
              {mode === "login" ? "Sign In" : "Create Account"}
            </MagneticButton>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            Or continue with
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:border-primary">Google</button>
            <button type="button" className="rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:border-primary">Facebook</button>
          </div>

          <p className="mt-8 text-center text-sm text-ink-soft">
            {mode === "login" ? (
              <>Don't have an account? <Link to="/register" className="font-semibold text-primary hover:underline">Register →</Link></>
            ) : (
              <>Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in →</Link></>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function AuthField({ label, value, onChange, type = "text", error }: { label: string; value: string; onChange: (v: string) => void; type?: string; error?: boolean }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 w-full rounded-xl border bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary ${
          error ? "border-destructive" : "border-border"
        }`}
      />
    </div>
  );
}
