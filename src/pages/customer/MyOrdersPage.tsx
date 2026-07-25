import { useState } from 'react'
import { ChevronRight, Package, Download } from 'lucide-react'
import { CustomerLayout } from '../../components/layout/CustomerLayout'
import { Modal } from '../../components/ui/Modal'
import { OrderStatusBadge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'
import { orders } from '../../lib/mockData'
import { t } from '../../lib/translations'

const statusTimeline = [
  { status: 'pending', en: 'Order Placed', ar: 'تم تقديم الطلب' },
  { status: 'confirmed', en: 'Confirmed', ar: 'تم التأكيد' },
  { status: 'shipped', en: 'Shipped', ar: 'تم الشحن' },
  { status: 'delivered', en: 'Delivered', ar: 'تم التوصيل' },
]

const statusOrder = ['pending', 'confirmed', 'shipped', 'delivered']

export default function MyOrdersPage() {
  const { lang, dir } = useApp()
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null)

  return (
    <CustomerLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="font-display font-bold text-2xl mb-6">{t('orders', lang)}</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="font-semibold text-lg mb-2">{lang === 'ar' ? 'لا توجد طلبات بعد' : 'No orders yet'}</p>
            <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'ابدئي التسوق الآن!' : 'Start shopping!'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(order => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="w-full bg-card border border-border rounded-2xl p-4 text-start hover:border-brand transition-all tap-highlight"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-display font-bold">{order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <OrderStatusBadge status={order.status} lang={lang} />
                    <ChevronRight size={16} className={`text-muted-foreground ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                <div className="flex gap-2 mb-2">
                  {order.items.map(item => (
                    <img key={item.productId} src={item.productImage} alt="" className="w-10 h-12 rounded-lg object-cover" />
                  ))}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{order.items.length} {lang === 'ar' ? 'منتجات' : 'items'}</span>
                  <span className="font-bold text-brand">${order.total.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <Modal open={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={selectedOrder?.orderNumber} size="lg">
        {selectedOrder && (
          <div className="space-y-5">
            {/* Status Timeline */}
            <div>
              <p className="font-semibold text-sm mb-3">{lang === 'ar' ? 'حالة الطلب' : 'Order Status'}</p>
              <div className="flex items-center gap-0">
                {statusTimeline.map((step, idx) => {
                  const currentIdx = statusOrder.indexOf(selectedOrder.status)
                  const stepIdx = statusOrder.indexOf(step.status)
                  const done = stepIdx <= currentIdx && selectedOrder.status !== 'cancelled'
                  const active = stepIdx === currentIdx
                  return (
                    <div key={step.status} className="flex-1 flex flex-col items-center">
                      <div className="flex items-center w-full">
                        {idx > 0 && <div className={`flex-1 h-0.5 ${done ? 'bg-brand' : 'bg-border'}`} />}
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${done ? 'bg-brand text-[#0E0E11]' : 'bg-muted text-muted-foreground border-2 border-border'} ${active ? 'ring-4 ring-brand/20' : ''}`}>
                          {done && !active ? '✓' : stepIdx + 1}
                        </div>
                        {idx < statusTimeline.length - 1 && <div className={`flex-1 h-0.5 ${stepIdx < currentIdx ? 'bg-brand' : 'bg-border'}`} />}
                      </div>
                      <p className={`text-[10px] mt-1 text-center leading-tight ${active ? 'text-brand font-semibold' : done ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {lang === 'ar' ? step.ar : step.en}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {selectedOrder.shipmentCode && (
              <div className="bg-muted rounded-xl p-3 text-sm">
                <span className="text-muted-foreground">{t('shipmentCode', lang)}: </span>
                <span className="font-mono font-bold">{selectedOrder.shipmentCode}</span>
              </div>
            )}

            {/* Items */}
            <div>
              <p className="font-semibold text-sm mb-2">{lang === 'ar' ? 'المنتجات' : 'Items'}</p>
              <div className="space-y-2">
                {selectedOrder.items.map(item => (
                  <div key={item.productId} className="flex gap-3 items-center">
                    <img src={item.productImage} alt="" className="w-10 h-12 rounded-lg object-cover" />
                    <div className="flex-1 text-sm">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">Size {item.size} × {item.quantity}</p>
                    </div>
                    <span className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="bg-muted rounded-xl p-3 text-sm">
              <p className="font-semibold mb-1">{t('address', lang)}</p>
              <p className="text-muted-foreground">{selectedOrder.address}</p>
              <p className="text-muted-foreground">{selectedOrder.city}, {selectedOrder.country}</p>
              <p className="text-muted-foreground">{selectedOrder.customerPhone}</p>
            </div>

            {/* Total */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>{t('subtotal', lang)}</span><span>${selectedOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{t('delivery', lang)}</span>
                <span>{selectedOrder.delivery === 0 ? t('free', lang) : `$${selectedOrder.delivery.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-border pt-1.5">
                <span>{t('total', lang)}</span>
                <span className="text-brand">${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <Button variant="outline" size="md" fullWidth leftIcon={<Download size={16} />}>
              {lang === 'ar' ? 'تحميل الفاتورة' : 'Download Invoice'}
            </Button>
          </div>
        )}
      </Modal>
    </CustomerLayout>
  )
}
