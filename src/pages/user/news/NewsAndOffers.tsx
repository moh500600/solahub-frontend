import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Newspaper,
  Tag,
  Zap,
  TrendingUp,
  Calendar,
  User,
  Search,
  Heart,
  Share2,
  BookmarkIcon
} from 'lucide-react';

export default function NewsAndOffers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedOffers, setSavedOffers] = useState<number[]>([]);

  const news = [
    {
      id: 1,
      title: "إطلاق تقنية الألواح ثنائية الوجه في السوق السعودي",
      description: "نعلن عن وصول أحدث تقنيات الطاقة الشمسية التي تزيد الكفاءة بنسبة 25% مقارنة بالألواح التقليدية.",
      category: "news",
      date: "2024-03-15",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w-400",
      author: "فريق التطوير",
      readTime: "5 دقائق",
      featured: true
    },
    {
      id: 2,
      title: "دليل شامل لاختيار نظام الطاقة الشمسية المناسب",
      description: "تعرف على كيفية اختيار النظام الشمسي المناسب لاحتياجاتك مع نصائح من الخبراء.",
      category: "guide",
      date: "2024-03-14",
      image: "https://images.unsplash.com/photo-1629654291660-3c98113a0436?w-400",
      author: "د. محمد الأحمد",
      readTime: "8 دقائق",
      featured: false
    },
    {
      id: 3,
      title: "أحدث معايير الكفاءة الدولية للبطاريات الشمسية",
      description: "تحديث شامل حول معايير IEC الجديدة وتأثيرها على جودة البطاريات في السوق.",
      category: "technology",
      date: "2024-03-13",
      image: "https://images.unsplash.com/photo-1622547748227-8333785ed618?w-400",
      author: "المركز الفني",
      readTime: "6 دقائق",
      featured: false
    }
  ];

  const offers = [
    {
      id: 1,
      title: "خصم 20% على أنظمة الري الشمسي",
      description: "عرض حصري لأصحاب المزارع - استخدم النظام الشمسي لتوفير تكاليف الديزل بنسبة تصل إلى 80%",
      code: "FARM20",
      discount: "20%",
      category: "farm_owner",
      validUntil: "2024-04-15",
      terms: "للطلبات فوق 50,000 ريال",
      icon: "🌾"
    },
    {
      id: 2,
      title: "باقة المهندس المحترف",
      description: "أدوات قياس مجانية وشهادات تركيب معتمدة مع كل طلب فوق 50,000 ريال",
      code: "ENGPRO",
      discount: "مجاني",
      category: "engineer",
      validUntil: "2024-04-30",
      terms: "للمهندسين المسجلين",
      icon: "🔧"
    },
    {
      id: 3,
      title: "عرض الجملة للمتاجر",
      description: "اشترِ 50 لوح واحصل على 5 مجاناً + خصم إضافي 15% على الطلبات المستقبلية",
      code: "STORE5",
      discount: "15%+",
      category: "store",
      validUntil: "2024-05-01",
      terms: "للمتاجر والموزعين المعتمدين",
      icon: "🏪"
    },
    {
      id: 4,
      title: "برنامج الاستدامة للشركات",
      description: "تقارير كفاءة الطاقة مجانية وتدريب موظفيك على أنظمة الطاقة النظيفة",
      code: "COMPANY",
      discount: "مجاني",
      category: "company",
      validUntil: "2024-06-01",
      terms: "للشركات والمؤسسات",
      icon: "🏢"
    },
    {
      id: 5,
      title: "عرض المؤسسات الحكومية",
      description: "أسعار خاصة للمشاريع الحكومية والتعليمية مع دعم فني مخصص 24/7",
      code: "GOVT",
      discount: "حسب الطلب",
      category: "institution",
      validUntil: "2024-07-01",
      terms: "للمؤسسات الحكومية والتعليمية",
      icon: "🏛️"
    },
    {
      id: 6,
      title: "عرض العملاء الجدد",
      description: "خصم 10% على أول طلب + شحن مجاني لجميع الطلبات فوق 5,000 ريال",
      code: "WELCOME10",
      discount: "10%",
      category: "customer",
      validUntil: "2024-04-30",
      terms: "للعملاء الجدد فقط",
      icon: "🎉"
    }
  ];

  const categories = [
    { id: "all", label: "جميع الأخبار" },
    { id: "news", label: "أخبار" },
    { id: "guide", label: "أدلة" },
    { id: "technology", label: "تكنولوجيا" }
  ];

  const handleSaveOffer = (id: number) => {
    setSavedOffers(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`تم نسخ الكود: ${code}`);
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.includes(searchQuery) || item.description.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      news: "bg-blue-100 text-blue-800",
      guide: "bg-green-100 text-green-800",
      technology: "bg-purple-100 text-purple-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getOfferCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      farm_owner: "أصحاب المزارع",
      engineer: "المهندسين",
      store: "المتاجر والموزعين",
      company: "الشركات",
      institution: "المؤسسات",
      customer: "العملاء العام"
    };
    return labels[category] || category;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="news" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="news" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            الأخبار والتحديثات
          </TabsTrigger>
          <TabsTrigger value="offers" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            العروض الخاصة
          </TabsTrigger>
        </TabsList>

        {/* News Tab */}
        <TabsContent value="news" className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن أخبار..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(cat => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNews.map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-40 bg-gray-200 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  {item.featured && (
                    <Badge className="absolute top-3 right-3 bg-red-500">
                      <Zap className="h-3 w-3 ml-1" />
                      مميز
                    </Badge>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <Badge className={getCategoryColor(item.category)} variant="outline">
                        {item.category}
                      </Badge>
                      <CardTitle className="text-lg mt-2">{item.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </span>
                      <span>{item.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {item.author}
                    </span>
                  </div>

                  <Button className="w-full" variant="outline">
                    اقرأ المزيد
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <Newspaper className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">لم نجد أخبار مطابقة لبحثك</p>
            </div>
          )}
        </TabsContent>

        {/* Offers Tab */}
        <TabsContent value="offers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map(offer => (
              <Card key={offer.id} className="border-accent/30 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{offer.icon}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSaveOffer(offer.id)}
                      className={savedOffers.includes(offer.id) ? "text-red-500" : ""}
                    >
                      <Heart className={`h-4 w-4 ${savedOffers.includes(offer.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                  <CardTitle className="text-lg">{offer.title}</CardTitle>
                  <Badge variant="secondary" className="w-fit mt-2">
                    {getOfferCategoryLabel(offer.category)}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{offer.description}</p>

                  <div className="bg-accent/10 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">كود الخصم:</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-white p-2 rounded border border-dashed border-accent font-mono font-bold text-accent text-center">
                        {offer.code}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(offer.code)}
                      >
                        نسخ
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الخصم:</span>
                      <span className="font-bold text-green-600">{offer.discount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">صالح حتى:</span>
                      <span>{offer.validUntil}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الشروط:</span>
                      <span className="text-right">{offer.terms}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="sm">
                    استخدم العرض
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
