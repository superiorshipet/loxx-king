import type { ReactNode } from 'react'
import { Header } from './Header'
import { BottomNav } from './BottomNav'
import { FloatingChat } from './FloatingChat'
import { ToastContainer } from '../ui/Toast'

export function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pb-20 md:pb-0">{children}</main>
      <BottomNav />
      <FloatingChat />
      <ToastContainer />
    </div>
  )
}
