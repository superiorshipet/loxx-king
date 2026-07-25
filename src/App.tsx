import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'

// Customer Pages (lazy loaded)
const HomePage = lazy(() => import('./pages/customer/HomePage'))
const CategoryPage = lazy(() => import('./pages/customer/CategoryPage'))
const ProductDetailPage = lazy(() => import('./pages/customer/ProductDetailPage'))
const CartPage = lazy(() => import('./pages/customer/CartPage'))
const CheckoutPage = lazy(() => import('./pages/customer/CheckoutPage'))
const OrderConfirmationPage = lazy(() => import('./pages/customer/OrderConfirmationPage'))
const MyOrdersPage = lazy(() => import('./pages/customer/MyOrdersPage'))
const LoginPage = lazy(() => import('./pages/customer/LoginPage'))
const ProfilePage = lazy(() => import('./pages/customer/ProfilePage'))
const NotificationsPage = lazy(() => import('./pages/customer/NotificationsPage'))
const SupportChatPage = lazy(() => import('./pages/customer/SupportChatPage'))
const AboutPage = lazy(() => import('./pages/customer/AboutPage'))

// Admin Pages (lazy loaded)
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'))
const OrdersPage = lazy(() => import('./pages/admin/OrdersPage'))
const OrderReviewPage = lazy(() => import('./pages/admin/OrderReviewPage'))
const ProductsPage = lazy(() => import('./pages/admin/ProductsPage'))
const AddProductPage = lazy(() => import('./pages/admin/AddProductPage'))
const CategoriesPage = lazy(() => import('./pages/admin/CategoriesPage'))
const OffersPage = lazy(() => import('./pages/admin/OffersPage'))
const ReviewsModerationPage = lazy(() => import('./pages/admin/ReviewsModerationPage'))
const AdminChatPage = lazy(() => import('./pages/admin/AdminChatPage'))
const InvoicesPage = lazy(() => import('./pages/admin/InvoicesPage'))
const AdminNotificationsPage = lazy(() => import('./pages/admin/AdminNotificationsPage'))
const EditLogsPage = lazy(() => import('./pages/admin/EditLogsPage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#0E0E11] border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground font-medium">Loading…</p>
      </div>
    </div>
  )
}

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useApp()
  if (!user || (user.role !== 'admin' && user.role !== 'manager' && user.role !== 'sales')) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function AdminOnlyGuard({ children }: { children: React.ReactNode }) {
  const { user } = useApp()
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin" replace />
  }
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/orders" element={<MyOrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/chat" element={<SupportChatPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminGuard><DashboardPage /></AdminGuard>} />
        <Route path="/admin/orders" element={<AdminGuard><OrdersPage /></AdminGuard>} />
        <Route path="/admin/orders/:id" element={<AdminGuard><OrderReviewPage /></AdminGuard>} />
        <Route path="/admin/products" element={<AdminGuard><ProductsPage /></AdminGuard>} />
        <Route path="/admin/products/add" element={<AdminGuard><AddProductPage /></AdminGuard>} />
        <Route path="/admin/products/edit/:id" element={<AdminGuard><AddProductPage /></AdminGuard>} />
        <Route path="/admin/categories" element={<AdminGuard><CategoriesPage /></AdminGuard>} />
        <Route path="/admin/offers" element={<AdminGuard><OffersPage /></AdminGuard>} />
        <Route path="/admin/reviews" element={<AdminGuard><ReviewsModerationPage /></AdminGuard>} />
        <Route path="/admin/chat" element={<AdminGuard><AdminChatPage /></AdminGuard>} />
        <Route path="/admin/invoices" element={<AdminGuard><InvoicesPage /></AdminGuard>} />
        <Route path="/admin/notifications" element={<AdminGuard><AdminNotificationsPage /></AdminGuard>} />
        <Route path="/admin/edit-logs" element={<AdminOnlyGuard><EditLogsPage /></AdminOnlyGuard>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  )
}