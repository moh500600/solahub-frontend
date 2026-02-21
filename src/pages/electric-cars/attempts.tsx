import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  ChevronDown,
  X,
  Star,
  Zap,
  Droplet,
  Shield,
  Tag,
  Filter,
  Power,
  Droplets,
  Sparkles,
  TrendingUp,
  BadgeCheck,
  Truck,
  ShieldCheck,
  Clock,
  ArrowRight,
  ShoppingCart,
  Search,
  SlidersHorizontal,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Download,
  PlayCircle,
  Eye,
  Package,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  FileText,
  Youtube,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Maximize2,
  Minus,
  Plus,
  RotateCw,
  Award,
  Users,
  BarChart3,
  ThumbsUp,
  MessageCircle,
  Calendar,
  File,
  DownloadCloud,
  BookOpen,
  Layers,
  Globe,
  TrendingDown,
  Thermometer,
  Wind,
  Cloud,
  Settings,
  Wrench,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Building,
  Package2,
  CreditCard,
  RefreshCw,
  Clock as ClockIcon,
  StarHalf,
  Percent,
  Cpu,
  PackageOpen,
  Box,
  Grid,
  Brain,
  Cctv,
  Lightbulb,
  GitCompare,
  BarChart,
  ThermometerSun,
  CloudRain,
  ShieldOff,
  MousePointerClick,
  Plug,
  Cable,
  Scan,
  LineChart,
  Target,
  Settings2,
  Upload,
  Moon,
  Sunrise,
  Sunset,
  Wifi,
  Smartphone,
  Monitor,
  Tablet,
  Home,
  Building2,
  Factory,
  Trees,
  CloudLightning,
  AlertTriangle,
  Info,
  Rocket,
  Crown,
  Trophy,
  Medal,
  Gift,
  CalendarDays,
  Navigation,
  Compass,
  Globe2,
  Map,
  Layers2,
  FolderOpen,
  FolderTree,
  Database,
  HardDrive,
  Server,
  Network,
  MemoryStick,
  Microchip,
  CircuitBoard,
  Router,
  Satellite,
  Radio,
  Bluetooth,
  WifiOff,
  Signal,
  SignalHigh,
  SignalLow,
  SignalZero,
  PlugZap,
  ZapOff,
  PowerOff,
  PowerCircle,
  Bolt,
  Flashlight,
  Lamp,
  LampDesk,
  LampFloor,
  LampCeiling,
  LampWallUp,
  LampWallDown,
  SunDim,
  SunMedium,
  SunSnow,
  CloudSun,
  CloudMoon,
  CloudSunRain,
  CloudMoonRain,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudSnow,
  Tornado,
  Snowflake,
  Umbrella,
  Waves,
  Gauge,
  BarChart2,
  BarChart4,
  PieChart,
  AreaChart,
  ScatterChart,
  CandlestickChart,
  DollarSign,
  Wallet,
  Banknote,
  Coins,
  PiggyBank,
  Receipt,
  ReceiptText,
  FileDigit,
  FileBarChart,
  FileCode,
  FileImage,
  FileAudio,
  FileVideo,
  FileArchive,
  FileSpreadsheet,
  FileKey,
  FileLock,
  FileSearch,
  FileX,
  FileCheck,
  FilePlus,
  FileMinus,
  FileQuestion,
  FileWarning,
  FileSignature,
  Folder,
  FolderPlus,
  FolderMinus,
  FolderSearch,
  FolderX,
  FolderCheck,
} from "lucide-react";
import { toast } from "sonner";
import { localCart } from "@/lib/local-cart";

// استيراد المكونات المشتركة
import Header from "../Header";  // للخروج من electric-cars والعودة لمجلد pages
import Footer from "../Footer";  // للخروج من electric-cars والعودة لمجلد pages

// بيانات وهمية لمضخات السيارات الكهربائية
const mockProducts = [
  {
    id: 1,
    name: "مضخة شحن سريعة 22 كيلوواط للسيارات الكهربائية",
    price: 185000,
    originalPrice: 210000,
    power: 22,
    voltage: "380V AC",
    current: "32A",
    type: "شحن سريع",
    efficiency: 95,
    rating: 4.8,
    reviewCount: 89,
    stock: 15,
    brandId: 1,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1607863686762-5c3bcb0665de?w=600&h=400&fit=crop"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1607863686762-5c3bcb0665de?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن سريعة بقوة 22 كيلوواط للسيارات الكهربائية، تدعم جميع أنواع السيارات الكهربائية والشحن السريع.",
    features: ["قدرة 22 كيلوواط", "شحن سريع DC", "كفاءة 95%", "مراقبة ذكية", "حماية متكاملة", "واجهة شاشة تعمل باللمس"],
    warranty: "3 سنوات",
    delivery: "شحن مجاني",
    deliveryTime: "3-6 أيام عمل",
    sku: "CP-EV-22000-FAST",
    tags: ["الأكثر مبيعاً", "شحن سريع", "متطور"],
    specifications: {
      "النوع": "مضخة شحن سريعة DC للسيارات الكهربائية",
      "القدرة": "22 كيلوواط",
      "الجهد": "380V AC ثلاثي الطور",
      "التيار": "32 أمبير",
      "جهد الخرج DC": "200-500V DC",
      "التيار الأقصى DC": "100 أمبير",
      "الكفاءة": "95%",
      "وقت الشحن": "1-4 ساعات حسب السيارة",
      "الأبعاد": "500 × 400 × 250 ملم",
      "الوزن": "35 كجم",
      "درجة الحرارة التشغيل": "-20°C إلى +50°C",
      "الضمان": "3 سنوات",
      "شهادة الجودة": "CE, IEC 61851, TUV",
      "تصنيف الحماية": "IP54",
      "نظام التبريد": "مروحة ذكية",
      "واجهة الاتصال": "Wi-Fi, 4G, Ethernet",
      "التوافق": "جميع السيارات الكهربائية"
    },
    videos: [
      {
        title: "فيديو توضيحي للمضخة",
        url: "https://www.youtube.com/watch?v=demo1",
        thumbnail: "https://img.youtube.com/vi/demo1/hqdefault.jpg"
      },
      {
        title: "كيفية التركيب",
        url: "https://www.youtube.com/watch?v=demo2",
        thumbnail: "https://img.youtube.com/vi/demo2/hqdefault.jpg"
      },
      {
        title: "مقارنة مع المضخات التقليدية",
        url: "https://www.youtube.com/watch?v=demo3",
        thumbnail: "https://img.youtube.com/vi/demo3/hqdefault.jpg"
      }
    ],
    documents: [
      {
        name: "المواصفات الفنية.pdf",
        url: "#",
        size: "2.1 MB",
        icon: FileText
      },
      {
        name: "دليل التركيب.pdf",
        url: "#",
        size: "1.5 MB",
        icon: Settings
      },
      {
        name: "شهادة الجودة.pdf",
        url: "#",
        size: "2.8 MB",
        icon: Award
      },
      {
        name: "كتالوج المضخات.pdf",
        url: "#",
        size: "4.2 MB",
        icon: BookOpen
      }
    ],
    variants: [
      { id: 1, power: 7, price: 75000, voltage: "220V AC", current: "32A", efficiency: 92 },
      { id: 2, power: 11, price: 125000, voltage: "380V AC", current: "16A", efficiency: 94 },
      { id: 3, power: 22, price: 185000, voltage: "380V AC", current: "32A", efficiency: 95 },
      { id: 4, power: 50, price: 350000, voltage: "380V AC", current: "63A", efficiency: 96 }
    ],
    relatedProducts: [2, 3, 5, 13],
    views: 850,
    installationGuide: "متوفر",
    maintenance: "منخفض",
    roi: "2-3 سنوات",
    // بيانات جديدة للأقسام المضافة
    aiSuggestions: [
      {
        id: 1,
        title: "محطة شحن 4 مضخات",
        description: "4 مضخات 22 كيلوواط مع نظام إدارة",
        reason: "بناءً على احتياجاتك للشحن المتعدد",
        price: 680000,
        savings: 60000
      },
      {
        id: 2,
        title: "نظام شحن شمسي",
        description: "مضخة مع ألواح شمسية 10 كيلوواط",
        reason: "للاستفادة من الطاقة الشمسية للشحن المجاني",
        price: 550000,
        savings: 120000
      },
      {
        id: 3,
        title: "نظام مراقبة ذكي",
        description: "مراقبة الأداء والاستهلاك عبر الهاتف",
        reason: "لتحسين كفاءة الشحن واكتشاف المشاكل مبكراً",
        price: 35000,
        savings: 15000
      }
    ],
    accessories: [
      {
        id: 1,
        name: "كابل شحن 32 أمبير",
        description: "كابل طويل ومتين للشحن السريع",
        price: 4500,
        image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        name: "وحدة حماية كهربائية",
        description: "حماية من التقلبات والبرق",
        price: 6500,
        image: "https://images.unsplash.com/photo-1607863686762-5c3bcb0665de?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        name: "شاشة مراقبة ذكية",
        description: "شاشة تعمل باللمس للمراقبة والتحكم",
        price: 12500,
        image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop"
      }
    ],
    installation: {
      time: "1-2 أيام",
      difficulty: "متوسط",
      requirements: ["مكان مخصص", "جهد كهربائي ثابت", "أرضي كهربائي", "تصريح بلدي"],
      steps: [
        "تثبيت القاعدة",
        "تركيب المضخة",
        "التوصيل الكهربائي",
        "البرمجة والاختبار"
      ]
    },
    maintenanceSchedule: [
      { frequency: "شهريًا", task: "فحص التوصيلات" },
      { frequency: "ربع سنوي", task: "تنظيف المراوح" },
      { frequency: "سنويًا", task: "فحص شامل" }
    ],
    maintenanceTips: [
      "الحفاظ على نظافة المضخة",
      "مراقبة أداء المروحة",
      "فحص الكابلات بانتظام"
    ],
    bulkPricing: [
      { minQty: 1, maxQty: 2, price: 185000, discount: 0 },
      { minQty: 3, maxQty: 5, price: 175000, discount: 5 },
      { minQty: 6, maxQty: 10, price: 165000, discount: 11 },
      { minQty: 11, maxQty: 20, price: 155000, discount: 16 }
    ]
  },
  {
    id: 2,
    name: "مضخة شحن منزلية 7 كيلوواط",
    price: 75000,
    originalPrice: 85000,
    power: 7,
    voltage: "220V AC",
    current: "32A",
    type: "منزلي",
    efficiency: 92,
    rating: 4.7,
    reviewCount: 78,
    stock: 35,
    brandId: 2,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن منزلية اقتصادية للشحن البطيء والمتوسط للسيارات الكهربائية.",
    features: ["اقتصادية", "صامتة", "سهلة التركيب", "حماية متكاملة"],
    warranty: "2 سنوات",
    delivery: "شحن مجاني",
    deliveryTime: "2-5 أيام عمل",
    sku: "CP-HOME-7000",
    tags: ["اقتصادية", "منزلي"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [1, 4, 5],
    views: 320
  },
  {
    id: 3,
    name: "مضخة شحن سريعة 50 كيلوواط",
    price: 350000,
    originalPrice: 400000,
    power: 50,
    voltage: "380V AC",
    current: "63A",
    type: "شحن سريع",
    efficiency: 96,
    rating: 4.8,
    reviewCount: 34,
    stock: 12,
    brandId: 1,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607863686762-5c3bcb0665de?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن فائقة السرعة للمحطات التجارية والمراكز التجارية.",
    features: ["شحن فائق السرعة", "كفاءة 96%", "تحمل الاستخدام المكثف", "نظام تبريد متقدم"],
    warranty: "3 سنوات",
    delivery: "شحن خاص",
    deliveryTime: "7-14 أيام عمل",
    sku: "CP-EV-50000-ULTRA",
    tags: ["سريع", "تجاري"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [2, 5, 7],
    views: 210
  },
  {
    id: 4,
    name: "مضخة شحن عامة 11 كيلوواط",
    price: 125000,
    originalPrice: 140000,
    power: 11,
    voltage: "380V AC",
    current: "16A",
    type: "عام",
    efficiency: 94,
    rating: 4.6,
    reviewCount: 39,
    stock: 20,
    brandId: 3,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن متوسطة السرعة للمواقف العامة والشركات.",
    features: ["أداء متوازن", "مناسبة للاستخدام العام", "مراقبة ذكية", "وضع توفير"],
    warranty: "3 سنوات",
    delivery: "شحن سريع",
    deliveryTime: "4-7 أيام عمل",
    sku: "CP-PUBLIC-11000",
    tags: ["عام", "متوسط"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [1, 2, 6],
    views: 180
  },
  {
    id: 5,
    name: "مضخة شحن متنقلة 3 كيلوواط",
    price: 45000,
    originalPrice: 52000,
    power: 3,
    voltage: "220V AC",
    current: "13A",
    type: "متنقل",
    efficiency: 90,
    rating: 4.5,
    reviewCount: 124,
    stock: 60,
    brandId: 5,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607863686762-5c3bcb0665de?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن متنقلة للرحلات والاستخدامات الطارئة.",
    features: ["متنقلة", "خفيفة الوزن", "منفذ USB", "شاشة عرض"],
    warranty: "1 سنة",
    delivery: "شحن مجاني",
    deliveryTime: "1-3 أيام عمل",
    sku: "CP-PORT-3000",
    tags: ["متنقل", "رحلات"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [3, 7, 8],
    views: 420
  },
  {
    id: 6,
    name: "مضخة شحن ثلاثي الطور 43 كيلوواط",
    price: 285000,
    originalPrice: 330000,
    power: 43,
    voltage: "380V AC",
    current: "63A",
    type: "ثلاثي الطور",
    efficiency: 95.5,
    rating: 4.9,
    reviewCount: 28,
    stock: 8,
    brandId: 4,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن ثلاثي الطور للمراكز التجارية الكبيرة.",
    features: ["ثلاثي الطور", "كفاءة 95.5%", "تحكم رقمي", "نظام تبريد سائل"],
    warranty: "3 سنوات",
    delivery: "شحن خاص",
    deliveryTime: "14-21 أيام عمل",
    sku: "CP-3PH-43000",
    tags: ["ثلاثي الطور", "صناعي"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [4, 8, 9],
    views: 150
  },
  {
    id: 7,
    name: "مضخة شحن DC 150 كيلوواط",
    price: 850000,
    originalPrice: 950000,
    power: 150,
    voltage: "480V AC",
    current: "200A",
    type: "شحن فائق",
    efficiency: 97,
    rating: 4.9,
    reviewCount: 18,
    stock: 5,
    brandId: 4,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607863686762-5c3bcb0665de?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن فائقة السرعة للمحطات الرئيسية والطرق السريعة.",
    features: ["شحن فائق السرعة", "كفاءة 97%", "تبريد سائل", "إدارة حرارية متقدمة"],
    warranty: "5 سنوات",
    delivery: "شحن خاص",
    deliveryTime: "21-28 أيام عمل",
    sku: "CP-DC-150000",
    tags: ["فائق السرعة", "طرق سريعة"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [3, 6, 9],
    views: 95
  },
  {
    id: 8,
    name: "مضخة شحن ذكية 7.4 كيلوواط",
    price: 95000,
    originalPrice: 110000,
    power: 7.4,
    voltage: "220V AC",
    current: "32A",
    type: "ذكي",
    efficiency: 93,
    rating: 4.7,
    reviewCount: 56,
    stock: 28,
    brandId: 2,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن ذكية مع اتصال واي فاي ومراقبة عن بعد.",
    features: ["ذكية", "واي فاي", "تطبيق مراقبة", "جدولة الشحن"],
    warranty: "2 سنوات",
    delivery: "شحن مجاني",
    deliveryTime: "2-5 أيام عمل",
    sku: "CP-SMART-7400",
    tags: ["ذكي", "واي فاي"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [2, 10, 11],
    views: 210
  },
  {
    id: 9,
    name: "مضخة شحن مدمجة 3.7 كيلوواط",
    price: 65000,
    originalPrice: 75000,
    power: 3.7,
    voltage: "220V AC",
    current: "16A",
    type: "مدمج",
    efficiency: 91,
    rating: 4.5,
    reviewCount: 88,
    stock: 45,
    brandId: 2,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607863686762-5c3bcb0665de?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن مدمجة وصغيرة الحجم للمنازل والشقق.",
    features: ["مدمجة", "صامتة", "حماية أساسية", "وضع توفير"],
    warranty: "2 سنوات",
    delivery: "شحن مجاني",
    deliveryTime: "2-4 أيام عمل",
    sku: "CP-COMPACT-3700",
    tags: ["مدمج", "صغير"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [5, 10, 13],
    views: 95
  },
  {
    id: 10,
    name: "مضخة شحن تجارية 30 كيلوواط",
    price: 235000,
    originalPrice: 280000,
    power: 30,
    voltage: "380V AC",
    current: "43A",
    type: "تجاري",
    efficiency: 95,
    rating: 4.8,
    reviewCount: 36,
    stock: 14,
    brandId: 3,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن تجارية للمراكز التجارية والفنادق.",
    features: ["قدرة عالية", "كفاءة 95%", "وضع ذكي", "إدارة متعددة المستخدمين"],
    warranty: "3 سنوات",
    delivery: "شحن سريع",
    deliveryTime: "5-9 أيام عمل",
    sku: "CP-COMM-30000",
    tags: ["تجاري", "عالي"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [4, 6, 11],
    views: 68
  },
  {
    id: 11,
    name: "مضخة شحن شمسي 22 كيلوواط",
    price: 420000,
    originalPrice: 500000,
    power: 22,
    voltage: "380V AC",
    current: "32A",
    type: "شمسي",
    efficiency: 94,
    rating: 4.7,
    reviewCount: 24,
    stock: 6,
    brandId: 1,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607863686762-5c3bcb0665de?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن تعمل بالطاقة الشمسية للشحن المجاني.",
    features: ["شمسي", "MPPT متقدم", "مراقبة عن بعد", "تخزين طاقة"],
    warranty: "3 سنوات",
    delivery: "شحن خاص",
    deliveryTime: "12-16 أيام عمل",
    sku: "CP-SOLAR-22000",
    tags: ["شمسي", "مستدام"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [1, 3, 7],
    views: 65
  },
  {
    id: 12,
    name: "مضخة شحن سريعة 120 كيلوواط",
    price: 620000,
    originalPrice: 720000,
    power: 120,
    voltage: "480V AC",
    current: "150A",
    type: "شحن فائق",
    efficiency: 96.5,
    rating: 4.9,
    reviewCount: 18,
    stock: 4,
    brandId: 4,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن فائقة السرعة للمحطات الرئيسية.",
    features: ["شحن فائق", "كفاءة 96.5%", "تبريد متقدم", "مراقبة حرارية"],
    warranty: "5 سنوات",
    delivery: "شحن خاص",
    deliveryTime: "18-24 أيام عمل",
    sku: "CP-ULTRA-120000",
    tags: ["فائق", "رئيسي"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [7, 13, 14],
    views: 52
  },
  {
    id: 13,
    name: "مضخة شحن ثنائي المنفذ 2x22 كيلوواط",
    price: 320000,
    originalPrice: 380000,
    power: 44,
    voltage: "380V AC",
    current: "2x32A",
    type: "ثنائي",
    efficiency: 95,
    rating: 4.8,
    reviewCount: 42,
    stock: 18,
    brandId: 3,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607863686762-5c3bcb0665de?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن ثنائية المنافذ للشحن المتزامن.",
    features: ["ثنائي المنفذ", "شحن متزامن", "كفاءة 95%", "إدارة ذكية"],
    warranty: "3 سنوات",
    delivery: "شحن سريع",
    deliveryTime: "7-10 أيام عمل",
    sku: "CP-DUAL-44000",
    tags: ["ثنائي", "متزامن"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [1, 4, 10],
    views: 120
  },
  {
    id: 14,
    name: "مضخة شحن للشاحنات الكهربائية 350 كيلوواط",
    price: 1850000,
    originalPrice: 2200000,
    power: 350,
    voltage: "690V AC",
    current: "300A",
    type: "شاحنات",
    efficiency: 97.5,
    rating: 4.9,
    reviewCount: 12,
    stock: 3,
    brandId: 4,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن للشاحنات الكهربائية والحافلات.",
    features: ["للالشاحنات", "قدرة عالية", "كفاءة 97.5%", "تبريد سائل", "تصميم صناعي"],
    warranty: "5 سنوات",
    delivery: "شحن خاص",
    deliveryTime: "30-45 أيام عمل",
    sku: "CP-TRUCK-350000",
    tags: ["شاحنات", "صناعي"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [7, 12, 15],
    views: 45
  },
  {
    id: 15,
    name: "مضخة شحن مياه 5.5 كيلوواط",
    price: 85000,
    originalPrice: 95000,
    power: 5.5,
    voltage: "220V AC",
    current: "25A",
    type: "مياه",
    efficiency: 92,
    rating: 4.6,
    reviewCount: 67,
    stock: 30,
    brandId: 5,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607863686762-5c3bcb0665de?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن مدمجة مع نظام تبريد بالمياه.",
    features: ["تبريد مائي", "صامت", "كفاءة 92%", "حجم صغير"],
    warranty: "2 سنوات",
    delivery: "شحن مجاني",
    deliveryTime: "3-7 أيام عمل",
    sku: "CP-WATER-5500",
    tags: ["مياه", "صامت"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [5, 9, 16],
    views: 180
  },
  {
    id: 16,
    name: "مضخة شحن 100 كيلوواط لمحطات الوقود",
    price: 750000,
    originalPrice: 850000,
    power: 100,
    voltage: "480V AC",
    current: "120A",
    type: "محطات وقود",
    efficiency: 96,
    rating: 4.8,
    reviewCount: 24,
    stock: 6,
    brandId: 4,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن لمحطات الوقود والمراكز التجارية الكبيرة.",
    features: ["للمحطات", "كفاءة 96%", "مراقبة مركزية", "تصميم خارجي"],
    warranty: "5 سنوات",
    delivery: "شحن خاص",
    deliveryTime: "15-20 أيام عمل",
    sku: "CP-STATION-100000",
    tags: ["محطات", "تجاري"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [7, 12, 14],
    views: 65
  },
  {
    id: 17,
    name: "مضخة شحن 15 كيلوواط للسيارات الهجينة",
    price: 165000,
    originalPrice: 195000,
    power: 15,
    voltage: "380V AC",
    current: "22A",
    type: "هجين",
    efficiency: 94,
    rating: 4.7,
    reviewCount: 53,
    stock: 22,
    brandId: 1,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607863686762-5c3bcb0665de?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن متوافقة مع السيارات الهجينة والكهربائية.",
    features: ["متوافق هجين", "كفاءة 94%", "وضع ذكي", "مراقبة طاقة"],
    warranty: "3 سنوات",
    delivery: "شحن مجاني",
    deliveryTime: "3-6 أيام عمل",
    sku: "CP-HYBRID-15000",
    tags: ["هجين", "ذكي"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [1, 4, 10],
    views: 78
  },
  {
    id: 18,
    name: "مضخة شحن 60 كيلوواط للفنادق",
    price: 420000,
    originalPrice: 480000,
    power: 60,
    voltage: "380V AC",
    current: "90A",
    type: "فنادق",
    efficiency: 95.5,
    rating: 4.8,
    reviewCount: 36,
    stock: 10,
    brandId: 3,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن مخصصة للفنادق والمنتجعات.",
    features: ["للفنادق", "تصميم فاخر", "كفاءة 95.5%", "إدارة الغرف"],
    warranty: "3 سنوات",
    delivery: "شحن سريع",
    deliveryTime: "8-12 أيام عمل",
    sku: "CP-HOTEL-60000",
    tags: ["فنادق", "فاخر"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [6, 10, 13],
    views: 68
  },
  {
    id: 19,
    name: "مضخة شحن 2.3 كيلوواط للمنازل الصغيرة",
    price: 55000,
    originalPrice: 65000,
    power: 2.3,
    voltage: "220V AC",
    current: "10A",
    type: "منزلي",
    efficiency: 90,
    rating: 4.5,
    reviewCount: 88,
    stock: 45,
    brandId: 2,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607863686762-5c3bcb0665de?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن اقتصادية للشحن البطيء في المنازل الصغيرة.",
    features: ["اقتصادي", "صامت", "حماية أساسية", "سهل التركيب"],
    warranty: "2 سنوات",
    delivery: "شحن مجاني",
    deliveryTime: "2-4 أيام عمل",
    sku: "CP-MINI-2300",
    tags: ["اقتصادي", "صغير"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [5, 9, 15],
    views: 95
  },
  {
    id: 20,
    name: "مضخة شحن 80 كيلوواط للمراكز التجارية",
    price: 520000,
    originalPrice: 620000,
    power: 80,
    voltage: "380V AC",
    current: "120A",
    type: "تجاري",
    efficiency: 96,
    rating: 4.8,
    reviewCount: 28,
    stock: 8,
    brandId: 4,
    images: [
      {
        imageUrl: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop"
      }
    ],
    description: "مضخة شحن للمراكز التجارية والمجمعات السكنية الكبيرة.",
    features: ["للمراكز", "كفاءة 96%", "تحكم رقمي", "نظام تبريد متقدم"],
    warranty: "4 سنوات",
    delivery: "شحن خاص",
    deliveryTime: "12-16 أيام عمل",
    sku: "CP-MALL-80000",
    tags: ["مراكز", "كبير"],
    specifications: {},
    videos: [],
    documents: [],
    variants: [],
    relatedProducts: [7, 12, 16],
    views: 65
  }
];

// صور حقيقية للعلامات التجارية
const mockBrands = [
  { 
    id: 1, 
    name: "Tesla Supercharger", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/320px-Tesla_Motors.svg.png",
    description: "أنظمة شحن فائقة السرعة للسيارات الكهربائية",
    established: 2003,
    products: 8,
    countries: 40,
    rating: 4.9
  },
  { 
    id: 2, 
    name: "ABB", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/ABB_logo.svg/320px-ABB_logo.svg.png",
    description: "معدات شحن كهربائية متطورة للسيارات",
    established: 1988,
    products: 12,
    countries: 100,
    rating: 4.8
  },
  { 
    id: 3, 
    name: "ChargePoint", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/ChargePoint_logo.svg/320px-ChargePoint_logo.svg.png",
    description: "شبكات شحن ذكية للسيارات الكهربائية",
    established: 2007,
    products: 10,
    countries: 80,
    rating: 4.7
  },
  { 
    id: 4, 
    name: "EVBox", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/EVBox_logo.svg/320px-EVBox_logo.svg.png",
    description: "حلول شحن متكاملة للسيارات الكهربائية",
    established: 2010,
    products: 15,
    countries: 70,
    rating: 4.7
  },
  { 
    id: 5, 
    name: "Easee", 
    logo: "https://easee.com/wp-content/uploads/2021/03/Easee_Logo_Blue.svg",
    description: "مضخات شحن ذكية ومدمجة",
    established: 2018,
    products: 6,
    countries: 30,
    rating: 4.6
  }
];

// نوع المنتج المعروض (قائمة أو تفاصيل)
type ViewMode = 'list' | 'details';

export default function CarPumps() {
  const { isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [sameBrandProducts, setSameBrandProducts] = useState<any[]>([]);
  
  // إضافة هذه الحالات الجديدة
  const [selectedTab, setSelectedTab] = useState('الوصف');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  // الحالة الجديدة: فلتر الفتحات في الأعلى
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  const [filters, setFilters] = useState({
    brandIds: [] as number[],
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    minPower: undefined as number | undefined,
    maxPower: undefined as number | undefined,
    types: [] as string[],
    sortBy: "brand" as "brand" | "price_asc" | "price_desc" | "rating" | "newest",
    searchQuery: "" as string,
  });

  const [cartCount, setCartCount] = useState(0);
  
  // بيانات الأسئلة الشائعة لمضخات السيارات الكهربائية
  const [faqs] = useState([
    {
      question: "ما هي مدة الضمان على مضخة الشحن؟",
      answer: "يأتي المنتج بضمان أداء لمدة 3 سنوات للمضخات المنزلية، و5 سنوات للمضخات التجارية والصناعية. يشمل الضمان تعويض عن أي عيوب تصنيعية."
    },
    {
      question: "هل يمكن تركيب مضخة الشحن بنفسي؟",
      answer: "نعم، يمكن تركيب معظم المضخات المنزلية بنفسك باستخدام الدليل المرفق. ننصح بالاستعانة بفني مختص للمضخات التجارية والثلاثية الطور."
    },
    {
      question: "ما هي فترة الشحن المتوقعة؟",
      answer: "فترة الشحن تتراوح بين 2-5 أيام عمل للمضخات الصغيرة والمتوسطة، و7-28 يوم للمضخات الكبيرة والصناعية. الشحن مجاني للطلبات فوق 1000 ريال."
    },
    {
      question: "هل يوجد دعم فني للتركيب؟",
      answer: "نعم، نوفر دعم فني مجاني عبر الهاتف للتركيب الأولي. للمضخات الكبيرة، يمكن حجز موعد مع فريق التركيب المحترف لدينا."
    },
    {
      question: "ما هي كفاءة مضخة الشحن؟",
      answer: "كفاءة المضخات تتراوح بين 90-97% حسب النوع. المضخات المنزلية تصل كفاءتها إلى 92%، بينما المضخات التجارية تصل إلى 97%."
    },
    {
      question: "هل تحتاج مضخة الشحن إلى صيانة دورية؟",
      answer: "نعم، تحتاج المضخات إلى فحص دوري للتوصيلات والمراوح كل 6-12 شهر حسب نوع الاستخدام والبيئة المحيطة."
    },
    {
      question: "ما هي مدة العمر الافتراضي لمضخة الشحن؟",
      answer: "العمر الافتراضي يتراوح بين 10-15 سنة حسب نوع المضخة وطريقة الاستخدام. المضخات عالية الجودة تعيش حتى 15 سنة مع الاستخدام المناسب."
    },
    {
      question: "هل المضخة مقاومة للعوامل الجوية؟",
      answer: "نعم، جميع مضخاتنا مصممة للعمل في مدى حراري واسع (-20°C إلى +50°C) وتأتي بدرجة حماية IP54 للاستخدام الخارجي."
    }
  ]);

  // تجميع المنتجات حسب الشركة
  const productsByBrand = useMemo(() => {
    const brandMap: Record<number, any[]> = {};
    
    mockProducts.forEach(product => {
      if (!brandMap[product.brandId]) {
        brandMap[product.brandId] = [];
      }
      brandMap[product.brandId].push(product);
    });
    
    // ترتيب المنتجات داخل كل شركة حسب القدرة (من الأعلى للأقل)
    Object.keys(brandMap).forEach(brandId => {
      brandMap[parseInt(brandId)].sort((a, b) => b.power - a.power);
    });
    
    return brandMap;
  }, []);

  // الحصول على قائمة الشركات التي لديها منتجات (مرتبة حسب عدد المنتجات)
  const brandsWithProducts = useMemo(() => {
    return mockBrands
      .filter(brand => productsByBrand[brand.id]?.length > 0)
      .sort((a, b) => (productsByBrand[b.id]?.length || 0) - (productsByBrand[a.id]?.length || 0));
  }, [productsByBrand]);

  // تحديث عدد العناصر في السلة
  useEffect(() => {
    const updateCartCount = () => {
      const count = localCart.getItemCount();
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);
    
    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  // عرض تفاصيل المنتج
  const showProductDetails = (product: any) => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants?.[0] || null);
    setQuantity(1);
    setSelectedImage(0);
    setSelectedTab('الوصف');
    setReviewRating(0);
    setReviewComment('');
    setNewQuestion('');
    setOpenFaqs([]);
    setActiveVideo(null);
    setViewMode('details');
    
    // تحميل المنتجات المقترحة
    const related = product.relatedProducts
      ?.map((id: number) => mockProducts.find(p => p.id === id))
      .filter(Boolean) || [];
    setRelatedProducts(related);
    
    // تحميل منتجات من نفس الشركة
    const sameBrand = mockProducts
      .filter(p => p.brandId === product.brandId && p.id !== product.id)
      .slice(0, 6);
    setSameBrandProducts(sameBrand);
  };

  // العودة للقائمة
  const backToList = () => {
    setViewMode('list');
    setSelectedProduct(null);
  };

  // استخدام البيانات الوهمية بدلاً من API
  const allProducts = useMemo(() => {
    let filteredProducts = [...mockProducts];

    // فلترة حسب البحث
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // فلترة حسب العلامة التجارية
    if (filters.brandIds.length > 0) {
      filteredProducts = filteredProducts.filter(
        product => filters.brandIds.includes(product.brandId)
      );
    }

    // فلترة حسب السعر
    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.price >= filters.minPrice!
      );
    }
    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.price <= filters.maxPrice!
      );
    }

    // فلترة حسب القدرة
    if (filters.minPower !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.power >= filters.minPower!
      );
    }
    if (filters.maxPower !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.power <= filters.maxPower!
      );
    }

    // فلترة حسب النوع
    if (filters.types.length > 0) {
      filteredProducts = filteredProducts.filter(
        product => filters.types.includes(product.type)
      );
    }

    // الترتيب
    switch (filters.sortBy) {
      case "price_asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      case "brand":
      default:
        // الترتيب حسب العلامة التجارية أولاً، ثم حسب القدرة (من الأعلى للأقل)
        filteredProducts.sort((a, b) => {
          if (a.brandId !== b.brandId) {
            return a.brandId - b.brandId;
          }
          return b.power - a.power;
        });
        break;
    }

    return filteredProducts;
  }, [filters]);

  // دالة إضافة للسلة للجميع
  const handleAddToCart = (product: any, variant?: any, qty = quantity) => {
    const productToAdd = variant || product;
    const finalPrice = variant ? variant.price : product.price;
    const productName = variant ? `${product.name} (${variant.power} kW)` : product.name;
    
    if (!isAuthenticated) {
      // إضافة للسلة المحلية للزوار
      localCart.addItem(product.id, qty, variant?.id);
      
      // إظهار إشعار
      toast.success("تمت الإضافة إلى السلة", {
        description: `تم إضافة ${productName} إلى سلة التسوق`,
        action: {
          label: "عرض السلة",
          onClick: () => (window.location.href = '/cart')
        },
      });
    } else {
      // للمستخدمين المسجلين
      toast.success(`تمت إضافة المنتج إلى السلة`);
      console.log(`Adding product ${product.id} to cart with quantity ${qty}`);
    }
    
    // تحديث عدد السلة
    setCartCount(prev => prev + qty);
  };

  const toggleBrand = (brandId: number) => {
    setFilters((prev) => ({
      ...prev,
      brandIds: prev.brandIds.includes(brandId)
        ? prev.brandIds.filter((id) => id !== brandId)
        : [...prev.brandIds, brandId],
    }));
  };

  const toggleType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const clearFilters = () => {
    setFilters({
      brandIds: [],
      minPrice: undefined,
      maxPrice: undefined,
      minPower: undefined,
      maxPower: undefined,
      types: [],
      sortBy: "brand",
      searchQuery: "",
    });
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery ||
      filters.brandIds.length > 0 ||
      filters.minPrice !== undefined ||
      filters.maxPrice !== undefined ||
      filters.minPower !== undefined ||
      filters.maxPower !== undefined ||
      filters.types.length > 0
    );
  }, [filters]);

  // مشاركة المنتج
  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProduct.name,
        text: selectedProduct.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ رابط المنتج");
    }
  };

  // تحميل ملف PDF
  const downloadPDF = (document: any) => {
    toast.success(`جاري تحميل ${document.name}`, {
      description: "سيبدأ التحميل تلقائياً خلال لحظات",
      duration: 3000,
    });
  };

  // تحميل الكتالوج
  const downloadCatalog = () => {
    toast.success("جاري تحميل الكتالوج", {
      description: "سيتم تحميل ملف PDF يحتوي على جميع تفاصيل المنتج",
      duration: 3000,
    });
  };

  // زيادة/تقليل الكمية
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // تبديل فتح/إغلاق السؤال
  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // إرسال تقييم
  const submitReview = () => {
    if (reviewRating === 0) {
      toast.error("الرجاء اختيار تقييم");
      return;
    }
    toast.success("شكراً لتقييمك!", {
      description: "تم إرسال تقييمك بنجاح",
    });
    setReviewRating(0);
    setReviewComment('');
  };

  // إرسال سؤال
  const submitQuestion = () => {
    if (!newQuestion.trim()) {
      toast.error("الرجاء كتابة سؤالك");
      return;
    }
    toast.success("تم إرسال سؤالك", {
      description: "سيتم الرد عليك في أقرب وقت",
    });
    setNewQuestion('');
  };

  // حساب السعر بناءً على الكمية
  const calculateBulkPrice = (product: any, qty: number) => {
    if (!product.bulkPricing) return product.price * qty;
    
    const pricing = product.bulkPricing.find((p: any) => 
      qty >= p.minQty && qty <= p.maxQty
    ) || product.bulkPricing[0];
    
    return pricing.price * qty;
  };

  // ==============================================
  // مكونات Carousel محسنة مع التمرير التلقائي
  // ==============================================

  // مكون Carousel قابل لإعادة الاستخدام مع التمرير التلقائي
  const BrandCarousel = ({ brand, brandProducts }: { brand: any, brandProducts: any[] }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

    const checkScroll = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const scrollCarousel = (direction: 'left' | 'right') => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const cardWidth = container.querySelector('.product-card')?.clientWidth || 320;
        const scrollAmount = cardWidth + 24;
        
        container.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });

        setTimeout(checkScroll, 300);
      }
    };

    // بدء التمرير التلقائي
    const startAutoScroll = () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
      autoScrollInterval.current = setInterval(() => {
        if (carouselRef.current) {
          const container = carouselRef.current;
          const { scrollLeft, scrollWidth, clientWidth } = container;
          
          // إذا وصلنا إلى النهاية، نعود إلى البداية
          if (scrollLeft >= scrollWidth - clientWidth - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollCarousel('right');
          }
        }
      }, 3000); // التمرير كل 3 ثوان
    };

    // إيقاف التمرير التلقائي عند التمرير يدويًا
    const pauseAutoScroll = () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
        autoScrollInterval.current = null;
      }
    };

    // استئناف التمرير التلقائي
    const resumeAutoScroll = () => {
      if (!autoScrollInterval.current) {
        startAutoScroll();
      }
    };

    useEffect(() => {
      checkScroll();
      startAutoScroll();
      window.addEventListener('resize', checkScroll);
      
      return () => {
        if (autoScrollInterval.current) {
          clearInterval(autoScrollInterval.current);
        }
        window.removeEventListener('resize', checkScroll);
      };
    }, []);

    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white p-2 rounded-xl shadow-md">
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{brand.name}</h2>
              <p className="text-muted-foreground">{brand.description}</p>
            </div>
          </div>
          <Link href={`/brands/${brand.id}`}>
            <Button variant="outline" className="gap-2">
              عرض الكل
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div 
          className="relative"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
        >
          {/* أزرار التمرير */}
          {showLeftArrow && (
            <button
              onClick={() => {
                pauseAutoScroll();
                scrollCarousel('left');
                setTimeout(resumeAutoScroll, 4000);
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
          
          {showRightArrow && (
            <button
              onClick={() => {
                pauseAutoScroll();
                scrollCarousel('right');
                setTimeout(resumeAutoScroll, 4000);
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* المنتجات */}
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-1"
            style={{ scrollBehavior: 'smooth' }}
            onScroll={checkScroll}
          >
            {brandProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-80">
                <ProductCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onClick={() => showProductDetails(product)}
                  isLoading={false}
                  brand={brand}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ==============================================
  // الفلتر في الأعلى
  // ==============================================
  const FilterButton = () => (
    <Button
      variant="outline"
      className="gap-2"
      onClick={() => setShowFilterModal(true)}
    >
      <Filter className="w-4 h-4" />
      الفلاتر
      {hasActiveFilters && (
        <span className="w-2 h-2 bg-primary rounded-full"></span>
      )}
    </Button>
  );

  const FilterModal = () => (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Filter className="w-6 h-6" />
              الفلاتر والترتيب
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilterModal(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              className="w-full gap-2 mb-6"
              onClick={clearFilters}
            >
              <X className="w-4 h-4" />
              مسح جميع الفلاتر
            </Button>
          )}

          <div className="space-y-6">
            {/* الترتيب */}
            <div>
              <h3 className="font-bold text-lg mb-3">ترتيب المنتجات</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "brand", label: "حسب العلامة التجارية", icon: <Tag className="w-4 h-4" /> },
                  { value: "newest", label: "الأحدث أولاً", icon: <Sparkles className="w-4 h-4" /> },
                  { value: "rating", label: "الأعلى تقييماً", icon: <Star className="w-4 h-4" /> },
                  { value: "price_desc", label: "السعر: من الأعلى للأقل", icon: <TrendingUp className="w-4 h-4" /> },
                  { value: "price_asc", label: "السعر: من الأقل للأعلى", icon: <TrendingDown className="w-4 h-4" /> }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFilters(prev => ({ ...prev, sortBy: option.value as any }))}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                      filters.sortBy === option.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {option.icon}
                    <span className="text-sm font-medium text-center">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* العلامات التجارية */}
            <div>
              <h3 className="font-bold text-lg mb-3">العلامات التجارية</h3>
              <div className="grid grid-cols-2 gap-3">
                {mockBrands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => toggleBrand(brand.id)}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      filters.brandIds.includes(brand.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white border border-border overflow-hidden flex items-center justify-center">
                      <img 
                        src={brand.logo} 
                        alt={brand.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium flex-1 text-right">{brand.name}</span>
                    {filters.brandIds.includes(brand.id) && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* نوع مضخة الشحن */}
            <div>
              <h3 className="font-bold text-lg mb-3">نوع المضخة</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "شحن سريع", label: "شحن سريع", icon: <Zap className="w-4 h-4" /> },
                  { value: "منزلي", label: "منزلي", icon: <Home className="w-4 h-4" /> },
                  { value: "عام", label: "عام", icon: <Building2 className="w-4 h-4" /> },
                  { value: "متنقل", label: "متنقل", icon: <Navigation className="w-4 h-4" /> },
                  { value: "ثلاثي الطور", label: "ثلاثي الطور", icon: <Power className="w-4 h-4" /> },
                  { value: "شحن فائق", label: "شحن فائق", icon: <Bolt className="w-4 h-4" /> },
                  { value: "ذكي", label: "ذكي", icon: <Cpu className="w-4 h-4" /> },
                  { value: "تجاري", label: "تجاري", icon: <Building className="w-4 h-4" /> }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => toggleType(type.value)}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      filters.types.includes(type.value)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {type.icon}
                    <span className="text-sm font-medium flex-1 text-right">{type.label}</span>
                    {filters.types.includes(type.value) && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* القدرة */}
            <div>
              <h3 className="font-bold text-lg mb-3">القدرة (كيلوواط)</h3>
              <div className="grid grid-cols-3 gap-3">
                {[3, 7, 11, 22, 43, 50, 80, 120, 150].map((power) => (
                  <button
                    key={power}
                    onClick={() => {
                      if (filters.minPower === power - 10 && filters.maxPower === power) {
                        setFilters(prev => ({ ...prev, minPower: undefined, maxPower: undefined }));
                      } else {
                        setFilters(prev => ({ 
                          ...prev, 
                          minPower: power > 10 ? power - 10 : 0, 
                          maxPower: power 
                        }));
                      }
                    }}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      filters.minPower === (power > 10 ? power - 10 : 0) && filters.maxPower === power
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="text-sm font-medium">{power} ك.و</span>
                  </button>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">الحد الأدنى</label>
                  <input
                    type="number"
                    value={filters.minPower || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minPower: e.target.value ? parseFloat(e.target.value) : undefined,
                      }))
                    }
                    placeholder="0"
                    className="w-full p-3 border border-border rounded-lg bg-background text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">الحد الأعلى</label>
                  <input
                    type="number"
                    value={filters.maxPower || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxPower: e.target.value ? parseFloat(e.target.value) : undefined,
                      }))
                    }
                    placeholder="350"
                    className="w-full p-3 border border-border rounded-lg bg-background text-sm"
                  />
                </div>
              </div>
            </div>

            {/* السعر */}
            <div>
              <h3 className="font-bold text-lg mb-3">السعر (ر.س)</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">الحد الأدنى</label>
                  <input
                    type="number"
                    value={filters.minPrice ? filters.minPrice / 100 : ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: e.target.value ? parseInt(e.target.value) * 100 : undefined,
                      }))
                    }
                    placeholder="0"
                    className="w-full p-3 border border-border rounded-lg bg-background text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">الحد الأعلى</label>
                  <input
                    type="number"
                    value={filters.maxPrice ? filters.maxPrice / 100 : ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxPrice: e.target.value ? parseInt(e.target.value) * 100 : undefined,
                      }))
                    }
                    placeholder="2000000"
                    className="w-full p-3 border border-border rounded-lg bg-background text-sm"
                  />
                </div>
              </div>
            </div>

            {/* أزرار التطبيق */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowFilterModal(false)}
              >
                إلغاء
              </Button>
              <Button
                className="flex-1"
                onClick={() => setShowFilterModal(false)}
              >
                تطبيق الفلاتر
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // وصف المنتج المنظم
  const getProductDescription = (product: any) => {
    return {
      mainDescription: `مضخة شحن ${product.type} عالية الجودة من صنع شركة ${mockBrands.find(b => b.id === product.brandId)?.name}. تتميز هذه المضخة بقدرة ${product.power} كيلوواط وكفاءة ${product.efficiency}% مما يجعله من أفضل الخيارات في السوق لشحن السيارات الكهربائية.`,
      
      features: [
        `مضخة شحن ${product.type} عالية الكفاءة`,
        `قدرة ${product.power} كيلوواط`,
        `كفاءة ${product.efficiency}%`,
        `جهد ${product.voltage}`,
        `تيار ${product.current}`,
        "نظام حماية متكامل"
      ],
      
      usageAreas: [
        "المنازل السكنية",
        "المراكز التجارية",
        "الفنادق والمنتجعات",
        "المواقف العامة",
        "المستشفيات والمطارات",
        "محطات الوقود والطرق السريعة"
      ],
      
      investmentBenefits: [
        "توفير يصل إلى 70% من تكلفة الشحن",
        "عائد استثماري خلال 2-4 سنوات",
        "زيادة قيمة العقار",
        "جذب العملاء في المشاريع التجارية",
        "مساهمة في حماية البيئة"
      ]
    };
  };

  // عرض صفحة تفاصيل المنتج
  if (viewMode === 'details' && selectedProduct) {
    const brand = mockBrands.find(b => b.id === selectedProduct.brandId);
    const displayProduct = selectedVariant || selectedProduct;
    const basePrice = displayProduct.price / 100;
    const totalPrice = calculateBulkPrice(displayProduct, quantity) / 100;
    const originalPriceInSAR = selectedProduct.originalPrice ? (selectedProduct.originalPrice / 100).toFixed(0) : null;
    const discountPercentage = originalPriceInSAR ? Math.round((1 - basePrice / parseInt(originalPriceInSAR)) * 100) : 0;
    const description = getProductDescription(selectedProduct);

    // تحسين التبويبات للجوال
    const tabs = ['الوصف', 'المواصفات', 'التقييمات', 'الأسئلة الشائعة', 'الفيديوهات', 'المستندات', 'الذكاء الاصطناعي', 'الملحقات', 'التركيب', 'الصيانة'];

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Header cartCount={cartCount} />
        
        {/* Breadcrumb */}
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={backToList} className="text-primary hover:underline">
              مضخات السيارات الكهربائية
            </button>
            <ChevronLeft className="w-4 h-4" />
            {brand && (
              <>
                <button onClick={backToList} className="text-primary hover:underline">
                  {brand.name}
                </button>
                <ChevronLeft className="w-4 h-4" />
              </>
            )}
            <span className="text-muted-foreground truncate">{selectedProduct.name}</span>
          </div>
        </div>

        <div className="container py-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* الصور */}
            <div>
              {/* الصورة الرئيسية */}
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl mb-4">
                <img
                  src={selectedProduct.images[selectedImage]?.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-[400px] object-contain"
                />
                
                {/* علامات */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {selectedProduct.tags?.map((tag: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-primary text-white text-xs rounded-full font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* خصم */}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-sm"></div>
                      <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        خصم {discountPercentage}%
                      </div>
                    </div>
                  </div>
                )}
                
                {/* زر القلب */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute bottom-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>

                {/* زر التكبير */}
                <button
                  onClick={() => toast.info("تم تفعيل وضع التكبير")}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Maximize2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* الصور المصغرة */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {selectedProduct.images?.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={`${selectedProduct.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* التفاصيل */}
            <div>
              {/* العنوان والتقييم */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-3">
                  <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={shareProduct}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="مشاركة"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="حفظ"
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{selectedProduct.rating}</span>
                    <span className="text-muted-foreground">({selectedProduct.reviewCount} تقييم)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{selectedProduct.views} مشاهدة</span>
                  </div>
                  <div className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    {selectedProduct.sku}
                  </div>
                </div>
              </div>

              {/* العلامة التجارية */}
              {brand && (
                <div className="flex items-center gap-3 mb-6 p-4 bg-muted/30 rounded-xl">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <div className="font-bold">{brand.name}</div>
                    <div className="text-sm text-muted-foreground">{brand.description}</div>
                  </div>
                  <Link href={`/brands/${brand.id}`}>
                    <Button variant="outline" size="sm">
                      جميع المنتجات
                    </Button>
                  </Link>
                </div>
              )}

              {/* المتغيرات */}
              {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">اختر القدرة:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedProduct.variants.map((variant: any) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          selectedVariant?.id === variant.id
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-bold text-xl mb-1">{variant.power} ك.و</div>
                        <div className="text-sm">{(variant.price / 100).toFixed(0)} ر.س</div>
                        <div className="text-xs text-green-600 mt-1">كفاءة {variant.efficiency}%</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* السعر والكمية */}
              <div className="mb-6 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-bold">{totalPrice.toLocaleString()} ر.س</span>
                      {originalPriceInSAR && (
                        <span className="text-xl text-muted-foreground line-through">{originalPriceInSAR} ر.س</span>
                      )}
                    </div>
                    {originalPriceInSAR && (
                      <div className="text-green-600 font-bold mt-2">
                        وفرت {((parseInt(originalPriceInSAR) * quantity - totalPrice).toLocaleString())} ر.س
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground mt-1">
                      {quantity} × {basePrice.toFixed(0)} ر.س للقطعة الواحدة
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">المخزون:</div>
                    <div className={`text-lg font-bold ${
                      selectedProduct.stock > 20 ? 'text-green-600' : 
                      selectedProduct.stock > 5 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {selectedProduct.stock > 0 ? `${selectedProduct.stock} قطعة متوفرة` : 'نفذت الكمية'}
                    </div>
                  </div>
                </div>

                {/* كمية المنتجات الإضافية */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">الكمية:</span>
                    <span className="text-sm text-muted-foreground">
                      {quantity >= 3 ? `خصم ${selectedProduct.bulkPricing?.find((p: any) => quantity >= p.minQty && quantity <= p.maxQty)?.discount || 0}%` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={decreaseQuantity}
                        className="w-10 h-10 flex items-center justify-center hover:bg-muted"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                      <button
                        onClick={increaseQuantity}
                        className="w-10 h-10 flex items-center justify-center hover:bg-muted"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <Button
                      size="lg"
                      className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl"
                      onClick={() => handleAddToCart(selectedProduct, selectedVariant, quantity)}
                      disabled={selectedProduct.stock === 0}
                    >
                      <ShoppingCart className="w-5 h-5 ml-2" />
                      {selectedProduct.stock === 0 ? 'نفذت الكمية' : `أضف ${quantity} إلى السلة`}
                    </Button>
                  </div>
                </div>
              </div>

              {/* جدول الأسعار بالجملة */}
              {selectedProduct.bulkPricing && (
                <div className="mb-6 p-4 border border-border rounded-xl">
                  <h3 className="font-bold mb-3">أسعار الجملة:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {selectedProduct.bulkPricing.map((pricing: any, idx: number) => (
                      <div key={idx} className={`p-3 rounded-lg text-center ${
                        quantity >= pricing.minQty && quantity <= pricing.maxQty
                          ? 'bg-primary/10 border-2 border-primary'
                          : 'bg-muted/30'
                      }`}>
                        <div className="font-bold">{pricing.minQty}+</div>
                        <div className="text-sm">{(pricing.price / 100).toFixed(0)} ر.س</div>
                        {pricing.discount > 0 && (
                          <div className="text-xs text-green-600 mt-1">خصم {pricing.discount}%</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* المميزات السريعة */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                  <Truck className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-bold">{selectedProduct.delivery}</div>
                    <div className="text-sm text-muted-foreground">{selectedProduct.deliveryTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-bold">ضمان {selectedProduct.warranty}</div>
                    <div className="text-sm text-muted-foreground">على الأداء والمكونات</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                  <Package className="w-6 h-6 text-purple-600" />
                  <div>
                    <div className="font-bold">سهولة التركيب</div>
                    <div className="text-sm text-muted-foreground">دليل تركيب مفصل</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                  <div>
                    <div className="font-bold">توفير الوقت</div>
                    <div className="text-sm text-muted-foreground">شحن سريع يصل إلى 80%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* علامات التبويب التفاعلية - محسنة للجوال */}
          <div className="sticky top-0 z-10 bg-card border-b border-border mt-8">
            <div className="flex overflow-x-auto scrollbar-hide py-2">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  className="px-4 py-3 font-medium whitespace-nowrap hover:text-primary transition-colors border-b-2 data-[active=true]:border-primary data-[active=true]:text-primary text-sm md:text-base"
                  data-active={selectedTab === tab}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* محتوى علامات التبويب */}
          <div className="mt-12">
            
            {/* قسم الوصف */}
            {selectedTab === 'الوصف' && (
              <div className="space-y-8">
                {/* الوصف الرئيسي */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    وصف المنتج
                  </h2>
                  
                  {/* الوصف المنسق */}
                  <div className="space-y-8">
                    {/* الوصف الرئيسي */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                      <p className="text-lg leading-relaxed text-gray-800">
                        {description.mainDescription}
                      </p>
                    </div>

                    {/* المميزات الرئيسية */}
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Sparkles className="w-6 h-6" />
                        المميزات الرئيسية
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {description.features.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-xl">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-medium text-gray-800">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* مجالات الاستخدام */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Users className="w-6 h-6" />
                        مجالات الاستخدام
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {description.usageAreas.map((area: string, idx: number) => (
                          <div key={idx} className="text-center p-6 bg-white border border-blue-200 rounded-xl hover:border-blue-400 transition-colors">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                              <Droplet className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-800">{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* فوائد الاستثمار */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6" />
                        فوائد الاستثمار
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {description.investmentBenefits.map((benefit: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-green-200">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              {idx === 0 && <span className="font-bold text-green-700">٪٧٠</span>}
                              {idx === 1 && <span className="font-bold text-green-700">٢-٤</span>}
                              {idx === 2 && <Building className="w-5 h-5 text-green-600" />}
                              {idx === 3 && <Users className="w-5 h-5 text-green-600" />}
                              {idx === 4 && <Globe className="w-5 h-5 text-green-600" />}
                            </div>
                            <div>
                              <span className="font-medium text-gray-800">{benefit}</span>
                              <div className="text-sm text-gray-600 mt-1">
                                {idx === 0 && "مقارنة بتكلفة الشحن التقليدي"}
                                {idx === 1 && "سنوات لاسترداد رأس المال المستثمر"}
                                {idx === 2 && "زيادة قيمة العقار بوجود محطة شحن"}
                                {idx === 3 && "جذب العملاء في المشاريع التجارية"}
                                {idx === 4 && "تقليل البصمة الكربونية"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم المواصفات */}
            {selectedTab === 'المواصفات' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6" />
                    المواصفات الفنية
                  </h2>
                  
                  {/* جدول المواصفات */}
                  <div className="overflow-hidden rounded-xl border border-border mb-8">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(selectedProduct.specifications || {}).map(([key, value], idx) => (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-muted/30' : ''}>
                            <td className="p-4 font-medium border-r border-border w-1/3">{key}</td>
                            <td className="p-4">{value as string}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* معلومات إضافية */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 border border-border rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Award className="w-6 h-6 text-primary" />
                        <h4 className="font-bold">الشهادات والاعتمادات</h4>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          CE Certification
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          IEC 61851
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          TUV Certification
                        </li>
                      </ul>
                    </div>

                    <div className="p-6 border border-border rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-6 h-6 text-primary" />
                        <h4 className="font-bold">الضمان</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-muted-foreground">ضمان المنتج</div>
                          <div className="font-bold text-lg">{selectedProduct.warranty}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">الكفاءة</div>
                          <div className="font-bold text-lg">{selectedProduct.efficiency}%</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border border-border rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Package className="w-6 h-6 text-primary" />
                        <h4 className="font-bold">التعبئة والتغليف</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>الوزن:</span>
                          <span className="font-medium">35 كجم</span>
                        </div>
                        <div className="flex justify-between">
                          <span>الأبعاد:</span>
                          <span className="font-medium">50×40×25 سم</span>
                        </div>
                        <div className="flex justify-between">
                          <span>الكمية في الكرتون:</span>
                          <span className="font-medium">1 قطعة</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم التقييمات */}
            {selectedTab === 'التقييمات' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Star className="w-6 h-6" />
                    تقييمات العملاء
                  </h2>

                  {/* ملخص التقييمات */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* متوسط التقييم */}
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold mb-2">{selectedProduct.rating}</div>
                        <div className="flex justify-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-8 h-8 ${i < Math.floor(selectedProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <div className="text-muted-foreground">
                          بناءً على {selectedProduct.reviewCount} تقييم
                        </div>
                      </div>
                    </div>

                    {/* توزيع التقييمات */}
                    <div className="space-y-4">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-16">
                            <span className="w-6 text-center font-bold">{stars}</span>
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          </div>
                          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400 rounded-full"
                              style={{ width: `${(stars / 5) * 100}%` }}
                            />
                          </div>
                          <span className="w-16 text-sm text-muted-foreground text-left">
                            {Math.round((stars / 5) * selectedProduct.reviewCount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* قائمة التقييمات */}
                  <div className="space-y-6 mb-8">
                    {[
                      {
                        name: "أحمد محمد",
                        rating: 5,
                        date: "قبل 3 أيام",
                        comment: "مضخة ممتازة وسريعة الشحن، أنصح بها بشدة. التركيب كان سهل جداً والأداء رائع",
                        verified: true,
                        helpful: 24
                      },
                      {
                        name: "فاطمة علي",
                        rating: 4,
                        date: "قبل أسبوع",
                        comment: "جيدة جداً ولكن السعر مرتفع قليلاً. الكفاءة ممتازة خاصة في الشحن السريع",
                        verified: true,
                        helpful: 18
                      },
                      {
                        name: "خالد سعود",
                        rating: 5,
                        date: "قبل شهر",
                        comment: "الكفاءة أعلى من المتوقع، والتركيب سهل. وفرت في وقت الشحن أكثر من 70%",
                        verified: false,
                        helpful: 12
                      }
                    ].map((review, idx) => (
                      <div key={idx} className="p-6 border border-border rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold">{review.name}</span>
                              {review.verified && (
                                <BadgeCheck className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{review.helpful}</span>
                            </button>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4">{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  {/* نموذج إضافة تقييم */}
                  <div className="p-6 border border-border rounded-xl">
                    <h3 className="font-bold text-lg mb-4">أضف تقييمك</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">التقييم</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              className="text-3xl hover:scale-110 transition-transform"
                              onClick={() => setReviewRating(star)}
                            >
                              {star <= reviewRating ? '⭐' : '☆'}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">التعليق</label>
                        <textarea 
                          className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          rows={4}
                          placeholder="شاركنا تجربتك مع المنتج..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                        />
                      </div>
                      <Button className="gap-2" onClick={submitReview}>
                        <Star className="w-4 h-4" />
                        إرسال التقييم
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم الأسئلة الشائعة */}
            {selectedTab === 'الأسئلة الشائعة' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6" />
                    الأسئلة الشائعة
                  </h2>

                  <div className="space-y-4 mb-8">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-border rounded-xl overflow-hidden">
                        <button
                          className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
                          onClick={() => toggleFaq(idx)}
                        >
                          <span className="font-medium text-right flex-1">{faq.question}</span>
                          <ChevronDown className={`w-5 h-5 transition-transform ${openFaqs.includes(idx) ? 'rotate-180' : ''}`} />
                        </button>
                        {openFaqs.includes(idx) && (
                          <div className="p-6 pt-0 animate-in fade-in">
                            <p className="text-muted-foreground">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* سؤال جديد */}
                  <div className="p-6 border border-border rounded-xl">
                    <h3 className="font-bold text-lg mb-4">اطرح سؤالك</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">سؤالك</label>
                        <textarea 
                          className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          rows={3}
                          placeholder="اكتب سؤالك هنا..."
                          value={newQuestion}
                          onChange={(e) => setNewQuestion(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" className="gap-2" onClick={submitQuestion}>
                        <MessageCircle className="w-4 h-4" />
                        إرسال السؤال
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم الفيديوهات */}
            {selectedTab === 'الفيديوهات' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <PlayCircle className="w-6 h-6" />
                    الفيديوهات التوضيحية
                  </h2>

                  {/* فيديو رئيسي */}
                  {selectedProduct.videos && selectedProduct.videos.length > 0 && (
                    <div className="mb-8">
                      <div className="relative rounded-xl overflow-hidden bg-black mb-4">
                        <div className="aspect-video flex items-center justify-center">
                          <button 
                            className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                            onClick={() => toast.info("جاري تشغيل الفيديو")}
                          >
                            <PlayCircle className="w-10 h-10 text-primary" />
                          </button>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{selectedProduct.videos[0]?.title}</h3>
                      <p className="text-muted-foreground">شاهد كيف تعمل هذه المضخة ومميزاتها الفريدة</p>
                    </div>
                  )}

                  {/* قائمة الفيديوهات */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedProduct.videos?.map((video: any, idx: number) => (
                      <div key={idx} className="group">
                        <div className="relative rounded-xl overflow-hidden mb-3">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                              onClick={() => setActiveVideo(idx)}
                            >
                              <PlayCircle className="w-6 h-6 text-primary" />
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <div className="flex items-center gap-2 text-white">
                              <Youtube className="w-4 h-4" />
                              <span className="text-sm">{video.title}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* قسم المستندات */}
            {selectedTab === 'المستندات' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Download className="w-6 h-6" />
                    المستندات والكتالوجات
                  </h2>

                  {/* زر تحميل الكتالوج كـ PDF */}
                  <div className="mb-8">
                    <Button
                      className="gap-3 px-6 py-4 h-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary w-full md:w-auto"
                      onClick={downloadCatalog}
                    >
                      <DownloadCloud className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-bold">تحميل الكتالوج الكامل (PDF)</div>
                        <div className="text-sm opacity-90">يشمل جميع المواصفات والتفاصيل - 4.2 MB</div>
                      </div>
                    </Button>
                  </div>

                  {/* قائمة المستندات */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {selectedProduct.documents?.map((doc: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary transition-colors group cursor-pointer"
                        onClick={() => downloadPDF(doc)}
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {doc.icon ? <doc.icon className="w-6 h-6 text-primary" /> : <FileText className="w-6 h-6 text-primary" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold truncate">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">{doc.size}</div>
                        </div>
                        <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    ))}
                  </div>

                  {/* معلومات إضافية */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 border border-border rounded-xl">
                      <h4 className="font-bold mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-primary" />
                        دليل التركيب والصيانة
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          دليل التركيب خطوة بخطوة
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          نصائح الصيانة الدورية
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          استكشاف الأخطاء وإصلاحها
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          نصائح لزيادة العمر الافتراضي
                        </li>
                      </ul>
                    </div>
                    <div className="p-6 border border-border rounded-xl">
                      <h4 className="font-bold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        الشهادات والمواصفات
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          شهادات الجودة الدولية
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          تقارير الاختبار المعتمدة
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          بيانات الأداء الفعلية
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          شهادات السلامة الكهربائية
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم الذكاء الاصطناعي */}
            {selectedTab === 'الذكاء الاصطناعي' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Brain className="w-6 h-6 text-purple-600" />
                    اقتراحات وتوصيات ذكية
                  </h2>
                  
                  <div className="mb-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Brain className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">محلل الشحن الذكي</h3>
                        <p className="text-muted-foreground">تحليل ذكي بناءً على احتياجاتك واستخدامك</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* اقتراحات ذكية */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold mb-4">اقتراحات ذكية لك</h3>
                      {selectedProduct.aiSuggestions?.map((suggestion: any) => (
                        <div key={suggestion.id} className="p-6 border border-border rounded-xl hover:border-primary transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-lg mb-1">{suggestion.title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-primary text-xl">{(suggestion.price / 100).toLocaleString()} ر.س</div>
                              {suggestion.savings > 0 && (
                                <div className="text-sm text-green-600">توفير {(suggestion.savings / 100).toLocaleString()} ر.س</div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                              <Lightbulb className="w-4 h-4 text-yellow-500" />
                              <span className="text-muted-foreground">{suggestion.reason}</span>
                            </div>
                            <Button size="sm" variant="outline">
                              <GitCompare className="w-4 h-4 ml-2" />
                              مقارنة
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* تحليل الأداء */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold mb-4">تحليل الأداء المتوقع</h3>
                      
                      <div className="p-6 border border-border rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold">تحليل الشحن</h4>
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold text-primary">ممتاز</span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">الكفاءة المتوقعة</span>
                              <span className="font-bold">{selectedProduct.efficiency}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full w-4/5"></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">وقت الشحن التقريبي</span>
                              <span className="font-bold">1-4 ساعات</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full w-3/4"></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">فترة الاسترداد</span>
                              <span className="font-bold">2.5 سنة</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500 rounded-full w-2/3"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* توصيات */}
                      <div className="p-6 border border-border rounded-xl">
                        <h4 className="font-bold mb-4">توصيات مخصصة</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <Target className="w-5 h-5 text-green-600" />
                            <div>
                              <div className="font-medium">أضف ألواح شمسية</div>
                              <div className="text-sm text-muted-foreground">شحن مجاني بالطاقة الشمسية</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <BarChart className="w-5 h-5 text-blue-600" />
                            <div>
                              <div className="font-medium">نظام مراقبة ذكي</div>
                              <div className="text-sm text-muted-foreground">مراقبة الاستهلاك والأداء</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <ThermometerSun className="w-5 h-5 text-orange-600" />
                            <div>
                              <div className="font-medium">نظام تبريد إضافي</div>
                              <div className="text-sm text-muted-foreground">للأداء الأمثل في الصيف</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* محاكاة الأداء */}
                  <div className="p-6 border border-border rounded-2xl">
                    <h3 className="text-xl font-bold mb-6">محاكاة الشحن السنوي</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { month: "يناير", efficiency: "85%", time: "1.5h" },
                        { month: "فبراير", efficiency: "88%", time: "1.4h" },
                        { month: "مارس", efficiency: "92%", time: "1.2h" },
                        { month: "أبريل", efficiency: "95%", time: "1.1h" },
                        { month: "مايو", efficiency: "98%", time: "1.0h" },
                        { month: "يونيو", efficiency: "100%", time: "0.9h" },
                        { month: "يوليو", efficiency: "99%", time: "1.0h" },
                        { month: "أغسطس", efficiency: "96%", time: "1.1h" },
                        { month: "سبتمبر", efficiency: "94%", time: "1.2h" },
                        { month: "أكتوبر", efficiency: "90%", time: "1.3h" },
                        { month: "نوفمبر", efficiency: "87%", time: "1.4h" },
                        { month: "ديسمبر", efficiency: "83%", time: "1.6h" }
                      ].map((data, idx) => (
                        <div key={idx} className="text-center p-3 border border-border rounded-lg">
                          <div className="font-bold text-sm mb-1">{data.month}</div>
                          <div className="text-lg font-bold text-primary">{data.efficiency}</div>
                          <div className="text-xs text-muted-foreground">كفاءة</div>
                          <div className="text-xs text-green-600 mt-1">شحن {data.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم الملحقات */}
            {selectedTab === 'الملحقات' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <PackageOpen className="w-6 h-6 text-blue-600" />
                    ملحقات إضافية للمنتج
                  </h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {selectedProduct.accessories?.map((accessory: any) => (
                      <div key={accessory.id} className="border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={accessory.image} 
                            alt={accessory.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold mb-2">{accessory.name}</h4>
                          <p className="text-sm text-muted-foreground mb-4">{accessory.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-lg">{(accessory.price / 100).toFixed(0)} ر.س</span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                toast.success(`تمت إضافة ${accessory.name} إلى السلة`);
                              }}
                            >
                              أضف للسلة
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* حزم الملحقات */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">حزم الملحقات الموصى بها</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        {
                          name: "حزمة التركيب الأساسية",
                          price: 8500,
                          includes: ["قاعدة تثبيت", "كابلات شحن", "وصلات"],
                          discount: 10
                        },
                        {
                          name: "حزمة التركيب المتكاملة",
                          price: 18500,
                          includes: ["قاعدة تثبيت", "كابلات", "وصلات", "شاشة مراقبة"],
                          discount: 15
                        },
                        {
                          name: "حزمة التركيب الذهبية",
                          price: 32500,
                          includes: ["كل الملحقات", "نظام تبريد", "نظام مراقبة ذكي", "حماية إضافية"],
                          discount: 20
                        }
                      ].map((bundle, idx) => (
                        <div key={idx} className="border border-border rounded-xl p-4 hover:border-primary transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold">{bundle.name}</h4>
                            {bundle.discount > 0 && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                خصم {bundle.discount}%
                              </span>
                            )}
                          </div>
                          <ul className="space-y-2 mb-4">
                            {bundle.includes.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-600" />
                                {item}
                              </li>
                            ))}
                          </ul>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-lg">{(bundle.price / 100).toLocaleString()} ر.س</span>
                            <Button size="sm">أضف للسلة</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* أدوات إضافية */}
                  <div className="p-6 border border-border rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">أدوات ومعدات إضافية</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: "مقياس الفولتية", price: 450, icon: <BarChart2 className="w-6 h-6" /> },
                        { name: "شاشة مراقبة", price: 3200, icon: <Monitor className="w-6 h-6" /> },
                        { name: "حساس حرارة", price: 520, icon: <Thermometer className="w-6 h-6" /> },
                        { name: "عداد الطاقة", price: 1250, icon: <Zap className="w-6 h-6" /> }
                      ].map((tool, idx) => (
                        <div key={idx} className="text-center p-4 border border-border rounded-lg hover:border-primary transition-colors">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                            <div className="text-primary">{tool.icon}</div>
                          </div>
                          <div className="font-bold mb-1">{tool.name}</div>
                          <div className="font-bold text-primary">{(tool.price / 100).toFixed(0)} ر.س</div>
                          <Button size="sm" variant="outline" className="w-full mt-2">أضف</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم التركيب */}
            {selectedTab === 'التركيب' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-green-600" />
                    دليل التركيب
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                      <div className="p-6 border border-border rounded-2xl">
                        <h3 className="text-xl font-bold mb-4">متطلبات التركيب</h3>
                        <ul className="space-y-3">
                          {selectedProduct.installation?.requirements?.map((req: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-6 border border-border rounded-2xl">
                        <h3 className="text-xl font-bold mb-4">الوقت المتوقع</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span>تركيب مضخة واحدة</span>
                            <span className="font-bold">2-4 ساعات</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>محطة متكاملة (4 مضخات)</span>
                            <span className="font-bold">{selectedProduct.installation?.time || "1-2 أيام"}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>مستوى الصعوبة</span>
                            <span className="font-bold">{selectedProduct.installation?.difficulty || "متوسط"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="p-6 border border-border rounded-2xl">
                        <h3 className="text-xl font-bold mb-4">خطوات التركيب</h3>
                        <div className="space-y-4">
                          {selectedProduct.installation?.steps?.map((step: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="font-bold text-primary">{idx + 1}</span>
                              </div>
                              <div className="flex-1">
                                <span className="font-medium">{step}</span>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {idx === 0 && "تأكد من مكان مناسب وآمن"}
                                  {idx === 1 && "استخدم القاعدة المخصصة"}
                                  {idx === 2 && "اتبع تعليمات السلامة الكهربائية"}
                                  {idx === 3 && "اختبر النظام قبل التشغيل الكامل"}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-6 border border-border rounded-2xl">
                        <h3 className="text-xl font-bold mb-4">خدمات التركيب المتاحة</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div>
                              <div className="font-medium">التركيب الأساسي</div>
                              <div className="text-sm text-muted-foreground">تركيب وتوصيل أساسي</div>
                            </div>
                            <span className="font-bold">1,200 ر.س</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div>
                              <div className="font-medium">التركيب المتكامل</div>
                              <div className="text-sm text-muted-foreground">تركيب مع ضمان وصيانة</div>
                            </div>
                            <span className="font-bold">2,500 ر.س</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div>
                              <div className="font-medium">الصيانة السنوية</div>
                              <div className="text-sm text-muted-foreground">4 زيارات صيانة سنوية</div>
                            </div>
                            <span className="font-bold">800 ر.س/سنة</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* أدوات التركيب */}
                  <div className="p-6 border border-border rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">أدوات التركيب المطلوبة</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: "مفتاح ربط", essential: true },
                        { name: "مثقاب كهربائي", essential: true },
                        { name: "مقياس متعدد", essential: true },
                        { name: "كماشة", essential: true },
                        { name: "عازل كهربائي", essential: true },
                        { name: "قفازات", essential: true },
                        { name: "نظارة واقية", essential: true },
                        { name: "مستوى ليزر", essential: false }
                      ].map((tool, idx) => (
                        <div key={idx} className={`p-3 rounded-lg border ${tool.essential ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                          <div className="font-medium mb-1">{tool.name}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${tool.essential ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {tool.essential ? 'ضروري' : 'اختياري'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* قسم الصيانة */}
            {selectedTab === 'الصيانة' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Wrench className="w-6 h-6 text-orange-600" />
                    برنامج الصيانة
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                      <div className="p-6 border border-border rounded-2xl">
                        <h3 className="text-xl font-bold mb-4">صيانة دورية</h3>
                        <div className="space-y-4">
                          {selectedProduct.maintenanceSchedule?.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-primary" />
                                <span className="font-medium">{item.frequency}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{item.task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-6 border border-border rounded-2xl">
                        <h3 className="text-xl font-bold mb-4">نصائح الصيانة</h3>
                        <ul className="space-y-3">
                          {selectedProduct.maintenanceTips?.map((tip: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                              <div>
                                <span>{tip}</span>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {idx === 0 && "الحفاظ على نظافة المضخة"}
                                  {idx === 1 && "مراقبة أداء المراوح والتوصيلات"}
                                  {idx === 2 && "فحص الكابلات بانتظام"}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="p-6 border border-border rounded-2xl">
                        <h3 className="text-xl font-bold mb-4">خدمات الصيانة</h3>
                        <div className="space-y-4">
                          {[
                            {
                              name: "باقة الصيانة الأساسية",
                              price: "800 ر.س/سنة",
                              features: ["4 زيارات فحص", "تنظيف المراوح", "تقرير أداء"],
                              popular: false
                            },
                            {
                              name: "باقة الصيانة المتكاملة",
                              price: "1,500 ر.س/سنة",
                              features: ["8 زيارات فحص", "تنظيف شامل", "تقرير مفصل", "معايرة النظام"],
                              popular: true
                            },
                            {
                              name: "باقة الصيانة الذهبية",
                              price: "3,000 ر.س/سنة",
                              features: ["زيارات غير محدودة", "مراقبة عن بعد", "استبدال قطع الغيار", "دعم فني 24/7"],
                              popular: false
                            }
                          ].map((plan, idx) => (
                            <div key={idx} className={`p-4 border rounded-xl hover:border-primary transition-colors ${plan.popular ? 'border-primary border-2' : 'border-border'}`}>
                              {plan.popular && (
                                <div className="inline-block px-3 py-1 bg-primary text-white text-xs rounded-full mb-3">
                                  الأكثر طلباً
                                </div>
                              )}
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold">{plan.name}</h4>
                                <span className="font-bold text-primary">{plan.price}</span>
                              </div>
                              <ul className="space-y-2 mb-4">
                                {plan.features.map((feature, fIdx) => (
                                  <li key={fIdx} className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-green-600" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <Button className="w-full" size="sm" variant={plan.popular ? "default" : "outline"}>
                                اشترك الآن
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* جدول الصيانة */}
                  <div className="p-6 border border-border rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">جدول الصيانة التفصيلي</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/30">
                            <th className="p-3 text-right">النشاط</th>
                            <th className="p-3 text-center">التكرار</th>
                            <th className="p-3 text-center">المدة</th>
                            <th className="p-3 text-center">التكلفة</th>
                            <th className="p-3 text-center">الأهمية</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { activity: "فحص المراوح", frequency: "شهرياً", duration: "15 دقيقة", cost: "مجاني", importance: "منخفض" },
                            { activity: "تنظيف الوصلات", frequency: "كل 3 أشهر", duration: "30 دقيقة", cost: "150 ر.س", importance: "متوسط" },
                            { activity: "معايرة النظام", frequency: "كل 6 أشهر", duration: "1 ساعة", cost: "300 ر.س", importance: "عالي" },
                            { activity: "فحص الكفاءة", frequency: "سنوياً", duration: "2-3 ساعات", cost: "500 ر.س", importance: "عالي" },
                            { activity: "صيانة المكونات", frequency: "كل سنتين", duration: "3-4 ساعات", cost: "800 ر.س", importance: "متوسط" }
                          ].map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-muted/20'}>
                              <td className="p-3 font-medium">{row.activity}</td>
                              <td className="p-3 text-center">{row.frequency}</td>
                              <td className="p-3 text-center">{row.duration}</td>
                              <td className="p-3 text-center">{row.cost}</td>
                              <td className="p-3 text-center">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  row.importance === 'عالي' ? 'bg-red-100 text-red-800' :
                                  row.importance === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {row.importance}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* منتجات من نفس الشركة */}
          {sameBrandProducts.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">منتجات أخرى من {brand?.name}</h2>
                  <p className="text-muted-foreground">اكتشف المزيد من منتجات هذه العلامة التجارية</p>
                </div>
                <Link href={`/brands/${brand?.id}`}>
                  <Button variant="outline" className="gap-2">
                    عرض الكل
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              
              {/* Carousel لمنتجات نفس الشركة */}
              <BrandCarousel brand={brand} brandProducts={sameBrandProducts} />
            </div>
          )}

          {/* منتجات قد تعجبك */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">منتجات قد تعجبك</h2>
                  <p className="text-muted-foreground">اكتشف منتجات مشابهة بناءً على اختياراتك</p>
                </div>
                <button
                  onClick={backToList}
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  عرض الكل
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              {/* Carousel للمنتجات المقترحة */}
              <BrandCarousel 
                brand={{ name: "مقترحة", logo: "https://cdn-icons-png.flaticon.com/512/929/929416.png", description: "منتجات مقترحة لك" }} 
                brandProducts={relatedProducts} 
              />
            </div>
          )}

          {/* مشاركة المنتج */}
          <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">شارك المنتج</h3>
            <div className="flex gap-3 flex-wrap">
              <button className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800">
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                onClick={shareProduct}
                className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* معلومات الشركة */}
          {brand && (
            <div className="mt-12 p-6 border border-border rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="text-xl font-bold">{brand.name}</h3>
                  <p className="text-muted-foreground">{brand.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{brand.established}</div>
                  <div className="text-sm text-muted-foreground">سنة التأسيس</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{brand.products}+</div>
                  <div className="text-sm text-muted-foreground">منتج</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{brand.countries}</div>
                  <div className="text-sm text-muted-foreground">دولة</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{brand.rating}</div>
                  <div className="text-sm text-muted-foreground">تقييم</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <FloatingCartButton count={cartCount} />
        <Footer />
      </div>
    );
  }

  // عرض قائمة المنتجات مع التنظيم حسب الشركات
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header cartCount={cartCount} />

      {/* Page Header مع الفلتر */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-6 border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">مضخات السيارات الكهربائية</h1>
              <p className="text-muted-foreground">
                اكتشف أفضل مضخات الشحن للسيارات الكهربائية بجودة عالمية وسرعة فائقة
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:flex-initial">
                <input
                  type="text"
                  placeholder="ابحث عن مضخة شحن..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full pr-10 pl-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              
              {/* Filter Button */}
              <FilterButton />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Bar */}
      {hasActiveFilters && (
        <div className="bg-card border-b border-border">
          <div className="container py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">الفلاتر المطبقة:</span>
                <div className="flex flex-wrap gap-2">
                  {filters.searchQuery && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                      <span>بحث: "{filters.searchQuery}"</span>
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, searchQuery: "" }))}
                        className="hover:bg-primary/20 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  {filters.brandIds.map(brandId => (
                    <div key={brandId} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                      <span>{mockBrands?.find(b => b.id === brandId)?.name}</span>
                      <button
                        onClick={() => toggleBrand(brandId)}
                        className="hover:bg-primary/20 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {filters.types.map(type => (
                    <div key={type} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                      <span>نوع: {type}</span>
                      <button
                        onClick={() => toggleType(type)}
                        className="hover:bg-primary/20 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {(filters.minPower || filters.maxPower) && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                      <span>قدرة: {filters.minPower || 0}-{filters.maxPower || '∞'} ك.و</span>
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, minPower: undefined, maxPower: undefined }))}
                        className="hover:bg-primary/20 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground"
                onClick={clearFilters}
              >
                <X className="w-4 h-4" />
                مسح الكل
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && <FilterModal />}

      <div className="container py-8">
        {/* عرض المنتجات حسب الشركات فقط - تم إزالة قسم جميع المنتجات */}
        <div className="mb-12">
          {filters.brandIds.length > 0 ? (
            // عرض الشركات المختارة فقط
            <div className="space-y-12">
              {brandsWithProducts
                .filter(brand => filters.brandIds.includes(brand.id))
                .map((brand) => (
                  <BrandCarousel 
                    key={brand.id} 
                    brand={brand} 
                    brandProducts={productsByBrand[brand.id] || []} 
                  />
                ))}
            </div>
          ) : (
            // عرض جميع الشركات مرتبة حسب عدد المنتجات
            <div className="space-y-12">
              {brandsWithProducts.map((brand) => (
                <BrandCarousel 
                  key={brand.id} 
                  brand={brand} 
                  brandProducts={productsByBrand[brand.id] || []} 
                />
              ))}
            </div>
          )}
        </div>

        {allProducts?.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
              <Droplet className="w-12 h-12 text-muted-foreground/50" />
            </div>
            <h3 className="text-2xl font-bold mb-2">لا توجد مضخات شحن</h3>
            <p className="text-muted-foreground mb-6">لم نعثر على مضخات شحن تطابق معايير البحث</p>
            <Button
              variant="outline"
              className="gap-2"
              onClick={clearFilters}
            >
              <X className="w-4 h-4" />
              مسح جميع الفلاتر
            </Button>
          </div>
        )}
      </div>

      {/* زر السلة العائم */}
      <FloatingCartButton count={cartCount} />

      {/* استيراد الفوتر */}
      <Footer />
    </div>
  );
}

// مكون ProductCard المحسن لمضخات السيارات الكهربائية
function ProductCard({
  product,
  onAddToCart,
  onClick,
  isLoading,
  brand,
}: {
  product: any;
  onAddToCart: () => void;
  onClick: () => void;
  isLoading: boolean;
  brand?: any;
}) {
  const priceInSAR = (product.price / 100).toFixed(0);
  const originalPriceInSAR = product.originalPrice ? (product.originalPrice / 100).toFixed(0) : null;

  return (
    <div 
      className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/30 cursor-pointer h-full flex flex-col product-card"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        {product.images && product.images[0] && (
          <img
            src={product.images[0].imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        
        {/* Brand Logo */}
        {brand?.logo && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <img 
              src={brand.logo} 
              alt={brand.name}
              className="w-16 h-6 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'w-16 h-6 bg-muted flex items-center justify-center rounded';
                fallbackDiv.innerHTML = `<span class="text-xs font-bold">${brand.name}</span>`;
                e.target.parentNode?.appendChild(fallbackDiv);
              }}
            />
          </div>
        )}

        {/* Discount Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-4 right-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-sm"></div>
              <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
              </div>
            </div>
          </div>
        )}

        {/* Stock Indicator */}
        <div className="absolute bottom-4 left-4">
          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm flex items-center gap-1 ${
            product.stock > 20 
              ? "bg-green-500/20 text-green-700" 
              : product.stock > 5 
              ? "bg-yellow-500/20 text-yellow-700"
              : "bg-red-500/20 text-red-700"
          }`}>
            {product.stock > 20 ? (
              <>
                <BadgeCheck className="w-3 h-3" />
                متوفر
              </>
            ) : product.stock > 5 ? (
              <>
                <ClockIcon className="w-3 h-3" />
                آخر قطع
              </>
            ) : (
              <>
                <ClockIcon className="w-3 h-3" />
                تقريباً نفذ
              </>
            )}
          </div>
        </div>

        {/* Views */}
        <div className="absolute bottom-4 right-4">
          <div className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {product.views}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Type & Brand */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
            {product.type === 'شحن سريع' ? <Zap className="w-3 h-3" /> : 
             product.type === 'منزلي' ? <Home className="w-3 h-3" /> :
             product.type === 'متنقل' ? <Navigation className="w-3 h-3" /> :
             product.type === 'شحن فائق' ? <Bolt className="w-3 h-3" /> :
             <Droplet className="w-3 h-3" />}
            {product.type}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Features */}
        <div className="mb-4 flex-1">
          <div className="flex flex-wrap gap-2">
            {product.features?.slice(0, 2).map((feature: string, idx: number) => (
              <span key={idx} className="text-xs px-2.5 py-1.5 rounded-lg bg-muted/50 text-muted-foreground flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {feature}
              </span>
            ))}
            {product.features?.length > 2 && (
              <span className="text-xs px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary">
                +{product.features.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-center p-2 bg-muted/30 rounded-lg">
            <div className="text-xs text-muted-foreground">القدرة</div>
            <div className="font-bold">{product.power} ك.و</div>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-lg">
            <div className="text-xs text-muted-foreground">الكفاءة</div>
            <div className="font-bold">{product.efficiency}%</div>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {priceInSAR} ر.س
                </span>
                {originalPriceInSAR && (
                  <span className="text-sm text-muted-foreground line-through">{originalPriceInSAR} ر.س</span>
                )}
              </div>
              {originalPriceInSAR && (
                <div className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  وفرت {((parseInt(originalPriceInSAR) - parseInt(priceInSAR)).toLocaleString())} ر.س
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
            <Button 
              variant="outline" 
              className="flex-1 gap-2 hover:border-primary hover:text-primary transition-all group/details"
              onClick={onClick}
            >
              <span>التفاصيل</span>
              <ArrowRight className="w-4 h-4 group-hover/details:translate-x-1 transition-transform" />
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 group/add"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              disabled={isLoading || product.stock === 0}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  جاري...
                </div>
              ) : product.stock === 0 ? (
                "غير متوفر"
              ) : (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 group-hover/add:scale-110 transition-transform" />
                  أضف للسلة
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingCartButton({ count }: { count: number }) {
  return (
    <Link href="/cart">
      <div className="fixed bottom-6 left-6 z-50 group">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary/90 shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          {count > 0 && (
            <>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                {count > 9 ? '9+' : count}
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full animate-ping opacity-75"></div>
            </>
          )}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-card text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            عرض السلة ({count} منتج)
          </div>
        </div>
      </div>
    </Link>
  );
}