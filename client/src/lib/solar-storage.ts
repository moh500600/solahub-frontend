// src/lib/solar-storage.ts
export interface Manufacturer {
  id: string;
  name: string;
  image: string;
  description: string;
  country: string;
  established: number;
  website: string;
}

export interface SolarPanel {
  id: string;
  name: string;
  manufacturerId: string;
  description: string;
  detailedDescription: string;
  efficiency: number;
  power: number;
  voltage: number;
  current: number;
  dimensions: string;
  weight: number;
  available: boolean;
  quantity: number;
  discount: number;
  price: number;
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  certifications: string[];
  warranty: string;
  videos: Array<{ title: string; url: string; thumbnail: string }>;
  documents: Array<{ name: string; url: string; size: string }>;
  accessories: string[];
  installationTime: string;
  maintenanceServices: string[];
  maintenancePackages: Array<{ name: string; price: number; features: string[] }>;
  faqs: Array<{ question: string; answer: string }>;
  tags: string[];
  sku: string;
  rating: number;
  reviewCount: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  performance: {
    temperatureCoefficient: string;
    maxSystemVoltage: string;
    fireRating: string;
    hailResistance: string;
    windLoad: string;
    snowLoad: string;
  };
}

const STORAGE_KEY_MANUFACTURERS = "solar_manufacturers_v2";
const STORAGE_KEY_PANELS = "solar_panels_v2";

// تحميل البيانات
export function loadManufacturers(): Manufacturer[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY_MANUFACTURERS);
    return saved ? JSON.parse(saved) : getDefaultManufacturers();
  } catch {
    return getDefaultManufacturers();
  }
}

export function loadSolarPanels(): SolarPanel[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PANELS);
    return saved ? JSON.parse(saved) : getDefaultPanels();
  } catch {
    return getDefaultPanels();
  }
}

// حفظ البيانات
export function saveManufacturers(manufacturers: Manufacturer[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_MANUFACTURERS, JSON.stringify(manufacturers));
}

export function saveSolarPanels(panels: SolarPanel[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_PANELS, JSON.stringify(panels));
}

// بيانات افتراضية للشركات
function getDefaultManufacturers(): Manufacturer[] {
  return [
    {
      id: "1",
      name: "SunPower",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/SunPower_logo.svg/320px-SunPower_logo.svg.png",
      description: "شركة رائدة في مجال الطاقة الشمسية، معترف بها عالمياً في مجال تقنية الألواح الشمسية عالية الكفاءة.",
      country: "الولايات المتحدة",
      established: 1985,
      website: "https://www.sunpower.com"
    },
    {
      id: "2",
      name: "LG Solar",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/LG_Solar_logo.svg/320px-LG_Solar_logo.svg.png",
      description: "جودة كوريا الجنوبية في الطاقة الشمسية، معتمدة عالمياً وموثوقة.",
      country: "كوريا الجنوبية",
      established: 1958,
      website: "https://www.lg.com"
    },
    {
      id: "3",
      name: "Canadian Solar",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Canadian_Solar_logo.svg/320px-Canadian_Solar_logo.svg.png",
      description: "من أكبر منتجي الألواح الشمسية عالمياً، معترف بها لجودة منتجاتها.",
      country: "كندا",
      established: 2001,
      website: "https://www.canadiansolar.com"
    },
    {
      id: "4",
      name: "Jinko Solar",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/JinkoSolar_Logo.svg/320px-JinkoSolar_Logo.svg.png",
      description: "ابتكار وتكنولوجيا متطورة في مجال الطاقة الشمسية.",
      country: "الصين",
      established: 2006,
      website: "https://www.jinkosolar.com"
    },
    {
      id: "5",
      name: "Trina Solar",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Trina_Solar_logo.svg/320px-Trina_Solar_logo.svg.png",
      description: "حلول شمسية موثوقة وذات كفاءة عالية.",
      country: "الصين",
      established: 1997,
      website: "https://www.trinasolar.com"
    },
    {
      id: "6",
      name: "JA Solar",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/JA_Solar_logo.svg/320px-JA_Solar_logo.svg.png",
      description: "كفاءة وأداء عالي في مجال الطاقة الشمسية.",
      country: "الصين",
      established: 2005,
      website: "https://www.jasolar.com"
    },
    {
      id: "7",
      name: "Q CELLS",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Qcells_logo.svg/320px-Qcells_logo.svg.png",
      description: "تقنيات متطورة وكفاءة عالية في الألواح الشمسية.",
      country: "ألمانيا",
      established: 1999,
      website: "https://www.q-cells.com"
    },
    {
      id: "8",
      name: "LONGi Solar",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Longi_Green_Energy_Technology_Logo.svg/320px-Longi_Green_Energy_Technology_Logo.svg.png",
      description: "متخصصة في تقنية الخلايا الأحادية بكفاءة عالية.",
      country: "الصين",
      established: 2000,
      website: "https://www.longi.com"
    }
  ];
}

// بيانات افتراضية للمنتجات
function getDefaultPanels(): SolarPanel[] {
  return [
    {
      id: "1",
      name: "SunPower Maxeon 3 400W",
      manufacturerId: "1",
      description: "لوح شمسي مونو كريستال عالي الكفاءة مع تقنية Maxeon",
      detailedDescription: "لوح شمسي مونو كريستال عالي الكفاءة من صنع SunPower العالمية. يتميز بتقنية Maxeon الحاصلة على براءة اختراع، والتي توفر كفاءة عالية ومتانة فائقة. مناسب للمنازل والمشاريع التجارية الكبيرة.",
      efficiency: 22.6,
      power: 400,
      voltage: 40.5,
      current: 9.88,
      dimensions: "1700 × 1016 × 40 مم",
      weight: 19.5,
      available: true,
      quantity: 50,
      discount: 15,
      price: 4500000, // 450 ريال
      images: [
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop"
      ],
      features: [
        "كفاءة عالية 22.6%",
        "ضمان 25 سنة على الأداء",
        "مقاوم للأتربة والماء IP68",
        "أداء ممتاز في درجات الحرارة العالية",
        "خلايا مونو كريستال عالية النقاء",
        "تقنية Maxeon المبتكرة"
      ],
      specifications: {
        "النوع": "مونو كريستال",
        "الطاقة القصوى (Pmax)": "400 واط",
        "الكفاءة": "22.6%",
        "الجهد (Vmpp)": "40.5 فولت",
        "التيار (Impp)": "9.88 أمبير",
        "الجهد المفتوح (Voc)": "48.7 فولت",
        "تيار الدائرة القصيرة (Isc)": "10.4 أمبير",
        "الأبعاد": "1700 × 1016 × 40 مم",
        "الوزن": "19.5 كجم",
        "درجة حرارة التشغيل": "-40°C إلى +85°C",
        "معامل درجة الحرارة للطاقة": "-0.29%/°C",
        "تصنيف الحماية": "IP68",
        "الحد الأقصى للجهد": "1000 فولت",
        "تصنيف الحريق": "Class A",
        "مقاومة البَرَد": "25 ملم بسرعة 23 م/ث"
      },
      certifications: ["IEC 61215", "IEC 61730", "UL 1703", "CE", "ISO 9001"],
      warranty: "25 سنة ضمان أداء، 12 سنة ضمان منتج",
      videos: [
        {
          title: "فيديو توضيحي للمنتج",
          url: "https://www.youtube.com/watch?v=demo1",
          thumbnail: "https://img.youtube.com/vi/demo1/hqdefault.jpg"
        }
      ],
      documents: [
        {
          name: "المواصفات الفنية.pdf",
          url: "#",
          size: "2.4 MB"
        },
        {
          name: "دليل التركيب.pdf",
          url: "#",
          size: "1.8 MB"
        }
      ],
      accessories: [
        "إطار تركيب ألومنيوم",
        "كابلات MC4",
        "وصلة توصيل",
        "قواطع كهربائية"
      ],
      installationTime: "2-3 أيام",
      maintenanceServices: [
        "تنظيف ربع سنوي",
        "فحص التوصيلات شهرياً",
        "مراقبة الأداء أسبوعياً"
      ],
      maintenancePackages: [
        {
          name: "الباقة الأساسية",
          price: 50000, // 500 ريال
          features: ["4 زيارات سنوية", "تنظيف شامل", "تقرير أداء"]
        },
        {
          name: "الباقة المتكاملة",
          price: 100000, // 1000 ريال
          features: ["8 زيارات سنوية", "تنظيف وفحص", "صيانة وقائية", "دعم فني 24/7"]
        }
      ],
      faqs: [
        {
          question: "ما هي مدة الضمان على هذا المنتج؟",
          answer: "يأتي المنتج بضمان أداء لمدة 25 سنة وضمان تصنيع لمدة 12 سنة."
        },
        {
          question: "هل يمكن تركيبه على جميع أنواع الأسطح؟",
          answer: "نعم، يمكن تركيب اللوح على معظم أنواع الأسطح بما في ذلك الأسطح الخرسانية والمعدنية."
        }
      ],
      tags: ["جديد", "الأكثر مبيعاً", "أعلى كفاءة", "SunPower", "مونو كريستال"],
      sku: "SP-MAX3-400",
      rating: 4.8,
      reviewCount: 124,
      views: 1250,
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-20T14:45:00Z",
      performance: {
        temperatureCoefficient: "-0.29%/°C",
        maxSystemVoltage: "1000V",
        fireRating: "Class A",
        hailResistance: "25mm at 23m/s",
        windLoad: "2400 Pa",
        snowLoad: "5400 Pa"
      }
    },
    {
      id: "2",
      name: "LG NeON R 380W",
      manufacturerId: "2",
      description: "لوح شمسي بتقنية N-type عالية الكفاءة من LG",
      detailedDescription: "لوح شمسي بتقنية الخلايا N-type من LG، يتميز بكفاءة عالية وأداء مستقر في مختلف الظروف الجوية.",
      efficiency: 21.7,
      power: 380,
      voltage: 38.5,
      current: 9.87,
      dimensions: "1680 × 1016 × 40 مم",
      weight: 18.5,
      available: true,
      quantity: 35,
      discount: 10,
      price: 4200000, // 420 ريال
      images: [
        "https://images.unsplash.com/photo-1598146286984-26d5a7d6d0b5?w=600&h=400&fit=crop"
      ],
      features: [
        "تقنية N-type",
        "كفاءة 21.7%",
        "ضمان 25 سنة",
        "مقاوم للتشقق"
      ],
      specifications: {
        "النوع": "N-Type",
        "الطاقة القصوى": "380 واط",
        "الكفاءة": "21.7%",
        "الجهد": "38.5 فولت",
        "التيار": "9.87 أمبير",
        "الأبعاد": "1680 × 1016 × 40 مم"
      },
      certifications: ["IEC 61215", "IEC 61730", "UL 1703"],
      warranty: "25 سنة",
      videos: [],
      documents: [],
      accessories: [],
      installationTime: "2-3 أيام",
      maintenanceServices: [],
      maintenancePackages: [],
      faqs: [],
      tags: ["LG", "N-Type", "جديد"],
      sku: "LG-NEON-380",
      rating: 4.7,
      reviewCount: 89,
      views: 890,
      createdAt: "2024-01-16T11:00:00Z",
      updatedAt: "2024-01-16T11:00:00Z",
      performance: {
        temperatureCoefficient: "-0.35%/°C",
        maxSystemVoltage: "1000V",
        fireRating: "Class A",
        hailResistance: "25mm at 23m/s",
        windLoad: "2400 Pa",
        snowLoad: "5400 Pa"
      }
    }
  ];
}

// تحويل البيانات للعرض في الصفحة الرئيسية
export function transformForDisplay(panels: SolarPanel[], manufacturers: Manufacturer[]) {
  return panels.map(panel => {
    const manufacturer = manufacturers.find(m => m.id === panel.manufacturerId);
    
    // توليد معرف رقمي للعرض
    const numericId = parseInt(panel.id) || Date.now();
    
    return {
      id: numericId,
      name: panel.name,
      price: panel.price, // السعر بالهللة
      originalPrice: panel.discount > 0 ? Math.round(panel.price * (1 + panel.discount/100)) : undefined,
      power: panel.power,
      efficiency: panel.efficiency,
      voltage: panel.voltage || Math.round(panel.power / 10),
      current: panel.current || panel.power / 40,
      rating: panel.rating || 4.5 + (panel.efficiency / 100),
      reviewCount: panel.reviewCount || Math.floor(Math.random() * 100) + 50,
      stock: panel.quantity,
      brandId: parseInt(panel.manufacturerId) || 1,
      brandName: manufacturer?.name || "غير معروف",
      images: panel.images.map(img => ({ imageUrl: img })),
      description: panel.description,
      detailedDescription: panel.detailedDescription || panel.description,
      features: panel.features,
      warranty: panel.warranty,
      delivery: panel.quantity > 0 ? "شحن مجاني" : "متوفر قريباً",
      deliveryTime: "2-5 أيام عمل",
      sku: panel.sku,
      tags: panel.tags,
      specifications: panel.specifications,
      videos: panel.videos,
      documents: panel.documents,
      accessories: panel.accessories.map((acc, idx) => ({
        id: idx + 1,
        name: acc,
        description: "ملحق ضروري للنظام",
        price: 150000 + (idx * 50000), // 150-300 ريال
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
      maintenancePackages: panel.maintenancePackages,
      
      // بيانات إضافية
      aiSuggestions: [
        {
          id: 1,
          title: "نظام كامل للمنزل",
          description: "نظام متكامل يشمل 10 ألواح، انفرتر، وبطاريات",
          reason: "بناءً على متوسط استهلاكك اليومي",
          price: panel.price * 10 * 0.9, // خصم 10% عند الشراء بالجملة
          savings: panel.price * 10 * 0.1
        }
      ],
      
      bulkPricing: [
        { minQty: 1, maxQty: 5, price: panel.price, discount: 0 },
        { minQty: 6, maxQty: 10, price: Math.round(panel.price * 0.95), discount: 5 },
        { minQty: 11, maxQty: 20, price: Math.round(panel.price * 0.90), discount: 10 },
        { minQty: 21, maxQty: 50, price: Math.round(panel.price * 0.85), discount: 15 }
      ],
      
      views: panel.views || Math.floor(Math.random() * 1000) + 100,
      installationGuide: panel.installationTime ? "متوفر" : "غير متوفر",
      maintenance: panel.maintenanceServices.length > 0 ? "منخفض" : "لا يحتاج",
      roi: "3-5 سنوات",
      performance: panel.performance,
      faqs: panel.faqs,
      createdAt: panel.createdAt,
      updatedAt: panel.updatedAt
    };
  });
}

// تحويل بيانات الشركات للعرض
export function getBrandsData(manufacturers: Manufacturer[]) {
  return manufacturers.map((m, idx) => {
    // إحصائيات عشوائية للعرض
    const stats = {
      established: m.established || 2000 + (idx * 5),
      products: Math.floor(Math.random() * 100) + 50,
      countries: Math.floor(Math.random() * 80) + 20,
      rating: 4.5 + (Math.random() * 0.5)
    };
    
    return {
      id: idx + 1,
      originalId: m.id,
      name: m.name,
      logo: m.image || `https://via.placeholder.com/150/007bff/ffffff?text=${m.name.charAt(0)}`,
      description: m.description,
      country: m.country || "غير معروف",
      established: stats.established,
      products: stats.products,
      countries: stats.countries,
      rating: parseFloat(stats.rating.toFixed(1)),
      website: m.website
    };
  });
}

// فلترة المنتجات
export interface FilterOptions {
  brandIds: number[];
  minPrice?: number;
  maxPrice?: number;
  minPower?: number;
  maxPower?: number;
  minEfficiency?: number;
  maxEfficiency?: number;
  certifications: string[];
  warranty: string[];
  searchQuery: string;
  sortBy: "newest" | "price_asc" | "price_desc" | "rating" | "power_asc" | "power_desc" | "efficiency_asc" | "efficiency_desc";
  inStock: boolean;
  hasDiscount: boolean;
}

export function filterProducts(products: any[], filters: FilterOptions, brands: any[]) {
  let filtered = [...products];

  // البحث بالنص
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.brandName.toLowerCase().includes(query)
    );
  }

  // الفلترة بالعلامة التجارية
  if (filters.brandIds.length > 0) {
    filtered = filtered.filter(product => 
      filters.brandIds.includes(product.brandId)
    );
  }

  // الفلترة بالسعر
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(product => 
      product.price >= filters.minPrice!
    );
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(product => 
      product.price <= filters.maxPrice!
    );
  }

  // الفلترة بالطاقة
  if (filters.minPower !== undefined) {
    filtered = filtered.filter(product => 
      product.power >= filters.minPower!
    );
  }
  if (filters.maxPower !== undefined) {
    filtered = filtered.filter(product => 
      product.power <= filters.maxPower!
    );
  }

  // الفلترة بالكفاءة
  if (filters.minEfficiency !== undefined) {
    filtered = filtered.filter(product => 
      product.efficiency >= filters.minEfficiency!
    );
  }
  if (filters.maxEfficiency !== undefined) {
    filtered = filtered.filter(product => 
      product.efficiency <= filters.maxEfficiency!
    );
  }

  // المنتجات المتوفرة فقط
  if (filters.inStock) {
    filtered = filtered.filter(product => product.stock > 0);
  }

  // المنتجات التي لها خصم
  if (filters.hasDiscount) {
    filtered = filtered.filter(product => product.originalPrice > product.price);
  }

  // الترتيب
  switch (filters.sortBy) {
    case "price_asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "power_asc":
      filtered.sort((a, b) => a.power - b.power);
      break;
    case "power_desc":
      filtered.sort((a, b) => b.power - a.power);
      break;
    case "efficiency_asc":
      filtered.sort((a, b) => a.efficiency - b.efficiency);
      break;
    case "efficiency_desc":
      filtered.sort((a, b) => b.efficiency - a.efficiency);
      break;
    case "newest":
    default:
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
  }

  return filtered;
}

// تجميع الإحصائيات
export function getFilterStats(products: any[]) {
  if (products.length === 0) {
    return {
      minPrice: 0,
      maxPrice: 0,
      minPower: 0,
      maxPower: 0,
      minEfficiency: 0,
      maxEfficiency: 0,
      totalProducts: 0,
      availableProducts: 0,
      discountedProducts: 0
    };
  }

  const prices = products.map(p => p.price);
  const powers = products.map(p => p.power);
  const efficiencies = products.map(p => p.efficiency);

  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    minPower: Math.min(...powers),
    maxPower: Math.max(...powers),
    minEfficiency: Math.min(...efficiencies),
    maxEfficiency: Math.max(...efficiencies),
    totalProducts: products.length,
    availableProducts: products.filter(p => p.stock > 0).length,
    discountedProducts: products.filter(p => p.originalPrice > p.price).length
  };
}