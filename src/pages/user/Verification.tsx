import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import UserLayout from "./UserLayout";
import ProductVerification from "./verification/ProductVerification";
import PaymentProof from "./verification/PaymentProof";

export default function Verification() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");

    if (isAuth === "true" && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    } else {
      setLocation("/login");
    }
  }, [setLocation]);

  if (!isAuthenticated) return null;

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6" />
            إثبات الملكية والدفع
          </h2>
          <p className="text-muted-foreground">توثيق منتجاتك وإثبات عمليات الدفع</p>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              توثيق المنتجات
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              إثبات الدفع
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <ProductVerification />
          </TabsContent>

          <TabsContent value="payment" className="mt-6">
            <PaymentProof />
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  );
}
