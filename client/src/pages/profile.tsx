import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Save,
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import Header from "./Header";
import Footer from "./Footer";

export default function PageComponent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">الملف الشخصي</h1>
            <p className="text-gray-500">إدارة وإعدادات الملف الشخصي</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>الإعدادات العامة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-8 border-2 border-dashed rounded-xl text-center">
              <p className="text-gray-500 mb-4">هذه الصفحة جاهزة للتخصيص والربط مع قاعدة البيانات</p>
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                حفظ التغييرات
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
