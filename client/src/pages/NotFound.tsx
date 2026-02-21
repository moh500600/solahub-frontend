import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full animate-pulse" />
            <AlertCircle className="relative h-16 w-16 text-accent" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>

        <h2 className="text-2xl font-bold mb-2">الصفحة غير موجودة</h2>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير موجودة.
          <br />
          قد تكون قد تم نقلها أو حذفها.
        </p>

        <Link href="/">
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            العودة للرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
}
