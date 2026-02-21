// src/lib/accessories-storage.ts

// مفتاح التخزين المحلي للملحقات
export const STORAGE_KEY_ACCESSORIES = "solar_accessories";

// واجهات البيانات للملحقات
export interface AccessoryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Accessory {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  available: boolean;
  features: string[];
  specifications: Record<string, string>;
  warranty: string;
  compatibility: string[];
  documents: Array<{ name: string; url: string }>;
  createdAt: string;
}

// دالة لتحميل الفئات
export function loadAccessoryCategories(): AccessoryCategory[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEY_ACCESSORIES + "_categories");
  
  if (saved) {
    return JSON.parse(saved);
  } else {
    // فئات افتراضية
    const defaultCategories: AccessoryCategory[] = [
      {
        id: "1",
        name: "أنظمة التركيب",
        description: "أدوات وأنظمة تركيب الألواح الشمسية",
        icon: "🛠️"
      },
      {
        id: "2",
        name: "الكابلات والوصلات",
        description: "كابلات توصيل ووصلات كهربائية",
        icon: "🔌"
      },
      {
        id: "3",
        name: "أجهزة التحكم",
        description: "أنظمة مراقبة وتحكم",
        icon: "🎮"
      },
      {
        id: "4",
        name: "أنظمة التنظيف",
        description: "معدات تنظيف وصيانة",
        icon: "🧹"
      },
      {
        id: "5",
        name: "حماية وأمان",
        description: "أنظمة حماية كهربائية",
        icon: "🛡️"
      },
      {
        id: "6",
        name: "معدات القياس",
        description: "أدوات قياس واختبار",
        icon: "📏"
      }
    ];
    saveAccessoryCategories(defaultCategories);
    return defaultCategories;
  }
}

// دالة لتحميل الملحقات
export function loadAccessories(): Accessory[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEY_ACCESSORIES);
  return saved ? JSON.parse(saved) : [];
}

// دالة لحفظ الفئات
export function saveAccessoryCategories(categories: AccessoryCategory[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_ACCESSORIES + "_categories", JSON.stringify(categories));
}

// دالة لحفظ الملحقات
export function saveAccessories(accessories: Accessory[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_ACCESSORIES, JSON.stringify(accessories));
}

// دالة لتحويل الملحقات لعرضها في الصفحة
export function transformAccessoriesForDisplay(accessories: Accessory[], categories: AccessoryCategory[]) {
  return accessories.map(accessory => {
    const category = categories.find(c => c.id === accessory.categoryId);
    
    return {
      id: parseInt(accessory.id),
      name: accessory.name,
      price: accessory.price,
      description: accessory.description,
      image: accessory.image,
      stock: accessory.stock,
      available: accessory.available,
      features: accessory.features,
      specifications: accessory.specifications,
      warranty: accessory.warranty,
      compatibility: accessory.compatibility,
      documents: accessory.documents,
      category: category?.name || "غير مصنف",
      categoryIcon: category?.icon || "📦",
      rating: 4.5 + (Math.random() * 0.5), // تقييم عشوائي
      reviewCount: Math.floor(Math.random() * 50) + 10,
      views: Math.floor(Math.random() * 500) + 100,
      tags: accessory.available ? ["الأكثر مبيعاً", "جديد"] : ["قريباً"]
    };
  });
}

// دالة للحصول على الملحقات المقترحة لمنتج معين
export function getSuggestedAccessories(productPower?: number) {
  const accessories = loadAccessories();
  const categories = loadAccessoryCategories();
  
  // إذا كان هناك قدرة للمنتج، نرجع ملحقات مناسبة
  if (productPower) {
    return transformAccessoriesForDisplay(
      accessories.filter(acc => 
        acc.compatibility.some(comp => comp.includes(`${productPower}W`) || comp.includes("جميع"))
      ).slice(0, 6),
      categories
    );
  }
  
  // وإلا نرجع أفضل 6 ملحقات
  return transformAccessoriesForDisplay(
    accessories.filter(acc => acc.available).slice(0, 6),
    categories
  );
}