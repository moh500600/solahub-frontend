import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Download,
  Filter,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import Sidebar from "./Sidebar";

export default function branches() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // بيانات وهمية للعرض
  const items = [
    { id: 1, name: "العنصر الأول", status: "نشط", date: "2024-01-15", value: 1000 },
    { id: 2, name: "العنصر الثاني", status: "معطل", date: "2024-01-14", value: 2000 },
    { id: 3, name: "العنصر الثالث", status: "نشط", date: "2024-01-13", value: 1500 },
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab="branches" setActiveTab={() => {}} navigateToPage={() => {}} resetAllData={() => {}} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-6">
          {/* رأس الصفحة */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">branches</h1>
              <p className="text-gray-600 mt-1">إدارة وتنظيم branches</p>
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              إضافة جديد
            </Button>
          </div>

          {/* أدوات البحث والتصفية */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-64 relative">
                  <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ابحث هنا..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="التصفية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="نشط">نشط</SelectItem>
                    <SelectItem value="معطل">معطل</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  تصدير
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* الجدول */}
          <Card>
            <CardHeader>
              <CardTitle>قائمة branches</CardTitle>
              <CardDescription>{filteredItems.length} عنصر</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">الاسم</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">الحالة</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">التاريخ</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">القيمة</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">{item.name}</td>
                          <td className="py-3 px-4">
                            <Badge variant={item.status === "نشط" ? "default" : "secondary"}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{item.date}</td>
                          <td className="py-3 px-4 font-semibold">{item.value}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-gray-500">
                          لا توجد نتائج
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* التصفح بين الصفحات */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600">الصفحة {currentPage} من {Math.ceil(filteredItems.length / 10)}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={currentPage === 1}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
