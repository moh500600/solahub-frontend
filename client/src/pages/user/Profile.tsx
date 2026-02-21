import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Settings,
  Save,
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  FileText
} from 'lucide-react';
import UserLayout from "./UserLayout";

export default function Profile() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    governorate: "",
    address: "",
    // حقول إضافية حسب نوع الحساب
    companyName: "",
    commercialRegister: "",
    taxNumber: "",
    engineerLicense: "",
    experience: "",
    farmName: "",
    farmArea: "",
  });

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");

    if (isAuth === "true" && userData) {
      setIsAuthenticated(true);
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        governorate: parsedUser.governorate || "",
        address: parsedUser.address || "",
        companyName: parsedUser.companyName || "",
        commercialRegister: parsedUser.commercialRegister || "",
        taxNumber: parsedUser.taxNumber || "",
        engineerLicense: parsedUser.license || "",
        experience: parsedUser.experience || "",
        farmName: parsedUser.farmName || "",
        farmArea: parsedUser.farmArea || "",
      });
    } else {
      setLocation("/login");
    }
  }, [setLocation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // محاكاة حفظ البيانات
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = {
        ...user,
        ...formData,
        license: formData.engineerLicense,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessageType("success");
      setMessage("تم حفظ البيانات بنجاح!");
    } catch (error) {
      setMessageType("error");
      setMessage("حدث خطأ أثناء حفظ البيانات");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  const userType = user?.userType || "customer";

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Settings className="h-6 w-6" />
            إعدادات الحساب
          </h2>
          <p className="text-muted-foreground">إدارة بيانات حسابك والمعلومات الشخصية</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {message && (
            <Alert variant={messageType === "error" ? "destructive" : "default"}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {/* البيانات الأساسية */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                البيانات الأساسية
              </CardTitle>
              <CardDescription>معلومات حسابك الشخصية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني (معطل)</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الجوال</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="+966501234567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="governorate">المحافظة</Label>
                  <Input
                    id="governorate"
                    name="governorate"
                    value={formData.governorate}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">العنوان التفصيلي</Label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full p-2 border rounded-md text-sm"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* بيانات إضافية حسب نوع الحساب */}
          {(userType === "company" || userType === "store") && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  بيانات المنشأة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">اسم المنشأة</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commercialRegister">السجل التجاري</Label>
                    <Input
                      id="commercialRegister"
                      name="commercialRegister"
                      value={formData.commercialRegister}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxNumber">الرقم الضريبي</Label>
                    <Input
                      id="taxNumber"
                      name="taxNumber"
                      value={formData.taxNumber}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {userType === "engineer" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  بيانات المهندس
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="engineerLicense">رقم الترخيص</Label>
                    <Input
                      id="engineerLicense"
                      name="engineerLicense"
                      value={formData.engineerLicense}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">سنوات الخبرة</Label>
                    <Input
                      id="experience"
                      name="experience"
                      type="number"
                      value={formData.experience}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {userType === "farm_owner" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  بيانات المزرعة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farmName">اسم المزرعة</Label>
                    <Input
                      id="farmName"
                      name="farmName"
                      value={formData.farmName}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmArea">مساحة المزرعة (هكتار)</Label>
                    <Input
                      id="farmArea"
                      name="farmArea"
                      type="number"
                      value={formData.farmArea}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* أزرار الإجراء */}
          <div className="flex gap-3">
            <Button type="submit" disabled={loading} className="gap-2">
              <Save className="h-4 w-4" />
              {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setLocation("/user/dashboard")}>
              إلغاء
            </Button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
}
