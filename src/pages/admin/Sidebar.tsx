// src/components/admin/Sidebar.tsx
import { Button } from "@/components/ui/button";
import {
  HardHat,
  Home,
  Users,
  User,
  UserCheck,
  Crown,
  CheckCircle,
  RefreshCw,
  Building2,
  ClipboardCheck,
  Target,
  Wrench,
  Headphones,
  BookOpen,
  Layers,
  Car,
  Zap,
  Battery,
  SmartphoneCharging,
  MapPin,
  Handshake,
  Award,
  Mail,
  Globe,
  ChartLine,
  BarChart3,
  Calculator,
  TrendingUp,
  TrendingDown,
  Package,
  Sun,
  Cpu,
  Folder,
  ShoppingCart,
  ClipboardList,
  Shield,
  ShieldCheck,
  LifeBuoy,
  Truck,
  CreditCard,
  FileText,
  Calendar,
  CalendarCheck,
  Phone,
  Map,
  Bell,
  Trash2,
  Settings,
  Search,
  Factory,
} from "lucide-react";
import { Tag } from "lucide-react"; // موجود ضمن استيرادك الجديد



interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  navigateToPage: (path: string) => void; 
  resetAllData: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  navigateToPage,
  resetAllData,
}: SidebarProps) {
  
  // --- [بداية الإصلاح] ---
  const openPageInAdmin = (pageFileName: string) => {
    // قمنا بإزالة "/admin/" من هنا لأن الدالة navigateToPage أو الراوتر يضيفها تلقائياً
    // إذا كنت تريد التأكد من المسار النسبي، نرسل فقط اسم الصفحة
    const path = pageFileName; 
    
    // ملاحظة: إذا استمرت المشكلة، جرب: const path = `/${pageFileName}`;
    
    navigateToPage(path);
    setActiveTab(pageFileName);
  };
  // --- [نهاية الإصلاح] ---

  return (
    <aside className="w-80 bg-white border-r min-h-[calc(100vh-80px)] overflow-y-auto">
      <nav className="p-4 space-y-4">
        {/* لوحة التحكم الرئيسية */}
        <Button
          variant={activeTab === "DutchBoard" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => openPageInAdmin("DutchBoard")}
        >
          <Home className="ml-2 h-4 w-4" />
          لوحة التحكم الرئيسية
        </Button>

        {/* المستخدمين والوكلاء */}
        <div className="space-y-2">
          <div className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            المستخدمين والوكلاء
          </div>

          <div className="space-y-1 pl-2">
            <div className="mb-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Users className="h-4 w-4" />
                <span>أنواع المستخدمين</span>
              </div>
              <div className="space-y-1 pl-6">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-xs"
                  onClick={() => openPageInAdmin("engineers")}
                >
                  <User className="ml-2 h-3 w-3" />
                  المهندسين
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-xs"
                  onClick={() => openPageInAdmin("institutions")}
                >
                  <Building2 className="ml-2 h-3 w-3" />
                  المؤسسات
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-xs"
                  onClick={() => openPageInAdmin("stores")}
                >
                  <ShoppingCart className="ml-2 h-3 w-3" />
                  المتاجر
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-xs"
                  onClick={() => openPageInAdmin("farms")}
                >
                  <Truck className="ml-2 h-3 w-3" />
                  المزارع
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-xs"
                  onClick={() => openPageInAdmin("companies")}
                >
                  <Factory className="ml-2 h-3 w-3" />
                  الشركات
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("agents")}
            >
              <UserCheck className="ml-2 h-4 w-4" />
           الوكلاء
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("delegates")}
            >
              <UserCheck className="ml-2 h-4 w-4" />
              المناديب
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("engineers")}
            >
              <HardHat className="ml-2 h-4 w-4" />
              المهندسين التابعين لنا
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("ai-assistant")}
            >
              <Target className="ml-2 h-4 w-4" />
              الذكاء الاصطناعي
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("chatbot")}
            >
              <Headphones className="ml-2 h-4 w-4" />
              روبوت الدردشة
            </Button>
          </div>
        </div>

        {/* الاشتراكات */}
        <div className="space-y-2">
          <div className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            الاشتراكات
          </div>

          <div className="space-y-1 pl-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("subscriptions")}
            >
              <Crown className="ml-2 h-4 w-4" />
              خطط الاشتراك
            </Button>
          

          </div>
        </div>

        {/* المشاريع */}
        <div className="space-y-2">
          <div className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            المشاريع
          </div>

          <div className="space-y-1 pl-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("commercial-projects")}
            >
              <Building2 className="ml-2 h-4 w-4" />
              المشاريع التجارية
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("residential-projects")}
            >
              <Home className="ml-2 h-4 w-4" />
              المشاريع السكنية
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("government-projects")}
            >
              <Building2 className="ml-2 h-4 w-4" />
              المشاريع الحكومية
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("project-management")}
            >
              <ClipboardCheck className="ml-2 h-4 w-4" />
              إدارة المشاريع
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("large-projects")}
            >
              <Target className="ml-2 h-4 w-4" />
              المشاريع الكبيرة
            </Button>

       
          </div>
        </div>

        {/* الخدمات */}
        <div className="space-y-2">
          <div className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            الخدمات
          </div>

          <div className="space-y-1 pl-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("installation-services")}
            >
              <Wrench className="ml-2 h-4 w-4" />
              خدمات التركيب
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("maintenance-services")}
            >
              <RefreshCw className="ml-2 h-4 w-4" />
              خدمات الصيانة
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("warranty-services")}
            >
              <Shield className="ml-2 h-4 w-4" />
              خدمات الضمان
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("training-services")}
            >
              <BookOpen className="ml-2 h-4 w-4" />
              التدريب والدورات
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("custom-solutions")}
            >
              <Layers className="ml-2 h-4 w-4" />
              حلول مخصصة
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("after-sales")}
            >
              <Headphones className="ml-2 h-4 w-4" />
              خدمات ما بعد البيع
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("technical-support")}
            >
              <LifeBuoy className="ml-2 h-4 w-4" />
              الدعم الفني
            </Button>
          </div>
        </div>

        {/* السيارات الكهربائية */}
        <div className="space-y-2">
          <div className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            السيارات الكهربائية
          </div>

          <div className="space-y-1 pl-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("charging-stations")}
            >
              <Car className="ml-2 h-4 w-4" />
              محطات الشحن
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("electric-transformers")}
            >
              <Zap className="ml-2 h-4 w-4" />
              المحولات الكهربائية
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("car-batteries")}
            >
              <Battery className="ml-2 h-4 w-4" />
              بطاريات السيارات
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("ev-management")}
            >
              <SmartphoneCharging className="ml-2 h-4 w-4" />
              إدارة السيارات الكهربائية
            </Button>

     
          </div>
        </div>

        {/* عن الشركة */}
        <div className="space-y-2">
          <div className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            عن الشركة
          </div>

          <div className="space-y-1 pl-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("expert-team")}
            >
              <Users className="ml-2 h-4 w-4" />
              فريق الخبراء
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("branches")}
            >
              <MapPin className="ml-2 h-4 w-4" />
              فروعنا
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("partners")}
            >
              <Handshake className="ml-2 h-4 w-4" />
              شركاؤنا
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("certifications")}
            >
              <Award className="ml-2 h-4 w-4" />
              الشهادات
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("contact-us")}
            >
              <Mail className="ml-2 h-4 w-4" />
              التواصل معنا
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => openPageInAdmin("about-us")}
            >
              <Globe className="ml-2 h-4 w-4" />
              عن الشركة
            </Button>
          </div>
        </div>

        {/* إدارات النظام المتكاملة */}
        <div className="space-y-2 pt-4 border-t">
          {/* تحليل الطاقة */}
          <div className="mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <ChartLine className="h-4 w-4" />
              <span>تحليل الطاقة</span>
            </div>
            <div className="space-y-1 pl-6">
             

              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("roi-calculator")}
              >
                <Calculator className="ml-2 h-3 w-3" />
                حاسبة العائد (ROI)
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("energy-consumption")}
              >
                <TrendingDown className="ml-2 h-3 w-3" />
                استهلاك الطاقة
              </Button>

           
            </div>
          </div>

          {/* إدارة المنتجات */}
          <div className="mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Package className="h-4 w-4" />
              <span>إدارة المنتجات</span>
            </div>
            <div className="space-y-1 pl-6">
              <Button
  variant="ghost"
  className="w-full justify-start text-xs"
  onClick={() => openPageInAdmin("home")}
>
  <Home className="ml-2 h-3 w-3" />
  الرئيسية
</Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("solar-panels")}
              >
                <Sun className="ml-2 h-3 w-3" />
                الألواح الشمسية
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("batteries")}
              >
                <Battery className="ml-2 h-3 w-3" />
                البطاريات
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("inverters")}
              >
                <Cpu className="ml-2 h-3 w-3" />
                الأنفرترات
              </Button>

              <Button
  variant="ghost"
  className="w-full justify-start text-xs"
  onClick={() => openPageInAdmin("systems")}
>
  <Layers className="ml-2 h-3 w-3" />
  المنظومات
</Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("accessories")}
              >
                <Folder className="ml-2 h-3 w-3" />
                الملحقات
              </Button>

   
            </div>
          </div>

          {/* الضمان والاستبدال */}
          <div className="mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>الضمان والاستبدال</span>
            </div>
            <div className="space-y-1 pl-6">
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("warranty-services")}
              >
                <ShieldCheck className="ml-2 h-3 w-3" />
                نظام الضمان
              </Button>

  <Button
  variant="ghost"
  className="w-full justify-start text-xs"
  onClick={() => openPageInAdmin("return-requests")}
>
  <RefreshCw className="ml-2 h-3 w-3" />
  طلبات الاسترجاع
</Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("replacement-requests")}
              >
                <RefreshCw className="ml-2 h-3 w-3" />
                طلبات الاستبدال
              </Button>
            </div>
          </div>

          {/* تطبيق الجوال */}
          <div className="mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <SmartphoneCharging className="h-4 w-4" />
              <span>تطبيق الجوال</span>
            </div>
            <div className="space-y-1 pl-6">
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("mobile-app")}
              >
                <SmartphoneCharging className="ml-2 h-3 w-3" />
                إدارة التطبيق
              </Button>
           
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("app-users")}
              >
                <Users className="ml-2 h-3 w-3" />
                مستخدمي التطبيق
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("app-notifications")}
              >
                <Bell className="ml-2 h-3 w-3" />
                إشعارات التطبيق
              </Button>
            </div>
          </div>

      
          {/* المحتوى التعليمي */}
          <div className="mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <BookOpen className="h-4 w-4" />
              <span>المحتوى التعليمي</span>
            </div>
            <div className="space-y-1 pl-6">
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("educational-content")}
              >
                <BookOpen className="ml-2 h-3 w-3" />
                المحتوى التعليمي
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("blog")}
              >
                <FileText className="ml-2 h-3 w-3" />
                المدونة
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("faq")}
              >
                <Search className="ml-2 h-3 w-3" />
                الأسئلة الشائعة
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("tutorials")}
              >
                <BookOpen className="ml-2 h-3 w-3" />
                الدروس التعليمية
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("news")}
              >
                <FileText className="ml-2 h-3 w-3" />
                الأخبار
              </Button>
            </div>
          </div>

          {/* التسويق */}
          <div className="mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Globe className="h-4 w-4" />
              <span>التسويق</span>
            </div>
            <div className="space-y-1 pl-6">
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("marketing-campaigns")}
              >
                <Globe className="ml-2 h-3 w-3" />
                الحملات التسويقية
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("promotions")}
              >
                <TrendingUp className="ml-2 h-3 w-3" />
                العروض والتخفيضات
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("email-marketing")}
              >
                <Mail className="ml-2 h-3 w-3" />
                التسويق بالبريد
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("social-media")}
              >
                <Globe className="ml-2 h-3 w-3" />
                وسائل التواصل
              </Button>
            </div>
          </div>

          {/* اللوجستيات */}
          <div className="mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Truck className="h-4 w-4" />
              <span>اللوجستيات</span>
            </div>
            <div className="space-y-1 pl-6">
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("logistics-delivery")}
              >
                <Truck className="ml-2 h-3 w-3" />
                اللوجستيات والتوصيل
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("inventory")}
              >
                <Package className="ml-2 h-3 w-3" />
                إدارة المخزون
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("shipping")}
              >
                <Truck className="ml-2 h-3 w-3" />
                الشحن والتوصيل
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("delivery-tracking")}
              >
                <Map className="ml-2 h-3 w-3" />
                تتبع الشحنات
              </Button>
            </div>
          </div>

          {/* المدفوعات */}
          <div className="mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <CreditCard className="h-4 w-4" />
              <span>المدفوعات</span>
            </div>
            <div className="space-y-1 pl-6">
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("payments-financing")}
              >
                <CreditCard className="ml-2 h-3 w-3" />
                المدفوعات والتمويل
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("installment-plans")}
              >
                <FileText className="ml-2 h-3 w-3" />
                خطط التقسيط
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("invoices")}
              >
                <FileText className="ml-2 h-3 w-3" />
                الفواتير
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("payment-methods")}
              >
                <CreditCard className="ml-2 h-3 w-3" />
                طرق الدفع
              </Button>
            </div>
          </div>

          {/* التركيب */}
          <div className="mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <CalendarCheck className="h-4 w-4" />
              <span>التركيب</span>
            </div>
            <div className="space-y-1 pl-6">
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("installation-scheduling")}
              >
                <CalendarCheck className="ml-2 h-3 w-3" />
                جدولة التركيب
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("installation-teams")}
              >
                <Users className="ml-2 h-3 w-3" />
                فرق التركيب
              </Button>
          
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("installation-reports")}
              >
                <FileText className="ml-2 h-3 w-3" />
                تقارير التركيب
              </Button>
            </div>
          </div>

          {/* الدعم */}
          <div className="mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <LifeBuoy className="h-4 w-4" />
              <span>الدعم</span>
            </div>
            <div className="space-y-1 pl-6">
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("technical-support")}
              >
                <Headphones className="ml-2 h-3 w-3" />
                الدعم الفني
              </Button>
        
       
        
            </div>
          </div>

          {/* التقارير والشكاوى */}
          <div className="mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <BarChart3 className="h-4 w-4" />
              <span>التقارير</span>
            </div>
            <div className="space-y-1 pl-6">
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("reports")}
              >
                <BarChart3 className="ml-2 h-3 w-3" />
                التقارير
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("complaints")}
              >
                <Target className="ml-2 h-3 w-3" />
                الشكاوى
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("inquiries")}
              >
                <Mail className="ml-2 h-3 w-3" />
                الاستفسارات
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => openPageInAdmin("feedback")}
              >
                <FileText className="ml-2 h-3 w-3" />
                الملاحظات
              </Button>
            </div>
          </div>

          {/* الطلبات والإعدادات */}
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => openPageInAdmin("orders")}
          >
            <ShoppingCart className="ml-2 h-4 w-4" />
            الطلبات
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => openPageInAdmin("requests")}
          >
            <ClipboardList className="ml-2 h-4 w-4" />
            الطلبات الخاصة
          </Button>


<Button
  variant="ghost"
  className="w-full justify-start"
  onClick={() => openPageInAdmin("special-offers")}
>
  <Tag className="ml-2 h-4 w-4" />
  العروض الخاصة
</Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => openPageInAdmin("header-control")}
          >
            <Settings className="ml-2 h-4 w-4" />
            تحكم الهيدر
          </Button>

          <Button
  variant="ghost"
  className="w-full justify-start"
  onClick={() => openPageInAdmin("footer-control")}
>
  <Settings className="ml-2 h-4 w-4" />
  تحكم الفوتر
</Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => openPageInAdmin("settings")}
          >
            <Settings className="ml-2 h-4 w-4" />
            الإعدادات العامة
          </Button>
        </div>
      </nav>

      {/* زر تصفير البيانات */}
      <div className="p-4 border-t mt-4">
        <Button variant="destructive" className="w-full" onClick={resetAllData}>
          <Trash2 className="ml-2 h-4 w-4" />
          تصفير جميع البيانات
        </Button>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          سيتم حذف جميع البيانات الحالية
        </p>
      </div>
    </aside>
  );
}
