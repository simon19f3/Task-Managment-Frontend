"use client";

import { motion } from "motion/react";




export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      {/* UPDATED: bg-text-primary so it's black in light and white in dark */}
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-text-primary" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // UPDATED: text-text-primary
        className="font-bold whitespace-pre text-text-primary"
      >
        Team Tasks
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      {/* UPDATED: bg-text-primary */}
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-text-primary" />
    </a>
  );
};