import { ReactNode } from 'react'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen px-4">{children}</main>
      <Footer />
    </>
  )
}
