import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ButtonHTMLAttributes, type MouseEvent, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "green" | "yellow" | "ghost" | "outline";

interface MagneticButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: Variant;
  children: ReactNode;
  size?: "default" | "lg" | "sm";
}

const variantClass: Record<Variant, string> = {
  green:
    "bg-primary text-primary-foreground hover:bg-primary-light shadow-soft",
  yellow:
    "bg-accent text-accent-foreground hover:bg-accent-hover shadow-soft",
  ghost:
    "bg-transparent text-ink hover:bg-surface",
  outline:
    "bg-transparent border border-border text-ink hover:border-primary hover:text-primary",
};

const sizeClass = {
  sm: "px-4 py-2 text-sm",
  default: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function MagneticButton({
  variant = "green",
  size = "default",
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const translateX = useTransform(sx, (v) => v);
  const translateY = useTransform(sy, (v) => v);

  function onMove(e: MouseEvent<HTMLButtonElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: translateX, y: translateY }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  );
}
