import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2,
  Eye,
  Download
} from 'lucide-react';

export default function ProductVerification() {
  const [serialNumber, setSerialNumber] = useState("");
  const [productType, setProductType] = useState("solar_panel");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");

  const [verifiedProducts, setVerifiedProducts] = useState([
    {
      id: 1,
      name: "لوح شمسي Jinko 550W",
      serial: "SN-JK-550-2024-001",
      type: "solar_panel",
      verificationDate: "2024-03-10",
      status: "verified",
      warranty: "25 سنة",
      purchaseDate: "2024-01-15",
      seller: "متجر الطاقة الشمسية الرئيسي"
    },
    {
      id: 2,
      name: "بطارية BYD 10kWh",
      serial: "SN-BYD-10K-2024-002",
      type: "battery",
      verificationDate: "2024-03-08",
      status: "pending",
      warranty: "10 سنوات",
      purchaseDate: "2024-02-20",
      seller: "موزع معتمد"
    },
    {
      id: 3,
      name: "محول هجين 5KW",
      serial: "SN-HYB-5K-2024-003",
      type: "inverter",
      verificationDate: "2024-02-28",
      status: "verified",
      warranty: "15 سنة",
      purchaseDate: "2024-01-01",
      seller: "الموزع الرسمي"
    }
  ]);

  const handleVerifyProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // محاكاة التحقق من الرقم التسلسلي
      if (!serialNumber.trim()) {
        setMessageType("error");
        setMessage("الرجاء إدخال الرقم التسلسلي");
        setLoading(false);
        return;
      }

      // محاكاة التحقق من الخادم
      await new Promise(resolve => setTimeout(resolve, 1500));

      // إضافة المنتج الجديد
      const newProduct = {
        id: verifiedProducts.length + 1,
        name: `منتج ${productType === 'solar_panel' ? 'لوح شمسي' : productType === 'battery' ? 'بطارية' : 'محول'} جديد`,
        serial: serialNumber,
        type: productType,
        verificationDate: new Date().toISOString().split('T')[0],
        status: "verified",
        warranty: "حسب نوع المنتج",
        purchaseDate: new Date().toISOString().split('T')[0],
        seller: "متجر الطاقة الشمسية"
      };

      setVerifiedProducts([...verifiedProducts, newProduct]);
      setMessageType("success");
      setMessage("تم توثيق المنتج بنجاح! سيتم تفعيل الضمان الكامل.");
      setSerialNumber("");
      setProductType("solar_panel");
    } catch (error) {
      setMessageType("error");
      setMessage("حدث خطأ أثناء التحقق. الرجاء المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = (id: number) => {
    setVerifiedProducts(verifiedProducts.filter(p => p.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "verified":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 ml-1" />موثق</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500"><Clock className="h-3 w-3 ml-1" />قيد المراجعة</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getProductTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      solar_panel: "لوح شمسي",
      battery: "بطارية",
      inverter: "محول",
      monitoring: "نظام المراقبة"
    };
    return types[type] || type;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المنتجات الموثقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedProducts.filter(p => p.status === 'verified').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">قيد المراجعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedProducts.filter(p => p.status === 'pending').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الضمانات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedProducts.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            توثيق منتج جديد
          </CardTitle>
          <CardDescription>
            أدخل الرقم التسلسلي للمنتج لتفعيل الضمان والحماية الكاملة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerifyProduct} className="space-y-4">
            {message && (
              <Alert variant={messageType === "error" ? "destructive" : "default"}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-type">نوع المنتج *</Label>
                <select
                  id="product-type"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm"
                >
                  <option value="solar_panel">لوح شمسي</option>
                  <option value="battery">بطارية</option>
                  <option value="inverter">محول</option>
                  <option value="monitoring">نظام المراقبة</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="serial">الرقم التسلسلي (Serial Number) *</Label>
                <Input
                  id="serial"
                  placeholder="مثال: SN-JK-550-2024-001"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
              <p className="text-blue-900">
                💡 <strong>نصيحة:</strong> يمكنك العثور على الرقم التسلسلي على ملصق المنتج أو في الفاتورة الأصلية.
              </p>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "جاري التحقق..." : "توثيق المنتج"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>المنتجات الموثقة</CardTitle>
          <CardDescription>
            جميع منتجاتك الموثقة والمحمية بالضمان الكامل
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم المنتج</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>الرقم التسلسلي</TableHead>
                  <TableHead>تاريخ التوثيق</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الضمان</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {verifiedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{getProductTypeLabel(product.type)}</TableCell>
                    <TableCell className="font-mono text-xs">{product.serial}</TableCell>
                    <TableCell>{product.verificationDate}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell>{product.warranty}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" title="عرض التفاصيل">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="تحميل شهادة الضمان">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          title="حذف"
                        >
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
    </div>
  );
}
