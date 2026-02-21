// app/admin/solar-systems/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Eye, Upload, Package, Zap, Battery, Settings, Monitor } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  STORAGE_KEY_SYSTEMS,
  SolarSystem,
  SystemComponent,
  loadSolarSystems,
  saveSolarSystems
} from "@/lib/solar-systems-storage";

export default function SolarSystemsAdmin() {
  const [systems, setSystems] = useState<SolarSystem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSystem, setEditingSystem] = useState<SolarSystem | null>(null);
  const [activeTab, setActiveTab] = useState("systems");

  // تحميل البيانات
  useEffect(() => {
    const savedSystems = loadSolarSystems();
    if (savedSystems.length === 0) {
      // بيانات افتراضية
      const defaultSystems: SolarSystem[] = [
        {
          id: "1",
          name: "نظام شمسي منزلي 5 كيلووات",
          description: "نظام شمسي متكامل للمنازل، يوفر حتى 70% من فاتورة الكهرباء",
          type: "residential",
          powerCapacity: 5,
          dailyProduction: 25,
          components: [
            {
              id: "1-1",
              type: "panel",
              name: "لوح شمسي 550 واط",
              brand: "SunPower",
              specifications: { "القدرة": "550 واط", "الكفاءة": "22%" },
              quantity: 10,
              price: 55000,
              image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop"
            },
            {
              id: "1-2",
              type: "inverter",
              name: "انفرتر هجين 5 كيلووات",
              brand: "Growatt",
              specifications: { "القدرة": "5 كيلووات", "الكفاءة": "97%" },
              quantity: 1,
              price: 80000,
              image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
            }
          ],
          price: 450000,
          discount: 15,
          installationTime: "3-5 أيام",
          warranty: "10 سنوات",
          maintenance: "تنظيف الألواح كل 6 أشهر\nفحص التوصيلات سنوياً",
          images: [
            "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop"
          ],
          features: [
            "توفير يصل إلى 70% من فاتورة الكهرباء",
            "ضمان 10 سنوات على المكونات",
            "صيانة مجانية لمدة سنة",
            "تركيب احترافي"
          ],
          specifications: {
            "السعة القصوى": "5 كيلووات",
            "الإنتاج اليومي": "25 كيلووات ساعة",
            "المساحة المطلوبة": "30 متر مربع",
            "العمر الافتراضي": "25 سنة",
            "كفاءة النظام": "85%"
          },
          suitableFor: ["المنازل", "الفيلات", "المباني السكنية", "المكاتب الصغيرة"],
          benefits: [
            "توفير مالي طويل المدى",
            "طاقة نظيفة وصديقة للبيئة",
            "استقلالية عن شبكة الكهرباء",
            "زيادة قيمة العقار"
          ],
          systemDesign: {
            layout: "متوازي",
            componentsCount: 12,
            efficiency: 85,
            lifetime: 25
          },
          performanceData: {
            monthlyProduction: [650, 700, 750, 800, 850, 900, 950, 900, 850, 800, 750, 700],
            savings: [1500, 1600, 1700, 1800, 1900, 2000, 2100, 2000, 1900, 1800, 1700, 1600],
            paybackPeriod: 4.5
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      setSystems(defaultSystems);
      saveSolarSystems(defaultSystems);
    } else {
      setSystems(savedSystems);
    }
  }, []);

  // إضافة/تعديل نظام
  const handleSaveSystem = (system: SolarSystem) => {
    let updatedSystems;
    if (editingSystem) {
      updatedSystems = systems.map(s => s.id === system.id ? system : s);
      toast.success("تم تحديث المنظومة الشمسية بنجاح");
    } else {
      updatedSystems = [...systems, system];
      toast.success("تم إضافة المنظومة الشمسية بنجاح");
    }
    
    setSystems(updatedSystems);
    saveSolarSystems(updatedSystems);
    setIsDialogOpen(false);
    setEditingSystem(null);
  };

  // حذف نظام
  const handleDeleteSystem = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه المنظومة الشمسية؟")) {
      const updated = systems.filter(s => s.id !== id);
      setSystems(updated);
      saveSolarSystems(updated);
      toast.success("تم حذف المنظومة الشمسية بنجاح");
    }
  };

  // تصدير البيانات
  const exportData = () => {
    const data = {
      systems,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'solar-systems-data.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success("تم تصدير البيانات بنجاح");
  };

  // استيراد البيانات
  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          
          if (data.systems) {
            setSystems(data.systems);
            saveSolarSystems(data.systems);
            toast.success("تم استيراد البيانات بنجاح");
          } else {
            toast.error("ملف غير صالح");
          }
        } catch (error) {
          toast.error("خطأ في قراءة الملف");
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  };

  // معاينة المتجر
  const previewStore = () => {
    window.open('/solar-systems', '_blank');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">لوحة تحكم المنظومات الشمسية</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={previewStore}>
              <Eye className="w-4 h-4 ml-2" />
              معاينة المتجر
            </Button>
            <Button variant="outline" onClick={exportData}>
              تصدير البيانات
            </Button>
            <Button variant="outline" onClick={importData}>
              استيراد البيانات
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="systems">المنظومات الشمسية ({systems.length})</TabsTrigger>
            <TabsTrigger value="types">أنواع المنظومات</TabsTrigger>
          </TabsList>

          {/* تبويب المنظومات الشمسية */}
          <TabsContent value="systems" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">إدارة المنظومات الشمسية</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setEditingSystem(null)}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة منظومة جديدة
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <SolarSystemForm
                    system={editingSystem}
                    onSave={handleSaveSystem}
                    onClose={() => setIsDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الصورة</TableHead>
                    <TableHead>اسم المنظومة</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>القدرة (كيلووات)</TableHead>
                    <TableHead>الإنتاج اليومي</TableHead>
                    <TableHead>عدد المكونات</TableHead>
                    <TableHead>السعر</TableHead>
                    <TableHead>الخصم</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systems.map(system => (
                    <TableRow key={system.id}>
                      <TableCell>
                        {system.images[0] && (
                          <img 
                            src={system.images[0]} 
                            alt={system.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{system.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          system.type === 'residential' ? 'bg-blue-50 text-blue-700' :
                          system.type === 'commercial' ? 'bg-green-50 text-green-700' :
                          system.type === 'industrial' ? 'bg-orange-50 text-orange-700' :
                          system.type === 'agricultural' ? 'bg-yellow-50 text-yellow-700' :
                          'bg-purple-50 text-purple-700'
                        }>
                          {system.type === 'residential' ? 'منزلي' :
                           system.type === 'commercial' ? 'تجاري' :
                           system.type === 'industrial' ? 'صناعي' :
                           system.type === 'agricultural' ? 'زراعي' : 'هجين'}
                        </Badge>
                      </TableCell>
                      <TableCell>{system.powerCapacity} ك.و</TableCell>
                      <TableCell>{system.dailyProduction} ك.و.س</TableCell>
                      <TableCell>{system.components.length}</TableCell>
                      <TableCell className="font-bold">
                        {system.price.toLocaleString()} ر.س
                      </TableCell>
                      <TableCell>
                        {system.discount ? (
                          <span className="text-green-600 font-bold">{system.discount}%</span>
                        ) : 'لا يوجد'}
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingSystem(system);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteSystem(system.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* تبويب أنواع المنظومات */}
          <TabsContent value="types" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  type: "residential",
                  title: "المنظومات المنزلية",
                  description: "أنظمة شمسية للمنازل والفيلات",
                  icon: <Package className="w-8 h-8" />,
                  count: systems.filter(s => s.type === 'residential').length,
                  color: "bg-blue-100 text-blue-800"
                },
                {
                  type: "commercial",
                  title: "المنظومات التجارية",
                  description: "أنظمة للمحلات والمراكز التجارية",
                  icon: <Zap className="w-8 h-8" />,
                  count: systems.filter(s => s.type === 'commercial').length,
                  color: "bg-green-100 text-green-800"
                },
                {
                  type: "industrial",
                  title: "المنظومات الصناعية",
                  description: "أنظمة للمصانع والمنشآت الصناعية",
                  icon: <Settings className="w-8 h-8" />,
                  count: systems.filter(s => s.type === 'industrial').length,
                  color: "bg-orange-100 text-orange-800"
                },
                {
                  type: "agricultural",
                  title: "المنظومات الزراعية",
                  description: "أنظمة للزراعة والري بالطاقة الشمسية",
                  icon: <Package className="w-8 h-8" />,
                  count: systems.filter(s => s.type === 'agricultural').length,
                  color: "bg-yellow-100 text-yellow-800"
                },
                {
                  type: "hybrid",
                  title: "المنظومات الهجينة",
                  description: "أنظمة متكاملة مع تخزين الطاقة",
                  icon: <Battery className="w-8 h-8" />,
                  count: systems.filter(s => s.type === 'hybrid').length,
                  color: "bg-purple-100 text-purple-800"
                }
              ].map((item, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-full ${item.color}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{item.count} منظومة</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setActiveTab("systems");
                        // يمكن إضافة فلتر حسب النوع هنا
                      }}
                    >
                      عرض الكل
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// مكون نموذج إضافة/تعديل منظومة شمسية
function SolarSystemForm({
  system,
  onSave,
  onClose,
}: {
  system: SolarSystem | null;
  onSave: (system: SolarSystem) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<SolarSystem>(
    system || {
      id: Date.now().toString(),
      name: "",
      description: "",
      type: "residential",
      powerCapacity: 0,
      dailyProduction: 0,
      components: [],
      price: 0,
      discount: 0,
      installationTime: "",
      warranty: "",
      maintenance: "",
      images: [],
      features: [],
      specifications: {},
      suitableFor: [],
      benefits: [],
      systemDesign: {
        layout: "متوازي",
        componentsCount: 0,
        efficiency: 0,
        lifetime: 0
      },
      performanceData: {
        monthlyProduction: Array(12).fill(0),
        savings: Array(12).fill(0),
        paybackPeriod: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  );

  const [newImage, setNewImage] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [newSuitableFor, setNewSuitableFor] = useState("");
  const [newBenefit, setNewBenefit] = useState("");

  // حالة للمكونات
  const [newComponent, setNewComponent] = useState<SystemComponent>({
    id: "",
    type: "panel",
    name: "",
    brand: "",
    specifications: {},
    quantity: 1,
    price: 0
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, imageData]
        }));
        toast.success("تم إضافة الصورة بنجاح");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature]
      }));
      setNewFeature("");
    }
  };

  const handleAddSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: { ...prev.specifications, [newSpecKey]: newSpecValue }
      }));
      setNewSpecKey("");
      setNewSpecValue("");
    }
  };

  const handleAddSuitableFor = () => {
    if (newSuitableFor.trim()) {
      setFormData(prev => ({
        ...prev,
        suitableFor: [...prev.suitableFor, newSuitableFor]
      }));
      setNewSuitableFor("");
    }
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit]
      }));
      setNewBenefit("");
    }
  };

  const handleAddComponent = () => {
    if (newComponent.name.trim() && newComponent.brand.trim()) {
      setFormData(prev => ({
        ...prev,
        components: [...prev.components, { ...newComponent, id: Date.now().toString() }]
      }));
      setNewComponent({
        id: "",
        type: "panel",
        name: "",
        brand: "",
        specifications: {},
        quantity: 1,
        price: 0
      });
      toast.success("تم إضافة المكون بنجاح");
    }
  };

  const removeComponent = (id: string) => {
    setFormData(prev => ({
      ...prev,
      components: prev.components.filter(c => c.id !== id)
    }));
  };

  const calculateTotalPrice = () => {
    const componentsPrice = formData.components.reduce((sum, comp) => sum + (comp.price * comp.quantity), 0);
    const finalPrice = componentsPrice * 1.2; // هامش ربح 20%
    setFormData(prev => ({ ...prev, price: finalPrice }));
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>
          {system ? "تعديل منظومة شمسية" : "إضافة منظومة شمسية جديدة"}
        </DialogTitle>
      </DialogHeader>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">معلومات أساسية</TabsTrigger>
          <TabsTrigger value="components">المكونات</TabsTrigger>
          <TabsTrigger value="details">التفاصيل</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
        </TabsList>

        {/* معلومات أساسية */}
        <TabsContent value="basic" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">اسم المنظومة</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="مثال: نظام شمسي منزلي 5 كيلووات"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">نوع المنظومة</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
              className="w-full border rounded-md p-2"
            >
              <option value="residential">منزلي</option>
              <option value="commercial">تجاري</option>
              <option value="industrial">صناعي</option>
              <option value="agricultural">زراعي</option>
              <option value="hybrid">هجين</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">الوصف</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="وصف المنظومة ومميزاتها"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">القدرة (كيلووات)</label>
              <Input
                type="number"
                value={formData.powerCapacity}
                onChange={(e) => setFormData(prev => ({ ...prev, powerCapacity: parseFloat(e.target.value) }))}
                placeholder="5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الإنتاج اليومي (كيلووات ساعة)</label>
              <Input
                type="number"
                value={formData.dailyProduction}
                onChange={(e) => setFormData(prev => ({ ...prev, dailyProduction: parseFloat(e.target.value) }))}
                placeholder="25"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">وقت التركيب</label>
              <Input
                value={formData.installationTime}
                onChange={(e) => setFormData(prev => ({ ...prev, installationTime: e.target.value }))}
                placeholder="مثال: 3-5 أيام"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">فترة الضمان</label>
              <Input
                value={formData.warranty}
                onChange={(e) => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
                placeholder="مثال: 10 سنوات"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">تعليمات الصيانة</label>
            <Textarea
              value={formData.maintenance}
              onChange={(e) => setFormData(prev => ({ ...prev, maintenance: e.target.value }))}
              placeholder="اكتب كل تعليمة في سطر جديد"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">الخصم (%)</label>
            <Input
              type="number"
              value={formData.discount || 0}
              onChange={(e) => setFormData(prev => ({ ...prev, discount: parseFloat(e.target.value) }))}
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">صور المنظومة</label>
            <div className="space-y-2">
              {formData.images.map((img, idx) => (
                <div key={idx} className="flex justify-between items-center bg-secondary p-2 rounded">
                  <img src={img} alt={`system ${idx}`} className="w-12 h-12 rounded object-cover" />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== idx)
                    }))}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6" />
                    <span className="text-sm">اضغط لرفع صورة</span>
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
          </div>
        </TabsContent>

        {/* المكونات */}
        <TabsContent value="components" className="space-y-4">
          <div>
            <h3 className="text-lg font-bold mb-4">مكونات المنظومة</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">نوع المكون</label>
                <select
                  value={newComponent.type}
                  onChange={(e) => setNewComponent(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full border rounded-md p-2"
                >
                  <option value="panel">لوح شمسي</option>
                  <option value="inverter">انفرتر</option>
                  <option value="battery">بطارية</option>
                  <option value="charger">شاحن</option>
                  <option value="monitor">نظام مراقبة</option>
                  <option value="accessory">ملحق</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">اسم المكون</label>
                <Input
                  value={newComponent.name}
                  onChange={(e) => setNewComponent(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="مثال: لوح شمسي 550 واط"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">العلامة التجارية</label>
                <Input
                  value={newComponent.brand}
                  onChange={(e) => setNewComponent(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="مثال: SunPower"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-2">الكمية</label>
                  <Input
                    type="number"
                    value={newComponent.quantity}
                    onChange={(e) => setNewComponent(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">السعر (ر.س)</label>
                  <Input
                    type="number"
                    value={newComponent.price}
                    onChange={(e) => setNewComponent(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    placeholder="55000"
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleAddComponent} className="mb-6">
              إضافة مكون
            </Button>

            {/* قائمة المكونات المضافة */}
            <div className="space-y-3">
              {formData.components.map((component) => (
                <div key={component.id} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-bold">{component.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {component.brand} • {component.quantity} قطعة • {component.price.toLocaleString()} ر.س
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {Object.entries(component.specifications).map(([key, value]) => (
                        <span key={key} className="mr-2">{key}: {value}</span>
                      ))}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeComponent(component.id)}
                  >
                    حذف
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Button onClick={calculateTotalPrice} variant="outline">
                حساب السعر الإجمالي
              </Button>
              <div className="mt-2 text-lg font-bold">
                السعر الإجمالي: {formData.price.toLocaleString()} ر.س
              </div>
            </div>
          </div>
        </TabsContent>

        {/* التفاصيل */}
        <TabsContent value="details" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">المميزات</label>
            <div className="space-y-2">
              {formData.features.map((feature, idx) => (
                <div key={idx} className="flex justify-between items-center bg-secondary p-2 rounded">
                  <span>{feature}</span>
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
                  placeholder="أضف ميزة"
                />
                <Button onClick={handleAddFeature} size="sm">إضافة</Button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">المواصفات الفنية</label>
            <div className="space-y-2">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center bg-secondary p-2 rounded text-sm">
                  <span>{key}: {value}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setFormData(prev => {
                      const newSpecs = { ...prev.specifications };
                      delete newSpecs[key];
                      return { ...prev, specifications: newSpecs };
                    })}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newSpecKey}
                  onChange={(e) => setNewSpecKey(e.target.value)}
                  placeholder="اسم المواصفة"
                />
                <Input
                  value={newSpecValue}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                  placeholder="قيمة المواصفة"
                />
                <Button onClick={handleAddSpecification} size="sm">إضافة</Button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">مناسب لـ</label>
            <div className="space-y-2">
              {formData.suitableFor.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-secondary p-2 rounded">
                  <span>{item}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      suitableFor: prev.suitableFor.filter((_, i) => i !== idx)
                    }))}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newSuitableFor}
                  onChange={(e) => setNewSuitableFor(e.target.value)}
                  placeholder="أضف استخدام"
                />
                <Button onClick={handleAddSuitableFor} size="sm">إضافة</Button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">فوائد المنظومة</label>
            <div className="space-y-2">
              {formData.benefits.map((benefit, idx) => (
                <div key={idx} className="flex justify-between items-center bg-secondary p-2 rounded">
                  <span>{benefit}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      benefits: prev.benefits.filter((_, i) => i !== idx)
                    }))}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="أضف فائدة"
                />
                <Button onClick={handleAddBenefit} size="sm">إضافة</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* الأداء */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">تصميم النظام</label>
              <Input
                value={formData.systemDesign.layout}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  systemDesign: { ...prev.systemDesign, layout: e.target.value }
                }))}
                placeholder="متوازي"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">عدد المكونات</label>
              <Input
                type="number"
                value={formData.systemDesign.componentsCount}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  systemDesign: { ...prev.systemDesign, componentsCount: parseInt(e.target.value) }
                }))}
                placeholder="12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">كفاءة النظام (%)</label>
              <Input
                type="number"
                value={formData.systemDesign.efficiency}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  systemDesign: { ...prev.systemDesign, efficiency: parseFloat(e.target.value) }
                }))}
                placeholder="85"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">العمر الافتراضي (سنة)</label>
              <Input
                type="number"
                value={formData.systemDesign.lifetime}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  systemDesign: { ...prev.systemDesign, lifetime: parseInt(e.target.value) }
                }))}
                placeholder="25"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">فترة استرداد التكلفة (سنوات)</label>
            <Input
              type="number"
              value={formData.performanceData.paybackPeriod}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                performanceData: { ...prev.performanceData, paybackPeriod: parseFloat(e.target.value) }
              }))}
              placeholder="4.5"
              step="0.1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">الإنتاج الشهري (كيلووات ساعة)</h4>
              <div className="grid grid-cols-3 gap-2">
                {formData.performanceData.monthlyProduction.map((value, idx) => (
                  <Input
                    key={idx}
                    type="number"
                    value={value}
                    onChange={(e) => {
                      const newProduction = [...formData.performanceData.monthlyProduction];
                      newProduction[idx] = parseFloat(e.target.value);
                      setFormData(prev => ({
                        ...prev,
                        performanceData: { ...prev.performanceData, monthlyProduction: newProduction }
                      }));
                    }}
                    placeholder={`شهر ${idx + 1}`}
                    className="text-xs"
                  />
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">التوفير الشهري (ر.س)</h4>
              <div className="grid grid-cols-3 gap-2">
                {formData.performanceData.savings.map((value, idx) => (
                  <Input
                    key={idx}
                    type="number"
                    value={value}
                    onChange={(e) => {
                      const newSavings = [...formData.performanceData.savings];
                      newSavings[idx] = parseFloat(e.target.value);
                      setFormData(prev => ({
                        ...prev,
                        performanceData: { ...prev.performanceData, savings: newSavings }
                      }));
                    }}
                    placeholder={`شهر ${idx + 1}`}
                    className="text-xs"
                  />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>إلغاء</Button>
        <Button onClick={() => {
          if (!formData.name || !formData.description || formData.components.length === 0) {
            toast.error("يرجى ملء الحقول المطلوبة وإضافة مكونات على الأقل");
            return;
          }
          onSave(formData);
        }}>
          {system ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </div>
  );
}