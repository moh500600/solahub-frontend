// shared-storage-inverters.ts
// نظام التخزين المشترك للعواكس الشمسية
export const STORAGE_KEY_INVERTER_MANUFACTURERS = 'inverter-manufacturers';
export const STORAGE_KEY_INVERTERS = 'inverters';

export interface InverterManufacturer {
  id: string;
  name: string;
  logo: string;
  description: string;
  country: string;
  founded: number;
  warranty: string;
  certifications: string[];
}

export interface Inverter {
  id: string;
  name: string;
  manufacturerId: string;
  type: 'string' | 'micro' | 'hybrid' | 'off-grid' | 'central';
  powerRating: number;
  inputVoltage: { min: number; max: number };
  outputVoltage: number;
  efficiency: number;
  maxEfficiency: number;
  mpptVoltageRange: { min: number; max: number };
  mpptCount: number;
  protection: {
    ipRating: string;
    features: string[];
  };
  communication: {
    wifi: boolean;
    bluetooth: boolean;
    ethernet: boolean;
    gsm: boolean;
  };
  display: {
    type: string;
    features: string[];
  };
  warranty: {
    product: string;
    performance: string;
  };
  dimensions: {
    width: number;
    height: number;
    depth: number;
    weight: number;
  };
  certifications: string[];
  features: string[];
  description: string;
  images: string[];
  videos: string[];
  documents: string[];
  installationGuide: string;
  maintenanceRequirements: string[];
  compatiblePanels: Array<{
    brand: string;
    minPower: number;
    maxPower: number;
  }>;
  accessories: Array<{
    name: string;
    description: string;
    price: number;
  }>;
  price: number;
  discount: number;
  stock: number;
  available: boolean;
  sku: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  rating: number; // إضافة هذا الحقل
  reviewCount: number; // إضافة هذا الحقل
  views: number; // إضافة هذا الحقل
  delivery: string; // إضافة هذا الحقل
  deliveryTime: string; // إضافة هذا الحقل
  mainFeatures: string[]; // إضافة هذا الحقل
  originalPrice?: number; // إضافة هذا الحقل
  bulkPricing?: Array<{
    minQty: number;
    maxQty: number;
    price: number;
    discount: number;
  }>; // إضافة هذا الحقل
}

// البيانات الافتراضية للشركات المصنعة
export const defaultInverterManufacturers: InverterManufacturer[] = [
  {
    id: '1',
    name: 'SMA Solar',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/SMA_Solar_Technology_AG_logo.svg/320px-SMA_Solar_Technology_AG_logo.svg.png',
    description: 'شركة ألمانية رائدة في صناعة العواكس الشمسية منذ 1981',
    country: 'ألمانيا',
    founded: 1981,
    warranty: '10 سنوات',
    certifications: ['TÜV', 'CE', 'UL', 'VDE']
  },
  {
    id: '2',
    name: 'Fronius',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Fronius_International_GmbH_logo.svg/320px-Fronius_International_GmbH_logo.svg.png',
    description: 'شركة نمساوية متخصصة في تقنيات اللحام والطاقة الشمسية',
    country: 'النمسا',
    founded: 1945,
    warranty: '7 سنوات',
    certifications: ['TÜV', 'CE', 'VDE', 'EN 50530']
  },
  {
    id: '3',
    name: 'SolarEdge',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/SolarEdge_logo.svg/320px-SolarEdge_logo.svg.png',
    description: 'شركة إسرائيلية رائدة في تقنيات تحسين الطاقة الشمسية',
    country: 'إسرائيل',
    founded: 2006,
    warranty: '12 سنة',
    certifications: ['UL', 'CE', 'VDE', 'IEC']
  },
  {
    id: '4',
    name: 'Huawei',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Huawei_logo_%282010%29.svg/320px-Huawei_logo_%282010%29.svg.png',
    description: 'شركة صينية عالمية في مجال تكنولوجيا المعلومات والاتصالات',
    country: 'الصين',
    founded: 1987,
    warranty: '10 سنوات',
    certifications: ['TÜV', 'CE', 'UL', 'VDE', 'IEC']
  },
  {
    id: '5',
    name: 'Growatt',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Growatt_logo.svg/320px-Growatt_logo.svg.png',
    description: 'شركة صينية رائدة في تصنيع العواكس الشمسية',
    country: 'الصين',
    founded: 2011,
    warranty: '5 سنوات',
    certifications: ['CE', 'TÜV', 'VDE', 'UL']
  },
  {
    id: '6',
    name: 'Solis',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Solis_Logo.svg/320px-Solis_Logo.svg.png',
    description: 'شركة صينية متخصصة في العواكس الشمسية الذكية',
    country: 'الصين',
    founded: 2005,
    warranty: '10 سنوات',
    certifications: ['CE', 'TÜV', 'VDE', 'UL']
  }
];

// البيانات الافتراضية للعواكس
export const defaultInverters: Inverter[] = [
  {
    id: '1',
    name: 'عاكس سترينج 5 كيلووات',
    manufacturerId: '1',
    type: 'string',
    powerRating: 5.0,
    inputVoltage: { min: 150, max: 800 },
    outputVoltage: 230,
    efficiency: 98.3,
    maxEfficiency: 98.7,
    mpptVoltageRange: { min: 200, max: 800 },
    mpptCount: 2,
    protection: {
      ipRating: 'IP65',
      features: ['حماية من التيار الزائد', 'حماية من الجهد الزائد', 'حماية من الانعكاس القطبي']
    },
    communication: {
      wifi: true,
      bluetooth: true,
      ethernet: false,
      gsm: false
    },
    display: {
      type: 'شاشة LCD ملونة',
      features: ['عرض الطاقة الناتجة', 'عرض الطاقة اليومية', 'عرض الرسائل التحذيرية']
    },
    warranty: {
      product: '5 سنوات',
      performance: '25 سنة'
    },
    dimensions: {
      width: 450,
      height: 550,
      depth: 200,
      weight: 35
    },
    certifications: ['TÜV', 'CE', 'VDE', 'UL'],
    features: ['كفاءة عالية', 'مراقبة عن بعد', 'تصميم مقاوم للعوامل الجوية'],
    description: 'عاكس شمسي بقدرة 5 كيلووات مع كفاءة تصل إلى 98.7%، مثالي للاستخدام المنزلي والتجاري الصغير',
    images: [
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542338103-0032eed5bb7c?w-800&auto=format&fit=crop'
    ],
    videos: ['https://www.youtube.com/watch?v=example1'],
    documents: ['كتالوج المنتج', 'دليل التركيب', 'ورقة المواصفات'],
    installationGuide: 'يتطلب فني مختص للتركيب مع وجود قواطع مناسبة',
    maintenanceRequirements: ['تنظيف دوري', 'فحص الوصلات كل 6 أشهر'],
    compatiblePanels: [
      { brand: 'Jinko Solar', minPower: 350, maxPower: 500 },
      { brand: 'LONGi Solar', minPower: 400, maxPower: 550 }
    ],
    accessories: [
      { name: 'وحدة WiFi', description: 'للتواصل اللاسلكي', price: 500 },
      { name: 'قاعدة تركيب', description: 'قاعدة معدنية للتركيب', price: 300 }
    ],
    price: 8500,
    discount: 15,
    stock: 25,
    available: true,
    sku: 'INV-SMA-5000',
    tags: ['سترينج', '5KW', 'ألماني', 'مراقبة عن بعد'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
    rating: 4.7,
    reviewCount: 124,
    views: 2543,
    delivery: 'شحن مجاني',
    deliveryTime: '3-5 أيام عمل',
    mainFeatures: ['كفاءة 98.3%', '2 MPPT', 'شاشة LCD'],
    originalPrice: 10000
  },
  {
    id: '2',
    name: 'عاكس مايكرو 750 واط',
    manufacturerId: '2',
    type: 'micro',
    powerRating: 0.75,
    inputVoltage: { min: 12, max: 48 },
    outputVoltage: 230,
    efficiency: 96.5,
    maxEfficiency: 97.2,
    mpptVoltageRange: { min: 16, max: 60 },
    mpptCount: 1,
    protection: {
      ipRating: 'IP67',
      features: ['حماية من التيار الزائد', 'حماية من الجهد الزائد', 'عزل جلفاني']
    },
    communication: {
      wifi: false,
      bluetooth: true,
      ethernet: false,
      gsm: false
    },
    display: {
      type: 'LED إشارات',
      features: ['مؤشر الطاقة', 'مؤشر الخطأ']
    },
    warranty: {
      product: '10 سنوات',
      performance: '25 سنة'
    },
    dimensions: {
      width: 250,
      height: 350,
      depth: 80,
      weight: 8.5
    },
    certifications: ['CE', 'TÜV', 'VDE'],
    features: ['تركيب سهل', 'صغير الحجم', 'مناسب للأسقف المعقدة'],
    description: 'عاكس مايكرو مثالي للألواح الفردية، يزيد من إنتاج الطاقة في الظروف المعقدة',
    images: [
      'https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542338103-0032eed5bb7c?w=800&auto=format&fit=crop'
    ],
    videos: ['https://www.youtube.com/watch?v=example2'],
    documents: ['كتالوج المنتج', 'دليل التركيب'],
    installationGuide: 'تركيب مباشر على اللوح الشمسي',
    maintenanceRequirements: ['لا يتطلب صيانة دورية'],
    compatiblePanels: [
      { brand: 'Canadian Solar', minPower: 350, maxPower: 450 },
      { brand: 'Trina Solar', minPower: 380, maxPower: 500 }
    ],
    accessories: [
      { name: 'حامل تركيب', description: 'حامل خاص للعاكس المايكرو', price: 150 }
    ],
    price: 1200,
    discount: 10,
    stock: 50,
    available: true,
    sku: 'INV-FRO-750',
    tags: ['مايكرو', '750W', 'نمساوي'],
    createdAt: '2024-02-10T09:15:00Z',
    updatedAt: '2024-02-15T11:20:00Z',
    rating: 4.5,
    reviewCount: 89,
    views: 1876,
    delivery: 'شحن مجاني',
    deliveryTime: '2-4 أيام عمل',
    mainFeatures: ['كفاءة 96.5%', 'IP67', 'تركيب سهل'],
    originalPrice: 1350
  },
  // إضافة المزيد من العواكس الافتراضية
  {
    id: '3',
    name: 'عاكس هجين 8 كيلووات',
    manufacturerId: '3',
    type: 'hybrid',
    powerRating: 8.0,
    inputVoltage: { min: 200, max: 850 },
    outputVoltage: 230,
    efficiency: 97.8,
    maxEfficiency: 98.5,
    mpptVoltageRange: { min: 250, max: 850 },
    mpptCount: 3,
    protection: {
      ipRating: 'IP65',
      features: ['حماية من التيار الزائد', 'حماية من الجهد الزائد', 'حماية من انخفاض الجهد']
    },
    communication: {
      wifi: true,
      bluetooth: true,
      ethernet: true,
      gsm: false
    },
    display: {
      type: 'شاشة لمس',
      features: ['عرض الطاقة', 'عرض البطاريات', 'إحصائيات مفصلة']
    },
    warranty: {
      product: '12 سنة',
      performance: '25 سنة'
    },
    dimensions: {
      width: 500,
      height: 600,
      depth: 250,
      weight: 45
    },
    certifications: ['UL', 'CE', 'VDE', 'IEC'],
    features: ['دعم البطاريات', 'عملية اختيار مصدر الطاقة', 'تطبيق مراقبة'],
    description: 'عاكس هجين بقدرة 8 كيلووات يدعم البطاريات والعمل مع الشبكة',
    images: [
      'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&auto=format&fit=crop'
    ],
    videos: ['https://www.youtube.com/watch?v=example3'],
    documents: ['كتالوج المنتج', 'دليل التركيب', 'دليل البرمجة'],
    installationGuide: 'يتطلب فني مختص مع معرفة بأنظمة البطاريات',
    maintenanceRequirements: ['فحص البطاريات شهرياً', 'تنظيف كل 3 أشهر'],
    compatiblePanels: [
      { brand: 'SolarEdge', minPower: 400, maxPower: 600 },
      { brand: 'LG Solar', minPower: 380, maxPower: 550 }
    ],
    accessories: [
      { name: 'وحدة اتصال', description: 'للتواصل مع نظام البطاريات', price: 800 },
      { name: 'مجسات مراقبة', description: 'مجسات لمراقبة البطاريات', price: 350 }
    ],
    price: 18500,
    discount: 20,
    stock: 12,
    available: true,
    sku: 'INV-SED-8000',
    tags: ['هجين', '8KW', 'بطاريات', 'مراقبة ذكية'],
    createdAt: '2024-03-05T14:20:00Z',
    updatedAt: '2024-03-10T16:30:00Z',
    rating: 4.8,
    reviewCount: 56,
    views: 2345,
    delivery: 'شحن سريع',
    deliveryTime: '5-7 أيام عمل',
    mainFeatures: ['دعم البطاريات', '3 MPPT', 'شاشة لمس'],
    originalPrice: 23125,
    bulkPricing: [
      { minQty: 1, maxQty: 5, price: 18500, discount: 20 },
      { minQty: 6, maxQty: 10, price: 17575, discount: 24 },
      { minQty: 11, maxQty: 20, price: 16650, discount: 28 },
      { minQty: 21, maxQty: 50, price: 15725, discount: 32 }
    ]
  }
];

// وظائف التخزين
export const saveInverterManufacturers = (manufacturers: InverterManufacturer[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_INVERTER_MANUFACTURERS, JSON.stringify(manufacturers));
  }
};

export const saveInverters = (inverters: Inverter[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_INVERTERS, JSON.stringify(inverters));
  }
};

export const loadInverterManufacturers = (): InverterManufacturer[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY_INVERTER_MANUFACTURERS);
    return stored ? JSON.parse(stored) : defaultInverterManufacturers;
  }
  return defaultInverterManufacturers;
};

export const loadInverters = (): Inverter[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY_INVERTERS);
    return stored ? JSON.parse(stored) : defaultInverters;
  }
  return defaultInverters;
};

// وظائف تحويل البيانات للعرض
export function transformInvertersForDisplay(invertersData: any, manufacturersData?: any): any[] {
  try {
    // التحقق من أن البيانات موجودة
    if (!invertersData) {
      console.warn('transformInvertersForDisplay: No inverters data provided');
      return [];
    }

    let invertersArray: any[] = [];
    let manufacturersArray: any[] = [];

    // التحقق من شكل البيانات
    if (Array.isArray(invertersData)) {
      // إذا تم تمرير المصفوفة مباشرة
      invertersArray = invertersData;
    } else if (invertersData.inverters && Array.isArray(invertersData.inverters)) {
      // إذا تم تمرير كائن يحتوي على مصفوفة inverters
      invertersArray = invertersData.inverters;
    } else if (invertersData.data && Array.isArray(invertersData.data)) {
      // إذا كان هناك حقل data
      invertersArray = invertersData.data;
    } else {
      // حاول استخدام البيانات كما هي
      invertersArray = [invertersData];
    }

    // الحصول على بيانات الشركات المصنعة
    if (manufacturersData) {
      if (Array.isArray(manufacturersData)) {
        manufacturersArray = manufacturersData;
      } else if (manufacturersData.manufacturers && Array.isArray(manufacturersData.manufacturers)) {
        manufacturersArray = manufacturersData.manufacturers;
      }
    } else {
      // تحميل بيانات الشركات المصنعة من localStorage إذا لم يتم توفيرها
      manufacturersArray = loadInverterManufacturers();
    }

    // تحويل كل عاكس
    const transformedInverters = invertersArray.map((inverter: any) => {
      const manufacturer = manufacturersArray.find((m: any) => m.id === inverter.manufacturerId);
      
      // حساب السعر بعد الخصم
      const priceAfterDiscount = inverter.discount > 0 
        ? inverter.price * (1 - inverter.discount / 100)
        : inverter.price;

      // إنشاء بيانات العرض
      return {
        id: inverter.id,
        name: inverter.name || 'بدون اسم',
        manufacturerId: inverter.manufacturerId || '',
        manufacturer: manufacturer?.name || 'غير معروف',
        manufacturerLogo: manufacturer?.logo || '',
        type: inverter.type || 'string',
        powerRating: inverter.powerRating || 0,
        efficiency: inverter.efficiency || 0,
        maxEfficiency: inverter.maxEfficiency || inverter.efficiency || 0,
        mpptCount: inverter.mpptCount || 1,
        inputVoltage: inverter.inputVoltage || { min: 0, max: 0 },
        outputVoltage: inverter.outputVoltage || 0,
        price: Math.round(priceAfterDiscount),
        originalPrice: inverter.originalPrice || (inverter.discount > 0 ? inverter.price : undefined),
        discount: inverter.discount || 0,
        stock: inverter.stock || 0,
        available: inverter.available !== undefined ? inverter.available : true,
        sku: inverter.sku || '',
        description: inverter.description || '',
        images: Array.isArray(inverter.images) ? inverter.images.map((img: any, idx: number) => ({
          id: idx,
          imageUrl: typeof img === 'string' ? img : (img.url || img.imageUrl || ''),
          alt: `${inverter.name} - صورة ${idx + 1}`
        })) : [],
        videos: inverter.videos || [],
        documents: inverter.documents || [],
        tags: inverter.tags || [],
        rating: inverter.rating || 4.0,
        reviewCount: inverter.reviewCount || 0,
        views: inverter.views || 0,
        delivery: inverter.delivery || 'شحن مجاني',
        deliveryTime: inverter.deliveryTime || '3-5 أيام عمل',
        mainFeatures: inverter.mainFeatures || inverter.features || [
          `كفاءة ${inverter.efficiency || 0}%`,
          `${inverter.mpptCount || 1} MPPT`,
          `قدرة ${inverter.powerRating || 0} ك.و`
        ],
        protection: inverter.protection || {
          ipRating: 'IP65',
          features: []
        },
        communication: inverter.communication || {
          wifi: false,
          bluetooth: false,
          ethernet: false,
          gsm: false
        },
        warranty: inverter.warranty || {
          product: '5 سنوات',
          performance: '10 سنوات'
        },
        compatiblePanels: inverter.compatiblePanels || [],
        accessories: inverter.accessories || [],
        bulkPricing: inverter.bulkPricing || [],
        technicalSpecs: {
          'القدرة القصوى': `${inverter.powerRating} كيلووات`,
          'كفاءة التحويل': `${inverter.efficiency}%`,
          'كفاءة القصوى': `${inverter.maxEfficiency || inverter.efficiency}%`,
          'عدد مسارات MPPT': `${inverter.mpptCount}`,
          'جهد الدخل': `${inverter.inputVoltage?.min || 0} - ${inverter.inputVoltage?.max || 0} فولت`,
          'جهد الخرج': `${inverter.outputVoltage} فولت`,
          'درجة الحماية': `${inverter.protection?.ipRating || 'IP65'}`,
          'الضمان': `${inverter.warranty?.product || '5 سنوات'}`,
          'الأبعاد': `${inverter.dimensions?.width || 0} × ${inverter.dimensions?.height || 0} × ${inverter.dimensions?.depth || 0} ملم`,
          'الوزن': `${inverter.dimensions?.weight || 0} كجم`
        }
      };
    });

    console.log(`transformInvertersForDisplay: Processed ${transformedInverters.length} inverters`);
    return transformedInverters;
  } catch (error) {
    console.error('Error in transformInvertersForDisplay:', error);
    return [];
  }
}

// وظيفة للحصول على بيانات العلامات التجارية
export function getInverterBrandsData(manufacturersData?: any): any[] {
  try {
    let manufacturersArray: any[] = [];

    if (manufacturersData) {
      if (Array.isArray(manufacturersData)) {
        manufacturersArray = manufacturersData;
      } else if (manufacturersData.manufacturers && Array.isArray(manufacturersData.manufacturers)) {
        manufacturersArray = manufacturersData.manufacturers;
      }
    } else {
      manufacturersArray = loadInverterManufacturers();
    }

    const brands = manufacturersArray.map((manufacturer: any) => ({
      id: parseInt(manufacturer.id) || 0,
      name: manufacturer.name || 'غير معروف',
      logo: manufacturer.logo || '',
      description: manufacturer.description || '',
      country: manufacturer.country || '',
      established: manufacturer.founded || manufacturer.established || 2000,
      warranty: manufacturer.warranty || '5 سنوات',
      products: 0, // سيتم تحديثها لاحقاً
      countries: 50, // قيمة افتراضية
      rating: 4.5 // قيمة افتراضية
    }));

    console.log(`getInverterBrandsData: Processed ${brands.length} brands`);
    return brands;
  } catch (error) {
    console.error('Error in getInverterBrandsData:', error);
    return [];
  }
}

// وظيفة للحصول على العواكس حسب الشركة المصنعة
export function getInvertersByManufacturer(manufacturerId: string): any[] {
  const inverters = loadInverters();
  const manufacturers = loadInverterManufacturers();
  
  const filteredInverters = inverters.filter(inverter => inverter.manufacturerId === manufacturerId);
  return transformInvertersForDisplay(filteredInverters, manufacturers);
}

// وظيفة للبحث في العواكس
export function searchInverters(query: string): any[] {
  const inverters = loadInverters();
  const manufacturers = loadInverterManufacturers();
  
  const filteredInverters = inverters.filter(inverter => 
    inverter.name.toLowerCase().includes(query.toLowerCase()) ||
    inverter.description.toLowerCase().includes(query.toLowerCase()) ||
    inverter.sku.toLowerCase().includes(query.toLowerCase())
  );
  
  return transformInvertersForDisplay(filteredInverters, manufacturers);
}