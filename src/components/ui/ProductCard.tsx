import { useState } from 'react'
import { ShoppingCart, Star, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import type { Product } from '../../lib/mockData'
import { t } from '../../lib/translations'
import { Badge } from './Badge'

type Props = {
  product: Product
  compact?: boolean
}

export function ProductCard({ product, compact = false }: Props) {
  const { lang, addToCart, showToast } = useApp()
  const [wishlist, setWishlist] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const name = lang === 'ar' ? product.nameAr : product.nameEn
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault()
    const defaultSize = product.sizes[Math.floor(product.sizes.length / 2)]
    addToCart(product, defaultSize)
    showToast(lang === 'ar' ? 'تمت الإضافة للسلة ✓' : 'Added to cart ✓')
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-brand transition-all duration-200 hover:shadow-lg tap-highlight"
    >
      <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: compact ? '1' : '3/4' }}>
        {!imgLoaded && <div className="skeleton absolute inset-0" />}
        <img
          src={product.images[0]}
          alt={name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {product.badge && (
          <span className="absolute top-2 start-2 bg-brand text-[#0E0E11] text-xs font-bold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
        {product.isNew && !product.badge && (
          <span className="absolute top-2 start-2 bg-brand text-[#0E0E11] text-xs font-bold px-2 py-0.5 rounded-full">
            {lang === 'ar' ? 'جديد' : 'New'}
          </span>
        )}
        <button
          onClick={e => { e.preventDefault(); setWishlist(v => !v) }}
          className={`absolute top-2 end-2 w-8 h-8 rounded-full flex items-center justify-center transition-all tap-highlight ${
            wishlist ? 'bg-red-500 text-white' : 'bg-white/80 text-foreground'
          }`}
        >
          <Heart size={14} fill={wishlist ? 'currentColor' : 'none'} />
        </button>
        {!compact && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-2 end-2 w-9 h-9 bg-brand rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 tap-highlight"
          >
            <ShoppingCart size={16} className="text-[#0E0E11]" />
          </button>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-muted-foreground mb-0.5 truncate">
          {product.category.replace(/-/g, ' ')}
        </p>
        <h3 className="font-display font-semibold text-sm leading-tight line-clamp-2 mb-1.5">{name}</h3>
        {!compact && (
          <div className="flex items-center gap-1 mb-2">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-brand">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
          )}
          {discount > 0 && (
            <Badge variant="danger" size="sm">{discount}% {t('discount', lang)}</Badge>
          )}
        </div>
      </div>
    </Link>
  )
}
