import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FileText,
  Globe,
  Users,
  Save,
  AlertCircle,
  CheckCircle,
  Lock,
  Shield,
  Zap,
  Trees,
  Award,
  DollarSign,
  Building,
  Smartphone
} from 'lucide-react';
import UserLayoutEnhanced from "./UserLayoutEnhanced";

export default function ProfileExpanded() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    // البيانات الأساسية
    name: "",
    email: "",
    phone: "",
    governorate: "",
    address: "",
    
    // بيانات الشركات والمتاجر
    companyName: "",
    commercialRegister: "",
    taxNumber: "",
    website: "",
    numberOfEmployees: "",
    businessDescription: "",
    bankAccount: "",
    businessLicense: "",
    
    // بيانات المهندس
    licenseNumber: "",
    specialization: "",
    yearsOfExperience: "",
    certifications: "",
    bankDetails: "",
    projectsCompleted: "",
    
    // بيانات صاحب المزرعة
    farmArea: "",
    farmType: "",
    cropTypes: "",
    irrigationSystemType: "",
    waterSource: "",
    
    // بيانات الأمان
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData(prev => ({
        ...prev,
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        governorate: parsedUser.governorate || "",
        address: parsedUser.address || "",
        companyName: parsedUser.companyName || "",
        commercialRegister: parsedUser.commercialRegister || "",
        taxNumber: parsedUser.taxNumber || "",
        website: parsedUser.website || "",
        numberOfEmployees: parsedUser.numberOfEmployees || "",
        businessDescription: parsedUser.businessDescription || "",
        licenseNumber: parsedUser.licenseNumber || "",
        specialization: parsedUser.specialization || "",
        yearsOfExperience: parsedUser.yearsOfExperience || "",
        certifications: parsedUser.certifications || "",
        farmArea: parsedUser.farmArea || "",
        farmType: parsedUser.farmType || "",
        cropTypes: parsedUser.cropTypes || "",
        irrigationSystemType: parsedUser.irrigationSystemType || ""
      }));
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccess("تم حفظ البيانات بنجاح");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("حدث خطأ أثناء حفظ البيانات");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      setLoading(false);
      return;
    }

    try {
      setSuccess("تم تغيير كلمة المرور بنجاح");
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("حدث خطأ أثناء تغيير كلمة المرور");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <UserLayoutEnhanced>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </UserLayoutEnhanced>
    );
  }

  return (
    <UserLayoutEnhanced>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">إعدادات الحساب</h1>
          <p className="text-muted-foreground mt-2">إدارة بيانات حسابك الشخصية والمهنية</p>
        </div>

        {success && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">عام</TabsTrigger>
            <TabsTrigger value="business">الأعمال</TabsTrigger>
            <TabsTrigger value="security">الأمان</TabsTrigger>
            <TabsTrigger value="preferences">التفضيلات</TabsTrigger>
          </TabsList>

          {/* تبويب عام */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>البيانات الأساسية</CardTitle>
                <CardDescription>معلومات حسابك الشخصية</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="pr-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pr-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <div className="relative">
                        <Smartphone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="pr-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="governorate">المحافظة</Label>
                      <Input
                        id="governorate"
                        value={formData.governorate}
                        onChange={(e) => handleInputChange("governorate", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">العنوان بالتفصيل</Label>
                    <div className="relative">
                      <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="pr-10"
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={loading}>
                    <Save className="ml-2 h-4 w-4" />
                    {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب الأعمال */}
          <TabsContent value="business" className="space-y-4">
            {(user.userType === "company" || user.userType === "institution" || user.userType === "store") && (
              <Card>
                <CardHeader>
                  <CardTitle>بيانات الشركة/المؤسسة</CardTitle>
                  <CardDescription>معلومات الكيان التجاري</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">اسم الشركة/المؤسسة</Label>
                        <div className="relative">
                          <Building className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="company-name"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange("companyName", e.target.value)}
                            className="pr-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="commercial-register">السجل التجاري</Label>
                        <div className="relative">
                          <FileText className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="commercial-register"
                            value={formData.commercialRegister}
                            onChange={(e) => handleInputChange("commercialRegister", e.target.value)}
                            className="pr-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tax-number">الرقم الضريبي</Label>
                        <Input
                          id="tax-number"
                          value={formData.taxNumber}
                          onChange={(e) => handleInputChange("taxNumber", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">الموقع الإلكتروني</Label>
                        <div className="relative">
                          <Globe className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="website"
                            value={formData.website}
                            onChange={(e) => handleInputChange("website", e.target.value)}
                            className="pr-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employees">عدد الموظفين</Label>
                        <div className="relative">
                          <Users className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="employees"
                            type="number"
                            value={formData.numberOfEmployees}
                            onChange={(e) => handleInputChange("numberOfEmployees", e.target.value)}
                            className="pr-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bank-account">حساب بنكي</Label>
                        <div className="relative">
                          <DollarSign className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="bank-account"
                            value={formData.bankAccount}
                            onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                            className="pr-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business-description">وصف النشاط التجاري</Label>
                      <Input
                        id="business-description"
                        value={formData.businessDescription}
                        onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                      />
                    </div>

                    <Button type="submit" disabled={loading}>
                      <Save className="ml-2 h-4 w-4" />
                      {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {user.userType === "engineer" && (
              <Card>
                <CardHeader>
                  <CardTitle>بيانات المهندس</CardTitle>
                  <CardDescription>معلومات الترخيص والخبرة المهنية</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="license-number">رقم الترخيص</Label>
                        <div className="relative">
                          <Award className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="license-number"
                            value={formData.licenseNumber}
                            onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                            className="pr-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialization">التخصص</Label>
                        <Input
                          id="specialization"
                          value={formData.specialization}
                          onChange={(e) => handleInputChange("specialization", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">سنوات الخبرة</Label>
                        <Input
                          id="experience"
                          type="number"
                          value={formData.yearsOfExperience}
                          onChange={(e) => handleInputChange("yearsOfExperience", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="projects-completed">المشاريع المكتملة</Label>
                        <Input
                          id="projects-completed"
                          type="number"
                          value={formData.projectsCompleted}
                          onChange={(e) => handleInputChange("projectsCompleted", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bank-details">تفاصيل البنك</Label>
                        <Input
                          id="bank-details"
                          value={formData.bankDetails}
                          onChange={(e) => handleInputChange("bankDetails", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certifications">الشهادات والدورات</Label>
                      <Input
                        id="certifications"
                        value={formData.certifications}
                        onChange={(e) => handleInputChange("certifications", e.target.value)}
                      />
                    </div>

                    <Button type="submit" disabled={loading}>
                      <Save className="ml-2 h-4 w-4" />
                      {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {user.userType === "farm_owner" && (
              <Card>
                <CardHeader>
                  <CardTitle>بيانات المزرعة</CardTitle>
                  <CardDescription>معلومات المزرعة والمحاصيل</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="farm-area">مساحة المزرعة (هكتار)</Label>
                        <div className="relative">
                          <Trees className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="farm-area"
                            value={formData.farmArea}
                            onChange={(e) => handleInputChange("farmArea", e.target.value)}
                            className="pr-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="farm-type">نوع المزرعة</Label>
                        <Input
                          id="farm-type"
                          value={formData.farmType}
                          onChange={(e) => handleInputChange("farmType", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="irrigation-system">نوع نظام الري</Label>
                        <div className="relative">
                          <Zap className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="irrigation-system"
                            value={formData.irrigationSystemType}
                            onChange={(e) => handleInputChange("irrigationSystemType", e.target.value)}
                            className="pr-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="water-source">مصدر المياه</Label>
                        <Input
                          id="water-source"
                          value={formData.waterSource}
                          onChange={(e) => handleInputChange("waterSource", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="crop-types">أنواع المحاصيل</Label>
                      <Input
                        id="crop-types"
                        value={formData.cropTypes}
                        onChange={(e) => handleInputChange("cropTypes", e.target.value)}
                      />
                    </div>

                    <Button type="submit" disabled={loading}>
                      <Save className="ml-2 h-4 w-4" />
                      {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* تبويب الأمان */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>تغيير كلمة المرور</CardTitle>
                <CardDescription>قم بتحديث كلمة المرور الخاصة بك</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="current-password"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                        className="pr-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="new-password"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange("newPassword", e.target.value)}
                        className="pr-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pr-10"
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={loading}>
                    <Shield className="ml-2 h-4 w-4" />
                    {loading ? "جاري التحديث..." : "تحديث كلمة المرور"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب التفضيلات */}
          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>تفضيلات الإشعارات</CardTitle>
                <CardDescription>اختر كيف تريد تلقي الإشعارات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">إشعارات البريد الإلكتروني</p>
                    <p className="text-sm text-muted-foreground">تلقي إشعارات عن الطلبات والعروض</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">إشعارات الرسائل النصية</p>
                    <p className="text-sm text-muted-foreground">تلقي تنبيهات SMS مهمة</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">الأخبار والعروض</p>
                    <p className="text-sm text-muted-foreground">تلقي أخبار وعروض خاصة</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <Button className="w-full">حفظ التفضيلات</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </UserLayoutEnhanced>
  );
}
