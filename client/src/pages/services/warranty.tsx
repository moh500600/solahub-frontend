import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  X, 
  Check, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  User,
  Package,
  Settings,
  Wrench,
  Truck,
  Headphones,
  Award,
  Star,
  ChevronRight,
  ChevronDown,
  Upload,
  Image,
  Video,
  Trash2,
  Printer,
  Share2,
  Bell,
  ShieldCheck,
  ShieldOff,
  ShieldAlert,
  RefreshCw,
  Archive,
  BarChart,
  TrendingUp,
  Percent,
  DollarSign,
  Users,
  Target,
  Zap,
  Battery,
  PanelTop,
  Cpu,
  Cloud,
  Smartphone,
  FileCheck,
  FileSearch,
  FileClock,
  FileShield,
  FileArchive,
  QrCode,
  Scan,
  Key,
  Lock,
  Unlock,
  LifeBuoy,
  HelpCircle,
  Info,
  ExternalLink,
  BookOpen,
  Bookmark,
  Heart,
  ThumbsUp,
  BadgeCheck
} from 'lucide-react';


const WarrantyServices = () => {
  const [activeTab, setActiveTab] = useState('claims');
  const [claims, setClaims] = useState([]);
  const [warrantyProducts, setWarrantyProducts] = useState([]);
  const [newClaim, setNewClaim] = useState({
    type: 'repair',
    productId: '',
    issue: '',
    description: '',
    files: [],
    priority: 'medium',
    contactMethod: ['phone', 'whatsapp'],
    address: '',
    preferredDate: '',
    preferredTime: 'morning'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewClaimForm, setShowNewClaimForm] = useState(false);
  const [claimSteps, setClaimSteps] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // أنواع المطالبات
  const claimTypes = [
    { id: 'repair', name: 'إصلاح', icon: <Wrench className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500' },
    { id: 'replacement', name: 'استبدال', icon: <RefreshCw className="w-5 h-5" />, color: 'from-green-500 to-emerald-500' },
    { id: 'inspection', name: 'فحص', icon: <Search className="w-5 h-5" />, color: 'from-purple-500 to-pink-500' },
    { id: 'maintenance', name: 'صيانة', icon: <Settings className="w-5 h-5" />, color: 'from-yellow-500 to-amber-500' },
    { id: 'technical-support', name: 'دعم فني', icon: <Headphones className="w-5 h-5" />, color: 'from-orange-500 to-red-500' }
  ];

  // حالات المطالبات
  const statuses = [
    { id: 'pending', name: 'قيد المراجعة', color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-4 h-4" /> },
    { id: 'approved', name: 'مقبول', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'in-progress', name: 'قيد التنفيذ', color: 'bg-blue-100 text-blue-800', icon: <Settings className="w-4 h-4" /> },
    { id: 'completed', name: 'مكتمل', color: 'bg-purple-100 text-purple-800', icon: <Check className="w-4 h-4" /> },
    { id: 'rejected', name: 'مرفوض', color: 'bg-red-100 text-red-800', icon: <X className="w-4 h-4" /> }
  ];

  // المنتجات تحت الضمان
  const productsUnderWarranty = [
    {
      id: 'PROD001',
      name: 'لوح شمسي 550 واط',
      category: 'solar-panel',
      purchaseDate: '2023-06-15',
      warrantyEnd: '2048-06-15',
      warrantyType: 'premium',
      status: 'active',
      serialNumber: 'SN550-2023-12345'
    },
    {
      id: 'PROD002',
      name: 'بطارية ليثيوم 5 كيلووات',
      category: 'battery',
      purchaseDate: '2023-08-20',
      warrantyEnd: '2033-08-20',
      warrantyType: 'extended',
      status: 'active',
      serialNumber: 'BAT5K-2023-67890'
    },
    {
      id: 'PROD003',
      name: 'عاكس كهربائي 3000 واط',
      category: 'inverter',
      purchaseDate: '2023-10-05',
      warrantyEnd: '2028-10-05',
      warrantyType: 'standard',
      status: 'active',
      serialNumber: 'INV3K-2023-54321'
    }
  ];

  // محاكاة بيانات المطالبات
  useEffect(() => {
    const mockClaims = [
      {
        id: 'CLAIM2024001',
        productName: 'لوح شمسي 550 واط',
        productId: 'PROD001',
        type: 'repair',
        date: '2024-01-15',
        status: 'completed',
        priority: 'high',
        description: 'انخفاض في إنتاج الطاقة',
        estimatedCompletion: '2024-01-20',
        assignedTo: 'فريق الصيانة أ',
        cost: '0 ر.س',
        notes: 'تم استبدال لوحة التوصيلات'
      },
      {
        id: 'CLAIM2024002',
        productName: 'بطارية ليثيوم 5 كيلووات',
        productId: 'PROD002',
        type: 'inspection',
        date: '2024-02-10',
        status: 'in-progress',
        priority: 'medium',
        description: 'فحص أداء البطارية',
        estimatedCompletion: '2024-02-15',
        assignedTo: 'مهندس الجودة',
        cost: '0 ر.س',
        notes: 'قيد الفحص المخبري'
      },
      {
        id: 'CLAIM2024003',
        productName: 'عاكس كهربائي 3000 واط',
        productId: 'PROD003',
        type: 'technical-support',
        date: '2024-02-05',
        status: 'approved',
        priority: 'low',
        description: 'مشكلة في برمجية النظام',
        estimatedCompletion: '2024-02-12',
        assignedTo: 'الدعم الفني',
        cost: '0 ر.س',
        notes: 'في انتظار تحديد موعد'
      }
    ];
    setClaims(mockClaims);
    setWarrantyProducts(productsUnderWarranty);
  }, []);

  // معالجة تقديم مطالبة جديدة
  const handleSubmitClaim = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال البيانات
    setTimeout(() => {
      const newClaimObj = {
        id: `CLAIM${new Date().getFullYear()}${String(claims.length + 1).padStart(3, '0')}`,
        productName: warrantyProducts.find(p => p.id === newClaim.productId)?.name || 'منتج',
        productId: newClaim.productId,
        type: newClaim.type,
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        priority: newClaim.priority,
        description: newClaim.description,
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        assignedTo: 'قيد التخصيص',
        cost: '0 ر.س',
        notes: 'تم استلام المطالبة'
      };
      
      setClaims([newClaimObj, ...claims]);
      setNewClaim({
        type: 'repair',
        productId: '',
        issue: '',
        description: '',
        files: [],
        priority: 'medium',
        contactMethod: ['phone', 'whatsapp'],
        address: '',
        preferredDate: '',
        preferredTime: 'morning'
      });
      setUploadedFiles([]);
      setShowNewClaimForm(false);
      setClaimSteps(1);
      setIsSubmitting(false);
    }, 2000);
  };

  // معالجة رفع الملفات
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      type: file.type.startsWith('image/') ? 'image' : 
            file.type.startsWith('video/') ? 'video' : 'document',
      url: URL.createObjectURL(file)
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  // حذف ملف مرفوع
  const handleRemoveFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
  };

  // البحث والتصفية
  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || claim.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // الحصول على حالة المطالبة
  const getStatusInfo = (status) => {
    return statuses.find(s => s.id === status) || statuses[0];
  };

  // الحصول على نوع المطالبة
  const getClaimTypeInfo = (type) => {
    return claimTypes.find(t => t.id === type) || claimTypes[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* شريط التنقل */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'claims', name: 'مطالباتي', icon: <FileText className="w-5 h-5" /> },
                { id: 'products', name: 'منتجاتي', icon: <Package className="w-5 h-5" /> },
                { id: 'new-claim', name: 'مطالبة جديدة', icon: <PlusCircle className="w-5 h-5" /> },
                { id: 'warranty-info', name: 'معلومات الضمان', icon: <ShieldCheck className="w-5 h-5" /> },
                { id: 'support', name: 'الدعم', icon: <Headphones className="w-5 h-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === 'new-claim') {
                      setShowNewClaimForm(true);
                    }
                  }}
                  className={`relative flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md'
                  }`}
                >
                  {tab.icon}
                  <span className="font-semibold text-sm lg:text-base whitespace-nowrap">
                    {tab.name}
                  </span>
                  
                  {activeTab === tab.id && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rotate-45"></div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                {activeTab === 'claims' && `${claims.length} مطالبة`}
                {activeTab === 'products' && `${warrantyProducts.length} منتج`}
                {activeTab === 'new-claim' && 'مطالبة جديدة'}
                {activeTab === 'warranty-info' && 'معلومات الضمان'}
                {activeTab === 'support' && 'مركز الدعم'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* قسم مطالباتي */}
        {activeTab === 'claims' && (
          <div className="space-y-8">
            {/* رأس الصفحة */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-sm font-bold mb-6 shadow-lg border border-blue-200">
                <Shield className="w-5 h-5" />
                إدارة مطالبات الضمان
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                مطالبات الضمان الخاصة بي
              </h1>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                تابع حالة مطالباتك، اطلع على التفاصيل، وتواصل مع فريق الدعم
              </p>
            </div>

            {/* أدوات البحث والتصفية */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">مطالبات الضمان</h2>
                  <p className="text-gray-600 mt-1">إجمالي {claims.length} مطالبة</p>
                </div>
                
                <div className="flex gap-4">
                  <div className="relative flex-1 md:flex-none md:w-64">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="ابحث برقم المطالبة أو اسم المنتج..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                  </div>
                  
                  <button
                    onClick={() => setShowNewClaimForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <PlusCircle className="w-5 h-5" />
                    مطالبة جديدة
                  </button>
                </div>
              </div>

              {/* مرشحات الحالة */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  الكل
                </button>
                {statuses.map((status) => (
                  <button
                    key={status.id}
                    onClick={() => setFilterStatus(status.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      filterStatus === status.id
                        ? `${status.color}`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.icon}
                    {status.name}
                  </button>
                ))}
              </div>

              {/* قائمة المطالبات */}
              <div className="space-y-4">
                {filteredClaims.map((claim) => (
                  <div
                    key={claim.id}
                    className="bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusInfo(claim.status).color}`}>
                            {getStatusInfo(claim.status).icon}
                            {getStatusInfo(claim.status).name}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            claim.priority === 'high' ? 'bg-red-100 text-red-800' :
                            claim.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {claim.priority === 'high' ? 'عالي' : claim.priority === 'medium' ? 'متوسط' : 'منخفض'}
                          </span>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{claim.productName}</h3>
                            <span className="text-sm text-gray-500">#{claim.id}</span>
                          </div>
                          <p className="text-gray-600">{claim.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">التاريخ</div>
                            <div className="font-medium">{claim.date}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">نوع الخدمة</div>
                            <div className="font-medium">{getClaimTypeInfo(claim.type).name}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">التكلفة</div>
                            <div className="font-medium text-green-600">{claim.cost}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">التقدير</div>
                            <div className="font-medium">{claim.estimatedCompletion}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setSelectedClaim(claim)}
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          عرض التفاصيل
                        </button>
                        <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          تحميل التقرير
                        </button>
                        <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          تواصل مع الدعم
                        </button>
                      </div>
                    </div>
                    
                    {claim.notes && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                          <Info className="w-4 h-4" />
                          <span className="text-sm font-medium">ملاحظات:</span>
                        </div>
                        <p className="text-gray-600 text-sm">{claim.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
                
                {filteredClaims.length === 0 && (
                  <div className="text-center py-12">
                    <FileSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-600 mb-2">لا توجد مطالبات</h3>
                    <p className="text-gray-500 mb-6">لم تقم بتقديم أي مطالبات بعد</p>
                    <button
                      onClick={() => setShowNewClaimForm(true)}
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                    >
                      <PlusCircle className="w-5 h-5" />
                      تقديم أول مطالبة
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* قسم منتجاتي */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            {/* رأس الصفحة */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-sm font-bold mb-6 shadow-lg border border-green-200">
                <Package className="w-5 h-5" />
                المنتجات تحت الضمان
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                منتجاتي تحت الضمان
              </h1>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                جميع منتجاتك المسجلة في نظام الضمان ومواعيد انتهاء صلاحية الضمان
              </p>
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{warrantyProducts.length}</div>
                    <div className="text-sm text-gray-600">إجمالي المنتجات</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {warrantyProducts.filter(p => p.status === 'active').length}
                    </div>
                    <div className="text-sm text-gray-600">منتجات نشطة</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-600">ضمانات تنتهي قريباً</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{claims.length}</div>
                    <div className="text-sm text-gray-600">مطالبات سابقة</div>
                  </div>
                </div>
              </div>
            </div>

            {/* قائمة المنتجات */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">المنتجات المسجلة</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {warrantyProducts.map((product) => {
                  const daysRemaining = Math.ceil((new Date(product.warrantyEnd) - new Date()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={product.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                              {product.category === 'solar-panel' && <PanelTop className="w-8 h-8 text-blue-600" />}
                              {product.category === 'battery' && <Battery className="w-8 h-8 text-green-600" />}
                              {product.category === 'inverter' && <Zap className="w-8 h-8 text-yellow-600" />}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  product.status === 'active' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {product.status === 'active' ? 'نشط' : 'منتهي'}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <div className="text-gray-500">الرقم التسلسلي</div>
                                  <div className="font-medium font-mono">{product.serialNumber}</div>
                                </div>
                                <div>
                                  <div className="text-gray-500">تاريخ الشراء</div>
                                  <div className="font-medium">{product.purchaseDate}</div>
                                </div>
                                <div>
                                  <div className="text-gray-500">ينتهي الضمان</div>
                                  <div className={`font-medium ${daysRemaining < 30 ? 'text-red-600' : 'text-gray-900'}`}>
                                    {product.warrantyEnd}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-500">المتبقي</div>
                                  <div className={`font-bold ${daysRemaining < 30 ? 'text-red-600' : 'text-green-600'}`}>
                                    {daysRemaining > 0 ? `${daysRemaining} يوم` : 'منتهي'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {daysRemaining < 90 && daysRemaining > 0 && (
                            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                              <div className="flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-yellow-800">ضمان ينتهي قريباً</div>
                                  <div className="text-sm text-yellow-600">
                                    ينتهي ضمان هذا المنتج خلال {daysRemaining} يوم. يمكنك تجديد الضمان الآن.
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            شهادة الضمان
                          </button>
                          <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors flex items-center gap-2">
                            <RefreshCw className="w-4 h-4" />
                            تجديد الضمان
                          </button>
                          <button 
                            onClick={() => {
                              setShowNewClaimForm(true);
                              setNewClaim(prev => ({ ...prev, productId: product.id }));
                            }}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center gap-2"
                          >
                            <AlertCircle className="w-4 h-4" />
                            إبلاغ عن مشكلة
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* نموذج مطالبة جديدة */}
        {showNewClaimForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">تقديم مطالبة ضمان جديدة</h2>
                  <p className="text-gray-600 mt-1">املأ النموذج لتقديم مطالبة جديدة</p>
                </div>
                <button
                  onClick={() => {
                    setShowNewClaimForm(false);
                    setClaimSteps(1);
                    setUploadedFiles([]);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleSubmitClaim} className="p-6">
                {/* شريط الخطوات */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          claimSteps === step 
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg' 
                            : claimSteps > step 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {claimSteps > step ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <span className="font-bold">{step}</span>
                          )}
                        </div>
                        <span className={`text-sm font-medium ${
                          claimSteps === step ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {step === 1 && 'المنتج'}
                          {step === 2 && 'المشكلة'}
                          {step === 3 && 'التفاصيل'}
                          {step === 4 && 'التأكيد'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="relative h-2 bg-gray-200 rounded-full">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${((claimSteps - 1) / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* الخطوة 1: اختيار المنتج */}
                {claimSteps === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">اختر المنتج</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {warrantyProducts.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => setNewClaim({ ...newClaim, productId: product.id })}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-right ${
                            newClaim.productId === product.id
                              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                              {product.category === 'solar-panel' && <PanelTop className="w-6 h-6 text-blue-600" />}
                              {product.category === 'battery' && <Battery className="w-6 h-6 text-green-600" />}
                              {product.category === 'inverter' && <Zap className="w-6 h-6 text-yellow-600" />}
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-lg">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.serialNumber}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">تاريخ الشراء:</span>
                              <span className="font-medium">{product.purchaseDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">ينتهي الضمان:</span>
                              <span className="font-medium text-green-600">{product.warrantyEnd}</span>
                            </div>
                          </div>
                          
                          {newClaim.productId === product.id && (
                            <div className="mt-4 flex items-center justify-center text-blue-600">
                              <CheckCircle className="w-5 h-5 ml-2" />
                              <span className="font-medium">محدد</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    
                    {warrantyProducts.length === 0 && (
                      <div className="text-center py-8">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h4 className="text-xl font-bold text-gray-600 mb-2">لا توجد منتجات مسجلة</h4>
                        <p className="text-gray-500 mb-6">يجب تسجيل منتج أولاً قبل تقديم مطالبة</p>
                        <button
                          type="button"
                          className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
                        >
                          تسجيل منتج جديد
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                {/* الخطوة 2: نوع المشكلة */}
                {claimSteps === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">اختر نوع المشكلة</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {claimTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setNewClaim({ ...newClaim, type: type.id })}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                            newClaim.type === type.id
                              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mx-auto mb-3`}>
                            <div className="text-white">
                              {type.icon}
                            </div>
                          </div>
                          <div className="font-bold text-lg">{type.name}</div>
                        </button>
                      ))}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        وصف المشكلة *
                      </label>
                      <textarea
                        value={newClaim.description}
                        onChange={(e) => setNewClaim({ ...newClaim, description: e.target.value })}
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
                        placeholder="صف المشكلة بتفصيل، متى بدأت، وما هي الأعراض..."
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        أولوية المشكلة
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'low', name: 'منخفض', color: 'bg-green-100 text-green-800' },
                          { id: 'medium', name: 'متوسط', color: 'bg-yellow-100 text-yellow-800' },
                          { id: 'high', name: 'عالي', color: 'bg-red-100 text-red-800' }
                        ].map((priority) => (
                          <button
                            key={priority.id}
                            type="button"
                            onClick={() => setNewClaim({ ...newClaim, priority: priority.id })}
                            className={`p-3 rounded-lg font-medium transition-all duration-300 ${priority.color} ${
                              newClaim.priority === priority.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                            }`}
                          >
                            {priority.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* الخطوة 3: التفاصيل */}
                {claimSteps === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">التفاصيل والمرفقات</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">طريقة التواصل المفضلة</label>
                        <div className="space-y-3">
                          {[
                            { id: 'phone', name: 'مكالمة هاتفية', icon: <Phone className="w-4 h-4" /> },
                            { id: 'whatsapp', name: 'واتساب', icon: <MessageSquare className="w-4 h-4" /> },
                            { id: 'email', name: 'بريد إلكتروني', icon: <Mail className="w-4 h-4" /> },
                            { id: 'visit', name: 'زيارة موقع', icon: <MapPin className="w-4 h-4" /> }
                          ].map((method) => (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => {
                                const currentMethods = [...newClaim.contactMethod];
                                if (currentMethods.includes(method.id)) {
                                  setNewClaim({ 
                                    ...newClaim, 
                                    contactMethod: currentMethods.filter(m => m !== method.id) 
                                  });
                                } else {
                                  setNewClaim({ 
                                    ...newClaim, 
                                    contactMethod: [...currentMethods, method.id] 
                                  });
                                }
                              }}
                              className={`flex items-center gap-3 w-full p-3 rounded-lg border-2 transition-all duration-300 ${
                                newClaim.contactMethod.includes(method.id)
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-blue-300'
                              }`}
                            >
                              <div className={`p-2 rounded-lg ${
                                newClaim.contactMethod.includes(method.id)
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {method.icon}
                              </div>
                              <span className="text-sm font-medium flex-1 text-right">{method.name}</span>
                              {newClaim.contactMethod.includes(method.id) && (
                                <Check className="w-4 h-4 text-blue-500" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">العنوان (إذا لزم الأمر)</label>
                          <input
                            type="text"
                            value={newClaim.address}
                            onChange={(e) => setNewClaim({ ...newClaim, address: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                            placeholder="العنوان للزيارة إذا لزم الأمر"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">التاريخ المفضل</label>
                            <input
                              type="date"
                              value={newClaim.preferredDate}
                              onChange={(e) => setNewClaim({ ...newClaim, preferredDate: e.target.value })}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">الوقت المفضل</label>
                            <select
                              value={newClaim.preferredTime}
                              onChange={(e) => setNewClaim({ ...newClaim, preferredTime: e.target.value })}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                            >
                              <option value="morning">صباحاً (8 ص - 12 م)</option>
                              <option value="afternoon">ظهراً (12 م - 4 ع)</option>
                              <option value="evening">مساءً (4 ع - 8 م)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700">
                        إرفاق صور أو فيديو (اختياري)
                      </label>
                      <div 
                        className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
                        onClick={() => document.getElementById('file-upload').click()}
                      >
                        <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                        <div className="font-medium mb-2 text-gray-700">اسحب وأفلت الملفات أو انقر للرفع</div>
                        <div className="text-sm text-gray-500">
                          يمكنك رفع صور أو فيديو للمشكلة (الحد الأقصى 50MB لكل ملف)
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          accept="image/*,video/*,.pdf,.doc,.docx"
                        />
                      </div>
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium mb-3 text-gray-700">
                          الملفات المرفوعة ({uploadedFiles.length})
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {uploadedFiles.map((file) => (
                            <div key={file.id} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                                {file.type === 'image' ? (
                                  <img 
                                    src={file.url} 
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : file.type === 'video' ? (
                                  <div className="w-full h-full flex items-center justify-center bg-blue-100">
                                    <Video className="w-12 h-12 text-blue-400" />
                                  </div>
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-purple-100">
                                    <FileText className="w-12 h-12 text-purple-400" />
                                  </div>
                                )}
                              </div>
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                <div className="space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFile(file.id)}
                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <div className="mt-2">
                                <div className="text-xs font-medium truncate">{file.name}</div>
                                <div className="text-xs text-gray-500">
                                  {file.type === 'image' ? 'صورة' : file.type === 'video' ? 'فيديو' : 'مستند'} • {file.size} MB
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* الخطوة 4: التأكيد */}
                {claimSteps === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">مراجعة المعلومات</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="text-lg font-bold mb-4 text-gray-800">تفاصيل المنتج</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">المنتج</div>
                            <div className="font-medium">
                              {warrantyProducts.find(p => p.id === newClaim.productId)?.name || 'غير محدد'}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">نوع الخدمة</div>
                            <div className="font-medium">
                              {claimTypes.find(t => t.id === newClaim.type)?.name || 'غير محدد'}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">الأولوية</div>
                            <div className="font-medium">
                              {newClaim.priority === 'high' ? 'عالي' : newClaim.priority === 'medium' ? 'متوسط' : 'منخفض'}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">الوصف</div>
                            <div className="font-medium">{newClaim.description || 'غير محدد'}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="text-lg font-bold mb-4 text-gray-800">تفاصيل الاتصال</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">طرق التواصل المفضلة</div>
                            <div className="font-medium">
                              {newClaim.contactMethod.map(method => {
                                const methods = {
                                  "phone": "مكالمة هاتفية",
                                  "whatsapp": "واتساب",
                                  "email": "بريد إلكتروني",
                                  "visit": "زيارة موقع"
                                };
                                return methods[method];
                              }).join("، ")}
                            </div>
                          </div>
                          {newClaim.address && (
                            <div>
                              <div className="text-sm text-gray-500 mb-1">العنوان</div>
                              <div className="font-medium">{newClaim.address}</div>
                            </div>
                          )}
                          {newClaim.preferredDate && (
                            <div>
                              <div className="text-sm text-gray-500 mb-1">الموعد المفضل</div>
                              <div className="font-medium">
                                {newClaim.preferredDate} - {newClaim.preferredTime === 'morning' ? 'صباحاً' : 
                                newClaim.preferredTime === 'afternoon' ? 'ظهراً' : 'مساءً'}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                        <h4 className="text-lg font-bold mb-4 text-gray-800">ملاحظات مهمة</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">سيتم التواصل معك خلال 24 ساعة عمل</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">يرجى الاحتفاظ بفاتورة الشراء الأصلية</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">لا تغطي الضمان الأعطال الناتجة عن سوء الاستخدام</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* أزرار التنقل */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  {claimSteps > 1 ? (
                    <button
                      type="button"
                      onClick={() => setClaimSteps(claimSteps - 1)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-5 h-5 rotate-180" />
                      السابق
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {claimSteps < 4 ? (
                    <button
                      type="button"
                      onClick={() => setClaimSteps(claimSteps + 1)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                      التالي
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !newClaim.productId || !newClaim.description}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          تقديم المطالبة
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* معلومات الضمان */}
        {activeTab === 'warranty-info' && (
          <div className="space-y-8">
            {/* رأس الصفحة */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 text-sm font-bold mb-6 shadow-lg border border-purple-200">
                <ShieldCheck className="w-5 h-5" />
                سياسة وشروط الضمان
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                معلومات الضمان
              </h1>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                تعرف على سياسة الضمان الكاملة، المدة، الشروط، وكيفية الاستفادة من خدمات الضمان
              </p>
            </div>

            {/* أنواع الضمان */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: 'الضمان الأساسي',
                  period: '2-5 سنوات',
                  coverage: 'عيوب التصنيع',
                  color: 'from-blue-500 to-cyan-500',
                  features: ['تغطية عيوب التصنيع', 'استبدال قطع الغيار', 'خدمة الصيانة', 'دعم فني محدود']
                },
                {
                  title: 'الضمان الممتد',
                  period: '5-10 سنوات',
                  coverage: 'شاملة محدودة',
                  color: 'from-green-500 to-emerald-500',
                  features: ['جميع مزايا الضمان الأساسي', 'تغطية أوسع للمكونات', 'صيانة وقائية', 'دعم فني متقدم'],
                  popular: true
                },
                {
                  title: 'الضمان المميز',
                  period: '10-25 سنة',
                  coverage: 'شاملة كاملة',
                  color: 'from-purple-500 to-pink-500',
                  features: ['جميع مزايا الضمان الممتد', 'تغطية شاملة كاملة', 'صيانة مجانية', 'دعم فني 24/7']
                }
              ].map((warranty, idx) => (
                <div key={idx} className={`relative bg-white rounded-2xl border-2 p-8 shadow-lg ${warranty.popular ? 'border-purple-500' : 'border-gray-200'}`}>
                  {warranty.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg">
                        ⭐ الأكثر اختياراً
                      </div>
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${warranty.color} flex items-center justify-center mx-auto mb-6`}>
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-center mb-3 text-gray-900">{warranty.title}</h3>
                  <div className="text-center mb-6">
                    <div className="text-lg font-bold text-purple-600">{warranty.period}</div>
                    <div className="text-sm text-gray-600">{warranty.coverage}</div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {warranty.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg font-semibold hover:from-black hover:to-gray-800 transition-all duration-300">
                    {warranty.popular ? 'اختر هذا الضمان' : 'تعرف أكثر'}
                  </button>
                </div>
              ))}
            </div>

            {/* شروط الضمان */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">شروط وشروط الضمان</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      ما يشمله الضمان
                    </h3>
                    <ul className="space-y-3 bg-green-50 p-6 rounded-xl">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">عيوب التصنيع والأخطاء الفنية</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">تلف المكونات الداخلية تحت ظروف التشغيل العادية</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">توقف المنتج عن العمل بشكل كامل</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">انخفاض الأداء عن المواصفات المعلنة</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-yellow-500" />
                      متطلبات الاستفادة من الضمان
                    </h3>
                    <ul className="space-y-3 bg-yellow-50 p-6 rounded-xl">
                      <li className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">فاتورة الشراء الأصلية</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">شهادة الضمان المكتملة</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Package className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">المنتج بكامل ملحقاته وأجزائه</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                      <X className="w-6 h-6 text-red-500" />
                      ما لا يشمله الضمان
                    </h3>
                    <ul className="space-y-3 bg-red-50 p-6 rounded-xl">
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">الأضرار الناتجة عن سوء الاستخدام أو الإهمال</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">التلف الناتج عن الكوارث الطبيعية أو الحوادث</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">المنتجات التي تم تعديلها أو إصلاحها خارج مراكزنا</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">البلى الطبيعي الناتج عن الاستخدام المتواصل</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                      <Clock className="w-6 h-6 text-blue-500" />
                      مدة الضمان حسب المنتج
                    </h3>
                    <ul className="space-y-3 bg-blue-50 p-6 rounded-xl">
                      <li className="flex justify-between items-center">
                        <span className="text-gray-700">الألواح الشمسية</span>
                        <span className="font-bold text-blue-600">25 سنة</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-gray-700">البطاريات</span>
                        <span className="font-bold text-blue-600">10 سنوات</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-gray-700">العواكس والمحولات</span>
                        <span className="font-bold text-blue-600">5 سنوات</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-gray-700">أنظمة المراقبة</span>
                        <span className="font-bold text-blue-600">3 سنوات</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* مركز الدعم */}
        {activeTab === 'support' && (
          <div className="space-y-8">
            {/* رأس الصفحة */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 text-sm font-bold mb-6 shadow-lg border border-orange-200">
                <Headphones className="w-5 h-5" />
                مركز الدعم والمساعدة
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                الدعم الفني والمساعدة
              </h1>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                نحن هنا لمساعدتك في أي استفسار أو مشكلة تواجهك مع منتجاتك تحت الضمان
              </p>
            </div>

            {/* قنوات الدعم */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  title: 'الدعم الهاتفي',
                  description: 'اتصل بنا على الرقم المجاني',
                  contact: '800 123 4567',
                  icon: <Phone className="w-8 h-8" />,
                  color: 'from-blue-500 to-cyan-500',
                  timing: '24/7'
                },
                {
                  title: 'الدعم التقني',
                  description: 'تواصل مع فريق الدعم الفني',
                  contact: 'support@energy-solar.com',
                  icon: <Headphones className="w-8 h-8" />,
                  color: 'from-green-500 to-emerald-500',
                  timing: '8 ص - 8 م'
                },
                {
                  title: 'الدعم الفوري',
                  description: 'محادثة مباشرة عبر الواتساب',
                  contact: '+966 50 123 4567',
                  icon: <MessageSquare className="w-8 h-8" />,
                  color: 'from-green-600 to-green-800',
                  timing: '24/7'
                },
                {
                  title: 'زيارة الموقع',
                  description: 'حجز موعد لزيارة فنية',
                  contact: 'احجز موعد الآن',
                  icon: <MapPin className="w-8 h-8" />,
                  color: 'from-purple-500 to-pink-500',
                  timing: 'أيام العمل'
                }
              ].map((channel, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${channel.color} flex items-center justify-center mx-auto mb-6`}>
                    <div className="text-white">
                      {channel.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{channel.title}</h3>
                  <p className="text-gray-600 mb-4">{channel.description}</p>
                  
                  <div className="font-bold text-lg mb-2 text-gray-900">{channel.contact}</div>
                  <div className="text-sm text-gray-500">متاح: {channel.timing}</div>
                </div>
              ))}
            </div>

            {/* الأسئلة الشائعة */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">أسئلة شائعة</h2>
              
              <div className="space-y-4">
                {[
                  {
                    question: 'كيف يمكنني تقديم مطالبة ضمان؟',
                    answer: 'يمكنك تقديم مطالبة ضمان من خلال قسم "مطالبة جديدة" في هذه الصفحة، أو عن طريق الاتصال بمركز الدعم.'
                  },
                  {
                    question: 'ما هي المدة اللازمة لمعالجة مطالبة الضمان؟',
                    answer: 'تتراوح مدة المعالجة بين 3-10 أيام عمل حسب نوع المشكلة وتوفر قطع الغيار.'
                  },
                  {
                    question: 'هل يمكنني تتبع حالة مطالبتي؟',
                    answer: 'نعم، يمكنك تتبع حالة مطالبتك في أي وقت من خلال قسم "مطالباتي" في هذه الصفحة.'
                  },
                  {
                    question: 'ماذا أفعل إذا فقدت فاتورة الشراء؟',
                    answer: 'يمكنك التواصل مع خدمة العملاء مع إرفاق أي إثبات آخر للشراء مثل رقم العملية البنكية.'
                  },
                  {
                    question: 'هل يغطي الضمان تكاليف الشحن؟',
                    answer: 'نعم، في حالة الضمان الممتد والمميز، نتحمل تكاليف الشحن لنقل المنتج للإصلاح أو الاستبدال.'
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden hover:border-orange-300 transition-colors">
                    <button className="w-full p-6 text-right flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-lg">{faq.question}</span>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 py-20 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">هل تحتاج إلى مساعدة فورية؟</h2>
            <p className="text-white/90 mb-10 text-lg leading-relaxed">
              فريق الدعم الفني لدينا متواجد على مدار الساعة لمساعدتك في حل أي مشكلة تواجهك مع منتجاتك تحت الضمان.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/90 transition-colors shadow-2xl flex items-center justify-center gap-3">
                <Phone className="w-6 h-6" />
                اتصل بنا الآن
              </button>
              <button 
                onClick={() => {
                  setActiveTab('new-claim');
                  setShowNewClaimForm(true);
                }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
              >
                <FileText className="w-6 h-6" />
                تقديم مطالبة جديدة
              </button>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-white/80" />
                <span className="text-white/90">ضمان يصل لـ 25 سنة</span>
              </div>
              <div className="flex items-center gap-3">
                <Headphones className="w-6 h-6 text-white/80" />
                <span className="text-white/90">دعم فني 24/7</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-white/80" />
                <span className="text-white/90">خدمة في الموقع</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-white/80" />
                <span className="text-white/90">قطع غيار أصلية</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// الأيقونة المفقودة
const PlusCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

export default WarrantyServices;