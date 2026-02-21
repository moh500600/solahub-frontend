// app/admin/footer/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { 
  Plus, Edit, Trash2, Eye, Upload, Save, RefreshCw, 
  EyeOff, Eye as EyeIcon, Smartphone, Monitor, Link as LinkIcon, 
  Settings as SettingsIcon, Image, Link, ExternalLink, Globe,
  Grid3X3, Palette, Layers, Mail, Phone, CreditCard,
  Heart, ArrowUp, Download, Building, Users, Package,
  Shield, Truck, Award, Headphones, Battery, Zap,
  PanelTop, Cpu, LifeBuoy, FileText, Lock, CheckCircle,
  Facebook, Twitter, Instagram, Youtube, MessageSquare
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  STORAGE_KEY_FOOTER_SETTINGS,
  STORAGE_KEY_FOOTER_GENERAL,
  FooterSection,
  FooterLink,
  FooterGeneralSettings,
  SocialLink,
  ContactInfo,
  PaymentMethod,
  Feature,
  saveFooterSections,
  saveFooterGeneralSettings,
  saveSocialLinks,
  saveContactInfo,
  savePaymentMethods,
  saveFeatures,
  loadFooterSections,
  loadFooterGeneralSettings,
  loadSocialLinks,
  loadContactInfo,
  loadPaymentMethods,
  loadFeatures,
  getDefaultFooterSections,
  getDefaultGeneralSettings,
  getDefaultSocialLinks,
  getDefaultContactInfo,
  getDefaultPaymentMethods,
  getDefaultFeatures,
  getFooterConfig
} from "@/lib/footer-settings";

export default function FooterAdmin() {
  const [activeTab, setActiveTab] = useState("sections");
  const [footerSections, setFooterSections] = useState<FooterSection[]>([]);
  const [generalSettings, setGeneralSettings] = useState<FooterGeneralSettings>(getDefaultGeneralSettings());
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  
  // حالات النوافذ المنبثقة
  const [isSectionDialogOpen, setIsSectionDialogOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  
  // العناصر قيد التعديل
  const [editingSection, setEditingSection] = useState<FooterSection | null>(null);
  const [editingLink, setEditingLink] = useState<FooterLink | null>(null);
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);
  const [editingContact, setEditingContact] = useState<ContactInfo | null>(null);
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  
  // تحميل البيانات
  useEffect(() => {
    const loadData = () => {
      setFooterSections(loadFooterSections().length > 0 ? loadFooterSections() : getDefaultFooterSections());
      setGeneralSettings(loadFooterGeneralSettings());
      setSocialLinks(loadSocialLinks().length > 0 ? loadSocialLinks() : getDefaultSocialLinks());
      setContactInfo(loadContactInfo().length > 0 ? loadContactInfo() : getDefaultContactInfo());
      setPaymentMethods(loadPaymentMethods().length > 0 ? loadPaymentMethods() : getDefaultPaymentMethods());
      setFeatures(loadFeatures().length > 0 ? loadFeatures() : getDefaultFeatures());
    };
    
    loadData();
  }, []);

  // حذف القسم
  const handleDeleteSection = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا القسم؟ سيتم حذف جميع الروابط التابعة له.")) {
      const updated = footerSections.filter(section => section.id !== id);
      setFooterSections(updated);
      saveFooterSections(updated);
      toast.success("تم حذف القسم");
    }
  };

  // حذف الرابط
  const handleDeleteLink = (linkId: string, sectionId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الرابط؟")) {
      const updated = footerSections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            items: section.items.filter(item => item.id !== linkId)
          };
        }
        return section;
      });
      setFooterSections(updated);
      saveFooterSections(updated);
      toast.success("تم حذف الرابط");
    }
  };

  // إضافة/تعديل قسم
  const handleSaveSection = (section: FooterSection) => {
    let updated;
    if (editingSection) {
      updated = footerSections.map(s => s.id === section.id ? section : s);
      toast.success("تم تحديث القسم");
    } else {
      updated = [...footerSections, section];
      toast.success("تم إضافة قسم جديد");
    }
    
    setFooterSections(updated);
    saveFooterSections(updated);
    setIsSectionDialogOpen(false);
    setEditingSection(null);
  };

  // إضافة/تعديل رابط
  const handleSaveLink = (link: FooterLink) => {
    const updated = footerSections.map(section => {
      if (section.id === link.sectionId) {
        const existingIndex = section.items.findIndex(item => item.id === link.id);
        if (existingIndex > -1) {
          // تحديث الرابط الموجود
          const newItems = [...section.items];
          newItems[existingIndex] = link;
          return { ...section, items: newItems };
        } else {
          // إضافة رابط جديد
          return { ...section, items: [...section.items, link] };
        }
      }
      return section;
    });
    
    setFooterSections(updated);
    saveFooterSections(updated);
    setIsLinkDialogOpen(false);
    setEditingLink(null);
    toast.success(link.id ? "تم تحديث الرابط" : "تم إضافة الرابط");
  };

  // إضافة/تعديل رابط تواصل اجتماعي
  const handleSaveSocial = (social: SocialLink) => {
    let updated;
    if (editingSocial) {
      updated = socialLinks.map(s => s.id === social.id ? social : s);
      toast.success("تم تحديث رابط التواصل");
    } else {
      updated = [...socialLinks, social];
      toast.success("تم إضافة رابط تواصل جديد");
    }
    
    setSocialLinks(updated);
    saveSocialLinks(updated);
    setIsSocialDialogOpen(false);
    setEditingSocial(null);
  };

  // إضافة/تعديل معلومات الاتصال
  const handleSaveContact = (contact: ContactInfo) => {
    let updated;
    if (editingContact) {
      updated = contactInfo.map(c => c.id === contact.id ? contact : c);
      toast.success("تم تحديث معلومات الاتصال");
    } else {
      updated = [...contactInfo, contact];
      toast.success("تم إضافة معلومات اتصال جديدة");
    }
    
    setContactInfo(updated);
    saveContactInfo(updated);
    setIsContactDialogOpen(false);
    setEditingContact(null);
  };

  // إضافة/تعديل طريقة دفع
  const handleSavePayment = (payment: PaymentMethod) => {
    let updated;
    if (editingPayment) {
      updated = paymentMethods.map(p => p.id === payment.id ? payment : p);
      toast.success("تم تحديث طريقة الدفع");
    } else {
      updated = [...paymentMethods, payment];
      toast.success("تم إضافة طريقة دفع جديدة");
    }
    
    setPaymentMethods(updated);
    savePaymentMethods(updated);
    setIsPaymentDialogOpen(false);
    setEditingPayment(null);
  };

  // إضافة/تعديل ميزة
  const handleSaveFeature = (feature: Feature) => {
    let updated;
    if (editingFeature) {
      updated = features.map(f => f.id === feature.id ? feature : f);
      toast.success("تم تحديث الميزة");
    } else {
      updated = [...features, feature];
      toast.success("تم إضافة ميزة جديدة");
    }
    
    setFeatures(updated);
    saveFeatures(updated);
    setIsFeatureDialogOpen(false);
    setEditingFeature(null);
  };

  // حفظ الإعدادات العامة
  const handleSaveGeneralSettings = () => {
    saveFooterGeneralSettings(generalSettings);
    toast.success("تم حفظ الإعدادات العامة");
  };

  // تصدير الإعدادات
  const exportSettings = () => {
    const data = {
      footerSections,
      generalSettings,
      socialLinks,
      contactInfo,
      paymentMethods,
      features,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'footer-settings.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success("تم تصدير إعدادات الفوتر");
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
          
          if (data.footerSections && data.generalSettings) {
            setFooterSections(data.footerSections);
            setGeneralSettings(data.generalSettings);
            setSocialLinks(data.socialLinks || []);
            setContactInfo(data.contactInfo || []);
            setPaymentMethods(data.paymentMethods || []);
            setFeatures(data.features || []);
            
            saveFooterSections(data.footerSections);
            saveFooterGeneralSettings(data.generalSettings);
            if (data.socialLinks) saveSocialLinks(data.socialLinks);
            if (data.contactInfo) saveContactInfo(data.contactInfo);
            if (data.paymentMethods) savePaymentMethods(data.paymentMethods);
            if (data.features) saveFeatures(data.features);
            
            toast.success("تم استيراد إعدادات الفوتر");
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

  // إعادة التعيين
  const resetToDefaults = () => {
    if (confirm("هل أنت متأكد من إعادة التعيين للإعدادات الافتراضية؟ سيتم فقدان جميع التعديلات.")) {
      setFooterSections(getDefaultFooterSections());
      setGeneralSettings(getDefaultGeneralSettings());
      setSocialLinks(getDefaultSocialLinks());
      setContactInfo(getDefaultContactInfo());
      setPaymentMethods(getDefaultPaymentMethods());
      setFeatures(getDefaultFeatures());
      
      saveFooterSections(getDefaultFooterSections());
      saveFooterGeneralSettings(getDefaultGeneralSettings());
      saveSocialLinks(getDefaultSocialLinks());
      saveContactInfo(getDefaultContactInfo());
      savePaymentMethods(getDefaultPaymentMethods());
      saveFeatures(getDefaultFeatures());
      
      toast.success("تمت إعادة التعيين للإعدادات الافتراضية");
    }
  };

  // معاينة الفوتر
  const previewFooter = () => {
    const config = getFooterConfig();
    console.log("Current Footer Config:", config);
    toast.success("تم تحميل إعدادات الفوتر", {
      description: "افتح وحدة التحكم للمعاينة"
    });
  };

  // تغيير ترتيب القسم
  const reorderSection = (id: string, direction: 'up' | 'down') => {
    const sections = [...footerSections];
    const index = sections.findIndex(section => section.id === id);
    
    if (direction === 'up' && index > 0) {
      [sections[index], sections[index - 1]] = [sections[index - 1], sections[index]];
      sections[index].order = index + 1;
      sections[index - 1].order = index;
    } else if (direction === 'down' && index < sections.length - 1) {
      [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
      sections[index].order = index + 1;
      sections[index + 1].order = index + 2;
    }
    
    setFooterSections(sections);
    saveFooterSections(sections);
    toast.success("تم إعادة ترتيب الأقسام");
  };

  // تغيير ترتيب الرابط
  const reorderLink = (linkId: string, sectionId: string, direction: 'up' | 'down') => {
    const sections = [...footerSections];
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex === -1) return;
    
    const links = [...sections[sectionIndex].items];
    const linkIndex = links.findIndex(l => l.id === linkId);
    
    if (direction === 'up' && linkIndex > 0) {
      [links[linkIndex], links[linkIndex - 1]] = [links[linkIndex - 1], links[linkIndex]];
      links[linkIndex].order = linkIndex + 1;
      links[linkIndex - 1].order = linkIndex;
    } else if (direction === 'down' && linkIndex < links.length - 1) {
      [links[linkIndex], links[linkIndex + 1]] = [links[linkIndex + 1], links[linkIndex]];
      links[linkIndex].order = linkIndex + 1;
      links[linkIndex + 1].order = linkIndex + 2;
    }
    
    sections[sectionIndex].items = links;
    setFooterSections(sections);
    saveFooterSections(sections);
    toast.success("تم إعادة ترتيب الروابط");
  };

  // الأيقونات المتاحة مع دعم الروابط الخارجية
  const availableIcons = [
    'Sun', 'Mail', 'Phone', 'MapPin', 'Facebook', 'Twitter', 'Instagram', 
    'Youtube', 'Shield', 'Truck', 'CreditCard', 'Headphones', 'Battery', 
    'Zap', 'PanelTop', 'Settings', 'Package', 'Globe', 'Award', 'Clock', 
    'CheckCircle', 'CardIcon', 'Smartphone', 'Lock', 'ChevronUp', 'Heart', 
    'MessageSquare', 'Building', 'Users', 'FileText', 'ArrowLeft', 
    'SmartphoneIcon', 'ShoppingBag', 'Cpu', 'LifeBuoy', 'ExternalLink'
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">لوحة تحكم الفوتر</h1>
            <p className="text-muted-foreground">إدارة وإعدادات تذييل الموقع</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={previewFooter}>
              <EyeIcon className="w-4 h-4 ml-2" />
              معاينة الفوتر
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
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="sections">الأقسام</TabsTrigger>
            <TabsTrigger value="social">التواصل</TabsTrigger>
            <TabsTrigger value="contact">الاتصال</TabsTrigger>
            <TabsTrigger value="payment">الدفع</TabsTrigger>
            <TabsTrigger value="features">المميزات</TabsTrigger>
            <TabsTrigger value="general">الإعدادات</TabsTrigger>
            <TabsTrigger value="preview">المعاينة</TabsTrigger>
          </TabsList>

          {/* تبويب الأقسام */}
          <TabsContent value="sections" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">إدارة أقسام الفوتر</h2>
              <div className="flex gap-2">
                <Dialog open={isSectionDialogOpen} onOpenChange={setIsSectionDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setEditingSection(null)}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة قسم
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <SectionForm
                      section={editingSection}
                      onSave={handleSaveSection}
                      onClose={() => setIsSectionDialogOpen(false)}
                      availableIcons={availableIcons}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {footerSections
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <Card key={section.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${section.bgColor.includes('from-') ? `bg-gradient-to-br ${section.bgColor}` : section.bgColor} rounded-lg flex items-center justify-center`}>
                          {/* سيتم عرض الأيقونة هنا */}
                          <div className="w-5 h-5" style={{ color: section.color.replace('text-', '#') }} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{section.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {section.items.length} رابط
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => reorderSection(section.id, 'up')}
                          disabled={section.order === 1}
                        >
                          ↑
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => reorderSection(section.id, 'down')}
                          disabled={section.order === footerSections.length}
                        >
                          ↓
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {section.items
                        .sort((a, b) => a.order - b.order)
                        .map((link) => (
                          <div key={link.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <div className="flex items-center gap-2">
                              {link.iconUrl ? (
                                <img src={link.iconUrl} alt={link.name} className="w-4 h-4" />
                              ) : (
                                <div className="w-4 h-4" />
                              )}
                              <span className="text-sm font-medium">{link.name}</span>
                              {link.external && (
                                <ExternalLink className="w-3 h-3 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => reorderLink(link.id, section.id, 'up')}
                                disabled={link.order === 1}
                              >
                                ↑
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => reorderLink(link.id, section.id, 'down')}
                                disabled={link.order === section.items.length}
                              >
                                ↓
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setEditingLink({
                            id: '',
                            name: '',
                            href: '',
                            icon: 'Link',
                            external: false,
                            sectionId: section.id,
                            enabled: true,
                            order: section.items.length + 1,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                          });
                          setIsLinkDialogOpen(true);
                        }}
                      >
                        <Plus className="w-4 h-4" />
                        إضافة رابط
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingSection(section);
                          setIsSectionDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteSection(section.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* تبويب التواصل الاجتماعي */}
          <TabsContent value="social" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">روابط التواصل الاجتماعي</h2>
              <Dialog open={isSocialDialogOpen} onOpenChange={setIsSocialDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setEditingSocial(null)}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة رابط
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <SocialForm
                    social={editingSocial}
                    onSave={handleSaveSocial}
                    onClose={() => setIsSocialDialogOpen(false)}
                    availableIcons={availableIcons}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <Card className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المنصة</TableHead>
                    <TableHead>الأيقونة</TableHead>
                    <TableHead>الرابط</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {socialLinks
                    .sort((a, b) => a.order - b.order)
                    .map((social) => (
                      <TableRow key={social.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded flex items-center justify-center ${social.bgColor}`}>
                              {/* الأيقونة */}
                            </div>
                            <span className="font-medium">{social.label}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {social.iconUrl ? (
                            <img src={social.iconUrl} alt={social.platform} className="w-6 h-6" />
                          ) : (
                            <span className="text-sm">{social.icon}</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {social.href}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={social.enabled}
                            onCheckedChange={(checked) => {
                              const updated = socialLinks.map(s => 
                                s.id === social.id ? { ...s, enabled: checked } : s
                              );
                              setSocialLinks(updated);
                              saveSocialLinks(updated);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingSocial(social);
                                setIsSocialDialogOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                const updated = socialLinks.filter(s => s.id !== social.id);
                                setSocialLinks(updated);
                                saveSocialLinks(updated);
                                toast.success("تم حذف رابط التواصل");
                              }}
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

          {/* تبويب الإعدادات العامة */}
          <TabsContent value="general" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">الإعدادات العامة للفوتر</h2>
              <Button
                onClick={handleSaveGeneralSettings}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                حفظ الإعدادات
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* الإعدادات الأساسية */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <SettingsIcon className="w-5 h-5" />
                  الإعدادات الأساسية
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>اسم الشركة</Label>
                    <Input
                      value={generalSettings.companyName}
                      onChange={(e) => 
                        setGeneralSettings(prev => ({ ...prev, companyName: e.target.value }))
                      }
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>شعار الشركة</Label>
                    <Input
                      value={generalSettings.companySlogan}
                      onChange={(e) => 
                        setGeneralSettings(prev => ({ ...prev, companySlogan: e.target.value }))
                      }
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>وصف الشركة</Label>
                    <Textarea
                      value={generalSettings.companyDescription}
                      onChange={(e) => 
                        setGeneralSettings(prev => ({ ...prev, companyDescription: e.target.value }))
                      }
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label>رقم السجل التجاري</Label>
                    <Input
                      value={generalSettings.registrationNumber}
                      onChange={(e) => 
                        setGeneralSettings(prev => ({ ...prev, registrationNumber: e.target.value }))
                      }
                      className="mt-2"
                    />
                  </div>
                </div>
              </Card>

              {/* إعدادات المظهر */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  إعدادات المظهر
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>اللون الأساسي</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          type="color"
                          value={generalSettings.primaryColor}
                          onChange={(e) => 
                            setGeneralSettings(prev => ({ ...prev, primaryColor: e.target.value }))
                          }
                          className="w-12 h-12 p-1"
                        />
                        <span className="text-sm">{generalSettings.primaryColor}</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label>لون الخلفية</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          type="color"
                          value={generalSettings.backgroundColor}
                          onChange={(e) => 
                            setGeneralSettings(prev => ({ ...prev, backgroundColor: e.target.value }))
                          }
                          className="w-12 h-12 p-1"
                        />
                        <span className="text-sm">{generalSettings.backgroundColor}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>حجم الزوايا</Label>
                    <Select
                      value={generalSettings.roundedCorners}
                      onValueChange={(value: 'none' | 'sm' | 'md' | 'lg' | 'xl') => 
                        setGeneralSettings(prev => ({ ...prev, roundedCorners: value }))
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">بدون زوايا</SelectItem>
                        <SelectItem value="sm">صغيرة</SelectItem>
                        <SelectItem value="md">متوسطة</SelectItem>
                        <SelectItem value="lg">كبيرة</SelectItem>
                        <SelectItem value="xl">كبيرة جداً</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>شدة الظلال</Label>
                    <Select
                      value={generalSettings.shadowIntensity}
                      onValueChange={(value: 'none' | 'sm' | 'md' | 'lg' | 'xl') => 
                        setGeneralSettings(prev => ({ ...prev, shadowIntensity: value }))
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">بدون ظلال</SelectItem>
                        <SelectItem value="sm">خفيفة</SelectItem>
                        <SelectItem value="md">متوسطة</SelectItem>
                        <SelectItem value="lg">قوية</SelectItem>
                        <SelectItem value="xl">قوية جداً</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableAnimations"
                        checked={generalSettings.enableAnimations}
                        onCheckedChange={(checked) => 
                          setGeneralSettings(prev => ({ ...prev, enableAnimations: checked }))
                        }
                      />
                      <Label htmlFor="enableAnimations">الحركات</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableHoverEffects"
                        checked={generalSettings.enableHoverEffects}
                        onCheckedChange={(checked) => 
                          setGeneralSettings(prev => ({ ...prev, enableHoverEffects: checked }))
                        }
                      />
                      <Label htmlFor="enableHoverEffects">تأثيرات التحويم</Label>
                    </div>
                  </div>
                </div>
              </Card>

              {/* التحكم في العناصر */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  التحكم في العناصر
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>عرض المميزات</Label>
                    <Switch
                      checked={generalSettings.showFeatures}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, showFeatures: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>النشرة البريدية</Label>
                    <Switch
                      checked={generalSettings.showNewsletter}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, showNewsletter: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>طرق الدفع</Label>
                    <Switch
                      checked={generalSettings.showPaymentMethods}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, showPaymentMethods: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>تحميل التطبيقات</Label>
                    <Switch
                      checked={generalSettings.showDownloadApps}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, showDownloadApps: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>زر الأعلى</Label>
                    <Switch
                      checked={generalSettings.showScrollToTop}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, showScrollToTop: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>صنع بحب</Label>
                    <Switch
                      checked={generalSettings.showMadeWithLove}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, showMadeWithLove: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>إظهار السنة</Label>
                    <Switch
                      checked={generalSettings.showCurrentYear}
                      onCheckedChange={(checked) => 
                        setGeneralSettings(prev => ({ ...prev, showCurrentYear: checked }))
                      }
                    />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* تبويب المعاينة */}
          <TabsContent value="preview" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">معاينة الفوتر</h2>
            </div>

            <Card className="p-6">
              <div className="border rounded-lg overflow-hidden max-w-4xl mx-auto">
                {/* محاكاة الفوتر */}
                <div className="bg-white dark:bg-gray-900 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* العلامة التجارية */}
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Sun className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{generalSettings.companyName}</h3>
                          <p className="text-sm text-muted-foreground">{generalSettings.companySlogan}</p>
                        </div>
                      </div>
                    </div>

                    {/* الروابط السريعة */}
                    <div className="md:col-span-2">
                      <div className="grid grid-cols-2 gap-4">
                        {footerSections.slice(0, 2).map(section => (
                          <div key={section.id}>
                            <h4 className="font-semibold mb-2">{section.title}</h4>
                            <ul className="space-y-1">
                              {section.items.slice(0, 3).map(link => (
                                <li key={link.id}>
                                  <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                                    {link.name}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* معلومات الاتصال */}
                  <div className="border-t pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        © {generalSettings.showCurrentYear ? new Date().getFullYear() : ''} {generalSettings.companyName}
                      </div>
                      <div className="flex gap-4">
                        {socialLinks.slice(0, 3).map(social => (
                          <div key={social.id} className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                            {/* أيقونة */}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-2">ملخص الإعدادات:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">الأقسام:</span>
                    <span className="font-medium ml-2">
                      {footerSections.length}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">الروابط:</span>
                    <span className="font-medium ml-2">
                      {footerSections.reduce((sum, section) => sum + section.items.length, 0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">التواصل:</span>
                    <span className="font-medium ml-2">
                      {socialLinks.filter(s => s.enabled).length}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">المميزات:</span>
                    <span className="font-medium ml-2">
                      {features.filter(f => f.enabled).length}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* نموذج إضافة/تعديل قسم */}
        <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
          <DialogContent className="max-w-md">
            <LinkForm
              link={editingLink}
              sections={footerSections}
              onSave={handleSaveLink}
              onClose={() => setIsLinkDialogOpen(false)}
              availableIcons={availableIcons}
            />
          </DialogContent>
        </Dialog>

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
                    localStorage.removeItem(STORAGE_KEY_FOOTER_SETTINGS);
                    localStorage.removeItem(STORAGE_KEY_FOOTER_GENERAL);
                    localStorage.removeItem('footer_social_links');
                    localStorage.removeItem('footer_contact_info');
                    localStorage.removeItem('footer_payment_methods');
                    localStorage.removeItem('footer_features');
                    toast.success("تم تنظيف ذاكرة التخزين");
                    setTimeout(() => window.location.reload(), 1000);
                  }}
                >
                  مسح جميع إعدادات الفوتر
                </Button>
              </div>
              
              <div>
                <h4 className="font-bold mb-2">نسخ إعدادات الفوتر:</h4>
                <Textarea
                  readOnly
                  value={JSON.stringify(getFooterConfig(), null, 2)}
                  rows={10}
                  className="font-mono text-xs"
                />
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(getFooterConfig()));
                    toast.success("تم نسخ إعدادات الفوتر");
                  }}
                >
                  نسخ الإعدادات
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// نموذج إضافة/تعديل قسم
function SectionForm({
  section,
  onSave,
  onClose,
  availableIcons
}: {
  section: FooterSection | null;
  onSave: (section: FooterSection) => void;
  onClose: () => void;
  availableIcons: string[];
}) {
  const [formData, setFormData] = useState<FooterSection>(
    section || {
      id: Date.now().toString(),
      title: "",
      type: "products",
      icon: "Package",
      color: "text-blue-600",
      bgColor: "from-blue-100 to-blue-50",
      enabled: true,
      order: 1,
      columns: 1,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  );

  const sectionTypes = [
    { value: 'products', label: 'المنتجات', icon: 'Package' },
    { value: 'company', label: 'الشركة', icon: 'Building' },
    { value: 'support', label: 'الدعم', icon: 'Headphones' },
    { value: 'legal', label: 'قانوني', icon: 'FileText' },
    { value: 'contact', label: 'الاتصال', icon: 'Phone' },
    { value: 'newsletter', label: 'النشرة', icon: 'Mail' },
    { value: 'payment', label: 'الدفع', icon: 'CreditCard' }
  ];

  const colors = [
    { value: 'text-blue-600', label: 'أزرق', bg: 'from-blue-100 to-blue-50' },
    { value: 'text-green-600', label: 'أخضر', bg: 'from-green-100 to-green-50' },
    { value: 'text-purple-600', label: 'بنفسجي', bg: 'from-purple-100 to-purple-50' },
    { value: 'text-orange-600', label: 'برتقالي', bg: 'from-orange-100 to-orange-50' },
    { value: 'text-red-600', label: 'أحمر', bg: 'from-red-100 to-red-50' },
    { value: 'text-primary', label: 'أساسي', bg: 'from-primary/10 to-primary/5' }
  ];

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>{section ? "تعديل القسم" : "إضافة قسم جديد"}</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <Label>عنوان القسم</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="مثال: منتجاتنا"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>نوع القسم</Label>
            <Select
              value={formData.type}
              onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sectionTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>عدد الأعمدة</Label>
            <Select
              value={formData.columns?.toString() || "1"}
              onValueChange={(value) => setFormData(prev => ({ ...prev, columns: parseInt(value) }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">عمود واحد</SelectItem>
                <SelectItem value="2">عمودان</SelectItem>
              </SelectContent>
            </Select>
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
              onValueChange={(value) => {
                const selectedColor = colors.find(c => c.value === value);
                setFormData(prev => ({ 
                  ...prev, 
                  color: value,
                  bgColor: selectedColor?.bg || prev.bgColor
                }));
              }}
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
          <Label>الترتيب</Label>
          <Input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
            min="1"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="enabled"
            checked={formData.enabled}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enabled: checked }))}
          />
          <Label htmlFor="enabled">مفعل</Label>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>إلغاء</Button>
        <Button onClick={() => {
          if (!formData.title) {
            toast.error("يرجى إدخال عنوان القسم");
            return;
          }
          onSave(formData);
        }}>
          {section ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </div>
  );
}

// نموذج إضافة/تعديل رابط
function LinkForm({
  link,
  sections,
  onSave,
  onClose,
  availableIcons
}: {
  link: FooterLink | null;
  sections: FooterSection[];
  onSave: (link: FooterLink) => void;
  onClose: () => void;
  availableIcons: string[];
}) {
  const [formData, setFormData] = useState<FooterLink>(
    link || {
      id: Date.now().toString(),
      name: "",
      href: "",
      icon: "Link",
      external: false,
      sectionId: sections[0]?.id || "",
      enabled: true,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  );

  const [iconUrl, setIconUrl] = useState(link?.iconUrl || "");
  const [useCustomIcon, setUseCustomIcon] = useState(!!link?.iconUrl);

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>{link ? "تعديل الرابط" : "إضافة رابط جديد"}</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <Label>اسم الرابط</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="مثال: الألواح الشمسية"
          />
        </div>

        <div>
          <Label>الرابط</Label>
          <Input
            value={formData.href}
            onChange={(e) => setFormData(prev => ({ ...prev, href: e.target.value }))}
            placeholder="/products/solar-panels"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>القسم</Label>
            <Select
              value={formData.sectionId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, sectionId: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sections.map(section => (
                  <SelectItem key={section.id} value={section.id}>
                    {section.title}
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
          <div className="flex items-center justify-between">
            <Label>الأيقونة</Label>
            <div className="flex items-center gap-2">
              <Switch
                id="useCustomIcon"
                checked={useCustomIcon}
                onCheckedChange={setUseCustomIcon}
              />
              <Label htmlFor="useCustomIcon" className="text-sm">
                أيقونة مخصصة
              </Label>
            </div>
          </div>

          {useCustomIcon ? (
            <div>
              <Label>رابط الأيقونة الخارجي</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                  placeholder="https://example.com/icon.png"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (iconUrl) {
                      // اختبار تحميل الصورة
                      const img = new Image();
                      img.onload = () => toast.success("تم تحميل الأيقونة بنجاح");
                      img.onerror = () => toast.error("فشل تحميل الأيقونة");
                      img.src = iconUrl;
                    }
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                يجب أن يكون الرابط مباشراً للصورة (PNG, SVG, JPG)
              </p>
            </div>
          ) : (
            <div>
              <Label>اختر الأيقونة</Label>
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
          )}
        </div>

        <div>
          <Label>الوصف (اختياري)</Label>
          <Input
            value={formData.description || ""}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="وصف قصير للرابط"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="external"
              checked={formData.external}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, external: checked }))}
            />
            <Label htmlFor="external">رابط خارجي</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="enabled"
              checked={formData.enabled}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enabled: checked }))}
            />
            <Label htmlFor="enabled">مفعل</Label>
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>إلغاء</Button>
        <Button onClick={() => {
          if (!formData.name || !formData.href || !formData.sectionId) {
            toast.error("يرجى ملء الحقول المطلوبة");
            return;
          }
          
          const finalData = {
            ...formData,
            iconUrl: useCustomIcon ? iconUrl : undefined,
            updatedAt: new Date().toISOString()
          };
          
          onSave(finalData);
        }}>
          {link ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </div>
  );
}

// نموذج إضافة/تعديل رابط تواصل اجتماعي
function SocialForm({
  social,
  onSave,
  onClose,
  availableIcons
}: {
  social: SocialLink | null;
  onSave: (social: SocialLink) => void;
  onClose: () => void;
  availableIcons: string[];
}) {
  const [formData, setFormData] = useState<SocialLink>(
    social || {
      id: Date.now().toString(),
      platform: "facebook",
      icon: "Facebook",
      href: "",
      color: "text-white",
      bgColor: "bg-[#1877F2]",
      label: "Facebook",
      enabled: true,
      order: 1
    }
  );

  const [iconUrl, setIconUrl] = useState(social?.iconUrl || "");
  const [useCustomIcon, setUseCustomIcon] = useState(!!social?.iconUrl);

  const platforms = [
    { value: 'facebook', label: 'Facebook', icon: 'Facebook', bgColor: 'bg-[#1877F2]' },
    { value: 'twitter', label: 'Twitter', icon: 'Twitter', bgColor: 'bg-[#1DA1F2]' },
    { value: 'instagram', label: 'Instagram', icon: 'Instagram', bgColor: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]' },
    { value: 'youtube', label: 'YouTube', icon: 'Youtube', bgColor: 'bg-[#FF0000]' },
    { value: 'whatsapp', label: 'WhatsApp', icon: 'MessageSquare', bgColor: 'bg-[#25D366]' },
    { value: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', bgColor: 'bg-[#0077B5]' }
  ];

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>{social ? "تعديل رابط التواصل" : "إضافة رابط تواصل جديد"}</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <Label>المنصة</Label>
          <Select
            value={formData.platform}
            onValueChange={(value) => {
              const platform = platforms.find(p => p.value === value);
              setFormData(prev => ({ 
                ...prev, 
                platform: value,
                label: platform?.label || prev.label,
                bgColor: platform?.bgColor || prev.bgColor,
                icon: platform?.icon || prev.icon
              }));
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {platforms.map(platform => (
                <SelectItem key={platform.value} value={platform.value}>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${platform.bgColor}`} />
                    {platform.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>الرابط</Label>
          <Input
            value={formData.href}
            onChange={(e) => setFormData(prev => ({ ...prev, href: e.target.value }))}
            placeholder="https://facebook.com/username"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>الأيقونة</Label>
            <div className="flex items-center gap-2">
              <Switch
                id="useCustomIcon"
                checked={useCustomIcon}
                onCheckedChange={setUseCustomIcon}
              />
              <Label htmlFor="useCustomIcon" className="text-sm">
                أيقونة مخصصة
              </Label>
            </div>
          </div>

          {useCustomIcon ? (
            <div>
              <Label>رابط الأيقونة الخارجي</Label>
              <Input
                value={iconUrl}
                onChange={(e) => setIconUrl(e.target.value)}
                placeholder="https://example.com/icon.png"
                className="mt-2"
              />
            </div>
          ) : (
            <div>
              <Label>اختر الأيقونة</Label>
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
          )}
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

        <div className="flex items-center space-x-2">
          <Switch
            id="enabled"
            checked={formData.enabled}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enabled: checked }))}
          />
          <Label htmlFor="enabled">مفعل</Label>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>إلغاء</Button>
        <Button onClick={() => {
          if (!formData.href) {
            toast.error("يرجى إدخال الرابط");
            return;
          }
          
          const finalData = {
            ...formData,
            iconUrl: useCustomIcon ? iconUrl : undefined
          };
          
          onSave(finalData);
        }}>
          {social ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </div>
  );
}