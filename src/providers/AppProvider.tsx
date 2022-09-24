import { ReactNode } from 'react'

type AppProviderProps = {
  children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
  return <>{children}</>
}

export default AppProvider
