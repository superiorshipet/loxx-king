import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Upload, ChevronRight } from 'lucide-react'
import { CustomerLayout } from '../../components/layout/CustomerLayout'
import { Button } from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'
import { t } from '../../lib/translations'

type Step = 1 | 2 | 3

export default function CheckoutPage() {
  const { lang, dir, cart, cartTotal, clearCart, showToast } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer'>('cod')
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    notes: '',
  })

  const delivery = cartTotal > 80 ? 0 : 5.99
  const total = cartTotal + delivery

  function nextStep() {
    if (step === 1) {
      if (!form.fullName || !form.phone || !form.address || !form.city || !form.country) {
        showToast(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields', 'warning')
        return
      }
    }
    if (step < 3) setStep(s => (s + 1) as Step)
  }

  function placeOrder() {
    setLoading(true)
    setTimeout(() => {
      clearCart()
      navigate('/order-confirmation')
    }, 1800)
  }

  const steps = [
    { n: 1, en: 'Delivery', ar: 'التوصيل' },
    { n: 2, en: 'Payment', ar: 'الدفع' },
    { n: 3, en: 'Review', ar: 'المراجعة' },
  ]

  return (
    <CustomerLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="font-display font-bold text-2xl mb-6">{t('checkout', lang)}</h1>

        {/* Step Indicator */}
        <div className="flex items-center mb-8">
          {steps.map((s, idx) => (
            <div key={s.n} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step > s.n
                      ? 'bg-brand text-[#0E0E11]'
                      : step === s.n
                        ? 'bg-brand text-[#0E0E11] ring-4 ring-brand/20'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > s.n ? <Check size={16} /> : s.n}
                </div>
                <span className={`text-xs mt-1 font-medium ${step >= s.n ? 'text-brand' : 'text-muted-foreground'}`}>
                  {lang === 'ar' ? s.ar : s.en}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 transition-all ${step > s.n ? 'bg-brand' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Delivery */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-display font-semibold text-lg">{t('step1', lang)}</h2>
            {[
              { key: 'fullName', label: t('fullName', lang), type: 'text', placeholder: 'Sarah Johnson' },
              { key: 'phone', label: t('phone', lang), type: 'tel', placeholder: '+1 555 000 0000' },
              { key: 'address', label: t('address', lang), type: 'text', placeholder: '123 Main Street, Apt 4' },
              { key: 'city', label: t('city', lang), type: 'text', placeholder: 'New York' },
              { key: 'country', label: t('country', lang), type: 'text', placeholder: 'United States' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium mb-1">{field.label} <span className="text-red-400">*</span></label>
                <input
                  type={field.type}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="w-full h-11 px-4 rounded-xl bg-muted border border-border focus:ring-2 focus:ring-ring outline-none text-sm transition-all"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium mb-1">{t('notes', lang)}</label>
              <textarea
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:ring-2 focus:ring-ring outline-none text-sm resize-none transition-all"
                placeholder={lang === 'ar' ? 'أي تعليمات خاصة للتوصيل...' : 'Any special delivery instructions...'}
              />
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-display font-semibold text-lg">{t('step2', lang)}</h2>
            <div className="space-y-3">
              {[
                { value: 'cod', en: 'Cash on Delivery', ar: 'الدفع عند الاستلام', desc: lang === 'ar' ? 'ادفعي عند استلام الطلب' : 'Pay when you receive your order' },
                { value: 'bank_transfer', en: 'Bank Transfer', ar: 'تحويل بنكي', desc: lang === 'ar' ? 'حوّلي المبلغ وارفعي إثبات التحويل' : 'Transfer the amount and upload proof' },
              ].map(opt => (
                <label key={opt.value} className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === opt.value ? 'border-brand bg-secondary' : 'border-border hover:border-brand/40'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={opt.value}
                    checked={paymentMethod === opt.value}
                    onChange={() => setPaymentMethod(opt.value as typeof paymentMethod)}
                    className="mt-0.5 accent-brand"
                  />
                  <div>
                    <p className="font-semibold text-sm">{lang === 'ar' ? opt.ar : opt.en}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            {paymentMethod === 'bank_transfer' && (
              <div className="bg-muted rounded-2xl p-4 space-y-3">
                <p className="font-semibold text-sm">{lang === 'ar' ? 'تفاصيل الحساب البنكي' : 'Bank Account Details'}</p>
                <div className="text-sm space-y-1.5">
                  <div className="flex justify-between"><span className="text-muted-foreground">Bank</span><span className="font-medium">First National Bank</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Account</span><span className="font-medium font-mono">1234 5678 9012 3456</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">LOXX KING LLC</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Ref</span><span className="font-medium">Your phone number</span></div>
                </div>
                <div className="border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-brand transition-colors">
                  <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">{t('uploadProof', lang)}</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG, PDF — max 10MB</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-display font-semibold text-lg">{t('step3', lang)}</h2>
            {/* Delivery */}
            <div className="bg-muted rounded-2xl p-4">
              <p className="font-semibold text-sm mb-2">{t('step1', lang)}</p>
              <div className="text-sm space-y-1 text-muted-foreground">
                <p className="text-foreground font-medium">{form.fullName}</p>
                <p>{form.phone}</p>
                <p>{form.address}</p>
                <p>{form.city}, {form.country}</p>
              </div>
            </div>
            {/* Payment */}
            <div className="bg-muted rounded-2xl p-4">
              <p className="font-semibold text-sm mb-1">{t('step2', lang)}</p>
              <p className="text-sm text-muted-foreground">
                {paymentMethod === 'cod' ? t('cashOnDelivery', lang) : t('bankTransfer', lang)}
              </p>
            </div>
            {/* Items */}
            <div className="bg-muted rounded-2xl p-4">
              <p className="font-semibold text-sm mb-3">{lang === 'ar' ? 'المنتجات' : 'Items'}</p>
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3">
                    <img src={item.product.images[0]} alt="" className="w-10 h-12 rounded-lg object-cover" />
                    <div className="flex-1 text-sm">
                      <p className="font-medium">{lang === 'ar' ? item.product.nameAr : item.product.nameEn}</p>
                      <p className="text-muted-foreground text-xs">{t('size', lang)} {item.size} × {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-3 pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>{t('subtotal', lang)}</span><span>${cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>{t('delivery', lang)}</span><span>{delivery === 0 ? t('free', lang) : `$${delivery.toFixed(2)}`}</span></div>
                <div className="flex justify-between font-bold text-base pt-1 border-t border-border">
                  <span>{t('total', lang)}</span>
                  <span className="text-brand">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nav Buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button variant="outline" size="lg" onClick={() => setStep(s => (s - 1) as Step)}>
              {t('previous', lang)}
            </Button>
          )}
          {step < 3 ? (
            <Button variant="primary" size="lg" fullWidth onClick={nextStep} rightIcon={<ChevronRight size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />}>
              {t('next', lang)}
            </Button>
          ) : (
            <Button variant="primary" size="xl" fullWidth loading={loading} onClick={placeOrder}>
              {t('placeOrder', lang)}
            </Button>
          )}
        </div>
      </div>
    </CustomerLayout>
  )
}
