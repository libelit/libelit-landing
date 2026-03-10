'use client';
import React, { ElementType, ReactNode } from 'react';

type AnimateProps = {
  as?: ElementType;
  className?: string;
  // props seen in your pages/components:
  type?: string;
  reverse?: boolean;
  delay?: number;
  duration?: number;
  children?: ReactNode;
};

/**
 * Minimal no‑op animation wrapper to unblock the build.
 * Accepts "type", "reverse", etc., but doesn't animate (yet).
 * You can swap this for the real component later.
 */
export default function Animate({
  as: Tag = 'div',
  className,
  children,
  type,
  reverse,
  delay,
  duration,
}: AnimateProps) {
  // Expose as data-* attributes (harmless, prevents React warnings):
  const dataAttrs: Record<string, string> = {};
  if (type) dataAttrs['data-animate'] = type;
  if (reverse) dataAttrs['data-reverse'] = 'true';
  if (typeof delay === 'number') dataAttrs['data-delay'] = String(delay);
  if (typeof duration === 'number') dataAttrs['data-duration'] = String(duration);

  return (
    <Tag className={className} {...dataAttrs}>
      {children}
    </Tag>
  );
}
