// app/admin/accessories/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Eye, Upload, Package, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  STORAGE_KEY_ACCESSORIES,
  Accessory,
  AccessoryCategory,
  loadAccessories,
  saveAccessories,
  loadAccessoryCategories,
  saveAccessoryCategories
} from "@/lib/accessories-storage";

export default function AccessoriesAdmin() {
  const [activeTab, setActiveTab] = useState("products");
  const [categories, setCategories] = useState<AccessoryCategory[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingAccessory, setEditingAccessory] = useState<Accessory | null>(null);
  const [editingCategory, setEditingCategory] = useState<AccessoryCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // تحميل البيانات من localStorage
  useEffect(() => {
    const savedCategories = loadAccessoryCategories();
    const savedAccessories = loadAccessories();
    
    setCategories(savedCategories);
    setAccessories(savedAccessories);
  }, []);

  // إضافة/تعديل فئة
  const handleSaveCategory = (category: AccessoryCategory) => {
    let updatedCategories;
    if (editingCategory) {
      updatedCategories = categories.map(c => 
        c.id === category.id ? category : c
      );
      toast.success("تم تحديث الفئة بنجاح");
    } else {
      updatedCategories = [...categories, category];
      toast.success("تم إضافة الفئة بنجاح");
    }
    
    setCategories(updatedCategories);
    saveAccessoryCategories(updatedCategories);
    setIsCategoryDialogOpen(false);
    setEditingCategory(null);
  };

  // إضافة/تعديل ملحق
  const handleSaveAccessory = (accessory: Accessory) => {
    let updatedAccessories;
    if (editingAccessory) {
      updatedAccessories = accessories.map(a => 
        a.id === accessory.id ? accessory : a
      );
      toast.success("تم تحديث الملحق بنجاح");
    } else {
      updatedAccessories = [...accessories, accessory];
      toast.success("تم إضافة الملحق بنجاح");
    }
    
    setAccessories(updatedAccessories);
    saveAccessories(updatedAccessories);
    setIsDialogOpen(false);
    setEditingAccessory(null);
  };

  // حذف فئة
  const handleDeleteCategory = (id: string) => {
    // التحقق من وجود ملحقات في هذه الفئة
    const accessoriesInCategory = accessories.filter(a => a.categoryId === id);
    if (accessoriesInCategory.length > 0) {
      toast.error("لا يمكن حذف الفئة لأنها تحتوي على ملحقات");
      return;
    }
    
    if (confirm("هل أنت متأكد من حذف هذه الفئة؟")) {
      const updated = categories.filter(c => c.id !== id);
      setCategories(updated);
      saveAccessoryCategories(updated);
      toast.success("تم حذف الفئة بنجاح");
    }
  };

  // حذف ملحق
  const handleDeleteAccessory = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الملحق؟")) {
      const updated = accessories.filter(a => a.id !== id);
      setAccessories(updated);
      saveAccessories(updated);
      toast.success("تم حذف الملحق بنجاح");
    }
  };

  // تصدير البيانات
  const exportData = () => {
    const data = {
      categories,
      accessories,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'accessories-data.json';
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
          
          if (data.categories && data.accessories) {
            setCategories(data.categories);
            setAccessories(data.accessories);
            saveAccessoryCategories(data.categories);
            saveAccessories(data.accessories);
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

  // عرض معاينة الملحقات
  const previewAccessories = () => {
    window.open('/accessories', '_blank');
  };

  // فلترة الملحقات
  const filteredAccessories = accessories.filter(accessory =>
    accessory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    accessory.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">لوحة تحكم الملحقات الشمسية</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={previewAccessories}>
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
            <TabsTrigger value="products">الملحقات ({accessories.length})</TabsTrigger>
            <TabsTrigger value="categories">الفئات ({categories.length})</TabsTrigger>
          </TabsList>

          {/* تبويب الملحقات */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-2xl font-semibold">إدارة الملحقات الشمسية</h2>
              <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="ابحث عن ملحق..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setEditingAccessory(null)}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة ملحق
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <AccessoryForm
                      accessory={editingAccessory}
                      categories={categories}
                      onSave={handleSaveAccessory}
                      onClose={() => setIsDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الصورة</TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead>الفئة</TableHead>
                    <TableHead>السعر (ر.س)</TableHead>
                    <TableHead>المخزون</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccessories.map(accessory => (
                    <TableRow key={accessory.id}>
                      <TableCell>
                        {accessory.image && (
                          <img 
                            src={accessory.image} 
                            alt={accessory.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{accessory.name}</TableCell>
                      <TableCell>
                        {categories.find(c => c.id === accessory.categoryId)?.name || "غير مصنف"}
                      </TableCell>
                      <TableCell>{accessory.price.toLocaleString()}</TableCell>
                      <TableCell>{accessory.stock}</TableCell>
                      <TableCell>
                        <Badge variant={accessory.available ? "default" : "secondary"}>
                          {accessory.available ? "متوفر" : "غير متوفر"}
                        </Badge>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingAccessory(accessory);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteAccessory(accessory.id)}
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

          {/* تبويب الفئات */}
          <TabsContent value="categories" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">إدارة فئات الملحقات</h2>
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setEditingCategory(null)}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة فئة
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <CategoryForm
                    category={editingCategory}
                    onSave={handleSaveCategory}
                    onClose={() => setIsCategoryDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map(category => (
                <Card key={category.id} className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {accessories.filter(a => a.categoryId === category.id).length} ملحق
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setEditingCategory(category);
                        setIsCategoryDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleDeleteCategory(category.id)}
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

// مكون نموذج إضافة/تعديل ملحق
function AccessoryForm({
  accessory,
  categories,
  onSave,
  onClose,
}: {
  accessory: Accessory | null;
  categories: AccessoryCategory[];
  onSave: (accessory: Accessory) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Accessory>(
    accessory || {
      id: Date.now().toString(),
      name: "",
      categoryId: categories[0]?.id || "",
      description: "",
      price: 0,
      image: "",
      stock: 0,
      available: true,
      features: [],
      specifications: {},
      warranty: "",
      compatibility: [],
      documents: [],
      createdAt: new Date().toISOString(),
    }
  );

  const [newFeature, setNewFeature] = useState("");
  const [newCompatibility, setNewCompatibility] = useState("");
  const [newDocument, setNewDocument] = useState({ name: "", url: "" });
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setFormData(prev => ({ ...prev, image: imageData }));
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

  const handleAddCompatibility = () => {
    if (newCompatibility.trim()) {
      setFormData(prev => ({
        ...prev,
        compatibility: [...prev.compatibility, newCompatibility]
      }));
      setNewCompatibility("");
    }
  };

  const handleAddDocument = () => {
    if (newDocument.name.trim() && newDocument.url.trim()) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, newDocument]
      }));
      setNewDocument({ name: "", url: "" });
    }
  };

  const handleAddSpecification = () => {
    if (specKey.trim() && specValue.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: { ...prev.specifications, [specKey]: specValue }
      }));
      setSpecKey("");
      setSpecValue("");
    }
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>
          {accessory ? "تعديل ملحق" : "إضافة ملحق جديد"}
        </DialogTitle>
      </DialogHeader>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">معلومات أساسية</TabsTrigger>
          <TabsTrigger value="details">التفاصيل</TabsTrigger>
          <TabsTrigger value="compatibility">التوافق</TabsTrigger>
        </TabsList>

        {/* تبويب المعلومات الأساسية */}
        <TabsContent value="basic" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">اسم الملحق</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="مثال: إطار تركيب ألومنيوم"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">الفئة</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
              className="w-full border rounded-md p-2"
            >
              <option value="">اختر فئة</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">الوصف</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="وصف الملحق"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">السعر (ر.س)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
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

          <div>
            <label className="block text-sm font-medium mb-2">صورة الملحق</label>
            {formData.image && (
              <img src={formData.image} alt="accessory" className="w-full h-40 object-cover rounded-lg mb-2" />
            )}
            <label className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer block">
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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.available}
              onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
              id="available"
            />
            <label htmlFor="available" className="text-sm font-medium">متوفر للبيع</label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">الضمان</label>
            <Input
              value={formData.warranty}
              onChange={(e) => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
              placeholder="مثال: 5 سنوات"
            />
          </div>
        </TabsContent>

        {/* تبويب التفاصيل */}
        <TabsContent value="details" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">الميزات</label>
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
            <label className="block text-sm font-medium mb-2">المواصفات</label>
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
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  placeholder="اسم المواصفة"
                />
                <Input
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  placeholder="قيمة المواصفة"
                />
                <Button onClick={handleAddSpecification} size="sm">إضافة</Button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">المستندات</label>
            <div className="space-y-2">
              {formData.documents.map((doc, idx) => (
                <div key={idx} className="flex justify-between items-center bg-secondary p-2 rounded text-sm">
                  <span>{doc.name}</span>
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
                />
                <Input
                  value={newDocument.url}
                  onChange={(e) => setNewDocument(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="رابط الملف PDF"
                />
                <Button onClick={handleAddDocument} size="sm">إضافة مستند</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* تبويب التوافق */}
        <TabsContent value="compatibility" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">توافق مع المنتجات</label>
            <div className="space-y-2">
              {formData.compatibility.map((comp, idx) => (
                <div key={idx} className="flex justify-between items-center bg-secondary p-2 rounded">
                  <span>{comp}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      compatibility: prev.compatibility.filter((_, i) => i !== idx)
                    }))}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newCompatibility}
                  onChange={(e) => setNewCompatibility(e.target.value)}
                  placeholder="مثال: جميع ألواح SunPower"
                />
                <Button onClick={handleAddCompatibility} size="sm">إضافة</Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              يمكنك كتابة "جميع الألواح الشمسية" أو "لوح شمسي 400 واط"
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>إلغاء</Button>
        <Button onClick={() => {
          if (!formData.name || !formData.categoryId) {
            toast.error("يرجى ملء الحقول المطلوبة");
            return;
          }
          onSave(formData);
        }}>
          {accessory ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </div>
  );
}

// مكون نموذج إضافة/تعديل فئة
function CategoryForm({
  category,
  onSave,
  onClose,
}: {
  category: AccessoryCategory | null;
  onSave: (category: AccessoryCategory) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<AccessoryCategory>(
    category || {
      id: Date.now().toString(),
      name: "",
      description: "",
      icon: "📦",
    }
  );

  const icons = ["🛠️", "🔌", "🎮", "🧹", "🛡️", "📏", "🔋", "⚡", "🌞", "📡", "🖥️", "📱", "🔦", "📦", "⚙️", "🔧"];

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>
          {category ? "تعديل فئة" : "إضافة فئة جديدة"}
        </DialogTitle>
      </DialogHeader>

      <div>
        <label className="block text-sm font-medium mb-2">اسم الفئة</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="مثال: أنظمة التركيب"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">الوصف</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="وصف الفئة"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">الأيقونة</label>
        <div className="grid grid-cols-8 gap-2 mb-4">
          {icons.map((icon, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, icon }))}
              className={`w-10 h-10 text-xl flex items-center justify-center rounded-lg border-2 ${
                formData.icon === icon
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
          <span className="text-2xl">{formData.icon}</span>
          <Input
            value={formData.icon}
            onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
            placeholder="اكتب أيقونة"
            className="flex-1"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          اختر أيقونة من القائمة أو اكتب أيقونة يدوياً
        </p>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>إلغاء</Button>
        <Button onClick={() => {
          if (!formData.name) {
            toast.error("يرجى ملء اسم الفئة");
            return;
          }
          onSave(formData);
        }}>
          {category ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </div>
  );
}