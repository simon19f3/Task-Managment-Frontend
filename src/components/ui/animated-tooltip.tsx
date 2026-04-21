"use client";
import React, { useState } from "react";
import { motion, useTransform, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import type { User } from "@/features/tasks/data/mockTasks";

export const AnimatedTooltip = ({ items }: { items: User[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const halfWidth = target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="flex flex-row items-center">
      {items.map((item) => (
        <div
          className="group relative -mr-3"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 10 }}}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{ translateX: translateX, rotate: rotate, whiteSpace: "nowrap" }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-[rgb(var(--button-bg))] px-4 py-2 text-xs shadow-xl border border-[rgba(var(--card-border))]"
              >
                <div className="font-bold text-slate-400 text-sm">{item.name}</div>
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{item.role}</div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* INITIALS AVATAR */}
          <div
            onMouseMove={handleMouseMove}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-[rgb(var(--background))] bg-[rgb(var(--input-bg))] text-xs font-bold text-[rgb(var(--text-primary))] shadow-sm transition duration-500 group-hover:z-30 group-hover:scale-110 group-hover:border-[rgb(var(--accent-2))] cursor-pointer"
          >
            {item.name.charAt(0)}
          </div>
        </div>
      ))}
    </div>
  );
};