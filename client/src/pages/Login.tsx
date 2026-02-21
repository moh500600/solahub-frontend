import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLoginUrl } from "@/const";
import {
  Sun,
  Mail,
  Lock,
  AlertCircle,
  ChevronRight,
  Eye,
  EyeOff,
  Building
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const { isAuthenticated, userRole, login, loginWithGoogle } = useAuth();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (isAuthenticated && userRole) {
      if (userRole === 'admin') {
        setLocation("/admin/dashboard");
      } else if (userRole === 'agent') {
        setLocation("/agent/dashboard"); // تم التغيير هنا
      } else {
        setLocation("/user/dashboard");
      }
    }
  }, [isAuthenticated, userRole, setLocation]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // بيانات المسؤول
      if (loginData.email === "admin@solar.com" && loginData.password === "admin123") {
        const adminUser = {
          id: "admin-001",
          name: "أحمد المسؤول",
          email: "admin@solar.com",
          role: "admin",
          governorate: "الرياض",
          address: "لوحة تحكم المسؤول",
          avatar: "👨‍💼"
        };
        
        localStorage.setItem("admin_user", JSON.stringify(adminUser));
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("user", JSON.stringify(adminUser));
        
        setError("تم تسجيل الدخول بنجاح كمسؤول!");
        setTimeout(() => {
          setLocation("/admin/dashboard");
        }, 100);
        return;
      } 
      // بيانات المستخدم العادي
      else if (loginData.email === "user@solar.com" && loginData.password === "user123") {
        const regularUser = {
          id: "user-001",
          name: "محمد علي",
          email: "user@solar.com",
          role: "customer",
          userType: "customer",
          governorate: "الرياض",
          address: "شارع الملك فهد، الرياض",
          phone: "+966501234567",
          avatar: "👨‍💼",
          profileImage: null,
          orders: [
            {
              id: "ORD-001",
              date: "2024-01-15",
              total: 15000,
              status: "مكتمل",
              items: 3
            },
            {
              id: "ORD-002",
              date: "2024-01-20",
              total: 8500,
              status: "قيد المعالجة",
              items: 2
            }
          ],
          subscriptionPlan: "premium",
          subscriptionExpiry: "2025-12-31",
          totalSpent: 23500,
          loyaltyPoints: 2350
        };
        
        localStorage.setItem("user", JSON.stringify(regularUser));
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "customer");
        
        setError("تم تسجيل الدخول بنجاح كمستخدم!");
        setTimeout(() => {
          setLocation("/user/dashboard");
        }, 100);
        return;
      }
      // بيانات المهندس
      else if (loginData.email === "engineer@solar.com" && loginData.password === "engineer123") {
        const engineerUser = {
          id: "eng-001",
          name: "فهد الدعيع",
          email: "engineer@solar.com",
          role: "engineer",
          userType: "engineer",
          governorate: "الرياض",
          address: "حي الملقا، الرياض",
          phone: "+966501234568",
          avatar: "👨‍🔧",
          profileImage: null,
          license: "ENG-2024-001",
          experience: 8,
          rating: 4.8,
          reviews: 156,
          completedProjects: 89,
          activeProjects: 5,
          totalEarnings: 450000
        };
        
        localStorage.setItem("user", JSON.stringify(engineerUser));
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "engineer");
        
        setError("تم تسجيل الدخول بنجاح كمهندس!");
        setTimeout(() => {
          setLocation("/user/dashboard");
        }, 100);
        return;
      }
      // بيانات صاحب المتجر
      else if (loginData.email === "store@solar.com" && loginData.password === "store123") {
        const storeUser = {
          id: "store-001",
          name: "محل الطاقة الشمسية",
          email: "store@solar.com",
          role: "store",
          userType: "store",
          governorate: "الرياض",
          address: "شارع التخصصي، الرياض",
          phone: "+966501234569",
          avatar: "🏪",
          profileImage: null,
          commercialRegister: "COM-2023-001",
          taxNumber: "TAX-2023-001",
          totalSales: 850000,
          activeProducts: 45,
          monthlyRevenue: 125000,
          rating: 4.6,
          reviews: 234
        };
        
        localStorage.setItem("user", JSON.stringify(storeUser));
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "store");
        
        setError("تم تسجيل الدخول بنجاح كمتجر!");
        setTimeout(() => {
          setLocation("/user/dashboard");
        }, 100);
        return;
      }
      // بيانات الوكيل - التحقق من الوكلاء المخزنين
      else {
        // محاولة العثور على وكيل في بيانات الوكلاء المخزنة
        const agentsData = localStorage.getItem("solar_agents_data_v2");
        if (agentsData) {
          const agents = JSON.parse(agentsData);
          const agent = agents.find(a => 
            a.email === loginData.email && 
            a.status === 'active' && 
            a.password === loginData.password
          );
          
          if (agent) {
            const agentUser = {
              id: agent.id,
              name: agent.name,
              email: agent.email,
              role: "agent",
              code: agent.code,
              company: agent.company,
              phone: agent.phone,
              address: agent.address,
              city: agent.city,
              country: agent.country,
              commissionRate: agent.commissionRate,
              avatar: agent.type === 'individual' ? "👨‍💼" : "🏢",
              profileImage: null,
              totalSales: agent.totalSales,
              totalCommission: agent.totalCommission,
              pendingCommission: agent.pendingCommission,
              paidCommission: agent.paidCommission,
              products: agent.products,
              sales: agent.sales,
              bankInfo: agent.bankInfo,
              documents: agent.documents
            };
            
            localStorage.setItem("agent_user", JSON.stringify(agentUser));
            localStorage.setItem("current_agent", JSON.stringify(agent));
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("userRole", "agent");
            localStorage.setItem("user", JSON.stringify(agentUser));
            
            setError("تم تسجيل الدخول بنجاح كوكيل!");
            setTimeout(() => {
              setLocation("/agent/dashboard"); // تم التغيير هنا
            }, 100);
            return;
          }
        }
        
        // إذا لم يتم العثور على وكيل، جرب بيانات الوكيل التجريبية
        if (loginData.email === "info@solar-tech.com" && loginData.password === "agent123") {
          const agentUser = {
            id: "agt-001",
            name: "شركة التقنية الشمسية",
            email: "info@solar-tech.com",
            role: "agent",
            code: "AGT-001",
            company: "شركة التقنية الشمسية المحدودة",
            phone: "+966501234567",
            address: "حي المروج، شارع الملك فهد",
            city: "الرياض",
            country: "السعودية",
            commissionRate: 15,
            avatar: "🏢",
            profileImage: null,
            totalSales: 1400,
            totalCommission: 210,
            pendingCommission: 0,
            paidCommission: 210,
            products: [
              {
                id: "prod1",
                productId: "SP-MAX3-400",
                productName: "لوح شمسي 400 واط مونو كريستال",
                productType: "ألواح شمسية",
                productSKU: "SP-MAX3-400",
                agentPrice: 220,
                retailPrice: 280,
                wholesalePrice: 250,
                minimumOrder: 10,
                stock: 50,
                commissionRate: 15,
                status: 'approved',
                warranty: "25 سنة",
                certificate: "TUV, IEC, ISO9001"
              }
            ],
            sales: [
              {
                id: "sale1",
                orderId: "ORD-001",
                productName: "لوح شمسي 400 واط مونو كريستال",
                quantity: 5,
                unitPrice: 280,
                totalAmount: 1400,
                commissionAmount: 210,
                commissionRate: 15,
                saleDate: new Date().toISOString(),
                status: 'delivered',
                paymentStatus: 'paid',
                customerName: "محمد أحمد"
              }
            ],
            bankInfo: {
              bankName: "البنك الأهلي السعودي",
              accountNumber: "SA1234567890123456789012",
              iban: "SA0012345678901234567890",
              swiftCode: "NCBJSARI",
              accountName: "شركة التقنية الشمسية"
            },
            documents: []
          };
          
          localStorage.setItem("agent_user", JSON.stringify(agentUser));
          localStorage.setItem("current_agent", JSON.stringify(agentUser));
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userRole", "agent");
          localStorage.setItem("user", JSON.stringify(agentUser));
          
          setError("تم تسجيل الدخول بنجاح كوكيل!");
          setTimeout(() => {
            setLocation("/agent/dashboard"); // تم التغيير هنا
          }, 100);
          return;
        }
        
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      setError("حدث خطأ أثناء تسجيل الدخول بجوجل");
    }
  };

  const handleManusLogin = () => {
    window.location.href = getLoginUrl();
  };

  const fillCredentials = (email, password) => {
    setLoginData({ email, password });
    setError("تم تعبئة بيانات الاختبار بنجاح");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setError("تم نسخ النص إلى الحافظة");
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
          <h2 className="text-2xl font-bold mb-2 text-center">تسجيل الدخول</h2>
          <p className="text-center text-muted-foreground mb-8">أدخل بيانات حسابك للدخول</p>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <Alert variant={error.includes("تم") && !error.includes("غير صحيحة") ? "default" : "destructive"}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  className="pr-10 pl-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full gap-2">
              {loading ? "جاري التحميل..." : "تسجيل الدخول"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </form>

          {/* بيانات الاختبار */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm font-semibold text-center mb-4 text-muted-foreground">بيانات الاختبار:</p>
            
            <div className="space-y-3">
              {[
                { title: "👨‍💼 مسؤول", email: "admin@solar.com", password: "admin123" },
                { title: "👨‍💼 عميل", email: "user@solar.com", password: "user123" },
                { title: "👨‍🔧 مهندس", email: "engineer@solar.com", password: "engineer123" },
                { title: "🏪 متجر", email: "store@solar.com", password: "store123" },
                { title: "🏢 وكيل", email: "info@solar-tech.com", password: "agent123" }
              ].map((account, idx) => (
                <div key={idx} className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <p className="text-xs font-semibold">{account.title}</p>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs space-y-1 flex-1">
                      <p><span className="font-medium">البريد:</span> {account.email}</p>
                      <p><span className="font-medium">كلمة المرور:</span> {account.password}</p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => fillCredentials(account.email, account.password)}
                      className="text-xs"
                    >
                      استخدم
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">أو</span>
              </div>
            </div>

            <Button type="button" variant="outline" className="w-full gap-2" onClick={handleGoogleLogin}>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              تسجيل الدخول بجوجل
            </Button>

            {/* زر دخول الوكيل المباشر */}
            <div className="text-center">
              <Link href="/agent/login"> {/* تم التغيير هنا */}
                <Button type="button" variant="ghost" className="gap-2 text-sm">
                  <Building className="w-4 h-4" />
                  تسجيل دخول الوكيل المباشر
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center text-sm mt-8">
            <span className="text-muted-foreground">ليس لديك حساب؟ </span>
            <Link href="/register" className="text-accent hover:underline font-medium">
              إنشاء حساب جديد
            </Link>
          </div>

          <div className="text-center text-sm mt-4">
            <Link href="/forgot-password" className="text-accent hover:underline">
              هل نسيت كلمة المرور؟
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}