'use client'

import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const pxChipVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-[#EAF4FF] text-[#0B3A8C] border border-[#1E6FD9]/16',
        amber: 'bg-[#FFE8CC] text-[#0F2A4A] border border-[#FFB84D]/50',
        emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        slate: 'bg-slate-100 text-slate-700 border border-slate-200',
      },
      size: {
        default: 'px-3.5 py-1.5 text-xs',
        sm: 'px-2.5 py-1 text-[10px]',
        lg: 'px-4.5 py-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface PxChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pxChipVariants> {
  children: React.ReactNode
}

export function PxChip({
  className,
  variant = 'primary',
  size = 'default',
  children,
}: PxChipProps) {
  return (
    <span className={cn(pxChipVariants({ variant, size }), className)}>
      {children}
    </span>
  )
}