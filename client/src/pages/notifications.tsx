// src/pages/Notifications.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

type NotificationType = "success" | "error" | "warning" | "info";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
}

const typeStyles: Record<NotificationType, { bg: string; text: string; icon: React.ElementType }> = {
  success: { bg: "bg-green-50 dark:bg-green-900/30", text: "text-green-600 dark:text-green-400", icon: CheckCircle },
  error: { bg: "bg-red-50 dark:bg-red-900/30", text: "text-red-600 dark:text-red-400", icon: AlertCircle },
  warning: { bg: "bg-amber-50 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", icon: AlertTriangle },
  info: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", icon: Info },
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // محاكاة جلب البيانات
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications([
        {
          id: "1",
          title: "تمت العملية بنجاح",
          message: "تم إضافة المنتج إلى السلة بنجاح.",
          type: "success",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "خطأ في الدفع",
          message: "حدث خطأ أثناء محاولة الدفع. حاول مرة أخرى.",
          type: "error",
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "تحذير المخزون",
          message: "الكمية المتبقية من هذا المنتج أقل من 5 قطع.",
          type: "warning",
          createdAt: new Date().toISOString(),
        },
        {
          id: "4",
          title: "تنويه",
          message: "سيتم تحديث بيانات الأسعار غداً.",
          type: "info",
          createdAt: new Date().toISOString(),
        },
        {
          id: "5",
          title: "إشعار بدون نوع",
          message: "هذا إشعار تجريبي لنوع غير معروف.",
          type: "info", // fallback
          createdAt: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500 dark:text-gray-400 text-sm">جاري تحميل الإشعارات...</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500 dark:text-gray-400 text-sm">لا توجد إشعارات حتى الآن.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">الإشعارات</h1>
      <div className="grid gap-4">
        <AnimatePresence>
          {notifications.map((n) => {
            const { bg, text, icon: Icon } = typeStyles[n.type] || typeStyles.info;
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`flex items-start gap-3 p-4 rounded-lg shadow-sm border ${bg} border-gray-200 dark:border-gray-700`}
              >
                <div className={`flex-shrink-0 ${text}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-medium text-gray-900 dark:text-white text-sm">{n.title}</h2>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{n.message}</p>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 block">
                    {new Date(n.createdAt).toLocaleString("ar-EG", { dateStyle: "short", timeStyle: "short" })}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}