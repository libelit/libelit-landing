'use client';
import React from 'react';

/** Minimal placeholder to unblock build. Replace with real sidebar later. */
export default function HomeSidebar({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <aside className={className}>
      {children ?? null}
    </aside>
  );
}
