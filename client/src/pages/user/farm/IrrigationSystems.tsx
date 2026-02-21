import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Droplet,
  Zap,
  TrendingUp,
  AlertCircle,
  Eye
} from 'lucide-react';
import UserLayout from "../UserLayout";

export default function IrrigationSystems() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [systems] = useState([
    {
      id: "SYS-001",
      name: "نظام الري الشمسي - الحقل الشمالي",
      type: "solar_pump",
      capacity: "25 kW",
      installationDate: "2024-01-15",
      status: "تشغيل",
      waterPumped: 15000,
      dieselSaved: 450,
      efficiency: 92,
      nextMaintenance: "2024-04-15"
    },
    {
      id: "SYS-002",
      name: "نظام الري الهجين - الحقل الجنوبي",
      type: "hybrid_system",
      capacity: "40 kW",
      installationDate: "2023-11-20",
      status: "تشغيل",
      waterPumped: 28000,
      dieselSaved: 850,
      efficiency: 88,
      nextMaintenance: "2024-04-20"
    },
    {
      id: "SYS-003",
      name: "نظام الري الذكي - الحقل الشرقي",
      type: "smart_system",
      capacity: "15 kW",
      installationDate: "2024-02-01",
      status: "تشغيل",
      waterPumped: 8500,
      dieselSaved: 250,
      efficiency: 95,
      nextMaintenance: "2024-05-01"
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

  const totalDieselSaved = systems.reduce((sum, s) => sum + s.dieselSaved, 0);
  const totalWaterPumped = systems.reduce((sum, s) => sum + s.waterPumped, 0);
  const estimatedSavings = totalDieselSaved * 2.5; // تقدير التكلفة

  if (!isAuthenticated) return null;

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Droplet className="h-6 w-6" />
            أنظمة الري الشمسية
          </h2>
          <p className="text-muted-foreground">إدارة وتتبع أنظمة الري الشمسية في مزرعتك</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">عدد الأنظمة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systems.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الماء المضخوخ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWaterPumped.toLocaleString()} م³</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">الديزل الموفر</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDieselSaved} لتر</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">التوفير المالي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(estimatedSavings)}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="systems" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="systems">الأنظمة المثبتة</TabsTrigger>
            <TabsTrigger value="savings">تقرير التوفير</TabsTrigger>
          </TabsList>

          <TabsContent value="systems" className="mt-6 space-y-4">
            {systems.map(system => (
              <Card key={system.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{system.name}</CardTitle>
                      <CardDescription>السعة: {system.capacity}</CardDescription>
                    </div>
                    <Badge className="bg-green-500">✓ {system.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">تاريخ التثبيت</p>
                      <p className="font-medium">{system.installationDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الماء المضخوخ</p>
                      <p className="font-medium">{system.waterPumped.toLocaleString()} م³</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الديزل الموفر</p>
                      <p className="font-medium text-green-600">{system.dieselSaved} لتر</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الكفاءة</p>
                      <p className="font-medium">{system.efficiency}%</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-900">
                      ⚠️ الصيانة المجدولة: {system.nextMaintenance}
                    </p>
                  </div>

                  <Button className="w-full" variant="outline">
                    <Eye className="ml-2 h-4 w-4" />
                    عرض التفاصيل والإحصائيات
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="savings" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  تقرير التوفير الشامل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-900 mb-2">الديزل الموفر</p>
                    <p className="text-3xl font-bold text-green-600">{totalDieselSaved} لتر</p>
                    <p className="text-xs text-green-700 mt-2">توفير سنوي متوقع: {(totalDieselSaved * 12).toLocaleString()} لتر</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900 mb-2">التوفير المالي</p>
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(estimatedSavings)}</p>
                    <p className="text-xs text-blue-700 mt-2">توفير سنوي متوقع: {formatCurrency(estimatedSavings * 12)}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-bold mb-3">تفصيل التوفير حسب النظام</h4>
                  <div className="space-y-2">
                    {systems.map(system => (
                      <div key={system.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">{system.name}</span>
                        <div className="text-right">
                          <p className="font-medium">{system.dieselSaved} لتر</p>
                          <p className="text-xs text-green-600">{formatCurrency(system.dieselSaved * 2.5)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-900">
                    💡 <strong>ملاحظة:</strong> هذه الأرقام تقديرية بناءً على الاستهلاك الحالي. قد تختلف حسب ظروف الطقس والاستخدام الفعلي.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  );
}
