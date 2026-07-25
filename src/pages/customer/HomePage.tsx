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

// Added face-centric cropping to the Unsplash URLs to ensure heads stay in frame
const heroSlides = [
  {
    type: 'video',
    media: 'https://cdn.coverr.co/videos/coverr-a-woman-posing-in-a-studio-5214/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&fit=crop',
    titleEn: 'Shape Your\nConfidence',
    titleAr: 'شكّلي\nثقتك',
    subtitleEn: 'Premium shapewear engineered for every body.',
    subtitleAr: 'ملابس ضاغطة فاخرة مصممة لكل جسم.',
    cta: '/category/waist-trainers',
  },
  {
    type: 'image',
    media: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=800&fit=crop&crop=faces&auto=format',
    titleEn: 'Discover True Beauty',
    titleAr: 'اكتشفي الجمال الحقيقي',
    subtitleEn: 'Premium fitness & shapewear collection.',
    subtitleAr: 'أفضل تشكيلة للملابس الضاغطة والرياضية.',
    cta: '/category/all',
  },
  {
    type: 'image',
    media: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=800&fit=crop&crop=faces,top&auto=format',
    titleEn: 'New Arrivals',
    titleAr: 'وصل حديثاً',
    subtitleEn: 'Discover our latest postpartum recovery collection.',
    subtitleAr: 'اكتشفي مجموعتنا الجديدة لما بعد الولادة.',
    cta: '/category/postpartum',
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
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const bestSellers = products.filter(p => p.isBestSeller)
  const newArrivals = products.filter(p => p.isNew)

  return (
    <CustomerLayout>
      {/* Hero Section */}
      <section className="relative w-full h-[65vh] md:h-[80vh] bg-neutral-900 overflow-hidden">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide

          return (
            <div 
              key={index} 
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              {slide.type === 'video' ? (
                <video 
                  autoPlay={isActive} 
                  loop 
                  muted 
                  playsInline
                  poster={slide.poster}
                  // Added object-top here
                  className="w-full h-full object-cover object-top"
                >
                  <source src={slide.media} type="video/mp4" />
                </video>
              ) : (
                <img 
                  src={slide.media} 
                  alt={slide.titleEn} 
                  // Added object-top here to anchor the image to the top
                  className="w-full h-full object-cover object-top"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
            </div>
          )
        })}

        {/* Slide Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 max-w-3xl mx-auto">
          <div key={currentSlide} className="animate-slide-up">
            <p className="text-brand text-sm md:text-base font-bold tracking-widest uppercase mb-3 drop-shadow-md">
              LOXX KING
            </p>
            <h1 className="font-display font-black text-4xl md:text-6xl text-white mb-4 leading-tight drop-shadow-lg whitespace-pre-line">
              {lang === 'ar' ? heroSlides[currentSlide].titleAr : heroSlides[currentSlide].titleEn}
            </h1>
            <p className="text-base md:text-xl text-white/90 mb-8 max-w-xl mx-auto drop-shadow-md">
              {lang === 'ar' ? heroSlides[currentSlide].subtitleAr : heroSlides[currentSlide].subtitleEn}
            </p>
            <Link
              to={heroSlides[currentSlide].cta}
              className="inline-flex items-center gap-2 bg-brand text-[#0E0E11] font-bold px-8 py-3.5 rounded-full hover:scale-105 hover:bg-brand-hover transition-all tap-highlight shadow-xl"
            >
              {t('shopNow', lang)}
              <ArrowRight size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
            </Link>
          </div>
        </div>

        {/* Navigation Indicators */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-300 tap-highlight ${i === currentSlide ? 'w-8 h-2.5 bg-brand' : 'w-2.5 h-2.5 bg-white/60 hover:bg-white'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Category Quick Nav */}
      <section className="max-w-7xl mx-auto px-4 py-6 md:py-8 mt-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl md:text-2xl">{t('shopByCategory', lang)}</h2>
          <Link to="/category/all" className="text-sm text-brand font-medium flex items-center gap-1 hover:underline tap-highlight">
            {t('seeAll', lang)} <ChevronRight size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
          </Link>
        </div>
        <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-4 pt-2">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="flex-shrink-0 flex flex-col items-center gap-3 tap-highlight group"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-muted border-2 border-transparent group-hover:border-brand shadow-sm transition-all duration-300">
                <img 
                  src={cat.image} 
                  alt={lang === 'ar' ? cat.nameAr : cat.nameEn} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <span className="text-sm md:text-base font-bold text-center max-w-[6rem] md:max-w-[7rem] leading-tight text-foreground group-hover:text-brand transition-colors">
                {lang === 'ar' ? cat.nameAr : cat.nameEn}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 pb-6 md:pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl md:text-2xl">{t('bestSellers', lang)}</h2>
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
      <section className="max-w-7xl mx-auto px-4 pb-6 md:pb-8">
        <div className="bg-gradient-to-r from-[#0E0E11] to-[#1a2830] rounded-3xl overflow-hidden relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 shadow-lg">
          <img src={logoImg} alt="LOXX KING" className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-contain opacity-90 shadow-md" />
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
            className="shrink-0 bg-brand text-[#0E0E11] font-bold px-6 py-3 rounded-xl hover:bg-brand-hover transition-colors tap-highlight"
          >
            {t('shopNow', lang)}
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-6 md:pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl md:text-2xl">{t('newArrivals', lang)}</h2>
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
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map(item => (
            <div key={item.enTitle} className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <item.icon size={24} className="text-brand" />
              </div>
              <div>
                <p className="font-display font-bold text-sm mb-0.5">{lang === 'ar' ? item.arTitle : item.enTitle}</p>
                <p className="text-xs text-muted-foreground">{lang === 'ar' ? item.arDesc : item.enDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </CustomerLayout>
  )
}