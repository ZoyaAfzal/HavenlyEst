import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function CounterNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration, ease: "easeOut" });
    return controls.stop;
  }, [inView, value, count, duration]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const unsubscribe = rounded.on("change", (v) => {
      node.textContent = v;
    });
    return unsubscribe;
  }, [rounded]);

  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
}
