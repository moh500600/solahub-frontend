import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  ArrowRight,
  ChevronRight,
  Search,
  Filter,
  Clock,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Lock,
  Shield,
  FileText,
  HelpCircle,
  Truck,
  Award,
  Handshake,
  Target,
  Zap,
  Battery,
  Settings,
  Sun,
  ShoppingBag
} from 'lucide-react';
import Header from "../Header";
import Footer from "../Footer";

export default function PageComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // تحميل البيانات
    loadPageData();
  }, []);

  const loadPageData = async () => {
    setIsLoading(true);
    try {
      // محاكاة تحميل البيانات
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error("خطأ في تحميل البيانات:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const items = [
    {
      id: 1,
      title: "العنصر الأول",
      description: "وصف تفصيلي للعنصر الأول",
      category: "category1",
      status: "نشط",
      date: "2024-01-15",
      rating: 4.8,
      reviews: 125
    },
    {
      id: 2,
      title: "العنصر الثاني",
      description: "وصف تفصيلي للعنصر الثاني",
      category: "category2",
      status: "نشط",
      date: "2024-01-14",
      rating: 4.9,
      reviews: 98
    },
    {
      id: 3,
      title: "العنصر الثالث",
      description: "وصف تفصيلي للعنصر الثالث",
      category: "category1",
      status: "نشط",
      date: "2024-01-13",
      rating: 4.7,
      reviews: 156
    },
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.includes(searchQuery) || item.description.includes(searchQuery);
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* رأس الصفحة */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Cpu className="w-7 h-7 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">المحولات الشمسية</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">محولات مركزية ومركبة عالية الأداء</p>
        </div>

        {/* شريط البحث */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>البحث</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ابحث هنا..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* شبكة العناصر */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">جاري تحميل البيانات...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">التاريخ:</span>
                      <span className="font-medium">{item.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">التقييمات:</span>
                      <span className="font-medium">{item.reviews} تقييم</span>
                    </div>
                    <Button className="w-full gap-2" asChild>
                      <Link href="/">
                        عرض التفاصيل
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">لا توجد عناصر متطابقة</p>
          </div>
        )}

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">إجمالي العناصر</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{items.length}</p>
              <p className="text-xs text-green-600 mt-1">↑ 15% من الشهر الماضي</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">متوسط التقييم</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">4.8</p>
              <p className="text-xs text-green-600 mt-1">⭐ تقييم ممتاز</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">عدد المستخدمين</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,250</p>
              <p className="text-xs text-green-600 mt-1">↑ 8% من الشهر الماضي</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">الرضا العام</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">98%</p>
              <p className="text-xs text-green-600 mt-1">✅ رضا عالي جداً</p>
            </CardContent>
          </Card>
        </div>

        {/* قسم الاتصال */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/2 border-primary/20">
          <CardHeader>
            <CardTitle>هل لديك أي استفسارات؟</CardTitle>
            <CardDescription>تواصل معنا الآن للحصول على المساعدة والدعم</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">الهاتف</p>
                  <p className="text-sm text-gray-600">+966 11 000 0000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">البريد الإلكتروني</p>
                  <p className="text-sm text-gray-600">support@solar.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">العنوان</p>
                  <p className="text-sm text-gray-600">الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
