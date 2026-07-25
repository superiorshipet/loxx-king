import { useState, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { CustomerLayout } from '../../components/layout/CustomerLayout'
import { ProductCard } from '../../components/ui/ProductCard'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { useApp } from '../../context/AppContext'
import { products, categories } from '../../lib/mockData'
import { t } from '../../lib/translations'

const sortOptions = [
  { value: 'popular', en: 'Most Popular', ar: 'الأكثر شعبية' },
  { value: 'newest', en: 'Newest', ar: 'الأحدث' },
  { value: 'price-asc', en: 'Price: Low to High', ar: 'السعر: الأقل أولاً' },
  { value: 'price-desc', en: 'Price: High to Low', ar: 'السعر: الأعلى أولاً' },
  { value: 'rating', en: 'Top Rated', ar: 'الأعلى تقييماً' },
]

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams] = useSearchParams()
  const { lang } = useApp()
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [priceRange, setPriceRange] = useState([0, 200])
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const queryString = searchParams.get('q') ?? ''
  const category = categories.find(c => c.slug === slug)

  const filtered = useMemo(() => {
    let list = slug === 'all' ? products : products.filter(p => p.category === slug)
    if (queryString) {
      const q = queryString.toLowerCase()
      list = list.filter(p =>
        p.nameEn.toLowerCase().includes(q) ||
        p.nameAr.includes(q) ||
        p.descEn.toLowerCase().includes(q)
      )
    }
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    switch (sortBy) {
      case 'newest': return [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price)
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating)
      default: return [...list].sort((a, b) => b.reviewCount - a.reviewCount)
    }
  }, [slug, queryString, sortBy, priceRange])

  const currentSort = sortOptions.find(s => s.value === sortBy)

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb + Title */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground mb-1">
            {lang === 'ar' ? 'الرئيسية' : 'Home'} / {' '}
            {category ? (lang === 'ar' ? category.nameAr : category.nameEn) : (lang === 'ar' ? 'الكل' : 'All Products')}
          </p>
          <h1 className="font-display font-bold text-2xl">
            {queryString
              ? `"${queryString}"`
              : category
                ? (lang === 'ar' ? category.nameAr : category.nameEn)
                : (lang === 'ar' ? 'جميع المنتجات' : 'All Products')}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filtered.length} {lang === 'ar' ? 'منتج' : 'products'}
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<SlidersHorizontal size={15} />}
            onClick={() => setFilterOpen(true)}
          >
            {t('filter', lang)}
          </Button>

          <div className="flex items-center gap-2 ms-auto">
            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(v => !v)}
                className="flex items-center gap-2 h-9 px-3 rounded-xl border border-border text-sm hover:bg-muted transition-colors tap-highlight"
              >
                <span className="hidden sm:inline text-muted-foreground">{t('sort', lang)}:</span>
                {lang === 'ar' ? currentSort?.ar : currentSort?.en}
                <ChevronDown size={14} />
              </button>
              {showSortDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                  <div className="absolute end-0 top-10 z-20 bg-card border border-border rounded-2xl shadow-xl w-48 py-1 animate-fade-in">
                    {sortOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setShowSortDropdown(false) }}
                        className={`w-full text-start px-4 py-2.5 text-sm hover:bg-muted transition-colors tap-highlight ${sortBy === opt.value ? 'text-brand font-semibold' : ''}`}
                      >
                        {lang === 'ar' ? opt.ar : opt.en}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-6">
          {[{ slug: 'all', nameEn: 'All', nameAr: 'الكل' }, ...categories].map(cat => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`shrink-0 h-8 px-4 rounded-full text-sm font-medium border transition-all tap-highlight ${
                slug === cat.slug
                  ? 'bg-brand border-brand text-[#0E0E11]'
                  : 'border-border text-muted-foreground hover:border-brand hover:text-brand'
              }`}
            >
              {lang === 'ar' ? cat.nameAr : cat.nameEn}
            </a>
          ))}
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <div className="text-5xl mb-3">🔍</div>
            <p className="font-semibold">{lang === 'ar' ? 'لا توجد نتائج' : 'No results found'}</p>
            <p className="text-sm mt-1">{lang === 'ar' ? 'حاولي مع بحث آخر' : 'Try a different search'}</p>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <Modal open={filterOpen} onClose={() => setFilterOpen(false)} title={t('filter', lang)} size="sm">
        <div className="space-y-5">
          <div>
            <p className="font-semibold text-sm mb-3">{lang === 'ar' ? 'نطاق السعر' : 'Price Range'}</p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={priceRange[0]}
                onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                className="flex-1 h-9 px-3 rounded-xl bg-muted text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="Min"
              />
              <span className="text-muted-foreground">—</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                className="flex-1 h-9 px-3 rounded-xl bg-muted text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="Max"
              />
            </div>
          </div>

          <div>
            <p className="font-semibold text-sm mb-3">{lang === 'ar' ? 'الفئة' : 'Category'}</p>
            <div className="space-y-2">
              {categories.map(cat => (
                <a
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="flex items-center justify-between py-1 hover:text-brand transition-colors tap-highlight"
                  onClick={() => setFilterOpen(false)}
                >
                  <span className="text-sm">{lang === 'ar' ? cat.nameAr : cat.nameEn}</span>
                  <span className="text-xs text-muted-foreground">{cat.productCount}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="md" fullWidth onClick={() => { setPriceRange([0, 200]); setFilterOpen(false) }}>
              {lang === 'ar' ? 'إعادة تعيين' : 'Reset'}
            </Button>
            <Button variant="primary" size="md" fullWidth onClick={() => setFilterOpen(false)}>
              {lang === 'ar' ? 'تطبيق' : 'Apply'}
            </Button>
          </div>
        </div>
      </Modal>
    </CustomerLayout>
  )
}
