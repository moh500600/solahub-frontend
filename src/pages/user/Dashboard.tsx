import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Package, 
  ShoppingCart, 
  Heart, 
  LogOut,
  Home,
  Bell,
  Search,
  MapPin,
  Phone,
  Mail,
  Edit,
  Eye,
  Trash2,
  Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function UserDashboard() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // بيانات تجريبية
  const [orders, setOrders] = useState([
    { id: "ORD-001", date: "2024-03-15", total: 24500, status: "تم التسليم", items: 3 },
    { id: "ORD-002", date: "2024-03-14", total: 18900, status: "قيد التجهيز", items: 2 },
    { id: "ORD-003", date: "2024-03-10", total: 32500, status: "قيد الشحن", items: 4 },
    { id: "ORD-004", date: "2024-03-05", total: 15600, status: "معلق", items: 1 },
    { id: "ORD-005", date: "2024-02-28", total: 28700, status: "تم التسليم", items: 5 },
  ]);

  const [wishlist, setWishlist] = useState([
    { id: 1, name: "لوح شمسي 400W", price: 850, category: "ألواح شمسية", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=300" },
    { id: 2, name: "بطارية ليثيوم 100AH", price: 1800, category: "بطاريات", image: "https://images.unsplash.com/photo-1622547748227-8333785ed618?w=300" },
    { id: 3, name: "محول هجين 5KW", price: 65000, category: "محولات", image: "https://images.unsplash.com/photo-1629654291660-3c98113a0436?w=300" },
  ]);

  const [addresses, setAddresses] = useState([
    { id: 1, name: "المنزل", address: "الرياض - حي العليا - شارع الأمير محمد بن عبدالعزيز", phone: "0501234567", isDefault: true },
    { id: 2, name: "العمل", address: "الرياض - حي النخيل - شارع العروبة", phone: "0557654321", isDefault: false },
  ]);

  useEffect(() => {
    // التحقق من تسجيل الدخول
    const isAuth = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");
    const userRole = localStorage.getItem("userRole");

    console.log("Auth check in UserDashboard:", { isAuth, userRole, userData });

    if (isAuth === "true" && userData) {
      const parsedUser = JSON.parse(userData);
      const role = parsedUser.role || userRole;
      
      // السماح بالدخول للمستخدمين العاديين والمهندسين وأصحاب المتاجر
      if (role === "customer" || role === "engineer" || role === "store") {
        setIsAuthenticated(true);
        setUser(parsedUser);
        console.log("User authenticated:", parsedUser.name, "Role:", role);
      } 
      // إذا كان مسؤول، أرسله إلى لوحة المسؤول
      else if (role === "admin") {
        console.log("Admin detected, redirecting to admin dashboard");
        setLocation("/admin/dashboard");
      }
      // إذا لم يكن لديه صلاحية
      else {
        console.log("Unauthorized role:", role);
        setLocation("/login");
      }
    } else {
      console.log("Not authenticated, redirecting to login");
      setLocation("/login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    setLocation("/login");
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "تم التسليم":
        return <Badge className="bg-green-500">✅ {status}</Badge>;
      case "قيد التجهيز":
        return <Badge className="bg-blue-500">⏳ {status}</Badge>;
      case "قيد الشحن":
        return <Badge className="bg-yellow-500">🚚 {status}</Badge>;
      case "معلق":
        return <Badge className="bg-red-500">⚠️ {status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  const getUserTypeDisplay = () => {
    const role = user?.role || localStorage.getItem("userRole");
    switch(role) {
      case "customer": return "عميل";
      case "engineer": return "مهندس";
      case "store": return "صاحب متجر";
      default: return "مستخدم";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4">جارٍ التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* شريط التنقل العلوي */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-xl">{user?.avatar || "👤"}</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">لوحة تحكمي</h1>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">مرحباً بك، {user?.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {getUserTypeDisplay()}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="relative ml-12">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن منتجات أو طلبات..."
                  className="pr-10 w-80"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" title="الإشعارات">
                <Bell className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setLocation("/")}
              >
                <Home className="ml-2 h-4 w-4" />
                الصفحة الرئيسية
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setLocation("/cart")}
              >
                <ShoppingCart className="ml-2 h-4 w-4" />
                سلة التسوق
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="ml-2 h-4 w-4" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* الشريط الجانبي */}
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-80px)]">
          <nav className="p-4 space-y-1">
            <Button
              variant={activeTab === "overview" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <Home className="ml-2 h-4 w-4" />
              نظرة عامة
            </Button>
            
            <Button
              variant={activeTab === "orders" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingCart className="ml-2 h-4 w-4" />
              طلباتي
              <Badge className="mr-auto bg-blue-500">{orders.length}</Badge>
            </Button>
            
            <Button
              variant={activeTab === "wishlist" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("wishlist")}
            >
              <Heart className="ml-2 h-4 w-4" />
              المفضلة
              <Badge className="mr-auto bg-pink-500">{wishlist.length}</Badge>
            </Button>
            
            <Button
              variant={activeTab === "addresses" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("addresses")}
            >
              <MapPin className="ml-2 h-4 w-4" />
              العناوين
            </Button>
            
            <Button
              variant={activeTab === "profile" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("profile")}
            >
              <User className="ml-2 h-4 w-4" />
              الملف الشخصي
            </Button>
            
            <Separator className="my-2" />
            
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setLocation("/cart")}
            >
              <ShoppingCart className="ml-2 h-4 w-4" />
              سلة التسوق
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setLocation("/")}
            >
              <Home className="ml-2 h-4 w-4" />
              متابعة التسوق
            </Button>
          </nav>
        </aside>

        {/* المحتوى الرئيسي */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* نظرة عامة */}
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">مرحباً بك، {user?.name} 👋</h2>
                <p className="text-muted-foreground">هذه نظرة عامة على حسابك وأنشطتك الأخيرة</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">
                    {getUserTypeDisplay()}
                  </Badge>
                  <span className="text-sm text-muted-foreground">• {user?.email}</span>
                </div>
              </div>

              {/* الإحصائيات السريعة */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{orders.length}</div>
                    <p className="text-xs text-muted-foreground">+2 هذا الشهر</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">العنوان الافتراضي</CardTitle>
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm truncate">
                      {addresses.find(addr => addr.isDefault)?.address || "لم تقم بإضافة عنوان"}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">لشحن الطلبات</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">العناصر المفضلة</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{wishlist.length}</div>
                    <p className="text-xs text-muted-foreground">المنتجات المحفوظة</p>
                  </CardContent>
                </Card>
              </div>

              {/* معلومات المستخدم الخاصة */}
              {user?.role === "engineer" && (
                <Card className="border-accent">
                  <CardHeader>
                    <CardTitle className="text-accent">معلومات المهندس</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">الترخيص</p>
                        <p className="font-medium">{user?.license || "ENG-2024-001"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">الخبرة</p>
                        <p className="font-medium">{user?.experience || 8} سنوات</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">التقييم</p>
                        <p className="font-medium">{user?.rating || 4.8} ⭐</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">المشاريع المكتملة</p>
                        <p className="font-medium">{user?.completedProjects || 89}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {user?.role === "store" && (
                <Card className="border-accent">
                  <CardHeader>
                    <CardTitle className="text-accent">معلومات المتجر</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">السجل التجاري</p>
                        <p className="font-medium">{user?.commercialRegister || "COM-2023-001"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">إجمالي المبيعات</p>
                        <p className="font-medium">{formatCurrency(user?.totalSales || 850000)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">المنتجات النشطة</p>
                        <p className="font-medium">{user?.activeProducts || 45}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">التقييم</p>
                        <p className="font-medium">{user?.rating || 4.6} ⭐</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* الطلبات الأخيرة */}
              <Card>
                <CardHeader>
                  <CardTitle>طلباتي الأخيرة</CardTitle>
                  <CardDescription>آخر 5 طلبات قمت بها</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم الطلب</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>العناصر</TableHead>
                        <TableHead>الإجمالي</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 5).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>{formatCurrency(order.total)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="ml-2 h-4 w-4" />
                              تفاصيل
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* المنتجات المفضلة */}
              <Card>
                <CardHeader>
                  <CardTitle>منتجاتي المفضلة</CardTitle>
                  <CardDescription>المنتجات التي حفظتها مؤخراً</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {wishlist.slice(0, 3).map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <p className="font-bold mt-1">{formatCurrency(item.price)}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* طلباتي */}
            <TabsContent value="orders" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">طلباتي</h2>
                  <p className="text-muted-foreground">عرض وتتبع جميع طلباتك</p>
                </div>
                <Button onClick={() => setLocation("/")}>
                  <ShoppingCart className="ml-2 h-4 w-4" />
                  تسوق الآن
                </Button>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم الطلب</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>العناصر</TableHead>
                        <TableHead>الإجمالي</TableHead>
                        <TableHead>حالة الطلب</TableHead>
                        <TableHead>حالة الدفع</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>{formatCurrency(order.total)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            {order.status === "معلق" ? (
                              <Badge className="bg-yellow-500">بانتظار الدفع</Badge>
                            ) : (
                              <Badge className="bg-green-500">مدفوع</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="ml-2 h-4 w-4" />
                                تفاصيل
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* المفضلة */}
            <TabsContent value="wishlist" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">منتجاتي المفضلة</h2>
                <p className="text-muted-foreground">المنتجات التي حفظتها للشراء لاحقاً</p>
              </div>

              {wishlist.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">لا توجد منتجات في المفضلة</h3>
                    <p className="text-muted-foreground mb-6">ابدأ بإضافة منتجات إلى قائمة المفضلة</p>
                    <Button onClick={() => setLocation("/")}>
                      <ShoppingCart className="ml-2 h-4 w-4" />
                      تصفح المنتجات
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col h-full">
                          <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                            <Package className="h-12 w-12 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{item.category}</p>
                            <p className="font-bold text-xl mb-4">{formatCurrency(item.price)}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1" onClick={() => setLocation(`/product/${item.id}`)}>
                              <Eye className="ml-2 h-4 w-4" />
                              عرض التفاصيل
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => {
                              setWishlist(wishlist.filter(w => w.id !== item.id));
                            }}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* العناوين */}
            <TabsContent value="addresses" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">عناويني</h2>
                  <p className="text-muted-foreground">إدارة عناوين الشحن الخاصة بك</p>
                </div>
                <Button>
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة عنوان جديد
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                  <Card key={address.id} className={address.isDefault ? "border-accent border-2" : ""}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{address.name}</h3>
                          {address.isDefault && (
                            <Badge className="bg-accent mt-1">العنوان الافتراضي</Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{address.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{address.phone}</span>
                        </div>
                      </div>
                      {!address.isDefault && (
                        <Button className="w-full mt-4" variant="outline">
                          تعيين كافتراضي
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* الملف الشخصي */}
            <TabsContent value="profile" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">الملف الشخصي</h2>
                <p className="text-muted-foreground">إدارة معلومات حسابك الشخصية</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>معلومات الحساب</CardTitle>
                  <CardDescription>تعديل المعلومات الشخصية والاتصال</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-4xl">
                      {user?.avatar || "👤"}
                    </div>
                    <div>
                      <Button variant="outline">تغيير الصورة</Button>
                      <p className="text-sm text-muted-foreground mt-2">JPG, PNG أو GIF بحد أقصى 5MB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>الاسم الكامل</Label>
                      <Input defaultValue={user?.name || ""} />
                    </div>
                    <div>
                      <Label>البريد الإلكتروني</Label>
                      <Input type="email" defaultValue={user?.email || ""} />
                    </div>
                    <div>
                      <Label>رقم الهاتف</Label>
                      <Input defaultValue={user?.phone || "0501234567"} />
                    </div>
                    <div>
                      <Label>المحافظة</Label>
                      <Input defaultValue={user?.governorate || ""} />
                    </div>
                  </div>

                  <div>
                    <Label>العنوان التفصيلي</Label>
                    <Input defaultValue={user?.address || ""} />
                  </div>

                  {user?.role === "engineer" && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-bold mb-4">معلومات المهندس</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label>رقم الترخيص</Label>
                            <Input defaultValue={user?.license || "ENG-2024-001"} />
                          </div>
                          <div>
                            <Label>سنوات الخبرة</Label>
                            <Input type="number" defaultValue={user?.experience || 8} />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {user?.role === "store" && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-bold mb-4">معلومات المتجر</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label>السجل التجاري</Label>
                            <Input defaultValue={user?.commercialRegister || "COM-2023-001"} />
                          </div>
                          <div>
                            <Label>الرقم الضريبي</Label>
                            <Input defaultValue={user?.taxNumber || "TAX-2023-001"} />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div>
                    <h3 className="font-bold mb-4">تغيير كلمة المرور</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>كلمة المرور الحالية</Label>
                        <Input type="password" />
                      </div>
                      <div>
                        <Label>كلمة المرور الجديدة</Label>
                        <Input type="password" />
                      </div>
                      <div>
                        <Label>تأكيد كلمة المرور الجديدة</Label>
                        <Input type="password" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline">إلغاء</Button>
                    <Button>حفظ التغييرات</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}