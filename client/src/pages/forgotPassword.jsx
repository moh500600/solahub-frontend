import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sun, Mail, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    // التحقق من صحة البريد الإلكتروني
    if (!email || !email.includes("@")) {
      setError("الرجاء إدخال بريد إلكتروني صحيح");
      return;
    }
    
    setLoading(true);
    
    try {
      // هنا سيتم إضافة منطق إرسال طلب استعادة كلمة المرور
      // في الوقت الحالي، سنقوم بمحاكاة العملية
      
      // محاكاة طلب API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // تسجيل محاولة الاستعادة في localStorage لأغراض العرض
      const recoveryAttempts = JSON.parse(localStorage.getItem("recoveryAttempts") || "[]");
      recoveryAttempts.push({
        email,
        timestamp: new Date().toISOString(),
        status: "requested"
      });
      localStorage.setItem("recoveryAttempts", JSON.stringify(recoveryAttempts));
      
      setEmailSent(true);
      setSuccess(true);
      setError("");
      
    } catch (err) {
      setError("حدث خطأ أثناء إرسال طلب استعادة كلمة المرور");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleResetDemo = () => {
    // محاكاة إعادة تعيين كلمة المرور للمستخدمين التجريبيين
    setEmail("user@example.com");
    setSuccess(true);
    setEmailSent(true);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sun className="w-10 h-10 text-accent" />
            <h1 className="text-3xl font-bold">متجر الطاقة الشمسية</h1>
          </div>
          <p className="text-muted-foreground">استعادة كلمة المرور</p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <h2 className="text-2xl font-bold mb-2 text-center">نسيت كلمة المرور؟</h2>
          <p className="text-center text-muted-foreground mb-8">
            أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
          </p>

          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pr-10"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  أدخل البريد الإلكتروني المرتبط بحسابك
                </p>
              </div>

              <div className="space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90" 
                  disabled={loading}
                >
                  {loading ? "جاري الإرسال..." : "إرسال رابط الاستعادة"}
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResetDemo}
                    className="text-sm text-accent hover:underline"
                  >
                    تجربة عملية الاستعادة (لعرض)
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  تم إرسال رابط استعادة كلمة المرور بنجاح!
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-bold mb-2">ماذا يحدث الآن؟</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                      <span>تم إرسال رابط استعادة كلمة المرور إلى: <strong>{email}</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                      <span>افتح بريدك الإلكتروني واضغط على الرابط المرفق</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                      <span>سيتم توجيهك إلى صفحة إعادة تعيين كلمة المرور</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                      <span>الرابط صالح لمدة 24 ساعة فقط</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => setEmailSent(false)}
                    variant="outline"
                    className="w-full"
                  >
                    إعادة المحاولة
                  </Button>

                  <div className="text-center text-sm">
                    <p className="text-muted-foreground">لم تصلك الرسالة؟</p>
                    <div className="mt-2 space-x-4">
                      <button
                        onClick={() => setEmailSent(false)}
                        className="text-accent hover:underline"
                      >
                        إعادة إرسال الرابط
                      </button>
                      <span className="text-muted-foreground">|</span>
                      <button
                        onClick={() => setEmailSent(false)}
                        className="text-accent hover:underline"
                      >
                        التحقق من البريد المزعج
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-center space-y-4">
              <Link href="/login">
                <Button variant="ghost" className="w-full">
                  العودة إلى تسجيل الدخول
                </Button>
              </Link>

              <p className="text-sm text-muted-foreground">
                ليس لديك حساب؟{" "}
                <Link href="/register">
                  <button className="text-accent font-medium hover:underline">
                    إنشاء حساب جديد
                  </button>
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 bg-muted/30 rounded-lg p-4">
            <h3 className="font-bold mb-3 text-center">نصائح أمنية</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>لا تشارك رابط استعادة كلمة المرور مع أحد</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>تأكد من أنك تستخدم موقعنا الرسمي</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>استخدم كلمة مرور قوية وفريدة لحسابك</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            بحاجة للمساعدة؟{" "}
            <a href="mailto:support@solar.com" className="text-accent hover:underline">
              تواصل مع الدعم الفني
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}