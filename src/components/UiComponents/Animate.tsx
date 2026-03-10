'use client';
import React, { ElementType } from 'react';

type AnimateProps = React.PropsWithChildren<{
  as?: ElementType;
  className?: string;

  // Props used around the codebase — add more if you see them:
  type?: string;        // e.g., "pull-up-first"
  reverse?: boolean;
  delay?: number;
  duration?: number;
  // ...anything else you spot in usages
}>;

/**
 * Minimal no-op animation wrapper to unblock the build.
 * Accepts animation props so TypeScript doesn't fail.
 */
export default function Animate({
  as: Tag = 'div',
  className,
  children,
  // intentionally not spreading unknown props to the DOM to avoid React warnings
  type,
  reverse,
  delay,
  duration,
}: AnimateProps) {
  // Optional: expose data-attributes for future CSS hooks (harmless if unused)
  const dataAttrs: Record<string, string | number | undefined> = {
    'data-animate': type,
    'data-reverse': reverse ? 'true' : undefined,
    'data-delay': delay,
    'data-duration': duration,
  };

  return (
    <Tag className={className} {...Object.fromEntries(
      Object.entries(dataAttrs).filter(([, v]) => v !== undefined)
    )}>
      {children}
    </Tag>
  );
}
