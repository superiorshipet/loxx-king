import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { Toast as ToastType } from '../../context/AppContext'

const icons = {
  success: <CheckCircle size={18} className="text-green-500" />,
  error: <AlertCircle size={18} className="text-red-500" />,
  info: <Info size={18} className="text-brand" />,
  warning: <AlertTriangle size={18} className="text-amber-500" />,
}

function ToastItem({ toast }: { toast: ToastType }) {
  const { dismissToast } = useApp()
  return (
    <div className="flex items-start gap-3 bg-card border border-border shadow-xl rounded-2xl px-4 py-3 min-w-64 max-w-sm animate-slide-up">
      <div className="mt-0.5 shrink-0">{icons[toast.type]}</div>
      <p className="flex-1 text-sm text-foreground">{toast.message}</p>
      <button
        onClick={() => dismissToast(toast.id)}
        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors tap-highlight"
      >
        <X size={16} />
      </button>
    </div>
  )
}

export function ToastContainer() {
  const { toasts, dir } = useApp()
  if (toasts.length === 0) return null

  return (
    <div
      className={`fixed top-4 z-[100] flex flex-col gap-2 ${
        dir === 'rtl' ? 'left-4' : 'right-4'
      }`}
    >
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  )
}
