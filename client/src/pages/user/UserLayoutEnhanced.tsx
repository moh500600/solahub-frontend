import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Home,
  Package,
  ShieldCheck,
  Newspaper,
  Settings,
  LogOut,
  Bell,
  Search,
  User,
  UserCog,
  Trees,
  Store,
  Building,
  Users,
  ChevronDown,
  Menu,
  X,
  BarChart3,
  FileText,
  Wrench,
  TrendingUp,
  DollarSign,
  Award,
  MessageSquare,
  Calendar,
  Heart,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: number;
  subItems?: SidebarItem[];
}

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface UserLayoutEnhancedProps {
  children: React.ReactNode;
}

export default function UserLayoutEnhanced({ children }: UserLayoutEnhancedProps) {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "تم استلام الطلب",
      message: "تم استلام طلبك ORD-001 بنجاح",
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: "2",
      type: "info",
      title: "عرض جديد متاح",
      message: "عرض خاص لك بخصم 20% على أنظمة الري",
      timestamp: new Date(Date.now() - 7200000),
      read: false
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    setCurrentPath(path);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    setLocation("/login");
  };

  const handleNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // تحديد نوع الحساب والأيقونة
  const getUserTypeInfo = () => {
    const type = user?.userType || "customer";
    const info: Record<string, { label: string; icon: React.ComponentType<any>; color: string }> = {
      customer: { label: "عميل", icon: User, color: "text-blue-600" },
      engineer: { label: "مهندس", icon: UserCog, color: "text-orange-600" },
      farm_owner: { label: "صاحب مزرعة", icon: Trees, color: "text-green-600" },
      store: { label: "متجر", icon: Store, color: "text-purple-600" },
      company: { label: "شركة", icon: Building, color: "text-red-600" },
      institution: { label: "مؤسسة", icon: Users, color: "text-cyan-600" }
    };
    return info[type] || info.customer;
  };

  // تحديد عناصر الشريط الجانبي بناءً على نوع الحساب
  const getSidebarItems = (): SidebarItem[] => {
    const baseItems: SidebarItem[] = [
      {
        id: "overview",
        label: "نظرة عامة",
        icon: Home,
        href: "/user/dashboard",
      },
      {
        id: "orders",
        label: "الطلبات والمشتريات",
        icon: Package,
        href: "/user/orders",
        badge: 3,
      },
      {
        id: "verification",
        label: "إثبات الملكية والدفع",
        icon: ShieldCheck,
        href: "/user/verification",
        subItems: [
          { id: "product-verification", label: "توثيق المنتجات", icon: FileText, href: "/user/verification/products" },
          { id: "payment-proof", label: "إثبات الدفع", icon: DollarSign, href: "/user/verification/payment" },
        ],
      },
      {
        id: "news",
        label: "الأخبار والعروض",
        icon: Newspaper,
        href: "/user/news",
      },
    ];

    const type = user?.userType || "customer";
    
    if (type === "engineer") {
      baseItems.splice(3, 0, {
        id: "projects",
        label: "مشاريعي",
        icon: BarChart3,
        href: "/user/engineer/projects",
        subItems: [
          { id: "active-projects", label: "المشاريع النشطة", icon: TrendingUp, href: "/user/engineer/projects/active" },
          { id: "completed-projects", label: "المشاريع المكتملة", icon: Award, href: "/user/engineer/projects/completed" },
          { id: "certificates", label: "الشهادات", icon: FileText, href: "/user/engineer/certificates" },
        ],
      });
      baseItems.splice(4, 0, {
        id: "earnings",
        label: "الأرباح والعمولات",
        icon: DollarSign,
        href: "/user/engineer/earnings",
      });
    }

    if (type === "farm_owner") {
      baseItems.splice(3, 0, {
        id: "irrigation",
        label: "أنظمة الري",
        icon: Wrench,
        href: "/user/farm/irrigation",
        subItems: [
          { id: "systems", label: "الأنظمة المثبتة", icon: Package, href: "/user/farm/irrigation/systems" },
          { id: "diesel-savings", label: "توفير الديزل", icon: TrendingUp, href: "/user/farm/irrigation/savings" },
        ],
      });
      baseItems.splice(4, 0, {
        id: "consultations",
        label: "الاستشارات الزراعية",
        icon: MessageSquare,
        href: "/user/farm/consultations",
      });
    }

    if (type === "store") {
      baseItems.splice(3, 0, {
        id: "inventory",
        label: "إدارة المخزون",
        icon: Package,
        href: "/user/store/inventory",
        subItems: [
          { id: "products", label: "المنتجات", icon: Package, href: "/user/store/inventory/products" },
          { id: "stock", label: "الأسهم", icon: BarChart3, href: "/user/store/inventory/stock" },
        ],
      });
      baseItems.splice(4, 0, {
        id: "sales",
        label: "المبيعات والإحصائيات",
        icon: TrendingUp,
        href: "/user/store/sales",
      });
      baseItems.splice(5, 0, {
        id: "commissions",
        label: "العمولات",
        icon: DollarSign,
        href: "/user/store/commissions",
      });
    }

    if (type === "company") {
      baseItems.splice(3, 0, {
        id: "projects",
        label: "مشاريعي",
        icon: BarChart3,
        href: "/user/company/projects",
        subItems: [
          { id: "active", label: "المشاريع النشطة", icon: TrendingUp, href: "/user/company/projects/active" },
          { id: "reports", label: "التقارير", icon: FileText, href: "/user/company/projects/reports" },
        ],
      });
      baseItems.splice(4, 0, {
        id: "sustainability",
        label: "تقارير الاستدامة",
        icon: BarChart3,
        href: "/user/company/sustainability",
      });
      baseItems.splice(5, 0, {
        id: "contracts",
        label: "العقود والاتفاقيات",
        icon: FileText,
        href: "/user/company/contracts",
      });
    }

    if (type === "institution") {
      baseItems.splice(3, 0, {
        id: "tenders",
        label: "المناقصات",
        icon: FileText,
        href: "/user/institution/tenders",
      });
      baseItems.splice(4, 0, {
        id: "reports",
        label: "التقارير والإحصائيات",
        icon: BarChart3,
        href: "/user/institution/reports",
      });
      baseItems.splice(5, 0, {
        id: "training",
        label: "برامج التدريب",
        icon: Award,
        href: "/user/institution/training",
      });
    }

    baseItems.push(
      { type: "separator" } as any,
      {
        id: "profile",
        label: "إعدادات الحساب",
        icon: Settings,
        href: "/user/profile",
      }
    );

    return baseItems;
  };

  const userTypeInfo = getUserTypeInfo();
  const UserTypeIcon = userTypeInfo.icon;
  const sidebarItems = getSidebarItems();

  const SidebarItemComponent = ({ item, level = 0 }: { item: SidebarItem; level?: number }) => {
    if ((item as any).type === "separator") {
      return <Separator className="my-2" />;
    }

    const isActive = currentPath === item.href;
    const isExpanded = expandedMenu === item.id;

    return (
      <div key={item.id}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={`w-full justify-start transition-all ${level > 0 ? "pl-8" : ""}`}
          onClick={() => {
            if (item.subItems) {
              setExpandedMenu(isExpanded ? null : item.id);
            } else {
              setLocation(item.href);
              setMobileMenuOpen(false);
            }
          }}
        >
          <item.icon className="ml-2 h-4 w-4" />
          <span className="flex-1 text-right">{item.label}</span>
          {item.badge && <Badge className="ml-2">{item.badge}</Badge>}
          {item.subItems && (
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          )}
        </Button>
        {item.subItems && isExpanded && (
          <div className="space-y-1 mt-1">
            {item.subItems.map((subItem) => (
              <SidebarItemComponent key={subItem.id} item={subItem} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center`}>
                <UserTypeIcon className={`h-5 w-5 ${userTypeInfo.color}`} />
              </div>
              <div>
                <h1 className="text-lg font-bold">لوحة التحكم</h1>
                <p className="text-xs text-muted-foreground">{userTypeInfo.label}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث..."
                className="pr-10 w-64"
              />
            </div>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                title="الإشعارات"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b">
                    <h3 className="font-bold">الإشعارات</h3>
                  </div>
                  {notifications.length > 0 ? (
                    <div className="divide-y">
                      {notifications.map(notif => (
                        <div
                          key={notif.id}
                          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                            !notif.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleNotificationRead(notif.id)}
                        >
                          <div className="flex items-start gap-3">
                            {notif.type === 'success' && (
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                            )}
                            {notif.type === 'warning' && (
                              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-1" />
                            )}
                            {notif.type === 'info' && (
                              <Bell className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-sm">{notif.title}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {new Date(notif.timestamp).toLocaleTimeString('ar-SA')}
                              </p>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>لا توجد إشعارات</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-600">
              <LogOut className="ml-2 h-4 w-4" />
              خروج
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-white border-r overflow-y-auto transition-all duration-300 ${
            mobileMenuOpen ? "absolute left-0 top-0 h-full z-10 shadow-lg" : "hidden md:block"
          }`}
        >
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => (
              <SidebarItemComponent key={item.id} item={item} />
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
