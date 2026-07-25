import { useState } from 'react'
import { Plus, Edit3, Trash2, Tag } from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Badge } from '../../components/ui/Badge'
import { useApp } from '../../context/AppContext'

type Offer = { id: string; nameEn: string; discount: number; start: string; end: string; active: boolean }

const initOffers: Offer[] = [
  { id: 'o1', nameEn: 'Flash Sale — Waist Trainers', discount: 37, start: '2025-11-20', end: '2025-11-30', active: true },
  { id: 'o2', nameEn: 'Black Friday Mega Deal', discount: 50, start: '2025-11-28', end: '2025-11-29', active: false },
  { id: 'o3', nameEn: 'New Arrivals Promo', discount: 15, start: '2025-12-01', end: '2025-12-31', active: true },
]

export default function OffersPage() {
  const { lang, showToast } = useApp()
  const [offers, setOffers] = useState<Offer[]>(initOffers)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ nameEn: '', discount: '', start: '', end: '' })

  function addOffer() {
    const offer: Offer = { id: `o-${Date.now()}`, nameEn: form.nameEn, discount: +form.discount, start: form.start, end: form.end, active: true }
    setOffers(prev => [...prev, offer])
    setOpen(false)
    showToast(lang === 'ar' ? 'تم إنشاء العرض' : 'Offer created')
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-2xl">{lang === 'ar' ? 'العروض' : 'Offers'}</h1>
          <Button variant="primary" size="md" leftIcon={<Plus size={16} />} onClick={() => setOpen(true)}>
            {lang === 'ar' ? 'إنشاء عرض' : 'Create Offer'}
          </Button>
        </div>

        <div className="space-y-3">
          {offers.map(offer => (
            <div key={offer.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                <Tag size={18} className="text-brand" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-semibold text-sm">{offer.nameEn}</p>
                  <Badge variant={offer.active ? 'success' : 'muted'} size="sm">
                    {offer.active ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'منتهي' : 'Expired')}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{offer.start} → {offer.end}</p>
              </div>
              <div className="text-end">
                <p className="font-display font-black text-2xl text-brand">{offer.discount}%</p>
                <p className="text-xs text-muted-foreground">{lang === 'ar' ? 'خصم' : 'discount'}</p>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center tap-highlight text-muted-foreground hover:text-brand">
                  <Edit3 size={15} />
                </button>
                <button onClick={() => { setOffers(prev => prev.filter(o => o.id !== offer.id)); showToast(lang === 'ar' ? 'تم الحذف' : 'Deleted', 'info') }} className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center tap-highlight text-muted-foreground hover:text-red-500">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={lang === 'ar' ? 'إنشاء عرض جديد' : 'Create New Offer'} size="sm">
        <div className="space-y-4">
          {[
            { key: 'nameEn', label: lang === 'ar' ? 'اسم العرض' : 'Offer Name', type: 'text', placeholder: 'Flash Sale' },
            { key: 'discount', label: lang === 'ar' ? 'نسبة الخصم %' : 'Discount %', type: 'number', placeholder: '25' },
            { key: 'start', label: lang === 'ar' ? 'تاريخ البداية' : 'Start Date', type: 'date', placeholder: '' },
            { key: 'end', label: lang === 'ar' ? 'تاريخ النهاية' : 'End Date', type: 'date', placeholder: '' },
          ].map(f => (
            <div key={f.key}>
              <label className="text-xs text-muted-foreground mb-1 block">{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          ))}
          <Button variant="primary" size="md" fullWidth onClick={addOffer}>
            {lang === 'ar' ? 'إنشاء العرض' : 'Create Offer'}
          </Button>
        </div>
      </Modal>
    </AdminLayout>
  )
}
