// src/lib/shared-storage.ts

// مفتاح التخزين المحلي
export const STORAGE_KEY_MANUFACTURERS = "solar_manufacturers";
export const STORAGE_KEY_PANELS = "solar_panels";

// واجهات البيانات
export interface Manufacturer {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface SolarPanel {
  id: string;
  name: string;
  manufacturerId: string;
  description: string;
  efficiency: number;
  power: number;
  available: boolean;
  quantity: number;
  discount: number;
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  certifications: string[];
  warranty: string;
  videos: Array<{ title: string; url: string }>;
  documents: Array<{ name: string; url: string }>;
  accessories: string[];
  installationTime: string;
  maintenanceServices: string[];
  maintenancePackages: string[];
  faqs: Array<{ question: string; answer: string }>;
  createdAt: string;
}

// دالة لتحميل البيانات
export function loadManufacturers(): Manufacturer[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEY_MANUFACTURERS);
  return saved ? JSON.parse(saved) : [];
}

export function loadSolarPanels(): SolarPanel[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEY_PANELS);
  return saved ? JSON.parse(saved) : [];
}

// دالة لحفظ البيانات
export function saveManufacturers(manufacturers: Manufacturer[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_MANUFACTURERS, JSON.stringify(manufacturers));
}

export function saveSolarPanels(panels: SolarPanel[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_PANELS, JSON.stringify(panels));
}

// دالة لتحويل البيانات من التخزين إلى صيغة العرض
export function transformForDisplay(panels: SolarPanel[], manufacturers: Manufacturer[]) {
  return panels.map(panel => {
    const manufacturer = manufacturers.find(m => m.id === panel.manufacturerId);
    
    return {
      id: parseInt(panel.id),
      name: panel.name,
      price: panel.power * 100, // سعر تقديري بناءً على القدرة
      originalPrice: panel.discount > 0 ? panel.power * 100 * (1 + panel.discount/100) : undefined,
      power: panel.power,
      efficiency: panel.efficiency,
      voltage: Math.round(panel.power / 10), // جهد تقديري
      rating: 4.5 + (panel.efficiency / 100), // تقييم بناءً على الكفاءة
      reviewCount: Math.floor(Math.random() * 100) + 50,
      stock: panel.quantity,
      brandId: parseInt(panel.manufacturerId) || 1,
      images: panel.images.map(img => ({ imageUrl: img })),
      description: panel.description,
      features: panel.features,
      warranty: panel.warranty,
      delivery: panel.quantity > 0 ? "شحن مجاني" : "متوفر قريباً",
      deliveryTime: "2-5 أيام عمل",
      sku: `SP-${panel.power}-${panel.manufacturerId}`,
      tags: panel.available ? ["جديد", "الأكثر مبيعاً"] : ["قريباً"],
      specifications: panel.specifications,
      videos: panel.videos,
      documents: panel.documents.map(doc => ({
        ...doc,
        size: "2.4 MB",
        icon: "FileText"
      })),
      variants: [],
      relatedProducts: [],
      views: Math.floor(Math.random() * 1000) + 100,
      installationGuide: panel.installationTime ? "متوفر" : "غير متوفر",
      maintenance: panel.maintenanceServices.length > 0 ? "منخفض" : "لا يحتاج",
      roi: "3-5 سنوات",
      
      // بيانات إضافية
      aiSuggestions: [
        {
          id: 1,
          title: "نظام كامل للمنزل",
          description: "نظام متكامل يشمل 10 ألواح، انفرتر، وبطاريات",
          reason: "بناءً على متوسط استهلاكك اليومي",
          price: panel.power * 100 * 10,
          savings: panel.discount > 0 ? panel.power * 100 * 10 * (panel.discount/100) : 0
        }
      ],
      
      accessories: panel.accessories.map((acc, idx) => ({
        id: idx + 1,
        name: acc,
        description: "ملحق ضروري للنظام",
        price: 1500 + (idx * 500),
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
      })),
      
      installation: {
        time: panel.installationTime || "2-3 أيام",
        difficulty: "متوسط",
        requirements: ["سطح مسطح", "اتجاه جنوبي", "عدم وجود عوائق"],
        steps: [
          "تثبيت الحامل",
          "تركيب الألواح",
          "التوصيل الكهربائي",
          "الاختبار والتشغيل"
        ]
      },
      
      maintenanceSchedule: [
        { frequency: "أسبوعيًا", task: "فحص مرئي" },
        { frequency: "شهريًا", task: "مراقبة الأداء" },
        { frequency: "سنويًا", task: "تنظيف شامل" }
      ],
      
      maintenanceTips: panel.maintenanceServices,
      
      bulkPricing: [
        { minQty: 1, maxQty: 5, price: panel.power * 100, discount: 0 },
        { minQty: 6, maxQty: 10, price: panel.power * 95, discount: 5 },
        { minQty: 11, maxQty: 20, price: panel.power * 90, discount: 10 },
        { minQty: 21, maxQty: 50, price: panel.power * 85, discount: 15 }
      ]
    };
  });
}

// دالة للحصول على بيانات الشركات المصنعة
export function getBrandsData(manufacturers: Manufacturer[]) {
  return manufacturers.map((m, idx) => ({
    id: idx + 1,
    name: m.name,
    logo: m.image || `https://via.placeholder.com/150/007bff/ffffff?text=${m.name.charAt(0)}`,
    description: m.description,
    established: 2000 + (idx * 5),
    products: Math.floor(Math.random() * 100) + 50,
    countries: Math.floor(Math.random() * 80) + 20,
    rating: 4.5 + (Math.random() * 0.5)
  }));
}