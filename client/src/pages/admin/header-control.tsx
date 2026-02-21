// app/admin/header/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Eye, Upload, Save, RefreshCw, EyeOff, Eye as EyeIcon, Smartphone, Monitor, Link as LinkIcon, Settings as SettingsIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  STORAGE_KEY_HEADER_SETTINGS,
  STORAGE_KEY_PAGE_VISIBILITY,
  HeaderNavigationSettings,
  PageVisibilitySettings,
  HeaderGeneralSettings,
  saveHeaderSettings,
  savePageVisibility,
  saveGeneralSettings,
  loadHeaderSettings,
  loadPageVisibility,
  loadGeneralSettings,
  getDefaultHeaderSettings,
  getDefaultPageVisibility,
  getDefaultGeneralSettings,
  getHeaderConfig
} from "@/lib/header-settings";

export default function HeaderAdmin() {
  const [activeTab, setActiveTab] = useState("navigation");
  const [headerSettings, setHeaderSettings] = useState<HeaderNavigationSettings[]>([]);
  const [pageVisibility, setPageVisibility] = useState<PageVisibilitySettings[]>([]);
  const [generalSettings, setGeneralSettings] = useState<HeaderGeneralSettings>(getDefaultGeneralSettings());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPageDialogOpen, setIsPageDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HeaderNavigationSettings | null>(null);
  const [editingPage, setEditingPage] = useState<PageVisibilitySettings | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  // تحميل البيانات من localStorage
  useEffect(() => {
    const savedNav = loadHeaderSettings();
    const savedPages = loadPageVisibility();
    const savedGeneral = loadGeneralSettings();

    setHeaderSettings(savedNav.length > 0 ? savedNav : getDefaultHeaderSettings());
    setPageVisibility(savedPages.length > 0 ? savedPages : getDefaultPageVisibility());
    setGeneralSettings(savedGeneral);
    
    // حفظ البيانات الافتراضية إذا لم تكن موجودة
    if (savedNav.length === 0) {
      saveHeaderSettings(getDefaultHeaderSettings());
    }
    if (savedPages.length === 0) {
      savePageVisibility(getDefaultPageVisibility());
    }
    if (!savedGeneral) {
      saveGeneralSettings(getDefaultGeneralSettings());
    }
  }, []);

  // إضافة/تعديل عنصر تنقل
  const handleSaveNavigation = (item: HeaderNavigationSettings) => {
    let updatedItems;
    if (editingItem) {
      updatedItems = headerSettings.map(i => i.id === item.id ? item : i);
      toast.success("تم تحديث عنصر التنقل");
    } else {
      updatedItems = [...headerSettings, item];
      toast.success("تم إضافة عنصر التنقل");
    }
    
    setHeaderSettings(updatedItems);
    saveHeaderSettings(updatedItems);
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  // إضافة/تعديل صفحة
  const handleSavePage = (page: PageVisibilitySettings) => {
    let updatedPages;
    if (editingPage) {
      updatedPages = pageVisibility.map(p => p.id === page.id ? page : p);
      toast.success("تم تحديث إعدادات الصفحة");
    } else {
      updatedPages = [...pageVisibility, page];
      toast.success("تم إضافة الصفحة");
    }
    
    setPageVisibility(updatedPages);
    savePageVisibility(updatedPages);
    setIsPageDialogOpen(false);
    setEditingPage(null);
  };

  // تحديث الإعدادات العامة
  const handleSaveGeneralSettings = (settings: HeaderGeneralSettings) => {
    setGeneralSettings(settings);
    saveGeneralSettings(settings);
    toast.success("تم حفظ الإعدادات العامة");
  };

  // حذف عنصر تنقل
  const handleDeleteNavigation = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا العنصر؟")) {
      const updated = headerSettings.filter(item => item.id !== id);
      setHeaderSettings(updated);
      saveHeaderSettings(updated);
      toast.success("تم حذف العنصر");
    }
  };

  // حذف صفحة
  const handleDeletePage = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الصفحة؟")) {
      const updated = pageVisibility.filter(page => page.id !== id);
      setPageVisibility(updated);
      savePageVisibility(updated);
      toast.success("تم حذف الصفحة");
    }
  };

  // تصدير الإعدادات
  const exportSettings = () => {
    const data = {
      headerSettings,
      pageVisibility,
      generalSettings,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'header-settings.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success("تم تصدير الإعدادات");
  };

  // استيراد الإعدادات
  const importSettings = () => {
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
          
          if (data.headerSettings && data.pageVisibility && data.generalSettings) {
            setHeaderSettings(data.headerSettings);
            setPageVisibility(data.pageVisibility);
            setGeneralSettings(data.generalSettings);
            saveHeaderSettings(data.headerSettings);
            savePageVisibility(data.pageVisibility);
            saveGeneralSettings(data.generalSettings);
            toast.success("تم استيراد الإعدادات بنجاح");
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

  // إعادة التعيين للإعدادات الافتراضية
  const resetToDefaults = () => {
    if (confirm("هل أنت متأكد من إعادة التعيين للإعدادات الافتراضية؟ سيتم فقدان جميع التعديلات.")) {
      setHeaderSettings(getDefaultHeaderSettings());
      setPageVisibility(getDefaultPageVisibility());
      setGeneralSettings(getDefaultGeneralSettings());
      saveHeaderSettings(getDefaultHeaderSettings());
      savePageVisibility(getDefaultPageVisibility());
      saveGeneralSettings(getDefaultGeneralSettings());
      toast.success("تمت إعادة التعيين للإعدادات الافتراضية");
    }
  };

  // عرض معاينة الهيدر
  const previewHeader = () => {
    const config = getHeaderConfig();
    console.log("Current Header Config:", config);
    toast.success("تم تحميل إعدادات الهيدر", {
      description: "افتح وحدة التحكم للمعاينة"
    });
  };

  // تبديل حالة الصفحة
  const togglePageVisibility = (id: string, type: 'header' | 'mobile') => {
    const updated = pageVisibility.map(page => {
      if (page.id === id) {
        return {
          ...page,
          visibleInHeader: type === 'header' ? !page.visibleInHeader : page.visibleInHeader,
          visibleInMobileMenu: type === 'mobile' ? !page.visibleInMobileMenu : page.visibleInMobileMenu
        };
      }
      return page;
    });
    
    setPageVisibility(updated);
    savePageVisibility(updated);
    toast.success("تم تحديث إعدادات الظهور");
  };

  // تبديل حالة عنصر التنقل
  const toggleNavigationStatus = (id: string) => {
    const updated = headerSettings.map(item => {
      if (item.id === id) {
        return { ...item, enabled: !item.enabled };
      }
      return item;
    });
    
    setHeaderSettings(updated);
    saveHeaderSettings(updated);
    toast.success("تم تحديث حالة العنصر");
  };

  // ترتيب العناصر
  const reorderItem = (id: string, direction: 'up' | 'down') => {
    const items = [...headerSettings];
    const index = items.findIndex(item => item.id === id);
    
    if (direction === 'up' && index > 0) {
      [items[index], items[index - 1]] = [items[index - 1], items[index]];
      items[index].order = index + 1;
      items[index - 1].order = index;
    } else if (direction === 'down' && index < items.length - 1) {
      [items[index], items[index + 1]] = [items[index + 1], items[index]];
      items[index].order = index + 1;
      items[index + 1].order = index + 2;
    }
    
    setHeaderSettings(items);
    saveHeaderSettings(items);
    toast.success("تم إعادة الترتيب");
  };

  // الأيقونات المتاحة
  const availableIcons = [
    'ShoppingBag', 'Car', 'Wrench', 'FolderKanban', 'LifeBuoy', 'Info',
    'Home', 'ShoppingCart', 'Heart', 'User', 'Bell', 'MessageCircle',
    'Package', 'Zap', 'Battery', 'Cpu', 'Sun', 'PanelTop',
    'Truck', 'Headphones', 'ShieldCheck', 'Users', 'Award', 'MapPin',
    'Calculator', 'FileText', 'BookOpen', 'Video', 'Download', 'Settings'
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">لوحة تحكم الهيدر</h1>
            <p className="text-muted-foreground">إدارة ظهور وإخفاء الصفحات في شريط التنقل</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={previewHeader}>
              <EyeIcon className="w-4 h-4 ml-2" />
              معاينة الهيدر
            </Button>
            <Button variant="outline" onClick={exportSettings}>
              تصدير الإعدادات
            </Button>
            <Button variant="outline" onClick={importSettings}>
              استيراد الإعدادات
            </Button>
            <Button variant="outline" onClick={resetToDefaults}>
              <RefreshCw className="w-4 h-4 ml-2" />
              إعادة تعيين
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="navigation">عناصر التنقل ({headerSettings.length})</TabsTrigger>
            <TabsTrigger value="pages">إظهار الصفحات ({pageVisibility.length})</TabsTrigger>
            <TabsTrigger value="general">الإعدادات العامة</TabsTrigger>
            <TabsTrigger value="preview">المعاينة</TabsTrigger>
          </TabsList>

          {/* تبويب عناصر التنقل */}
          <TabsContent value="navigation" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">إدارة عناصر التنقل الرئيسية</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsSettingsDialogOpen(true)}
                  className="gap-2"
                >
                  <SettingsIcon className="w-4 h-4" />
                  إعدادات متقدمة
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setEditingItem(null)}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة عنصر
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <NavigationForm
                      item={editingItem}
                      onSave={handleSaveNavigation}
                      onClose={() => setIsDialogOpen(false)}
                      availableIcons={availableIcons}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الترتيب</TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead>الرابط</TableHead>
                    <TableHead>الأيقونة</TableHead>
                    <TableHead>التصنيف</TableHead>
                    <TableHead>سطح المكتب</TableHead>
                    <TableHead>الموبايل</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {headerSettings
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => reorderItem(item.id, 'up')}
                              disabled={item.order === 1}
                            >
                              ↑
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => reorderItem(item.id, 'down')}
                              disabled={item.order === headerSettings.length}
                            >
                              ↓
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.label}</span>
                            {item.isNew && <Badge variant="secondary">جديد</Badge>}
                            {item.isPopular && <Badge variant="default">شائع</Badge>}
                          </div>
                        </TableCell>
                        <TableCell>{item.href}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{item.icon}</Badge>
                            <div className={`w-4 h-4 rounded ${item.color?.replace('text-', 'bg-')}`} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={item.showInDesktop}
                            onCheckedChange={() => {
                              const updated = headerSettings.map(i => 
                                i.id === item.id ? { ...i, showInDesktop: !i.showInDesktop } : i
                              );
                              setHeaderSettings(updated);
                              saveHeaderSettings(updated);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={item.showInMobile}
                            onCheckedChange={() => {
                              const updated = headerSettings.map(i => 
                                i.id === item.id ? { ...i, showInMobile: !i.showInMobile } : i
                              );
                              setHeaderSettings(updated);
                              saveHeaderSettings(updated);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={item.enabled}
                              onCheckedChange={() => toggleNavigationStatus(item.id)}
                            />
                            <Badge variant={item.enabled ? "default" : "secondary"}>
                              {item.enabled ? "مفعل" : "معطل"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingItem(item);
                                setIsDialogOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteNavigation(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* تبويب إظهار الصفحات */}
          <TabsContent value="pages" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">التحكم في ظهور الصفحات</h2>
              <Dialog open={isPageDialogOpen} onOpenChange={setIsPageDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setEditingPage(null)}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة صفحة
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <PageVisibilityForm
                    page={editingPage}
                    onSave={handleSavePage}
                    onClose={() => setIsPageDialogOpen(false)}
                    availableIcons={availableIcons}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pageVisibility.map((page) => (
                <Card key={page.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{page.pageName}</h3>
                      <p className="text-sm text-muted-foreground truncate">{page.pagePath}</p>
                    </div>
                    <Badge variant="outline">{page.pageCategory}</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">الظهور في الهيدر</span>
                      <Switch
                        checked={page.visibleInHeader}
                        onCheckedChange={() => togglePageVisibility(page.id, 'header')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">الظهور في الموبايل</span>
                      <Switch
                        checked={page.visibleInMobileMenu}
                        onCheckedChange={() => togglePageVisibility(page.id, 'mobile')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">الروابط السريعة</span>
                      <Switch
                        checked={page.showInQuickLinks}
                        onCheckedChange={() => {
                          const updated = pageVisibility.map(p => 
                            p.id === page.id ? { ...p, showInQuickLinks: !p.showInQuickLinks } : p
                          );
                          setPageVisibility(updated);
                          savePageVisibility(updated);
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">الحالة</span>
                      <Switch
                        checked={page.enabled}
                        onCheckedChange={() => {
                          const updated = pageVisibility.map(p => 
                            p.id === page.id ? { ...p, enabled: !p.enabled } : p
                          );
                          setPageVisibility(updated);
                          savePageVisibility(updated);
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setEditingPage(page);
                        setIsPageDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleDeletePage(page.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* تبويب الإعدادات العامة */}
          <TabsContent value="general" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">الإعدادات العامة للهيدر</h2>
              <Button
                onClick={() => handleSaveGeneralSettings(generalSettings)}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                حفظ الإعدادات
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">الشريط العلوي</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>إظهار شريط الإعلانات</Label>
                    <Switch
                      checked={generalSettings.showAnnouncementBar}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, showAnnouncementBar: checked }))
                      }
                    />
                  </div>
                  
                  <div>
                    <Label>نص الإعلان</Label>
                    <Input
                      value={generalSettings.announcementText}
                      onChange={(e) => 
                        setGeneralSettings(prev => ({ ...prev, announcementText: e.target.value }))
                      }
                      className="mt-2"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>شريط البحث</Label>
                    <Switch
                      checked={generalSettings.showSearchBar}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, showSearchBar: checked }))
                      }
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">عناصر التحكم</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>محدد اللغة</Label>
                    <Switch
                      checked={generalSettings.showLanguageSelector}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, showLanguageSelector: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>عربة التسوق</Label>
                    <Switch
                      checked={generalSettings.showCart}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, showCart: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>المفضلة</Label>
                    <Switch
                      checked={generalSettings.showFavorites}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, showFavorites: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>الإشعارات</Label>
                    <Switch
                      checked={generalSettings.showNotifications}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, showNotifications: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>الرسائل</Label>
                    <Switch
                      checked={generalSettings.showMessages}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, showMessages: checked }))
                      }
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">التخصيص</h3>
                <div className="space-y-4">
                  <div>
                    <Label>نمط الهيدر</Label>
                    <Select
                      value={generalSettings.headerStyle}
                      onValueChange={(value: 'default' | 'professional' | 'minimal') => 
                        setGeneralSettings(prev => ({ ...prev, headerStyle: value }))
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">افتراضي</SelectItem>
                        <SelectItem value="professional">احترافي</SelectItem>
                        <SelectItem value="minimal">بسيط</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>لون السمة</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="color"
                        value={generalSettings.themeColor}
                        onChange={(e) => 
                          setGeneralSettings(prev => ({ ...prev, themeColor: e.target.value }))
                        }
                        className="w-12 h-12 p-1"
                      />
                      <span className="text-sm">{generalSettings.themeColor}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>هيدر ثابت</Label>
                    <Switch
                      checked={generalSettings.stickyHeader}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, stickyHeader: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>قائمة الموبايل</Label>
                    <Switch
                      checked={generalSettings.enableMobileMenu}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, enableMobileMenu: checked }))
                      }
                    />
                  </div>
                  
                  <div>
                    <Label>عدد الروابط السريعة</Label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={generalSettings.maxQuickLinks}
                      onChange={(e) => 
                        setGeneralSettings(prev => ({ ...prev, maxQuickLinks: parseInt(e.target.value) }))
                      }
                      className="mt-2"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* تبويب المعاينة */}
          <TabsContent value="preview" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">معاينة الهيدر</h2>
              <div className="flex gap-2">
                <Button
                  variant={previewMode === 'desktop' ? 'default' : 'outline'}
                  onClick={() => setPreviewMode('desktop')}
                  className="gap-2"
                >
                  <Monitor className="w-4 h-4" />
                  سطح المكتب
                </Button>
                <Button
                  variant={previewMode === 'mobile' ? 'default' : 'outline'}
                  onClick={() => setPreviewMode('mobile')}
                  className="gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  الموبايل
                </Button>
              </div>
            </div>

            <Card className="p-6">
              <div className={`border rounded-lg overflow-hidden ${previewMode === 'desktop' ? '' : 'max-w-md mx-auto'}`}>
                {/* محاكاة الهيدر */}
                <div className="bg-white dark:bg-gray-900 p-4 border-b">
                  <div className="flex items-center justify-between">
                    {/* شريط الإعلانات */}
                    {generalSettings.showAnnouncementBar && (
                      <div className="bg-gradient-to-r from-primary to-primary/80 text-white text-xs px-4 py-1.5 rounded-full mb-2">
                        {generalSettings.announcementText}
                      </div>
                    )}
                    
                    {/* محاكاة العناصر */}
                    <div className="flex gap-4">
                      {headerSettings
                        .filter(item => item.enabled && (
                          previewMode === 'desktop' ? item.showInDesktop : item.showInMobile
                        ))
                        .sort((a, b) => a.order - b.order)
                        .map(item => (
                          <div
                            key={item.id}
                            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                          >
                            <span className="text-xs font-medium">{item.label}</span>
                            {item.badge && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-primary text-white rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        ))}
                    </div>
                    
                    {/* عناصر التحكم */}
                    <div className="flex gap-2">
                      {generalSettings.showCart && (
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <span className="text-xs">🛒</span>
                        </div>
                      )}
                      {generalSettings.showLanguageSelector && (
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <span className="text-xs">🌐</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* الروابط السريعة */}
                  {generalSettings.showQuickLinks && (
                    <div className="flex gap-2 mt-4">
                      {pageVisibility
                        .filter(page => page.showInQuickLinks && page.enabled)
                        .slice(0, generalSettings.maxQuickLinks)
                        .map(page => (
                          <div
                            key={page.id}
                            className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100 dark:bg-gray-800"
                          >
                            <span className="text-xs">{page.pageName}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                
                {/* المعلومات التوضيحية */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800">
                  <h4 className="font-bold mb-2">ملخص الإعدادات:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">عناصر التنقل:</span>
                      <span className="font-medium ml-2">
                        {headerSettings.filter(item => item.enabled).length}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">الصفحات الظاهرة:</span>
                      <span className="font-medium ml-2">
                        {pageVisibility.filter(page => page.enabled && page.visibleInHeader).length}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">الروابط السريعة:</span>
                      <span className="font-medium ml-2">
                        {pageVisibility.filter(page => page.showInQuickLinks).length}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">نمط الهيدر:</span>
                      <span className="font-medium ml-2">
                        {generalSettings.headerStyle === 'professional' ? 'احترافي' : 
                         generalSettings.headerStyle === 'minimal' ? 'بسيط' : 'افتراضي'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-bold mb-2">التعليمات:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• العناصر باللون الرمادي تم تعطيلها ولن تظهر</li>
                  <li>• استخدم أزرار الأسهم لإعادة ترتيب العناصر</li>
                  <li>• يمكنك إخفاء العناصر من الموبايل مع إبقائها ظاهرة في سطح المكتب</li>
                  <li>• التغييرات تحفظ تلقائياً في localStorage</li>
                  <li>• يمكنك تصدير واستيراد الإعدادات للنسخ الاحتياطي</li>
                </ul>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* إعدادات متقدمة */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>الإعدادات المتقدمة</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-bold mb-2">تنظيف ذاكرة التخزين:</h4>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  localStorage.removeItem(STORAGE_KEY_HEADER_SETTINGS);
                  localStorage.removeItem(STORAGE_KEY_PAGE_VISIBILITY);
                  localStorage.removeItem('header_general_settings');
                  toast.success("تم تنظيف ذاكرة التخزين");
                  setTimeout(() => window.location.reload(), 1000);
                }}
              >
                مسح جميع الإعدادات
              </Button>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">نسخ إعدادات الهيدر:</h4>
              <Textarea
                readOnly
                value={JSON.stringify(getHeaderConfig(), null, 2)}
                rows={10}
                className="font-mono text-xs"
              />
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(getHeaderConfig()));
                  toast.success("تم نسخ الإعدادات");
                }}
              >
                نسخ الإعدادات
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// نموذج إضافة/تعديل عنصر تنقل
function NavigationForm({
  item,
  onSave,
  onClose,
  availableIcons
}: {
  item: HeaderNavigationSettings | null;
  onSave: (item: HeaderNavigationSettings) => void;
  onClose: () => void;
  availableIcons: string[];
}) {
  const [formData, setFormData] = useState<HeaderNavigationSettings>(
    item || {
      id: Date.now().toString(),
      label: "",
      href: "",
      icon: "File",
      category: "products",
      enabled: true,
      order: 1,
      showInDesktop: true,
      showInMobile: true,
      badge: "",
      isNew: false,
      isPopular: false,
      color: "text-primary",
      description: "",
      features: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  );

  const categories = [
    { value: 'products', label: 'المنتجات' },
    { value: 'services', label: 'الخدمات' },
    { value: 'projects', label: 'المشاريع' },
    { value: 'support', label: 'الدعم' },
    { value: 'about', label: 'عنّا' },
    { value: 'electric-cars', label: 'السيارات الكهربائية' }
  ];

  const colors = [
    { value: 'text-primary', label: 'أساسي' },
    { value: 'text-amber-600', label: 'كهرماني' },
    { value: 'text-blue-600', label: 'أزرق' },
    { value: 'text-green-600', label: 'أخضر' },
    { value: 'text-purple-600', label: 'بنفسجي' },
    { value: 'text-red-600', label: 'أحمر' },
    { value: 'text-pink-600', label: 'وردي' },
    { value: 'text-emerald-600', label: 'زمردي' }
  ];

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>{item ? "تعديل عنصر التنقل" : "إضافة عنصر تنقل جديد"}</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <Label>اسم العنصر</Label>
          <Input
            value={formData.label}
            onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
            placeholder="مثال: المنتجات"
          />
        </div>

        <div>
          <Label>الرابط</Label>
          <Input
            value={formData.href}
            onChange={(e) => setFormData(prev => ({ ...prev, href: e.target.value }))}
            placeholder="/products"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>التصنيف</Label>
            <Select
              value={formData.category}
              onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>الترتيب</Label>
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
              min="1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>الأيقونة</Label>
            <Select
              value={formData.icon}
              onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableIcons.map(icon => (
                  <SelectItem key={icon} value={icon}>
                    {icon}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>اللون</Label>
            <Select
              value={formData.color}
              onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {colors.map(color => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${color.value.replace('text-', 'bg-')}`} />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>الوصف</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="وصف قصير للعنصر"
            rows={2}
          />
        </div>

        <div>
          <Label>الشارة (Badge)</Label>
          <Input
            value={formData.badge || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
            placeholder="مثال: جديد، الأكثر مبيعاً"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="isNew"
              checked={formData.isNew}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isNew: checked }))}
            />
            <Label htmlFor="isNew">علامة "جديد"</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isPopular"
              checked={formData.isPopular}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPopular: checked }))}
            />
            <Label htmlFor="isPopular">علامة "شائع"</Label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="showInDesktop"
              checked={formData.showInDesktop}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showInDesktop: checked }))}
            />
            <Label htmlFor="showInDesktop">الظهور في سطح المكتب</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="showInMobile"
              checked={formData.showInMobile}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showInMobile: checked }))}
            />
            <Label htmlFor="showInMobile">الظهور في الموبايل</Label>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="enabled"
            checked={formData.enabled}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enabled: checked }))}
          />
          <Label htmlFor="enabled">مفعل</Label>
        </div>

        <div>
          <Label>المميزات (كل ميزة في سطر)</Label>
          <Textarea
            value={formData.features?.join("\n") || ""}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              features: e.target.value.split("\n").filter(f => f.trim())
            }))}
            placeholder="كفاءة عالية\nضمان 30 سنة\nتركيب مجاني"
            rows={3}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>إلغاء</Button>
        <Button onClick={() => {
          if (!formData.label || !formData.href) {
            toast.error("يرجى ملء الحقول المطلوبة");
            return;
          }
          onSave(formData);
        }}>
          {item ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </div>
  );
}

// نموذج إضافة/تعديل صفحة
function PageVisibilityForm({
  page,
  onSave,
  onClose,
  availableIcons
}: {
  page: PageVisibilitySettings | null;
  onSave: (page: PageVisibilitySettings) => void;
  onClose: () => void;
  availableIcons: string[];
}) {
  const [formData, setFormData] = useState<PageVisibilitySettings>(
    page || {
      id: Date.now().toString(),
      pageName: "",
      pagePath: "",
      pageCategory: "products",
      visibleInHeader: true,
      visibleInMobileMenu: true,
      showInQuickLinks: false,
      order: 1,
      enabled: true,
      showBadge: false,
      badgeText: "",
      showIcon: true,
      iconName: "File",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  );

  const categories = [
    { value: 'products', label: 'المنتجات' },
    { value: 'services', label: 'الخدمات' },
    { value: 'projects', label: 'المشاريع' },
    { value: 'support', label: 'الدعم' },
    { value: 'about', label: 'عنّا' },
    { value: 'electric-cars', label: 'السيارات الكهربائية' }
  ];

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>{page ? "تعديل إعدادات الصفحة" : "إضافة صفحة جديدة"}</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <Label>اسم الصفحة</Label>
          <Input
            value={formData.pageName}
            onChange={(e) => setFormData(prev => ({ ...prev, pageName: e.target.value }))}
            placeholder="مثال: الألواح الشمسية"
          />
        </div>

        <div>
          <Label>مسار الصفحة</Label>
          <Input
            value={formData.pagePath}
            onChange={(e) => setFormData(prev => ({ ...prev, pagePath: e.target.value }))}
            placeholder="/solar-panels"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>التصنيف</Label>
            <Select
              value={formData.pageCategory}
              onValueChange={(value: string) => setFormData(prev => ({ ...prev, pageCategory: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>الترتيب</Label>
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
              min="1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold">إعدادات الظهور:</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="visibleInHeader"
                checked={formData.visibleInHeader}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, visibleInHeader: checked }))}
              />
              <Label htmlFor="visibleInHeader">الظهور في الهيدر</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="visibleInMobileMenu"
                checked={formData.visibleInMobileMenu}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, visibleInMobileMenu: checked }))}
              />
              <Label htmlFor="visibleInMobileMenu">الظهور في الموبايل</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showInQuickLinks"
                checked={formData.showInQuickLinks}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showInQuickLinks: checked }))}
              />
              <Label htmlFor="showInQuickLinks">الروابط السريعة</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="enabled"
                checked={formData.enabled}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enabled: checked }))}
              />
              <Label htmlFor="enabled">مفعلة</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold">العناصر الاختيارية:</h4>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="showBadge"
              checked={formData.showBadge}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showBadge: checked }))}
            />
            <Label htmlFor="showBadge">إظهار شارة</Label>
          </div>

          {formData.showBadge && (
            <div>
              <Label>نص الشارة</Label>
              <Input
                value={formData.badgeText || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, badgeText: e.target.value }))}
                placeholder="جديد"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              id="showIcon"
              checked={formData.showIcon}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showIcon: checked }))}
            />
            <Label htmlFor="showIcon">إظهار الأيقونة</Label>
          </div>

          {formData.showIcon && (
            <div>
              <Label>اختر الأيقونة</Label>
              <Select
                value={formData.iconName}
                onValueChange={(value) => setFormData(prev => ({ ...prev, iconName: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableIcons.map(icon => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>إلغاء</Button>
        <Button onClick={() => {
          if (!formData.pageName || !formData.pagePath) {
            toast.error("يرجى ملء الحقول المطلوبة");
            return;
          }
          onSave(formData);
        }}>
          {page ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </div>
  );
}