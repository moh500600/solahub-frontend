import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Package,
  Search,
  Download,
  Eye,
  Truck
} from 'lucide-react';
import UserLayout from "./UserLayout";

export default function Orders() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [orders] = useState([
    {
      id: "ORD-001",
      date: "2024-03-15",
      total: 24500,
      status: "تم التسليم",
      items: 3,
      trackingNumber: "TRK-2024-001",
      products: ["لوح شمسي Jinko 550W", "بطارية BYD 10kWh", "محول هجين 5KW"]
    },
    {
      id: "ORD-002",
      date: "2024-03-14",
      total: 18900,
      status: "قيد التجهيز",
      items: 2,
      trackingNumber: "TRK-2024-002",
      products: ["نظام المراقبة", "أسلاك توصيل"]
    },
    {
      id: "ORD-003",
      date: "2024-03-10",
      total: 32500,
      status: "قيد الشحن",
      items: 4,
      trackingNumber: "TRK-2024-003",
      products: ["ألواح شمسية (5)", "محول", "بطاريات", "أدوات تركيب"]
    },
    {
      id: "ORD-004",
      date: "2024-02-28",
      total: 15000,
      status: "تم التسليم",
      items: 2,
      trackingNumber: "TRK-2024-004",
      products: ["لوح شمسي", "محول"]
    }
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
      case "ملغي": return <Badge className="bg-red-500">❌ {status}</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.includes(searchQuery) || order.products.some(p => p.includes(searchQuery));
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) return null;

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Package className="h-6 w-6" />
            الطلبات والمشتريات
          </h2>
          <p className="text-muted-foreground">إدارة وتتبع جميع طلباتك</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">قيد المعالجة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter(o => o.status !== "تم التسليم").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">المسلمة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter(o => o.status === "تم التسليم").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الإنفاق</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(orders.reduce((sum, o) => sum + o.total, 0))}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>البحث والتصفية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3 flex-col md:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث برقم الطلب أو المنتج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
              <div className="flex gap-2">
                {["all", "تم التسليم", "قيد التجهيز", "قيد الشحن"].map(status => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status === "all" ? "الكل" : status}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة الطلبات</CardTitle>
            <CardDescription>جميع طلباتك مع تفاصيل كاملة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الطلب</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>عدد المنتجات</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>رقم التتبع</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-bold">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{formatCurrency(order.total)}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="font-mono text-xs">{order.trackingNumber}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" title="عرض التفاصيل">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="تتبع الشحنة">
                            <Truck className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="تحميل الفاتورة">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Order Details Modal Info */}
        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">لم نجد طلبات مطابقة لبحثك</p>
            </CardContent>
          </Card>
        )}
      </div>
    </UserLayout>
  );
}
