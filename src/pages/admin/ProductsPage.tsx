import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Edit3, Trash2, Star } from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { Button } from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'
import { products } from '../../lib/mockData'

export default function ProductsPage() {
  const { lang, showToast } = useApp()
  const [search, setSearch] = useState('')

  const filtered = products.filter(p =>
    p.nameEn.toLowerCase().includes(search.toLowerCase()) ||
    p.nameAr.includes(search) ||
    p.category.includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-2xl">{lang === 'ar' ? 'المنتجات' : 'Products'}</h1>
          <Link to="/admin/products/add">
            <Button variant="primary" size="md" leftIcon={<Plus size={16} />}>
              {lang === 'ar' ? 'إضافة منتج' : 'Add Product'}
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Search size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث عن منتج...' : 'Search products...'}
            className="w-full h-10 ps-9 pe-4 rounded-xl bg-card border border-border text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'المنتج' : 'Product'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground hidden sm:table-cell">{lang === 'ar' ? 'الفئة' : 'Category'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'السعر' : 'Price'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'المخزون' : 'Stock'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground hidden md:table-cell">{lang === 'ar' ? 'التقييم' : 'Rating'}</th>
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'إجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-10 h-12 rounded-lg object-cover shrink-0" />
                        <div>
                          <p className="font-medium">{lang === 'ar' ? p.nameAr : p.nameEn}</p>
                          {p.badge && <span className="text-xs text-brand font-semibold">{p.badge}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground capitalize">{p.category.replace(/-/g, ' ')}</td>
                    <td className="px-4 py-3 font-bold">
                      ${p.price}
                      {p.originalPrice && <span className="text-xs text-muted-foreground line-through ms-1">${p.originalPrice}</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${p.stock < 10 ? 'text-red-500' : p.stock < 20 ? 'text-amber-500' : 'text-green-600 dark:text-green-400'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span>{p.rating}</span>
                        <span className="text-muted-foreground text-xs">({p.reviewCount})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/products/edit/${p.id}`}>
                          <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors tap-highlight text-muted-foreground hover:text-brand">
                            <Edit3 size={15} />
                          </button>
                        </Link>
                        <button
                          onClick={() => showToast(lang === 'ar' ? 'تم حذف المنتج' : 'Product deleted', 'error')}
                          className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center transition-colors tap-highlight text-muted-foreground hover:text-red-500"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
