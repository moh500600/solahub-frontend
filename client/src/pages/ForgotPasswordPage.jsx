import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sun, Mail, Key, ArrowLeft, AlertCircle, ChevronLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "wouter";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resetPasswordSent, setResetPasswordSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!email.includes("@")) {
      setError("الرجاء إدخال بريد إلكتروني صحيح");
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResetPasswordSent(true);
      setSuccessMessage("تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد.");
    } catch (err) {
      setError("حدث خطأ أثناء إرسال رابط الاستعادة. الرجاء المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sun className="w-10 h-10 text-accent" />
            <h1 className="text-3xl font-bold">متجر الطاقة الشمسية</h1>
          </div>
          <p className="text-muted-foreground">الطاقة النظيفة لمستقبل أفضل</p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <h2 className="text-2xl font-bold mb-2 text-center">
            {!resetPasswordSent && "استعادة كلمة المرور"}
            {resetPasswordSent && "تم إرسال رابط الاستعادة"}
          </h2>
          
          <p className="text-center text-muted-foreground mb-8">
            {!resetPasswordSent && "أدخل بريدك الإلكتروني لاستعادة كلمة المرور"}
            {resetPasswordSent && "تحقق من بريدك الإلكتروني لإكمال عملية الاستعادة"}
          </p>

          {resetPasswordSent ? (
            <div className="space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <AlertCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  {successMessage}
                </AlertDescription>
              </Alert>
              
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <Key className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold mb-2">تم إرسال رابط الاستعادة</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  تم إرسال رابط استعادة كلمة المرور إلى البريد الإلكتروني: 
                  <span className="font-bold text-foreground"> {email}</span>
                </p>
                <p className="text-xs text-muted-foreground mb-6">
                  إذا لم تجد الرسالة في صندوق الوارد، يرجى التحقق من مجلد الرسائل غير المرغوب فيها (Spam).
                </p>
                
                <Link href="/login">
                  <Button className="w-full bg-accent hover:bg-accent/90">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    العودة إلى تسجيل الدخول
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="forgot-email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pr-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  سنرسل لك رابطًا لإعادة تعيين كلمة المرور الخاصة بك
                </p>
              </div>

              <div className="flex gap-3">
                <Link href="/login">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                  >
                    <ChevronLeft className="ml-2 h-4 w-4" />
                    إلغاء
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  className="flex-1 bg-accent hover:bg-accent/90"
                  disabled={loading}
                >
                  {loading ? "جاري الإرسال..." : "إرسال رابط الاستعادة"}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="font-bold mb-4 text-center">معلومات مهمة</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-1.5"></div>
                <span>الرابط صالح لمدة 24 ساعة فقط</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-1.5"></div>
                <span>تحقق من مجلد Spam إذا لم تجد الرسالة</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-1.5"></div>
                <span>إذا واجهتك مشكلة، تواصل مع دعم العملاء</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            <Link href="/login">
              <button className="text-accent hover:underline">
                العودة إلى تسجيل الدخول
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}