'use client'

import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const sectionTagVariants = cva(
  'inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest',
  {
    variants: {
      intent: {
        default: 'text-[#1E6FD9]',
        light: 'text-[#82AEFF]',
      },
      size: {
        default: 'gap-1.5',
        sm: 'gap-1',
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'default',
    },
  },
)

export interface SectionTagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof sectionTagVariants> {
  children: React.ReactNode
}

export function SectionTag({
  className,
  intent = 'default',
  size = 'default',
  children,
}: SectionTagProps) {
  return (
    <span className={cn(sectionTagVariants({ intent, size }), className)}>
      <span
        className={cn(
          'h-[0.375rem] w-6 rounded-full shrink-0',
          intent === 'default' ? 'bg-[#1E6FD9]' : 'bg-[#82AEFF]',
        )}
        aria-hidden="true"
      />
      {children}
    </span>
  )
}