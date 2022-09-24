import { ReactNode } from 'react'

export interface TooltipProps {
  children: ReactNode
  label: string
}

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const { children, label } = props

  return (
    <span className="group relative">
      <span
        className={[
          'whitespace-nowrap',
          'rounded',
          'bg-black',
          'px-2',
          'py-1',
          'text-white',
          'absolute',
          '-top-14',
          'left-1/2',
          '-translate-x-1/2',
          "before:content-['']",
          'before:absolute',
          'before:-translate-x-1/2',
          'before:left-1/2',
          'before:top-full',
          'before:border-4',
          'before:border-transparent',
          'before:border-t-black',
          'opacity-0',
          'group-hover:opacity-100',
          'transition',
          'pointer-events-none',
        ].join(' ')}
      >
        {label}
      </span>
      {children}
    </span>
  )
}
