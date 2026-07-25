export type Category = {
  id: string
  slug: string
  nameEn: string
  nameAr: string
  image: string
  productCount: number
}

export type Product = {
  id: string
  slug: string
  nameEn: string
  nameAr: string
  descEn: string
  descAr: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  sizes: string[]
  sizeChart: SizeChartRow[]
  stock: number
  rating: number
  reviewCount: number
  isNew?: boolean
  isBestSeller?: boolean
  badge?: string
}

export type SizeChartRow = {
  size: string
  waistCm: string
  hipsCm: string
  waistIn: string
  hipsIn: string
}

export type Review = {
  id: string
  productId: string
  userName: string
  rating: number
  comment: string
  date: string
  approved: boolean
}

export type Order = {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  address: string
  city: string
  country: string
  notes: string
  items: OrderItem[]
  subtotal: number
  delivery: number
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: 'cod' | 'bank_transfer'
  paymentStatus: 'pending' | 'paid' | 'failed'
  shipmentCode?: string
  createdAt: string
  updatedAt: string
}

export type OrderItem = {
  productId: string
  productName: string
  productImage: string
  size: string
  quantity: number
  price: number
}

export type EditLog = {
  id: string
  orderId: string
  orderNumber: string
  field: string
  oldValue: string
  newValue: string
  editedBy: string
  editorRole: string
  timestamp: string
}

export type Notification = {
  id: string
  type: 'order' | 'chat' | 'offer' | 'system'
  title: string
  message: string
  read: boolean
  createdAt: string
  orderId?: string
}

export const categories: Category[] = [
  {
    id: 'cat-1',
    slug: 'waist-trainers',
    nameEn: 'Waist Trainers',
    nameAr: 'مشدات الخصر',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop&auto=format',
    productCount: 18,
  },
  {
    id: 'cat-2',
    slug: 'body-shapers',
    nameEn: 'Body Shapers',
    nameAr: 'مشدات الجسم',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop&auto=format',
    productCount: 24,
  },
  {
    id: 'cat-3',
    slug: 'postpartum',
    nameEn: 'Postpartum Shapers',
    nameAr: 'مشدات ما بعد الولادة',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop&auto=format',
    productCount: 12,
  },
  {
    id: 'cat-4',
    slug: 'compression-vests',
    nameEn: 'Compression Vests',
    nameAr: 'سترات الضغط',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop&auto=format',
    productCount: 9,
  },
  {
    id: 'cat-5',
    slug: 'butt-lifters',
    nameEn: 'Butt Lifters',
    nameAr: 'رافعات الأرداف',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop&auto=format',
    productCount: 11,
  },
  {
    id: 'cat-6',
    slug: 'accessories',
    nameEn: 'Accessories',
    nameAr: 'إكسسوارات',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop&auto=format',
    productCount: 6,
  },
]

const defaultSizeChart: SizeChartRow[] = [
  { size: 'XS', waistCm: '58–63', hipsCm: '83–88', waistIn: '23–25', hipsIn: '33–35' },
  { size: 'S', waistCm: '64–69', hipsCm: '89–94', waistIn: '25–27', hipsIn: '35–37' },
  { size: 'M', waistCm: '70–76', hipsCm: '95–100', waistIn: '27–30', hipsIn: '37–39' },
  { size: 'L', waistCm: '77–83', hipsCm: '101–106', waistIn: '30–33', hipsIn: '40–42' },
  { size: 'XL', waistCm: '84–91', hipsCm: '107–113', waistIn: '33–36', hipsIn: '42–44' },
  { size: '2XL', waistCm: '92–99', hipsCm: '114–120', waistIn: '36–39', hipsIn: '45–47' },
  { size: '3XL', waistCm: '100–108', hipsCm: '121–128', waistIn: '39–42', hipsIn: '48–50' },
]

export const products: Product[] = [
  {
    id: 'prod-1',
    slug: 'pro-waist-cincher',
    nameEn: 'Pro Waist Cincher Elite',
    nameAr: 'مشد الخصر برو إيليت',
    descEn: 'Maximum compression waist trainer with 9 steel bones. Thermogenic technology accelerates core heat for faster results. Breathable latex-free fabric with antimicrobial lining.',
    descAr: 'مشد خصر بضغط أقصى مع 9 عظام فولاذية. تقنية حرارية تسرّع حرارة الجذع للحصول على نتائج أسرع. قماش غير لاتكس وقابل للتنفس مع بطانة مضادة للميكروبات.',
    price: 49.99,
    originalPrice: 79.99,
    images: [
      'https://scontent.faly8-1.fna.fbcdn.net/v/t39.30808-6/540617831_122240294726189683_7962104299720680049_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=p526x296&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=bXSGgn-jodgQ7kNvwE3OAmk&_nc_oc=AdoqE7hUWxISQRiScUfiKMkLdgLJOnuCNvgaI072G7KVLoL_IVJAOupeRqIe4ccq9os&_nc_zt=23&_nc_ht=scontent.faly8-1.fna&_nc_gid=bDyToaNahPXlb_tHCplMSQ&_nc_ss=7b2a8&oh=00_AQBHXVms84D-0yQiGXYezVvoAy1tug2vlpXbppwrITqW_Q&oe=6A6A88B5',
    ],
    category: 'waist-trainers',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    sizeChart: defaultSizeChart,
    stock: 42,
    rating: 4.8,
    reviewCount: 237,
    isBestSeller: true,
    badge: '37% OFF',
  },
  {
    id: 'prod-2',
    slug: 'full-body-shaper',
    nameEn: 'Full Body Shaper Supreme',
    nameAr: 'مشد الجسم الكامل سوبريم',
    descEn: 'Full-body compression shaper targeting waist, hips, thighs and back. Open-bust design for versatile wearing. Seamless under clothing.',
    descAr: 'مشد ضغط للجسم الكامل يستهدف الخصر والوركين والفخذين والظهر. تصميم مفتوح الصدر للارتداء المتعدد. سلس تحت الملابس.',
    price: 64.99,
    originalPrice: 89.99,
    images: [
      'https://scontent.faly8-1.fna.fbcdn.net/v/t39.30808-6/541824305_122240294036189683_5165491738147685278_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=p526x296&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=SyKbow72KuMQ7kNvwEi20xW&_nc_oc=AdpaCGpN7RZ7AYCsg9iqTCzpwD3KY08vrK6g11wLUkpWjXI_VxxML2dCl2y14Talun8&_nc_zt=23&_nc_ht=scontent.faly8-1.fna&_nc_gid=bDyToaNahPXlb_tHCplMSQ&_nc_ss=7b2a8&oh=00_AQBaD_4xf_vxgkFTukeYiZu7HFxCK6u565LZETc_zVT1FQ&oe=6A6A8930',
    ],
    category: 'body-shapers',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    sizeChart: defaultSizeChart,
    stock: 28,
    rating: 4.6,
    reviewCount: 184,
    isBestSeller: true,
  },
  {
    id: 'prod-3',
    slug: 'postpartum-recovery-band',
    nameEn: 'Postpartum Recovery Band',
    nameAr: 'حزام التعافي بعد الولادة',
    descEn: 'Gentle yet effective postpartum support band. Helps with diastasis recti recovery, provides lower back support, and aids uterine contraction. OB-GYN recommended.',
    descAr: 'حزام دعم ما بعد الولادة اللطيف والفعال. يساعد في التعافي من الفصل العضلي، ويوفر دعم أسفل الظهر، ويساعد في تقلص الرحم. موصى به من أطباء التوليد.',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=700&fit=crop&auto=format',
    ],
    category: 'postpartum',
    sizes: ['S', 'M', 'L', 'XL'],
    sizeChart: defaultSizeChart,
    stock: 55,
    rating: 4.9,
    reviewCount: 312,
    isNew: true,
    badge: 'New',
  },
  {
    id: 'prod-4',
    slug: 'sport-compression-vest',
    nameEn: 'Sport Compression Vest',
    nameAr: 'سترة ضغط رياضية',
    descEn: 'High-performance compression vest for workouts and daily wear. 360° support, moisture-wicking fabric, and targeted abdominal compression.',
    descAr: 'سترة ضغط عالية الأداء للتمارين والارتداء اليومي. دعم 360 درجة، وقماش يمتص الرطوبة، وضغط بطني مركّز.',
    price: 44.99,
    originalPrice: 59.99,
    images: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=700&fit=crop&auto=format',
    ],
    category: 'compression-vests',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    sizeChart: defaultSizeChart,
    stock: 33,
    rating: 4.5,
    reviewCount: 98,
  },
  {
    id: 'prod-5',
    slug: 'lift-enhance-shorts',
    nameEn: 'Lift & Enhance Shaper Shorts',
    nameAr: ' مشد رافع ومحسّن',
    descEn: 'Brazilian-style butt-lifting shorts with tummy control panel. Seamless construction, anti-slip waistband, and ultra-smooth finish under clothing.',
    descAr: 'شورت رفع بأسلوب برازيلي مع لوحة تحكم في البطن. بناء سلس وحزام خصر مضاد للانزلاق وإنهاء ناعم جدًا تحت الملابس.',
    price: 34.99,
    images: [
      'https://scontent.faly8-1.fna.fbcdn.net/v/t39.30808-6/542584951_763760406459758_4548798988409537280_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=p526x296&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=NAzdRd3ZX44Q7kNvwE11ThR&_nc_oc=Adqak9kqDZUnH_6xT10yLTRPaXt_8yRrZhJoeQU26El0uq14G6J74O5f7nZvYKGKlhE&_nc_zt=23&_nc_ht=scontent.faly8-1.fna&_nc_gid=o5SeROhF7DoueqNj6MuRIw&_nc_ss=7b2a8&oh=00_AQAgFnmd3767K1_ro6irkC6zK3krAuRZcGfiajzgl9q93Q&oe=6A6A7D13',
    ],
    category: 'butt-lifters',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    sizeChart: defaultSizeChart,
    stock: 67,
    rating: 4.7,
    reviewCount: 156,
    isBestSeller: true,
  },
  {
    id: 'prod-6',
    slug: 'thermal-slim-belt',
    nameEn: 'Thermal Slim Belt',
    nameAr: 'حزام التنحيف الحراري',
    descEn: 'Neoprene thermal belt that increases perspiration in the midsection during exercise. Velcro closure for adjustable fit. Machine washable.',
    descAr: 'حزام حراري من النيوبرين يزيد التعرق في منطقة الوسط أثناء التمرين. إغلاق بالفيلكرو لمقاس قابل للتعديل. قابل للغسيل بالغسالة.',
    price: 24.99,
    originalPrice: 34.99,
    images: [
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=700&fit=crop&auto=format',
    ],
    category: 'accessories',
    sizes: ['S/M', 'L/XL', '2XL/3XL'],
    sizeChart: defaultSizeChart,
    stock: 90,
    rating: 4.3,
    reviewCount: 74,
    badge: '29% OFF',
  },
  {
    id: 'prod-7',
    slug: 'lace-trim-bodysuit',
    nameEn: 'Lace Trim Shaper Bodysuit',
    nameAr: 'بودي سوت مشد بحافة دانتيل',
    descEn: 'Elegant lace-trimmed bodysuit shaper with built-in push-up cups. Perfect for special occasions. Adjustable shoulder straps, hook-and-eye closure.',
    descAr: 'بودي سوت مشد أنيق بحافة دانتيل مع كوب دفع مدمج. مثالي للمناسبات الخاصة. أحزمة كتف قابلة للتعديل وإغلاق بخطاف وعين.',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=700&fit=crop&auto=format',
    ],
    category: 'body-shapers',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    sizeChart: defaultSizeChart,
    stock: 21,
    rating: 4.8,
    reviewCount: 203,
    isNew: true,
  },
  {
    id: 'prod-8',
    slug: 'latex-waist-trainer-sport',
    nameEn: 'Latex Sport Waist Trainer',
    nameAr: 'مشد الخصر الرياضي اللاتكس',
    descEn: 'Sport-specific latex waist trainer with flexible steel spiral bones. Designed for intense workouts. Features sweat-wicking outer layer and soft inner lining.',
    descAr: 'مشد خصر رياضي من اللاتكس مع عظام حلزونية فولاذية مرنة. مصمم للتمارين المكثفة. يتميز بطبقة خارجية ماصة للعرق وبطانة داخلية ناعمة.',
    price: 42.99,
    originalPrice: 52.99,
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=700&fit=crop&auto=format',
    ],
    category: 'waist-trainers',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    sizeChart: defaultSizeChart,
    stock: 38,
    rating: 4.6,
    reviewCount: 147,
  },
]

export const reviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userName: 'Sarah M.',
    rating: 5,
    comment: 'Absolutely love this waist trainer! I can already see a difference after 2 weeks. The quality is amazing and it\'s very comfortable to wear.',
    date: '2025-11-15',
    approved: true,
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    userName: 'Fatima A.',
    rating: 5,
    comment: 'ممتاز جداً! يلتصق الجسم بشكل رائع والخامة عالية الجودة. أنصح به بشدة.',
    date: '2025-11-10',
    approved: true,
  },
  {
    id: 'rev-3',
    productId: 'prod-1',
    userName: 'Jessica L.',
    rating: 4,
    comment: 'Great product! Sizing runs a little small so I\'d suggest going one size up. Otherwise it\'s perfect.',
    date: '2025-10-28',
    approved: true,
  },
  {
    id: 'rev-4',
    productId: 'prod-2',
    userName: 'Noor K.',
    rating: 5,
    comment: 'خامة فاخرة وسلسة تحت الملابس. لا تبرز مطلقاً. أفضل مشد جربته.',
    date: '2025-11-20',
    approved: true,
  },
  {
    id: 'rev-5',
    productId: 'prod-3',
    userName: 'Maria G.',
    rating: 5,
    comment: 'Post C-section this has been a lifesaver. Gentle support, exactly what I needed for recovery.',
    date: '2025-11-18',
    approved: true,
  },
]

export const orders: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'LK-2025-1847',
    customerId: 'user-1',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 555 123 4567',
    customerEmail: 'sarah@email.com',
    address: '123 Maple Street, Apt 4B',
    city: 'New York',
    country: 'United States',
    notes: 'Please leave at the door.',
    items: [
      {
        productId: 'prod-1',
        productName: 'Pro Waist Cincher Elite',
        productImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop&auto=format',
        size: 'M',
        quantity: 1,
        price: 49.99,
      },
    ],
    subtotal: 49.99,
    delivery: 5.99,
    total: 55.98,
    status: 'shipped',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    shipmentCode: 'TK-882910-FX',
    createdAt: '2025-11-20T14:32:00Z',
    updatedAt: '2025-11-22T09:15:00Z',
  },
  {
    id: 'ord-2',
    orderNumber: 'LK-2025-1846',
    customerId: 'user-2',
    customerName: 'Fatima Al-Hassan',
    customerPhone: '+971 50 234 5678',
    customerEmail: 'fatima@email.com',
    address: 'Villa 12, Street 5, Al Barsha',
    city: 'Dubai',
    country: 'UAE',
    notes: '',
    items: [
      {
        productId: 'prod-2',
        productName: 'Full Body Shaper Supreme',
        productImage: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=200&h=200&fit=crop&auto=format',
        size: 'L',
        quantity: 1,
        price: 64.99,
      },
      {
        productId: 'prod-6',
        productName: 'Thermal Slim Belt',
        productImage: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=200&h=200&fit=crop&auto=format',
        size: 'L/XL',
        quantity: 2,
        price: 24.99,
      },
    ],
    subtotal: 114.97,
    delivery: 0,
    total: 114.97,
    status: 'confirmed',
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    createdAt: '2025-11-21T10:05:00Z',
    updatedAt: '2025-11-21T16:30:00Z',
  },
  {
    id: 'ord-3',
    orderNumber: 'LK-2025-1845',
    customerId: 'user-3',
    customerName: 'Nour Abdelmaksoud',
    customerPhone: '+20 100 987 6543',
    customerEmail: 'nour@email.com',
    address: '45 El Tahrir Square, Building 3',
    city: 'Cairo',
    country: 'Egypt',
    notes: 'Please call before delivery.',
    items: [
      {
        productId: 'prod-3',
        productName: 'Postpartum Recovery Band',
        productImage: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=200&h=200&fit=crop&auto=format',
        size: 'M',
        quantity: 1,
        price: 39.99,
      },
    ],
    subtotal: 39.99,
    delivery: 3.99,
    total: 43.98,
    status: 'pending',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    createdAt: '2025-11-22T08:20:00Z',
    updatedAt: '2025-11-22T08:20:00Z',
  },
  {
    id: 'ord-4',
    orderNumber: 'LK-2025-1844',
    customerId: 'user-4',
    customerName: 'Maria Santos',
    customerPhone: '+55 11 98765 4321',
    customerEmail: 'maria@email.com',
    address: 'Rua das Flores 88',
    city: 'São Paulo',
    country: 'Brazil',
    notes: '',
    items: [
      {
        productId: 'prod-5',
        productName: 'Lift & Enhance Shaper Shorts',
        productImage: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=200&h=200&fit=crop&auto=format',
        size: 'S',
        quantity: 1,
        price: 34.99,
      },
    ],
    subtotal: 34.99,
    delivery: 7.99,
    total: 42.98,
    status: 'delivered',
    paymentMethod: 'cod',
    paymentStatus: 'paid',
    createdAt: '2025-11-15T11:40:00Z',
    updatedAt: '2025-11-19T14:00:00Z',
  },
]

export const editLogs: EditLog[] = [
  {
    id: 'log-1',
    orderId: 'ord-1',
    orderNumber: 'LK-2025-1847',
    field: 'Status',
    oldValue: 'Confirmed',
    newValue: 'Shipped',
    editedBy: 'Ahmed Hassan',
    editorRole: 'Admin',
    timestamp: '2025-11-22T09:15:00Z',
  },
  {
    id: 'log-2',
    orderId: 'ord-1',
    orderNumber: 'LK-2025-1847',
    field: 'Shipment Code',
    oldValue: '—',
    newValue: 'TK-882910-FX',
    editedBy: 'Ahmed Hassan',
    editorRole: 'Admin',
    timestamp: '2025-11-22T09:15:00Z',
  },
  {
    id: 'log-3',
    orderId: 'ord-2',
    orderNumber: 'LK-2025-1846',
    field: 'Customer Phone',
    oldValue: '+971 50 234 5000',
    newValue: '+971 50 234 5678',
    editedBy: 'Ahmed Hassan',
    editorRole: 'Admin',
    timestamp: '2025-11-21T16:30:00Z',
  },
  {
    id: 'log-4',
    orderId: 'ord-2',
    orderNumber: 'LK-2025-1846',
    field: 'Payment Status',
    oldValue: 'Pending',
    newValue: 'Paid',
    editedBy: 'Layla Ismail',
    editorRole: 'Admin',
    timestamp: '2025-11-21T16:28:00Z',
  },
]

export const notifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'order',
    title: 'Order Shipped',
    message: 'Your order #LK-2025-1847 has been shipped! Tracking code: TK-882910-FX',
    read: false,
    createdAt: '2025-11-22T09:20:00Z',
    orderId: 'ord-1',
  },
  {
    id: 'notif-2',
    type: 'offer',
    title: 'Flash Sale — 40% Off!',
    message: 'Limited time offer on all waist trainers. Shop now before it ends!',
    read: false,
    createdAt: '2025-11-21T12:00:00Z',
  },
  {
    id: 'notif-3',
    type: 'order',
    title: 'Order Confirmed',
    message: 'Great news! Your order #LK-2025-1846 has been confirmed and is being processed.',
    read: true,
    createdAt: '2025-11-21T16:35:00Z',
    orderId: 'ord-2',
  },
  {
    id: 'notif-4',
    type: 'chat',
    title: 'Support replied',
    message: 'Our support team has replied to your message. Tap to view.',
    read: true,
    createdAt: '2025-11-20T15:00:00Z',
  },
]

export const chatMessages = [
  { id: 'm-1', sender: 'user', text: "Hi! I'd like to know more about sizing for the Pro Waist Cincher.", time: '14:20', read: true },
  { id: 'm-2', sender: 'support', text: "Hello! We'd be happy to help. What are your waist measurements?", time: '14:23', read: true },
  { id: 'm-3', sender: 'user', text: "My waist is about 76cm.", time: '14:25', read: true },
  { id: 'm-4', sender: 'support', text: "Great! For a 76cm waist, we recommend a Medium (M). It will give you optimal compression while remaining comfortable.", time: '14:27', read: true },
  { id: 'm-5', sender: 'user', text: "Perfect, thank you! One more thing — how long can I wear it daily?", time: '14:28', read: true },
  { id: 'm-6', sender: 'support', text: "We recommend starting with 2-4 hours a day and gradually increasing to 8 hours. Always listen to your body!", time: '14:30', read: false },
]

export const adminChatInbox = [
  { id: 'conv-1', name: 'Sarah Johnson', avatar: 'S', lastMessage: 'Thank you so much!', time: '14:32', unread: 0, online: true },
  { id: 'conv-2', name: 'Fatima Al-Hassan', avatar: 'F', lastMessage: 'When will my order arrive?', time: '13:45', unread: 2, online: false },
  { id: 'conv-3', name: 'Nour Abdelmaksoud', avatar: 'N', lastMessage: 'I need help with sizing', time: '11:20', unread: 1, online: true },
  { id: 'conv-4', name: 'Maria Santos', avatar: 'M', lastMessage: 'Order delivered! 😊', time: 'Yesterday', unread: 0, online: false },
]
