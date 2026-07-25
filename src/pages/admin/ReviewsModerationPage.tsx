import { useState } from 'react'
import { Eye, EyeOff, MessageCircle, Star } from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { useApp } from '../../context/AppContext'
import { reviews as initReviews } from '../../lib/mockData'
import { products } from '../../lib/mockData'

export default function ReviewsModerationPage() {
  const { lang, showToast } = useApp()
  const [reviews, setReviews] = useState(initReviews)

  function toggleApprove(id: string) {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: !r.approved } : r))
    showToast(lang === 'ar' ? 'تم تحديث التقييم' : 'Review updated')
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-5">
        <h1 className="font-display font-bold text-2xl">{lang === 'ar' ? 'مراجعة التقييمات' : 'Reviews Moderation'}</h1>

        <div className="space-y-3">
          {reviews.map(r => {
            const product = products.find(p => p.id === r.productId)
            return (
              <div key={r.id} className={`bg-card border rounded-2xl p-4 transition-all ${r.approved ? 'border-border' : 'border-amber-300 dark:border-amber-700'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-brand text-[#0E0E11] flex items-center justify-center text-xs font-bold shrink-0">
                        {r.userName[0]}
                      </div>
                      <span className="font-semibold text-sm">{r.userName}</span>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-muted'} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{r.comment}</p>
                    {product && (
                      <p className="text-xs text-brand mt-1.5">↳ {lang === 'ar' ? product.nameAr : product.nameEn}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleApprove(r.id)}
                      className={`h-8 px-3 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors tap-highlight ${r.approved ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-200' : 'bg-muted text-muted-foreground hover:bg-muted'}`}
                    >
                      {r.approved ? <><Eye size={13} /> {lang === 'ar' ? 'مقبول' : 'Approved'}</> : <><EyeOff size={13} /> {lang === 'ar' ? 'مخفي' : 'Hidden'}</>}
                    </button>
                    <button className="h-8 px-3 rounded-xl bg-muted text-xs font-medium flex items-center gap-1.5 hover:bg-brand/10 hover:text-brand transition-colors tap-highlight">
                      <MessageCircle size={13} />
                      {lang === 'ar' ? 'تصعيد' : 'Escalate'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
