import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Edit3, Trash2, Star, X, Globe } from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { Button } from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'
import { products as initialProducts } from '../../lib/mockData'

export default function ProductsPage() {
  const { lang, showToast } = useApp()
  const [search, setSearch] = useState('')
  const [productsList, setProductsList] = useState(initialProducts)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // حقول نموذج الإضافة الجديد
  const [formNameEn, setFormNameEn] = useState('')
  const [formNameAr, setFormNameAr] = useState('')
  const [formPrice, setFormPrice] = useState('')
  const [formStock, setFormStock] = useState('')
  const [formCategory, setFormCategory] = useState('')
  const [formCountryEn, setFormCountryEn] = useState('Iraq')
  const [formCountryAr, setFormCountryAr] = useState('العراق')

  const filtered = productsList.filter(p =>
    p.nameEn.toLowerCase().includes(search.toLowerCase()) ||
    p.nameAr.includes(search) ||
    p.category.includes(search.toLowerCase()) ||
    (p as any).countryAr?.includes(search) ||
    (p as any).countryEn?.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formNameEn || !formPrice) return

    const newProduct = {
      id: Date.now().toString(),
      nameEn: formNameEn,
      nameAr: formNameAr || formNameEn,
      price: Number(formPrice),
      stock: Number(formStock) || 10,
      category: formCategory || 'general',
      countryEn: formCountryEn,
      countryAr: formCountryAr,
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'],
      rating: 5.0,
      reviewCount: 0,
    }

    setProductsList([newProduct, ...productsList])
    setIsAddModalOpen(false)
    showToast(lang === 'ar' ? 'تم إضافة المنتج بنجاح' : 'Product added successfully', 'success')

    // إعادة تعيين الحقول
    setFormNameEn('')
    setFormNameAr('')
    setFormPrice('')
    setFormStock('')
    setFormCategory('')
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-2xl">{lang === 'ar' ? 'المنتجات' : 'Products'}</h1>
          <Button 
            variant="primary" 
            size="md" 
            leftIcon={<Plus size={16} />}
            onClick={() => setIsAddModalOpen(true)}
          >
            {lang === 'ar' ? 'إضافة منتج' : 'Add Product'}
          </Button>
        </div>

        <div className="relative">
          <Search size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث عن منتج أو دولة...' : 'Search products or country...'}
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
                  <th className="px-4 py-3 text-start font-semibold text-muted-foreground">{lang === 'ar' ? 'الدولة' : 'Country'}</th>
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
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Globe size={13} className="text-brand" />
                        <span className="font-medium text-foreground">{lang === 'ar' ? ((p as any).countryAr || 'العراق') : ((p as any).countryEn || 'Iraq')}</span>
                      </div>
                    </td>
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
                          onClick={() => {
                            setProductsList(productsList.filter(item => item.id !== p.id))
                            showToast(lang === 'ar' ? 'تم حذف المنتج' : 'Product deleted', 'error')
                          }}
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

        {/* نافذة الإضافة المنبثقة (Pop-up Modal) */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden animate-fade-in">
              
              <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/40">
                <h3 className="font-bold text-base">{lang === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}</h3>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">{lang === 'ar' ? 'اسم المنتج (بالإنجليزية)' : 'Product Name (EN)'}</label>
                    <input
                      required
                      value={formNameEn}
                      onChange={e => setFormNameEn(e.target.value)}
                      placeholder="e.g. Smart Watch"
                      className="w-full h-10 px-3 rounded-xl bg-background border border-border text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">{lang === 'ar' ? 'اسم المنتج (بالعربية)' : 'Product Name (AR)'}</label>
                    <input
                      value={formNameAr}
                      onChange={e => setFormNameAr(e.target.value)}
                      placeholder="مثال: ساعة ذكية"
                      className="w-full h-10 px-3 rounded-xl bg-background border border-border text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">{lang === 'ar' ? 'السعر ($)' : 'Price ($)'}</label>
                    <input
                      required
                      type="number"
                      value={formPrice}
                      onChange={e => setFormPrice(e.target.value)}
                      placeholder="99.00"
                      className="w-full h-10 px-3 rounded-xl bg-background border border-border text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">{lang === 'ar' ? 'المخزون' : 'Stock'}</label>
                    <input
                      type="number"
                      value={formStock}
                      onChange={e => setFormStock(e.target.value)}
                      placeholder="20"
                      className="w-full h-10 px-3 rounded-xl bg-background border border-border text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">{lang === 'ar' ? 'الفئة' : 'Category'}</label>
                    <input
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value)}
                      placeholder="electronics"
                      className="w-full h-10 px-3 rounded-xl bg-background border border-border text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">{lang === 'ar' ? 'الدولة' : 'Country'}</label>
                    <select
                      value={formCountryEn}
                      onChange={e => {
                        const val = e.target.value
                        setFormCountryEn(val)
                        setFormCountryAr(val === 'Iraq' ? 'العراق' : val === 'Turkey' ? 'تركيا' : val === 'UAE' ? 'الإمارات' : 'مصر')
                      }}
                      className="w-full h-10 px-3 rounded-xl bg-background border border-border text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="Iraq">العراق / Iraq</option>
                      <option value="Turkey">تركيا / Turkey</option>
                      <option value="UAE">الإمارات / UAE</option>
                      <option value="Egypt">مصر / Egypt</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors"
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <Button variant="primary" size="md" type="submit">
                    {lang === 'ar' ? 'حفظ المنتج' : 'Save Product'}
                  </Button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  )
}