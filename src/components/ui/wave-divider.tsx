'use client'

import { cn } from '@/utilities/ui'

export interface WaveDividerProps {
  fill?: string
  flip?: boolean
  label?: string
  className?: string
}

export function WaveDivider({
  fill = '#FFFFFF',
  flip = false,
  label,
  className,
}: WaveDividerProps) {
  return (
    <div
      className={cn('w-full overflow-hidden leading-none', className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      <svg
        viewBox="0 0 1440 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('h-10 w-full md:h-16 lg:h-20', flip && 'rotate-180')}
        preserveAspectRatio="none"
      >
        <path
          d="M0,24 C320,72 640,-12 960,36 C1200,72 1360,28 1440,24 L1440,84 L0,84 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}