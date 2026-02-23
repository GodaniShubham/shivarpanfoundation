import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

const ImpactCounter = ({ end, suffix = "", label, icon, delay = 0 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, end, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center group"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
        {icon}
      </div>
      <div className="font-display text-4xl md:text-5xl font-bold text-foreground mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
    </motion.div>
  );
};

export default ImpactCounter;
