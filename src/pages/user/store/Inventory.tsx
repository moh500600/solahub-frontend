import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import UserLayout from "../UserLayout";

export default function StoreInventory() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [inventory] = useState([
    {
      id: 1,
      name: "لوح شمسي Jinko 550W",
      sku: "JK-550-2024",
      quantity: 45,
      minStock: 20,
      maxStock: 100,
      unitPrice: 1200,
      totalValue: 54000,
      status: "متوفر"
    },
    {
      id: 2,
      name: "بطارية BYD 10kWh",
      sku: "BYD-10K-2024",
      quantity: 12,
      minStock: 10,
      maxStock: 50,
      unitPrice: 8500,
      totalValue: 102000,
      status: "منخفض"
    },
    {
      id: 3,
      name: "محول هجين 5KW",
      sku: "HYB-5K-2024",
      quantity: 8,
      minStock: 5,
      maxStock: 30,
      unitPrice: 3500,
      totalValue: 28000,
      status: "حرج"
    },
    {
      id: 4,
      name: "نظام المراقبة",
      sku: "MON-2024",
      quantity: 25,
      minStock: 10,
      maxStock: 60,
      unitPrice: 450,
      totalValue: 11250,
      status: "متوفر"
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
      case "متوفر": return <Badge className="bg-green-500">✓ {status}</Badge>;
      case "منخفض": return <Badge className="bg-yellow-500">⚠ {status}</Badge>;
      case "حرج": return <Badge className="bg-red-500">🔴 {status}</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const filteredInventory = inventory.filter(item =>
    item.name.includes(searchQuery) || item.sku.includes(searchQuery)
  );

  if (!isAuthenticated) return null;

  const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = inventory.filter(item => item.quantity <= item.minStock).length;

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Package className="h-6 w-6" />
            إدارة المخزون
          </h2>
          <p className="text-muted-foreground">إدارة المنتجات والمخزون في متجرك</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الكمية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory.reduce((sum, i) => sum + i.quantity, 0)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">قيمة المخزون</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">منخفضة المخزون</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{lowStockItems}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Add */}
        <Card>
          <CardHeader>
            <CardTitle>البحث والإضافة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3 flex-col md:flex-row">
              <div className="flex-1 relative">
                <Input
                  placeholder="ابحث عن منتج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                إضافة منتج
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة المنتجات</CardTitle>
            <CardDescription>جميع المنتجات في مخزونك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم المنتج</TableHead>
                    <TableHead>الكود</TableHead>
                    <TableHead>الكمية</TableHead>
                    <TableHead>سعر الوحدة</TableHead>
                    <TableHead>القيمة الإجمالية</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {item.quantity}
                          {item.quantity <= item.minStock && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                      <TableCell>{formatCurrency(item.totalValue)}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" title="تعديل">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="حذف">
                            <Trash2 className="h-4 w-4 text-red-500" />
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

        {/* Low Stock Alert */}
        {lowStockItems > 0 && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5" />
                تنبيه: منتجات منخفضة المخزون
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700">
                لديك {lowStockItems} منتج(ات) بمخزون منخفض. يرجى إعادة الطلب قريباً.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </UserLayout>
  );
}
