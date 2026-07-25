import { Ruler } from 'lucide-react'
import { Modal } from './Modal'
import type { SizeChartRow } from '../../lib/mockData'
import { useApp } from '../../context/AppContext'
import { t } from '../../lib/translations'

type Props = {
  open: boolean
  onClose: () => void
  sizeChart: SizeChartRow[]
}

export function SizeGuideModal({ open, onClose, sizeChart }: Props) {
  const { lang } = useApp()
  return (
    <Modal open={open} onClose={onClose} title={t('sizeGuideTitle', lang)} size="lg">
      <p className="text-sm text-muted-foreground mb-4">{t('sizeGuideDesc', lang)}</p>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="px-3 py-2.5 text-start font-semibold">Size</th>
              <th className="px-3 py-2.5 text-start font-semibold">{t('waist', lang)}</th>
              <th className="px-3 py-2.5 text-start font-semibold">{t('hips', lang)}</th>
              <th className="px-3 py-2.5 text-start font-semibold">Waist (in)</th>
              <th className="px-3 py-2.5 text-start font-semibold">Hips (in)</th>
            </tr>
          </thead>
          <tbody>
            {sizeChart.map((row, i) => (
              <tr key={row.size} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/40'}>
                <td className="px-3 py-2.5 font-semibold text-brand">{row.size}</td>
                <td className="px-3 py-2.5">{row.waistCm}</td>
                <td className="px-3 py-2.5">{row.hipsCm}</td>
                <td className="px-3 py-2.5">{row.waistIn}</td>
                <td className="px-3 py-2.5">{row.hipsIn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-3 bg-secondary rounded-xl">
        <p className="text-xs text-secondary-foreground flex items-center gap-2">
          <Ruler size={14} />
          {lang === 'ar'
            ? 'قيسي خصرك في أضيق نقطة وأردافك في أوسع نقطة. إذا كنت بين مقاسين، اختاري الأكبر.'
            : 'Measure your waist at the narrowest point and hips at the widest. If between sizes, size up.'}
        </p>
      </div>
    </Modal>
  )
}

export function SizeGuideButton({ onClick }: { onClick: () => void }) {
  const { lang } = useApp()
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm text-brand font-medium hover:underline tap-highlight"
    >
      <Ruler size={14} />
      {t('sizeGuide', lang)}
    </button>
  )
}
