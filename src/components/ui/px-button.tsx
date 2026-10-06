'use client'

import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

const pxButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#FFB84D]',
  {
    variants: {
      variant: {
        primary: 'bg-[#1E6FD9] text-white shadow-[0_4px_18px_-3px_rgba(30,111,217,0.35)] hover:bg-[#0B3A8C] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(11,58,140,0.4)]',
        secondary: 'bg-white/65 backdrop-blur-sm border-[1.5px] border-[#1E6FD9]/15 text-[#0B3A8C] hover:bg-[#EAF4FF] hover:border-[#1E6FD9] hover:-translate-y-0.5',
        ghost: 'bg-transparent border-[1.5px] border-[#1E6FD9]/30 text-[#1E6FD9] hover:bg-[#EAF4FF] hover:border-[#1E6FD9]',
        whatsapp: 'bg-[#15803D] text-white shadow-[0_4px_18px_-3px_rgba(21,128,61,0.35)] hover:bg-[#166534] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(21,128,61,0.4)]',
      },
      size: {
        default: 'min-h-[44px] px-6 py-3 text-sm',
        sm: 'min-h-[40px] px-4.5 py-2.5 text-xs',
        lg: 'min-h-[48px] px-8 py-3.5 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface PxButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pxButtonVariants> {
  asChild?: boolean
}

const PxButton = React.forwardRef<HTMLButtonElement, PxButtonProps>(
  ({ className, variant = 'primary', size = 'default', asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(pxButtonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)
PxButton.displayName = 'PxButton'

export { PxButton }