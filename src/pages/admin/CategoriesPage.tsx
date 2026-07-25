import { useState } from 'react'
import { Plus, Edit3, Trash2 } from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { useApp } from '../../context/AppContext'
import { categories as initCats } from '../../lib/mockData'
import type { Category } from '../../lib/mockData'

export default function CategoriesPage() {
  const { lang, showToast } = useApp()
  const [cats, setCats] = useState<Category[]>(initCats)
  const [open, setOpen] = useState(false)
  const [editCat, setEditCat] = useState<Category | null>(null)
  const [form, setForm] = useState({ nameEn: '', nameAr: '' })

  function openAdd() { setEditCat(null); setForm({ nameEn: '', nameAr: '' }); setOpen(true) }
  function openEdit(cat: Category) { setEditCat(cat); setForm({ nameEn: cat.nameEn, nameAr: cat.nameAr }); setOpen(true) }
  function save() {
    if (editCat) {
      setCats(prev => prev.map(c => c.id === editCat.id ? { ...c, ...form } : c))
      showToast(lang === 'ar' ? 'تم التحديث' : 'Category updated')
    } else {
      const newCat: Category = { id: `cat-${Date.now()}`, slug: form.nameEn.toLowerCase().replace(/\s+/g, '-'), ...form, image: '', productCount: 0 }
      setCats(prev => [...prev, newCat])
      showToast(lang === 'ar' ? 'تم الإضافة' : 'Category added')
    }
    setOpen(false)
  }
  function remove(id: string) {
    setCats(prev => prev.filter(c => c.id !== id))
    showToast(lang === 'ar' ? 'تم الحذف' : 'Category deleted', 'info')
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-2xl">{lang === 'ar' ? 'الفئات' : 'Categories'}</h1>
          <Button variant="primary" size="md" leftIcon={<Plus size={16} />} onClick={openAdd}>
            {lang === 'ar' ? 'إضافة فئة' : 'Add Category'}
          </Button>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {cats.map((cat, i) => (
            <div key={cat.id} className={`flex items-center gap-4 px-5 py-4 ${i < cats.length - 1 ? 'border-b border-border' : ''} hover:bg-muted/30 transition-colors`}>
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-muted shrink-0">
                {cat.image && <img src={cat.image} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{lang === 'ar' ? cat.nameAr : cat.nameEn}</p>
                <p className="text-xs text-muted-foreground">{cat.productCount} {lang === 'ar' ? 'منتجات' : 'products'}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(cat)} className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors tap-highlight text-muted-foreground hover:text-brand">
                  <Edit3 size={15} />
                </button>
                <button onClick={() => remove(cat.id)} className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center transition-colors tap-highlight text-muted-foreground hover:text-red-500">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editCat ? (lang === 'ar' ? 'تعديل الفئة' : 'Edit Category') : (lang === 'ar' ? 'إضافة فئة' : 'Add Category')} size="sm">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Name (English)</label>
            <input value={form.nameEn} onChange={e => setForm(f => ({ ...f, nameEn: e.target.value }))} className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">الاسم (عربي)</label>
            <input dir="rtl" value={form.nameAr} onChange={e => setForm(f => ({ ...f, nameAr: e.target.value }))} className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <Button variant="primary" size="md" fullWidth onClick={save}>{lang === 'ar' ? 'حفظ' : 'Save'}</Button>
        </div>
      </Modal>
    </AdminLayout>
  )
}
