import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight, ShieldCheck, Truck, RefreshCw, HeadphonesIcon } from 'lucide-react'
import { CustomerLayout } from '../../components/layout/CustomerLayout'
import { ProductCard } from '../../components/ui/ProductCard'
import { GridSkeleton } from '../../components/ui/Skeleton'
import { useApp } from '../../context/AppContext'
import { products, categories } from '../../lib/mockData'
import { t } from '../../lib/translations'
import logoImg from '../../imports/image.png'

const heroSlides = [
  {
    titleEn: 'Shape Your\nConfidence',
    titleAr: 'شكّلي\nثقتك',
    subtitleEn: 'Premium shapewear engineered for every body.',
    subtitleAr: 'ملابس ضاغطة فاخرة مصممة لكل جسم.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop&auto=format',
    cta: '/category/waist-trainers',
  },
  {
    titleEn: 'New Arrivals',
    titleAr: 'وصل حديثاً',
    subtitleEn: 'Discover our latest postpartum recovery collection.',
    subtitleAr: 'اكتشفي مجموعتنا الجديدة لما بعد الولادة.',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=600&fit=crop&auto=format',
    cta: '/category/postpartum',
  },
  {
    titleEn: 'Up to 40% Off',
    titleAr: 'خصم حتى ٤٠٪',
    subtitleEn: 'Flash sale on selected body shapers. Today only.',
    subtitleAr: 'تخفيضات على مشدات الجسم المختارة. اليوم فقط.',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop&auto=format',
    cta: '/category/body-shapers',
  },
]

const trustItems = [
  { icon: ShieldCheck, enTitle: 'Secure Payment', arTitle: 'دفع آمن', enDesc: 'SSL encrypted checkout', arDesc: 'دفع مشفر بـ SSL' },
  { icon: Truck, enTitle: 'Fast Delivery', arTitle: 'توصيل سريع', enDesc: '2-5 business days', arDesc: '٢-٥ أيام عمل' },
  { icon: RefreshCw, enTitle: 'Easy Returns', arTitle: 'إرجاع سهل', enDesc: '30-day return policy', arDesc: 'سياسة إرجاع ٣٠ يومًا' },
  { icon: HeadphonesIcon, enTitle: '24/7 Support', arTitle: 'دعم ٢٤/٧', enDesc: 'Always here for you', arDesc: 'دائماً هنا لمساعدتك' },
]

export default function HomePage() {
  const { lang, dir } = useApp()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide(s => (s + 1) % heroSlides.length), 5000)
    return () => clearInterval(interval)
  }, [])

  const slide = heroSlides[currentSlide]
  const bestSellers = products.filter(p => p.isBestSeller)
  const newArrivals = products.filter(p => p.isNew)

  return (
    <CustomerLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-muted" style={{ minHeight: 380 }}>
        <div className="absolute inset-0">
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col justify-end" style={{ minHeight: 380 }}>
          <p className="text-brand text-sm font-semibold tracking-widest uppercase mb-3">LOXX KING</p>
          <h1 className="font-display font-black text-4xl md:text-6xl text-white leading-tight whitespace-pre-line mb-4">
            {lang === 'ar' ? slide.titleAr : slide.titleEn}
          </h1>
          <p className="text-white/80 text-lg mb-6 max-w-sm">
            {lang === 'ar' ? slide.subtitleAr : slide.subtitleEn}
          </p>
          <Link
            to={slide.cta}
            className="inline-flex items-center gap-2 bg-brand text-[#0E0E11] font-semibold px-6 py-3 rounded-2xl hover:bg-brand-hover transition-colors tap-highlight self-start"
          >
            {t('shopNow', lang)}
            <ArrowRight size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
          </Link>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-4 start-6 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all tap-highlight ${i === currentSlide ? 'w-6 h-2 bg-brand' : 'w-2 h-2 bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      {/* Category Quick Nav */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl">{t('shopByCategory', lang)}</h2>
          <Link to="/category/all" className="text-sm text-brand font-medium flex items-center gap-1 hover:underline tap-highlight">
            {t('seeAll', lang)} <ChevronRight size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 tap-highlight group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-muted ring-2 ring-transparent group-hover:ring-brand transition-all">
                <img src={cat.image} alt={lang === 'ar' ? cat.nameAr : cat.nameEn} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-medium text-center max-w-16 leading-tight">
                {lang === 'ar' ? cat.nameAr : cat.nameEn}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl">{t('bestSellers', lang)}</h2>
          <Link to="/category/all?sort=bestseller" className="text-sm text-brand font-medium flex items-center gap-1 hover:underline tap-highlight">
            {t('seeAll', lang)} <ChevronRight size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
          </Link>
        </div>
        {loading ? (
          <GridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* Offer Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-[#0E0E11] to-[#1a2830] rounded-3xl overflow-hidden relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4">
          <img src={logoImg} alt="LOXX KING" className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-contain opacity-90" />
          <div className="flex-1">
            <p className="text-brand font-bold text-sm uppercase tracking-widest mb-1">
              {lang === 'ar' ? 'عرض حصري' : 'Exclusive Offer'}
            </p>
            <h3 className="font-display font-black text-white text-2xl md:text-3xl mb-1">
              {lang === 'ar' ? 'خصم ٣٧٪ على المشدات البرو' : 'Save 37% on Pro Trainers'}
            </h3>
            <p className="text-white/60 text-sm">
              {lang === 'ar' ? 'لفترة محدودة — اطلبي الآن!' : 'Limited time — order now!'}
            </p>
          </div>
          <Link
            to="/product/prod-1"
            className="shrink-0 bg-brand text-[#0E0E11] font-bold px-6 py-3 rounded-2xl hover:bg-brand-hover transition-colors tap-highlight"
          >
            {t('shopNow', lang)}
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl">{t('newArrivals', lang)}</h2>
            <Link to="/category/all?sort=new" className="text-sm text-brand font-medium flex items-center gap-1 hover:underline tap-highlight">
              {t('seeAll', lang)} <ChevronRight size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map(item => (
            <div key={item.enTitle} className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <item.icon size={20} className="text-brand" />
              </div>
              <p className="font-display font-semibold text-sm">{lang === 'ar' ? item.arTitle : item.enTitle}</p>
              <p className="text-xs text-muted-foreground">{lang === 'ar' ? item.arDesc : item.enDesc}</p>
            </div>
          ))}
        </div>
      </section>
    </CustomerLayout>
  )
}
