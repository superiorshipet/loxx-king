import { Heart, Leaf, Award, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CustomerLayout } from '../../components/layout/CustomerLayout'
import { useApp } from '../../context/AppContext'
import logoImg from '../../imports/image.png'

const values = [
  { icon: Heart, en: 'Body Positive', ar: 'إيجابية الجسم', desc: { en: 'We celebrate every body shape and size without exception.', ar: 'نحتفل بكل شكل وحجم للجسم بلا استثناء.' } },
  { icon: Award, en: 'Premium Quality', ar: 'جودة فائقة', desc: { en: 'Only the finest materials, tested for comfort and durability.', ar: 'أجود المواد المختبرة للراحة والمتانة.' } },
  { icon: Leaf, en: 'Sustainable', ar: 'مستدامة', desc: { en: 'Eco-conscious production with minimal environmental impact.', ar: 'إنتاج صديق للبيئة بأقل تأثير بيئي.' } },
  { icon: Users, en: 'Community', ar: 'مجتمع', desc: { en: 'A global community of confident women supporting each other.', ar: 'مجتمع عالمي من النساء الواثقات يدعمن بعضهن.' } },
]

export default function AboutPage() {
  const { lang } = useApp()

  return (
    <CustomerLayout>
      {/* Hero */}
      <section className="relative bg-[#0E0E11] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
          <img src={logoImg} alt="LOXX KING" className="w-20 h-20 rounded-3xl mx-auto mb-6 object-contain" />
          <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
            {lang === 'ar' ? 'عن لوكس كينج' : 'About LOXX KING'}
          </h1>
          <p className="text-brand font-semibold text-xl mb-6">
            {lang === 'ar' ? 'تبدأ الثقة من هنا.' : 'Confidence starts here.'}
          </p>
          <p className="text-white/70 leading-relaxed max-w-xl mx-auto">
            {lang === 'ar'
              ? 'نحن لوكس كينج — علامة تجارية وُلدت من الإيمان بأن كل امرأة تستحق أن تشعر بالقوة والجمال وأن تكون نفسها تمامًا. ملابسنا الضاغطة مصممة لأجساد حقيقية وحياة حقيقية وثقة حقيقية.'
              : "We're LOXX KING — a brand born from the belief that every woman deserves to feel powerful, beautiful, and completely herself. Our shapewear is engineered for real bodies, real lives, and real confidence."}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-display font-bold text-2xl text-center mb-8">
          {lang === 'ar' ? 'قيمنا' : 'Our Values'}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(v => (
            <div key={v.en} className="bg-card border border-border rounded-3xl p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <v.icon size={22} className="text-brand" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{lang === 'ar' ? v.ar : v.en}</h3>
              <p className="text-sm text-muted-foreground">{lang === 'ar' ? v.desc.ar : v.desc.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '50K+', en: 'Happy Customers', ar: 'عميلة سعيدة' },
              { num: '80+', en: 'Products', ar: 'منتج' },
              { num: '25+', en: 'Countries', ar: 'دولة' },
              { num: '4.8★', en: 'Average Rating', ar: 'متوسط التقييم' },
            ].map(s => (
              <div key={s.en}>
                <p className="font-display font-black text-3xl text-brand">{s.num}</p>
                <p className="text-sm text-muted-foreground mt-1">{lang === 'ar' ? s.ar : s.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="font-display font-bold text-3xl mb-4">
          {lang === 'ar' ? 'مستعدة للانطلاق؟' : 'Ready to get started?'}
        </h2>
        <p className="text-muted-foreground mb-6">
          {lang === 'ar' ? 'انضمي لآلاف النساء الواثقات حول العالم.' : 'Join thousands of confident women around the world.'}
        </p>
        <Link to="/category/all" className="inline-flex items-center gap-2 bg-brand text-[#0E0E11] font-bold px-8 py-4 rounded-2xl hover:bg-brand-hover transition-colors tap-highlight text-lg">
          {lang === 'ar' ? 'تسوقي الآن' : 'Shop Now'}
        </Link>
      </section>
    </CustomerLayout>
  )
}
