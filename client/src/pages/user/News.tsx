import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Newspaper
} from 'lucide-react';
import UserLayout from "./UserLayout";
import NewsAndOffers from "./news/NewsAndOffers";

export default function News() {
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
            <Newspaper className="h-6 w-6" />
            الأخبار والعروض الخاصة
          </h2>
          <p className="text-muted-foreground">آخر التحديثات والعروض المخصصة لحسابك</p>
        </div>

        <NewsAndOffers />
      </div>
    </UserLayout>
  );
}
