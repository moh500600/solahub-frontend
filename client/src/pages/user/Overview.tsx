import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingCart,
  Tag,
  Star
} from 'lucide-react';
import UserLayout from "./UserLayout";

export default function Overview() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [orders] = useState([
    { id: "ORD-001", date: "2024-03-15", total: 24500, status: "تم التسليم", items: 3 },
    { id: "ORD-002", date: "2024-03-14", total: 18900, status: "قيد التجهيز", items: 2 },
    { id: "ORD-003", date: "2024-03-10", total: 32500, status: "قيد الشحن", items: 4 },
  ]);

  const [offers] = useState([
    { id: 1, title: "خصم 20% على أنظمة الري", code: "FARM20", type: "farm_owner" },
    { id: 2, title: "باقة المهندس المحترف", code: "ENGPRO", type: "engineer" },
    { id: 3, title: "عرض الجملة للمتاجر", code: "STORE5", type: "store" },
  ]);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");

    if (isAuth === "true" && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    } else {
      setLocation("/login");
    }
  }, [setLocation]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "تم التسليم": return <Badge className="bg-green-500">✅ {status}</Badge>;
      case "قيد التجهيز": return <Badge className="bg-blue-500">⏳ {status}</Badge>;
      case "قيد الشحن": return <Badge className="bg-yellow-500">🚚 {status}</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  if (!isAuthenticated) return null;

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">مرحباً بك، {user?.name} 👋</h2>
          <p className="text-muted-foreground">هذه نظرة عامة على حسابك وأنشطتك الأخيرة</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">الطلبات النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter(o => o.status !== "تم التسليم").length}</div>
              <p className="text-xs text-muted-foreground">+2 هذا الشهر</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">منذ بداية الحساب</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">العروض المتاحة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{offers.filter(o => o.type === user?.userType || o.type === "customer").length}</div>
              <p className="text-xs text-muted-foreground">خاصة لك</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">رصيد النقاط</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,250</div>
              <p className="text-xs text-muted-foreground">قابل للاستبدال</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              آخر الطلبات
            </CardTitle>
            <CardDescription>تتبع أحدث طلباتك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.date} • {order.items} منتجات</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-bold">{formatCurrency(order.total)}</p>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full mt-4" onClick={() => setLocation("/user/orders")}>
              عرض جميع الطلبات
            </Button>
          </CardContent>
        </Card>

        {/* Offers & News */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                عروض خاصة لك
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {offers.filter(o => o.type === user?.userType).map(offer => (
                <div key={offer.id} className="bg-accent/5 p-3 rounded-lg border border-accent/20">
                  <p className="font-bold text-accent">{offer.title}</p>
                  <Badge variant="outline" className="mt-2">كود: {offer.code}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                تقييمات المستخدمين
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">جودة المنتجات</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">سرعة التوصيل</span>
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="h-4 w-4 text-gray-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UserLayout>
  );
}
