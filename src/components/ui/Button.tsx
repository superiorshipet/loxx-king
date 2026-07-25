import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg' | 'xl'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
  children: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-[#0E0E11] font-semibold hover:bg-brand-hover active:scale-[0.98] shadow-sm',
  secondary:
    'bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 active:scale-[0.98]',
  outline:
    'border border-border text-foreground font-medium hover:bg-muted active:scale-[0.98] bg-transparent',
  ghost:
    'text-foreground font-medium hover:bg-muted active:scale-[0.98] bg-transparent',
  danger:
    'bg-red-500 text-white font-semibold hover:bg-red-600 active:scale-[0.98]',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm rounded-lg',
  md: 'h-10 px-4 text-sm rounded-xl',
  lg: 'h-12 px-6 text-base rounded-xl',
  xl: 'h-14 px-8 text-base rounded-2xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...rest
}: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 transition-all duration-150 tap-highlight select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none'
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  )
}
