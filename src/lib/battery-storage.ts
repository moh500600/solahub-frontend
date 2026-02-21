// lib/battery-storage.ts
export interface TechnicalSpecs {
  chemistry: string;
  cellCount: number;
  dimensions: {
    length: number;
    width: number;
    thickness: number;
    weight: number;
  };
  temperatureCoefficient: {
    voltage: number;
    capacity: number;
  };
  maxChargeVoltage: number;
  minDischargeVoltage: number;
  maxChargeCurrent: number;
  maxDischargeCurrent: number;
  internalResistance: number;
  selfDischargeRate: number;
}

export interface PerformanceData {
  nominalCapacity: number;
  actualCapacity: number;
  nominalVoltage: number;
  peakPower: number;
  energyDensity: number;
  powerDensity: number;
  chargeEfficiency: number;
  dischargeEfficiency: number;
  temperatureRange: {
    operating: string;
    storage: string;
    charging: string;
  };
  cycleLifeAtDOD: Array<{
    depth: number;
    cycles: number;
  }>;
}

export interface Pricing {
  basePrice: number;
  wholesalePrice: number;
  retailPrice: number;
  taxRate: number;
  currency: string;
  minimumOrder: number;
  bulkDiscounts: Array<{
    quantity: number;
    discount: number;
  }>;
}

export interface Inventory {
  sku: string;
  barcode: string;
  warehouseLocation: string;
  reorderPoint: number;
  safetyStock: number;
  leadTime: number;
  supplierInfo: {
    name: string;
    contact: string;
    deliveryTime: number;
  };
}

export interface WarrantyInfo {
  product: number;
  performance: number;
  cycleLife: number;
  details: string;
}

export interface Document {
  name: string;
  url: string;
  type: 'technical' | 'manual' | 'warranty' | 'certificate' | 'safety';
}

export interface Video {
  title: string;
  url: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BatteryManufacturer {
  id: string;
  name: string;
  image: string;
  description: string;
  website: string;
  country: string;
  foundedYear: number;
  certifications: string[];
  rating: number;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface Battery {
  id: string;
  sku?: string;
  name: string;
  manufacturerId: string;
  description: string;
  type: string;
  capacity: number;
  voltage: number;
  power: number;
  cycleLife: number;
  depthOfDischarge: number;
  efficiency: number;
  weight: number;
  dimensions: string;
  temperatureRange: string;
  warranty: string;
  price: number;
  discount: number;
  available: boolean;
  quantity: number;
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  technicalSpecs?: TechnicalSpecs;
  performance?: PerformanceData;
  certifications: string[];
  warrantyInfo?: WarrantyInfo;
  pricing?: Pricing;
  inventory?: Inventory;
  videos: Video[];
  documents: Document[];
  applications: string[];
  accessories: string[];
  installationTime: string;
  maintenanceServices: string[];
  maintenancePackages: string[];
  faqs: FAQ[];
  relatedBatteries: string[];
  rating: number;
  reviews: number;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

// مفاتيح التخزين
export const STORAGE_KEY_BATTERY_MANUFACTURERS = 'solar-battery-manufacturers';
export const STORAGE_KEY_BATTERIES = 'solar-batteries';

// حفظ البيانات
export const saveBatteryManufacturers = (manufacturers: BatteryManufacturer[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_BATTERY_MANUFACTURERS, JSON.stringify(manufacturers));
  }
};

export const saveBatteries = (batteries: Battery[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_BATTERIES, JSON.stringify(batteries));
  }
};

// تحميل البيانات
export const loadBatteryManufacturers = (): BatteryManufacturer[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY_BATTERY_MANUFACTURERS);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const loadBatteries = (): Battery[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY_BATTERIES);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

// دالة للحصول على بيانات العلامات التجارية للعرض
export const getBatteryBrandsData = (manufacturers: BatteryManufacturer[]): any[] => {
  return manufacturers.map(manufacturer => ({
    id: parseInt(manufacturer.id),
    name: manufacturer.name,
    logo: manufacturer.image,
    description: manufacturer.description,
    established: manufacturer.foundedYear,
    country: manufacturer.country,
    rating: manufacturer.rating,
    products: defaultBatteries.filter(b => b.manufacturerId === manufacturer.id).length
  }));
};

// بيانات افتراضية
export const defaultBatteryManufacturers: BatteryManufacturer[] = [
  {
    id: "1",
    name: "Tesla Energy",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/320px-Tesla_Motors.svg.png",
    description: "شركة رائدة في مجال بطاريات الطاقة الشمسية والتخزين المنزلي",
    website: "https://www.tesla.com/energy",
    country: "USA",
    foundedYear: 2003,
    certifications: ["UL 1973", "UL 9540", "IEC 62619", "ISO 9001"],
    rating: 4.9,
    contact: {
      email: "energy@tesla.com",
      phone: "+1-888-518-3752",
      address: "3500 Deer Creek Road, Palo Alto, CA 94304"
    }
  },
  {
    id: "2",
    name: "BYD",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/BYD_company_logo.svg/320px-BYD_company_logo.svg.png",
    description: "أكبر شركة تصنيع للبطاريات في العالم مع حلول تخزين متكاملة",
    website: "https://www.byd.com",
    country: "China",
    foundedYear: 1995,
    certifications: ["CE", "IEC 62619", "UN 38.3", "ISO 9001"],
    rating: 4.7,
    contact: {
      email: "energy@byd.com",
      phone: "+86-755-8988-8888",
      address: "No. 3001, Hengping Road, Pingshan, Shenzhen"
    }
  },
  {
    id: "3",
    name: "LG Chem",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/LG_Solar_logo.svg/320px-LG_Solar_logo.svg.png",
    description: "بطاريات ليثيوم أيون عالية الجودة بتقنيات متقدمة",
    website: "https://www.lgchem.com",
    country: "South Korea",
    foundedYear: 1947,
    certifications: ["UL 1973", "IEC 62619", "KC", "ISO 9001"],
    rating: 4.6,
    contact: {
      email: "ess@lgchem.com",
      phone: "+82-2-3773-1114",
      address: "LG Twin Towers, Yeouido-dong, Seoul"
    }
  },
  {
    id: "4",
    name: "Pylontech",
    image: "https://www.pylontech.com.cn/wp-content/uploads/2021/01/logo.png",
    description: "متخصصة في بطاريات LiFePO4 للطاقة الشمسية",
    website: "https://www.pylontech.com.cn",
    country: "China",
    foundedYear: 2009,
    certifications: ["CE", "IEC 62619", "VDE", "ISO 9001"],
    rating: 4.5,
    contact: {
      email: "sales@pylontech.com",
      phone: "+86-21-8036-5688",
      address: "No. 3999, Jinhai Road, Pudong, Shanghai"
    }
  },
  {
    id: "5",
    name: "Alpha ESS",
    image: "https://alpha-ess.com/wp-content/uploads/2022/09/AlphaESS_logo.png",
    description: "حلول تخزين ذكية للطاقة الشمسية المنزلية والتجارية",
    website: "https://alpha-ess.com",
    country: "Germany",
    foundedYear: 2012,
    certifications: ["CE", "VDE", "TÜV", "ISO 9001"],
    rating: 4.4,
    contact: {
      email: "info@alpha-ess.com",
      phone: "+49-69-1532-2660",
      address: "Frankfurt am Main, Germany"
    }
  }
];

export const defaultBatteries: Battery[] = [
  {
    id: "1",
    sku: "TESLA-PW3-13.5",
    name: "بطارية Tesla Powerwall 3",
    manufacturerId: "1",
    description: "بطارية تخزين منزلية ذكية من Tesla بسعة 13.5 كيلوواط ساعة، مثالية للطاقة الشمسية والنسخ الاحتياطي.",
    type: "Lithium-ion",
    capacity: 13.5,
    voltage: 400,
    power: 5.8,
    cycleLife: 10000,
    depthOfDischarge: 100,
    efficiency: 90,
    weight: 130,
    dimensions: "1150 × 755 × 155 ملم",
    temperatureRange: "-20°C إلى 50°C",
    warranty: "10 سنوات",
    price: 8500,
    discount: 0,
    available: true,
    quantity: 25,
    images: [
      "https://images.unsplash.com/photo-1629654291660-3c98113a0438?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop"
    ],
    features: [
      "سعة 13.5 كيلوواط ساعة",
      "كفاءة 90%",
      "100% عمق تفريغ",
      "10,000 دورة حياة",
      "تطبيق مراقبة ذكي",
      "نسخ احتياطي تلقائي عند انقطاع الكهرباء"
    ],
    specifications: {
      "النوع": "ليثيوم أيون NMC",
      "السعة": "13.5 كيلوواط ساعة",
      "الجهد": "400 فولت DC",
      "الطاقة المستمرة": "5.8 كيلوواط",
      "الطاقة الذروية": "10 كيلوواط",
      "كفاءة الذروة": "90%",
      "درجة الحماية": "IP56",
      "الضمان": "10 سنوات"
    },
    technicalSpecs: {
      chemistry: "Lithium-ion NMC",
      cellCount: 168,
      dimensions: {
        length: 1150,
        width: 755,
        thickness: 155,
        weight: 130
      },
      temperatureCoefficient: {
        voltage: -0.3,
        capacity: -0.5
      },
      maxChargeVoltage: 420,
      minDischargeVoltage: 300,
      maxChargeCurrent: 29,
      maxDischargeCurrent: 50,
      internalResistance: 25,
      selfDischargeRate: 3
    },
    performance: {
      nominalCapacity: 13.5,
      actualCapacity: 13.2,
      nominalVoltage: 400,
      peakPower: 10000,
      energyDensity: 200,
      powerDensity: 450,
      chargeEfficiency: 95,
      dischargeEfficiency: 92,
      temperatureRange: {
        operating: "-20°C to 50°C",
        storage: "-30°C to 60°C",
        charging: "0°C to 45°C"
      },
      cycleLifeAtDOD: [
        { depth: 100, cycles: 10000 },
        { depth: 80, cycles: 15000 },
        { depth: 50, cycles: 25000 }
      ]
    },
    certifications: ["UL 1973", "UL 9540", "IEC 62619", "CE", "FCC"],
    warrantyInfo: {
      product: 10,
      performance: 10,
      cycleLife: 10000,
      details: "ضمان 10 سنوات مع 70% من السعة المتبقية"
    },
    pricing: {
      basePrice: 8500,
      wholesalePrice: 7200,
      retailPrice: 9500,
      taxRate: 15,
      currency: "USD",
      minimumOrder: 1,
      bulkDiscounts: [
        { quantity: 5, discount: 5 },
        { quantity: 10, discount: 8 },
        { quantity: 20, discount: 12 }
      ]
    },
    inventory: {
      sku: "TESLA-PW3-13.5",
      barcode: "987654321098",
      warehouseLocation: "WH-B1-45",
      reorderPoint: 10,
      safetyStock: 5,
      leadTime: 21,
      supplierInfo: {
        name: "Tesla Giga Factory",
        contact: "factory@tesla.com",
        deliveryTime: 14
      }
    },
    videos: [
      { title: "فيديو التركيب والتشغيل", url: "https://youtube.com/watch?v=tesla1" },
      { title: "شرح نظام المراقبة", url: "https://youtube.com/watch?v=tesla2" }
    ],
    documents: [
      { name: "المواصفات الفنية.pdf", url: "#", type: "technical" },
      { name: "دليل التركيب.pdf", url: "#", type: "manual" },
      { name: "شهادة السلامة.pdf", url: "#", type: "safety" }
    ],
    applications: [
      "المنازل السكنية",
      "المحلات التجارية",
      "المكاتب الصغيرة",
      "المزارع الشمسية"
    ],
    accessories: [
      "وحدة تحكم ذكية",
      "كابلات توصيل",
      "قاعدة تركيب",
      "أدوات التركيب"
    ],
    installationTime: "4-6 ساعات",
    maintenanceServices: [
      "فحص دوري كل 6 أشهر",
      "تنظيف نظام التبريد",
      "تحديث البرنامج",
      "دعم فني 24/7"
    ],
    maintenancePackages: [
      "باقة أساسية (3 سنوات)",
      "باقة متكاملة (5 سنوات)",
      "باقة ذهبية (10 سنوات)"
    ],
    faqs: [
      { 
        question: "كم تستغرق عملية التركيب؟", 
        answer: "بين 4 إلى 6 ساعات مع فريق تركيب معتمد" 
      },
      { 
        question: "هل يمكن تركيبها خارج المنزل؟", 
        answer: "نعم، مصممة للعمل في درجات حرارة من -20°C إلى 50°C" 
      },
      { 
        question: "ما هي مدة الضمان؟", 
        answer: "10 سنوات مع 70% من السعة المتبقية" 
      }
    ],
    relatedBatteries: ["2", "3"],
    rating: 4.9,
    reviews: 89,
    tags: ["ذكية", "تخزين منزلي", "نسخ احتياطي", "مراقبة ذكية"],
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    sku: "BYD-LFP-10",
    name: "بطارية BYD Battery-Box Premium",
    manufacturerId: "2",
    description: "بطارية LiFePO4 آمنة وطويلة العمر بسعة 10.24 كيلوواط ساعة، مثالية للتطبيقات الشمسية.",
    type: "LiFePO4",
    capacity: 10.24,
    voltage: 51.2,
    power: 5,
    cycleLife: 6000,
    depthOfDischarge: 100,
    efficiency: 95,
    weight: 110,
    dimensions: "442 × 420 × 133 ملم",
    temperatureRange: "-20°C إلى 55°C",
    warranty: "10 سنوات",
    price: 4500,
    discount: 10,
    available: true,
    quantity: 40,
    images: [
      "https://images.unsplash.com/photo-1596703923338-48f1c07e5f1b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop"
    ],
    features: [
      "تقنية LiFePO4 الآمنة",
      "سعة 10.24 كيلوواط ساعة",
      "6000 دورة حياة",
      "100% عمق تفريغ",
      "كفاءة 95%",
      "تصميم موديولري قابل للتوسع"
    ],
    specifications: {
      "النوع": "فوسفات حديد ليثيوم",
      "السعة": "10.24 كيلوواط ساعة",
      "الجهد": "51.2 فولت",
      "الطاقة المستمرة": "5 كيلوواط",
      "الطاقة الذروية": "10 كيلوواط",
      "كفاءة الذروة": "95%",
      "درجة الحماية": "IP55",
      "الضمان": "10 سنوات"
    },
    pricing: {
      basePrice: 4500,
      wholesalePrice: 3800,
      retailPrice: 5000,
      taxRate: 15,
      currency: "USD",
      minimumOrder: 1,
      bulkDiscounts: [
        { quantity: 3, discount: 5 },
        { quantity: 6, discount: 8 },
        { quantity: 12, discount: 12 }
      ]
    },
    certifications: ["CE", "IEC 62619", "VDE", "UN 38.3"],
    warrantyInfo: {
      product: 10,
      performance: 10,
      cycleLife: 6000,
      details: "ضمان 10 سنوات مع 6000 دورة عند 80% DOD"
    },
    videos: [
      { title: "فيديو التعريف بالمنتج", url: "https://youtube.com/watch?v=byd1" }
    ],
    documents: [
      { name: "دليل التركيب.pdf", url: "#", type: "manual" },
      { name: "شهادة الجودة.pdf", url: "#", type: "certificate" }
    ],
    applications: [
      "الطاقة الشمسية المنزلية",
      "أنظمة UPS",
      "التخزين التجاري الصغير"
    ],
    accessories: [
      "وحدة تحكم BMS",
      "كابلات توصيل",
      "رف تركيب"
    ],
    installationTime: "3-4 ساعات",
    maintenanceServices: [
      "فحص ربع سنوي",
      "تنظيف الوحدات",
      "فحص الاتصالات"
    ],
    maintenancePackages: [
      "باقة أساسية (2 سنوات)",
      "باقة متقدمة (5 سنوات)"
    ],
    faqs: [
      { 
        question: "هل يمكن توسيع النظام؟", 
        answer: "نعم، النظام موديولري ويمكن إضافة وحدات إضافية" 
      },
      { 
        question: "ما هي درجة أمان البطارية؟", 
        answer: "تقنية LiFePO4 آمنة ولا تشتعل بسهولة" 
      }
    ],
    relatedBatteries: ["1", "3"],
    rating: 4.7,
    reviews: 56,
    tags: ["LiFePO4", "قابلة للتوسع", "آمنة", "منزلية"],
    createdAt: new Date().toISOString()
  }
];