"use client";

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Upload,
  Download,
  FileText,
  Package,
  DollarSign,
  Percent,
  BarChart,
  Users,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  Trash2,
  Send,
  Filter,
  Search,
  Home,
  Settings,
  LogOut,
  User,
  Bell,
  HelpCircle,
  UploadCloud,
  Shield,
  Battery,
  Sun,
  Zap,
  Wrench,
  Cpu,
  Car,
  BookOpen,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronLeft,
  Copy,
  Printer,
  Share2,
  Star,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  FileUp,
  FileDown,
  Check,
  X,
  AlertTriangle,
  Info,
  Lock,
  Unlock,
  Edit,
  MoreVertical,
  ExternalLink,
  DownloadCloud,
  Heart,
  ThumbsUp,
  Award,
  Target,
  PieChart,
  LineChart,
  Activity,
  CreditCard,
  Banknote,
  Wallet,
  Receipt,
  FileCheck,
  FileX,
  PackageCheck,
  Truck,
  Headphones,
  FileSpreadsheet,
  FileBarChart,
  CalendarDays,
  Building,
  Globe,
  Send as SendIcon,
  AlertCircle,
  Camera,
  Image,
  Video,
  Music,
  Folder,
  File,
  Archive,
  Inbox,
  Outbox,
  MailOpen,
  Volume2,
  VolumeX,
  Mic,
  Video as VideoIcon,
  PhoneCall,
  Voicemail,
  Circle,
  CircleCheck,
  CircleX,
  CircleHelp,
  CircleAlert,
  CircleUser,
  CircleArrowUp,
  CircleArrowDown,
  CircleChevronUp,
  CircleChevronDown,
  CircleChevronLeft,
  CircleChevronRight,
  CirclePlay,
  CircleStop,
  CirclePower,
  CircleSlash,
  CirclePlus,
  Crown,
  Trophy,
  Medal,
  Gift,
  Handshake,
  Key,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Cog,
  PaintBucket,
  Palette,
  Brush,
  Eraser,
  Scissors,
  PenTool,
  Highlighter,
  Type,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  ListChecks,
  Grid,
  Layout,
  LayoutGrid,
  LayoutList,
  LayoutDashboard,
  Sidebar,
  Box,
  Package2,
  PackageOpen,
  Cube,
  Square,
  RectangleHorizontal,
  RectangleVertical,
  Triangle,
  Ellipsis,
  PlusCircle,
  MinusCircle,
  Ban,
  Reply,
  Forward,
  AtSign,
  Hash,
  Asterisk,
  Braces,
  Brackets,
  Parentheses,
  Calculator,
  ChartBar,
  ChartLine,
  ChartArea,
  ChartPie,
  ChartTrendingUp,
  ChartTrendingDown
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


// أنواع بيانات الوكيل
interface AgentProduct {
  id: string;
  productId: string;
  productName: string;
  productType: string;
  productSKU: string;
  agentPrice: number;
  retailPrice: number;
  wholesalePrice: number;
  minimumOrder: number;
  stock: number;
  commissionRate: number;
  status: 'pending' | 'approved' | 'rejected' | 'draft' | 'archived';
  warranty: string;
  certificate: string;
  specifications: Record<string, any>;
  features: string[];
  uploadedPdf?: {
    url: string;
    uploadedAt: string;
    filename: string;
    size: number;
    pages: number;
  };
  images: string[];
  videos: string[];
  notes: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  reviewedBy: string;
  reviewedAt: string;
  rejectionReason: string;
  category: string;
  brand: string;
  model: string;
  dimensions: string;
  weight: string;
  color: string;
  material: string;
  origin: string;
}

interface AgentSale {
  id: string;
  orderId: string;
  invoiceNumber: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  commissionAmount: number;
  commissionRate: number;
  saleDate: string;
  deliveryDate: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  paymentStatus: 'pending' | 'partial' | 'paid' | 'overdue' | 'refunded';
  paymentMethod: 'cash' | 'bank_transfer' | 'credit_card' | 'check' | 'online';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  shippingAddress: string;
  trackingNumber: string;
  notes: string;
  attachments: string[];
}

interface AgentCommission {
  id: string;
  month: string;
  totalSales: number;
  totalCommission: number;
  paidCommission: number;
  pendingCommission: number;
  status: 'pending' | 'processing' | 'paid';
  paymentDate: string;
  paymentMethod: string;
}

interface AgentRequest {
  id: string;
  type: 'product_upload' | 'price_change' | 'commission_change' | 'support' | 'refund' | 'other';
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  response: string;
  attachments: string[];
}

interface AgentMessage {
  id: string;
  from: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  important: boolean;
}

interface AgentStat {
  label: string;
  value: number;
  change: number;
  icon: any;
  color: string;
}

const PRODUCT_TYPES = [
  "ألواح شمسية",
  "محولات",
  "بطاريات",
  "أنظمة تخزين",
  "ملحقات",
  "منظومات",
  "محطات شحن كهربائي",
  "محولات شمسية",
  "بطاريات السيارات",
  "خدمات تركيب",
  "خدمات صيانة",
  "خدمات ضمان",
  "حلول",
  "تدريب",
  "أجهزة مراقبة",
  "كابلات",
  "أنظمة تتبع",
  "معدات أمان"
];

const WARRANTY_OPTIONS = [
  "لا يوجد",
  "6 أشهر",
  "1 سنة",
  "2 سنوات",
  "3 سنوات",
  "5 سنوات",
  "10 سنوات",
  "15 سنة",
  "20 سنة",
  "25 سنة",
  "مدى الحياة"
];

const CERTIFICATE_OPTIONS = [
  "غير محدد",
  "ISO 9001",
  "ISO 14001",
  "ISO 45001",
  "TUV",
  "IEC",
  "UL",
  "CE",
  "RoHS",
  "FCC",
  "CCC",
  "ETL",
  "CSA",
  "SGS",
  "BV"
];

export default function AgentDashboardPage() {
  const [location, setLocation] = useLocation();
  const [agent, setAgent] = useState<any>(null);
  const [products, setProducts] = useState<AgentProduct[]>([]);
  const [sales, setSales] = useState<AgentSale[]>([]);
  const [commissions, setCommissions] = useState<AgentCommission[]>([]);
  const [requests, setRequests] = useState<AgentRequest[]>([]);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadForm, setUploadForm] = useState({
    productName: "",
    productType: "",
    agentPrice: "",
    retailPrice: "",
    wholesalePrice: "",
    minimumOrder: "1",
    stock: "0",
    commissionRate: "",
    warranty: "",
    certificate: "",
    category: "",
    brand: "",
    model: "",
    dimensions: "",
    weight: "",
    color: "",
    material: "",
    origin: "",
    notes: "",
    features: [""],
    tags: [""]
  });
  const [stats, setStats] = useState({
    totalProducts: 0,
    approvedProducts: 0,
    pendingProducts: 0,
    totalSales: 0,
    thisMonthSales: 0,
    totalCommission: 0,
    pendingCommission: 0,
    paidCommission: 0,
    totalOrders: 0,
    activeOrders: 0
  });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // تحميل بيانات الوكيل عند التحميل
  useEffect(() => {
    loadAgentData();
  }, []);

  const loadAgentData = () => {
    // محاكاة بيانات الوكيل من localStorage
    const agentData = localStorage.getItem("agent_user") || localStorage.getItem("current_agent");
    const storedProducts = localStorage.getItem(`agent_products_${agent?.id || 'default'}`);
    const storedSales = localStorage.getItem(`agent_sales_${agent?.id || 'default'}`);
    
    if (agentData) {
      const agentObj = JSON.parse(agentData);
      setAgent(agentObj);
      
      // تحميل المنتجات
      if (storedProducts) {
        const productsData = JSON.parse(storedProducts);
        setProducts(productsData);
        
        // حساب إحصائيات المنتجات
        const approvedProducts = productsData.filter((p: AgentProduct) => p.status === 'approved').length;
        const pendingProducts = productsData.filter((p: AgentProduct) => p.status === 'pending').length;
        
        setStats(prev => ({
          ...prev,
          totalProducts: productsData.length,
          approvedProducts,
          pendingProducts
        }));
      }

      // تحميل المبيعات
      if (storedSales) {
        const salesData = JSON.parse(storedSales);
        setSales(salesData);
        
        // حساب إحصائيات المبيعات
        const totalSales = salesData.reduce((sum: number, sale: AgentSale) => sum + sale.totalAmount, 0);
        const totalCommission = salesData.reduce((sum: number, sale: AgentSale) => sum + sale.commissionAmount, 0);
        const pendingCommission = salesData
          .filter((sale: AgentSale) => sale.paymentStatus === 'pending' || sale.paymentStatus === 'partial')
          .reduce((sum: number, sale: AgentSale) => sum + sale.commissionAmount, 0);
        
        // مبيعات هذا الشهر
        const thisMonth = new Date().getMonth();
        const thisMonthSales = salesData
          .filter((sale: AgentSale) => new Date(sale.saleDate).getMonth() === thisMonth)
          .reduce((sum: number, sale: AgentSale) => sum + sale.totalAmount, 0);
        
        // عدد الطلبات النشطة
        const activeOrders = salesData.filter((sale: AgentSale) => 
          ['pending', 'confirmed', 'processing', 'shipped'].includes(sale.status)
        ).length;
        
        setStats(prev => ({
          ...prev,
          totalSales,
          thisMonthSales,
          totalCommission,
          pendingCommission,
          totalOrders: salesData.length,
          activeOrders
        }));
      }

      // بيانات تجريبية للعمولات
      const mockCommissions: AgentCommission[] = [
        {
          id: "1",
          month: "يناير 2024",
          totalSales: 50000,
          totalCommission: 7500,
          paidCommission: 7500,
          pendingCommission: 0,
          status: 'paid',
          paymentDate: "2024-02-05",
          paymentMethod: 'bank_transfer'
        },
        {
          id: "2",
          month: "فبراير 2024",
          totalSales: 75000,
          totalCommission: 11250,
          paidCommission: 0,
          pendingCommission: 11250,
          status: 'pending',
          paymentDate: "",
          paymentMethod: ''
        }
      ];
      setCommissions(mockCommissions);

      // بيانات تجريبية للطلبات
      const mockRequests: AgentRequest[] = [
        {
          id: "1",
          type: 'product_upload',
          title: "طلب إضافة منتج جديد",
          description: "أود إضافة منظومة شمسية 5 كيلووات",
          status: 'completed',
          priority: 'medium',
          createdAt: "2024-01-15",
          updatedAt: "2024-01-16",
          assignedTo: "مدير المنتجات",
          response: "تمت الموافقة على المنتج بنجاح",
          attachments: []
        },
        {
          id: "2",
          type: 'price_change',
          title: "طلب تعديل سعر المنتج",
          description: "أود تعديل سعر لوح الشمسي 400 واط",
          status: 'in_progress',
          priority: 'low',
          createdAt: "2024-02-01",
          updatedAt: "2024-02-01",
          assignedTo: "مدير التسعير",
          response: "قيد المراجعة",
          attachments: []
        }
      ];
      setRequests(mockRequests);

      // بيانات تجريبية للرسائل
      const mockMessages: AgentMessage[] = [
        {
          id: "1",
          from: "الإدارة",
          subject: "موافقة على المنتج",
          message: "تمت الموافقة على منتجك الجديد بنجاح",
          date: "2024-01-16",
          read: true,
          important: true
        },
        {
          id: "2",
          from: "الدعم الفني",
          subject: "تحديث النظام",
          message: "سيتم إجراء تحديث للنظام يوم الخميس القادم",
          date: "2024-02-01",
          read: false,
          important: false
        }
      ];
      setMessages(mockMessages);
      setUnreadNotifications(mockMessages.filter(m => !m.read).length);

      // إشعارات
      const mockNotifications = [
        { id: 1, title: "منتج جديد مرفوع", message: "تم رفع المنتج بنجاح", time: "منذ 5 دقائق", unread: true },
        { id: 2, title: "طلب جديد", message: "تم استلام طلب جديد من عميل", time: "منذ ساعة", unread: true },
        { id: 3, title: "عمولة مستحقة", message: "لديك عمولة مستحقة بقيمة $1,250", time: "منذ يومين", unread: false }
      ];
      setNotifications(mockNotifications);
      setUnreadNotifications(mockNotifications.filter(n => n.unread).length);
    } else {
      // إذا لم توجد بيانات، توجيه إلى صفحة تسجيل الدخول
      setLocation("/login");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        toast.success(`تم اختيار ملف: ${file.name}`);
      } else {
        toast.error("يرجى اختيار ملف PDF فقط");
      }
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) {
      toast.error("يرجى اختيار ملف PDF");
      return;
    }

    if (!uploadForm.productName || !uploadForm.productType || !uploadForm.retailPrice) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    try {
      // محاكاة رفع الملف
      const pdfUrl = URL.createObjectURL(selectedFile);
      
      const newProduct: AgentProduct = {
        id: Date.now().toString(),
        productId: `PROD-${Date.now().toString().slice(-6)}`,
        productName: uploadForm.productName,
        productType: uploadForm.productType,
        productSKU: `SKU-${Date.now().toString().slice(-8)}`,
        agentPrice: parseFloat(uploadForm.agentPrice) || 0,
        retailPrice: parseFloat(uploadForm.retailPrice) || 0,
        wholesalePrice: parseFloat(uploadForm.wholesalePrice) || 0,
        minimumOrder: parseInt(uploadForm.minimumOrder) || 1,
        stock: parseInt(uploadForm.stock) || 0,
        commissionRate: parseFloat(uploadForm.commissionRate) || (agent?.commissionRate || 10),
        status: 'pending',
        warranty: uploadForm.warranty,
        certificate: uploadForm.certificate,
        category: uploadForm.category,
        brand: uploadForm.brand,
        model: uploadForm.model,
        dimensions: uploadForm.dimensions,
        weight: uploadForm.weight,
        color: uploadForm.color,
        material: uploadForm.material,
        origin: uploadForm.origin,
        specifications: {},
        features: uploadForm.features.filter(f => f.trim() !== ""),
        uploadedPdf: {
          url: pdfUrl,
          uploadedAt: new Date().toISOString(),
          filename: selectedFile.name,
          size: selectedFile.size,
          pages: 1
        },
        images: [],
        videos: [],
        notes: uploadForm.notes,
        tags: uploadForm.tags.filter(t => t.trim() !== ""),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reviewedBy: "",
        reviewedAt: "",
        rejectionReason: ""
      };

      const updatedProducts = [newProduct, ...products];
      setProducts(updatedProducts);
      
      // حفظ في localStorage
      localStorage.setItem(`agent_products_${agent.id}`, JSON.stringify(updatedProducts));

      // تحديث الإحصائيات
      setStats(prev => ({
        ...prev,
        totalProducts: prev.totalProducts + 1,
        pendingProducts: prev.pendingProducts + 1
      }));

      // إضافة إشعار
      const newNotification = {
        id: notifications.length + 1,
        title: "منتج جديد مرفوع",
        message: `تم رفع المنتج "${uploadForm.productName}" بنجاح وهو قيد المراجعة`,
        time: "الآن",
        unread: true
      };
      setNotifications([newNotification, ...notifications]);
      setUnreadNotifications(prev => prev + 1);

      // إعادة تعيين النموذج
      setUploadForm({
        productName: "",
        productType: "",
        agentPrice: "",
        retailPrice: "",
        wholesalePrice: "",
        minimumOrder: "1",
        stock: "0",
        commissionRate: "",
        warranty: "",
        certificate: "",
        category: "",
        brand: "",
        model: "",
        dimensions: "",
        weight: "",
        color: "",
        material: "",
        origin: "",
        notes: "",
        features: [""],
        tags: [""]
      });
      setSelectedFile(null);
      setIsUploadDialogOpen(false);

      toast.success("تم رفع المنتج بنجاح وهو قيد المراجعة");
    } catch (error) {
      toast.error("حدث خطأ أثناء رفع الملف");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("agent_user");
    localStorage.removeItem("current_agent");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    setLocation("/login");
    toast.success("تم تسجيل الخروج بنجاح");
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, unread: false } : notif
    ));
    setUnreadNotifications(prev => Math.max(0, prev - 1));
  };

  const addFeature = () => {
    setUploadForm(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const removeFeature = (index: number) => {
    setUploadForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...uploadForm.features];
    newFeatures[index] = value;
    setUploadForm(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addTag = () => {
    setUploadForm(prev => ({
      ...prev,
      tags: [...prev.tags, ""]
    }));
  };

  const removeTag = (index: number) => {
    setUploadForm(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const updateTag = (index: number, value: string) => {
    const newTags = [...uploadForm.tags];
    newTags[index] = value;
    setUploadForm(prev => ({
      ...prev,
      tags: newTags
    }));
  };

  const getProductStats = (): AgentStat[] => [
    {
      label: "إجمالي المنتجات",
      value: stats.totalProducts,
      change: 12,
      icon: Package,
      color: "text-blue-600"
    },
    {
      label: "المبيعات الشهرية",
      value: stats.thisMonthSales,
      change: 25,
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      label: "إجمالي العمولات",
      value: stats.totalCommission,
      change: 18,
      icon: Percent,
      color: "text-purple-600"
    },
    {
      label: "المستحقات",
      value: stats.pendingCommission,
      change: -5,
      icon: Clock,
      color: "text-amber-600"
    }
  ];

  const getProductIcon = (type: string) => {
    switch (type) {
      case 'ألواح شمسية': return <Sun className="w-5 h-5" />;
      case 'محولات': return <Zap className="w-5 h-5" />;
      case 'بطاريات': return <Battery className="w-5 h-5" />;
      case 'أنظمة تخزين': return <Cpu className="w-5 h-5" />;
      case 'محطات شحن كهربائي': return <Car className="w-5 h-5" />;
      case 'خدمات تركيب': case 'خدمات صيانة': case 'خدمات ضمان': return <Wrench className="w-5 h-5" />;
      case 'تدريب': return <BookOpen className="w-5 h-5" />;
      case 'حلول': return <Cog className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">جاري تحميل بيانات الوكيل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* شريط التنقل العلوي */}
      <nav className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/agent/dashboard" className="flex items-center gap-2">
                <Sun className="w-8 h-8 text-primary" />
                <span className="font-bold text-xl hidden md:inline">لوحة تحكم الوكيل</span>
                <span className="font-bold text-xl md:hidden">الوكيل</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-4 mr-8">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={activeTab === "dashboard" ? "bg-primary/10" : ""}
                  onClick={() => setActiveTab("dashboard")}
                >
                  <LayoutDashboard className="w-4 h-4 ml-2" />
                  الرئيسية
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={activeTab === "products" ? "bg-primary/10" : ""}
                  onClick={() => setActiveTab("products")}
                >
                  <Package className="w-4 h-4 ml-2" />
                  المنتجات
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={activeTab === "sales" ? "bg-primary/10" : ""}
                  onClick={() => setActiveTab("sales")}
                >
                  <ShoppingCart className="w-4 h-4 ml-2" />
                  المبيعات
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={activeTab === "commissions" ? "bg-primary/10" : ""}
                  onClick={() => setActiveTab("commissions")}
                >
                  <DollarSign className="w-4 h-4 ml-2" />
                  العمولات
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsUploadDialogOpen(true)}
                      className="gap-2"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span className="hidden md:inline">رفع منتج جديد</span>
                      <span className="md:hidden">جديد</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>رفع منتج جديد مع ملف PDF</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {/* الإشعارات */}
              <div className="relative">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="relative"
                        onClick={() => setUnreadNotifications(0)}
                      >
                        <Bell className="w-5 h-5" />
                        {unreadNotifications > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {unreadNotifications}
                          </span>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>الإشعارات ({unreadNotifications})</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* حساب الوكيل */}
              <div className="flex items-center gap-3">
                <div className="hidden md:block text-right">
                  <p className="font-medium text-sm">{agent.name}</p>
                  <p className="text-xs text-muted-foreground">{agent.code}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={agent.name} />
                        <AvatarFallback className="bg-primary/10">
                          {agent.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{agent.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {agent.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setActiveTab("profile")}>
                      <User className="w-4 h-4 ml-2" />
                      الملف الشخصي
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                      <Settings className="w-4 h-4 ml-2" />
                      الإعدادات
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("messages")}>
                      <Mail className="w-4 h-4 ml-2" />
                      الرسائل ({messages.filter(m => !m.read).length})
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 ml-2" />
                      تسجيل الخروج
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* شريط التنقل الجانبي للجوال */}
        <div className="md:hidden mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">
                <LayoutDashboard className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="products">
                <Package className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="sales">
                <ShoppingCart className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="commissions">
                <DollarSign className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* تبويب الرئيسية */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* ترحيب */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">مرحباً بك، {agent.name}! 👋</h1>
                  <p className="mt-2 opacity-90">
                    هذا ملخص لأدائك وإحصائياتك في النظام
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {agent.code}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      نسبة العمولة: {agent.commissionRate}%
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button 
                    variant="outline" 
                    className="bg-white text-primary hover:bg-white/90 gap-2"
                    onClick={() => setIsUploadDialogOpen(true)}
                  >
                    <UploadCloud className="w-4 h-4" />
                    رفع منتج جديد
                  </Button>
                </div>
              </div>
            </div>

            {/* الإحصائيات السريعة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getProductStats().map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.label}
                    </CardTitle>
                    <div className={`p-2 rounded-full ${stat.color.replace('text', 'bg')}/10`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stat.label.includes('عمولة') || stat.label.includes('مبيعات') || stat.label.includes('مستحقات') 
                        ? formatCurrency(stat.value)
                        : stat.value.toLocaleString('ar-SA')}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.change > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm ${stat.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change > 0 ? '+' : ''}{stat.change}%
                      </span>
                      <span className="text-xs text-muted-foreground">من الشهر الماضي</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* المنتجات الحديثة */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>آخر المنتجات المضافة</CardTitle>
                  <CardDescription>
                    المنتجات التي قمت برفعها مؤخراً
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 5).map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            {getProductIcon(product.productType)}
                          </div>
                          <div>
                            <div className="font-medium">{product.productName}</div>
                            <div className="text-sm text-muted-foreground">
                              {product.productType}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={
                            product.status === 'approved' ? 'default' :
                            product.status === 'rejected' ? 'destructive' : 'outline'
                          }>
                            {product.status === 'approved' ? 'معتمد' :
                             product.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                          </Badge>
                          <div className="text-right">
                            <div className="font-bold">${product.retailPrice}</div>
                            <div className="text-xs text-muted-foreground">
                              عمولة: {product.commissionRate}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {products.length === 0 && (
                      <div className="text-center py-8">
                        <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">لا توجد منتجات مضافة</p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setIsUploadDialogOpen(true)}
                        >
                          <Plus className="w-4 h-4 ml-2" />
                          إضافة منتج جديد
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setActiveTab("products")}
                  >
                    عرض جميع المنتجات ({products.length})
                    <ChevronLeft className="w-4 h-4 mr-2" />
                  </Button>
                </CardFooter>
              </Card>

              {/* المبيعات الأخيرة */}
              <Card>
                <CardHeader>
                  <CardTitle>آخر المبيعات</CardTitle>
                  <CardDescription>
                    آخر العمليات البيعية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sales.slice(0, 4).map((sale) => (
                      <div key={sale.id} className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{sale.customerName}</div>
                            <div className="text-sm text-muted-foreground">
                              {sale.productName}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">${sale.totalAmount}</div>
                            <Badge variant="outline" className="text-xs">
                              {sale.status === 'delivered' ? 'تم التسليم' : 'قيد المعالجة'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {new Date(sale.saleDate).toLocaleDateString('ar-SA')}
                          </span>
                          <span className="font-medium text-green-600">
                            عمولة: ${sale.commissionAmount}
                          </span>
                        </div>
                        <Separator />
                      </div>
                    ))}
                    
                    {sales.length === 0 && (
                      <div className="text-center py-8">
                        <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">لا توجد مبيعات</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* الإشعارات والطلبات */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>الإشعارات المهمة</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-3 rounded-lg border ${notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-secondary/50'}`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="font-medium">{notification.title}</div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <div className="text-xs text-muted-foreground mt-2">
                            {notification.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>طلباتي الأخيرة</CardTitle>
                  <CardDescription>
                    طلباتي المقدمة للإدارة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{request.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {request.description}
                            </div>
                          </div>
                          <Badge variant={
                            request.status === 'completed' ? 'default' :
                            request.status === 'rejected' ? 'destructive' : 'outline'
                          }>
                            {request.status === 'completed' ? 'مكتمل' :
                             request.status === 'rejected' ? 'مرفوض' :
                             request.status === 'in_progress' ? 'قيد المعالجة' : 'قيد الانتظار'}
                          </Badge>
                        </div>
                        {request.response && (
                          <div className="mt-3 p-3 bg-secondary/50 rounded">
                            <div className="text-sm font-medium">رد الإدارة:</div>
                            <div className="text-sm mt-1">{request.response}</div>
                          </div>
                        )}
                        <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
                          <span>{new Date(request.createdAt).toLocaleDateString('ar-SA')}</span>
                          <span>{request.assignedTo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* تبويب المنتجات */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">منتجاتي</h2>
                <p className="text-muted-foreground">
                  إدارة جميع المنتجات التي قمت برفعها
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 ml-2" />
                  تصفية
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير
                </Button>
                <Button onClick={() => setIsUploadDialogOpen(true)} className="gap-2">
                  <UploadCloud className="w-4 h-4" />
                  رفع منتج جديد
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                {products.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>المنتج</TableHead>
                          <TableHead>النوع</TableHead>
                          <TableHead>الأسعار</TableHead>
                          <TableHead>الحالة</TableHead>
                          <TableHead>ملف PDF</TableHead>
                          <TableHead>التاريخ</TableHead>
                          <TableHead>الإجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="font-medium">{product.productName}</div>
                              <div className="text-sm text-muted-foreground">
                                SKU: {product.productSKU}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{product.productType}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="text-sm">بيع: <strong>${product.retailPrice}</strong></div>
                                <div className="text-sm">وكيل: <strong>${product.agentPrice}</strong></div>
                                <div className="text-xs text-muted-foreground">
                                  عمولة: {product.commissionRate}%
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  product.status === 'approved' ? 'default' :
                                  product.status === 'rejected' ? 'destructive' :
                                  product.status === 'pending' ? 'outline' : 'secondary'
                                }
                                className={
                                  product.status === 'approved' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                                  product.status === 'rejected' ? 'bg-red-100 text-red-800 hover:bg-red-100' : ''
                                }
                              >
                                {product.status === 'approved' ? 'معتمد' :
                                 product.status === 'rejected' ? 'مرفوض' :
                                 product.status === 'pending' ? 'قيد المراجعة' :
                                 product.status === 'draft' ? 'مسودة' : 'مؤرشف'}
                              </Badge>
                              {product.rejectionReason && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                                        <AlertCircle className="w-3 h-3 text-red-500" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>سبب الرفض: {product.rejectionReason}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </TableCell>
                            <TableCell>
                              {product.uploadedPdf ? (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.open(product.uploadedPdf?.url, '_blank')}
                                    className="gap-1"
                                  >
                                    <Eye className="w-3 h-3" />
                                    معاينة
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      const link = document.createElement('a');
                                      link.href = product.uploadedPdf?.url || '';
                                      link.download = product.uploadedPdf?.filename || 'product.pdf';
                                      link.click();
                                    }}
                                    className="gap-1"
                                  >
                                    <Download className="w-3 h-3" />
                                  </Button>
                                </div>
                              ) : (
                                <span className="text-muted-foreground text-sm">لا يوجد</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {new Date(product.createdAt).toLocaleDateString('ar-SA')}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="sm" variant="outline">
                                        <Edit className="w-3 h-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>تعديل المنتج</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => window.open(product.uploadedPdf?.url, '_blank')}
                                      >
                                        <Eye className="w-3 h-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>معاينة ملف PDF</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="sm" variant="destructive">
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>حذف المنتج</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">لا توجد منتجات</h3>
                    <p className="text-muted-foreground mb-6">
                      ابدأ برفع أول منتج لك لتظهر هنا
                    </p>
                    <Button 
                      onClick={() => setIsUploadDialogOpen(true)}
                      className="gap-2"
                    >
                      <UploadCloud className="w-4 h-4" />
                      رفع منتج جديد
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* إحصائيات المنتجات */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">حالة المنتجات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">معتمدة</span>
                        <span className="font-medium">{stats.approvedProducts}</span>
                      </div>
                      <Progress value={(stats.approvedProducts / stats.totalProducts) * 100} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">قيد المراجعة</span>
                        <span className="font-medium">{stats.pendingProducts}</span>
                      </div>
                      <Progress value={(stats.pendingProducts / stats.totalProducts) * 100} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">مرفوضة</span>
                        <span className="font-medium">
                          {products.filter(p => p.status === 'rejected').length}
                        </span>
                      </div>
                      <Progress value={
                        (products.filter(p => p.status === 'rejected').length / stats.totalProducts) * 100
                      } />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">أنواع المنتجات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {PRODUCT_TYPES.slice(0, 5).map((type) => {
                      const count = products.filter(p => p.productType === type).length;
                      if (count === 0) return null;
                      
                      return (
                        <div key={type} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getProductIcon(type)}
                            <span className="text-sm">{type}</span>
                          </div>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      );
                    })}
                    {products.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        لا توجد منتجات مضافة
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">نصائح سريعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-sm">تأكد من رفع ملف PDF واضح مع جميع المواصفات</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-sm">حدد الأسعار بدقة وفقاً للاتفاقية</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-sm">أضف معلومات الضمان والشهادة إن وجدت</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                      <p className="text-sm">المنتجات قيد المراجعة تستغرق 24-48 ساعة</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* تبويب المبيعات */}
        {activeTab === "sales" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">مبيعاتي</h2>
                <p className="text-muted-foreground">
                  تتبع جميع عمليات البيع والطلبات
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Calendar className="w-4 h-4 ml-2" />
                  تحديد فترة
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير تقرير
                </Button>
              </div>
            </div>

            {/* إحصائيات المبيعات */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(stats.totalSales)}</div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">+15%</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">عدد الطلبات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {stats.activeOrders} طلب نشط
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي العمولات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(stats.totalCommission)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    نسبة: {agent.commissionRate}%
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">المستحقات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">
                    {formatCurrency(stats.pendingCommission)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {formatCurrency(stats.paidCommission)} مدفوع
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>سجل المبيعات</CardTitle>
                <CardDescription>
                  جميع عمليات البيع المسجلة
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sales.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>رقم الطلب</TableHead>
                          <TableHead>العميل</TableHead>
                          <TableHead>المنتجات</TableHead>
                          <TableHead>المبلغ</TableHead>
                          <TableHead>العمولة</TableHead>
                          <TableHead>حالة الطلب</TableHead>
                          <TableHead>حالة الدفع</TableHead>
                          <TableHead>التاريخ</TableHead>
                          <TableHead>الإجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sales.map((sale) => (
                          <TableRow key={sale.id}>
                            <TableCell>
                              <Badge variant="outline" className="font-mono">
                                {sale.orderId}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{sale.customerName}</div>
                                <div className="text-sm text-muted-foreground">
                                  {sale.customerPhone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-xs">
                                {sale.productName} × {sale.quantity}
                              </div>
                            </TableCell>
                            <TableCell className="font-bold">
                              {formatCurrency(sale.totalAmount)}
                            </TableCell>
                            <TableCell>
                              <div className="text-green-600 font-bold">
                                {formatCurrency(sale.commissionAmount)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {sale.commissionRate}%
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  sale.status === 'delivered' ? 'default' :
                                  sale.status === 'cancelled' || sale.status === 'returned' ? 'destructive' : 'outline'
                                }
                              >
                                {sale.status === 'pending' ? 'قيد الانتظار' :
                                 sale.status === 'confirmed' ? 'تم التأكيد' :
                                 sale.status === 'processing' ? 'قيد المعالجة' :
                                 sale.status === 'shipped' ? 'تم الشحن' :
                                 sale.status === 'delivered' ? 'تم التسليم' :
                                 sale.status === 'cancelled' ? 'ملغي' : 'مرتجع'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  sale.paymentStatus === 'paid' ? 'default' :
                                  sale.paymentStatus === 'overdue' ? 'destructive' : 'outline'
                                }
                              >
                                {sale.paymentStatus === 'pending' ? 'قيد الانتظار' :
                                 sale.paymentStatus === 'partial' ? 'مدفوع جزئياً' :
                                 sale.paymentStatus === 'paid' ? 'مدفوع' :
                                 sale.paymentStatus === 'overdue' ? 'متأخر' : 'مردود'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(sale.saleDate).toLocaleDateString('ar-SA')}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="sm" variant="outline">
                                        <Eye className="w-3 h-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>عرض التفاصيل</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="sm" variant="outline">
                                        <Printer className="w-3 h-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>طباعة الفاتورة</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                      <ShoppingCart className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">لا توجد مبيعات</h3>
                    <p className="text-muted-foreground">
                      لم يتم تسجيل أي مبيعات حتى الآن
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* تحليل المبيعات */}
            <Card>
              <CardHeader>
                <CardTitle>تحليل المبيعات</CardTitle>
                <CardDescription>
                  أداء المبيعات خلال الفترة الماضية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border rounded-lg">
                  <div className="text-center">
                    <BarChart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">مخططات المبيعات متاحة في النسخة المتقدمة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* تبويب العمولات */}
        {activeTab === "commissions" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">العمولات</h2>
                <p className="text-muted-foreground">
                  تتبع جميع عمولاتك المستحقة والمدفوعة
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <FileText className="w-4 h-4 ml-2" />
                  كشف حساب
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير بيانات
                </Button>
              </div>
            </div>

            {/* ملخص العمولات */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>سجل العمولات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {commissions.map((commission) => (
                      <div key={commission.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-lg">{commission.month}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              إجمالي المبيعات: {formatCurrency(commission.totalSales)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              {formatCurrency(commission.totalCommission)}
                            </div>
                            <Badge 
                              variant={
                                commission.status === 'paid' ? 'default' :
                                commission.status === 'processing' ? 'outline' : 'destructive'
                              }
                              className="mt-2"
                            >
                              {commission.status === 'paid' ? 'مدفوع' :
                               commission.status === 'processing' ? 'قيد المعالجة' : 'قيد الانتظار'}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                          <div>
                            <div className="text-sm text-muted-foreground">المدفوع</div>
                            <div className="font-bold">{formatCurrency(commission.paidCommission)}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">المستحق</div>
                            <div className="font-bold text-amber-600">
                              {formatCurrency(commission.pendingCommission)}
                            </div>
                          </div>
                        </div>
                        
                        {commission.status === 'paid' && commission.paymentDate && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="text-sm">
                              <span className="text-muted-foreground">تاريخ الدفع: </span>
                              {new Date(commission.paymentDate).toLocaleDateString('ar-SA')}
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">طريقة الدفع: </span>
                              {commission.paymentMethod}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ملخص العمولات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>إجمالي العمولات</span>
                        <span className="font-bold text-green-600">
                          {formatCurrency(stats.totalCommission)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>المدفوع</span>
                        <span className="font-bold">
                          {formatCurrency(stats.paidCommission)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>المستحق</span>
                        <span className="font-bold text-amber-600">
                          {formatCurrency(stats.pendingCommission)}
                        </span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>نسبة العمولة</span>
                        <Badge variant="outline">{agent.commissionRate}%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>متوسط العمولة الشهري</span>
                        <span className="font-bold">
                          {formatCurrency(stats.totalCommission / Math.max(commissions.length, 1))}
                        </span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">معلومات الدفع</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">البنك:</span>
                          <span>{agent.bankInfo?.bankName || "غير محدد"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">رقم الحساب:</span>
                          <span>{agent.bankInfo?.accountNumber?.slice(-4) || "****"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">اسم الحساب:</span>
                          <span>{agent.bankInfo?.accountName || agent.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* طلب سحب عمولة */}
            <Card>
              <CardHeader>
                <CardTitle>طلب سحب عمولة</CardTitle>
                <CardDescription>
                  يمكنك طلب سحب العمولات المستحقة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-amber-800">رصيدك المستحق: {formatCurrency(stats.pendingCommission)}</div>
                        <p className="text-sm text-amber-700 mt-1">
                          يمكنك طلب سحب العمولات المستحقة التي تزيد عن 500 ريال
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {stats.pendingCommission >= 500 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="amount">المبلغ المطلوب</Label>
                          <Input 
                            id="amount" 
                            type="number" 
                            max={stats.pendingCommission}
                            defaultValue={stats.pendingCommission}
                          />
                        </div>
                        <div>
                          <Label htmlFor="paymentMethod">طريقة السحب المفضلة</Label>
                          <Select defaultValue="bank_transfer">
                            <SelectTrigger>
                              <SelectValue placeholder="اختر طريقة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
                              <SelectItem value="wallet">محفظة إلكترونية</SelectItem>
                              <SelectItem value="check">شيك</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="notes">ملاحظات (اختياري)</Label>
                          <Textarea 
                            id="notes" 
                            placeholder="أي ملاحظات إضافية..."
                            rows={3}
                          />
                        </div>
                        <Button className="w-full">
                          <Send className="w-4 h-4 ml-2" />
                          تقديم طلب السحب
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>المبلغ غير كافي</AlertTitle>
                      <AlertDescription>
                        يجب أن يكون المبلغ المستحق 500 ريال على الأقل لطلب السحب. رصيدك الحالي: {formatCurrency(stats.pendingCommission)}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* تبويب الملف الشخصي */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">الملف الشخصي</h2>
                <p className="text-muted-foreground">
                  إدارة معلومات حسابك الشخصية
                </p>
              </div>
              <Button>
                <Edit className="w-4 h-4 ml-2" />
                تعديل الملف
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>معلومات الوكيل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>اسم الوكيل</Label>
                        <Input value={agent.name} readOnly />
                      </div>
                      <div>
                        <Label>كود الوكيل</Label>
                        <Input value={agent.code} readOnly />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>البريد الإلكتروني</Label>
                        <Input value={agent.email} readOnly />
                      </div>
                      <div>
                        <Label>رقم الهاتف</Label>
                        <Input value={agent.phone} readOnly />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>نوع الوكيل</Label>
                        <Input value={agent.type === 'individual' ? 'فرد' : 'شركة'} readOnly />
                      </div>
                      <div>
                        <Label>نسبة العمولة</Label>
                        <Input value={`${agent.commissionRate}%`} readOnly />
                      </div>
                    </div>
                    
                    <div>
                      <Label>الشركة / المؤسسة</Label>
                      <Input value={agent.company} readOnly />
                    </div>
                    
                    <div>
                      <Label>العنوان</Label>
                      <Textarea value={agent.address} readOnly rows={3} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>المدينة</Label>
                        <Input value={agent.city} readOnly />
                      </div>
                      <div>
                        <Label>البلد</Label>
                        <Input value={agent.country} readOnly />
                      </div>
                      <div>
                        <Label>الرقم الضريبي</Label>
                        <Input value={agent.taxNumber || "غير محدد"} readOnly />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>معلومات الدفع</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>اسم البنك</Label>
                      <Input value={agent.bankInfo?.bankName || "غير محدد"} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>اسم صاحب الحساب</Label>
                      <Input value={agent.bankInfo?.accountName || agent.name} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>رقم الحساب</Label>
                      <Input value={agent.bankInfo?.accountNumber || "غير محدد"} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>رقم IBAN</Label>
                      <Input value={agent.bankInfo?.iban || "غير محدد"} readOnly />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">معلومات الاتصال</h4>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* المستندات */}
            <Card>
              <CardHeader>
                <CardTitle>المستندات المرفوعة</CardTitle>
                <CardDescription>
                  المستندات الرسمية الخاصة بالوكيل
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {agent.documents?.map((doc: any) => (
                    <div key={doc.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {doc.type === 'contract' ? 'عقد' :
                               doc.type === 'commercial_license' ? 'سجل تجاري' :
                               doc.type === 'tax_certificate' ? 'شهادة ضريبية' : 'مستند'}
                            </div>
                          </div>
                        </div>
                        <Badge variant={doc.verified ? "default" : "secondary"}>
                          {doc.verified ? "تم التحقق" : "قيد المراجعة"}
                        </Badge>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Eye className="w-3 h-3" />
                          معاينة
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Download className="w-3 h-3" />
                          تحميل
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {(!agent.documents || agent.documents.length === 0) && (
                    <div className="col-span-full text-center py-8">
                      <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">لا توجد مستندات مرفوعة</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* تبويب الإعدادات */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">الإعدادات</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الحساب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>الإشعارات البريدية</Label>
                      <p className="text-sm text-muted-foreground">
                        تلقي إشعارات على البريد الإلكتروني
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>إشعارات الطلبات الجديدة</Label>
                      <p className="text-sm text-muted-foreground">
                        إشعارات فورية عند استلام طلبات جديدة
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>إشعارات العمولات</Label>
                      <p className="text-sm text-muted-foreground">
                        إشعارات عند استحقاق عمولات جديدة
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">تغيير كلمة المرور</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                  </div>
                  <Button>تغيير كلمة المرور</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* تبويب الرسائل */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">الرسائل</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>صندوق الوارد</CardTitle>
                  <CardDescription>
                    رسائل التواصل مع الإدارة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 ${!message.read ? 'bg-blue-50 border-blue-200' : ''}`}
                        onClick={() => {
                          // Mark as read
                          const newMessages = messages.map(m => 
                            m.id === message.id ? { ...m, read: true } : m
                          );
                          setMessages(newMessages);
                          setUnreadNotifications(prev => Math.max(0, prev - 1));
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{message.subject}</div>
                            <div className="text-sm text-muted-foreground">
                              من: {message.from}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {message.important && (
                              <Badge variant="destructive">مهم</Badge>
                            )}
                            <span className="text-sm text-muted-foreground">
                              {new Date(message.date).toLocaleDateString('ar-SA')}
                            </span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm line-clamp-2">{message.message}</p>
                        {!message.read && (
                          <div className="mt-2">
                            <Badge variant="outline" className="text-xs">
                              غير مقروء
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>إرسال رسالة جديدة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="subject">الموضوع</Label>
                      <Input id="subject" placeholder="موضوع الرسالة" />
                    </div>
                    <div>
                      <Label htmlFor="type">نوع الرسالة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر النوع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="support">دعم فني</SelectItem>
                          <SelectItem value="product">استفسار منتج</SelectItem>
                          <SelectItem value="commission">استفسار عمولة</SelectItem>
                          <SelectItem value="other">أخرى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="message">الرسالة</Label>
                      <Textarea 
                        id="message" 
                        placeholder="اكتب رسالتك هنا..." 
                        rows={5}
                      />
                    </div>
                    <Button className="w-full gap-2">
                      <Send className="w-4 h-4" />
                      إرسال الرسالة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* حوار رفع منتج جديد */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">رفع منتج جديد</DialogTitle>
            <DialogDescription>
              املأ المعلومات المطلوبة وارفع ملف PDF للمنتج
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* معلومات أساسية */}
            <div className="space-y-4">
              <h3 className="font-semibold">معلومات المنتج الأساسية</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productName">اسم المنتج *</Label>
                  <Input
                    id="productName"
                    value={uploadForm.productName}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, productName: e.target.value }))}
                    placeholder="اسم المنتج كاملاً"
                  />
                </div>
                
                <div>
                  <Label htmlFor="productType">نوع المنتج *</Label>
                  <Select
                    value={uploadForm.productType}
                    onValueChange={(value) => setUploadForm(prev => ({ ...prev, productType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع المنتج" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">الفئة</Label>
                  <Input
                    id="category"
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="فئة المنتج"
                  />
                </div>
                <div>
                  <Label htmlFor="brand">الماركة</Label>
                  <Input
                    id="brand"
                    value={uploadForm.brand}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, brand: e.target.value }))}
                    placeholder="اسم الماركة"
                  />
                </div>
                <div>
                  <Label htmlFor="model">الموديل</Label>
                  <Input
                    id="model"
                    value={uploadForm.model}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, model: e.target.value }))}
                    placeholder="رقم الموديل"
                  />
                </div>
              </div>
            </div>

            {/* الأسعار والكميات */}
            <div className="space-y-4">
              <h3 className="font-semibold">الأسعار والكميات</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="agentPrice">سعر الوكيل ($)</Label>
                  <Input
                    id="agentPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={uploadForm.agentPrice}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, agentPrice: e.target.value }))}
                    placeholder="السعر الذي تبيعه به"
                  />
                </div>
                <div>
                  <Label htmlFor="retailPrice">سعر البيع الموصى به ($) *</Label>
                  <Input
                    id="retailPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={uploadForm.retailPrice}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, retailPrice: e.target.value }))}
                    placeholder="سعر البيع للعميل"
                  />
                </div>
                <div>
                  <Label htmlFor="wholesalePrice">سعر الجملة ($)</Label>
                  <Input
                    id="wholesalePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={uploadForm.wholesalePrice}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, wholesalePrice: e.target.value }))}
                    placeholder="سعر الجملة"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="minimumOrder">الحد الأدنى للطلب</Label>
                  <Input
                    id="minimumOrder"
                    type="number"
                    min="1"
                    value={uploadForm.minimumOrder}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, minimumOrder: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="stock">الكمية المتاحة</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={uploadForm.stock}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, stock: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="commissionRate">نسبة العمولة (%)</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={uploadForm.commissionRate || agent.commissionRate}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, commissionRate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="warranty">مدة الضمان</Label>
                  <Select
                    value={uploadForm.warranty}
                    onValueChange={(value) => setUploadForm(prev => ({ ...prev, warranty: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر مدة الضمان" />
                    </SelectTrigger>
                    <SelectContent>
                      {WARRANTY_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* المواصفات */}
            <div className="space-y-4">
              <h3 className="font-semibold">مواصفات المنتج</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dimensions">الأبعاد</Label>
                  <Input
                    id="dimensions"
                    value={uploadForm.dimensions}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, dimensions: e.target.value }))}
                    placeholder="مثال: 2000×1000×35mm"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">الوزن</Label>
                  <Input
                    id="weight"
                    value={uploadForm.weight}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="مثال: 22.5kg"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="color">اللون</Label>
                  <Input
                    id="color"
                    value={uploadForm.color}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, color: e.target.value }))}
                    placeholder="لون المنتج"
                  />
                </div>
                <div>
                  <Label htmlFor="material">المادة</Label>
                  <Input
                    id="material"
                    value={uploadForm.material}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, material: e.target.value }))}
                    placeholder="مادة التصنيع"
                  />
                </div>
                <div>
                  <Label htmlFor="origin">بلد المنشأ</Label>
                  <Input
                    id="origin"
                    value={uploadForm.origin}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, origin: e.target.value }))}
                    placeholder="بلد التصنيع"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="certificate">شهادة الجودة / الضمان</Label>
                <Select
                  value={uploadForm.certificate}
                  onValueChange={(value) => setUploadForm(prev => ({ ...prev, certificate: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الشهادة" />
                  </SelectTrigger>
                  <SelectContent>
                    {CERTIFICATE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* المميزات */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">مميزات المنتج</h3>
                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة ميزة
                </Button>
              </div>
              
              <div className="space-y-3">
                {uploadForm.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="أدخل ميزة المنتج"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      disabled={uploadForm.features.length === 1}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* الوسوم */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">وسوم المنتج</h3>
                <Button type="button" variant="outline" size="sm" onClick={addTag}>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة وسم
                </Button>
              </div>
              
              <div className="space-y-3">
                {uploadForm.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={tag}
                      onChange={(e) => updateTag(index, e.target.value)}
                      placeholder="أدخل وسم للمنتج"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(index)}
                      disabled={uploadForm.tags.length === 1}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* رفع ملف PDF */}
            <div className="space-y-4">
              <h3 className="font-semibold">رفع ملف PDF *</h3>
              
              <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center">
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center gap-4">
                    <UploadCloud className="w-16 h-16 text-primary" />
                    <div>
                      <div className="font-medium text-lg">
                        {selectedFile ? selectedFile.name : "اضغط لرفع ملف PDF"}
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        ارفع ملف PDF يحتوي على مواصفات المنتج، الأسعار، شروط الضمان، والصور
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        الملفات المسموحة: PDF فقط • الحد الأقصى: 10MB
                      </div>
                    </div>
                    <Button type="button" variant="outline">
                      {selectedFile ? 'تغيير الملف' : 'اختر ملف PDF'}
                    </Button>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>
              
              {selectedFile && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-green-800">تم اختيار الملف بنجاح</div>
                      <div className="text-sm text-green-700">
                        {selectedFile.name} • {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ملاحظات إضافية */}
            <div className="space-y-4">
              <h3 className="font-semibold">ملاحظات إضافية</h3>
              <Textarea
                value={uploadForm.notes}
                onChange={(e) => setUploadForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="أي ملاحظات إضافية حول المنتج، شروط خاصة، تعليمات التركيب، إلخ..."
                rows={4}
              />
            </div>

            {/* ملخص */}
            <div className="bg-secondary/50 p-6 rounded-xl">
              <h3 className="font-semibold mb-4">ملخص المنتج</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">اسم المنتج:</span>
                    <span className="font-medium">{uploadForm.productName || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">نوع المنتج:</span>
                    <span className="font-medium">{uploadForm.productType || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">سعر البيع:</span>
                    <span className="font-medium">${uploadForm.retailPrice || "0"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">سعر الوكيل:</span>
                    <span className="font-medium">${uploadForm.agentPrice || "0"}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">العمولة:</span>
                    <span className="font-medium">{uploadForm.commissionRate || agent.commissionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الضمان:</span>
                    <span className="font-medium">{uploadForm.warranty || "غير محدد"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الشهادة:</span>
                    <span className="font-medium">{uploadForm.certificate || "غير محدد"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ملف PDF:</span>
                    <span className="font-medium">{selectedFile ? "✓ مرفوع" : "✗ غير مرفوع"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleUploadSubmit} className="gap-2">
              <UploadCloud className="w-4 h-4" />
              رفع المنتج
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* الفوتر */}
      <footer className="mt-12 border-t bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Sun className="w-6 h-6 text-primary" />
              <span className="font-bold">نظام وكلاء الطاقة الشمسية</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
              <p className="mt-1">الإصدار 2.0.0</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <HelpCircle className="w-4 h-4 ml-2" />
                المساعدة
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab("messages")}>
                <MessageSquare className="w-4 h-4 ml-2" />
                اتصل بنا
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}