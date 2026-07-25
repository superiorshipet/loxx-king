import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Package, Tag, MessageCircle, Info, CheckCheck } from 'lucide-react'
import { CustomerLayout } from '../../components/layout/CustomerLayout'
import { useApp } from '../../context/AppContext'
import { notifications as initialNotifs } from '../../lib/mockData'
import type { Notification } from '../../lib/mockData'
import { t } from '../../lib/translations'

const iconMap = {
  order: <Package size={18} className="text-brand" />,
  offer: <Tag size={18} className="text-amber-500" />,
  chat: <MessageCircle size={18} className="text-green-500" />,
  system: <Info size={18} className="text-muted-foreground" />,
}

export default function NotificationsPage() {
  const { lang, setUnreadCount } = useApp()
  const navigate = useNavigate()
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifs)

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  function handleNotifClick(n: Notification) {
    setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))
    setUnreadCount(prev => Math.max(0, prev - (n.read ? 0 : 1)))
    if (n.orderId) navigate('/orders')
    if (n.type === 'chat') navigate('/chat')
  }

  const unread = notifs.filter(n => !n.read).length

  return (
    <CustomerLayout>
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-bold text-2xl">{t('notifications', lang)}</h1>
          {unread > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 text-sm text-brand hover:underline tap-highlight">
              <CheckCheck size={16} />
              {t('markAllRead', lang)}
            </button>
          )}
        </div>

        {notifs.length === 0 ? (
          <div className="text-center py-20">
            <Bell size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="font-semibold">{t('noNotifications', lang)}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifs.map(n => (
              <button
                key={n.id}
                onClick={() => handleNotifClick(n)}
                className={`w-full text-start flex items-start gap-3 p-4 rounded-2xl border transition-all tap-highlight ${
                  n.read ? 'bg-card border-border' : 'bg-secondary border-brand/30'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0 mt-0.5">
                  {iconMap[n.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold leading-tight ${!n.read ? 'text-foreground' : 'text-foreground'}`}>
                      {n.title}
                    </p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-brand shrink-0 mt-1" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(n.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}
