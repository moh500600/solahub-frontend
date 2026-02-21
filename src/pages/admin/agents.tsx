"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Upload, 
  Download, 
  Search, 
  Filter,
  User,
  Users,
  FileText,
  Percent,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Shield,
  CreditCard,
  BarChart,
  UploadCloud,
  Package,
  ShoppingCart,
  Clock,
  Send,
  AlertCircle,
  DownloadCloud,
  Printer,
  Settings,
  Key,
  Globe,
  Building,
  UserCheck,
  UserX,
  CheckSquare,
  XSquare,
  EyeOff,
  FileCheck,
  FileX,
  MessageSquare,
  Star,
  TrendingUp,
  TrendingDown,
  Copy // ← أضف هذا
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// أنواع بيانات الوكيل
export interface Agent {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  city: string;
  address: string;
  taxNumber: string;
  commercialRegister: string;
  commissionRate: number;
  status: 'active' | 'inactive' | 'pending' | 'suspended' | 'blocked';
  type: 'individual' | 'company';
  category: 'premium' | 'standard' | 'basic';
  password: string;
  documents: AgentDocument[];
  products: AgentProduct[];
  sales: AgentSale[];
  requests: AgentRequest[];
  bankInfo: {
    bankName: string;
    accountNumber: string;
    iban: string;
    swiftCode: string;
    accountName: string;
  };
  settings: {
    canUploadPdf: boolean;
    canSetPrices: boolean;
    autoApproveProducts: boolean;
    maxProducts: number;
    maxFileSize: number;
    allowedProductTypes: string[];
  };
  notes: string;
  performance: {
    rating: number;
    totalReviews: number;
    responseTime: string;
    satisfactionRate: number;
  };
  social: {
    website: string;
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  loginHistory: LoginHistory[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastLogin: string;
  totalSales: number;
  totalCommission: number;
  pendingCommission: number;
  paidCommission: number;
  thisMonthSales: number;
  lastMonthSales: number;
  growthRate: number;
}

export interface AgentDocument {
  id: string;
  name: string;
  type: 'contract' | 'commercial_license' | 'tax_certificate' | 'id_card' | 'passport' | 'bank_statement' | 'other';
  fileUrl: string;
  uploadedAt: string;
  verified: boolean;
  verifiedBy: string;
  verifiedAt: string;
  notes: string;
}

export interface AgentProduct {
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
}

export interface AgentSale {
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

export interface AgentRequest {
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

export interface LoginHistory {
  id: string;
  date: string;
  ip: string;
  device: string;
  browser: string;
  location: string;
  status: 'success' | 'failed';
}

// أنواع المنتجات
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

// مفاتيح التخزين
const STORAGE_KEY_AGENTS = 'solar_agents_data_v2';
const STORAGE_KEY_PRODUCTS = 'solar_panels_data';
const STORAGE_KEY_AGENT_REQUESTS = 'agent_requests_data';

// دوال التخزين
const saveAgents = (agents: Agent[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_AGENTS, JSON.stringify(agents));
  }
};

const loadAgents = (): Agent[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY_AGENTS);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

const loadProducts = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    return data ? JSON.parse(data) : { panels: [] };
  }
  return { panels: [] };
};

export default function AgentsAdminPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("agents");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>("");
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  // تحميل البيانات عند التحميل
  useEffect(() => {
    loadData();
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = agents;

    if (searchTerm) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.phone.includes(searchTerm) ||
        agent.taxNumber.includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(agent => agent.status === statusFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(agent => agent.type === typeFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(agent => agent.category === categoryFilter);
    }

    setFilteredAgents(filtered);
  }, [agents, searchTerm, statusFilter, typeFilter, categoryFilter]);

  const loadData = () => {
    const savedAgents = loadAgents();
    const productsData = loadProducts();
    
    setAgents(savedAgents);
    setFilteredAgents(savedAgents);
    setProducts(productsData.panels || []);

    // بيانات تجريبية إذا لم توجد بيانات
    if (savedAgents.length === 0) {
      const mockAgents: Agent[] = [
        {
          id: "1",
          code: "AGT-001",
          name: "شركة التقنية الشمسية",
          email: "info@solar-tech.com",
          phone: "+966501234567",
          company: "شركة التقنية الشمسية المحدودة",
          country: "السعودية",
          city: "الرياض",
          address: "حي المروج، شارع الملك فهد",
          taxNumber: "3101234567",
          commercialRegister: "1012345678",
          commissionRate: 15,
          status: 'active',
          type: 'company',
          category: 'premium',
          password: "agent123",
          documents: [
            {
              id: "doc1",
              name: "عقد الوكالة",
              type: 'contract',
              fileUrl: "#",
              uploadedAt: new Date().toISOString(),
              verified: true,
              verifiedBy: "مدير النظام",
              verifiedAt: new Date().toISOString(),
              notes: "عقد موقع ومختوم"
            }
          ],
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
              certificate: "TUV, IEC, ISO9001",
              specifications: {
                power: "400W",
                efficiency: "21.5%",
                dimensions: "2000×1000×35mm",
                weight: "22.5kg"
              },
              features: ["عالية الكفاءة", "مقاومة للملوحة", "ضمان طويل"],
              uploadedPdf: {
                url: "#",
                uploadedAt: new Date().toISOString(),
                filename: "سعر-لوح-شمسي-400واط.pdf",
                size: 2.5,
                pages: 3
              },
              images: [],
              videos: [],
              notes: "منتج عالي الجودة مع ضمان 25 سنة",
              tags: ["شمسي", "طاقة", "متطور"],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              reviewedBy: "مدير المنتجات",
              reviewedAt: new Date().toISOString(),
              rejectionReason: ""
            }
          ],
          sales: [
            {
              id: "sale1",
              orderId: "ORD-001",
              invoiceNumber: "INV-2024-001",
              productId: "SP-MAX3-400",
              productName: "لوح شمسي 400 واط مونو كريستال",
              quantity: 5,
              unitPrice: 280,
              totalAmount: 1400,
              commissionAmount: 210,
              commissionRate: 15,
              saleDate: new Date().toISOString(),
              deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'delivered',
              paymentStatus: 'paid',
              paymentMethod: 'bank_transfer',
              customerName: "محمد أحمد",
              customerEmail: "mohamed@email.com",
              customerPhone: "+966501234568",
              customerAddress: "الرياض، حي النخيل",
              shippingAddress: "الرياض، حي النخيل",
              trackingNumber: "TRK-123456789",
              notes: "تركيب منزلي - عميل متكرر",
              attachments: []
            }
          ],
          requests: [
            {
              id: "req1",
              type: 'product_upload',
              title: "طلب إضافة منتج جديد",
              description: "أود إضافة منظومة شمسية 5 كيلووات",
              status: 'completed',
              priority: 'medium',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              assignedTo: "مدير المنتجات",
              response: "تمت الموافقة على المنتج",
              attachments: []
            }
          ],
          bankInfo: {
            bankName: "البنك الأهلي السعودي",
            accountNumber: "SA1234567890123456789012",
            iban: "SA0012345678901234567890",
            swiftCode: "NCBJSARI",
            accountName: "شركة التقنية الشمسية"
          },
          settings: {
            canUploadPdf: true,
            canSetPrices: true,
            autoApproveProducts: false,
            maxProducts: 100,
            maxFileSize: 10,
            allowedProductTypes: PRODUCT_TYPES
          },
          performance: {
            rating: 4.8,
            totalReviews: 156,
            responseTime: "2 ساعات",
            satisfactionRate: 95
          },
          social: {
            website: "https://solar-tech.com",
            facebook: "solartech",
            instagram: "solartech",
            twitter: "solartech",
            linkedin: "solartech"
          },
          loginHistory: [
            {
              id: "log1",
              date: new Date().toISOString(),
              ip: "192.168.1.100",
              device: "Windows Chrome",
              browser: "Chrome 120",
              location: "الرياض، السعودية",
              status: 'success'
            }
          ],
          notes: "وكيل معتمد منذ 2020، أداء ممتاز",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: "مدير النظام",
          lastLogin: new Date().toISOString(),
          totalSales: 1400,
          totalCommission: 210,
          pendingCommission: 0,
          paidCommission: 210,
          thisMonthSales: 1400,
          lastMonthSales: 8500,
          growthRate: 64.7
        }
      ];
      setAgents(mockAgents);
      setFilteredAgents(mockAgents);
      saveAgents(mockAgents);
    }
  };

  // توليد كود وكيل جديد
  const generateAgentCode = () => {
    const lastAgent = agents[agents.length - 1];
    if (lastAgent && lastAgent.code) {
      const lastNum = parseInt(lastAgent.code.split('-')[1]);
      return `AGT-${String(lastNum + 1).padStart(3, '0')}`;
    }
    return `AGT-${String(agents.length + 1).padStart(3, '0')}`;
  };

  // توليد كلمة مرور عشوائية
  const generatePassword = (length = 12) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  // حفظ/تحديث وكيل
  const handleSaveAgent = (agent: Agent) => {
    let updatedAgents;
    const agentWithMeta = {
      ...agent,
      updatedAt: new Date().toISOString(),
      updatedBy: "مدير النظام"
    };

    if (editingAgent) {
      updatedAgents = agents.map(a => a.id === agent.id ? agentWithMeta : a);
      toast.success("تم تحديث بيانات الوكيل بنجاح");
    } else {
      const newAgent = {
        ...agentWithMeta,
        id: Date.now().toString(),
        code: generateAgentCode(),
        password: generatePassword(),
        createdAt: new Date().toISOString(),
        createdBy: "مدير النظام",
        lastLogin: "",
        totalSales: 0,
        totalCommission: 0,
        pendingCommission: 0,
        paidCommission: 0,
        thisMonthSales: 0,
        lastMonthSales: 0,
        growthRate: 0,
        products: [],
        sales: [],
        requests: [],
        documents: [],
        loginHistory: [],
        performance: {
          rating: 0,
          totalReviews: 0,
          responseTime: "",
          satisfactionRate: 0
        },
        social: {
          website: "",
          facebook: "",
          instagram: "",
          twitter: "",
          linkedin: ""
        }
      };
      updatedAgents = [...agents, newAgent];
      toast.success("تم إضافة وكيل جديد بنجاح");
      
      // إرسال بيانات الدخول للوكيل (محاكاة)
      setTimeout(() => {
        toast.info(`تم إنشاء حساب للوكيل. كلمة المرور: ${newAgent.password}`);
      }, 1000);
    }

    setAgents(updatedAgents);
    saveAgents(updatedAgents);
    setIsDialogOpen(false);
    setEditingAgent(null);
  };

  // تأكيد حذف وكيل
  const confirmDelete = (id: string) => {
    setAgentToDelete(id);
    setDeleteDialogOpen(true);
  };

  // تنفيذ الحذف
  const handleDelete = () => {
    if (!agentToDelete) return;

    const updated = agents.filter(agent => agent.id !== agentToDelete);
    setAgents(updated);
    saveAgents(updated);
    toast.success("تم حذف الوكيل بنجاح");
    
    setDeleteDialogOpen(false);
    setAgentToDelete(null);
  };

  // إحصائيات متقدمة
  const getStats = () => {
    const totalAgents = agents.length;
    const activeAgents = agents.filter(a => a.status === 'active').length;
    const pendingAgents = agents.filter(a => a.status === 'pending').length;
    const totalSales = agents.reduce((sum, agent) => sum + agent.totalSales, 0);
    const totalCommission = agents.reduce((sum, agent) => sum + agent.totalCommission, 0);
    const pendingCommission = agents.reduce((sum, agent) => sum + agent.pendingCommission, 0);
    const totalProducts = agents.reduce((sum, agent) => sum + agent.products.length, 0);
    const pendingProducts = agents.reduce((sum, agent) => 
      sum + agent.products.filter(p => p.status === 'pending').length, 0
    );

    return { 
      totalAgents, 
      activeAgents, 
      pendingAgents,
      totalSales, 
      totalCommission,
      pendingCommission,
      totalProducts,
      pendingProducts
    };
  };

  const stats = getStats();

  // إدارة منتجات الوكيل
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [selectedAgentForProducts, setSelectedAgentForProducts] = useState<Agent | null>(null);
  const [editingProduct, setEditingProduct] = useState<AgentProduct | null>(null);

  const handleOpenProductDialog = (agent: Agent) => {
    setSelectedAgentForProducts(agent);
    setIsProductDialogOpen(true);
  };

  const handleSaveAgentProduct = (product: AgentProduct, agentId: string) => {
    const updatedAgents = agents.map(agent => {
      if (agent.id === agentId) {
        let updatedProducts;
        if (editingProduct) {
          updatedProducts = agent.products.map(p => 
            p.id === product.id ? product : p
          );
        } else {
          updatedProducts = [...agent.products, product];
        }
        
        return {
          ...agent,
          products: updatedProducts,
          updatedAt: new Date().toISOString()
        };
      }
      return agent;
    });

    setAgents(updatedAgents);
    saveAgents(updatedAgents);
    setIsProductDialogOpen(false);
    setEditingProduct(null);
    toast.success("تم حفظ المنتج بنجاح");
  };

  const handleDeleteAgentProduct = (agentId: string, productId: string) => {
    const updatedAgents = agents.map(agent => {
      if (agent.id === agentId) {
        return {
          ...agent,
          products: agent.products.filter(p => p.id !== productId),
          updatedAt: new Date().toISOString()
        };
      }
      return agent;
    });

    setAgents(updatedAgents);
    saveAgents(updatedAgents);
    toast.success("تم حذف المنتج بنجاح");
  };

  // إدارة مبيعات الوكيل
  const [isSaleDialogOpen, setIsSaleDialogOpen] = useState(false);
  const [selectedAgentForSales, setSelectedAgentForSales] = useState<Agent | null>(null);
  const [editingSale, setEditingSale] = useState<AgentSale | null>(null);

  const handleOpenSaleDialog = (agent: Agent) => {
    setSelectedAgentForSales(agent);
    setIsSaleDialogOpen(true);
  };

  const handleSaveAgentSale = (sale: AgentSale, agentId: string) => {
    const updatedAgents = agents.map(agent => {
      if (agent.id === agentId) {
        let updatedSales;
        let newSaleData = sale;
        
        if (!editingSale) {
          // حساب العمولة للمبيعات الجديدة
          const product = agent.products.find(p => p.productId === sale.productId);
          const commissionRate = product?.commissionRate || agent.commissionRate;
          const commissionAmount = (sale.totalAmount * commissionRate) / 100;
          
          newSaleData = {
            ...sale,
            commissionAmount,
            commissionRate,
            id: Date.now().toString()
          };
        }
        
        if (editingSale) {
          updatedSales = agent.sales.map(s => 
            s.id === sale.id ? sale : s
          );
        } else {
          updatedSales = [...agent.sales, newSaleData];
        }
        
        // تحديث إحصائيات الوكيل
        const totalSales = updatedSales.reduce((sum, s) => sum + s.totalAmount, 0);
        const totalCommission = updatedSales.reduce((sum, s) => sum + s.commissionAmount, 0);
        const pendingCommission = updatedSales
          .filter(s => s.paymentStatus === 'pending' || s.paymentStatus === 'partial')
          .reduce((sum, s) => sum + s.commissionAmount, 0);
        const paidCommission = updatedSales
          .filter(s => s.paymentStatus === 'paid')
          .reduce((sum, s) => sum + s.commissionAmount, 0);
        
        return {
          ...agent,
          sales: updatedSales,
          totalSales,
          totalCommission,
          pendingCommission,
          paidCommission,
          updatedAt: new Date().toISOString()
        };
      }
      return agent;
    });

    setAgents(updatedAgents);
    saveAgents(updatedAgents);
    setIsSaleDialogOpen(false);
    setEditingSale(null);
    toast.success("تم حفظ عملية البيع بنجاح");
  };

  // إدارة طلبات الوكلاء
  const getAgentRequests = () => {
    const requests: any[] = [];
    agents.forEach(agent => {
      if (agent.products && agent.products.length > 0) {
        agent.products.forEach(product => {
          if (product.status === 'pending') {
            requests.push({
              id: product.id,
              agentId: agent.id,
              agentName: agent.name,
              agentCode: agent.code,
              agentEmail: agent.email,
              productName: product.productName,
              productType: product.productType || 'غير محدد',
              agentPrice: product.agentPrice,
              retailPrice: product.retailPrice,
              pdfUrl: product.uploadedPdf?.url,
              pdfName: product.uploadedPdf?.filename,
              uploadedAt: product.createdAt,
              notes: product.notes,
              warranty: product.warranty,
              certificate: product.certificate,
              specifications: product.specifications,
              features: product.features
            });
          }
        });
      }
      
      // طلبات أخرى
      if (agent.requests && agent.requests.length > 0) {
        agent.requests.forEach(request => {
          if (request.status === 'pending') {
            requests.push({
              id: request.id,
              agentId: agent.id,
              agentName: agent.name,
              agentCode: agent.code,
              type: request.type,
              title: request.title,
              description: request.description,
              priority: request.priority,
              createdAt: request.createdAt,
              isRequest: true
            });
          }
        });
      }
    });
    return requests;
  };

  const handleApproveRequest = (request: any) => {
    const updatedAgents = agents.map(agent => {
      if (agent.id === request.agentId) {
        const updatedProducts = agent.products.map(product => 
          product.id === request.id 
            ? { ...product, 
                status: 'approved',
                reviewedBy: "مدير النظام",
                reviewedAt: new Date().toISOString()
              }
            : product
        );
        return { ...agent, products: updatedProducts };
      }
      return agent;
    });
    
    setAgents(updatedAgents);
    saveAgents(updatedAgents);
    toast.success("تم قبول المنتج بنجاح");
    
    // إرسال إشعار للوكيل (محاكاة)
    setTimeout(() => {
      toast.info(`تم إرسال إشعار الموافقة للوكيل ${request.agentName}`);
    }, 500);
  };

  const handleRejectRequest = (request: any, reason?: string) => {
    const updatedAgents = agents.map(agent => {
      if (agent.id === request.agentId) {
        const updatedProducts = agent.products.map(product => 
          product.id === request.id 
            ? { ...product, 
                status: 'rejected',
                rejectionReason: reason || "غير محدد",
                reviewedBy: "مدير النظام",
                reviewedAt: new Date().toISOString()
              }
            : product
        );
        return { ...agent, products: updatedProducts };
      }
      return agent;
    });
    
    setAgents(updatedAgents);
    saveAgents(updatedAgents);
    toast.error("تم رفض المنتج");
  };

  // تصدير البيانات
  const handleExport = (type: 'csv' | 'excel' | 'pdf') => {
    const data = filteredAgents.map(agent => ({
      الكود: agent.code,
      الاسم: agent.name,
      الشركة: agent.company,
      البريد: agent.email,
      الهاتف: agent.phone,
      الحالة: agent.status === 'active' ? 'نشط' : 
               agent.status === 'inactive' ? 'غير نشط' : 
               agent.status === 'pending' ? 'قيد الانتظار' : 'موقوف',
      نوع_الوكيل: agent.type === 'individual' ? 'فرد' : 'شركة',
      نسبة_العمولة: `${agent.commissionRate}%`,
      إجمالي_المبيعات: agent.totalSales,
      إجمالي_العمولات: agent.totalCommission,
      المستحقات: agent.pendingCommission,
      تاريخ_الإضافة: new Date(agent.createdAt).toLocaleDateString('ar-SA')
    }));

    const csvContent = [
      Object.keys(data[0] || {}).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `الوكلاء_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("تم تصدير البيانات بنجاح");
  };

  // إجراءات جماعية
  const handleBulkAction = () => {
    if (selectedAgents.length === 0) {
      toast.error("لم تختر أي وكلاء");
      return;
    }

    switch (bulkAction) {
      case 'activate':
        const activatedAgents = agents.map(agent => 
          selectedAgents.includes(agent.id) 
            ? { ...agent, status: 'active' as const }
            : agent
        );
        setAgents(activatedAgents);
        saveAgents(activatedAgents);
        toast.success(`تم تفعيل ${selectedAgents.length} وكيل`);
        break;
      
      case 'deactivate':
        const deactivatedAgents = agents.map(agent => 
          selectedAgents.includes(agent.id) 
            ? { ...agent, status: 'inactive' as const }
            : agent
        );
        setAgents(deactivatedAgents);
        saveAgents(deactivatedAgents);
        toast.success(`تم تعطيل ${selectedAgents.length} وكيل`);
        break;
      
      case 'delete':
        const remainingAgents = agents.filter(agent => !selectedAgents.includes(agent.id));
        setAgents(remainingAgents);
        saveAgents(remainingAgents);
        toast.success(`تم حذف ${selectedAgents.length} وكيل`);
        break;
    }

    setSelectedAgents([]);
    setBulkAction("");
  };

  // نسخ بيانات الدخول
  const copyLoginCredentials = (agent: Agent) => {
    const credentials = `البريد: ${agent.email}\nكلمة المرور: ${agent.password}\nرابط الدخول: /agents/login`;
    navigator.clipboard.writeText(credentials);
    toast.success("تم نسخ بيانات الدخول");
  };

  // إعادة تعيين كلمة المرور
  const resetPassword = (agentId: string) => {
    const newPassword = generatePassword();
    const updatedAgents = agents.map(agent => 
      agent.id === agentId 
        ? { ...agent, password: newPassword }
        : agent
    );
    
    setAgents(updatedAgents);
    saveAgents(updatedAgents);
    toast.success(`تم إعادة تعيين كلمة المرور: ${newPassword}`);
  };

  // نسخ كل الوكلاء
  const selectAllAgents = () => {
    if (selectedAgents.length === filteredAgents.length) {
      setSelectedAgents([]);
    } else {
      setSelectedAgents(filteredAgents.map(agent => agent.id));
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* رأس الصفحة */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="w-8 h-8 text-primary" />
              نظام إدارة الوكلاء المتقدم
            </h1>
            <p className="text-muted-foreground mt-2">
              إدارة الوكلاء، المنتجات، المبيعات، والعمولات بنظام متكامل
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                setEditingAgent(null);
                setIsDialogOpen(true);
              }}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              إضافة وكيل جديد
            </Button>
            <Button
              variant="outline"
              onClick={() => setExportDialogOpen(true)}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              تصدير
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("ميزة الاستيراد قيد التطوير")}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              استيراد
            </Button>
          </div>
        </div>

        {/* الإحصائيات المتقدمة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الوكلاء</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAgents}</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {stats.activeAgents} نشطين
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {stats.pendingAgents} قيد المراجعة
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                قيمة المبيعات الإجمالية
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">إجمالي العمولات</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalCommission.toLocaleString()}</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  ${stats.pendingCommission.toLocaleString()} مستحق
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">المنتجات</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="destructive" className="text-xs">
                  {stats.pendingProducts} قيد المراجعة
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* البحث والفلاتر المتقدمة */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="ابحث عن وكيل بالاسم، البريد، الهاتف، الرقم الضريبي..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="inactive">غير نشط</SelectItem>
                    <SelectItem value="pending">قيد الانتظار</SelectItem>
                    <SelectItem value="suspended">موقوف</SelectItem>
                    <SelectItem value="blocked">محظور</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="نوع الوكيل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    <SelectItem value="individual">فرد</SelectItem>
                    <SelectItem value="company">شركة</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    <SelectItem value="premium">مميز</SelectItem>
                    <SelectItem value="standard">قياسي</SelectItem>
                    <SelectItem value="basic">أساسي</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
                    {viewMode === 'list' ? '◼' : '≡'}
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setTypeFilter("all");
                    setCategoryFilter("all");
                  }}>
                    <Filter className="w-4 h-4 ml-2" />
                    إعادة تعيين
                  </Button>
                </div>
              </div>
            </div>

            {/* الإجراءات الجماعية */}
            {selectedAgents.length > 0 && (
              <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="font-medium">
                      تم اختيار {selectedAgents.length} وكيل
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select value={bulkAction} onValueChange={setBulkAction}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="اختر إجراء" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="activate">تفعيل</SelectItem>
                        <SelectItem value="deactivate">تعطيل</SelectItem>
                        <SelectItem value="send_email">إرسال بريد</SelectItem>
                        <SelectItem value="export">تصدير مختار</SelectItem>
                        <SelectItem value="delete">حذف</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleBulkAction} disabled={!bulkAction}>
                      تطبيق
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedAgents([])}>
                      إلغاء التحديد
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* التبويبات الرئيسية */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              قائمة الوكلاء ({filteredAgents.length})
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <UploadCloud className="w-4 h-4" />
              طلبات الوكلاء ({getAgentRequests().length})
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              جميع المنتجات ({stats.totalProducts})
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              المبيعات
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              التقارير
            </TabsTrigger>
          </TabsList>

          {/* تبويب الوكلاء */}
          <TabsContent value="agents" className="space-y-4">
            {viewMode === 'list' ? (
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedAgents.length === filteredAgents.length && filteredAgents.length > 0}
                          onChange={selectAllAgents}
                          className="rounded"
                        />
                      </TableHead>
                      <TableHead className="w-[100px]">الكود</TableHead>
                      <TableHead>الوكيل</TableHead>
                      <TableHead>المعلومات</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإحصائيات</TableHead>
                      <TableHead className="w-[200px]">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAgents.map(agent => (
                      <TableRow key={agent.id} className={selectedAgents.includes(agent.id) ? 'bg-secondary/50' : ''}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedAgents.includes(agent.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedAgents([...selectedAgents, agent.id]);
                              } else {
                                setSelectedAgents(selectedAgents.filter(id => id !== agent.id));
                              }
                            }}
                            className="rounded"
                          />
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {agent.code}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{agent.name}</div>
                            <div className="text-sm text-muted-foreground">{agent.company}</div>
                            <div className="flex items-center gap-1 text-xs">
                              <Mail className="w-3 h-3" />
                              {agent.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {agent.phone}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {agent.city}, {agent.country}
                            </div>
                            <div className="flex items-center gap-1">
                              <Percent className="w-3 h-3" />
                              عمولة: {agent.commissionRate}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <Badge 
                              variant={
                                agent.status === 'active' ? 'default' :
                                agent.status === 'inactive' ? 'secondary' :
                                agent.status === 'pending' ? 'outline' :
                                agent.status === 'suspended' ? 'destructive' : 'default'
                              }
                              className={
                                agent.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                                agent.status === 'suspended' ? 'bg-red-100 text-red-800 hover:bg-red-100' : ''
                              }
                            >
                              {agent.status === 'active' ? 'نشط' :
                               agent.status === 'inactive' ? 'غير نشط' :
                               agent.status === 'pending' ? 'قيد الانتظار' :
                               agent.status === 'suspended' ? 'موقوف' : 'محظور'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {agent.type === 'individual' ? 'فرد' : 'شركة'}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              مبيعات: <span className="font-medium">${agent.totalSales.toLocaleString()}</span>
                            </div>
                            <div className="text-sm">
                              عمولة: <span className="font-medium text-green-600">${agent.totalCommission.toLocaleString()}</span>
                            </div>
                            <div className="text-sm">
                              منتجات: <span className="font-medium">{agent.products.length}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-1">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuLabel>إجراءات سريعة</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setEditingAgent(agent);
                                      setIsDialogOpen(true);
                                    }}
                                  >
                                    <Edit className="w-4 h-4 ml-2" />
                                    تعديل بيانات
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleOpenProductDialog(agent)}
                                  >
                                    <Package className="w-4 h-4 ml-2" />
                                    إدارة المنتجات
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleOpenSaleDialog(agent)}
                                  >
                                    <DollarSign className="w-4 h-4 ml-2" />
                                    إضافة عملية بيع
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => copyLoginCredentials(agent)}
                                  >
                                    <Key className="w-4 h-4 ml-2" />
                                    نسخ بيانات الدخول
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => resetPassword(agent.id)}
                                  >
                                    <Key className="w-4 h-4 ml-2" />
                                    إعادة تعيين كلمة المرور
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedAgent(agent);
                                      setActiveTab("reports");
                                    }}
                                  >
                                    <BarChart className="w-4 h-4 ml-2" />
                                    عرض التقارير
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => confirmDelete(agent.id)}
                                  >
                                    <Trash2 className="w-4 h-4 ml-2" />
                                    حذف الوكيل
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedAgent(agent);
                                  setActiveTab("reports");
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" className="text-xs flex-1">
                                <Send className="w-3 h-3 ml-1" />
                                إرسال
                              </Button>
                              <Button size="sm" variant="outline" className="text-xs flex-1">
                                <Printer className="w-3 h-3 ml-1" />
                                طباعة
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {filteredAgents.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12">
                          <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium">لا توجد وكلاء</h3>
                          <p className="text-muted-foreground mt-2">
                            {searchTerm ? "لم يتم العثور على نتائج للبحث" : "ابدأ بإضافة أول وكيل"}
                          </p>
                          <Button
                            onClick={() => {
                              setEditingAgent(null);
                              setIsDialogOpen(true);
                            }}
                            className="mt-4 gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            إضافة وكيل جديد
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAgents.map(agent => (
                  <Card key={agent.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{agent.code}</Badge>
                            <Badge variant="outline" className="text-xs">
                              {agent.type === 'individual' ? 'فرد' : 'شركة'}
                            </Badge>
                          </CardDescription>
                        </div>
                        <Badge 
                          variant={
                            agent.status === 'active' ? 'default' :
                            agent.status === 'inactive' ? 'secondary' :
                            agent.status === 'pending' ? 'outline' :
                            'destructive'
                          }
                        >
                          {agent.status === 'active' ? 'نشط' :
                           agent.status === 'inactive' ? 'غير نشط' :
                           agent.status === 'pending' ? 'قيد الانتظار' : 'موقوف'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{agent.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{agent.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{agent.city}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="text-muted-foreground">المبيعات</div>
                          <div className="font-bold">${agent.totalSales.toLocaleString()}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-muted-foreground">العمولة</div>
                          <div className="font-bold text-green-600">${agent.totalCommission.toLocaleString()}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-muted-foreground">المنتجات</div>
                          <div className="font-bold">{agent.products.length}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-muted-foreground">النسبة</div>
                          <div className="font-bold">{agent.commissionRate}%</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedAgent(agent);
                            setActiveTab("reports");
                          }}
                        >
                          <Eye className="w-4 h-4 ml-2" />
                          عرض
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingAgent(agent);
                                setIsDialogOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4 ml-2" />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => copyLoginCredentials(agent)}
                            >
                              <Key className="w-4 h-4 ml-2" />
                              بيانات الدخول
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => confirmDelete(agent.id)}
                            >
                              <Trash2 className="w-4 h-4 ml-2" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* تبويب طلبات الوكلاء */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>طلبات الوكلاء</CardTitle>
                    <CardDescription>
                      المنتجات والطلبات المرسلة من الوكلاء وتحتاج للمراجعة
                    </CardDescription>
                  </div>
                  <Badge variant="outline">
                    {getAgentRequests().length} طلب
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="products" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="products">
                      <Package className="w-4 h-4 ml-2" />
                      منتجات جديدة ({getAgentRequests().filter(r => !r.isRequest).length})
                    </TabsTrigger>
                    <TabsTrigger value="other-requests">
                      <MessageSquare className="w-4 h-4 ml-2" />
                      طلبات أخرى ({getAgentRequests().filter(r => r.isRequest).length})
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* طلبات المنتجات */}
                  <TabsContent value="products" className="space-y-4">
                    {getAgentRequests()
                      .filter(r => !r.isRequest)
                      .map((request) => (
                        <Card key={request.id}>
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-bold text-lg">{request.productName}</div>
                                  <div className="text-sm text-muted-foreground">
                                    من الوكيل: {request.agentName} ({request.agentCode})
                                  </div>
                                </div>
                                <Badge variant="outline">{request.productType}</Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                  <div className="text-sm text-muted-foreground">سعر الوكيل</div>
                                  <div className="font-bold">${request.agentPrice}</div>
                                </div>
                                <div className="space-y-1">
                                  <div className="text-sm text-muted-foreground">سعر البيع</div>
                                  <div className="font-bold">${request.retailPrice}</div>
                                </div>
                                <div className="space-y-1">
                                  <div className="text-sm text-muted-foreground">الضمان</div>
                                  <div>{request.warranty || "غير محدد"}</div>
                                </div>
                                <div className="space-y-1">
                                  <div className="text-sm text-muted-foreground">الشهادة</div>
                                  <div>{request.certificate || "غير محدد"}</div>
                                </div>
                              </div>
                              
                              {request.notes && (
                                <div className="bg-secondary/50 p-3 rounded-lg">
                                  <div className="text-sm font-medium mb-1">ملاحظات الوكيل:</div>
                                  <div className="text-sm">{request.notes}</div>
                                </div>
                              )}
                              
                              {request.pdfUrl && (
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-primary" />
                                  <span className="text-sm">ملف PDF مرفق</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.open(request.pdfUrl, '_blank')}
                                    className="gap-1"
                                  >
                                    <Eye className="w-3 h-3" />
                                    معاينة
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.open(request.pdfUrl, '_blank')}
                                    className="gap-1"
                                  >
                                    <Download className="w-3 h-3" />
                                    تحميل
                                  </Button>
                                </div>
                              )}
                              
                              <div className="flex gap-2 pt-4 border-t">
                                <Button
                                  onClick={() => handleApproveRequest(request)}
                                  className="gap-2"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  قبول المنتج
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => {
                                    const reason = prompt("أدخل سبب الرفض:");
                                    if (reason) {
                                      handleRejectRequest(request, reason);
                                    }
                                  }}
                                  className="gap-2"
                                >
                                  <XCircle className="w-4 h-4" />
                                  رفض المنتج
                                </Button>
                                <Button variant="outline" className="gap-2">
                                  <Mail className="w-4 h-4" />
                                  التواصل
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    
                    {getAgentRequests().filter(r => !r.isRequest).length === 0 && (
                      <div className="text-center py-12">
                        <CheckCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">لا توجد منتجات قيد المراجعة</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* طلبات أخرى */}
                  <TabsContent value="other-requests" className="space-y-4">
                    {getAgentRequests()
                      .filter(r => r.isRequest)
                      .map((request) => (
                        <Card key={request.id}>
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-bold text-lg">{request.title}</div>
                                  <div className="text-sm text-muted-foreground">
                                    من الوكيل: {request.agentName} ({request.agentCode})
                                  </div>
                                </div>
                                <Badge variant={
                                  request.priority === 'urgent' ? 'destructive' :
                                  request.priority === 'high' ? 'default' : 'outline'
                                }>
                                  {request.priority === 'urgent' ? 'عاجل' :
                                   request.priority === 'high' ? 'عالي' :
                                   request.priority === 'medium' ? 'متوسط' : 'منخفض'}
                                </Badge>
                              </div>
                              
                              <div className="bg-secondary/50 p-3 rounded-lg">
                                <div className="text-sm">{request.description}</div>
                              </div>
                              
                              <div className="text-sm text-muted-foreground">
                                {new Date(request.createdAt).toLocaleString('ar-SA')}
                              </div>
                              
                              <div className="flex gap-2 pt-2">
                                <Button size="sm" className="gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  معالجة
                                </Button>
                                <Button size="sm" variant="outline" className="gap-1">
                                  <Mail className="w-3 h-3" />
                                  رد
                                </Button>
                                <Button size="sm" variant="destructive" className="gap-1">
                                  <XCircle className="w-3 h-3" />
                                  رفض
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    
                    {getAgentRequests().filter(r => r.isRequest).length === 0 && (
                      <div className="text-center py-12">
                        <CheckCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">لا توجد طلبات أخرى</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب جميع المنتجات */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>جميع منتجات الوكلاء</CardTitle>
                <CardDescription>
                  قائمة كاملة بجميع المنتجات التي أضافها الوكلاء
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المنتج</TableHead>
                        <TableHead>الوكيل</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>الأسعار</TableHead>
                        <TableHead>الضمان</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>ملف PDF</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agents.flatMap(agent => 
                        agent.products.map(product => ({
                          ...product,
                          agentName: agent.name,
                          agentCode: agent.code,
                          agentId: agent.id
                        }))
                      ).map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="font-medium">{product.productName}</div>
                            <div className="text-sm text-muted-foreground">
                              SKU: {product.productSKU}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{product.agentName}</div>
                              <div className="text-sm text-muted-foreground">
                                {product.agentCode}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.productType}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">وكيل: <strong>${product.agentPrice}</strong></div>
                              <div className="text-sm">بيع: <strong>${product.retailPrice}</strong></div>
                              <div className="text-xs text-muted-foreground">
                                عمولة: {product.commissionRate}%
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{product.warranty || "-"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                product.status === 'approved' ? 'default' :
                                product.status === 'rejected' ? 'destructive' :
                                product.status === 'pending' ? 'outline' : 'secondary'
                              }
                            >
                              {product.status === 'approved' ? 'معتمد' :
                               product.status === 'rejected' ? 'مرفوض' :
                               product.status === 'pending' ? 'قيد المراجعة' :
                               product.status === 'draft' ? 'مسودة' : 'مؤرشف'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {product.uploadedPdf ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(product.uploadedPdf?.url, '_blank')}
                                className="gap-1"
                              >
                                <FileText className="w-3 h-3" />
                                معاينة
                              </Button>
                            ) : (
                              <span className="text-muted-foreground text-sm">لا يوجد</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const agent = agents.find(a => a.id === product.agentId);
                                  if (agent) {
                                    setSelectedAgentForProducts(agent);
                                    setEditingProduct(product);
                                    setIsProductDialogOpen(true);
                                  }
                                }}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(product.uploadedPdf?.url, '_blank')}
                              >
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteAgentProduct(product.agentId, product.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {agents.reduce((sum, agent) => sum + agent.products.length, 0) === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-12">
                            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">لا توجد منتجات</p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب المبيعات */}
          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>مبيعات جميع الوكلاء</CardTitle>
                <CardDescription>
                  إحصائيات وتفاصيل مبيعات الوكلاء
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم الطلب</TableHead>
                        <TableHead>الوكيل</TableHead>
                        <TableHead>العميل</TableHead>
                        <TableHead>المنتجات</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>العمولة</TableHead>
                        <TableHead>حالة الطلب</TableHead>
                        <TableHead>حالة الدفع</TableHead>
                        <TableHead>التاريخ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agents.flatMap(agent => 
                        agent.sales.map(sale => ({
                          ...sale,
                          agentName: agent.name,
                          agentCode: agent.code
                        }))
                      ).map((sale) => (
                        <TableRow key={sale.id}>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">
                              {sale.orderId}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{sale.agentName}</div>
                              <div className="text-sm text-muted-foreground">
                                {sale.agentCode}
                              </div>
                            </div>
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
                            ${sale.totalAmount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="text-green-600 font-bold">
                              ${sale.commissionAmount.toLocaleString()}
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
                        </TableRow>
                      ))}
                      
                      {agents.reduce((sum, agent) => sum + agent.sales.length, 0) === 0 && (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-12">
                            <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">لا توجد مبيعات</p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب التقارير */}
          <TabsContent value="reports" className="space-y-6">
            {selectedAgent ? (
              <AgentReports agent={selectedAgent} onBack={() => setSelectedAgent(null)} />
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>أفضل الوكلاء أداءً</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {agents
                          .sort((a, b) => b.totalSales - a.totalSales)
                          .slice(0, 8)
                          .map((agent, index) => (
                            <div key={agent.id} className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-sm font-medium">{index + 1}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{agent.name}</div>
                                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                                    <span>{agent.code}</span>
                                    <span>•</span>
                                    <span>{agent.products.length} منتج</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">${agent.totalSales.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3 text-green-600" />
                                  {agent.growthRate}%
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>توزيع الوكلاء</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>نشطين</span>
                            <span className="font-medium">{stats.activeAgents}</span>
                          </div>
                          <Progress value={(stats.activeAgents / stats.totalAgents) * 100} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>غير نشطين</span>
                            <span className="font-medium">{stats.totalAgents - stats.activeAgents - stats.pendingAgents}</span>
                          </div>
                          <Progress value={((stats.totalAgents - stats.activeAgents - stats.pendingAgents) / stats.totalAgents) * 100} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>قيد المراجعة</span>
                            <span className="font-medium">{stats.pendingAgents}</span>
                          </div>
                          <Progress value={(stats.pendingAgents / stats.totalAgents) * 100} />
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>إجمالي المبيعات</span>
                          <span className="font-bold">${stats.totalSales.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>إجمالي العمولات</span>
                          <span className="font-bold text-green-600">${stats.totalCommission.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>المستحقات</span>
                          <span className="font-bold text-amber-600">${stats.pendingCommission.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>متوسط نسبة العمولة</span>
                          <span className="font-bold">
                            {agents.length > 0 
                              ? (agents.reduce((sum, a) => sum + a.commissionRate, 0) / agents.length).toFixed(1)
                              : "0"
                            }%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>تفاصيل أداء جميع الوكلاء</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>الوكيل</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead>المنتجات</TableHead>
                            <TableHead>المبيعات</TableHead>
                            <TableHead>العمولات</TableHead>
                            <TableHead>المستحقات</TableHead>
                            <TableHead>معدل النمو</TableHead>
                            <TableHead>التقييم</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {agents.map(agent => (
                            <TableRow 
                              key={agent.id}
                              className="cursor-pointer hover:bg-secondary/50"
                              onClick={() => setSelectedAgent(agent)}
                            >
                              <TableCell>
                                <div className="font-medium">{agent.name}</div>
                                <div className="text-sm text-muted-foreground">{agent.code}</div>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={
                                    agent.status === 'active' ? 'default' :
                                    agent.status === 'inactive' ? 'secondary' :
                                    agent.status === 'pending' ? 'outline' : 'destructive'
                                  }
                                >
                                  {agent.status === 'active' ? 'نشط' :
                                   agent.status === 'inactive' ? 'غير نشط' :
                                   agent.status === 'pending' ? 'قيد المراجعة' : 'موقوف'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span>{agent.products.length}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {agent.products.filter(p => p.status === 'approved').length} معتمد
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">${agent.totalSales.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">
                                  هذا الشهر: ${agent.thisMonthSales.toLocaleString()}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium text-green-600">
                                  ${agent.totalCommission.toLocaleString()}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant={agent.pendingCommission > 0 ? "destructive" : "outline"}>
                                  ${agent.pendingCommission.toLocaleString()}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  {agent.growthRate >= 0 ? (
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                  )}
                                  <span className={agent.growthRate >= 0 ? "text-green-600" : "text-red-600"}>
                                    {agent.growthRate}%
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                  <span>{agent.performance.rating}</span>
                                  <span className="text-xs text-muted-foreground">
                                    ({agent.performance.totalReviews})
                                  </span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>مخطط المبيعات الشهرية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-lg">
                      <div className="text-center">
                        <BarChart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">مخططات المبيعات متاحة في النسخة المتقدمة</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* حوار إضافة/تعديل وكيل */}
      <AgentFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        agent={editingAgent}
        onSave={handleSaveAgent}
      />

      {/* حوار إدارة منتجات الوكيل */}
      <AgentProductsDialog
        open={isProductDialogOpen}
        onOpenChange={setIsProductDialogOpen}
        agent={selectedAgentForProducts}
        products={products}
        onSave={handleSaveAgentProduct}
        onDelete={handleDeleteAgentProduct}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
      />

      {/* حوار إدارة مبيعات الوكيل */}
      <AgentSalesDialog
        open={isSaleDialogOpen}
        onOpenChange={setIsSaleDialogOpen}
        agent={selectedAgentForSales}
        onSave={handleSaveAgentSale}
        editingSale={editingSale}
        setEditingSale={setEditingSale}
      />

      {/* حوار تصدير البيانات */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تصدير بيانات الوكلاء</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>نوع الملف</Label>
              <Select defaultValue="csv">
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الملف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV (Excel)</SelectItem>
                  <SelectItem value="excel">Excel (XLSX)</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>نطاق البيانات</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="اختر النطاق" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الوكلاء</SelectItem>
                  <SelectItem value="filtered">الوكلاء المفلترة</SelectItem>
                  <SelectItem value="selected">الوكلاء المختارة ({selectedAgents.length})</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>الحقول المتضمنة</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="field1" defaultChecked className="rounded" />
                  <Label htmlFor="field1" className="cursor-pointer">المعلومات الأساسية</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="field2" defaultChecked className="rounded" />
                  <Label htmlFor="field2" className="cursor-pointer">الإحصائيات</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="field3" className="rounded" />
                  <Label htmlFor="field3" className="cursor-pointer">المنتجات</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="field4" className="rounded" />
                  <Label htmlFor="field4" className="cursor-pointer">المبيعات</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={() => handleExport('csv')} className="gap-2">
              <Download className="w-4 h-4" />
              تصدير
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* حوار تأكيد الحذف */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف هذا الوكيل؟ سيتم حذف جميع بياناته بما في ذلك:
              <ul className="list-disc mr-4 mt-2 space-y-1">
                <li>جميع المنتجات المضافة</li>
                <li>سجل المبيعات</li>
                <li>الطلبات والاستفسارات</li>
                <li>المستندات المرفقة</li>
                <li>سجل الدخول</li>
              </ul>
              <p className="mt-3 font-semibold text-red-600">
                هذا الإجراء لا يمكن التراجع عنه!
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAgentToDelete(null)}>
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="w-4 h-4 ml-2" />
              حذف الوكيل
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// مكون حوار إضافة/تعديل وكيل
function AgentFormDialog({
  open,
  onOpenChange,
  agent,
  onSave
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: Agent | null;
  onSave: (agent: Agent) => void;
}) {
  const [formData, setFormData] = useState<Agent>(
    agent || {
      id: "",
      code: "",
      name: "",
      email: "",
      phone: "",
      company: "",
      country: "السعودية",
      city: "",
      address: "",
      taxNumber: "",
      commercialRegister: "",
      commissionRate: 10,
      status: 'pending',
      type: 'individual',
      category: 'standard',
      password: "",
      documents: [],
      products: [],
      sales: [],
      requests: [],
      bankInfo: {
        bankName: "",
        accountNumber: "",
        iban: "",
        swiftCode: "",
        accountName: ""
      },
      settings: {
        canUploadPdf: true,
        canSetPrices: true,
        autoApproveProducts: false,
        maxProducts: 50,
        maxFileSize: 10,
        allowedProductTypes: PRODUCT_TYPES
      },
      performance: {
        rating: 0,
        totalReviews: 0,
        responseTime: "",
        satisfactionRate: 0
      },
      social: {
        website: "",
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: ""
      },
      loginHistory: [],
      notes: "",
      createdAt: "",
      updatedAt: "",
      createdBy: "",
      lastLogin: "",
      totalSales: 0,
      totalCommission: 0,
      pendingCommission: 0,
      paidCommission: 0,
      thisMonthSales: 0,
      lastMonthSales: 0,
      growthRate: 0
    }
  );

  const [generatePassword, setGeneratePassword] = useState(!agent);

  useEffect(() => {
    if (generatePassword && !agent) {
      const newPassword = Math.random().toString(36).slice(-8) + "!@#";
      setFormData(prev => ({ ...prev, password: newPassword }));
    }
  }, [generatePassword, agent]);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("يرجى ملء الحقول المطلوبة");
      return;
    }
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {agent ? "تعديل بيانات الوكيل" : "إضافة وكيل جديد"}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">المعلومات الأساسية</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            <TabsTrigger value="bank">المعلومات البنكية</TabsTrigger>
            <TabsTrigger value="documents">المستندات</TabsTrigger>
          </TabsList>

          {/* المعلومات الأساسية */}
          <TabsContent value="basic" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">اسم الوكيل *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="الاسم الكامل"
                />
              </div>
              <div>
                <Label htmlFor="company">اسم الشركة / المؤسسة</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="اسم الشركة"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="example@domain.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+966501234567"
                />
              </div>
            </div>

            {!agent && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="generatePassword"
                    checked={generatePassword}
                    onChange={(e) => setGeneratePassword(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="generatePassword" className="cursor-pointer">
                    توليد كلمة مرور تلقائياً
                  </Label>
                </div>
                {!generatePassword && (
                  <div>
                    <Label htmlFor="password">كلمة المرور *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="كلمة المرور"
                    />
                  </div>
                )}
                {formData.password && (
                  <div className="p-3 bg-secondary/50 rounded">
                    <div className="text-sm font-medium">كلمة المرور:</div>
                    <div className="font-mono text-sm">{formData.password}</div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={() => navigator.clipboard.writeText(formData.password)}
                    >
                      <Copy className="w-3 h-3 ml-1" />
                      نسخ كلمة المرور
                    </Button>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="country">البلد</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  placeholder="السعودية"
                />
              </div>
              <div>
                <Label htmlFor="city">المدينة</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="الرياض"
                />
              </div>
              <div>
                <Label htmlFor="type">نوع الوكيل</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'individual' | 'company') => 
                    setFormData(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">فرد</SelectItem>
                    <SelectItem value="company">شركة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="address">العنوان</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="العنوان التفصيلي"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="taxNumber">الرقم الضريبي</Label>
                <Input
                  id="taxNumber"
                  value={formData.taxNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, taxNumber: e.target.value }))}
                  placeholder="3101234567"
                />
              </div>
              <div>
                <Label htmlFor="commercialRegister">السجل التجاري</Label>
                <Input
                  id="commercialRegister"
                  value={formData.commercialRegister}
                  onChange={(e) => setFormData(prev => ({ ...prev, commercialRegister: e.target.value }))}
                  placeholder="1012345678"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="commissionRate">نسبة العمولة (%)</Label>
                <Input
                  id="commissionRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.commissionRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, commissionRate: parseFloat(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="status">الحالة</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Agent['status']) => 
                    setFormData(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="inactive">غير نشط</SelectItem>
                    <SelectItem value="pending">قيد الانتظار</SelectItem>
                    <SelectItem value="suspended">موقوف</SelectItem>
                    <SelectItem value="blocked">محظور</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">فئة الوكيل</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: 'premium' | 'standard' | 'basic') => 
                    setFormData(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="premium">مميز</SelectItem>
                    <SelectItem value="standard">قياسي</SelectItem>
                    <SelectItem value="basic">أساسي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="ملاحظات إضافية عن الوكيل"
                rows={3}
              />
            </div>
          </TabsContent>

          {/* إعدادات الوكيل */}
          <TabsContent value="settings" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>رفع ملفات PDF</Label>
                  <p className="text-sm text-muted-foreground">
                    السماح للوكيل برفع ملفات PDF للمنتجات
                  </p>
                </div>
                <Switch
                  checked={formData.settings.canUploadPdf}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({
                      ...prev,
                      settings: { ...prev.settings, canUploadPdf: checked }
                    }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تحديد الأسعار</Label>
                  <p className="text-sm text-muted-foreground">
                    السماح للوكيل بتحديد أسعار المنتجات
                  </p>
                </div>
                <Switch
                  checked={formData.settings.canSetPrices}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({
                      ...prev,
                      settings: { ...prev.settings, canSetPrices: checked }
                    }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>الموافقة التلقائية</Label>
                  <p className="text-sm text-muted-foreground">
                    الموافقة التلقائية على منتجات الوكيل
                  </p>
                </div>
                <Switch
                  checked={formData.settings.autoApproveProducts}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({
                      ...prev,
                      settings: { ...prev.settings, autoApproveProducts: checked }
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxProducts">الحد الأقصى للمنتجات</Label>
                <Input
                  id="maxProducts"
                  type="number"
                  min="1"
                  value={formData.settings.maxProducts}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      settings: { ...prev.settings, maxProducts: parseInt(e.target.value) }
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="maxFileSize">الحد الأقصى لحجم الملف (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.settings.maxFileSize}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      settings: { ...prev.settings, maxFileSize: parseInt(e.target.value) }
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <Label>أنواع المنتجات المسموحة</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {PRODUCT_TYPES.map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`type-${type}`}
                      checked={formData.settings.allowedProductTypes.includes(type)}
                      onChange={(e) => {
                        const newTypes = e.target.checked
                          ? [...formData.settings.allowedProductTypes, type]
                          : formData.settings.allowedProductTypes.filter(t => t !== type);
                        setFormData(prev => ({
                          ...prev,
                          settings: { ...prev.settings, allowedProductTypes: newTypes }
                        }));
                      }}
                      className="rounded"
                    />
                    <Label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* المعلومات البنكية */}
          <TabsContent value="bank" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">اسم البنك</Label>
                <Input
                  id="bankName"
                  value={formData.bankInfo.bankName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    bankInfo: { ...prev.bankInfo, bankName: e.target.value }
                  }))}
                  placeholder="البنك الأهلي السعودي"
                />
              </div>
              <div>
                <Label htmlFor="accountName">اسم صاحب الحساب</Label>
                <Input
                  id="accountName"
                  value={formData.bankInfo.accountName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    bankInfo: { ...prev.bankInfo, accountName: e.target.value }
                  }))}
                  placeholder="اسم صاحب الحساب"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accountNumber">رقم الحساب</Label>
                <Input
                  id="accountNumber"
                  value={formData.bankInfo.accountNumber}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    bankInfo: { ...prev.bankInfo, accountNumber: e.target.value }
                  }))}
                  placeholder="SA1234567890123456789012"
                />
              </div>
              <div>
                <Label htmlFor="iban">رقم IBAN</Label>
                <Input
                  id="iban"
                  value={formData.bankInfo.iban}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    bankInfo: { ...prev.bankInfo, iban: e.target.value }
                  }))}
                  placeholder="SA0012345678901234567890"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="swiftCode">كود SWIFT</Label>
              <Input
                id="swiftCode"
                value={formData.bankInfo.swiftCode}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  bankInfo: { ...prev.bankInfo, swiftCode: e.target.value }
                }))}
                placeholder="NCBJSARI"
              />
            </div>
          </TabsContent>

          {/* المستندات */}
          <TabsContent value="documents" className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>المستندات المطلوبة</Label>
                  <p className="text-sm text-muted-foreground">
                    رفع المستندات الرسمية للوكيل
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 ml-2" />
                  رفع مستند
                </Button>
              </div>
              
              <div className="space-y-2">
                {formData.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-secondary rounded">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {doc.type === 'contract' ? 'عقد' :
                           doc.type === 'commercial_license' ? 'سجل تجاري' :
                           doc.type === 'tax_certificate' ? 'شهادة ضريبية' :
                           doc.type === 'id_card' ? 'بطاقة هوية' :
                           doc.type === 'passport' ? 'جواز سفر' :
                           doc.type === 'bank_statement' ? 'كشف حساب' : 'أخرى'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={doc.verified ? "default" : "secondary"}>
                        {doc.verified ? "تم التحقق" : "قيد المراجعة"}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {formData.documents.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">لا توجد مستندات مرفوعة</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSubmit}>
            {agent ? "تحديث البيانات" : "إضافة الوكيل"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// مكون حوار إدارة منتجات الوكيل
function AgentProductsDialog({
  open,
  onOpenChange,
  agent,
  products,
  onSave,
  onDelete,
  editingProduct,
  setEditingProduct
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: Agent | null;
  products: any[];
  onSave: (product: AgentProduct, agentId: string) => void;
  onDelete: (agentId: string, productId: string) => void;
  editingProduct: AgentProduct | null;
  setEditingProduct: (product: AgentProduct | null) => void;
}) {
  const [formData, setFormData] = useState<AgentProduct>(
    editingProduct || {
      id: Date.now().toString(),
      productId: "",
      productName: "",
      productType: "",
      productSKU: "",
      agentPrice: 0,
      retailPrice: 0,
      wholesalePrice: 0,
      minimumOrder: 1,
      stock: 0,
      commissionRate: agent?.commissionRate || 10,
      status: 'pending',
      warranty: "",
      certificate: "",
      specifications: {},
      features: [],
      uploadedPdf: undefined,
      images: [],
      videos: [],
      notes: "",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reviewedBy: "",
      reviewedAt: "",
      rejectionReason: ""
    }
  );

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [newFeature, setNewFeature] = useState("");
  const [newTag, setNewTag] = useState("");

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      toast.success(`تم اختيار ملف: ${file.name}`);
    } else {
      toast.error("يرجى اختيار ملف PDF فقط");
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!formData.productName || !formData.productType) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    const selectedProduct = products.find(p => p.id === formData.productId);
    const productToSave: AgentProduct = {
      ...formData,
      productId: formData.productId || `PROD-${Date.now().toString().slice(-6)}`,
      productName: selectedProduct?.name || formData.productName,
      productSKU: selectedProduct?.sku || formData.productSKU || `SKU-${Date.now().toString().slice(-6)}`,
      uploadedPdf: pdfFile ? {
        url: URL.createObjectURL(pdfFile),
        uploadedAt: new Date().toISOString(),
        filename: pdfFile.name,
        size: pdfFile.size,
        pages: 1 // في الواقع يجب حساب عدد الصفحات
      } : editingProduct?.uploadedPdf,
      updatedAt: new Date().toISOString()
    };

    onSave(productToSave, agent!.id);
    setFormData({
      id: Date.now().toString(),
      productId: "",
      productName: "",
      productType: "",
      productSKU: "",
      agentPrice: 0,
      retailPrice: 0,
      wholesalePrice: 0,
      minimumOrder: 1,
      stock: 0,
      commissionRate: agent?.commissionRate || 10,
      status: 'pending',
      warranty: "",
      certificate: "",
      specifications: {},
      features: [],
      uploadedPdf: undefined,
      images: [],
      videos: [],
      notes: "",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reviewedBy: "",
      reviewedAt: "",
      rejectionReason: ""
    });
    setPdfFile(null);
    setNewFeature("");
    setNewTag("");
  };

  if (!agent) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
            <div className="text-sm font-normal text-muted-foreground mt-1">
              للوكيل: {agent.name} ({agent.code})
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* المنتجات الحالية */}
          {!editingProduct && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">المنتجات الحالية ({agent.products.length})</h3>
                <Badge variant="outline">
                  {agent.products.filter(p => p.status === 'approved').length} معتمد
                </Badge>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {agent.products.map(product => (
                  <div key={product.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="font-medium">{product.productName}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.productType} • ${product.retailPrice}
                        </div>
                        <Badge variant={
                          product.status === 'approved' ? 'default' :
                          product.status === 'rejected' ? 'destructive' : 'outline'
                        } className="text-xs">
                          {product.status === 'approved' ? 'معتمد' :
                           product.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingProduct(product);
                            setFormData(product);
                          }}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onDelete(agent.id, product.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {agent.products.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    لا توجد منتجات مضافة
                  </div>
                )}
              </div>
            </div>
          )}

          {/* إضافة/تعديل منتج */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">
              {editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productName">اسم المنتج *</Label>
                <Input
                  id="productName"
                  value={formData.productName}
                  onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                  placeholder="اسم المنتج كاملاً"
                />
              </div>
              
              <div>
                <Label htmlFor="productType">نوع المنتج *</Label>
                <Select
                  value={formData.productType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, productType: value }))}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <Label htmlFor="agentPrice">سعر الوكيل ($)</Label>
                <Input
                  id="agentPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.agentPrice}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    agentPrice: parseFloat(e.target.value) 
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="retailPrice">سعر البيع الموصى به ($)</Label>
                <Input
                  id="retailPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.retailPrice}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    retailPrice: parseFloat(e.target.value) 
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="wholesalePrice">سعر الجملة ($)</Label>
                <Input
                  id="wholesalePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.wholesalePrice}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    wholesalePrice: parseFloat(e.target.value) 
                  }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <Label htmlFor="commissionRate">نسبة العمولة (%)</Label>
                <Input
                  id="commissionRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.commissionRate}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    commissionRate: parseFloat(e.target.value) 
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="minimumOrder">الحد الأدنى للطلب</Label>
                <Input
                  id="minimumOrder"
                  type="number"
                  min="1"
                  value={formData.minimumOrder}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    minimumOrder: parseInt(e.target.value) 
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="stock">الكمية المتاحة</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    stock: parseInt(e.target.value) 
                  }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="warranty">مدة الضمان</Label>
                <Input
                  id="warranty"
                  value={formData.warranty}
                  onChange={(e) => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
                  placeholder="مثال: 5 سنوات"
                />
              </div>
              <div>
                <Label htmlFor="certificate">شهادة الضمان / الجودة</Label>
                <Input
                  id="certificate"
                  value={formData.certificate}
                  onChange={(e) => setFormData(prev => ({ ...prev, certificate: e.target.value }))}
                  placeholder="نوع الشهادة"
                />
              </div>
            </div>

            {/* المميزات */}
            <div className="mt-4">
              <Label>المميزات</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="أضف ميزة جديدة"
                  onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                />
                <Button type="button" onClick={addFeature}>
                  إضافة
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* الوسوم */}
            <div className="mt-4">
              <Label>الوسوم</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="أضف وسم جديد"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button type="button" onClick={addTag}>
                  إضافة
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* رفع ملف PDF */}
            <div className="mt-4">
              <Label>رفع عرض الأسعار (PDF)</Label>
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center mt-2">
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center gap-4">
                    <UploadCloud className="w-12 h-12 text-primary" />
                    <div>
                      <div className="font-medium">
                        {pdfFile ? pdfFile.name : "اضغط لرفع ملف PDF"}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        ارفع ملف PDF يحتوي على مواصفات المنتج والسعر والضمان
                      </div>
                    </div>
                    <Button type="button" variant="outline">
                      اختر ملف PDF
                    </Button>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfUpload}
                    className="hidden"
                  />
                </label>
              </div>
              {pdfFile && (
                <div className="mt-2 text-sm text-green-600 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  تم اختيار الملف: {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                </div>
              )}
              {editingProduct?.uploadedPdf && !pdfFile && (
                <div className="mt-2">
                  <div className="text-sm font-medium">الملف الحالي:</div>
                  <div className="text-sm text-muted-foreground">
                    {editingProduct.uploadedPdf.filename} - {editingProduct.uploadedPdf.size}MB
                  </div>
                  <div className="flex gap-2 mt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(editingProduct.uploadedPdf?.url, '_blank')}
                    >
                      <Eye className="w-3 h-3 ml-1" />
                      معاينة
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(editingProduct.uploadedPdf?.url, '_blank')}
                    >
                      <Download className="w-3 h-3 ml-1" />
                      تحميل
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* ملاحظات */}
            <div className="mt-4">
              <Label htmlFor="notes">ملاحظات إضافية</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="أي ملاحظات إضافية حول المنتج..."
                rows={3}
              />
            </div>

            {/* مواصفات إضافية */}
            <div className="mt-4">
              <Label>مواصفات إضافية</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <Label htmlFor="spec1" className="text-sm">الطاقة (واط)</Label>
                  <Input
                    id="spec1"
                    placeholder="400W"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      specifications: { ...prev.specifications, power: e.target.value }
                    }))}
                    value={formData.specifications.power || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="spec2" className="text-sm">الكفاءة</Label>
                  <Input
                    id="spec2"
                    placeholder="21.5%"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      specifications: { ...prev.specifications, efficiency: e.target.value }
                    }))}
                    value={formData.specifications.efficiency || ''}
                  />
                </div>
              </div>
            </div>

            {/* ملخص */}
            <div className="bg-secondary/50 p-4 rounded-lg mt-4">
              <h4 className="font-semibold mb-3">ملخص المنتج</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>اسم المنتج:</div>
                <div className="font-medium">{formData.productName || "-"}</div>
                <div>نوع المنتج:</div>
                <div className="font-medium">{formData.productType || "-"}</div>
                <div>سعر الوكيل:</div>
                <div className="font-medium">${formData.agentPrice || "0"}</div>
                <div>سعر البيع:</div>
                <div className="font-medium">${formData.retailPrice || "0"}</div>
                <div>العمولة:</div>
                <div className="font-medium">{formData.commissionRate || "0"}%</div>
                <div>مدة الضمان:</div>
                <div className="font-medium">{formData.warranty || "-"}</div>
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-6">
              {editingProduct && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingProduct(null);
                    setFormData({
                      id: Date.now().toString(),
                      productId: "",
                      productName: "",
                      productType: "",
                      productSKU: "",
                      agentPrice: 0,
                      retailPrice: 0,
                      wholesalePrice: 0,
                      minimumOrder: 1,
                      stock: 0,
                      commissionRate: agent?.commissionRate || 10,
                      status: 'pending',
                      warranty: "",
                      certificate: "",
                      specifications: {},
                      features: [],
                      uploadedPdf: undefined,
                      images: [],
                      videos: [],
                      notes: "",
                      tags: [],
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      reviewedBy: "",
                      reviewedAt: "",
                      rejectionReason: ""
                    });
                    setPdfFile(null);
                  }}
                >
                  إلغاء التعديل
                </Button>
              )}
              <Button onClick={handleSubmit}>
                {editingProduct ? "تحديث المنتج" : "إضافة المنتج"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// مكون حوار إدارة مبيعات الوكيل
function AgentSalesDialog({
  open,
  onOpenChange,
  agent,
  onSave,
  editingSale,
  setEditingSale
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: Agent | null;
  onSave: (sale: AgentSale, agentId: string) => void;
  editingSale: AgentSale | null;
  setEditingSale: (sale: AgentSale | null) => void;
}) {
  const [formData, setFormData] = useState<AgentSale>(
    editingSale || {
      id: "",
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      invoiceNumber: `INV-${Date.now().toString().slice(-8)}`,
      productId: "",
      productName: "",
      quantity: 1,
      unitPrice: 0,
      totalAmount: 0,
      commissionAmount: 0,
      commissionRate: agent?.commissionRate || 10,
      saleDate: new Date().toISOString(),
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'cash',
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerAddress: "",
      shippingAddress: "",
      trackingNumber: "",
      notes: "",
      attachments: []
    }
  );

  useEffect(() => {
    // حساب المبلغ الإجمالي تلقائياً
    const total = formData.quantity * formData.unitPrice;
    const commissionAmount = (total * formData.commissionRate) / 100;
    setFormData(prev => ({
      ...prev,
      totalAmount: total,
      commissionAmount
    }));
  }, [formData.quantity, formData.unitPrice, formData.commissionRate]);

  const handleSubmit = () => {
    if (!formData.customerName || !formData.quantity || !formData.unitPrice) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    onSave(formData, agent!.id);
    setFormData({
      id: "",
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      invoiceNumber: `INV-${Date.now().toString().slice(-8)}`,
      productId: "",
      productName: "",
      quantity: 1,
      unitPrice: 0,
      totalAmount: 0,
      commissionAmount: 0,
      commissionRate: agent?.commissionRate || 10,
      saleDate: new Date().toISOString(),
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'cash',
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerAddress: "",
      shippingAddress: "",
      trackingNumber: "",
      notes: "",
      attachments: []
    });
  };

  if (!agent) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {editingSale ? "تعديل عملية البيع" : "إضافة عملية بيع جديدة"}
            <div className="text-sm font-normal text-muted-foreground mt-1">
              للوكيل: {agent.name} ({agent.code})
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="orderId">رقم الطلب</Label>
              <Input
                id="orderId"
                value={formData.orderId}
                onChange={(e) => setFormData(prev => ({ ...prev, orderId: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="invoiceNumber">رقم الفاتورة</Label>
              <Input
                id="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="saleDate">تاريخ البيع</Label>
              <Input
                id="saleDate"
                type="date"
                value={formData.saleDate.split('T')[0]}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  saleDate: new Date(e.target.value).toISOString() 
                }))}
              />
            </div>
            <div>
              <Label htmlFor="deliveryDate">تاريخ التسليم المتوقع</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={formData.deliveryDate.split('T')[0]}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  deliveryDate: new Date(e.target.value).toISOString() 
                }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="productSelect">اختر المنتج</Label>
            <Select
              value={formData.productId}
              onValueChange={(value) => {
                const product = agent.products.find(p => p.productId === value);
                setFormData(prev => ({
                  ...prev,
                  productId: value,
                  productName: product?.productName || "",
                  unitPrice: product?.retailPrice || 0,
                  commissionRate: product?.commissionRate || agent.commissionRate
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر منتج" />
              </SelectTrigger>
              <SelectContent>
                {agent.products.map(product => (
                  <SelectItem key={product.id} value={product.productId}>
                    {product.productName} (${product.retailPrice})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="quantity">الكمية</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  quantity: parseInt(e.target.value) 
                }))}
              />
            </div>
            <div>
              <Label htmlFor="unitPrice">سعر الوحدة ($)</Label>
              <Input
                id="unitPrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  unitPrice: parseFloat(e.target.value) 
                }))}
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
                value={formData.commissionRate}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  commissionRate: parseFloat(e.target.value) 
                }))}
              />
            </div>
          </div>

          {/* معلومات العميل */}
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium">معلومات العميل</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">اسم العميل *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                  placeholder="اسم العميل الكامل"
                />
              </div>
              <div>
                <Label htmlFor="customerPhone">رقم هاتف العميل</Label>
                <Input
                  id="customerPhone"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                  placeholder="+966501234567"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="customerEmail">البريد الإلكتروني</Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                placeholder="customer@email.com"
              />
            </div>
            <div>
              <Label htmlFor="customerAddress">عنوان العميل</Label>
              <Textarea
                id="customerAddress"
                value={formData.customerAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, customerAddress: e.target.value }))}
                placeholder="عنوان العميل الكامل"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="shippingAddress">عنوان الشحن</Label>
              <Textarea
                id="shippingAddress"
                value={formData.shippingAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, shippingAddress: e.target.value }))}
                placeholder="عنوان الشحن (إذا كان مختلفاً)"
                rows={2}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="status">حالة الطلب</Label>
              <Select
                value={formData.status}
                onValueChange={(value: AgentSale['status']) => 
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="confirmed">تم التأكيد</SelectItem>
                  <SelectItem value="processing">قيد المعالجة</SelectItem>
                  <SelectItem value="shipped">تم الشحن</SelectItem>
                  <SelectItem value="delivered">تم التسليم</SelectItem>
                  <SelectItem value="cancelled">ملغي</SelectItem>
                  <SelectItem value="returned">مرتجع</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="paymentStatus">حالة الدفع</Label>
              <Select
                value={formData.paymentStatus}
                onValueChange={(value: AgentSale['paymentStatus']) => 
                  setFormData(prev => ({ ...prev, paymentStatus: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="partial">مدفوع جزئياً</SelectItem>
                  <SelectItem value="paid">مدفوع بالكامل</SelectItem>
                  <SelectItem value="overdue">متأخر</SelectItem>
                  <SelectItem value="refunded">مردود</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="paymentMethod">طريقة الدفع</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value: AgentSale['paymentMethod']) => 
                  setFormData(prev => ({ ...prev, paymentMethod: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الطريقة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">نقداً</SelectItem>
                  <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
                  <SelectItem value="credit_card">بطاقة ائتمان</SelectItem>
                  <SelectItem value="check">شيك</SelectItem>
                  <SelectItem value="online">دفع إلكتروني</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="trackingNumber">رقم التتبع</Label>
            <Input
              id="trackingNumber"
              value={formData.trackingNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, trackingNumber: e.target.value }))}
              placeholder="رقم تتبع الشحنة"
            />
          </div>

          <div>
            <Label htmlFor="notes">ملاحظات</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="ملاحظات إضافية حول الطلب"
              rows={3}
            />
          </div>

          {/* ملخص العملية */}
          <div className="bg-secondary/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">ملخص العملية</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>المبلغ الإجمالي:</div>
              <div className="font-bold">${formData.totalAmount.toFixed(2)}</div>
              <div>نسبة العمولة:</div>
              <div className="font-bold">{formData.commissionRate}%</div>
              <div>قيمة العمولة:</div>
              <div className="font-bold text-green-600">
                ${formData.commissionAmount.toFixed(2)}
              </div>
              <div>صافي المبلغ:</div>
              <div className="font-bold">
                ${(formData.totalAmount - formData.commissionAmount).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSubmit}>
            {editingSale ? "تحديث العملية" : "إضافة عملية البيع"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// مكون تقارير الوكيل
function AgentReports({
  agent,
  onBack
}: {
  agent: Agent;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            ← رجوع
          </Button>
          <div>
            <h2 className="text-2xl font-semibold">تقارير الوكيل: {agent.name}</h2>
            <p className="text-muted-foreground">{agent.code} • {agent.company}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            طباعة
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${agent.totalSales.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-1">
              {agent.growthRate >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-sm ${agent.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {agent.growthRate >= 0 ? '+' : ''}{agent.growthRate}%
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي العمولات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${agent.totalCommission.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              نسبة العمولة: {agent.commissionRate}%
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المستحقات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              ${agent.pendingCommission.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              ${agent.paidCommission.toLocaleString()} مدفوع
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">التقييم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agent.performance.rating}
              <span className="text-sm text-muted-foreground">/5</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {agent.performance.totalReviews} تقييم
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>تفاصيل المبيعات</CardTitle>
          </CardHeader>
          <CardContent>
            {agent.sales.length > 0 ? (
              <div className="space-y-4">
                {agent.sales.slice(0, 5).map(sale => (
                  <div key={sale.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{sale.productName}</div>
                        <div className="text-sm text-muted-foreground">
                          {sale.customerName} • {sale.orderId}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${sale.totalAmount}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={
                            sale.paymentStatus === 'paid' ? 'default' :
                            sale.paymentStatus === 'partial' ? 'outline' :
                            'destructive'
                          } className="text-xs">
                            {sale.paymentStatus === 'paid' ? 'مدفوع' :
                             sale.paymentStatus === 'partial' ? 'جزئي' :
                             sale.paymentStatus === 'overdue' ? 'متأخر' : 'قيد الانتظار'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {sale.status === 'delivered' ? 'تم التسليم' :
                             sale.status === 'shipped' ? 'تم الشحن' : 'قيد المعالجة'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm mt-2">
                      <span>الكمية: {sale.quantity}</span>
                      <span>العمولة: ${sale.commissionAmount}</span>
                      <span>{new Date(sale.saleDate).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                ))}
                {agent.sales.length > 5 && (
                  <div className="text-center pt-4">
                    <Button variant="outline">
                      عرض جميع المبيعات ({agent.sales.length})
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4" />
                لا توجد مبيعات مسجلة
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المنتجات</CardTitle>
          </CardHeader>
          <CardContent>
            {agent.products.length > 0 ? (
              <div className="space-y-4">
                {agent.products.slice(0, 5).map(product => (
                  <div key={product.id} className="border-b pb-4 last:border-0">
                    <div className="font-medium">{product.productName}</div>
                    <div className="text-sm text-muted-foreground">
                      {product.productType}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm">
                        سعر البيع: <strong>${product.retailPrice}</strong>
                      </div>
                      <Badge variant={
                        product.status === 'approved' ? 'default' :
                        product.status === 'rejected' ? 'destructive' : 'outline'
                      } className="text-xs">
                        {product.status === 'approved' ? 'معتمد' :
                         product.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                      </Badge>
                    </div>
                    {product.uploadedPdf && (
                      <div className="mt-2">
                        <a 
                          href={product.uploadedPdf.url} 
                          target="_blank"
                          className="text-primary hover:underline text-sm flex items-center gap-1"
                        >
                          <FileText className="w-4 h-4" />
                          عرض ملف PDF
                        </a>
                      </div>
                    )}
                  </div>
                ))}
                {agent.products.length > 5 && (
                  <div className="text-center pt-4">
                    <Button variant="outline">
                      عرض جميع المنتجات ({agent.products.length})
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-4" />
                لا توجد منتجات مضافة
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أداء المبيعات الشهري</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border rounded-lg">
              <div className="text-center">
                <BarChart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">مخططات المبيعات متاحة في النسخة المتقدمة</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">المبيعات هذا الشهر</div>
                <div className="font-bold">${agent.thisMonthSales.toLocaleString()}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">المبيعات الشهر الماضي</div>
                <div className="font-bold">${agent.lastMonthSales.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>معلومات الأداء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>معدل الرضا</span>
                <span className="font-bold">{agent.performance.satisfactionRate}%</span>
              </div>
              <Progress value={agent.performance.satisfactionRate} />
              
              <div className="flex justify-between items-center">
                <span>وقت الاستجابة</span>
                <span className="font-bold">{agent.performance.responseTime}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>عدد التقارير</span>
                <span className="font-bold">{agent.requests.length}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>آخر تسجيل دخول</span>
                <span className="font-bold">
                  {agent.lastLogin ? new Date(agent.lastLogin).toLocaleDateString('ar-SA') : 'لم يسجل'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ملفات PDF المرفوعة</CardTitle>
        </CardHeader>
        <CardContent>
          {agent.products.filter(p => p.uploadedPdf).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agent.products.filter(p => p.uploadedPdf).map(product => (
                <div key={product.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{product.productName}</div>
                      <div className="text-sm text-muted-foreground">{product.productType}</div>
                    </div>
                    <Badge variant="outline">{product.uploadedPdf?.filename}</Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => window.open(product.uploadedPdf?.url, '_blank')}
                    >
                      <Eye className="w-3 h-3" />
                      معاينة
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => window.open(product.uploadedPdf?.url, '_blank')}
                    >
                      <Download className="w-3 h-3" />
                      تحميل
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => navigator.clipboard.writeText(product.uploadedPdf?.url || '')}
                    >
                      <Copy className="w-3 h-3" />
                      نسخ الرابط
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    رفع: {new Date(product.uploadedPdf?.uploadedAt || '').toLocaleDateString('ar-SA')}
                    • الحجم: {(product.uploadedPdf?.size || 0) / 1024 / 1024} MB
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4" />
              لا توجد ملفات PDF مرفوعة
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}