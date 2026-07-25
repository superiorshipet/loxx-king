import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Plus, Trash2 } from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { Button } from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'
import { categories } from '../../lib/mockData'

export default function AddProductPage() {
  const { lang, showToast } = useApp()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [priceRows, setPriceRows] = useState([{ country: 'United States', price: '', stock: '' }])

  function addPriceRow() {
    setPriceRows(prev => [...prev, { country: '', price: '', stock: '' }])
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      showToast(lang === 'ar' ? 'تم إضافة المنتج بنجاح!' : 'Product added successfully!')
      navigate('/admin/products')
    }, 1500)
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-2xl mb-6">{lang === 'ar' ? 'إضافة منتج' : 'Add Product'}</h1>

        <form onSubmit={submit} className="space-y-6">
          {/* Images */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-semibold mb-3">{lang === 'ar' ? 'صور المنتج' : 'Product Images'}</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-brand transition-colors cursor-pointer">
                <Upload size={20} className="text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{lang === 'ar' ? 'إضافة صورة' : 'Add Image'}</p>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h2 className="font-semibold">{lang === 'ar' ? 'المعلومات الأساسية' : 'Basic Info'}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Name (English) *</label>
                <input required className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Pro Waist Cincher" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">الاسم (عربي) *</label>
                <input required dir="rtl" className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="مشد الخصر برو" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-muted-foreground mb-1 block">Description (EN)</label>
                <textarea rows={3} className="w-full px-3 py-2 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-muted-foreground mb-1 block">الوصف (عربي)</label>
                <textarea rows={3} dir="rtl" className="w-full px-3 py-2 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{lang === 'ar' ? 'الفئة' : 'Category'} *</label>
                <select required className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-ring">
                  {categories.map(c => <option key={c.id} value={c.slug}>{c.nameEn}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{lang === 'ar' ? 'السعر الأساسي' : 'Base Price'} *</label>
                <input type="number" required min="0" step="0.01" className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="49.99" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{lang === 'ar' ? 'السعر الأصلي (اختياري)' : 'Original Price (optional)'}</label>
                <input type="number" min="0" step="0.01" className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="79.99" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{lang === 'ar' ? 'شارة' : 'Badge (optional)'}</label>
                <input className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="37% OFF" />
              </div>
            </div>
          </div>

          {/* Per-Country Price & Stock */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">{lang === 'ar' ? 'السعر والمخزون حسب الدولة' : 'Price & Stock by Country'}</h2>
              <Button type="button" variant="outline" size="sm" leftIcon={<Plus size={14} />} onClick={addPriceRow}>
                {lang === 'ar' ? 'إضافة' : 'Add'}
              </Button>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-muted-foreground px-1">
                <span>{lang === 'ar' ? 'الدولة' : 'Country'}</span>
                <span>{lang === 'ar' ? 'السعر' : 'Price'}</span>
                <span>{lang === 'ar' ? 'المخزون' : 'Stock'}</span>
              </div>
              {priceRows.map((row, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 items-center">
                  <input value={row.country} onChange={e => setPriceRows(prev => prev.map((r, j) => j === i ? { ...r, country: e.target.value } : r))} className="h-9 px-3 rounded-xl bg-muted border border-border text-sm outline-none" placeholder="Country" />
                  <input type="number" value={row.price} onChange={e => setPriceRows(prev => prev.map((r, j) => j === i ? { ...r, price: e.target.value } : r))} className="h-9 px-3 rounded-xl bg-muted border border-border text-sm outline-none" placeholder="49.99" />
                  <div className="flex gap-2">
                    <input type="number" value={row.stock} onChange={e => setPriceRows(prev => prev.map((r, j) => j === i ? { ...r, stock: e.target.value } : r))} className="flex-1 h-9 px-3 rounded-xl bg-muted border border-border text-sm outline-none" placeholder="50" />
                    {priceRows.length > 1 && (
                      <button type="button" onClick={() => setPriceRows(prev => prev.filter((_, j) => j !== i))} className="w-9 h-9 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-red-500 tap-highlight">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" size="lg" fullWidth onClick={() => navigate('/admin/products')}>
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
              {lang === 'ar' ? 'إضافة المنتج' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
