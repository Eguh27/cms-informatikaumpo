'use client'

import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

/**
 * Round glyph container used across the contact surfaces.
 *
 * Colour is deliberately restricted to the DESIGN.md palette — one blue, one
 * amber — so a row of circles reads as one system rather than a status rainbow.
 * Glow is carried by `tone`, not by a separate boolean, which keeps the
 * variant count at two axes and makes an over-glowing circle unrepresentable.
 */
const pxCircleVariants = cva('relative grid shrink-0 place-items-center rounded-full', {
  variants: {
    tone: {
      // On the #FFFBF5 canvas.
      primary:
        'border border-[#1E6FD9]/25 bg-[#EAF4FF] text-[#0B3A8C] shadow-[0_0_0_4px_rgba(30,111,217,0.06)]',
      amber:
        'border border-[#FFB84D]/45 bg-[#FFE8CC] text-[#0F2A4A] shadow-[0_0_0_4px_rgba(255,184,77,0.10)]',
      // On the solid #0B3A8C hotline panel.
      onNavy:
        'border border-[#FFB84D]/40 bg-white/10 text-[#FFB84D] shadow-[0_0_0_8px_rgba(255,184,77,0.07),0_0_56px_-10px_rgba(255,184,77,0.40)]',
      onNavySoft: 'border border-white/20 bg-white/10 text-white',
    },
    size: {
      sm: 'size-9',
      md: 'size-11',
      lg: 'size-14',
      hero: 'size-24 md:size-28',
    },
  },
  defaultVariants: {
    tone: 'primary',
    size: 'md',
  },
})

export interface PxCircleProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pxCircleVariants> {}

export function PxCircle({ className, tone = 'primary', size = 'md', children, ...props }: PxCircleProps) {
  return (
    <span className={cn(pxCircleVariants({ tone, size }), className)} {...props}>
      {children}
    </span>
  )
}