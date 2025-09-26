"use client";

import React from "react";

export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  // default card styles: rounded, shadow, padding, ensure full-height when requested
  return (
    <div className={`rounded-lg bg-white p-4 shadow ${className}`}>
      {children}
    </div>
  );
}
