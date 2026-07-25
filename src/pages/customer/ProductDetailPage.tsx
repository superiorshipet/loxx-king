import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, ChevronLeft, ChevronRight, ShoppingCart, Zap, Heart, Share2, Package } from 'lucide-react'
import { CustomerLayout } from '../../components/layout/CustomerLayout'
import { ProductCard } from '../../components/ui/ProductCard'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { SizeGuideModal, SizeGuideButton } from '../../components/ui/SizeGuide'
import { useApp } from '../../context/AppContext'
import { products, reviews } from '../../lib/mockData'
import { t } from '../../lib/translations'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { lang, dir, addToCart, showToast } = useApp()
  const navigate = useNavigate()

  const product = products.find(p => p.id === id)
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [stickyVisible, setStickyVisible] = useState(false)

  const productReviews = reviews.filter(r => r.productId === id && r.approved)
  const related = products.filter(p => p.id !== id && p.category === product?.category).slice(0, 4)

  useEffect(() => {
    const handleScroll = () => setStickyVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!product) {
    return (
      <CustomerLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">{lang === 'ar' ? 'المنتج غير موجود' : 'Product not found'}</p>
          <Button variant="primary" size="md" className="mt-4" onClick={() => navigate('/category/all')}>
            {lang === 'ar' ? 'العودة للمتجر' : 'Back to Shop'}
          </Button>
        </div>
      </CustomerLayout>
    )
  }

  const name = lang === 'ar' ? product.nameAr : product.nameEn
  const desc = lang === 'ar' ? product.descAr : product.descEn
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  function handleAddToCart() {
    if (!selectedSize) {
      showToast(lang === 'ar' ? 'يرجى اختيار مقاس أولاً' : 'Please select a size first', 'warning')
      return
    }
    addToCart(product, selectedSize, qty)
    showToast(lang === 'ar' ? 'تمت الإضافة للسلة ✓' : 'Added to cart ✓')
  }

  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 tap-highlight"
        >
          <ChevronLeft size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
          {t('back', lang)}
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="relative rounded-3xl overflow-hidden bg-muted aspect-[3/4] mb-3">
              {!imgLoaded && <div className="skeleton absolute inset-0" />}
              <img
                key={product.images[activeImage]}
                src={product.images[activeImage]}
                alt={name}
                onLoad={() => setImgLoaded(true)}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 start-4 bg-brand text-[#0E0E11] text-sm font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              <button
                onClick={() => setWishlist(v => !v)}
                className={`absolute top-4 end-4 w-10 h-10 rounded-full flex items-center justify-center transition-all tap-highlight shadow ${wishlist ? 'bg-red-500 text-white' : 'bg-white/90'}`}
              >
                <Heart size={18} fill={wishlist ? 'currentColor' : 'none'} />
              </button>
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => { setActiveImage(i => (i - 1 + product.images.length) % product.images.length); setImgLoaded(false) }}
                    className="absolute start-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow tap-highlight"
                  >
                    <ChevronLeft size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
                  </button>
                  <button
                    onClick={() => { setActiveImage(i => (i + 1) % product.images.length); setImgLoaded(false) }}
                    className="absolute end-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow tap-highlight"
                  >
                    <ChevronRight size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveImage(i); setImgLoaded(false) }}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all tap-highlight ${i === activeImage ? 'border-brand' : 'border-border'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <p className="text-xs text-muted-foreground capitalize mb-1">{product.category.replace(/-/g, ' ')}</p>
              <h1 className="font-display font-bold text-2xl md:text-3xl leading-tight mb-2">{name}</h1>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted'} />
                  ))}
                </div>
                <span className="font-semibold text-sm">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviewCount} {t('reviews', lang)})</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-display font-black text-3xl text-brand">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                )}
                {discount > 0 && <Badge variant="danger">{discount}% {t('discount', lang)}</Badge>}
              </div>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <Package size={14} className="text-brand" />
              <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                {product.stock > 0
                  ? `${t('inStock', lang)} (${product.stock} ${lang === 'ar' ? 'متبقي' : 'left'})`
                  : t('outOfStock', lang)}
              </span>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-sm">{t('size', lang)}</p>
                <SizeGuideButton onClick={() => setSizeGuideOpen(true)} />
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] h-10 px-3 rounded-xl border-2 text-sm font-semibold transition-all tap-highlight ${
                      selectedSize === size
                        ? 'border-brand bg-brand text-[#0E0E11]'
                        : 'border-border hover:border-brand hover:text-brand'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-muted-foreground mt-1.5">{t('selectSize', lang)}</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <p className="font-semibold text-sm mb-2">{t('quantity', lang)}</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-xl font-bold hover:bg-muted tap-highlight"
                >−</button>
                <span className="w-8 text-center font-semibold text-lg">{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-xl font-bold hover:bg-muted tap-highlight"
                >+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="primary" size="lg" fullWidth leftIcon={<ShoppingCart size={18} />} onClick={handleAddToCart}>
                {t('addToCart', lang)}
              </Button>
              <button
                onClick={() => { handleAddToCart(); navigate('/checkout') }}
                className="shrink-0 h-12 px-4 rounded-xl border border-border flex items-center gap-2 text-sm font-medium hover:bg-muted transition-colors tap-highlight"
              >
                <Zap size={16} />
              </button>
              <button
                className="shrink-0 h-12 px-4 rounded-xl border border-border flex items-center gap-2 text-sm font-medium hover:bg-muted transition-colors tap-highlight"
              >
                <Share2 size={16} />
              </button>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">{t('description', lang)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-12">
          <h2 className="font-display font-bold text-xl mb-5">{t('reviews', lang)} ({productReviews.length})</h2>
          {productReviews.length > 0 ? (
            <div className="space-y-4">
              {productReviews.map(review => (
                <div key={review.id} className="bg-card rounded-2xl border border-border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand text-[#0E0E11] flex items-center justify-center text-sm font-bold">
                        {review.userName[0]}
                      </div>
                      <span className="font-semibold text-sm">{review.userName}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted'} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">{lang === 'ar' ? 'لا توجد تقييمات بعد' : 'No reviews yet'}</p>
          )}
          <Button variant="outline" size="md" className="mt-4">{t('writeReview', lang)}</Button>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display font-bold text-xl mb-5">{t('relatedProducts', lang)}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Add to Cart */}
      {stickyVisible && (
        <div className="fixed bottom-16 md:bottom-0 inset-x-0 z-30 bg-card/95 backdrop-blur-md border-t border-border p-4 animate-slide-up">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div>
              <p className="font-display font-bold text-lg">{name}</p>
              <p className="text-brand font-bold">${product.price}</p>
            </div>
            <Button variant="primary" size="lg" onClick={handleAddToCart} className="shrink-0">
              {t('addToCart', lang)}
            </Button>
          </div>
        </div>
      )}

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} sizeChart={product.sizeChart} />
    </CustomerLayout>
  )
}
