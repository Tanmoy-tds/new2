"use client";

import React from "react";

export default function Button({ children, variant = "primary", onClick }: { children: React.ReactNode; variant?: "primary" | "secondary" | "ghost"; onClick?: () => void; }) {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium";
  const cls = variant === "primary" ? `${base} bg-blue-600 text-white hover:bg-blue-700` : variant === "secondary" ? `${base} border bg-white text-gray-700` : `${base} bg-transparent text-gray-700`;
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
