import { ReactNode } from 'react'

export interface HeadingProps {
  children: ReactNode
}

export const Heading: React.FC<HeadingProps> = ({ children }) => {
  return <h1 className="pb-4 text-3xl font-bold">{children}</h1>
}
