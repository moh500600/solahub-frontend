// app/admin/inverters/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Eye, Upload, Check, X, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  STORAGE_KEY_INVERTER_MANUFACTURERS,
  STORAGE_KEY_INVERTERS,
  InverterManufacturer,
  Inverter,
  saveInverterManufacturers,
  saveInverters,
  loadInverterManufacturers,
  loadInverters,
  defaultInverterManufacturers,
  defaultInverters
} from "@/lib/shared-storage-inverters";

export default function InvertersAdmin() {
  const [activeTab, setActiveTab] = useState("products");
  const [manufacturers, setManufacturers] = useState<InverterManufacturer[]>([]);
  const [inverters, setInverters] = useState<Inverter[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isManufacturerDialogOpen, setIsManufacturerDialogOpen] = useState(false);
  const [editingInverter, setEditingInverter] = useState<Inverter | null>(null);
  const [editingManufacturer, setEditingManufacturer] = useState<InverterManufacturer | null>(null);

  // تحميل البيانات من localStorage
  useEffect(() => {
    const savedManufacturers = loadInverterManufacturers();
    const savedInverters = loadInverters();

    setManufacturers(savedManufacturers.length > 0 ? savedManufacturers : defaultInverterManufacturers);
    setInverters(savedInverters.length > 0 ? savedInverters : defaultInverters);
    
    // حفظ البيانات الافتراضية إذا لم تكن موجودة
    if (savedManufacturers.length === 0) {
      saveInverterManufacturers(defaultInverterManufacturers);
    }
    if (savedInverters.length === 0) {
      saveInverters(defaultInverters);
    }
  }, []);

  // إضافة/تعديل شركة مصنعة
  const handleSaveManufacturer = (manufacturer: InverterManufacturer) => {
    let updatedManufacturers;
    if (editingManufacturer) {
      updatedManufacturers = manufacturers.map(m => 
        m.id === manufacturer.id ? manufacturer : m
      );
      toast.success("تم تحديث الشركة المصنعة بنجاح");
    } else {
      updatedManufacturers = [...manufacturers, manufacturer];
      toast.success("تم إضافة الشركة المصنعة بنجاح");
    }
    
    setManufacturers(updatedManufacturers);
    saveInverterManufacturers(updatedManufacturers);
    setIsManufacturerDialogOpen(false);
    setEditingManufacturer(null);
  };

  // إضافة/تعديل عاكس
  const handleSaveInverter = (inverter: Inverter) => {
    let updatedInverters;
    if (editingInverter) {
      updatedInverters = inverters.map(i => i.id === inverter.id ? inverter : i);
      toast.success("تم تحديث العاكس بنجاح");
    } else {
      updatedInverters = [...inverters, inverter];
      toast.success("تم إضافة العاكس بنجاح");
    }
    
    setInverters(updatedInverters);
    saveInverters(updatedInverters);
    setIsDialogOpen(false);
    setEditingInverter(null);
  };

  // حذف شركة مصنعة
  const handleDeleteManufacturer = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الشركة المصنعة؟")) {
      const updated = manufacturers.filter(m => m.id !== id);
      setManufacturers(updated);
      saveInverterManufacturers(updated);
      toast.success("تم حذف الشركة المصنعة بنجاح");
    }
  };

  // حذف عاكس
  const handleDeleteInverter = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا العاكس؟")) {
      const updated = inverters.filter(i => i.id !== id);
      setInverters(updated);
      saveInverters(updated);
      toast.success("تم حذف العاكس بنجاح");
    }
  };

  // تصدير البيانات
  const exportData = () => {
    const data = {
      manufacturers,
      inverters,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inverters-data.json';
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
          
          if (data.manufacturers && data.inverters) {
            setManufacturers(data.manufacturers);
            setInverters(data.inverters);
            saveInverterManufacturers(data.manufacturers);
            saveInverters(data.inverters);
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

  // عرض معاينة المنتجات
  const previewProducts = () => {
    window.open('/inverters', '_blank');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">لوحة تحكم العواكس الشمسية</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={previewProducts}>
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
            <TabsTrigger value="products">العواكس الشمسية ({inverters.length})</TabsTrigger>
            <TabsTrigger value="manufacturers">الشركات المصنعة ({manufacturers.length})</TabsTrigger>
          </TabsList>

          {/* تبويب العواكس الشمسية */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">إدارة العواكس الشمسية</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setEditingInverter(null)}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة عاكس شمسي
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <InverterForm
                    inverter={editingInverter}
                    manufacturers={manufacturers}
                    onSave={handleSaveInverter}
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
                    <TableHead>اسم العاكس</TableHead>
                    <TableHead>الشركة المصنعة</TableHead>
                    <TableHead>القدرة (كيلووات)</TableHead>
                    <TableHead>الكفاءة (%)</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>السعر (ر.س)</TableHead>
                    <TableHead>المخزون</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inverters.map(inverter => (
                    <TableRow key={inverter.id}>
                      <TableCell>
                        {inverter.images[0] && (
                          <img 
                            src={inverter.images[0]} 
                            alt={inverter.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{inverter.name}</TableCell>
                      <TableCell>
                        {manufacturers.find(m => m.id === inverter.manufacturerId)?.name || "غير محدد"}
                      </TableCell>
                      <TableCell>{inverter.powerRating}</TableCell>
                      <TableCell>{inverter.efficiency}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {inverter.type === 'string' ? 'سترينج' : 
                           inverter.type === 'micro' ? 'مايكرو' :
                           inverter.type === 'hybrid' ? 'هجين' :
                           inverter.type === 'off-grid' ? 'منفصل' : 'مركزي'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold">{inverter.price.toLocaleString()} ر.س</span>
                          {inverter.discount > 0 && (
                            <span className="text-xs text-green-600">خصم {inverter.discount}%</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{inverter.stock}</TableCell>
                      <TableCell>
                        <Badge variant={inverter.available ? "default" : "secondary"}>
                          {inverter.available ? "متوفر" : "غير متوفر"}
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingInverter(inverter);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteInverter(inverter.id)}
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

          {/* تبويب الشركات المصنعة */}
          <TabsContent value="manufacturers" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">إدارة الشركات المصنعة</h2>
              <Dialog open={isManufacturerDialogOpen} onOpenChange={setIsManufacturerDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setEditingManufacturer(null)}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة شركة مصنعة
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <InverterManufacturerForm
                    manufacturer={editingManufacturer}
                    onSave={handleSaveManufacturer}
                    onClose={() => setIsManufacturerDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {manufacturers.map(manufacturer => (
                <Card key={manufacturer.id} className="p-4">
                  {manufacturer.logo && (
                    <img
                      src={manufacturer.logo}
                      alt={manufacturer.name}
                      className="w-full h-40 object-contain rounded-lg mb-4 bg-white p-4"
                    />
                  )}
                  <h3 className="font-semibold text-lg mb-2">{manufacturer.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {manufacturer.country}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {manufacturer.warranty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {manufacturer.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setEditingManufacturer(manufacturer);
                        setIsManufacturerDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleDeleteManufacturer(manufacturer.id)}
                    >
                      <Trash2 className="w-4 h-4" />
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

// مكون نموذج إضافة/تعديل عاكس
function InverterForm({
  inverter,
  manufacturers,
  onSave,
  onClose,
}: {
  inverter: Inverter | null;
  manufacturers: InverterManufacturer[];
  onSave: (inverter: Inverter) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Inverter>(
    inverter || {
      id: Date.now().toString(),
      name: "",
      manufacturerId: manufacturers[0]?.id || "",
      type: "string",
      powerRating: 3.0,
      inputVoltage: { min: 150, max: 600 },
      outputVoltage: 230,
      efficiency: 97.5,
      maxEfficiency: 98.5,
      mpptVoltageRange: { min: 150, max: 600 },
      mpptCount: 1,
      protection: {
        ipRating: "IP65",
        features: []
      },
      communication: {
        wifi: false,
        bluetooth: false,
        ethernet: false,
        gsm: false
      },
      display: {
        type: "شاشة LCD",
        features: []
      },
      warranty: {
        product: "5 سنوات",
        performance: "10 سنوات"
      },
      dimensions: {
        width: 400,
        height: 500,
        depth: 150,
        weight: 20
      },
      certifications: [],
      features: [],
      description: "",
      images: [],
      videos: [],
      documents: [],
      installationGuide: "",
      maintenanceRequirements: [],
      compatiblePanels: [],
      accessories: [],
      price: 10000,
      discount: 0,
      stock: 10,
      available: true,
      sku: `INV-${Date.now().toString().slice(-6)}`,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  );

  const [newImage, setNewImage] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newCompatiblePanel, setNewCompatiblePanel] = useState({ brand: "", minPower: 0, maxPower: 0 });
  const [newAccessory, setNewAccessory] = useState({ name: "", description: "", price: 0 });
  const [newMaintenance, setNewMaintenance] = useState("");

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

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification]
      }));
      setNewCertification("");
    }
  };

  const handleAddCompatiblePanel = () => {
    if (newCompatiblePanel.brand.trim() && newCompatiblePanel.minPower > 0 && newCompatiblePanel.maxPower > 0) {
      setFormData(prev => ({
        ...prev,
        compatiblePanels: [...prev.compatiblePanels, { ...newCompatiblePanel }]
      }));
      setNewCompatiblePanel({ brand: "", minPower: 0, maxPower: 0 });
    }
  };

  const handleAddAccessory = () => {
    if (newAccessory.name.trim()) {
      setFormData(prev => ({
        ...prev,
        accessories: [...prev.accessories, { ...newAccessory }]
      }));
      setNewAccessory({ name: "", description: "", price: 0 });
    }
  };

  const handleAddMaintenance = () => {
    if (newMaintenance.trim()) {
      setFormData(prev => ({
        ...prev,
        maintenanceRequirements: [...prev.maintenanceRequirements, newMaintenance]
      }));
      setNewMaintenance("");
    }
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>
          {inverter ? "تعديل عاكس شمسي" : "إضافة عاكس شمسي جديد"}
        </DialogTitle>
      </DialogHeader>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">معلومات أساسية</TabsTrigger>
          <TabsTrigger value="technical">مواصفات فنية</TabsTrigger>
          <TabsTrigger value="features">المميزات والمواصفات</TabsTrigger>
          <TabsTrigger value="media">الوسائط والملحقات</TabsTrigger>
        </TabsList>

        {/* تبويب المعلومات الأساسية */}
        <TabsContent value="basic" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">اسم العاكس</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="مثال: عاكس سترينج 5 كيلووات"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">الشركة المصنعة</label>
              <select
                value={formData.manufacturerId}
                onChange={(e) => setFormData(prev => ({ ...prev, manufacturerId: e.target.value }))}
                className="w-full border rounded-md p-2"
              >
                <option value="">اختر شركة مصنعة</option>
                {manufacturers.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نوع العاكس</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full border rounded-md p-2"
              >
                <option value="string">عاكس سترينج</option>
                <option value="micro">عاكس مايكرو</option>
                <option value="hybrid">عاكس هجين</option>
                <option value="off-grid">عاكس منفصل عن الشبكة</option>
                <option value="central">عاكس مركزي</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">الوصف</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="وصف العاكس ومميزاته"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">القدرة (كيلووات)</label>
              <Input
                type="number"
                step="0.1"
                value={formData.powerRating}
                onChange={(e) => setFormData(prev => ({ ...prev, powerRating: parseFloat(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">كود المنتج (SKU)</label>
              <Input
                value={formData.sku}
                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                placeholder="مثال: INV-5000-01"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">السعر (ر.س)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الخصم (%)</label>
              <Input
                type="number"
                value={formData.discount}
                onChange={(e) => setFormData(prev => ({ ...prev, discount: parseFloat(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">المخزون</label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
                id="available"
              />
              <label htmlFor="available" className="text-sm font-medium">متوفر</label>
            </div>
          </div>
        </TabsContent>

        {/* تبويب المواصفات الفنية */}
        <TabsContent value="technical" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">الكفاءة (%)</label>
              <Input
                type="number"
                step="0.1"
                value={formData.efficiency}
                onChange={(e) => setFormData(prev => ({ ...prev, efficiency: parseFloat(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الكفاءة القصوى (%)</label>
              <Input
                type="number"
                step="0.1"
                value={formData.maxEfficiency}
                onChange={(e) => setFormData(prev => ({ ...prev, maxEfficiency: parseFloat(e.target.value) }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">جهد الدخل الأدنى (V)</label>
              <Input
                type="number"
                value={formData.inputVoltage.min}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  inputVoltage: { ...prev.inputVoltage, min: parseFloat(e.target.value) }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">جهد الدخل الأعلى (V)</label>
              <Input
                type="number"
                value={formData.inputVoltage.max}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  inputVoltage: { ...prev.inputVoltage, max: parseFloat(e.target.value) }
                }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">جهد الخرج (V)</label>
            <Input
              type="number"
              value={formData.outputVoltage}
              onChange={(e) => setFormData(prev => ({ ...prev, outputVoltage: parseFloat(e.target.value) }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">عدد مسارات MPPT</label>
              <Input
                type="number"
                value={formData.mpptCount}
                onChange={(e) => setFormData(prev => ({ ...prev, mpptCount: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">مدى جهد MPPT الأدنى (V)</label>
              <Input
                type="number"
                value={formData.mpptVoltageRange.min}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  mpptVoltageRange: { ...prev.mpptVoltageRange, min: parseFloat(e.target.value) }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">مدى جهد MPPT الأعلى (V)</label>
              <Input
                type="number"
                value={formData.mpptVoltageRange.max}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  mpptVoltageRange: { ...prev.mpptVoltageRange, max: parseFloat(e.target.value) }
                }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">العرض (مم)</label>
              <Input
                type="number"
                value={formData.dimensions.width}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, width: parseFloat(e.target.value) }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الارتفاع (مم)</label>
              <Input
                type="number"
                value={formData.dimensions.height}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, height: parseFloat(e.target.value) }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">العمق (مم)</label>
              <Input
                type="number"
                value={formData.dimensions.depth}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, depth: parseFloat(e.target.value) }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الوزن (كجم)</label>
              <Input
                type="number"
                value={formData.dimensions.weight}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, weight: parseFloat(e.target.value) }
                }))}
              />
            </div>
          </div>
        </TabsContent>

        {/* تبويب المميزات والمواصفات */}
        <TabsContent value="features" className="space-y-4">
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
            <label className="block text-sm font-medium mb-2">الشهادات</label>
            <div className="space-y-2">
              {formData.certifications.map((cert, idx) => (
                <div key={idx} className="flex justify-between items-center bg-secondary p-2 rounded">
                  <span>{cert}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      certifications: prev.certifications.filter((_, i) => i !== idx)
                    }))}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="أضف شهادة"
                />
                <Button onClick={handleAddCertification} size="sm">إضافة</Button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">درجة الحماية (IP Rating)</label>
            <Input
              value={formData.protection.ipRating}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                protection: { ...prev.protection, ipRating: e.target.value }
              }))}
              placeholder="مثال: IP65"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">ميزات الحماية</label>
            <Textarea
              value={formData.protection.features.join("\n")}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                protection: { 
                  ...prev.protection, 
                  features: e.target.value.split("\n").filter(s => s.trim())
                }
              }))}
              placeholder="اكتب كل ميزة في سطر جديد"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">اتصالات الشبكة</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.communication.wifi}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    communication: { ...prev.communication, wifi: e.target.checked }
                  }))}
                  id="wifi"
                />
                <label htmlFor="wifi" className="text-sm">WiFi</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.communication.bluetooth}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    communication: { ...prev.communication, bluetooth: e.target.checked }
                  }))}
                  id="bluetooth"
                />
                <label htmlFor="bluetooth" className="text-sm">بلوتوث</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.communication.ethernet}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    communication: { ...prev.communication, ethernet: e.target.checked }
                  }))}
                  id="ethernet"
                />
                <label htmlFor="ethernet" className="text-sm">إيثرنت</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.communication.gsm}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    communication: { ...prev.communication, gsm: e.target.checked }
                  }))}
                  id="gsm"
                />
                <label htmlFor="gsm" className="text-sm">GSM</label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">عرض الشاشة</label>
            <Input
              value={formData.display.type}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                display: { ...prev.display, type: e.target.value }
              }))}
              placeholder="مثال: شاشة LCD"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">مميزات الشاشة</label>
            <Textarea
              value={formData.display.features.join("\n")}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                display: { 
                  ...prev.display, 
                  features: e.target.value.split("\n").filter(s => s.trim())
                }
              }))}
              placeholder="اكتب كل ميزة في سطر جديد"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">ضمان المنتج</label>
              <Input
                value={formData.warranty.product}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  warranty: { ...prev.warranty, product: e.target.value }
                }))}
                placeholder="مثال: 5 سنوات"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ضمان الأداء</label>
              <Input
                value={formData.warranty.performance}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  warranty: { ...prev.warranty, performance: e.target.value }
                }))}
                placeholder="مثال: 10 سنوات"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">دليل التركيب</label>
            <Textarea
              value={formData.installationGuide}
              onChange={(e) => setFormData(prev => ({ ...prev, installationGuide: e.target.value }))}
              placeholder="وصف دليل التركيب"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">متطلبات الصيانة</label>
            <div className="space-y-2">
              {formData.maintenanceRequirements.map((req, idx) => (
                <div key={idx} className="flex justify-between items-center bg-secondary p-2 rounded">
                  <span>{req}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      maintenanceRequirements: prev.maintenanceRequirements.filter((_, i) => i !== idx)
                    }))}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newMaintenance}
                  onChange={(e) => setNewMaintenance(e.target.value)}
                  placeholder="أضف متطلب صيانة"
                />
                <Button onClick={handleAddMaintenance} size="sm">إضافة</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* تبويب الوسائط والملحقات */}
        <TabsContent value="media" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">صور المنتج</label>
            <div className="space-y-2">
              {formData.images.map((img, idx) => (
                <div key={idx} className="flex justify-between items-center bg-secondary p-2 rounded">
                  <img src={img} alt="product" className="w-12 h-12 rounded object-cover" />
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

          <div>
            <label className="block text-sm font-medium mb-2">الألواح المتوافقة</label>
            <div className="space-y-2">
              {formData.compatiblePanels.map((panel, idx) => (
                <div key={idx} className="flex justify-between items-center bg-secondary p-2 rounded text-sm">
                  <span>{panel.brand}: {panel.minPower}-{panel.maxPower}W</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      compatiblePanels: prev.compatiblePanels.filter((_, i) => i !== idx)
                    }))}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-2">
                <Input
                  value={newCompatiblePanel.brand}
                  onChange={(e) => setNewCompatiblePanel(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="العلامة التجارية"
                />
                <Input
                  type="number"
                  value={newCompatiblePanel.minPower}
                  onChange={(e) => setNewCompatiblePanel(prev => ({ ...prev, minPower: parseFloat(e.target.value) }))}
                  placeholder="الحد الأدنى (W)"
                />
                <Input
                  type="number"
                  value={newCompatiblePanel.maxPower}
                  onChange={(e) => setNewCompatiblePanel(prev => ({ ...prev, maxPower: parseFloat(e.target.value) }))}
                  placeholder="الحد الأعلى (W)"
                />
              </div>
              <Button onClick={handleAddCompatiblePanel} size="sm">إضافة لوح متوافق</Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">الملحقات</label>
            <div className="space-y-2">
              {formData.accessories.map((accessory, idx) => (
                <div key={idx} className="flex justify-between items-center bg-secondary p-2 rounded text-sm">
                  <div>
                    <span className="font-medium">{accessory.name}</span>
                    <div className="text-xs text-muted-foreground">{accessory.description}</div>
                    <div className="text-xs">{accessory.price} ر.س</div>
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
              <div className="grid grid-cols-3 gap-2">
                <Input
                  value={newAccessory.name}
                  onChange={(e) => setNewAccessory(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="اسم الملحق"
                />
                <Input
                  value={newAccessory.description}
                  onChange={(e) => setNewAccessory(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="الوصف"
                />
                <Input
                  type="number"
                  value={newAccessory.price}
                  onChange={(e) => setNewAccessory(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  placeholder="السعر"
                />
              </div>
              <Button onClick={handleAddAccessory} size="sm">إضافة ملحق</Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">العلامات (Tags)</label>
            <Textarea
              value={formData.tags.join(", ")}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                tags: e.target.value.split(",").map(tag => tag.trim()).filter(tag => tag)
              }))}
              placeholder="اكتب العلامات مفصولة بفواصل"
              rows={2}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>إلغاء</Button>
        <Button onClick={() => {
          if (!formData.name || !formData.manufacturerId) {
            toast.error("يرجى ملء الحقول المطلوبة");
            return;
          }
          onSave(formData);
        }}>
          {inverter ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </div>
  );
}

// مكون نموذج إضافة/تعديل شركة مصنعة
function InverterManufacturerForm({
  manufacturer,
  onSave,
  onClose,
}: {
  manufacturer: InverterManufacturer | null;
  onSave: (manufacturer: InverterManufacturer) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<InverterManufacturer>(
    manufacturer || {
      id: Date.now().toString(),
      name: "",
      logo: "",
      description: "",
      country: "",
      founded: new Date().getFullYear(),
      warranty: "5 سنوات",
      certifications: []
    }
  );

  const [newCertification, setNewCertification] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setFormData(prev => ({ ...prev, logo: imageData }));
        toast.success("تم رفع الشعار بنجاح");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification]
      }));
      setNewCertification("");
    }
  };

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>
          {manufacturer ? "تعديل شركة مصنعة" : "إضافة شركة مصنعة جديدة"}
        </DialogTitle>
      </DialogHeader>

      <div>
        <label className="block text-sm font-medium mb-2">اسم الشركة</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="مثال: SMA Solar"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">الدولة</label>
        <Input
          value={formData.country}
          onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
          placeholder="مثال: ألمانيا"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">سنة التأسيس</label>
        <Input
          type="number"
          value={formData.founded}
          onChange={(e) => setFormData(prev => ({ ...prev, founded: parseInt(e.target.value) }))}
          placeholder="مثال: 1981"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">مدة الضمان</label>
        <Input
          value={formData.warranty}
          onChange={(e) => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
          placeholder="مثال: 10 سنوات"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">شعار الشركة</label>
        {formData.logo && (
          <img src={formData.logo} alt="company" className="w-full h-40 object-contain rounded-lg mb-2 bg-white p-4" />
        )}
        <label className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer block">
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-6 h-6" />
            <span className="text-sm">اضغط لرفع شعار</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">الوصف</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="وصف الشركة المصنعة"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">الشهادات</label>
        <div className="space-y-2">
          {formData.certifications.map((cert, idx) => (
            <div key={idx} className="flex justify-between items-center bg-secondary p-2 rounded">
              <span>{cert}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  certifications: prev.certifications.filter((_, i) => i !== idx)
                }))}
              >
                ✕
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Input
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              placeholder="أضف شهادة"
            />
            <Button onClick={handleAddCertification} size="sm">إضافة</Button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>إلغاء</Button>
        <Button onClick={() => {
          if (!formData.name) {
            toast.error("يرجى ملء الحقول المطلوبة");
            return;
          }
          onSave(formData);
        }}>
          {manufacturer ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </div>
  );
}