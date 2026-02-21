import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sun, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [, setLocation] = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // التحقق من صحة المدخلات
    if (!formData.password || !formData.confirmPassword) {
      setError("الرجاء ملء جميع الحقول");
      return;
    }

    if (formData.password.length < 8) {
      setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }

    setLoading(true);

    try {
      // محاكاة طلب API لإعادة تعيين كلمة المرور
      await new Promise(resolve => setTimeout(resolve, 2000));

      // حفظ كلمة المرور الجديدة في localStorage (لأغراض العرض فقط)
      const userAccounts = JSON.parse(localStorage.getItem("userAccounts") || "{}");
      userAccounts["demo@example.com"] = formData.password;
      localStorage.setItem("userAccounts", JSON.stringify(userAccounts));

      // تسجيل تغيير كلمة المرور
      const passwordChanges = JSON.parse(localStorage.getItem("passwordChanges") || "[]");
      passwordChanges.push({
        timestamp: new Date().toISOString(),
        status: "success"
      });
      localStorage.setItem("passwordChanges", JSON.stringify(passwordChanges));

      setSuccess(true);

      // الانتقال تلقائياً إلى صفحة تسجيل الدخول بعد 3 ثواني
      setTimeout(() => {
        setLocation("/login");
      }, 3000);

    } catch (err) {
      setError("حدث خطأ أثناء إعادة تعيين كلمة المرور");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sun className="w-10 h-10 text-accent" />
            <h1 className="text-3xl font-bold">متجر الطاقة الشمسية</h1>
          </div>
          <p className="text-muted-foreground">تعيين كلمة مرور جديدة</p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <h2 className="text-2xl font-bold mb-2 text-center">كلمة مرور جديدة</h2>
          <p className="text-center text-muted-foreground mb-8">
            أدخل كلمة المرور الجديدة لحسابك
          </p>

          {success ? (
            <div className="space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  تم تحديث كلمة المرور بنجاح!
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-bold mb-2">تم بنجاح</h3>
                  <p className="text-sm text-muted-foreground">
                    تم تحديث كلمة المرور لحسابك. سيتم تحويلك إلى صفحة تسجيل الدخول تلقائياً خلال بضع ثواني.
                  </p>
                </div>

                <Link href="/login">
                  <Button className="w-full bg-accent hover:bg-accent/90">
                    الانتقال إلى تسجيل الدخول الآن
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Label htmlFor="password">كلمة المرور الجديدة</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="كلمة المرور الجديدة"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="أعد إدخال كلمة المرور"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                <h4 className="font-bold text-sm">متطلبات كلمة المرور:</h4>
                <ul className="text-xs space-y-1">
                  <li className={`flex items-center gap-2 ${formData.password.length >= 8 ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <div className={`w-2 h-2 rounded-full ${formData.password.length >= 8 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                    <span>8 أحرف على الأقل</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>حرف كبير على الأقل (A-Z)</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>رقم واحد على الأقل (0-9)</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>رمز خاص على الأقل (@#$%)</span>
                  </li>
                </ul>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent/90" 
                disabled={loading}
              >
                {loading ? "جاري تحديث كلمة المرور..." : "تعيين كلمة المرور الجديدة"}
              </Button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <Link href="/login">
                <Button variant="ghost" className="w-full">
                  العودة إلى تسجيل الدخول
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold mb-2 text-blue-800 text-sm">نصائح أمنية</h3>
            <ul className="space-y-2 text-xs text-blue-700">
              <li>• لا تستخدم كلمات مرور سبق استخدامها</li>
              <li>• تجنب استخدام المعلومات الشخصية</li>
              <li>• استخدم مدير كلمات المرور لتخزينها بأمان</li>
              <li>• قم بتغيير كلمة المرور بانتظام</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}