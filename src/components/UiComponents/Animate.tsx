'use client';
import React from 'react';

type Props = React.PropsWithChildren<{
  as?: React.ElementType;
  className?: string;
}>;

/**
 * Minimal no-op animation wrapper to unblock the build.
 * Replace later with your real animation (Framer Motion, etc.).
 */
export default function Animate({ as: Tag = 'div', className, children }: Props) {
  return <Tag className={className}>{children}</Tag>;
}
``
