import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  BarChart3,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  Eye
} from 'lucide-react';
import UserLayout from "../UserLayout";

export default function EngineerProjects() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [activeProjects] = useState([
    {
      id: "PRJ-001",
      name: "نظام شمسي سكني - الرياض",
      location: "حي الملقا، الرياض",
      client: "محمد علي",
      startDate: "2024-02-15",
      estimatedCompletion: "2024-04-15",
      progress: 65,
      capacity: "10 kW",
      status: "قيد التنفيذ"
    },
    {
      id: "PRJ-002",
      name: "نظام ري شمسي - المدينة",
      location: "مزرعة الفرسان، المدينة",
      client: "أحمد الشمري",
      startDate: "2024-03-01",
      estimatedCompletion: "2024-05-01",
      progress: 40,
      capacity: "25 kW",
      status: "قيد التنفيذ"
    }
  ]);

  const [completedProjects] = useState([
    {
      id: "PRJ-101",
      name: "نظام شمسي تجاري - جدة",
      location: "حي البلد، جدة",
      client: "شركة الطاقة النظيفة",
      completionDate: "2024-02-28",
      capacity: "50 kW",
      totalCost: 185000,
      rating: 4.9,
      reviews: 12
    },
    {
      id: "PRJ-102",
      name: "نظام هجين - الدمام",
      location: "حي الخليج، الدمام",
      client: "محمود الدوسري",
      completionDate: "2024-02-10",
      capacity: "15 kW",
      totalCost: 65000,
      rating: 4.8,
      reviews: 8
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

  if (!isAuthenticated) return null;

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            مشاريعي
          </h2>
          <p className="text-muted-foreground">إدارة المشاريع النشطة والمكتملة</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">المشاريع النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProjects.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">المشاريع المكتملة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedProjects.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الأرباح</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(250000)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">متوسط التقييم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.85 ⭐</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">المشاريع النشطة</TabsTrigger>
            <TabsTrigger value="completed">المشاريع المكتملة</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6 space-y-4">
            {activeProjects.map(project => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </CardDescription>
                    </div>
                    <Badge className="bg-blue-500">{project.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">العميل</p>
                      <p className="font-medium">{project.client}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">السعة</p>
                      <p className="font-medium">{project.capacity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">تاريخ الانتهاء المتوقع</p>
                      <p className="font-medium">{project.estimatedCompletion}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">التقدم</span>
                      <span className="text-sm text-muted-foreground">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <Eye className="ml-2 h-4 w-4" />
                    عرض التفاصيل
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم المشروع</TableHead>
                    <TableHead>اسم المشروع</TableHead>
                    <TableHead>السعة</TableHead>
                    <TableHead>التكلفة</TableHead>
                    <TableHead>تاريخ الانتهاء</TableHead>
                    <TableHead>التقييم</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedProjects.map(project => (
                    <TableRow key={project.id}>
                      <TableCell className="font-bold">{project.id}</TableCell>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.capacity}</TableCell>
                      <TableCell>{formatCurrency(project.totalCost)}</TableCell>
                      <TableCell>{project.completionDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-500">
                          ⭐ {project.rating} ({project.reviews})
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  );
}
