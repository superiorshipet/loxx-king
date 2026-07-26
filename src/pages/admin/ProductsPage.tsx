import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Edit3, Trash2, Globe, X, Filter, RotateCcw } from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { Button } from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'

const initialProducts = [
  { id: '147', nameEn: 'Mesh Body', nameAr: 'مشح بدن', country: 'البحرين', flag: '🇧🇭', regularPrice: 'BHD 15.00', blackPrice: 'BHD 10.00', saleType: 'بيع فردي', stock: 1, entries: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
  { id: '146', nameEn: 'Mesh Body', nameAr: 'مشح بدن', country: 'الكويت', flag: '🇰🇼', regularPrice: 'KWD 15.00', blackPrice: 'KWD 10.00', saleType: 'بيع فردي', stock: 1, entries: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
  { id: '145', nameEn: 'Mesh Body', nameAr: 'مشح بدن', country: 'سلطنة عمان', flag: '🇴🇲', regularPrice: 'OMR 15.50', blackPrice: 'OMR 10.50', saleType: 'بيع فردي', stock: 1, entries: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
  { id: '144', nameEn: 'Mesh Body', nameAr: 'مشح بدن', country: 'البحرين', flag: '🇧🇭', regularPrice: 'BHD 12.00', blackPrice: 'BHD 9.00', saleType: 'بيع مدمج', stock: 1, entries: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
  { id: '143', nameEn: 'Mesh Body', nameAr: 'مشح بدن', country: 'الكويت', flag: '🇰🇼', regularPrice: 'KWD 15.00', blackPrice: 'KWD 12.00', saleType: 'بيع مدمج', stock: 1, entries: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
  { id: '142', nameEn: 'Mesh Body', nameAr: 'مشح بدن', country: 'سلطنة عمان', flag: '🇴🇲', regularPrice: 'OMR 12.50', blackPrice: '9.50 OMR', saleType: 'بيع مدمج', stock: 1, entries: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
  { id: '141', nameEn: 'Top Powder', nameAr: 'توب باودر', country: 'البحرين', flag: '🇧🇭', regularPrice: 'BHD 15.00', blackPrice: 'BHD 11.00', saleType: 'بيع فردي', stock: 1, entries: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
  { id: '140', nameEn: 'Top Powder', nameAr: 'توب باودر', country: 'الكويت', flag: '🇰🇼', regularPrice: 'KWD 15.00', blackPrice: 'KWD 11.00', saleType: 'بيع فردي', stock: 1, entries: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
  { id: '139', nameEn: 'Top Powder', nameAr: 'توب باودر', country: 'سلطنة عمان', flag: '🇴🇲', regularPrice: 'OMR 15.50', blackPrice: 'OMR 11.00', saleType: 'بيع فردي', stock: 1, entries: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
  { id: '138', nameEn: 'Mesh Body', nameAr: 'مشح بدن', country: 'فلسطين', flag: '🇵🇸', regularPrice: 'ILS 200.00', blackPrice: 'ILS 150.00', saleType: 'بيع فردي', stock: 1, entries: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
]

export default function ProductsPage() {
  const { lang, showToast } = useApp()
  const [productsList, setProductsList] = useState(initialProducts)
  const [trashList, setTrashList] = useState<any[]>([])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [saleTypeFilter, setSaleTypeFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('')

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)

  const [formName, setFormName] = useState('')
  const [formCountry, setFormCountry] = useState('البحرين')
  const [formRegularPrice, setFormRegularPrice] = useState('')
  const [formBlackPrice, setFormBlackPrice] = useState('')
  const [formSaleType, setFormSaleType] = useState('بيع فردي')
  const [formStock, setFormStock] = useState('1')

  const filteredProducts = useMemo(() => {
    return productsList.filter(product => {
      const searchMatch = searchTerm === '' || 
        product.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.includes(searchTerm);

      const saleTypeMatch = saleTypeFilter === '' || product.saleType === saleTypeFilter;
      const countryMatch = countryFilter === '' || product.country === countryFilter;

      return searchMatch && saleTypeMatch && countryMatch;
    });
  }, [productsList, searchTerm, saleTypeFilter, countryFilter]);

  const handleClearFilter = () => {
    setSearchTerm('')
    setSaleTypeFilter('')
    setCountryFilter('')
    showToast(lang === 'ar' ? 'تم إلغاء الفلترة' : 'Filters cleared', 'info')
  }

  const handleDeleteAll = () => {
    if (productsList.length === 0) return
    setTrashList([...trashList, ...productsList])
    setProductsList([])
    showToast(lang === 'ar' ? 'تم نقل جميع المنتجات إلى سلة المهملات' : 'All products moved to trash', 'error')
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName || !formRegularPrice) return

    const newProduct = {
      id: (Number(productsList[0]?.id || 137) + 1).toString(),
      nameEn: formName,
      nameAr: formName,
      country: formCountry,
      flag: formCountry === 'البحرين' ? '🇧🇭' : formCountry === 'الكويت' ? '🇰🇼' : formCountry === 'سلطنة عمان' ? '🇴🇲' : '🇵🇸',
      regularPrice: formRegularPrice,
      blackPrice: formBlackPrice || formRegularPrice,
      saleType: formSaleType,
      stock: Number(formStock) || 1,
      entries: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
    }

    setProductsList([newProduct, ...productsList])
    setIsAddModalOpen(false)
    showToast(lang === 'ar' ? 'تم إضافة المنتج بنجاح' : 'Product added successfully', 'success')

    setFormName('')
    setFormRegularPrice('')
    setFormBlackPrice('')
  }

  const openEditModal = (product: any) => {
    setEditingProduct({ ...product })
    setIsEditModalOpen(true)
  }

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    setProductsList(productsList.map(p => p.id === editingProduct.id ? editingProduct : p))
    setIsEditModalOpen(false)
    showToast(lang === 'ar' ? 'تم تعديل المنتج بنجاح' : 'Product updated successfully', 'success')
  }

  const handleDeleteProduct = (id: string) => {
    const itemToDelete = productsList.find(p => p.id === id)
    if (itemToDelete) {
      setTrashList([...trashList, itemToDelete])
      setProductsList(productsList.filter(item => item.id !== id))
      showToast(lang === 'ar' ? 'تم نقل المنتج إلى سلة المهملات' : 'Product moved to trash', 'error')
    }
  }

  const uniqueCountries = useMemo(() => {
    return [...new Set(productsList.map(p => p.country))];
  }, [productsList]);

  return (
    <AdminLayout>
      <div className="w-full space-y-4 pb-10 px-2 md:px-4" dir="rtl">
        
        {/* شريط الفلاتر الثلاثة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          <div className="relative">
            <Filter size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <select 
              value={saleTypeFilter}
              onChange={e => setSaleTypeFilter(e.target.value)}
              className="w-full h-9 ps-9 pe-4 rounded-xl bg-card border border-border text-xs outline-none cursor-pointer"
            >
              <option value="">{lang === 'ar' ? 'تصفية حسب نوع البيع' : 'Filter by sale type'}</option>
              <option value="بيع فردي">بيع فردي</option>
              <option value="بيع مدمج">بيع مدمج</option>
            </select>
          </div>

          <div className="relative">
            <Search size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث باسم المنتج أو الرقم...' : 'Search by name or ID...'}
              className="w-full h-9 ps-9 pe-4 rounded-xl bg-card border border-border text-xs outline-none"
            />
            {searchTerm && (
              <X 
                size={14} 
                onClick={() => setSearchTerm('')} 
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer" 
              />
            )}
          </div>

          <div className="relative">
            <Globe size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <select 
              value={countryFilter}
              onChange={e => setCountryFilter(e.target.value)}
              className="w-full h-9 ps-9 pe-4 rounded-xl bg-card border border-border text-xs outline-none cursor-pointer"
            >
              <option value="">{lang === 'ar' ? 'تصفية حسب الدولة' : 'Filter by country'}</option>
              {uniqueCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        {/* شريط الإجراءات: الأزرار الأربعة على اليمين */}
        <div className="flex items-center justify-end flex-wrap gap-4 py-1 w-full" dir="ltr">
          <button 
            onClick={handleDeleteAll}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/20 transition-all shadow-sm cursor-pointer"
          >
            {lang === 'ar' ? 'حذف الكل' : 'Delete All'}
          </button>
          <button 
            onClick={handleClearFilter}
            className="px-3.5 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold hover:bg-muted transition-all flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>{lang === 'ar' ? 'إلغاء فلترة' : 'Clear Filter'}</span>
          </button>
          <button 
            onClick={() => showToast(lang === 'ar' ? `سلة المهملات تحتوي على ${trashList.length} منتج` : `Trash has ${trashList.length} items`, 'info')}
            className="px-3.5 py-1.5 rounded-xl bg-card border border-border text-xs font-bold hover:bg-muted transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-[11px]">
              {trashList.length}
            </span>
            <span>{lang === 'ar' ? 'سلة المهملات' : 'Trash'}</span>
          </button>
          <Button 
            variant="primary" 
            size="sm" 
            leftIcon={<Plus size={15} />}
            onClick={() => setIsAddModalOpen(true)}
            className="font-bold text-xs cursor-pointer shadow-sm"
          >
            {lang === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}
          </Button>
        </div>

        {/* جدول المنتجات بعرض الشاشة الكامل w-full */}
        <div className="w-full bg-card border border-border rounded-xl overflow-hidden shadow-sm py-2">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-xs whitespace-nowrap">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-muted-foreground uppercase font-bold">
                  <th className="px-3 py-2.5 text-start">#</th>
                  <th className="px-3 py-2.5 text-start">{lang === 'ar' ? 'الصورة' : 'Image'}</th>
                  <th className="px-3 py-2.5 text-start">{lang === 'ar' ? 'اسم المنتج' : 'Product Name'}</th>
                  <th className="px-3 py-2.5 text-start">{lang === 'ar' ? 'الدولة' : 'Country'}</th>
                  <th className="px-3 py-2.5 text-start">{lang === 'ar' ? 'السعر ' : 'Regular Price'}</th>
                  <th className="px-3 py-2.5 text-start">{lang === 'ar' ? 'نوع البيع' : 'Sale Type'}</th>
                  <th className="px-3 py-2.5 text-center">{lang === 'ar' ? 'الكمية' : 'Stock'}</th>
                  <th className="px-3 py-2.5 text-center">{lang === 'ar' ? 'الإدخالات' : 'Entries'}</th>
                  <th className="px-3 py-2.5 text-center">{lang === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-muted/40 transition-colors">
                      <td className="px-3 py-2 font-mono text-muted-foreground font-bold">{p.id}</td>
                      <td className="px-3 py-2">
                        <img src={p.image} alt="" className="w-8 h-10 rounded-lg object-cover" />
                      </td>
                      <td className="px-3 py-2 font-bold text-foreground">{p.nameAr}</td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-1.5 font-medium">
                          <span>{p.flag}</span>
                          <span>{p.country}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 font-bold text-sky-600 dark:text-sky-400">{p.blackPrice}</td>
                      <td className="px-3 py-2 font-semibold text-muted-foreground">{p.regularPrice}</td>
                      <td className="px-3 py-2">
                        <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-[10px]">
                          {p.saleType}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className="w-5 h-5 rounded-full bg-sky-500 text-white inline-flex items-center justify-center font-bold text-[10px]">
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center font-bold">{p.entries}</td>
                      <td className="px-3 py-2">
                        <div className="flex items-center justify-center gap-1.5">
                          <button 
                            onClick={() => openEditModal(p)}
                            className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-900 font-bold text-[11px] hover:bg-amber-500 transition-colors shadow-sm cursor-pointer"
                          >
                            {lang === 'ar' ? 'تعديل' : 'Edit'}
                          </button>

                          <button className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-900 font-bold text-[11px] hover:bg-amber-500 transition-colors shadow-sm cursor-pointer">
                            {lang === 'ar' ? 'سجل التعديلات' : 'Logs'}
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="px-2.5 py-1 rounded-lg bg-rose-500 text-white font-bold text-[11px] hover:bg-rose-600 transition-colors shadow-sm cursor-pointer"
                          >
                            {lang === 'ar' ? 'حذف' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center py-8 text-muted-foreground text-xs">
                      {lang === 'ar' ? 'لا توجد منتجات مطابقة للبحث أو الفلترة' : 'No products match your search or filter'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* نافذة الإضافة المنبثقة (Add Modal) */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden animate-fade-in">
              
              <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/40">
                <h3 className="font-bold text-sm">{lang === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}</h3>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="p-6 space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-muted-foreground">{lang === 'ar' ? 'اسم المنتج' : 'Product Name'}</label>
                  <input
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="مثال: مشح بدن"
                    className="w-full h-9 px-3 rounded-xl bg-background border border-border outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-semibold text-muted-foreground">{lang === 'ar' ? 'الدولة' : 'Country'}</label>
                    <select
                      value={formCountry}
                      onChange={e => setFormCountry(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-background border border-border outline-none cursor-pointer"
                    >
                      <option value="البحرين">البحرين 🇧🇭</option>
                      <option value="الكويت">الكويت 🇰🇼</option>
                      <option value="سلطنة عمان">سلطنة عمان 🇴🇲</option>
                      <option value="فلسطين">فلسطين 🇵🇸</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-muted-foreground">{lang === 'ar' ? 'نوع البيع' : 'Sale Type'}</label>
                    <select
                      value={formSaleType}
                      onChange={e => setFormSaleType(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-background border border-border outline-none cursor-pointer"
                    >
                      <option value="بيع فردي">بيع فردي</option>
                      <option value="بيع مدمج">بيع مدمج</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-semibold text-muted-foreground">{lang === 'ar' ? 'أسعار الأسود (مثال: BHD 10.00)' : 'Black Price'}</label>
                    <input
                      required
                      value={formBlackPrice}
                      onChange={e => setFormBlackPrice(e.target.value)}
                      placeholder="BHD 10.00"
                      className="w-full h-9 px-3 rounded-xl bg-background border border-border outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-muted-foreground">{lang === 'ar' ? 'السعر العادي (مثال: BHD 15.00)' : 'Regular Price'}</label>
                    <input
                      required
                      value={formRegularPrice}
                      onChange={e => setFormRegularPrice(e.target.value)}
                      placeholder="BHD 15.00"
                      className="w-full h-9 px-3 rounded-xl bg-background border border-border outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-3 py-1.5 rounded-xl font-semibold border border-border hover:bg-muted transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <Button variant="primary" size="sm" type="submit" className="font-bold cursor-pointer">
                    {lang === 'ar' ? 'حفظ المنتج' : 'Save Product'}
                  </Button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* نافذة التعديل المنبثقة (Edit Modal Pop-up) */}
        {isEditModalOpen && editingProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden animate-fade-in">
              
              <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/40">
                <h3 className="font-bold text-sm">{lang === 'ar' ? 'تعديل بيانات المنتج' : 'Edit Product'}</h3>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleUpdateProduct} className="p-6 space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-muted-foreground">{lang === 'ar' ? 'اسم المنتج' : 'Product Name'}</label>
                  <input
                    required
                    value={editingProduct.nameAr}
                    onChange={e => setEditingProduct({ ...editingProduct, nameAr: e.target.value, nameEn: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl bg-background border border-border outline-none font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-semibold text-muted-foreground">{lang === 'ar' ? 'الدولة' : 'Country'}</label>
                    <select
                      value={editingProduct.country}
                      onChange={e => setEditingProduct({ ...editingProduct, country: e.target.value })}
                      className="w-full h-9 px-3 rounded-xl bg-background border border-border outline-none cursor-pointer"
                    >
                      <option value="البحرين">البحرين 🇧🇭</option>
                      <option value="الكويت">الكويت 🇰🇼</option>
                      <option value="سلطنة عمان">سلطنة عمان 🇴🇲</option>
                      <option value="فلسطين">فلسطين 🇵🇸</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-muted-foreground">{lang === 'ar' ? 'نوع البيع' : 'Sale Type'}</label>
                    <select
                      value={editingProduct.saleType}
                      onChange={e => setEditingProduct({ ...editingProduct, saleType: e.target.value })}
                      className="w-full h-9 px-3 rounded-xl bg-background border border-border outline-none cursor-pointer"
                    >
                      <option value="بيع فردي">بيع فردي</option>
                      <option value="بيع مدمج">بيع مدمج</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-semibold text-muted-foreground">{lang === 'ar' ? 'أسعار الأسود' : 'Black Price'}</label>
                    <input
                      required
                      value={editingProduct.blackPrice}
                      onChange={e => setEditingProduct({ ...editingProduct, blackPrice: e.target.value })}
                      className="w-full h-9 px-3 rounded-xl bg-background border border-border outline-none font-bold text-sky-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-muted-foreground">{lang === 'ar' ? 'السعر العادي' : 'Regular Price'}</label>
                    <input
                      required
                      value={editingProduct.regularPrice}
                      onChange={e => setEditingProduct({ ...editingProduct, regularPrice: e.target.value })}
                      className="w-full h-9 px-3 rounded-xl bg-background border border-border outline-none font-semibold"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-3 py-1.5 rounded-xl font-semibold border border-border hover:bg-muted transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <Button variant="primary" size="sm" type="submit" className="font-bold cursor-pointer">
                    {lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
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