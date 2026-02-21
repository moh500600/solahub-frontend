import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Upload,
  Trash2,
  Eye,
  FileText
} from 'lucide-react';

export default function PaymentProof() {
  const [selectedOrder, setSelectedOrder] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");

  const [paymentProofs, setPaymentProofs] = useState([
    {
      id: 1,
      orderId: "ORD-001",
      amount: 24500,
      method: "bank_transfer",
      submissionDate: "2024-03-15",
      status: "verified",
      fileName: "bank_receipt_001.pdf",
      bankName: "البنك الأهلي",
      transactionId: "TXN-2024-001"
    },
    {
      id: 2,
      orderId: "ORD-002",
      amount: 18900,
      method: "credit_card",
      submissionDate: "2024-03-14",
      status: "pending",
      fileName: "card_receipt_002.pdf",
      bankName: "بطاقة ائتمان",
      transactionId: "TXN-2024-002"
    }
  ]);

  const [orders] = useState([
    { id: "ORD-001", amount: 24500, status: "تم التسليم", date: "2024-03-15" },
    { id: "ORD-002", amount: 18900, status: "قيد التجهيز", date: "2024-03-14" },
    { id: "ORD-003", amount: 32500, status: "قيد الشحن", date: "2024-03-10" }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessageType("error");
        setMessage("حجم الملف يجب أن يكون أقل من 5 ميجابايت");
        return;
      }

      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
        setMessageType("error");
        setMessage("الملف يجب أن يكون PDF أو صورة (JPG, PNG)");
        return;
      }

      setUploadedFile(file);
      
      // عرض معاينة الصورة
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }

      setMessage("");
    }
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!selectedOrder) {
        setMessageType("error");
        setMessage("الرجاء اختيار الطلب");
        setLoading(false);
        return;
      }

      if (!uploadedFile) {
        setMessageType("error");
        setMessage("الرجاء اختيار ملف الإيصال");
        setLoading(false);
        return;
      }

      // محاكاة رفع الملف
      await new Promise(resolve => setTimeout(resolve, 2000));

      const order = orders.find(o => o.id === selectedOrder);
      if (order) {
        const newProof = {
          id: paymentProofs.length + 1,
          orderId: selectedOrder,
          amount: order.amount,
          method: paymentMethod,
          submissionDate: new Date().toISOString().split('T')[0],
          status: "pending",
          fileName: uploadedFile.name,
          bankName: paymentMethod === 'bank_transfer' ? 'البنك الأهلي' : 'بطاقة ائتمان',
          transactionId: `TXN-${Date.now()}`
        };

        setPaymentProofs([...paymentProofs, newProof]);
        setMessageType("success");
        setMessage("تم إرسال إثبات الدفع بنجاح! سيتم التحقق منه خلال 24 ساعة.");
        setSelectedOrder("");
        setUploadedFile(null);
        setFilePreview(null);
      }
    } catch (error) {
      setMessageType("error");
      setMessage("حدث خطأ أثناء رفع الملف. الرجاء المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProof = (id: number) => {
    setPaymentProofs(paymentProofs.filter(p => p.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "verified":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 ml-1" />موثق</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500"><Clock className="h-3 w-3 ml-1" />قيد المراجعة</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">مرفوض</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    const methods: Record<string, string> = {
      bank_transfer: "تحويل بنكي",
      credit_card: "بطاقة ائتمان",
      debit_card: "بطاقة خصم",
      wallet: "محفظة رقمية"
    };
    return methods[method] || method;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإيصالات المرسلة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentProofs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">الموثقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentProofs.filter(p => p.status === 'verified').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">قيد المراجعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentProofs.filter(p => p.status === 'pending').length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-blue-500" />
            إرسال إثبات الدفع
          </CardTitle>
          <CardDescription>
            رفع إيصالات التحويل البنكي أو تأكيد الدفع الإلكتروني للتحقق من الدفع
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitProof} className="space-y-4">
            {message && (
              <Alert variant={messageType === "error" ? "destructive" : "default"}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="order">اختر الطلب *</Label>
                <select
                  id="order"
                  value={selectedOrder}
                  onChange={(e) => setSelectedOrder(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm"
                  disabled={loading}
                >
                  <option value="">-- اختر طلب --</option>
                  {orders.map(order => (
                    <option key={order.id} value={order.id}>
                      {order.id} - {formatCurrency(order.amount)} - {order.status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">طريقة الدفع *</Label>
                <select
                  id="method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm"
                  disabled={loading}
                >
                  <option value="bank_transfer">تحويل بنكي</option>
                  <option value="credit_card">بطاقة ائتمان</option>
                  <option value="debit_card">بطاقة خصم</option>
                  <option value="wallet">محفظة رقمية</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>رفع الإيصال (PDF أو صورة) *</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4 hover:border-primary/50 transition-colors">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">اسحب وأفلت الملف هنا</p>
                  <p className="text-xs text-muted-foreground">أو</p>
                </div>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span>اختيار ملف</span>
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    disabled={loading}
                    className="hidden"
                  />
                </Label>
                <p className="text-xs text-muted-foreground">
                  الملفات المدعومة: PDF, JPG, PNG (أقل من 5 ميجابايت)
                </p>
              </div>

              {uploadedFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-900">
                    ✓ تم اختيار الملف: <strong>{uploadedFile.name}</strong>
                  </p>
                </div>
              )}

              {filePreview && (
                <div className="border rounded-lg p-3">
                  <p className="text-xs font-medium mb-2">معاينة الملف:</p>
                  <img src={filePreview} alt="معاينة" className="max-h-48 rounded" />
                </div>
              )}
            </div>

            <Button type="submit" disabled={loading || !uploadedFile} className="w-full">
              {loading ? "جاري الرفع..." : "إرسال إثبات الدفع"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>سجل إثبات الدفع</CardTitle>
          <CardDescription>
            جميع إيصالات الدفع المرسلة والموثقة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الطلب</TableHead>
                  <TableHead>المبلغ</TableHead>
                  <TableHead>طريقة الدفع</TableHead>
                  <TableHead>تاريخ الإرسال</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>معرف المعاملة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentProofs.map((proof) => (
                  <TableRow key={proof.id}>
                    <TableCell className="font-medium">{proof.orderId}</TableCell>
                    <TableCell>{formatCurrency(proof.amount)}</TableCell>
                    <TableCell>{getPaymentMethodLabel(proof.method)}</TableCell>
                    <TableCell>{proof.submissionDate}</TableCell>
                    <TableCell>{getStatusBadge(proof.status)}</TableCell>
                    <TableCell className="font-mono text-xs">{proof.transactionId}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" title="عرض التفاصيل">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="تحميل الإيصال">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProof(proof.id)}
                          title="حذف"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          ملاحظة مهمة: يتم التحقق من جميع إيصالات الدفع خلال 24 ساعة. إذا كان لديك أي استفسار، يرجى التواصل مع فريق الدعم الفني.
        </AlertDescription>
      </Alert>
    </div>
  );
}
