'use client'

import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const pxCardVariants = cva(
  'rounded-[2rem] border border-[#1E6FD9]/10 bg-white shadow-[0_4px_20px_-2px_rgba(15,42,74,0.05)] transition-all duration-350 hover:-translate-y-1 hover:border-[#1E6FD9]/35 hover:shadow-[0_16px_32px_-4px_rgba(30,111,217,0.12)]',
  {
    variants: {
      elevation: {
        default: '',
        raised: 'shadow-[0_16px_32px_-4px_rgba(15,42,74,0.08)]',
        flat: 'shadow-none border-slate-200/80',
      },
      padding: {
        default: 'p-7 md:p-10',
        sm: 'p-5 md:p-7',
        lg: 'p-8 md:p-12',
      },
    },
    defaultVariants: {
      elevation: 'default',
      padding: 'default',
    },
  },
)

export interface PxCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pxCardVariants> {}

const PxCard = React.forwardRef<HTMLDivElement, PxCardProps>(
  ({ className, elevation = 'default', padding = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pxCardVariants({ elevation, padding }), className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
PxCard.displayName = 'PxCard'

export { PxCard }