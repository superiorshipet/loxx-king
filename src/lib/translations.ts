export type Lang = 'en' | 'ar'

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  home: { en: 'Home', ar: 'الرئيسية' },
  shop: { en: 'Shop', ar: 'المتجر' },
  cart: { en: 'Cart', ar: 'السلة' },
  orders: { en: 'My Orders', ar: 'طلباتي' },
  profile: { en: 'Profile', ar: 'حسابي' },
  notifications: { en: 'Notifications', ar: 'الإشعارات' },
  chat: { en: 'Support', ar: 'الدعم' },
  about: { en: 'About Us', ar: 'عنا' },
  logout: { en: 'Logout', ar: 'تسجيل الخروج' },
  login: { en: 'Login', ar: 'تسجيل الدخول' },
  register: { en: 'Register', ar: 'إنشاء حساب' },

  // Common
  search: { en: 'Search', ar: 'بحث' },
  filter: { en: 'Filter', ar: 'تصفية' },
  sort: { en: 'Sort', ar: 'ترتيب' },
  close: { en: 'Close', ar: 'إغلاق' },
  save: { en: 'Save', ar: 'حفظ' },
  cancel: { en: 'Cancel', ar: 'إلغاء' },
  confirm: { en: 'Confirm', ar: 'تأكيد' },
  delete: { en: 'Delete', ar: 'حذف' },
  edit: { en: 'Edit', ar: 'تعديل' },
  add: { en: 'Add', ar: 'إضافة' },
  view: { en: 'View', ar: 'عرض' },
  back: { en: 'Back', ar: 'رجوع' },
  next: { en: 'Next', ar: 'التالي' },
  previous: { en: 'Previous', ar: 'السابق' },
  loading: { en: 'Loading...', ar: 'جار التحميل...' },
  error: { en: 'Something went wrong', ar: 'حدث خطأ ما' },
  empty: { en: 'Nothing here yet', ar: 'لا يوجد شيء هنا بعد' },
  seeAll: { en: 'See All', ar: 'عرض الكل' },
  currency: { en: 'USD', ar: 'USD' },
  inStock: { en: 'In Stock', ar: 'متوفر' },
  outOfStock: { en: 'Out of Stock', ar: 'غير متوفر' },
  free: { en: 'Free', ar: 'مجاني' },

  // Product
  addToCart: { en: 'Add to Cart', ar: 'أضف للسلة' },
  orderNow: { en: 'Order Now', ar: 'اطلب الآن' },
  size: { en: 'Size', ar: 'المقاس' },
  sizeGuide: { en: 'Size Guide', ar: 'دليل المقاسات' },
  quantity: { en: 'Quantity', ar: 'الكمية' },
  description: { en: 'Description', ar: 'الوصف' },
  reviews: { en: 'Reviews', ar: 'التقييمات' },
  writeReview: { en: 'Write a Review', ar: 'اكتب تقييمًا' },
  relatedProducts: { en: 'Related Products', ar: 'منتجات مشابهة' },
  price: { en: 'Price', ar: 'السعر' },
  originalPrice: { en: 'Original Price', ar: 'السعر الأصلي' },
  discount: { en: 'Off', ar: 'خصم' },
  selectSize: { en: 'Select a size', ar: 'اختر مقاسًا' },

  // Categories
  waistTrainers: { en: 'Waist Trainers', ar: 'مشدات الخصر' },
  bodyShapers: { en: 'Body Shapers', ar: 'مشدات الجسم' },
  postpartum: { en: 'Postpartum Shapers', ar: 'مشدات ما بعد الولادة' },
  compressionVests: { en: 'Compression Vests', ar: 'سترات الضغط' },
  buttLifters: { en: 'Butt Lifters', ar: 'رافعات الأرداف' },
  accessories: { en: 'Accessories', ar: 'إكسسوارات' },

  // Cart
  cartEmpty: { en: 'Your cart is empty', ar: 'سلتك فارغة' },
  cartEmptyDesc: { en: 'Add some items to get started', ar: 'أضف بعض المنتجات للبدء' },
  subtotal: { en: 'Subtotal', ar: 'المجموع الفرعي' },
  delivery: { en: 'Delivery', ar: 'التوصيل' },
  total: { en: 'Total', ar: 'الإجمالي' },
  proceedCheckout: { en: 'Proceed to Checkout', ar: 'المتابعة للدفع' },
  remove: { en: 'Remove', ar: 'إزالة' },

  // Checkout
  checkout: { en: 'Checkout', ar: 'الدفع' },
  step1: { en: 'Delivery Info', ar: 'معلومات التوصيل' },
  step2: { en: 'Payment', ar: 'الدفع' },
  step3: { en: 'Review & Confirm', ar: 'مراجعة وتأكيد' },
  fullName: { en: 'Full Name', ar: 'الاسم الكامل' },
  phone: { en: 'Phone Number', ar: 'رقم الهاتف' },
  address: { en: 'Address', ar: 'العنوان' },
  city: { en: 'City', ar: 'المدينة' },
  country: { en: 'Country', ar: 'الدولة' },
  notes: { en: 'Order Notes (optional)', ar: 'ملاحظات الطلب (اختياري)' },
  cashOnDelivery: { en: 'Cash on Delivery', ar: 'الدفع عند الاستلام' },
  bankTransfer: { en: 'Bank Transfer', ar: 'تحويل بنكي' },
  placeOrder: { en: 'Place Order', ar: 'تأكيد الطلب' },
  uploadProof: { en: 'Upload Transfer Proof', ar: 'رفع إثبات التحويل' },

  // Orders
  orderNumber: { en: 'Order #', ar: 'طلب رقم' },
  orderDate: { en: 'Order Date', ar: 'تاريخ الطلب' },
  orderStatus: { en: 'Status', ar: 'الحالة' },
  trackOrder: { en: 'Track Order', ar: 'تتبع الطلب' },
  continueShopping: { en: 'Continue Shopping', ar: 'مواصلة التسوق' },
  orderPlaced: { en: 'Order Placed Successfully!', ar: 'تم تقديم طلبك بنجاح!' },
  orderSent: { en: "We've sent your order details to WhatsApp & Email", ar: 'تم إرسال تفاصيل طلبك عبر واتساب والبريد الإلكتروني' },
  pending: { en: 'Pending', ar: 'قيد الانتظار' },
  confirmed: { en: 'Confirmed', ar: 'مؤكد' },
  shipped: { en: 'Shipped', ar: 'تم الشحن' },
  delivered: { en: 'Delivered', ar: 'تم التوصيل' },
  cancelled: { en: 'Cancelled', ar: 'ملغي' },

  // Auth
  emailOrPhone: { en: 'Email or Phone', ar: 'البريد الإلكتروني أو الهاتف' },
  password: { en: 'Password', ar: 'كلمة المرور' },
  forgotPassword: { en: 'Forgot Password?', ar: 'نسيت كلمة المرور؟' },
  noAccount: { en: "Don't have an account?", ar: 'ليس لديك حساب؟' },
  hasAccount: { en: 'Already have an account?', ar: 'هل لديك حساب بالفعل؟' },
  firstName: { en: 'First Name', ar: 'الاسم الأول' },
  lastName: { en: 'Last Name', ar: 'اسم العائلة' },
  email: { en: 'Email', ar: 'البريد الإلكتروني' },

  // Profile
  savedAddresses: { en: 'Saved Addresses', ar: 'العناوين المحفوظة' },
  preferences: { en: 'Preferences', ar: 'التفضيلات' },
  language: { en: 'Language', ar: 'اللغة' },
  theme: { en: 'Theme', ar: 'المظهر' },
  lightMode: { en: 'Light', ar: 'فاتح' },
  darkMode: { en: 'Dark', ar: 'داكن' },
  personalInfo: { en: 'Personal Info', ar: 'المعلومات الشخصية' },

  // Support Chat
  typeMessage: { en: 'Type a message...', ar: 'اكتب رسالة...' },
  sendMessage: { en: 'Send', ar: 'إرسال' },
  attachFile: { en: 'Attach File', ar: 'إرفاق ملف' },
  supportOnline: { en: 'Support Online', ar: 'الدعم متاح' },
  supportOffline: { en: 'Support Offline', ar: 'الدعم غير متاح' },

  // Admin
  dashboard: { en: 'Dashboard', ar: 'لوحة التحكم' },
  todayOrders: { en: "Today's Orders", ar: 'طلبات اليوم' },
  totalProducts: { en: 'Total Products', ar: 'إجمالي المنتجات' },
  totalCategories: { en: 'Categories', ar: 'الفئات' },
  todayVisitors: { en: "Today's Visitors", ar: 'زوار اليوم' },
  recentOrders: { en: 'Recent Orders', ar: 'الطلبات الأخيرة' },
  ordersManagement: { en: 'Orders', ar: 'الطلبات' },
  productsManagement: { en: 'Products', ar: 'المنتجات' },
  categoriesManagement: { en: 'Categories', ar: 'الفئات' },
  offersManagement: { en: 'Offers', ar: 'العروض' },
  reviewsModeration: { en: 'Reviews', ar: 'التقييمات' },
  adminChat: { en: 'Support Chat', ar: 'دردشة الدعم' },
  invoices: { en: 'Invoices', ar: 'الفواتير' },
  editLogs: { en: 'Edit Logs', ar: 'سجل التعديلات' },
  acceptOrder: { en: 'Accept Order', ar: 'قبول الطلب' },
  changeStatus: { en: 'Change Status', ar: 'تغيير الحالة' },
  editOrder: { en: 'Edit Order', ar: 'تعديل الطلب' },
  shipmentCode: { en: 'Shipment Code', ar: 'كود الشحن' },
  bulkAction: { en: 'Bulk Action', ar: 'إجراء جماعي' },
  addProduct: { en: 'Add Product', ar: 'إضافة منتج' },
  productName: { en: 'Product Name', ar: 'اسم المنتج' },
  category: { en: 'Category', ar: 'الفئة' },
  stock: { en: 'Stock', ar: 'المخزون' },
  approve: { en: 'Approve', ar: 'موافقة' },
  hide: { en: 'Hide', ar: 'إخفاء' },
  escalate: { en: 'Escalate to Chat', ar: 'تصعيد للدردشة' },

  // About
  aboutTitle: { en: 'About LOXX KING', ar: 'عن لوكس كينج' },
  aboutSubtitle: { en: 'Confidence starts here.', ar: 'تبدأ الثقة من هنا.' },
  aboutBody: {
    en: "We're LOXX KING — a brand born from the belief that every woman deserves to feel powerful, beautiful, and completely herself. Our shapewear is engineered for real bodies, real lives, and real confidence.",
    ar: 'نحن لوكس كينج — علامة تجارية وُلدت من الإيمان بأن كل امرأة تستحق أن تشعر بالقوة والجمال وأن تكون نفسها تمامًا. ملابسنا الضاغطة مصممة لأجساد حقيقية وحياة حقيقية وثقة حقيقية.',
  },

  // Trust
  securePayment: { en: 'Secure Payment', ar: 'دفع آمن' },
  fastDelivery: { en: 'Fast Delivery', ar: 'توصيل سريع' },
  easyReturns: { en: 'Easy Returns', ar: 'إرجاع سهل' },
  support24: { en: '24/7 Support', ar: 'دعم على مدار الساعة' },

  // Sizes
  sizeGuideTitle: { en: 'Size Guide', ar: 'دليل المقاسات' },
  sizeGuideDesc: { en: 'Measure your natural waist and hips to find your perfect fit.', ar: 'قيسي خصرك الطبيعي وأردافك لإيجاد مقاسك المثالي.' },
  waist: { en: 'Waist (cm)', ar: 'الخصر (سم)' },
  hips: { en: 'Hips (cm)', ar: 'الأرداف (سم)' },

  // Homepage
  heroTitle: { en: 'Shape Your Confidence', ar: 'شكّلي ثقتك' },
  heroSubtitle: { en: 'Premium shapewear engineered for every body.', ar: 'ملابس ضاغطة فاخرة مصممة لكل جسم.' },
  shopNow: { en: 'Shop Now', ar: 'تسوقي الآن' },
  bestSellers: { en: 'Best Sellers', ar: 'الأكثر مبيعًا' },
  newArrivals: { en: 'New Arrivals', ar: 'وصل حديثًا' },
  activeOffers: { en: 'Active Offers', ar: 'العروض النشطة' },
  shopByCategory: { en: 'Shop by Category', ar: 'تسوقي حسب الفئة' },

  // Notifications
  noNotifications: { en: 'No notifications yet', ar: 'لا توجد إشعارات بعد' },
  markAllRead: { en: 'Mark all as read', ar: 'تعليم الكل كمقروء' },
  unread: { en: 'Unread', ar: 'غير مقروء' },
}

export function t(key: string, lang: Lang): string {
  return translations[key]?.[lang] ?? key
}

export const languages = [
  { code: 'en' as Lang, label: 'EN', name: 'English' },
  { code: 'ar' as Lang, label: 'AR', name: 'العربية' },
]
