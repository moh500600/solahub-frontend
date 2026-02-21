import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { 
  Sun,
  User,
  Bell,
  Search,
  Download,
  Eye,
  Edit,
  ShoppingCart,
  Users as UsersIcon,
  Building,
  Crown,
  DollarSign,
  Wrench,
  Car,
  Zap,
  Battery,
  Handshake,
  Award,
  Mail,
  Users2,
  UserCircle,
  MapPin,
  TrendingUp,
  LogOut,
  Home,
  Building2,
  CheckCircle,
  RefreshCw,
  ClipboardCheck,
  Target,
  HeadphonesIcon,
  BookOpen,
  Layers,
  SmartphoneCharging,
  LifeBuoy,
  ChartLine,
  Package,
  Cpu,
  Grid3x3,
  Warehouse,
  Shield,
  ShieldCheck,
  Smartphone,
  Bot,
  Globe,
  Megaphone,
  FileText,
  HelpCircle,
  Newspaper,
  FolderGit2,
  Truck,
  CreditCard,
  FileBarChart,
  Calendar,
  CalendarCheck,
  Phone,
  PhoneCall,
  MessageSquare,
  ClipboardList,
  AlertCircle,
  MailQuestion,
  Coins,
  FileCheck,
  MailOpen,
  Trash2,
  Settings as SettingsIcon,
  Plus,
  Store,
  Factory,
  Trees,
  Briefcase,
  Farm
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Sidebar from "./Sidebar";

export default function DutchBoard() {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  // بيانات تجريبية
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalOrders: 345,
    totalProducts: 89,
    totalRevenue: 1250000,
    pendingOrders: 23,
    lowStockProducts: 12
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([
    { id: "#ORD-001", customer: "أحمد محمد", date: "2024-01-15", amount: 25000, status: "قيد التجهيز", payment: "مدفوع" },
    { id: "#ORD-002", customer: "شركة النور", date: "2024-01-14", amount: 75000, status: "تم التسليم", payment: "مدفوع" },
    { id: "#ORD-003", customer: "مزارع الخير", date: "2024-01-13", amount: 45000, status: "قيد الشحن", payment: "مدفوع" },
    { id: "#ORD-004", customer: "مؤسسة التقنية", date: "2024-01-12", amount: 120000, status: "معلق", payment: "بانتظار الدفع" },
    { id: "#ORD-005", customer: "متجر الطاقة", date: "2024-01-11", amount: 32000, status: "تم التسليم", payment: "مدفوع" }
  ]);

  useEffect(() => {
    // التحقق من صحة المسؤول
    const adminUser = localStorage.getItem("admin_user");
    const isAuth = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("userRole");

    if (adminUser && isAuth === "true" && userRole === "admin") {
      setIsAuthenticated(true);
      setUser(JSON.parse(adminUser));
    } else {
      setLocation("/login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("admin_user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    setLocation("/login");
  };

  // دالة للانتقال إلى صفحات مختلفة - محدثة كاملة
  const navigateToPage = (page: string) => {
    const pageRoutes: Record<string, string> = {
      // لوحة التحكم
      "dashboard": "/admin",
      
      // المستخدمين والوكلاء
      "engineers": "/admin/engineers",
      "institutions": "/admin/institutions",
      "stores": "/admin/stores",
      "farms": "/admin/farms",
      "companies": "/admin/companies",
      "agents": "/admin/agents",
      "delegates": "/admin/delegates",
      "ai-assistant": "/admin/ai-assistant",
      "chatbot": "/admin/chatbot",
      
      // الاشتراكات
      "subscriptions": "/admin/subscriptions",
      "active-subscriptions": "/admin/active-subscriptions",
      "subscription-renewals": "/admin/subscription-renewals",
      "subscription-analytics": "/admin/subscription-analytics",
      
      // المشاريع
      "commercial-projects": "/admin/commercial-projects",
      "residential-projects": "/admin/residential-projects",
      "government-projects": "/admin/government-projects",
      "project-management": "/admin/project-management",
      "large-projects": "/admin/large-projects",
      "project-analytics": "/admin/project-analytics",
      
      // الخدمات
      "installation-services": "/admin/installation-services",
      "maintenance-services": "/admin/maintenance-services",
      "warranty-services": "/admin/warranty-services",
      "training-services": "/admin/training-services",
      "custom-solutions": "/admin/custom-solutions",
      "after-sales": "/admin/after-sales",
      "technical-support": "/admin/technical-support",
      
      // السيارات الكهربائية
      "charging-stations": "/admin/charging-stations",
      "electric-transformers": "/admin/electric-transformers",
      "car-batteries": "/admin/car-batteries",
      "ev-management": "/admin/ev-management",
      "ev-analytics": "/admin/ev-analytics",
      
      // عن الشركة
      "expert-team": "/admin/expert-team",
      "branches": "/admin/branches",
      "partners": "/admin/partners",
      "certifications": "/admin/certifications",
      "contact-us": "/admin/contact-us",
      "about-us": "/admin/about-us",
      
      // تحليل الطاقة
      "energy-analytics": "/admin/energy-analytics",
      "roi-calculator": "/admin/roi-calculator",
      "energy-consumption": "/admin/energy-consumption",
      "saving-reports": "/admin/saving-reports",
      
      // إدارة المنتجات
      "solar-panels": "/admin/solar-panels",
      "batteries": "/admin/batteries",
      "inverters": "/admin/inverters",
      "accessories": "/admin/accessories",
      "product-categories": "/admin/product-categories",
      "product-inventory": "/admin/product-inventory",
      
      // الضمان والاستبدال
      "warranty-replacement": "/admin/warranty-replacement",
      "warranty-claims": "/admin/warranty-claims",
      "warranty-analytics": "/admin/warranty-analytics",
      "replacement-requests": "/admin/replacement-requests",
      
      // تطبيق الجوال
      "mobile-app": "/admin/mobile-app",
      "app-analytics": "/admin/app-analytics",
      "app-users": "/admin/app-users",
      "app-notifications": "/admin/app-notifications",
      
      // إدارة الشراكات
      "partnerships": "/admin/partnerships",
      "suppliers": "/admin/suppliers",
      "distributors": "/admin/distributors",
      "partnership-requests": "/admin/partnership-requests",
      
      // المحتوى التعليمي
      "educational-content": "/admin/educational-content",
      "blog": "/admin/blog",
      "faq": "/admin/faq",
      "tutorials": "/admin/tutorials",
      "news": "/admin/news",
      
      // الحملات التسويقية
      "marketing-campaigns": "/admin/marketing-campaigns",
      "promotions": "/admin/promotions",
      "email-marketing": "/admin/email-marketing",
      "social-media": "/admin/social-media",
      
      // اللوجستيات
      "logistics-delivery": "/admin/logistics-delivery",
      "inventory": "/admin/inventory",
      "shipping": "/admin/shipping",
      "delivery-tracking": "/admin/delivery-tracking",
      
      // المدفوعات
      "payments-financing": "/admin/payments-financing",
      "installment-plans": "/admin/installment-plans",
      "invoices": "/admin/invoices",
      "payment-methods": "/admin/payment-methods",
      
      // جدولة التركيب
      "installation-scheduling": "/admin/installation-scheduling",
      "installation-teams": "/admin/installation-teams",
      "installation-calendar": "/admin/installation-calendar",
      "installation-reports": "/admin/installation-reports",
      
      // الدعم الفني
      "tickets": "/admin/tickets",
      "support-analytics": "/admin/support-analytics",
      "knowledge-base": "/admin/knowledge-base",
      
      // التقارير والشكاوى
      "reports": "/admin/reports",
      "complaints": "/admin/complaints",
      "inquiries": "/admin/inquiries",
      "feedback": "/admin/feedback",
      
      // أخرى
      "orders": "/admin/orders",
      "requests": "/admin/requests",
      "header-control": "/admin/header-control",
      "settings": "/admin/settings",
    };

    const route = pageRoutes[page];
    if (route) {
      setLocation(route);
    } else {
      console.warn(`Route not found for page: ${page}`);
      setLocation(`/admin/${page}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "تم التسليم":
      case "نشط":
      case "متوفر":
      case "مدفوع":
        return <Badge className="bg-green-500">✅ {status}</Badge>;
      case "قيد التجهيز":
      case "قيد الشحن":
        return <Badge className="bg-blue-500">⏳ {status}</Badge>;
      case "معلق":
      case "بانتظار الدفع":
        return <Badge className="bg-yellow-500">⚠️ {status}</Badge>;
      case "شبه منتهي":
        return <Badge className="bg-orange-500">📦 {status}</Badge>;
      case "غير متوفر":
        return <Badge className="bg-red-500">❌ {status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  // دالة لاستبدال جميع البيانات
  const resetAllData = () => {
    setStats({
      totalUsers: 0,
      totalOrders: 0,
      totalProducts: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      lowStockProducts: 0
    });
    
    setRecentOrders([]);
    
    alert("تم تصفير جميع البيانات بنجاح");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4">جارٍ التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* شريط التنقل العلوي */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sun className="w-8 h-8 text-accent" />
                <div>
                  <h1 className="text-xl font-bold">لوحة تحكم متجر الطاقة الشمسية</h1>
                  <p className="text-sm text-muted-foreground">إدارة النظام المتكامل للطاقة الشمسية</p>
                </div>
              </div>
              
              <div className="relative ml-12">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن طلبات، مستخدمين، مشاريع..."
                  className="pr-10 w-96"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="font-medium">{user?.name || "مدير النظام"}</p>
                  <p className="text-sm text-muted-foreground">مسؤول النظام</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-accent" />
                </div>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="ml-2 h-4 w-4" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* الشريط الجانبي */}
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navigateToPage={navigateToPage}
          resetAllData={resetAllData}
        />

        {/* المحتوى الرئيسي */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="dashboard" className="space-y-6">
              {/* إحصائيات سريعة */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">مهندسين، مؤسسات، متاجر، مزارع، شركات</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">المشاريع النشطة</CardTitle>
                    <Building className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">47</div>
                    <p className="text-xs text-muted-foreground">تجارية، سكنية، حكومية</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">الاشتراكات النشطة</CardTitle>
                    <Crown className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">89</div>
                    <p className="text-xs text-muted-foreground">خطط اشتراك نشطة</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
                    <p className="text-xs text-muted-foreground">+12% عن الشهر الماضي</p>
                  </CardContent>
                </Card>
              </div>

              {/* الأقسام الرئيسية */}
              <div>
                <h2 className="text-xl font-bold mb-4">الأقسام الرئيسية</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* قسم المستخدمين */}
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-blue-500"
                    onClick={() => navigateToPage("engineers")}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">المستخدمين</CardTitle>
                        <UserCircle className="h-5 w-5 text-blue-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalUsers}</div>
                      <p className="text-xs text-muted-foreground">مهندسين، مؤسسات، متاجر، مزارع، شركات</p>
                      <div className="flex gap-1 mt-2">
                        <Badge className="text-xs">مهندسون</Badge>
                        <Badge className="text-xs">مؤسسات</Badge>
                        <Badge className="text-xs">شركات</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* قسم الاشتراكات */}
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-purple-500"
                    onClick={() => navigateToPage("subscriptions")}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">الاشتراكات</CardTitle>
                        <Crown className="h-5 w-5 text-purple-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">89</div>
                      <p className="text-xs text-muted-foreground">خطط اشتراك نشطة</p>
                      <p className="text-sm mt-2">إدارة خطط الاشتراك والتجديد</p>
                    </CardContent>
                  </Card>

                  {/* قسم المشاريع */}
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-orange-500"
                    onClick={() => navigateToPage("commercial-projects")}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">المشاريع</CardTitle>
                        <Building className="h-5 w-5 text-orange-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">47</div>
                      <p className="text-xs text-muted-foreground">تجارية، سكنية، حكومية</p>
                      <div className="flex gap-1 mt-2">
                        <Badge className="text-xs">تجارية</Badge>
                        <Badge className="text-xs">سكنية</Badge>
                        <Badge className="text-xs">حكومية</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* قسم الخدمات */}
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-green-500"
                    onClick={() => navigateToPage("installation-services")}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">الخدمات</CardTitle>
                        <Wrench className="h-5 w-5 text-green-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">6</div>
                      <p className="text-xs text-muted-foreground">نوع خدمة متاح</p>
                      <p className="text-sm mt-2">تركيب، صيانة، ضمان، تدريب، حلول، بعد البيع</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* قسم السيارات الكهربائية */}
              <div>
                <h2 className="text-xl font-bold mb-4">السيارات الكهربائية</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigateToPage("charging-stations")}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">محطات الشحن</CardTitle>
                        <Car className="h-5 w-5 text-blue-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">23</div>
                      <p className="text-xs text-muted-foreground">محطة شحن</p>
                      <p className="text-sm mt-2">إدارة محطات شحن السيارات الكهربائية</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigateToPage("electric-transformers")}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">المحولات الكهربائية</CardTitle>
                        <Zap className="h-5 w-5 text-yellow-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">15</div>
                      <p className="text-xs text-muted-foreground">محول كهربائي</p>
                      <p className="text-sm mt-2">إدارة المحولات الكهربائية للشحن</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigateToPage("car-batteries")}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">بطاريات السيارات</CardTitle>
                        <Battery className="h-5 w-5 text-green-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">42</div>
                      <p className="text-xs text-muted-foreground">بطارية سيارة</p>
                      <p className="text-sm mt-2">إدارة بطاريات السيارات الكهربائية</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* قسم عن الشركة */}
              <div>
                <h2 className="text-xl font-bold mb-4">عن الشركة</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigateToPage("expert-team")}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">فريق الخبراء</CardTitle>
                        <Users2 className="h-5 w-5 text-blue-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">28</div>
                      <p className="text-xs text-muted-foreground">خبير</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigateToPage("branches")}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">فروعنا</CardTitle>
                        <MapPin className="h-5 w-5 text-green-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">فرع</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigateToPage("partners")}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">شركاؤنا</CardTitle>
                        <Handshake className="h-5 w-5 text-purple-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">35</div>
                      <p className="text-xs text-muted-foreground">شريك</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigateToPage("certifications")}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">الشهادات</CardTitle>
                        <Award className="h-5 w-5 text-yellow-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">18</div>
                      <p className="text-xs text-muted-foreground">شهادة</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigateToPage("contact-us")}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">التواصل</CardTitle>
                        <Mail className="h-5 w-5 text-red-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">156</div>
                      <p className="text-xs text-muted-foreground">رسالة جديدة</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* الطلبات الأخيرة */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>الطلبات الأخيرة</CardTitle>
                      <CardDescription>آخر 5 طلبات تمت معالجتها</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="ml-2 h-4 w-4" />
                      تصدير
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentOrders.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto" />
                      <p className="mt-2 text-gray-500">لا توجد طلبات حالياً</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>رقم الطلب</TableHead>
                          <TableHead>العميل</TableHead>
                          <TableHead>التاريخ</TableHead>
                          <TableHead>المبلغ</TableHead>
                          <TableHead>حالة الطلب</TableHead>
                          <TableHead>حالة الدفع</TableHead>
                          <TableHead>الإجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{formatCurrency(order.amount)}</TableCell>
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell>{getStatusBadge(order.payment)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}