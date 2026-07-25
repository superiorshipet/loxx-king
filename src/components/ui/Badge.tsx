type Variant = 'primary' | 'success' | 'warning' | 'danger' | 'muted' | 'outline'

type Props = {
  children: React.ReactNode
  variant?: Variant
  size?: 'sm' | 'md'
  className?: string
}

const variants: Record<Variant, string> = {
  primary: 'bg-secondary text-secondary-foreground',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  muted: 'bg-muted text-muted-foreground',
  outline: 'border border-border text-muted-foreground bg-transparent',
}

export function Badge({ children, variant = 'primary', size = 'md', className = '' }: Props) {
  const sizeClass = size === 'sm' ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2.5 py-1'
  return (
    <span className={`inline-flex items-center font-medium rounded-full ${sizeClass} ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export function OrderStatusBadge({ status, lang }: { status: string; lang: string }) {
  const map: Record<string, { variant: Variant; en: string; ar: string }> = {
    pending: { variant: 'warning', en: 'Pending', ar: 'قيد الانتظار' },
    confirmed: { variant: 'primary', en: 'Confirmed', ar: 'مؤكد' },
    shipped: { variant: 'primary', en: 'Shipped', ar: 'تم الشحن' },
    delivered: { variant: 'success', en: 'Delivered', ar: 'تم التوصيل' },
    cancelled: { variant: 'danger', en: 'Cancelled', ar: 'ملغي' },
  }
  const info = map[status] ?? { variant: 'muted' as Variant, en: status, ar: status }
  return <Badge variant={info.variant}>{lang === 'ar' ? info.ar : info.en}</Badge>
}
