import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sun,
  Mail,
  Lock,
  User,
  MapPin,
  Home,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Store,
  UserCog,
  Building,
  Trees,
  Users,
  Camera,
  Upload,
  X,
  Phone,
  Globe,
  FileText
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "wouter";

const SAUDI_GOVERNORATES = [
  "الرياض",
  "مكة المكرمة",
  "المدينة المنورة",
  "القصيم",
  "الشرقية",
  "عسير",
  "تبوك",
  "حائل",
  "الحدود الشمالية",
  "جازان",
  "نجران",
  "الباحة",
  "الجوف"
];

const USER_TYPES = [
  { value: "customer", label: "عميل", icon: User, description: "شراء منتجات الطاقة الشمسية" },
  { value: "engineer", label: "مهندس", icon: UserCog, description: "تركيب وصيانة الأنظمة" },
  { value: "store", label: "متجر", icon: Store, description: "بيع منتجات الطاقة الشمسية" },
  { value: "farm_owner", label: "صاحب مزرعة", icon: Trees, description: "استخدام الطاقة الشمسية في الزراعة" },
  { value: "company", label: "شركة", icon: Building, description: "مشاريع طاقة شمسية تجارية" },
  { value: "institution", label: "مؤسسة", icon: Users, description: "مشاريع حكومية أو تعليمية" }
];

export default function RegisterPage() {
  const { isAuthenticated, userRole, register } = useAuth();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleLinking, setGoogleLinking] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [registerData, setRegisterData] = useState({
    // البيانات الأساسية
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    governorate: "",
    address: "",
    phone: "",
    
    // بيانات الشركات والمتاجر والمؤسسات
    companyName: "",
    commercialRegister: "",
    taxNumber: "",
    website: "",
    
    // بيانات المهندس
    licenseNumber: "",
    specialization: "",
    yearsOfExperience: "",
    certifications: "",
    
    // بيانات صاحب المزرعة
    farmArea: "",
    farmType: "",
    cropTypes: "",
    
    // بيانات إضافية
    businessDescription: "",
    numberOfEmployees: "",
    bankAccount: "",
    businessLicense: ""
  });

  useEffect(() => {
    if (isAuthenticated && userRole) {
      if (userRole === 'admin') {
        setLocation("/admin/dashboard");
      } else {
        setLocation("/user/dashboard");
      }
    }
  }, [isAuthenticated, userRole, setLocation]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateRegisterData = () => {
    if (!registerData.name.trim()) {
      setError("الرجاء إدخال الاسم الكامل");
      return false;
    }

    if (!registerData.userType) {
      setError("الرجاء اختيار نوع المستخدم");
      return false;
    }

    if (!registerData.phone.trim()) {
      setError("الرجاء إدخال رقم الهاتف");
      return false;
    }

    // التحقق من الحقول المخصصة لكل نوع مستخدم
    if (registerData.userType === "company" || registerData.userType === "institution" || registerData.userType === "store") {
      if (!registerData.companyName.trim()) {
        setError("الرجاء إدخال اسم الشركة/المؤسسة");
        return false;
      }
      if (!registerData.commercialRegister.trim()) {
        setError("الرجاء إدخال السجل التجاري");
        return false;
      }
      if (!registerData.taxNumber.trim()) {
        setError("الرجاء إدخال الرقم الضريبي");
        return false;
      }
      if (!registerData.numberOfEmployees) {
        setError("الرجاء إدخال عدد الموظفين");
        return false;
      }
    }

    if (registerData.userType === "engineer") {
      if (!registerData.licenseNumber.trim()) {
        setError("الرجاء إدخال رقم الترخيص");
        return false;
      }
      if (!registerData.specialization.trim()) {
        setError("الرجاء إدخال التخصص");
        return false;
      }
      if (!registerData.yearsOfExperience) {
        setError("الرجاء إدخال سنوات الخبرة");
        return false;
      }
    }

    if (registerData.userType === "farm_owner") {
      if (!registerData.farmArea.trim()) {
        setError("الرجاء إدخال مساحة المزرعة");
        return false;
      }
      if (!registerData.farmType.trim()) {
        setError("الرجاء اختيار نوع المزرعة");
        return false;
      }
    }

    if (!registerData.email.includes("@")) {
      setError("الرجاء إدخال بريد إلكتروني صحيح");
      return false;
    }

    if (registerData.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return false;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return false;
    }

    if (!registerData.governorate) {
      setError("الرجاء اختيار المحافظة");
      return false;
    }

    if (!registerData.address.trim()) {
      setError("الرجاء إدخال العنوان");
      return false;
    }

    return true;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setError("");

    if (validateRegisterData()) {
      setStep(2);
    }
  };

  const handleBackStep = () => {
    setStep(1);
    setError("");
  };

  const handleGoogleRegister = async () => {
    setGoogleLinking(true);
    setError("");

    try {
      // محاكاة تسجيل الدخول عبر جوجل (وهمي مؤقتاً)
      console.log("محاولة التسجيل عبر جوجل...");
      
      // يمكن استبدال هذا لاحقاً برابط جوجل الفعلي
      alert("سيتم تفعيل خيار جوجل قريباً. يرجى استخدام التسجيل العادي حالياً.");
      setGoogleLinking(false);
    } catch (err) {
      setError("حدث خطأ أثناء ربط حساب جوجل. الرجاء المحاولة مرة أخرى.");
      setGoogleLinking(false);
    }
  };

  const handleRegisterComplete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(registerData);
    } catch (err) {
      setError("حدث خطأ أثناء التسجيل. الرجاء المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const getUserTypeIcon = (type) => {
    const userType = USER_TYPES.find(ut => ut.value === type);
    return userType ? userType.icon : User;
  };

  const getUserTypeLabel = (type) => {
    const userType = USER_TYPES.find(ut => ut.value === type);
    return userType ? userType.label : "مستخدم";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sun className="w-10 h-10 text-accent" />
            <h1 className="text-3xl font-bold">متجر الطاقة الشمسية</h1>
          </div>
          <p className="text-muted-foreground">الطاقة النظيفة لمستقبل أفضل</p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <h2 className="text-2xl font-bold mb-2 text-center">
            {step === 1 && "إنشاء حساب جديد"}
            {step === 2 && "إكمال البيانات والتأكيد"}
          </h2>
          
          <p className="text-center text-muted-foreground mb-8">
            {step === 1 && "اختر نوع حسابك وأدخل معلوماتك الأساسية"}
            {step === 2 && "أضف صورة حسابك وأكمل التسجيل"}
          </p>

          {/* خطوة 1: البيانات الأساسية */}
          {step === 1 ? (
            <form onSubmit={handleNextStep} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* زر التسجيل عبر جوجل */}
              <div className="space-y-3">
                <Button
                  type="button"
                  onClick={handleGoogleRegister}
                  disabled={googleLinking}
                  className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 h-12 text-lg"
                >
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  التسجيل عبر جوجل (قريباً)
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-muted-foreground">أو</span>
                  </div>
                </div>
              </div>

              {/* قسم اختيار نوع المستخدم */}
              <div className="space-y-3">
                <Label className="text-lg">نوع الحساب *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {USER_TYPES.map((userType) => {
                    const Icon = userType.icon;
                    const isSelected = registerData.userType === userType.value;
                    
                    return (
                      <button
                        key={userType.value}
                        type="button"
                        onClick={() => setRegisterData({ ...registerData, userType: userType.value })}
                        className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all hover:border-accent hover:bg-accent/5 ${
                          isSelected 
                            ? 'border-accent bg-accent/10' 
                            : 'border-border'
                        }`}
                      >
                        <Icon className={`h-8 w-8 ${isSelected ? 'text-accent' : 'text-muted-foreground'}`} />
                        <span className={`font-medium text-sm ${isSelected ? 'text-accent' : 'text-foreground'}`}>
                          {userType.label}
                        </span>
                        <span className="text-xs text-muted-foreground text-center">
                          {userType.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* الحقول المشتركة */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل *</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="أحمد محمد"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">البريد الإلكتروني *</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="example@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                      className="pr-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="+966501234567"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      required
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">كلمة المرور *</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="6 أحرف على الأقل"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                      className="pr-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">تأكيد كلمة المرور *</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="تأكيد كلمة المرور"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="governorate">المحافظة *</Label>
                  <Select value={registerData.governorate} onValueChange={(value) => setRegisterData({ ...registerData, governorate: value })}>
                    <SelectTrigger id="governorate">
                      <SelectValue placeholder="اختر المحافظة" />
                    </SelectTrigger>
                    <SelectContent>
                      {SAUDI_GOVERNORATES.map((gov) => (
                        <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">العنوان بالتفصيل *</Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    placeholder="الحي، الشارع، رقم المبنى"
                    value={registerData.address}
                    onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                    required
                    className="pr-10"
                  />
                </div>
              </div>

              {/* حقول خاصة بالشركات والمتاجر والمؤسسات */}
              {(registerData.userType === "company" || registerData.userType === "institution" || registerData.userType === "store") && (
                <>
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">بيانات الشركة/المؤسسة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">اسم الشركة/المؤسسة *</Label>
                        <div className="relative">
                          <Briefcase className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="company-name"
                            placeholder="اسم الشركة"
                            value={registerData.companyName}
                            onChange={(e) => setRegisterData({ ...registerData, companyName: e.target.value })}
                            className="pr-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="commercial-register">السجل التجاري *</Label>
                        <div className="relative">
                          <FileText className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="commercial-register"
                            placeholder="رقم السجل التجاري"
                            value={registerData.commercialRegister}
                            onChange={(e) => setRegisterData({ ...registerData, commercialRegister: e.target.value })}
                            className="pr-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tax-number">الرقم الضريبي *</Label>
                        <div className="relative">
                          <FileText className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="tax-number"
                            placeholder="الرقم الضريبي"
                            value={registerData.taxNumber}
                            onChange={(e) => setRegisterData({ ...registerData, taxNumber: e.target.value })}
                            className="pr-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">الموقع الإلكتروني</Label>
                        <div className="relative">
                          <Globe className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="website"
                            placeholder="www.example.com"
                            value={registerData.website}
                            onChange={(e) => setRegisterData({ ...registerData, website: e.target.value })}
                            className="pr-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employees">عدد الموظفين *</Label>
                        <Input
                          id="employees"
                          type="number"
                          placeholder="عدد الموظفين"
                          value={registerData.numberOfEmployees}
                          onChange={(e) => setRegisterData({ ...registerData, numberOfEmployees: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="business-description">وصف النشاط التجاري</Label>
                        <Input
                          id="business-description"
                          placeholder="وصف موجز للنشاط"
                          value={registerData.businessDescription}
                          onChange={(e) => setRegisterData({ ...registerData, businessDescription: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* حقول خاصة بالمهندس */}
              {registerData.userType === "engineer" && (
                <>
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">بيانات المهندس</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="license-number">رقم الترخيص *</Label>
                        <Input
                          id="license-number"
                          placeholder="رقم الترخيص المهني"
                          value={registerData.licenseNumber}
                          onChange={(e) => setRegisterData({ ...registerData, licenseNumber: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialization">التخصص *</Label>
                        <Input
                          id="specialization"
                          placeholder="التخصص (كهربائي، ميكانيكي، إلخ)"
                          value={registerData.specialization}
                          onChange={(e) => setRegisterData({ ...registerData, specialization: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">سنوات الخبرة *</Label>
                        <Input
                          id="experience"
                          type="number"
                          placeholder="عدد السنوات"
                          value={registerData.yearsOfExperience}
                          onChange={(e) => setRegisterData({ ...registerData, yearsOfExperience: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="certifications">الشهادات والدورات</Label>
                        <Input
                          id="certifications"
                          placeholder="الشهادات المهنية"
                          value={registerData.certifications}
                          onChange={(e) => setRegisterData({ ...registerData, certifications: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* حقول خاصة بصاحب المزرعة */}
              {registerData.userType === "farm_owner" && (
                <>
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">بيانات المزرعة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="farm-area">مساحة المزرعة (هكتار) *</Label>
                        <Input
                          id="farm-area"
                          placeholder="مساحة المزرعة"
                          value={registerData.farmArea}
                          onChange={(e) => setRegisterData({ ...registerData, farmArea: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="farm-type">نوع المزرعة *</Label>
                        <Select value={registerData.farmType} onValueChange={(value) => setRegisterData({ ...registerData, farmType: value })}>
                          <SelectTrigger id="farm-type">
                            <SelectValue placeholder="اختر نوع المزرعة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vegetables">خضروات</SelectItem>
                            <SelectItem value="fruits">فواكه</SelectItem>
                            <SelectItem value="dates">تمور</SelectItem>
                            <SelectItem value="livestock">ثروة حيوانية</SelectItem>
                            <SelectItem value="dairy">ألبان</SelectItem>
                            <SelectItem value="mixed">مختلطة</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="crop-types">أنواع المحاصيل</Label>
                        <Input
                          id="crop-types"
                          placeholder="أنواع المحاصيل الرئيسية"
                          value={registerData.cropTypes}
                          onChange={(e) => setRegisterData({ ...registerData, cropTypes: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  التالي
                  <ChevronLeft className="ml-2 h-4 w-4" />
                </Button>
                <Link href="/login">
                  <Button type="button" variant="outline" className="flex-1">
                    لديك حساب؟ سجل الدخول
                  </Button>
                </Link>
              </div>
            </form>
          ) : (
            // خطوة 2: صورة الحساب والتأكيد
            <form onSubmit={handleRegisterComplete} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-center">
                <div className="relative">
                  {profileImagePreview ? (
                    <div className="relative w-32 h-32">
                      <img
                        src={profileImagePreview}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover border-4 border-accent"
                      />
                      <button
                        type="button"
                        onClick={removeProfileImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-accent/10 border-2 border-dashed border-accent flex items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 bg-accent text-white rounded-full p-2 hover:bg-accent/90"
                  >
                    <Upload className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">ملخص البيانات</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <p><strong>الاسم:</strong> {registerData.name}</p>
                  <p><strong>البريد الإلكتروني:</strong> {registerData.email}</p>
                  <p><strong>نوع الحساب:</strong> {getUserTypeLabel(registerData.userType)}</p>
                  <p><strong>المحافظة:</strong> {registerData.governorate}</p>
                  <p><strong>الهاتف:</strong> {registerData.phone}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackStep}
                  className="flex-1"
                >
                  <ChevronRight className="ml-2 h-4 w-4" />
                  السابق
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "جاري التسجيل..." : "إنشاء الحساب"}
                </Button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-muted-foreground mt-6 text-sm">
          بالتسجيل، أنت توافق على <Link href="/legal/terms"><span className="text-accent hover:underline">شروط الخدمة</span></Link> و <Link href="/legal/privacy"><span className="text-accent hover:underline">سياسة الخصوصية</span></Link>
        </p>
      </div>
    </div>
  );
}
