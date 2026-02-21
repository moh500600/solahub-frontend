// src/lib/solar-systems-storage.ts

// مفتاح التخزين المحلي للمنظومات الشمسية
export const STORAGE_KEY_SYSTEMS = "solar_systems";

// أنواع البيانات
export interface SystemComponent {
  id: string;
  type: 'panel' | 'inverter' | 'battery' | 'charger' | 'monitor' | 'accessory';
  name: string;
  brand: string;
  specifications: Record<string, string>;
  quantity: number;
  price: number;
  image?: string;
}

export interface SolarSystem {
  id: string;
  name: string;
  description: string;
  type: 'residential' | 'commercial' | 'industrial' | 'agricultural' | 'hybrid';
  powerCapacity: number; // بالكيلووات
  dailyProduction: number; // بالكيلووات ساعة
  components: SystemComponent[];
  price: number;
  discount?: number;
  installationTime: string;
  warranty: string;
  maintenance: string;
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  suitableFor: string[];
  benefits: string[];
  systemDesign: {
    layout: string;
    componentsCount: number;
    efficiency: number;
    lifetime: number;
  };
  performanceData: {
    monthlyProduction: number[];
    savings: number[];
    paybackPeriod: number;
  };
  createdAt: string;
  updatedAt: string;
}

// دالة لتحميل البيانات
export function loadSolarSystems(): SolarSystem[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEY_SYSTEMS);
  return saved ? JSON.parse(saved) : [];
}

// دالة لحفظ البيانات
export function saveSolarSystems(systems: SolarSystem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_SYSTEMS, JSON.stringify(systems));
}

// دالة لتحويل البيانات للعرض
export function transformSystemsForDisplay(systems: SolarSystem[]) {
  return systems.map(system => {
    const componentsPrice = system.components.reduce((sum, comp) => sum + (comp.price * comp.quantity), 0);
    const totalPrice = system.price || componentsPrice * 1.2; // إضافة هامش ربح
    
    return {
      id: parseInt(system.id) || Date.now(),
      name: system.name,
      type: system.type,
      description: system.description,
      powerCapacity: system.powerCapacity,
      dailyProduction: system.dailyProduction,
      price: totalPrice,
      originalPrice: system.discount ? totalPrice * (1 + system.discount/100) : undefined,
      components: system.components,
      images: system.images,
      features: system.features,
      specifications: system.specifications,
      suitableFor: system.suitableFor,
      benefits: system.benefits,
      systemDesign: system.systemDesign,
      performanceData: system.performanceData,
      warranty: system.warranty,
      installationTime: system.installationTime,
      maintenance: system.maintenance,
      
      // بيانات للعرض
      rating: 4.5 + (Math.random() * 0.5),
      reviewCount: Math.floor(Math.random() * 100) + 50,
      stock: Math.floor(Math.random() * 20) + 5,
      views: Math.floor(Math.random() * 1000) + 100,
      tags: getSystemTags(system),
      
      // بيانات إضافية
      aiSuggestions: generateAISuggestions(system),
      accessories: generateAccessories(system),
      installation: {
        time: system.installationTime,
        difficulty: getInstallationDifficulty(system.type),
        requirements: getInstallationRequirements(system.type),
        steps: [
          "دراسة الموقع",
          "تصميم النظام",
          "تركيب الهيكل",
          "تثبيت الألواح",
          "التوصيل الكهربائي",
          "اختبار النظام"
        ]
      },
      maintenanceSchedule: [
        { frequency: "أسبوعيًا", task: "فحص مرئي للنظام" },
        { frequency: "شهريًا", task: "مراقبة الأداء والإنتاج" },
        { frequency: "كل 6 أشهر", task: "تنظيف الألواح" },
        { frequency: "سنويًا", task: "صيانة شاملة وفحص التوصيلات" }
      ],
      maintenanceTips: system.maintenance.split('\n').filter(tip => tip.trim()),
      bulkPricing: generateBulkPricing(totalPrice),
      videos: [
        {
          title: "تركيب النظام خطوة بخطوة",
          url: "https://youtube.com/watch?v=system-install",
          thumbnail: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=400&fit=crop"
        },
        {
          title: "كيف يعمل النظام الشمسي",
          url: "https://youtube.com/watch?v=system-work",
          thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop"
        }
      ],
      documents: [
        {
          name: "دليل التركيب الكامل.pdf",
          url: "#",
          size: "3.2 MB",
          icon: "FileText"
        },
        {
          name: "كتالوج المكونات.pdf",
          url: "#",
          size: "2.8 MB",
          icon: "Package"
        },
        {
          name: "شهادة الضمان.pdf",
          url: "#",
          size: "1.5 MB",
          icon: "Award"
        }
      ],
      delivery: "شحن مجاني",
      deliveryTime: "5-7 أيام عمل",
      sku: `SYS-${system.type.toUpperCase().substring(0,3)}-${system.powerCapacity}KW`
    };
  });
}

// دوال مساعدة
function getSystemTags(system: SolarSystem): string[] {
  const tags = ["منظومة شمسية", "طاقة نظيفة"];
  
  switch(system.type) {
    case 'residential':
      tags.push("منزلي", "اقتصادي");
      break;
    case 'commercial':
      tags.push("تجاري", "عالية الإنتاج");
      break;
    case 'industrial':
      tags.push("صناعي", "قدرة عالية");
      break;
    case 'agricultural':
      tags.push("زراعي", "ري آلي");
      break;
    case 'hybrid':
      tags.push("هجين", "مستمر");
      break;
  }
  
  if (system.powerCapacity > 10) tags.push("كبيرة");
  if (system.discount && system.discount > 10) tags.push("عرض خاص");
  
  return tags;
}

function getInstallationDifficulty(type: string): string {
  const difficulties = {
    'residential': 'سهل',
    'commercial': 'متوسط',
    'industrial': 'متقدم',
    'agricultural': 'متوسط',
    'hybrid': 'متقدم'
  };
  return difficulties[type as keyof typeof difficulties] || 'متوسط';
}

function getInstallationRequirements(type: string): string[] {
  const requirements = {
    'residential': ['سطح مسطح', 'مساحة كافية', 'اتجاه جنوبي'],
    'commercial': ['مساحة كبيرة', 'تصريح بلدي', 'شبكة كهربائية قوية'],
    'industrial': ['أرض واسعة', 'تصاريح خاصة', 'مهندس متخصص'],
    'agricultural': ['أرض زراعية', 'مصدر ماء قريب', 'نظام ري'],
    'hybrid': ['مكان آمن', 'صيانة دورية', 'نظام احتياطي']
  };
  return requirements[type as keyof typeof requirements] || ['سطح مناسب', 'اتجاه جنوبي'];
}

function generateAISuggestions(system: SolarSystem) {
  return [
    {
      id: 1,
      title: "نظام تخزين إضافي",
      description: "بطاريات ليثيوم لتخزين الطاقة الزائدة",
      reason: "يزيد استقلالية النظام بنسبة 40%",
      price: system.price * 0.3,
      savings: system.price * 0.1
    },
    {
      id: 2,
      title: "نظام مراقبة ذكي",
      description: "مراقبة الأداء عبر الهاتف",
      reason: "تحسين الكفاءة واكتشاف المشاكل مبكراً",
      price: system.price * 0.05,
      savings: system.price * 0.02
    },
    {
      id: 3,
      title: "مولد احتياطي",
      description: "للاستخدام في حال انقطاع التيار",
      reason: "ضمان استمرارية الطاقة",
      price: system.price * 0.2,
      savings: system.price * 0.15
    }
  ];
}

function generateAccessories(system: SolarSystem) {
  return [
    {
      id: 1,
      name: "عداد طاقة ذكي",
      description: "لقياس الإنتاج والاستهلاك",
      price: 1500,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "أجهزة حماية",
      description: "حماية من التيار العالي والبرق",
      price: 2800,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "كابلات خاصة",
      description: "كابلات مقاومة للعوامل الجوية",
      price: 1200,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
    }
  ];
}

function generateBulkPricing(basePrice: number) {
  return [
    { minQty: 1, maxQty: 2, price: basePrice, discount: 0 },
    { minQty: 3, maxQty: 5, price: basePrice * 0.95, discount: 5 },
    { minQty: 6, maxQty: 10, price: basePrice * 0.9, discount: 10 },
    { minQty: 11, maxQty: 20, price: basePrice * 0.85, discount: 15 }
  ];
}