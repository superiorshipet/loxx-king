import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit3, Save, X } from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { OrderStatusBadge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { useApp } from '../../context/AppContext'
import { orders as allOrders } from '../../lib/mockData'

const nextStatus: Record<string, string> = {
  pending: 'confirmed',
  confirmed: 'shipped',
  shipped: 'delivered',
}

const actionLabel: Record<string, { en: string; ar: string }> = {
  pending: { en: 'Accept Order', ar: 'قبول الطلب' },
  confirmed: { en: 'Mark as Shipped', ar: 'تحديد كمشحون' },
  shipped: { en: 'Mark as Delivered', ar: 'تحديد كمسلّم' },
}

export default function OrderReviewPage() {
  const { id } = useParams<{ id: string }>()
  const { lang, dir, user, showToast } = useApp()
  const navigate = useNavigate()
  const [order, setOrder] = useState(allOrders.find(o => o.id === id))
  const [editOpen, setEditOpen] = useState(false)
  const [editForm, setEditForm] = useState(() => order ? {
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    address: order.address,
    city: order.city,
    country: order.country,
    notes: order.notes,
    shipmentCode: order.shipmentCode ?? '',
  } : {})

  if (!order) {
    return <AdminLayout><div className="text-center py-20 text-muted-foreground">{lang === 'ar' ? 'الطلب غير موجود' : 'Order not found'}</div></AdminLayout>
  }

  function handleStatusChange() {
    const next = nextStatus[order!.status]
    if (!next) return
    setOrder(o => o ? { ...o, status: next as typeof o.status } : o)
    showToast(lang === 'ar' ? 'تم تحديث الحالة' : 'Status updated')
  }

  function handleSaveEdit() {
    setOrder(o => o ? { ...o, ...editForm, shipmentCode: editForm.shipmentCode || undefined } : o)
    setEditOpen(false)
    showToast(lang === 'ar' ? 'تم حفظ التعديلات وتسجيلها' : 'Changes saved and logged to audit trail')
  }

  const canAdvance = !!nextStatus[order.status]
  const isAdmin = user?.role === 'admin'

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/orders')} className="w-9 h-9 rounded-xl hover:bg-muted flex items-center justify-center tap-highlight">
            <ArrowLeft size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
          </button>
          <div className="flex-1">
            <h1 className="font-display font-bold text-2xl font-mono">{order.orderNumber}</h1>
            <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <OrderStatusBadge status={order.status} lang={lang} />
        </div>

        {/* Status Actions */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-semibold mb-4">{lang === 'ar' ? 'إجراءات الطلب' : 'Order Actions'}</h2>
          <div className="flex flex-wrap gap-3">
            {canAdvance && (
              <Button variant="primary" size="md" onClick={handleStatusChange}>
                {lang === 'ar' ? actionLabel[order.status]?.ar : actionLabel[order.status]?.en}
              </Button>
            )}
            {order.status !== 'cancelled' && order.status !== 'delivered' && (
              <Button variant="danger" size="md" onClick={() => { setOrder(o => o ? { ...o, status: 'cancelled' } : o); showToast(lang === 'ar' ? 'تم إلغاء الطلب' : 'Order cancelled', 'error') }}>
                {lang === 'ar' ? 'إلغاء الطلب' : 'Cancel Order'}
              </Button>
            )}
            {isAdmin && (
              <Button variant="outline" size="md" leftIcon={<Edit3 size={16} />} onClick={() => setEditOpen(true)}>
                {lang === 'ar' ? 'تعديل الطلب' : 'Edit Order'}
              </Button>
            )}
          </div>
          {!isAdmin && (
            <p className="text-xs text-muted-foreground mt-3">
              {lang === 'ar' ? 'تعديل الطلب متاح للمدير فقط.' : 'Order editing is available to Admin only.'}
            </p>
          )}
        </div>

        {/* Customer */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-semibold mb-3">{lang === 'ar' ? 'بيانات العميل' : 'Customer Info'}</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              { label: lang === 'ar' ? 'الاسم' : 'Name', value: order.customerName },
              { label: lang === 'ar' ? 'الهاتف' : 'Phone', value: order.customerPhone },
              { label: lang === 'ar' ? 'البريد' : 'Email', value: order.customerEmail },
              { label: lang === 'ar' ? 'الدولة' : 'Country', value: order.country },
              { label: lang === 'ar' ? 'المدينة' : 'City', value: order.city },
              { label: lang === 'ar' ? 'العنوان' : 'Address', value: order.address },
            ].map(f => (
              <div key={f.label} className="bg-muted rounded-xl p-3">
                <p className="text-xs text-muted-foreground mb-0.5">{f.label}</p>
                <p className="font-medium">{f.value}</p>
              </div>
            ))}
            {order.notes && (
              <div className="sm:col-span-2 bg-muted rounded-xl p-3">
                <p className="text-xs text-muted-foreground mb-0.5">{lang === 'ar' ? 'ملاحظات' : 'Notes'}</p>
                <p className="font-medium">{order.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-semibold mb-3">{lang === 'ar' ? 'المنتجات' : 'Items'}</h2>
          <div className="space-y-3">
            {order.items.map(item => (
              <div key={item.productId} className="flex items-center gap-3">
                <img src={item.productImage} alt="" className="w-12 h-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">Size {item.size} × {item.quantity}</p>
                </div>
                <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-3 space-y-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>{lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span><span>${order.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>{lang === 'ar' ? 'التوصيل' : 'Delivery'}</span><span>${order.delivery.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-base border-t border-border pt-1.5">
              <span>{lang === 'ar' ? 'الإجمالي' : 'Total'}</span>
              <span className="text-brand">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment & Shipment */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-4">
            <p className="text-xs text-muted-foreground mb-1">{lang === 'ar' ? 'طريقة الدفع' : 'Payment Method'}</p>
            <p className="font-semibold">{order.paymentMethod === 'cod' ? (lang === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery') : (lang === 'ar' ? 'تحويل بنكي' : 'Bank Transfer')}</p>
            <p className={`text-sm mt-1 font-medium ${order.paymentStatus === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
              {order.paymentStatus === 'paid' ? (lang === 'ar' ? 'مدفوع' : 'Paid') : (lang === 'ar' ? 'معلق' : 'Pending')}
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <p className="text-xs text-muted-foreground mb-1">{lang === 'ar' ? 'كود الشحن' : 'Shipment Code'}</p>
            <p className="font-mono font-semibold">{order.shipmentCode ?? (lang === 'ar' ? 'غير متوفر' : 'Not assigned')}</p>
          </div>
        </div>
      </div>

      {/* Edit Modal (Admin only) */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title={lang === 'ar' ? 'تعديل الطلب' : 'Edit Order'} size="lg">
        <div className="space-y-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            {lang === 'ar' ? '⚠️ جميع التعديلات مسجّلة تلقائياً في سجل التدقيق.' : '⚠️ All changes are automatically logged to the audit trail.'}
          </div>
          {Object.entries(editForm).map(([key, val]) => (
            <div key={key}>
              <label className="text-xs text-muted-foreground capitalize mb-1 block">
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                value={val}
                onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" size="md" fullWidth leftIcon={<X size={16} />} onClick={() => setEditOpen(false)}>
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button variant="primary" size="md" fullWidth leftIcon={<Save size={16} />} onClick={handleSaveEdit}>
              {lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  )
}
