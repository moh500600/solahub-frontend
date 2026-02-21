// app/admin/batteries/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
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
  BarChart3,
  Package,
  Globe,
  Shield,
  Zap,
  Battery as BatteryIcon,
  Thermometer,
  Tag,
  Calendar,
  CheckCircle,
  XCircle,
  MoreVertical,
  Phone,
  Mail,
  Building,
  User,
  MapPin,
  Star,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Save,
  Image as ImageIcon,
  FileText,
  Video,
  Settings,
  HelpCircle,
  DollarSign,
  Warehouse,
  Truck,
  Clock,
  Percent,
  Layers,
  Hash,
  Ruler,
  Weight,
  ThermometerSun,
  Wind,
  Snowflake,
  Flame,
  ShieldCheck,
  Wrench,
  FileQuestion,
  Tag as TagIcon,
  Hash as HashIcon,
  Box,
  AlertTriangle,
  Globe as GlobeIcon,
  Users,
  Award,
  Truck as TruckIcon,
  Shield as ShieldIcon,
  Package as PackageIcon,
  Battery,
  Zap as ZapIcon,
  Droplets,
  Cpu,
  Activity,
  Target,
  Gauge,
  RefreshCw,
  Power
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
import {
  STORAGE_KEY_BATTERY_MANUFACTURERS,
  STORAGE_KEY_BATTERIES,
  BatteryManufacturer,
  Battery as BatteryType,
  saveBatteryManufacturers,
  saveBatteries,
  loadBatteryManufacturers,
  loadBatteries,
  defaultBatteryManufacturers,
  defaultBatteries
} from "@/lib/battery-storage";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function BatteriesAdmin() {
  const [activeTab, setActiveTab] = useState("batteries");
  const [manufacturers, setManufacturers] = useState<BatteryManufacturer[]>([]);
  const [batteries, setBatteries] = useState<BatteryType[]>([]);
  const [filteredBatteries, setFilteredBatteries] = useState<BatteryType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isManufacturerDialogOpen, setIsManufacturerDialogOpen] = useState(false);
  const [editingBattery, setEditingBattery] = useState<BatteryType | null>(null);
  const [editingManufacturer, setEditingManufacturer] = useState<BatteryManufacturer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{type: 'battery' | 'manufacturer', id: string} | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // تحميل البيانات من localStorage عند تحميل الصفحة
  useEffect(() => {
    loadInitialData();
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = batteries;

    if (searchTerm) {
      filtered = filtered.filter(battery =>
        battery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        battery.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        battery.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getManufacturerName(battery.manufacturerId).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedManufacturer !== "all") {
      filtered = filtered.filter(battery => battery.manufacturerId === selectedManufacturer);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(battery => 
        statusFilter === "available" ? battery.available : !battery.available
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(battery => battery.type === typeFilter);
    }

    setFilteredBatteries(filtered);
  }, [batteries, searchTerm, selectedManufacturer, statusFilter, typeFilter]);

  const loadInitialData = () => {
    setIsLoading(true);
    try {
      const savedManufacturers = loadBatteryManufacturers();
      const savedBatteries = loadBatteries();

      if (savedManufacturers.length === 0) {
        setManufacturers(defaultBatteryManufacturers);
        saveBatteryManufacturers(defaultBatteryManufacturers);
      } else {
        setManufacturers(savedManufacturers);
      }
      
      if (savedBatteries.length === 0) {
        setBatteries(defaultBatteries);
        setFilteredBatteries(defaultBatteries);
        saveBatteries(defaultBatteries);
      } else {
        setBatteries(savedBatteries);
        setFilteredBatteries(savedBatteries);
      }
    } catch (error) {
      toast.error("حدث خطأ في تحميل البيانات");
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // دالة للحصول على اسم الشركة المصنعة
  const getManufacturerName = (manufacturerId: string) => {
    const manufacturer = manufacturers.find(m => m.id === manufacturerId);
    return manufacturer?.name || "غير معروف";
  };

  // دالة للحصول على معلومات الشركة المصنعة كاملة
  const getManufacturerInfo = (manufacturerId: string) => {
    return manufacturers.find(m => m.id === manufacturerId) || null;
  };

  // إضافة/تعديل شركة مصنعة
  const handleSaveManufacturer = (manufacturer: BatteryManufacturer) => {
    try {
      let updatedManufacturers;
      const manufacturerWithMeta = {
        ...manufacturer,
        updatedAt: new Date().toISOString(),
        updatedBy: "مدير النظام"
      };

      if (editingManufacturer) {
        updatedManufacturers = manufacturers.map(m => 
          m.id === manufacturer.id ? manufacturerWithMeta : m
        );
        toast.success("تم تحديث الشركة المصنعة بنجاح");
      } else {
        const newManufacturer = {
          ...manufacturerWithMeta,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          createdBy: "مدير النظام"
        };
        updatedManufacturers = [...manufacturers, newManufacturer];
        toast.success("تم إضافة الشركة المصنعة بنجاح");
      }
      
      setManufacturers(updatedManufacturers);
      saveBatteryManufacturers(updatedManufacturers);
      setIsManufacturerDialogOpen(false);
      setEditingManufacturer(null);
    } catch (error) {
      toast.error("حدث خطأ في حفظ بيانات الشركة");
    }
  };

  // إضافة/تعديل بطارية
  const handleSaveBattery = (battery: BatteryType) => {
    try {
      let updatedBatteries;
      const batteryWithMeta = {
        ...battery,
        updatedAt: new Date().toISOString(),
        updatedBy: "مدير النظام"
      };

      if (editingBattery) {
        updatedBatteries = batteries.map(b => b.id === battery.id ? batteryWithMeta : b);
        toast.success("تم تحديث البطارية بنجاح");
      } else {
        const newBattery = {
          ...batteryWithMeta,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          createdBy: "مدير النظام",
          sku: generateSKU(battery.manufacturerId, battery.type)
        };
        updatedBatteries = [...batteries, newBattery];
        toast.success("تم إضافة البطارية بنجاح");
      }
      
      setBatteries(updatedBatteries);
      saveBatteries(updatedBatteries);
      setIsDialogOpen(false);
      setEditingBattery(null);
    } catch (error) {
      toast.error("حدث خطأ في حفظ بيانات البطارية");
    }
  };

  const generateSKU = (manufacturerId: string, type: string) => {
    const prefix = manufacturers.find(m => m.id === manufacturerId)?.name.slice(0, 3).toUpperCase() || "BAT";
    const typeCode = type.slice(0, 3).toUpperCase();
    const random = Math.floor(1000 + Math.random() * 9000);
    const date = new Date().getFullYear().toString().slice(-2);
    return `${prefix}-${typeCode}-${date}-${random}`;
  };

  // تأكيد الحذف
  const confirmDelete = (type: 'battery' | 'manufacturer', id: string) => {
    setItemToDelete({ type, id });
    setDeleteDialogOpen(true);
  };

  // تنفيذ الحذف
  const handleDelete = () => {
    if (!itemToDelete) return;

    try {
      if (itemToDelete.type === 'manufacturer') {
        // التحقق من وجود منتجات مرتبطة
        const relatedProducts = batteries.filter(b => b.manufacturerId === itemToDelete.id);
        if (relatedProducts.length > 0) {
          toast.error("لا يمكن حذف الشركة لأنها مرتبطة بمنتجات");
          setDeleteDialogOpen(false);
          setItemToDelete(null);
          return;
        }

        const updated = manufacturers.filter(m => m.id !== itemToDelete.id);
        setManufacturers(updated);
        saveBatteryManufacturers(updated);
        toast.success("تم حذف الشركة المصنعة بنجاح");
      } else {
        const updated = batteries.filter(b => b.id !== itemToDelete.id);
        setBatteries(updated);
        saveBatteries(updated);
        toast.success("تم حذف البطارية بنجاح");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف");
    }

    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  // تصدير البيانات
  const exportData = (format: 'json' | 'csv' = 'json') => {
    try {
      const data = {
        manufacturers,
        batteries,
        exportedAt: new Date().toISOString(),
        exportedBy: "مدير النظام"
      };
      
      if (format === 'json') {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `batteries-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        const csvContent = convertToCSV(data);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `batteries-data-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
      
      toast.success(`تم تصدير البيانات بنجاح بصيغة ${format.toUpperCase()}`);
    } catch (error) {
      toast.error("حدث خطأ أثناء التصدير");
    }
  };

  const convertToCSV = (data: any) => {
    const headers = ['ID', 'SKU', 'Name', 'Manufacturer', 'Capacity (kWh)', 'Voltage (V)', 'Price ($)', 'Quantity', 'Status'];
    const rows = batteries.map(battery => [
      battery.id,
      battery.sku || '',
      battery.name,
      manufacturers.find(m => m.id === battery.manufacturerId)?.name || '',
      battery.capacity,
      battery.voltage,
      battery.price,
      battery.quantity,
      battery.available ? 'Available' : 'Out of Stock'
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  // استيراد البيانات
  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          
          if (file.name.endsWith('.csv')) {
            toast.info("تحويل CSV قيد التطوير");
          } else {
            const data = JSON.parse(content);
            
            if (data.manufacturers && data.batteries) {
              setManufacturers(data.manufacturers);
              setBatteries(data.batteries);
              saveBatteryManufacturers(data.manufacturers);
              saveBatteries(data.batteries);
              toast.success("تم استيراد البيانات بنجاح");
            } else {
              toast.error("ملف JSON غير صالح");
            }
          }
        } catch (error) {
          toast.error("خطأ في قراءة الملف");
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  };

  // عرض معاينة المنتجات
  const previewProducts = () => {
    window.open('/batteries', '_blank');
  };

  // الحصول على إحصائيات
  const getStats = () => {
    const totalBatteries = batteries.length;
    const availableBatteries = batteries.filter(b => b.available).length;
    const outOfStockBatteries = totalBatteries - availableBatteries;
    const totalQuantity = batteries.reduce((sum, battery) => sum + battery.quantity, 0);
    const totalValue = batteries.reduce((sum, battery) => {
      return sum + (battery.price * battery.quantity);
    }, 0);
    const totalCapacity = batteries.reduce((sum, battery) => sum + battery.capacity, 0);

    return { totalBatteries, availableBatteries, outOfStockBatteries, totalQuantity, totalValue, totalCapacity };
  };

  const stats = getStats();

  // إحصائيات الشركات المصنعة
  const getManufacturerStats = () => {
    const totalProductsByManufacturer = manufacturers.map(manufacturer => {
      const productCount = batteries.filter(b => b.manufacturerId === manufacturer.id).length;
      return {
        name: manufacturer.name,
        count: productCount,
        percentage: batteries.length > 0 ? (productCount / batteries.length) * 100 : 0
      };
    });

    return totalProductsByManufacturer;
  };

  const manufacturerStats = getManufacturerStats();

  // أنواع البطاريات
  const batteryTypes = [
    { value: "LiFePO4", label: "فوسفات حديد ليثيوم" },
    { value: "Lithium-ion", label: "ليثيوم أيون" },
    { value: "Lead-acid", label: "رصاص حمضي" },
    { value: "Gel", label: "جل" },
    { value: "AGM", label: "AGM" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* رأس الصفحة - تصميم محسن */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <BatteryIcon className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  لوحة تحكم البطاريات الشمسية
                </h1>
                <p className="text-muted-foreground">
                  إدارة كاملة لبطاريات الطاقة الشمسية والشركات المصنعة
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={previewProducts}
              className="gap-2 border-purple-500/20 hover:bg-purple-500/5"
            >
              <Eye className="w-4 h-4" />
              معاينة المتجر
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-purple-500/20 hover:bg-purple-500/5">
                  <Download className="w-4 h-4" />
                  تصدير
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => exportData('json')} className="cursor-pointer">
                  <FileText className="w-4 h-4 ml-2" />
                  JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportData('csv')} className="cursor-pointer">
                  <FileText className="w-4 h-4 ml-2" />
                  CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="outline" 
              onClick={importData}
              className="gap-2 border-purple-500/20 hover:bg-purple-500/5"
            >
              <Upload className="w-4 h-4" />
              استيراد
            </Button>
          </div>
        </div>

        {/* الإحصائيات - تصميم محسن */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">إجمالي البطاريات</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Battery className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-800">{stats.totalBatteries}</div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-2 bg-purple-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full" 
                    style={{ width: `${(stats.availableBatteries / stats.totalBatteries) * 100 || 0}%` }}
                  />
                </div>
                <span className="text-xs text-purple-600">{stats.availableBatteries} متوفر</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-white border-green-100 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-700">إجمالي السعة</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <Zap className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800">{stats.totalCapacity.toFixed(1)}</div>
              <p className="text-xs text-green-600 mt-1">
                كيلوواط ساعة
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">قيمة المخزون</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800">${stats.totalValue.toLocaleString()}</div>
              <p className="text-xs text-blue-600 mt-1">
                القيمة الإجمالية
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">الشركات المصنعة</CardTitle>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Building className="h-4 w-4 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-800">{manufacturers.length}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {manufacturerStats.slice(0, 3).map((stat, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-amber-50 text-amber-700">
                    {stat.name}: {stat.count}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* البحث والفلاتر - تصميم محسن */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="ابحث عن بطارية أو شركة مصنعة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 h-12 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
              <SelectTrigger className="w-[180px] h-12 rounded-lg border-gray-300">
                <SelectValue placeholder="الشركة المصنعة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الشركات</SelectItem>
                {manufacturers.map(manufacturer => (
                  <SelectItem key={manufacturer.id} value={manufacturer.id}>
                    <div className="flex items-center gap-2">
                      {manufacturer.image && (
                        <img src={manufacturer.image} alt={manufacturer.name} className="w-6 h-6 rounded-full" />
                      )}
                      <span>{manufacturer.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px] h-12 rounded-lg border-gray-300">
                <SelectValue placeholder="نوع البطارية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                {batteryTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] h-12 rounded-lg border-gray-300">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="available">متوفر</SelectItem>
                <SelectItem value="outofstock">غير متوفر</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedManufacturer("all");
                setStatusFilter("all");
                setTypeFilter("all");
              }}
              className="h-12 gap-2"
            >
              <Filter className="w-4 h-4" />
              إعادة تعيين
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-xl mb-6">
            <TabsTrigger 
              value="batteries" 
              className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <div className="p-1.5 bg-purple-500/10 rounded-lg">
                <Battery className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">البطاريات الشمسية</div>
                <div className="text-xs text-muted-foreground">{filteredBatteries.length} منتج</div>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="manufacturers" 
              className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Building className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">الشركات المصنعة</div>
                <div className="text-xs text-muted-foreground">{manufacturers.length} شركة</div>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* تبويب البطاريات */}
          <TabsContent value="batteries" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
              <div>
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Battery className="w-6 h-6 text-purple-600" />
                  إدارة البطاريات الشمسية
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  عرض {filteredBatteries.length} من أصل {batteries.length} بطارية
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setEditingBattery(null)}
                    className="gap-2 h-12 px-6 rounded-lg bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة بطارية
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <MultiStepBatteryForm
                    battery={editingBattery}
                    manufacturers={manufacturers}
                    onSave={handleSaveBattery}
                    onClose={() => setIsDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-transparent border-b border-gray-200">
                      <TableHead className="w-[80px] font-semibold text-gray-700">SKU</TableHead>
                      <TableHead className="w-[100px] font-semibold text-gray-700">الصورة</TableHead>
                      <TableHead className="font-semibold text-gray-700">الاسم والمواصفات</TableHead>
                      <TableHead className="w-[200px] font-semibold text-gray-700">الوكيل/الشركة المصنعة</TableHead>
                      <TableHead className="w-[100px] font-semibold text-gray-700">الأداء</TableHead>
                      <TableHead className="w-[100px] font-semibold text-gray-700">السعر</TableHead>
                      <TableHead className="w-[100px] font-semibold text-gray-700">المخزون</TableHead>
                      <TableHead className="w-[100px] font-semibold text-gray-700">الحالة</TableHead>
                      <TableHead className="w-[120px] font-semibold text-gray-700">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBatteries.map(battery => {
                      const manufacturer = getManufacturerInfo(battery.manufacturerId);
                      const batteryPower = battery.voltage * battery.capacity;
                      
                      return (
                        <TableRow key={battery.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                          <TableCell className="py-3">
                            <Badge variant="outline" className="font-mono text-xs bg-gray-50">
                              {battery.sku}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3">
                            {battery.images[0] && (
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                                <img 
                                  src={battery.images[0]} 
                                  alt={battery.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="py-3">
                            <div className="space-y-2">
                              <div className="font-medium text-gray-900">{battery.name}</div>
                              <div className="text-sm text-gray-600 line-clamp-2">
                                {battery.description}
                              </div>
                              <div className="flex gap-2 flex-wrap">
                                <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200">
                                  {battery.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {battery.capacity} kWh
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {battery.voltage}V
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-3">
                            {manufacturer ? (
                              <div className="space-y-2 p-3 border border-gray-200 rounded-lg bg-white">
                                <div className="flex items-center gap-2">
                                  {manufacturer.image && (
                                    <img 
                                      src={manufacturer.image} 
                                      alt={manufacturer.name}
                                      className="w-8 h-8 rounded-full border border-gray-300"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <div className="font-medium flex items-center gap-1 text-sm">
                                      <Building className="w-3 h-3" />
                                      {manufacturer.name}
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                      <Globe className="w-3 h-3" />
                                      {manufacturer.country}
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-1 text-xs">
                                  {manufacturer.rating && (
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                      <span className="font-medium">{manufacturer.rating}/5</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center text-gray-500 text-sm p-3 border border-gray-200 rounded-lg bg-gray-50">
                                <User className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                                <div>شركة غير معروفة</div>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="py-3">
                            <div className="space-y-2">
                              <div className="flex items-center gap-1">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                <span className="font-medium text-gray-900">{batteryPower.toLocaleString()} Wh</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Activity className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-gray-600">{battery.efficiency}% كفاءة</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <RefreshCw className="w-4 h-4 text-blue-500" />
                                <span className="text-xs text-gray-600">{battery.cycleLife} دورة</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-3">
                            <div className="space-y-2">
                              <div className="font-medium text-gray-900">
                                ${battery.price?.toLocaleString()}
                              </div>
                              {battery.discount > 0 && (
                                <Badge variant="destructive" className="text-xs bg-red-50 text-red-700 hover:bg-red-100">
                                  خصم {battery.discount}%
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="py-3">
                            <div className="space-y-2">
                              <div className="font-medium text-gray-900">{battery.quantity.toLocaleString()}</div>
                              {battery.quantity <= (battery.inventory?.reorderPoint || 10) && (
                                <Badge variant="outline" className="text-xs border-amber-200 text-amber-700 bg-amber-50">
                                  بحاجة لإعادة طلب
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="py-3">
                            <div className="flex items-center gap-2">
                              {battery.available ? (
                                <>
                                  <div className="p-1 bg-green-100 rounded-full">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  </div>
                                  <Badge variant="default" className="bg-green-50 text-green-700 hover:bg-green-100 border border-green-200">
                                    متوفر
                                  </Badge>
                                </>
                              ) : (
                                <>
                                  <div className="p-1 bg-red-100 rounded-full">
                                    <XCircle className="w-4 h-4 text-red-600" />
                                  </div>
                                  <Badge variant="outline" className="text-red-600 bg-red-50 border-red-200">
                                    غير متوفر
                                  </Badge>
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="py-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setEditingBattery(battery);
                                    setIsDialogOpen(true);
                                  }}
                                  className="cursor-pointer"
                                >
                                  <Edit className="w-4 h-4 ml-2" />
                                  تعديل
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => confirmDelete('battery', battery.id)}
                                  className="cursor-pointer text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 ml-2" />
                                  حذف
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => {
                                    navigator.clipboard.writeText(battery.id);
                                    toast.success("تم نسخ المعرف");
                                  }}
                                  className="cursor-pointer"
                                >
                                  نسخ المعرف
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                
                {filteredBatteries.length === 0 && (
                  <div className="text-center py-16">
                    <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                      <Battery className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">لا توجد بطاريات</h3>
                    <p className="text-gray-500 mt-2 mb-6 max-w-md mx-auto">
                      {searchTerm ? "لم يتم العثور على نتائج للبحث المحدد" : "ابدأ بإضافة أول بطارية إلى المخزون"}
                    </p>
                    <Button
                      onClick={() => {
                        setEditingBattery(null);
                        setIsDialogOpen(true);
                      }}
                      className="gap-2 bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة بطارية جديدة
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* تبويب الشركات المصنعة */}
          <TabsContent value="manufacturers" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
              <div>
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Building className="w-6 h-6 text-blue-600" />
                  إدارة شركات تصنيع البطاريات
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  إدارة وتنظيم الشركات المصنعة للبطاريات الشمسية
                </p>
              </div>
              <Dialog open={isManufacturerDialogOpen} onOpenChange={setIsManufacturerDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setEditingManufacturer(null)}
                    className="gap-2 h-12 px-6 rounded-lg bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة شركة مصنعة
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <BatteryManufacturerForm
                    manufacturer={editingManufacturer}
                    onSave={handleSaveManufacturer}
                    onClose={() => setIsManufacturerDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {manufacturers.map(manufacturer => {
                const relatedProducts = batteries.filter(b => b.manufacturerId === manufacturer.id);
                return (
                  <Card key={manufacturer.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200">
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      {manufacturer.image ? (
                        <img
                          src={manufacturer.image}
                          alt={manufacturer.name}
                          className="w-full h-full object-contain p-4"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                          <Globe className="w-3 h-3 ml-1" />
                          {manufacturer.country}
                        </Badge>
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                          {relatedProducts.length} منتج
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">{manufacturer.name}</h3>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{manufacturer.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {manufacturer.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {manufacturer.certifications?.slice(0, 2).map((cert, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            <Shield className="w-3 h-3 ml-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-2 mb-4 text-sm text-gray-600">
                        {manufacturer.contact?.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span className="truncate">{manufacturer.contact.email}</span>
                          </div>
                        )}
                        {manufacturer.contact?.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{manufacturer.contact.phone}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                          onClick={() => {
                            setEditingManufacturer(manufacturer);
                            setIsManufacturerDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                          تعديل
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-1 border-red-200 text-red-700 hover:bg-red-50"
                          onClick={() => confirmDelete('manufacturer', manufacturer.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          حذف
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {manufacturers.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                  <Building className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">لا توجد شركات مصنعة</h3>
                <p className="text-gray-500 mt-2 mb-6 max-w-md mx-auto">
                  ابدأ بإضافة أول شركة مصنعة للبطاريات الشمسية
                </p>
                <Button
                  onClick={() => {
                    setEditingManufacturer(null);
                    setIsManufacturerDialogOpen(true);
                  }}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  إضافة شركة مصنعة جديدة
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* حوار تأكيد الحذف */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <AlertDialogTitle className="text-xl">تأكيد الحذف</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-600">
              {itemToDelete?.type === 'manufacturer' 
                ? "هل أنت متأكد من حذف هذه الشركة المصنعة؟ سيتم حذف جميع المعلومات المرتبطة بها ولا يمكن التراجع عن هذا الإجراء."
                : "هل أنت متأكد من حذف هذه البطارية؟ لا يمكن التراجع عن هذا الإجراء."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2">
            <AlertDialogCancel 
              onClick={() => setItemToDelete(null)}
              className="flex-1 border-gray-300 hover:bg-gray-50"
            >
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white hover:bg-red-700"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// مكون نموذج متعدد المراحل لإضافة/تعديل بطارية
function MultiStepBatteryForm({
  battery,
  manufacturers,
  onSave,
  onClose,
}: {
  battery: BatteryType | null;
  manufacturers: BatteryManufacturer[];
  onSave: (battery: BatteryType) => void;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  
  const [formData, setFormData] = useState<BatteryType>(
    battery || {
      id: Date.now().toString(),
      name: "",
      manufacturerId: manufacturers[0]?.id || "",
      description: "",
      type: "LiFePO4",
      capacity: 0,
      voltage: 12,
      power: 0,
      cycleLife: 0,
      depthOfDischarge: 80,
      efficiency: 0,
      weight: 0,
      dimensions: "",
      temperatureRange: "",
      warranty: "",
      price: 0,
      discount: 0,
      available: true,
      quantity: 0,
      images: [],
      features: [],
      specifications: {},
      technicalSpecs: {
        chemistry: "LiFePO4",
        cellCount: 16,
        dimensions: {
          length: 0,
          width: 0,
          thickness: 0,
          weight: 0
        },
        temperatureCoefficient: {
          voltage: -0.3,
          capacity: -0.5
        },
        maxChargeVoltage: 14.6,
        minDischargeVoltage: 10,
        maxChargeCurrent: 50,
        maxDischargeCurrent: 100,
        internalResistance: 20,
        selfDischargeRate: 3
      },
      performance: {
        nominalCapacity: 0,
        actualCapacity: 0,
        nominalVoltage: 12,
        peakPower: 0,
        energyDensity: 0,
        powerDensity: 0,
        chargeEfficiency: 95,
        dischargeEfficiency: 92,
        temperatureRange: {
          operating: "-20°C to 50°C",
          storage: "-30°C to 60°C",
          charging: "0°C to 45°C"
        },
        cycleLifeAtDOD: [
          { depth: 100, cycles: 3000 },
          { depth: 80, cycles: 5000 },
          { depth: 50, cycles: 8000 }
        ]
      },
      certifications: [],
      warrantyInfo: {
        product: 5,
        performance: 5,
        cycleLife: 3000,
        details: ""
      },
      pricing: {
        basePrice: 0,
        wholesalePrice: 0,
        retailPrice: 0,
        taxRate: 15,
        currency: "USD",
        minimumOrder: 1,
        bulkDiscounts: []
      },
      inventory: {
        sku: "",
        barcode: "",
        warehouseLocation: "",
        reorderPoint: 10,
        safetyStock: 5,
        leadTime: 14,
        supplierInfo: {
          name: "",
          contact: "",
          deliveryTime: 0
        }
      },
      videos: [],
      documents: [],
      applications: [],
      accessories: [],
      installationTime: "",
      maintenanceServices: [],
      maintenancePackages: [],
      faqs: [],
      relatedBatteries: [],
      rating: 0,
      reviews: 0,
      tags: [],
      createdAt: new Date().toISOString()
    }
  );

  // حالات إضافية
  const [newImage, setNewImage] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newVideo, setNewVideo] = useState({ title: "", url: "" });
  const [newDocument, setNewDocument] = useState({ name: "", url: "", type: "technical" as "technical" | "manual" | "warranty" | "certificate" | "safety" });
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [newTag, setNewTag] = useState("");
  const [bulkDiscount, setBulkDiscount] = useState({ quantity: 0, discount: 0 });
  const [newAccessory, setNewAccessory] = useState("");
  const [newMaintenanceService, setNewMaintenanceService] = useState("");
  const [newMaintenancePackage, setNewMaintenancePackage] = useState("");
  const [newApplication, setNewApplication] = useState("");
  const [cycleLifeEntry, setCycleLifeEntry] = useState({ depth: 80, cycles: 3000 });

  const selectedManufacturer = manufacturers.find(m => m.id === formData.manufacturerId);

  // حساب الطاقة تلقائياً
  useEffect(() => {
    const power = formData.voltage * formData.capacity;
    setFormData(prev => ({ ...prev, power }));
  }, [formData.voltage, formData.capacity]);

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedImages: string[] = [];
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        uploadedImages.push(imageData);
        
        if (uploadedImages.length === files.length) {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...uploadedImages]
          }));
          toast.success(`تم إضافة ${files.length} صورة`);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature]
      }));
      setNewFeature("");
      toast.success("تمت إضافة الميزة");
    }
  };

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification]
      }));
      setNewCertification("");
      toast.success("تمت إضافة الشهادة");
    }
  };

  const handleAddVideo = () => {
    if (newVideo.title.trim() && newVideo.url.trim()) {
      setFormData(prev => ({
        ...prev,
        videos: [...prev.videos, newVideo]
      }));
      setNewVideo({ title: "", url: "" });
      toast.success("تمت إضافة الفيديو");
    }
  };

  const handleAddDocument = () => {
    if (newDocument.name.trim() && newDocument.url.trim()) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, newDocument]
      }));
      setNewDocument({ name: "", url: "", type: "technical" });
      toast.success("تمت إضافة المستند");
    }
  };

  const handleAddFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      setFormData(prev => ({
        ...prev,
        faqs: [...prev.faqs, newFaq]
      }));
      setNewFaq({ question: "", answer: "" });
      toast.success("تمت إضافة السؤال الشائع");
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag]
      }));
      setNewTag("");
      toast.success("تمت إضافة العلامة");
    }
  };

  const handleAddBulkDiscount = () => {
    if (bulkDiscount.quantity > 0 && bulkDiscount.discount > 0) {
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing!,
          bulkDiscounts: [...(prev.pricing?.bulkDiscounts || []), bulkDiscount]
        }
      }));
      setBulkDiscount({ quantity: 0, discount: 0 });
      toast.success("تمت إضافة خصم الكمية");
    }
  };

  const handleAddAccessory = () => {
    if (newAccessory.trim()) {
      setFormData(prev => ({
        ...prev,
        accessories: [...prev.accessories, newAccessory]
      }));
      setNewAccessory("");
      toast.success("تمت إضافة الملحق");
    }
  };

  const handleAddMaintenanceService = () => {
    if (newMaintenanceService.trim()) {
      setFormData(prev => ({
        ...prev,
        maintenanceServices: [...prev.maintenanceServices, newMaintenanceService]
      }));
      setNewMaintenanceService("");
      toast.success("تمت إضافة خدمة الصيانة");
    }
  };

  const handleAddMaintenancePackage = () => {
    if (newMaintenancePackage.trim()) {
      setFormData(prev => ({
        ...prev,
        maintenancePackages: [...prev.maintenancePackages, newMaintenancePackage]
      }));
      setNewMaintenancePackage("");
      toast.success("تمت إضافة باقة الصيانة");
    }
  };

  const handleAddApplication = () => {
    if (newApplication.trim()) {
      setFormData(prev => ({
        ...prev,
        applications: [...prev.applications, newApplication]
      }));
      setNewApplication("");
      toast.success("تمت إضافة مجال الاستخدام");
    }
  };

  const handleAddCycleLifeEntry = () => {
    if (cycleLifeEntry.depth > 0 && cycleLifeEntry.cycles > 0) {
      setFormData(prev => ({
        ...prev,
        performance: {
          ...prev.performance!,
          cycleLifeAtDOD: [...(prev.performance?.cycleLifeAtDOD || []), cycleLifeEntry]
        }
      }));
      setCycleLifeEntry({ depth: 80, cycles: 3000 });
      toast.success("تمت إضافة دورة الحياة");
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: // المعلومات الأساسية
        if (!formData.name || !formData.manufacturerId || !formData.capacity || !formData.voltage) {
          toast.error("يرجى ملء جميع الحقول المطلوبة في المعلومات الأساسية");
          return false;
        }
        break;
      case 2: // المواصفات الفنية
        if (!formData.technicalSpecs?.chemistry || !formData.type) {
          toast.error("يرجى إدخال الكيمياء ونوع البطارية");
          return false;
        }
        break;
      case 3: // التسعير والمخزون
        if (!formData.pricing?.basePrice || formData.quantity <= 0) {
          toast.error("يرجى إدخال السعر الأساسي والكمية");
          return false;
        }
        break;
      case 4: // الوسائط
        if (formData.images.length === 0) {
          toast.error("يرجى إضافة صورة واحدة على الأقل للمنتج");
          return false;
        }
        break;
      case 5: // الدعم والضمان
        if (!formData.warrantyInfo?.product || !formData.warrantyInfo?.performance) {
          toast.error("يرجى إدخال فترة الضمان");
          return false;
        }
        break;
      case 6: // الإعدادات المتقدمة
        if (!formData.sku || !formData.inventory?.warehouseLocation) {
          toast.error("يرجى إدخال SKU وموقع المستودع");
          return false;
        }
        break;
    }
    return true;
  };

  const steps = [
    { id: 1, title: "معلومات أساسية", icon: <Battery className="w-4 h-4" />, description: "البيانات الأساسية للبطارية" },
    { id: 2, title: "مواصفات فنية", icon: <Cpu className="w-4 h-4" />, description: "المواصفات التقنية للبطارية" },
    { id: 3, title: "التسعير والمخزون", icon: <DollarSign className="w-4 h-4" />, description: "التسعير والمخزون" },
    { id: 4, title: "الوسائط", icon: <ImageIcon className="w-4 h-4" />, description: "الصور والفيديوهات" },
    { id: 5, title: "الدعم والضمان", icon: <Shield className="w-4 h-4" />, description: "الضمان والدعم" },
    { id: 6, title: "إعدادات متقدمة", icon: <Settings className="w-4 h-4" />, description: "إعدادات إضافية" },
    { id: 7, title: "مراجعة وحفظ", icon: <Save className="w-4 h-4" />, description: "مراجعة النهائية" }
  ];

  const progressPercentage = (currentStep / totalSteps) * 100;

  const batteryTypes = [
    { value: "LiFePO4", label: "فوسفات حديد ليثيوم (LiFePO4)" },
    { value: "Lithium-ion", label: "ليثيوم أيون (Lithium-ion)" },
    { value: "NMC", label: "نيكل منجنيز كوبالت (NMC)" },
    { value: "LTO", label: "ليثيوم تيتانيوم (LTO)" },
    { value: "Lead-acid", label: "رصاص حمضي (Lead-acid)" },
    { value: "Gel", label: "جل (Gel)" },
    { value: "AGM", label: "AGM" }
  ];

  const chemistryTypes = [
    { value: "LiFePO4", label: "فوسفات حديد ليثيوم" },
    { value: "NMC", label: "نيكل منجنيز كوبالت" },
    { value: "LCO", label: "ليثيوم كوبالت أكسيد" },
    { value: "LMO", label: "ليثيوم منجنيز أكسيد" },
    { value: "NCA", label: "نيكل كوبالت ألومنيوم" },
    { value: "LTO", label: "ليثيوم تيتانيوم" }
  ];

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-xl flex items-center gap-2">
          {battery ? "تعديل بطارية" : "إضافة بطارية جديدة"}
          <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-700">
            المرحلة {currentStep} من {totalSteps}
          </Badge>
        </DialogTitle>
        <DialogDescription>
          نظام متعدد المراحل لإضافة البطاريات - {steps[currentStep - 1]?.description}
        </DialogDescription>
      </DialogHeader>

      {/* شريط التقدم */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">التقدم: {Math.round(progressPercentage)}%</span>
          <span className="text-muted-foreground">المرحلة {currentStep} من {totalSteps}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        
        {/* خطوات التنقل */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${step.id === currentStep ? 'text-purple-600' : step.id < currentStep ? 'text-green-600' : 'text-muted-foreground'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step.id === currentStep ? 'bg-purple-600 text-white border-purple-600' : step.id < currentStep ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 border-gray-200'}`}>
                  {step.id < currentStep ? <CheckCircle className="w-4 h-4" /> : step.icon}
                </div>
                <span className="text-xs mt-1">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      {/* محتوى المراحل */}
      <div className="space-y-6">
        {/* المرحلة 1: المعلومات الأساسية */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-1">
                    <Battery className="w-4 h-4" />
                    اسم البطارية *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="مثال: بطارية ليثيوم 100Ah 12V"
                    className="h-11"
                  />
                </div>

                <div>
                  <Label htmlFor="manufacturer" className="flex items-center gap-2 mb-1">
                    <Building className="w-4 h-4" />
                    الشركة المصنعة / الوكيل *
                  </Label>
                  <Select
                    value={formData.manufacturerId}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, manufacturerId: value }))}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="اختر شركة مصنعة" />
                    </SelectTrigger>
                    <SelectContent>
                      {manufacturers.map(m => (
                        <SelectItem key={m.id} value={m.id}>
                          <div className="flex items-center gap-2">
                            {m.image && (
                              <img src={m.image} alt={m.name} className="w-6 h-6 rounded-full" />
                            )}
                            <div>
                              <div>{m.name}</div>
                              <div className="text-xs text-muted-foreground">{m.country}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedManufacturer && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="font-medium text-blue-800">معلومات الوكيل المختار:</div>
                      <div className="text-sm mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          <span>{selectedManufacturer.contact?.phone || "غير متوفر"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          <span>{selectedManufacturer.contact?.email || "غير متوفر"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3" />
                          <span>{selectedManufacturer.country}</span>
                        </div>
                        {selectedManufacturer.rating && (
                          <div className="flex items-center gap-2">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span>التقييم: {selectedManufacturer.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="type" className="flex items-center gap-2 mb-1">
                    <Cpu className="w-4 h-4" />
                    نوع البطارية *
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="اختر نوع البطارية" />
                    </SelectTrigger>
                    <SelectContent>
                      {batteryTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="description" className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4" />
                    الوصف *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="وصف مفصل للبطارية، المميزات، الاستخدامات..."
                    rows={8}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="capacity" className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4" />
                  السعة (Ah) *
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseFloat(e.target.value) }))}
                  className="h-11"
                />
              </div>
              
              <div>
                <Label htmlFor="voltage" className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4" />
                  الجهد (V) *
                </Label>
                <Input
                  id="voltage"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.voltage}
                  onChange={(e) => setFormData(prev => ({ ...prev, voltage: parseFloat(e.target.value) }))}
                  className="h-11"
                />
              </div>
              
              <div>
                <Label htmlFor="power" className="flex items-center gap-2 mb-1">
                  <Power className="w-4 h-4" />
                  الطاقة (Wh)
                </Label>
                <Input
                  id="power"
                  type="number"
                  min="0"
                  value={formData.power}
                  readOnly
                  className="h-11 bg-muted"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.power.toLocaleString()} واط ساعة
                </p>
              </div>
              
              <div>
                <Label htmlFor="cycleLife" className="flex items-center gap-2 mb-1">
                  <RefreshCw className="w-4 h-4" />
                  دورات الحياة
                </Label>
                <Input
                  id="cycleLife"
                  type="number"
                  min="0"
                  value={formData.cycleLife}
                  onChange={(e) => setFormData(prev => ({ ...prev, cycleLife: parseInt(e.target.value) }))}
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="efficiency" className="flex items-center gap-2 mb-1">
                  <Gauge className="w-4 h-4" />
                  الكفاءة (%)
                </Label>
                <Input
                  id="efficiency"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.efficiency}
                  onChange={(e) => setFormData(prev => ({ ...prev, efficiency: parseFloat(e.target.value) }))}
                  className="h-11"
                />
              </div>
              
              <div>
                <Label htmlFor="depthOfDischarge" className="flex items-center gap-2 mb-1">
                  <Droplets className="w-4 h-4" />
                  عمق التفريغ (%)
                </Label>
                <Input
                  id="depthOfDischarge"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.depthOfDischarge}
                  onChange={(e) => setFormData(prev => ({ ...prev, depthOfDischarge: parseFloat(e.target.value) }))}
                  className="h-11"
                />
              </div>
              
              <div>
                <Label htmlFor="weight" className="flex items-center gap-2 mb-1">
                  <Weight className="w-4 h-4" />
                  الوزن (كجم)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
                  className="h-11"
                />
              </div>
              
              <div>
                <Label htmlFor="dimensions" className="flex items-center gap-2 mb-1">
                  <Ruler className="w-4 h-4" />
                  الأبعاد
                </Label>
                <Input
                  id="dimensions"
                  value={formData.dimensions}
                  onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                  placeholder="50×30×20 سم"
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="temperatureRange" className="flex items-center gap-2 mb-1">
                  <Thermometer className="w-4 h-4" />
                  مدى درجة الحرارة
                </Label>
                <Input
                  id="temperatureRange"
                  value={formData.temperatureRange}
                  onChange={(e) => setFormData(prev => ({ ...prev, temperatureRange: e.target.value }))}
                  placeholder="-20°C إلى 50°C"
                  className="h-11"
                />
              </div>
              
              <div>
                <Label htmlFor="warranty" className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4" />
                  فترة الضمان
                </Label>
                <Input
                  id="warranty"
                  value={formData.warranty}
                  onChange={(e) => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
                  placeholder="5 سنوات"
                  className="h-11"
                />
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4" />
                الميزات الرئيسية
              </Label>
              <div className="space-y-2">
                {formData.features.map((feature, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-secondary p-3 rounded">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        features: prev.features.filter((_, i) => i !== idx)
                      }))}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="أضف ميزة جديدة"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                    className="h-11"
                  />
                  <Button onClick={handleAddFeature} size="sm" className="gap-2 h-11">
                    <Plus className="w-4 h-4" />
                    إضافة
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="available"
                checked={formData.available}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, available: checked }))}
              />
              <Label htmlFor="available" className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                البطارية متوفرة
              </Label>
            </div>
          </div>
        )}

        {/* المرحلة 2: المواصفات الفنية */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <Cpu className="w-4 h-4" />
                    كيمياء البطارية *
                  </Label>
                  <Select
                    value={formData.technicalSpecs?.chemistry}
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      technicalSpecs: { ...prev.technicalSpecs!, chemistry: value }
                    }))}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="اختر كيمياء البطارية" />
                    </SelectTrigger>
                    <SelectContent>
                      {chemistryTypes.map(chem => (
                        <SelectItem key={chem.value} value={chem.value}>
                          {chem.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <HashIcon className="w-4 h-4" />
                    عدد الخلايا
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.technicalSpecs?.cellCount || 0}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      technicalSpecs: { ...prev.technicalSpecs!, cellCount: parseInt(e.target.value) }
                    }))}
                    className="h-11"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <ThermometerSun className="w-4 h-4" />
                    معامل درجة الحرارة
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">الجهد %/°C</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.technicalSpecs?.temperatureCoefficient?.voltage || 0}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          technicalSpecs: {
                            ...prev.technicalSpecs!,
                            temperatureCoefficient: {
                              ...prev.technicalSpecs!.temperatureCoefficient,
                              voltage: parseFloat(e.target.value)
                            }
                          }
                        }))}
                        className="h-11"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">السعة %/°C</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.technicalSpecs?.temperatureCoefficient?.capacity || 0}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          technicalSpecs: {
                            ...prev.technicalSpecs!,
                            temperatureCoefficient: {
                              ...prev.technicalSpecs!.temperatureCoefficient,
                              capacity: parseFloat(e.target.value)
                            }
                          }
                        }))}
                        className="h-11"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <Ruler className="w-4 h-4" />
                    الأبعاد (مم)
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">الطول</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.technicalSpecs?.dimensions?.length || 0}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          technicalSpecs: {
                            ...prev.technicalSpecs!,
                            dimensions: { ...prev.technicalSpecs!.dimensions, length: parseFloat(e.target.value) }
                          }
                        }))}
                        className="h-11"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">العرض</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.technicalSpecs?.dimensions?.width || 0}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          technicalSpecs: {
                            ...prev.technicalSpecs!,
                            dimensions: { ...prev.technicalSpecs!.dimensions, width: parseFloat(e.target.value) }
                          }
                        }))}
                        className="h-11"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <Weight className="w-4 h-4" />
                    الوزن (كجم) *
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.technicalSpecs?.dimensions?.weight || 0}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      technicalSpecs: {
                        ...prev.technicalSpecs!,
                        dimensions: { ...prev.technicalSpecs!.dimensions, weight: parseFloat(e.target.value) }
                      }
                    }))}
                    className="h-11"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4" />
                    مقاومة داخلية (ملي أوم)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.technicalSpecs?.internalResistance || 0}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      technicalSpecs: { ...prev.technicalSpecs!, internalResistance: parseFloat(e.target.value) }
                    }))}
                    className="h-11"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4" />
                    جهد الشحن الأقصى (V)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.technicalSpecs?.maxChargeVoltage || 0}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      technicalSpecs: { ...prev.technicalSpecs!, maxChargeVoltage: parseFloat(e.target.value) }
                    }))}
                    className="h-11"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4" />
                    جهد التفريغ الأدنى (V)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.technicalSpecs?.minDischargeVoltage || 0}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      technicalSpecs: { ...prev.technicalSpecs!, minDischargeVoltage: parseFloat(e.target.value) }
                    }))}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <Power className="w-4 h-4" />
                    تيار الشحن الأقصى (A)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.technicalSpecs?.maxChargeCurrent || 0}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      technicalSpecs: { ...prev.technicalSpecs!, maxChargeCurrent: parseFloat(e.target.value) }
                    }))}
                    className="h-11"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <Power className="w-4 h-4" />
                    تيار التفريغ الأقصى (A)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.technicalSpecs?.maxDischargeCurrent || 0}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      technicalSpecs: { ...prev.technicalSpecs!, maxDischargeCurrent: parseFloat(e.target.value) }
                    }))}
                    className="h-11"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4" />
                الشهادات
              </Label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {formData.certifications.map((cert, idx) => (
                    <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                      {cert}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          certifications: prev.certifications.filter((_, i) => i !== idx)
                        }))}
                      >
                        ✕
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    placeholder="أضف شهادة (مثل: UL 1973)"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCertification()}
                    className="h-11"
                  />
                  <Button onClick={handleAddCertification} size="sm" className="gap-2 h-11">
                    <Plus className="w-4 h-4" />
                    إضافة
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4" />
                مجالات الاستخدام
              </Label>
              <div className="space-y-2">
                {formData.applications.map((app, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-secondary p-3 rounded">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{app}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        applications: prev.applications.filter((_, i) => i !== idx)
                      }))}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={newApplication}
                    onChange={(e) => setNewApplication(e.target.value)}
                    placeholder="أضف مجال استخدام"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddApplication()}
                    className="h-11"
                  />
                  <Button onClick={handleAddApplication} size="sm" className="gap-2 h-11">
                    <Plus className="w-4 h-4" />
                    إضافة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* المرحلة 3: التسعير والمخزون */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4" />
                  السعر الأساسي ($) *
                </Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.pricing?.basePrice || 0}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    pricing: { ...prev.pricing!, basePrice: parseFloat(e.target.value) }
                  }))}
                  className="h-11"
                />
              </div>
              
              <div>
                <Label className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4" />
                  سعر الجملة ($)
                </Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.pricing?.wholesalePrice || 0}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    pricing: { ...prev.pricing!, wholesalePrice: parseFloat(e.target.value) }
                  }))}
                  className="h-11"
                />
              </div>
              
              <div>
                <Label className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4" />
                  سعر التجزئة ($)
                </Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.pricing?.retailPrice || 0}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    pricing: { ...prev.pricing!, retailPrice: parseFloat(e.target.value) }
                  }))}
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="flex items-center gap-2 mb-1">
                  <Percent className="w-4 h-4" />
                  معدل الضريبة (%)
                </Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.pricing?.taxRate || 0}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    pricing: { ...prev.pricing!, taxRate: parseFloat(e.target.value) }
                  }))}
                  className="h-11"
                />
              </div>
              
              <div>
                <Label className="flex items-center gap-2 mb-1">
                  <Box className="w-4 h-4" />
                  الحد الأدنى للطلب
                </Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.pricing?.minimumOrder || 1}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    pricing: { ...prev.pricing!, minimumOrder: parseInt(e.target.value) }
                  }))}
                  className="h-11"
                />
              </div>
              
              <div>
                <Label className="flex items-center gap-2 mb-1">
                  <Globe className="w-4 h-4" />
                  العملة
                </Label>
                <Select
                  value={formData.pricing?.currency || "USD"}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    pricing: { ...prev.pricing!, currency: value }
                  }))}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="اختر العملة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                    <SelectItem value="EUR">يورو (EUR)</SelectItem>
                    <SelectItem value="GBP">جنيه إسترليني (GBP)</SelectItem>
                    <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                    <SelectItem value="AED">درهم إماراتي (AED)</SelectItem>
                    <SelectItem value="QAR">ريال قطري (QAR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4" />
                خصومات الكميات
              </Label>
              <div className="space-y-2">
                {formData.pricing?.bulkDiscounts?.map((discount, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-secondary p-3 rounded">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-sm font-medium">الكمية: {discount.quantity}+</div>
                        <div className="text-xs text-muted-foreground">خصم: {discount.discount}%</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        pricing: {
                          ...prev.pricing!,
                          bulkDiscounts: prev.pricing?.bulkDiscounts?.filter((_, i) => i !== idx) || []
                        }
                      }))}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="الكمية"
                    value={bulkDiscount.quantity}
                    onChange={(e) => setBulkDiscount(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                    className="h-11"
                  />
                  <Input
                    type="number"
                    placeholder="الخصم %"
                    value={bulkDiscount.discount}
                    onChange={(e) => setBulkDiscount(prev => ({ ...prev, discount: parseFloat(e.target.value) }))}
                    className="h-11"
                  />
                  <Button onClick={handleAddBulkDiscount} size="sm" className="gap-2 h-11">
                    <Plus className="w-4 h-4" />
                    إضافة خصم
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <Warehouse className="w-4 h-4" />
                    موقع المستودع
                  </Label>
                  <Input
                    value={formData.inventory?.warehouseLocation || ""}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      inventory: { ...prev.inventory!, warehouseLocation: e.target.value }
                    }))}
                    placeholder="مثال: WH-B1-45"
                    className="h-11"
                  />
                </div>
                
                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    نقطة إعادة الطلب
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.inventory?.reorderPoint || 0}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      inventory: { ...prev.inventory!, reorderPoint: parseInt(e.target.value) }
                    }))}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4" />
                    المخزون الآمن
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.inventory?.safetyStock || 0}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      inventory: { ...prev.inventory!, safetyStock: parseInt(e.target.value) }
                    }))}
                    className="h-11"
                  />
                </div>
                
                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4" />
                    وقت الإنتاج (أيام)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.inventory?.leadTime || 0}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      inventory: { ...prev.inventory!, leadTime: parseInt(e.target.value) }
                    }))}
                    className="h-11"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Truck className="w-4 h-4" />
                معلومات المورد
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="اسم المورد"
                  value={formData.inventory?.supplierInfo?.name || ""}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    inventory: {
                      ...prev.inventory!,
                      supplierInfo: { ...prev.inventory!.supplierInfo, name: e.target.value }
                    }
                  }))}
                  className="h-11"
                />
                <Input
                  placeholder="جهة الاتصال"
                  value={formData.inventory?.supplierInfo?.contact || ""}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    inventory: {
                      ...prev.inventory!,
                      supplierInfo: { ...prev.inventory!.supplierInfo, contact: e.target.value }
                    }
                  }))}
                  className="h-11"
                />
                <Input
                  placeholder="وقت التوصيل (أيام)"
                  type="number"
                  min="0"
                  value={formData.inventory?.supplierInfo?.deliveryTime || 0}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    inventory: {
                      ...prev.inventory!,
                      supplierInfo: { ...prev.inventory!.supplierInfo, deliveryTime: parseInt(e.target.value) }
                    }
                  }))}
                  className="h-11"
                />
              </div>
            </div>
          </div>
        )}

        {/* المرحلة 4: الوسائط */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-4 h-4" />
                صور المنتج *
              </Label>
              <div className="space-y-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img src={img} alt="product" className="w-full h-32 rounded-lg object-cover" />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== idx)
                        }))}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-secondary/50 transition-colors">
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6" />
                      <span className="text-sm">اضغط لرفع صور متعددة</span>
                      <span className="text-xs text-muted-foreground">يمكنك اختيار أكثر من صورة</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Video className="w-4 h-4" />
                الفيديوهات
              </Label>
              <div className="space-y-2">
                {formData.videos.map((video, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-secondary p-3 rounded text-sm">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      <span>{video.title}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        videos: prev.videos.filter((_, i) => i !== idx)
                      }))}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <Input
                    value={newVideo.title}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="عنوان الفيديو"
                    className="h-11"
                  />
                  <Input
                    value={newVideo.url}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="رابط YouTube"
                    className="h-11"
                  />
                  <Button onClick={handleAddVideo} size="sm" className="gap-2 h-11">
                    <Plus className="w-4 h-4" />
                    إضافة فيديو
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4" />
                المستندات
              </Label>
              <div className="space-y-2">
                {formData.documents.map((doc, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-secondary p-3 rounded text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <div>
                        <div>{doc.name}</div>
                        <div className="text-xs text-muted-foreground">({doc.type})</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        documents: prev.documents.filter((_, i) => i !== idx)
                      }))}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <Input
                    value={newDocument.name}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="اسم الملف"
                    className="h-11"
                  />
                  <Input
                    value={newDocument.url}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="رابط الملف"
                    className="h-11"
                  />
                  <Select
                    value={newDocument.type}
                    onValueChange={(value) => setNewDocument(prev => ({ ...prev, type: value as any }))}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="نوع المستند" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">فني</SelectItem>
                      <SelectItem value="manual">دليل الاستخدام</SelectItem>
                      <SelectItem value="warranty">ضمان</SelectItem>
                      <SelectItem value="certificate">شهادة</SelectItem>
                      <SelectItem value="safety">سلامة</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddDocument} size="sm" className="gap-2 h-11">
                    <Plus className="w-4 h-4" />
                    إضافة مستند
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4" />
                الملحقات
              </Label>
              <div className="space-y-2">
                {formData.accessories.map((accessory, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-secondary p-3 rounded text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{accessory}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        accessories: prev.accessories.filter((_, i) => i !== idx)
                      }))}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={newAccessory}
                    onChange={(e) => setNewAccessory(e.target.value)}
                    placeholder="اسم الملحق"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddAccessory()}
                    className="h-11"
                  />
                  <Button onClick={handleAddAccessory} size="sm" className="gap-2 h-11">
                    <Plus className="w-4 h-4" />
                    إضافة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* المرحلة 5: الدعم والضمان */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4" />
                  ضمان المنتج (سنوات) *
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.warrantyInfo?.product || 0}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    warrantyInfo: { ...prev.warrantyInfo!, product: parseInt(e.target.value) }
                  }))}
                  className="h-11"
                />
              </div>
              
              <div>
                <Label className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  ضمان الأداء (سنوات) *
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.warrantyInfo?.performance || 0}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    warrantyInfo: { ...prev.warrantyInfo!, performance: parseInt(e.target.value) }
                  }))}
                  className="h-11"
                />
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-1">
                <RefreshCw className="w-4 h-4" />
                ضمان دورات الحياة
              </Label>
              <Input
                type="number"
                min="0"
                value={formData.warrantyInfo?.cycleLife || 0}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  warrantyInfo: { ...prev.warrantyInfo!, cycleLife: parseInt(e.target.value) }
                }))}
                className="h-11"
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4" />
                تفاصيل الضمان
              </Label>
              <Textarea
                value={formData.warrantyInfo?.details || ""}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  warrantyInfo: { ...prev.warrantyInfo!, details: e.target.value }
                }))}
                placeholder="تفاصيل شروط الضمان، ما يشمله وما لا يشمله..."
                rows={4}
                className="resize-none"
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4" />
                وقت التركيب
              </Label>
              <Input
                value={formData.installationTime}
                onChange={(e) => setFormData(prev => ({ ...prev, installationTime: e.target.value }))}
                placeholder="مثال: 2-3 ساعات"
                className="h-11"
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Wrench className="w-4 h-4" />
                خدمات الصيانة
              </Label>
              <div className="space-y-2">
                {formData.maintenanceServices.map((service, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-secondary p-3 rounded text-sm">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4" />
                      <span>{service}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        maintenanceServices: prev.maintenanceServices.filter((_, i) => i !== idx)
                      }))}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={newMaintenanceService}
                    onChange={(e) => setNewMaintenanceService(e.target.value)}
                    placeholder="أضف خدمة صيانة"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddMaintenanceService()}
                    className="h-11"
                  />
                  <Button onClick={handleAddMaintenanceService} size="sm" className="gap-2 h-11">
                    <Plus className="w-4 h-4" />
                    إضافة
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4" />
                باقات الصيانة
              </Label>
              <div className="space-y-2">
                {formData.maintenancePackages.map((pkg, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-secondary p-3 rounded text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>{pkg}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        maintenancePackages: prev.maintenancePackages.filter((_, i) => i !== idx)
                      }))}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={newMaintenancePackage}
                    onChange={(e) => setNewMaintenancePackage(e.target.value)}
                    placeholder="أضف باقة صيانة"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddMaintenancePackage()}
                    className="h-11"
                  />
                  <Button onClick={handleAddMaintenancePackage} size="sm" className="gap-2 h-11">
                    <Plus className="w-4 h-4" />
                    إضافة
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4" />
                الأسئلة الشائعة
              </Label>
              <div className="space-y-2">
                {formData.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-secondary p-4 rounded space-y-2">
                    <div className="font-medium flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      س: {faq.question}
                    </div>
                    <div className="text-sm pl-6">ج: {faq.answer}</div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        faqs: prev.faqs.filter((_, i) => i !== idx)
                      }))}
                    >
                      حذف
                    </Button>
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <Input
                    value={newFaq.question}
                    onChange={(e) => setNewFaq(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="السؤال"
                    className="h-11"
                  />
                  <Textarea
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq(prev => ({ ...prev, answer: e.target.value }))}
                    placeholder="الإجابة"
                    rows={2}
                    className="resize-none"
                  />
                  <Button onClick={handleAddFaq} size="sm" className="gap-2 h-11">
                    <Plus className="w-4 h-4" />
                    إضافة سؤال
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* المرحلة 6: الإعدادات المتقدمة */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="flex items-center gap-2 mb-1">
                  <Hash className="w-4 h-4" />
                  SKU *
                </Label>
                <Input
                  value={formData.sku || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                  placeholder="مثال: BAT-LFP-24-1001"
                  className="h-11"
                />
              </div>
              
              <div>
                <Label className="flex items-center gap-2 mb-1">
                  <HashIcon className="w-4 h-4" />
                  الباركود
                </Label>
                <Input
                  value={formData.inventory?.barcode || ""}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    inventory: { ...prev.inventory!, barcode: e.target.value }
                  }))}
                  placeholder="رقم الباركود"
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4" />
                  التقييم
                </Label>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating || 0}
                  onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                  className="h-11"
                />
              </div>
              
              <div>
                <Label className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4" />
                  عدد التقييمات
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.reviews || 0}
                  onChange={(e) => setFormData(prev => ({ ...prev, reviews: parseInt(e.target.value) }))}
                  className="h-11"
                />
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <TagIcon className="w-4 h-4" />
                العلامات
              </Label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          tags: prev.tags?.filter((_, i) => i !== idx) || []
                        }))}
                      >
                        ✕
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="أضف علامة"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="h-11"
                  />
                  <Button onClick={handleAddTag} size="sm" className="gap-2 h-11">
                    <Plus className="w-4 h-4" />
                    إضافة
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4" />
                أداء البطارية
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">السعة الاسمية (Ah)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.performance?.nominalCapacity || 0}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      performance: { ...prev.performance!, nominalCapacity: parseFloat(e.target.value) }
                    }))}
                    className="h-11"
                  />
                </div>
                <div>
                  <Label className="text-xs">السعة الفعلية (Ah)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.performance?.actualCapacity || 0}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      performance: { ...prev.performance!, actualCapacity: parseFloat(e.target.value) }
                    }))}
                    className="h-11"
                  />
                </div>
                <div>
                  <Label className="text-xs">كثافة الطاقة (Wh/kg)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.performance?.energyDensity || 0}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      performance: { ...prev.performance!, energyDensity: parseFloat(e.target.value) }
                    }))}
                    className="h-11"
                  />
                </div>
                <div>
                  <Label className="text-xs">كثافة القدرة (W/kg)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.performance?.powerDensity || 0}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      performance: { ...prev.performance!, powerDensity: parseFloat(e.target.value) }
                    }))}
                    className="h-11"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <RefreshCw className="w-4 h-4" />
                دورات الحياة عند أعماق تفريغ مختلفة
              </Label>
              <div className="space-y-2">
                {formData.performance?.cycleLifeAtDOD?.map((entry, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-secondary p-3 rounded text-sm">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-medium">عمق التفريغ: {entry.depth}%</div>
                        <div className="text-xs text-muted-foreground">عدد الدورات: {entry.cycles}</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        performance: {
                          ...prev.performance!,
                          cycleLifeAtDOD: prev.performance?.cycleLifeAtDOD?.filter((_, i) => i !== idx) || []
                        }
                      }))}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="عمق التفريغ %"
                    min="0"
                    max="100"
                    value={cycleLifeEntry.depth}
                    onChange={(e) => setCycleLifeEntry(prev => ({ ...prev, depth: parseInt(e.target.value) }))}
                    className="h-11"
                  />
                  <Input
                    type="number"
                    placeholder="عدد الدورات"
                    min="0"
                    value={cycleLifeEntry.cycles}
                    onChange={(e) => setCycleLifeEntry(prev => ({ ...prev, cycles: parseInt(e.target.value) }))}
                    className="h-11"
                  />
                  <Button onClick={handleAddCycleLifeEntry} size="sm" className="gap-2 h-11">
                    <Plus className="w-4 h-4" />
                    إضافة
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4" />
                معلومات التاريخ
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">تاريخ الإنشاء</Label>
                  <Input
                    type="date"
                    value={formData.createdAt ? new Date(formData.createdAt).toISOString().split('T')[0] : ""}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      createdAt: new Date(e.target.value).toISOString()
                    }))}
                    className="h-11"
                  />
                </div>
                <div>
                  <Label className="text-xs">آخر تحديث</Label>
                  <Input
                    type="date"
                    value={formData.updatedAt ? new Date(formData.updatedAt).toISOString().split('T')[0] : ""}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      updatedAt: new Date(e.target.value).toISOString()
                    }))}
                    className="h-11"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* المرحلة 7: المراجعة النهائية */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <h3 className="font-semibold">مراجعة المعلومات</h3>
              </div>
              <p className="text-sm text-green-600 mt-1">
                تم إدخال جميع المعلومات بنجاح. راجع المعلومات أدناه قبل الحفظ.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Battery className="w-4 h-4" />
                      المعلومات الأساسية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <div className="text-xs text-muted-foreground">اسم البطارية</div>
                      <div className="font-medium">{formData.name || "غير محدد"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">الشركة المصنعة</div>
                      <div className="font-medium">{selectedManufacturer?.name || "غير محدد"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">السعة والجهد</div>
                      <div className="font-medium">{formData.capacity}Ah - {formData.voltage}V</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">الطاقة</div>
                      <div className="font-medium">{formData.power.toLocaleString()} Wh</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      التسعير
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <div className="text-xs text-muted-foreground">السعر الأساسي</div>
                      <div className="font-medium">${formData.pricing?.basePrice}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">الخصم</div>
                      <div className="font-medium">{formData.discount}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">العملة</div>
                      <div className="font-medium">{formData.pricing?.currency}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">الكمية</div>
                      <div className="font-medium">{formData.quantity} قطعة</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    الضمان والدعم
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">ضمان المنتج</div>
                      <div className="font-medium">{formData.warrantyInfo?.product} سنوات</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">ضمان الأداء</div>
                      <div className="font-medium">{formData.warrantyInfo?.performance} سنوات</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">عدد خدمات الصيانة</div>
                    <div className="font-medium">{formData.maintenanceServices.length} خدمة</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">عدد الأسئلة الشائعة</div>
                    <div className="font-medium">{formData.faqs.length} سؤال</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    الوسائط والملفات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">عدد الصور</div>
                      <div className="font-medium">{formData.images.length} صورة</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">عدد الفيديوهات</div>
                      <div className="font-medium">{formData.videos.length} فيديو</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">عدد المستندات</div>
                      <div className="font-medium">{formData.documents.length} مستند</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">عدد الملحقات</div>
                      <div className="font-medium">{formData.accessories.length} ملحق</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Warehouse className="w-4 h-4" />
                    المخزون والمعلومات الفنية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">SKU</div>
                      <div className="font-medium">{formData.sku || "غير محدد"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">موقع المستودع</div>
                      <div className="font-medium">{formData.inventory?.warehouseLocation || "غير محدد"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">كيمياء البطارية</div>
                      <div className="font-medium">{formData.technicalSpecs?.chemistry}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">عدد الخلايا</div>
                      <div className="font-medium">{formData.technicalSpecs?.cellCount}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">ملاحظات هامة</h4>
                  <ul className="text-sm text-blue-600 mt-2 space-y-1">
                    <li>• تأكد من صحة جميع المعلومات المدخلة</li>
                    <li>• سيتم حفظ البطارية في قاعدة البيانات بعد الضغط على "حفظ البطارية"</li>
                    <li>• يمكنك تعديل البطارية لاحقاً من لوحة التحكم</li>
                    <li>• ستظهر المعلومات في المتجر فور الحفظ</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* أزرار التنقل */}
      <DialogFooter className="flex justify-between">
        <div className="flex gap-2">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevStep} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              السابق
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
        </div>
        
        <div className="flex gap-2">
          {currentStep < totalSteps ? (
            <Button onClick={() => {
              if (validateCurrentStep()) {
                handleNextStep();
              }
            }} className="gap-2 bg-purple-600 hover:bg-purple-700">
              التالي
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={() => {
              if (validateCurrentStep()) {
                onSave(formData);
              }
            }} className="gap-2 bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4" />
              {battery ? "تحديث البطارية" : "حفظ البطارية"}
            </Button>
          )}
        </div>
      </DialogFooter>
    </div>
  );
}

// مكون نموذج إضافة/تعديل شركة مصنعة للبطاريات (موسع)
function BatteryManufacturerForm({
  manufacturer,
  onSave,
  onClose,
}: {
  manufacturer: BatteryManufacturer | null;
  onSave: (manufacturer: BatteryManufacturer) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<BatteryManufacturer>(
    manufacturer || {
      id: Date.now().toString(),
      name: "",
      image: "",
      description: "",
      website: "",
      country: "",
      foundedYear: new Date().getFullYear(),
      certifications: [],
      rating: 0,
      contact: {
        email: "",
        phone: "",
        address: ""
      }
    }
  );

  const [newCertification, setNewCertification] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setFormData(prev => ({ ...prev, image: imageData }));
        toast.success("تم رفع الصورة بنجاح");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...(prev.certifications || []), newCertification]
      }));
      setNewCertification("");
      toast.success("تمت إضافة الشهادة");
    }
  };

  const countries = [
    "السعودية", "الإمارات", "قطر", "الكويت", "عمان", "البحرين",
    "الولايات المتحدة", "الصين", "كوريا الجنوبية", "اليابان",
    "ألمانيا", "فرنسا", "بريطانيا", "إيطاليا", "كندا", "أستراليا"
  ];

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle className="text-xl">
          {manufacturer ? "تعديل شركة مصنعة" : "إضافة شركة مصنعة جديدة"}
        </DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">اسم الشركة *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="مثال: Tesla Energy"
            className="h-11"
          />
        </div>

        <div>
          <Label htmlFor="country">البلد</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="اختر الدولة" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="image">صورة الشركة</Label>
        <div className="space-y-2">
          {formData.image && (
            <img src={formData.image} alt="company" className="w-full h-40 object-contain rounded-lg mb-2 bg-gray-50" />
          )}
          <label className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer block hover:bg-secondary/50 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-6 h-6" />
              <span className="text-sm">اضغط لرفع صورة</span>
              <span className="text-xs text-muted-foreground">الحجم المفضل: 800×400 بكسل</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div>
        <Label htmlFor="description">الوصف *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="وصف مفصل عن الشركة المصنعة وتاريخها"
          rows={4}
          className="resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="website">الموقع الإلكتروني</Label>
          <Input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            placeholder="https://example.com"
            className="h-11"
          />
        </div>

        <div>
          <Label htmlFor="foundedYear">سنة التأسيس</Label>
          <Input
            id="foundedYear"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={formData.foundedYear}
            onChange={(e) => setFormData(prev => ({ ...prev, foundedYear: parseInt(e.target.value) }))}
            className="h-11"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            value={formData.contact?.email || ""}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              contact: { ...prev.contact!, email: e.target.value }
            }))}
            placeholder="contact@company.com"
            className="h-11"
          />
        </div>

        <div>
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input
            id="phone"
            value={formData.contact?.phone || ""}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              contact: { ...prev.contact!, phone: e.target.value }
            }))}
            placeholder="+1-800-123-4567"
            className="h-11"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">العنوان</Label>
        <Input
          id="address"
          value={formData.contact?.address || ""}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            contact: { ...prev.contact!, address: e.target.value }
          }))}
          placeholder="العنوان الكامل للشركة"
          className="h-11"
        />
      </div>

      <div>
        <Label htmlFor="certifications">الشهادات</Label>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {formData.certifications?.map((cert, idx) => (
              <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {cert}
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    certifications: prev.certifications?.filter((_, i) => i !== idx) || []
                  }))}
                >
                  ✕
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              placeholder="أضف شهادة (مثل: UL 1973)"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCertification()}
              className="h-11"
            />
            <Button onClick={handleAddCertification} size="sm" className="h-11">إضافة</Button>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="rating">التقييم</Label>
        <div className="flex items-center gap-2">
          <Input
            id="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating || 0}
            onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
            className="w-24 h-11"
          />
          <span className="text-sm text-muted-foreground">من 5 نجوم</span>
        </div>
      </div>

      <DialogFooter className="flex gap-2">
        <Button variant="outline" onClick={onClose} className="h-11">إلغاء</Button>
        <Button onClick={() => {
          if (!formData.name || !formData.description) {
            toast.error("يرجى ملء الحقول المطلوبة (*)");
            return;
          }
          onSave(formData);
        }} className="h-11 bg-purple-600 hover:bg-purple-700">
          {manufacturer ? "تحديث الشركة" : "إضافة الشركة"}
        </Button>
      </DialogFooter>
    </div>
  );
}