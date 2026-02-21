// src/lib/solar-management-system.ts

// مفتاح التخزين المحلي
export const STORAGE_KEYS = {
  MANUFACTURERS: 'solar_manufacturers_v2',
  PANELS: 'solar_panels_v2',
  COUPONS: 'solar_coupons',
  ALERTS: 'solar_alerts',
  REPORTS: 'solar_reports',
  SETTINGS: 'solar_settings',
  BACKUP: 'solar_backup'
};

// أنواع البيانات المتقدمة
export interface Manufacturer {
  id: string;
  name: string;
  logo: string;
  description: string;
  establishedYear: number;
  country: string;
  certifications: string[];
  totalProducts: number;
  website: string;
  contactEmail: string;
  phone: string;
  headquarters: string;
  annualCapacityMW: number;
  revenue: number;
  marketShare: number;
  innovationScore: number;
  sustainabilityRating: number;
  socialRating: number;
  governanceRating: number;
  createdAt: string;
  updatedAt: string;
  performanceMetrics: {
    reliability: number;
    efficiencyTrend: number[];
    customerSatisfaction: number;
    afterSalesSupport: number;
  };
}

export interface SolarPanelSpecifications {
  cellType: 'Mono-crystalline' | 'Poly-crystalline' | 'Thin-film' | 'Bifacial' | 'PERC';
  cellNumber: number;
  dimensions: {
    length: number;
    width: number;
    thickness: number;
    weight: number;
    frameColor: string;
  };
  electrical: {
    maxPower: number;
    openCircuitVoltage: number;
    shortCircuitCurrent: number;
    maxPowerVoltage: number;
    maxPowerCurrent: number;
    powerTolerance: string;
    efficiency: number;
    temperatureCoefficient: {
      power: string;
      voltage: string;
      current: string;
    };
    nominalOperatingCellTemp: number;
  };
  mechanical: {
    frameMaterial: 'Aluminum' | 'Stainless Steel' | 'Composite';
    frontGlass: 'Tempered' | 'Anti-reflective' | 'Self-cleaning';
    backsheet: 'PET' | 'PVF' | 'Glass';
    junctionBox: string;
    connectorType: 'MC4' | 'MC4-Evo' | 'Tigo' | 'Custom';
    cableLength: number;
    cableCrossSection: number;
    bypassDiodes: number;
  };
  environmental: {
    operatingTemperature: string;
    maxSystemVoltage: number;
    maxSeriesFuseRating: number;
    fireRating: 'Class A' | 'Class B' | 'Class C';
    hailResistance: string;
    windLoad: string;
    snowLoad: string;
    saltMistResistance: string;
    ammoniaResistance: string;
  };
  certifications: {
    name: string;
    standard: string;
    validity: string;
  }[];
}

export interface SolarPanel {
  id: string;
  sku: string;
  name: string;
  manufacturerId: string;
  description: string;
  shortDescription: string;
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Utility';
  efficiency: number;
  power: number;
  voltage: number;
  current: number;
  available: boolean;
  quantity: number;
  minOrderQuantity: number;
  maxOrderQuantity: number;
  reorderPoint: number;
  costPrice: number;
  sellingPrice: number;
  discount: number;
  taxRate: number;
  images: string[];
  videos: {
    title: string;
    url: string;
    type: 'Installation' | 'Review' | 'Technical' | 'Promotional';
    duration: string;
    thumbnail: string;
  }[];
  documents: {
    name: string;
    url: string;
    type: 'Datasheet' | 'Manual' | 'Warranty' | 'Certification';
    size: string;
    language: string;
  }[];
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  specifications: SolarPanelSpecifications;
  warranty: {
    product: string;
    performance: string;
    linearPower: string;
    workmanship: string;
    extendedOptions: string[];
  };
  accessories: {
    id: string;
    name: string;
    required: boolean;
    price: number;
    discount: number;
  }[];
  installation: {
    time: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Professional';
    recommendedSystemSize: number;
    mountingOptions: string[];
    toolsRequired: string[];
    steps: {
      step: number;
      title: string;
      description: string;
      timeEstimate: string;
      tools: string[];
      warnings: string[];
    }[];
  };
  maintenance: {
    schedule: {
      frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annually';
      tasks: string[];
      estimatedTime: string;
    }[];
    services: {
      name: string;
      description: string;
      price: number;
      duration: string;
    }[];
    tips: string[];
  };
  performance: {
    degradationRate: number;
    powerOutputGuarantee: {
      year1: number;
      year10: number;
      year25: number;
    };
    temperatureCoefficient: number;
    lowLightPerformance: number;
    shadingTolerance: string;
  };
  sustainability: {
    carbonFootprint: number;
    energyPaybackTime: number;
    recyclability: number;
    materials: {
      name: string;
      percentage: number;
      recyclable: boolean;
    }[];
  };
  faqs: {
    id: string;
    question: string;
    answer: string;
    category: 'General' | 'Technical' | 'Installation' | 'Warranty';
    helpful: number;
    notHelpful: number;
  }[];
  reviews: {
    id: string;
    userId: string;
    rating: number;
    title: string;
    comment: string;
    pros: string[];
    cons: string[];
    verifiedPurchase: boolean;
    installationType: string;
    location: string;
    helpfulCount: number;
    createdAt: string;
    images: string[];
    responses: {
      adminId: string;
      comment: string;
      createdAt: string;
    }[];
  }[];
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    metaTags: string[];
  };
  analytics: {
    views: number;
    clicks: number;
    conversions: number;
    addToCart: number;
    wishlistAdds: number;
    shares: number;
    lastViewed: string;
  };
  inventory: {
    status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Discontinued';
    location: string;
    batchNumber: string;
    expiryDate: string;
    serialNumbers: string[];
    lastStockTake: string;
    stockValue: number;
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'shipping' | 'bundle';
  value: number;
  minPurchase: number;
  maxDiscount: number;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  usageCount: number;
  perUserLimit: number;
  products: string[];
  categories: string[];
  manufacturers: string[];
  excludedProducts: string[];
  customerGroups: 'all' | 'new' | 'returning' | 'vip';
  stackable: boolean;
  autoApply: boolean;
  isActive: boolean;
  redemptionHistory: {
    orderId: string;
    customerId: string;
    discountAmount: number;
    usedAt: string;
  }[];
  createdAt: string;
  createdBy: string;
}

export interface Alert {
  id: string;
  type: 'stock' | 'price' | 'expiry' | 'performance' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  data: any;
  read: boolean;
  actionRequired: boolean;
  actions: {
    label: string;
    action: string;
    url?: string;
  }[];
  createdAt: string;
  expiresAt?: string;
}

export interface AnalyticsReport {
  id: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  dateRange: {
    start: string;
    end: string;
  };
  metrics: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    conversionRate: number;
    topProducts: {
      productId: string;
      name: string;
      quantity: number;
      revenue: number;
    }[];
    topManufacturers: {
      manufacturerId: string;
      name: string;
      revenue: number;
      unitsSold: number;
    }[];
    inventory: {
      totalValue: number;
      turnoverRate: number;
      outOfStockItems: number;
      slowMovingItems: number;
    };
    customerMetrics: {
      newCustomers: number;
      returningCustomers: number;
      averageCustomerValue: number;
      retentionRate: number;
    };
    performance: {
      websiteVisits: number;
      pageViews: number;
      bounceRate: number;
      sessionDuration: number;
    };
  };
  insights: string[];
  recommendations: string[];
  generatedAt: string;
  generatedBy: string;
}

// دوال التخزين
export const loadManufacturers = (): Manufacturer[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEYS.MANUFACTURERS);
  return saved ? JSON.parse(saved) : [];
};

export const loadSolarPanels = (): SolarPanel[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEYS.PANELS);
  return saved ? JSON.parse(saved) : [];
};

export const loadCoupons = (): Coupon[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
  return saved ? JSON.parse(saved) : [];
};

export const loadAlerts = (): Alert[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEYS.ALERTS);
  return saved ? JSON.parse(saved) : [];
};

export const loadReports = (): AnalyticsReport[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEYS.REPORTS);
  return saved ? JSON.parse(saved) : [];
};

export const saveManufacturers = (manufacturers: Manufacturer[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.MANUFACTURERS, JSON.stringify(manufacturers));
};

export const saveSolarPanels = (panels: SolarPanel[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PANELS, JSON.stringify(panels));
};

export const saveCoupons = (coupons: Coupon[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
};

export const saveAlerts = (alerts: Alert[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
};

export const saveReports = (reports: AnalyticsReport[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
};

// فئة إدارة النظام
export class SolarManagementSystem {
  private static instance: SolarManagementSystem;

  private constructor() {
    this.setupDefaultData();
  }

  static getInstance(): SolarManagementSystem {
    if (!SolarManagementSystem.instance) {
      SolarManagementSystem.instance = new SolarManagementSystem();
    }
    return SolarManagementSystem.instance;
  }

  private setupDefaultData() {
    const manufacturers = loadManufacturers();
    const panels = loadSolarPanels();

    if (manufacturers.length === 0) {
      const defaultManufacturers: Manufacturer[] = [
        {
          id: 'mfg_001',
          name: 'SunPower',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/SunPower_logo.svg/320px-SunPower_logo.svg.png',
          description: 'شركة رائدة عالمياً في مجال الطاقة الشمسية',
          establishedYear: 1985,
          country: 'الولايات المتحدة',
          certifications: ['ISO 9001', 'ISO 14001', 'IEC 61215', 'IEC 61730', 'UL 1703'],
          totalProducts: 25,
          website: 'https://www.sunpower.com',
          contactEmail: 'info@sunpower.com',
          phone: '+1-800-786-7693',
          headquarters: 'سان خوسيه، كاليفورنيا',
          annualCapacityMW: 1500,
          revenue: 1500000000,
          marketShare: 8.5,
          innovationScore: 9.2,
          sustainabilityRating: 9.5,
          socialRating: 8.8,
          governanceRating: 9.0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          performanceMetrics: {
            reliability: 9.8,
            efficiencyTrend: [21.5, 22.1, 22.5, 22.8],
            customerSatisfaction: 9.4,
            afterSalesSupport: 9.2
          }
        }
      ];
      saveManufacturers(defaultManufacturers);
    }

    if (panels.length === 0) {
      const defaultPanels: SolarPanel[] = [
        {
          id: 'panel_001',
          sku: 'SP-X22-440',
          name: 'SunPower X-Series 440W Mono-crystalline Solar Panel',
          manufacturerId: 'mfg_001',
          description: 'لوح شمسي مونو كريستال عالي الكفاءة',
          shortDescription: 'لوح شمسي 440 واط بكفاءة 22.8%',
          category: 'Residential',
          efficiency: 22.8,
          power: 440,
          voltage: 41.2,
          current: 10.68,
          available: true,
          quantity: 85,
          minOrderQuantity: 1,
          maxOrderQuantity: 50,
          reorderPoint: 15,
          costPrice: 850,
          sellingPrice: 1200,
          discount: 10,
          taxRate: 15,
          images: [
            'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop'
          ],
          videos: [],
          documents: [],
          features: [],
          specifications: {
            cellType: 'Mono-crystalline',
            cellNumber: 66,
            dimensions: {
              length: 1760,
              width: 1040,
              thickness: 35,
              weight: 19.5,
              frameColor: 'Black'
            },
            electrical: {
              maxPower: 440,
              openCircuitVoltage: 41.2,
              shortCircuitCurrent: 10.68,
              maxPowerVoltage: 34.8,
              maxPowerCurrent: 10.08,
              powerTolerance: '0/+5%',
              efficiency: 22.8,
              temperatureCoefficient: {
                power: '-0.29%/°C',
                voltage: '-0.26%/°C',
                current: '+0.04%/°C'
              },
              nominalOperatingCellTemp: 43
            },
            mechanical: {
              frameMaterial: 'Aluminum',
              frontGlass: 'Anti-reflective',
              backsheet: 'Glass',
              junctionBox: 'IP68 with 3 bypass diodes',
              connectorType: 'MC4-Evo',
              cableLength: 1.2,
              cableCrossSection: 4,
              bypassDiodes: 3
            },
            environmental: {
              operatingTemperature: '-40°C ~ +85°C',
              maxSystemVoltage: 1000,
              maxSeriesFuseRating: 20,
              fireRating: 'Class A',
              hailResistance: '30mm @ 27m/s',
              windLoad: '2400Pa',
              snowLoad: '5400Pa',
              saltMistResistance: 'IEC 61701 Class 6',
              ammoniaResistance: 'IEC 62716 Class A'
            },
            certifications: []
          },
          warranty: {
            product: '25 سنة',
            performance: '25 سنة خطي',
            linearPower: '92% @ 25 سنة',
            workmanship: '12 سنة',
            extendedOptions: []
          },
          accessories: [],
          installation: {
            time: '2-3 أيام',
            difficulty: 'Medium',
            recommendedSystemSize: 5,
            mountingOptions: [],
            toolsRequired: [],
            steps: []
          },
          maintenance: {
            schedule: [],
            services: [],
            tips: []
          },
          performance: {
            degradationRate: 0.25,
            powerOutputGuarantee: {
              year1: 98,
              year10: 92,
              year25: 92
            },
            temperatureCoefficient: -0.29,
            lowLightPerformance: 97,
            shadingTolerance: 'Excellent'
          },
          sustainability: {
            carbonFootprint: 350,
            energyPaybackTime: 1.2,
            recyclability: 96,
            materials: []
          },
          faqs: [],
          reviews: [],
          tags: ['جديد', 'الأكثر مبيعاً'],
          seo: {
            title: 'لوح شمسي 440 واط',
            description: 'لوح شمسي عالي الكفاءة',
            keywords: [],
            metaTags: []
          },
          analytics: {
            views: 1250,
            clicks: 345,
            conversions: 28,
            addToCart: 67,
            wishlistAdds: 45,
            shares: 23,
            lastViewed: new Date().toISOString()
          },
          inventory: {
            status: 'In Stock',
            location: 'المستودع الرئيسي',
            batchNumber: 'SPX22-440-2301',
            expiryDate: '2030-12-31',
            serialNumbers: [],
            lastStockTake: '2024-01-20',
            stockValue: 72250
          },
          createdAt: '2024-01-01T10:00:00Z',
          updatedAt: new Date().toISOString(),
          createdBy: 'admin',
          updatedBy: 'admin'
        }
      ];
      saveSolarPanels(defaultPanels);
    }
  }

  async saveManufacturer(manufacturer: Manufacturer): Promise<void> {
    const manufacturers = loadManufacturers();
    const index = manufacturers.findIndex(m => m.id === manufacturer.id);
    
    if (index > -1) {
      manufacturers[index] = {
        ...manufacturer,
        updatedAt: new Date().toISOString()
      };
    } else {
      manufacturers.push({
        ...manufacturer,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    saveManufacturers(manufacturers);
  }

  async getManufacturers(): Promise<Manufacturer[]> {
    return loadManufacturers();
  }

  async saveSolarPanel(panel: SolarPanel): Promise<void> {
    const panels = loadSolarPanels();
    const index = panels.findIndex(p => p.id === panel.id);
    
    if (index > -1) {
      panels[index] = {
        ...panel,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin'
      };
    } else {
      panels.push({
        ...panel,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        updatedBy: 'admin'
      });
    }
    
    saveSolarPanels(panels);
  }

  async getSolarPanels(): Promise<SolarPanel[]> {
    return loadSolarPanels();
  }

  async saveCoupon(coupon: Coupon): Promise<void> {
    const coupons = loadCoupons();
    const index = coupons.findIndex(c => c.id === coupon.id);
    
    if (index > -1) {
      coupons[index] = coupon;
    } else {
      coupons.push({
        ...coupon,
        createdAt: new Date().toISOString(),
        createdBy: 'admin'
      });
    }
    
    saveCoupons(coupons);
  }

  async getCoupons(): Promise<Coupon[]> {
    return loadCoupons();
  }

  async generateAlert(alert: Alert): Promise<void> {
    const alerts = loadAlerts();
    alerts.unshift(alert);
    saveAlerts(alerts.slice(0, 100)); // حفظ آخر 100 تنبيه فقط
  }

  async getAlerts(): Promise<Alert[]> {
    return loadAlerts();
  }

  async generateReport(report: AnalyticsReport): Promise<void> {
    const reports = loadReports();
    reports.unshift(report);
    saveReports(reports.slice(0, 365)); // حفظ تقارير سنة
  }

  async getReports(): Promise<AnalyticsReport[]> {
    return loadReports();
  }

  // أدوات مساعدة للتحويل
  transformForDisplay(panels: SolarPanel[], manufacturers: Manufacturer[]) {
    return panels.map(panel => {
      const manufacturer = manufacturers.find(m => m.id === panel.manufacturerId);
      
      return {
        id: panel.id,
        sku: panel.sku,
        name: panel.name,
        price: panel.sellingPrice,
        originalPrice: panel.discount > 0 ? panel.sellingPrice * (1 + panel.discount/100) : undefined,
        power: panel.power,
        efficiency: panel.efficiency,
        voltage: panel.voltage,
        current: panel.current,
        rating: 4.5 + (panel.efficiency / 100),
        reviewCount: Math.floor(Math.random() * 100) + 50,
        stock: panel.quantity,
        brandId: panel.manufacturerId,
        brandName: manufacturer?.name,
        images: panel.images.map(img => ({ imageUrl: img })),
        description: panel.description,
        shortDescription: panel.shortDescription,
        features: panel.features,
        warranty: panel.warranty,
        delivery: panel.quantity > 0 ? "شحن مجاني" : "متوفر قريباً",
        deliveryTime: "2-5 أيام عمل",
        tags: panel.tags,
        specifications: panel.specifications,
        videos: panel.videos,
        documents: panel.documents,
        analytics: panel.analytics,
        inventory: panel.inventory,
        discount: panel.discount,
        category: panel.category,
        createdAt: panel.createdAt
      };
    });
  }

  getBrandsData(manufacturers: Manufacturer[]) {
    return manufacturers.map((m, idx) => ({
      id: m.id,
      name: m.name,
      logo: m.logo || `https://via.placeholder.com/150/007bff/ffffff?text=${m.name.charAt(0)}`,
      description: m.description,
      established: m.establishedYear,
      products: Math.floor(Math.random() * 100) + 50,
      countries: Math.floor(Math.random() * 80) + 20,
      rating: 4.5 + (Math.random() * 0.5)
    }));
  }
}

export const solarManagementSystem = SolarManagementSystem.getInstance();