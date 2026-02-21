// src/App.tsx

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import SolarPanels from "@/pages/SolarPanels";
import Batteries from "@/pages/Batteries";
import BatteryDetail from "@/pages/BatteryDetail";
import Inverters from "@/pages/Inverters";
import ProductDetail from "@/pages/ProductDetail";
import Accessories from "@/pages/Accessories";
import AccessoryDetail from "@/pages/AccessoryDetail";
import Systems from "@/pages/Systems";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// صفحات عامة
import Favorites from "@/pages/Favorites";
import Notifications from "@/pages/Notifications";
import Messages from "@/pages/Messages";

// صفحات المشاريع
import AgriculturalProjects from "@/pages/projects/agricultural";
import CommercialProjects from "@/pages/projects/commercial";
import GovernmentProjects from "@/pages/projects/government";
import IndustrialProjects from "@/pages/projects/industrial";
import ResidentialProjects from "@/pages/projects/residential";

// صفحات About
import AboutBranches from "@/pages/about/branches";
import AboutCertificates from "@/pages/about/certificates";
import AboutCompany from "@/pages/about/company";
import AboutMission from "@/pages/about/mission";
import AboutTeam from "@/pages/about/team";
import AboutVision from "@/pages/about/vision";

// صفحات الدعم
import SupportCalculators from "@/pages/support/calculators";
import SupportFAQ from "@/pages/support/faq";
import SupportGuides from "@/pages/support/guides";
import SupportResources from "@/pages/support/resources";
import SupportReturns from "@/pages/support/returns";
import SupportShipping from "@/pages/support/shipping";
import SupportTechnical from "@/pages/support/technical";
import SupportTraining from "@/pages/support/training";
import SupportWarranty from "@/pages/support/warranty";

// صفحات القوانين والخصوصية
import CookiesPolicy from "@/pages/legal/cookies";
import Disclaimer from "@/pages/legal/disclaimer";
import PrivacyPolicy from "@/pages/legal/privacy";
import TermsOfService from "@/pages/legal/terms";

// صفحات الوكلاء
import AgentsDashboard from "@/pages/agents/dashboard";

// صفحات الإدارة
import DutchBoard from "@/pages/admin/DutchBoard";
import AdminBatteries from "@/pages/admin/batteries";
import AdminSolarPanels from "@/pages/admin/solar-panels";
import AdminInverters from "@/pages/admin/inverters";
import AdminSystems from "@/pages/admin/systems";
import AdminAccessories from "@/pages/admin/accessories";

// صفحات إدارة المنتجات والمخزون
import AdminCarBatteries from "@/pages/admin/car-batteries";
import AdminElectricTransformers from "@/pages/admin/electric-transformers";
import AdminInventory from "@/pages/admin/inventory";
import AdminProductCategories from "@/pages/admin/product-categories";
import AdminProductInventory from "@/pages/admin/product-inventory";

// صفحات إدارة الطلبات والمبيعات
import AdminOrders from "@/pages/admin/orders";
import AdminInvoices from "@/pages/admin/invoices";
import AdminShipping from "@/pages/admin/shipping";
import AdminDeliveryTracking from "@/pages/admin/delivery-tracking";
import AdminInstallmentPlans from "@/pages/admin/installment-plans";
import AdminPaymentsFinancing from "@/pages/admin/payments-financing";
import AdminPaymentMethods from "@/pages/admin/payment-methods";

// صفحات إدارة المشاريع والخدمات
import AdminCommercialProjects from "@/pages/admin/commercial-projects";
import AdminResidentialProjects from "@/pages/admin/residential-projects";
import AdminGovernmentProjects from "@/pages/admin/government-projects";
import AdminLargeProjects from "@/pages/admin/large-projects";
import AdminFarms from "@/pages/admin/farms";
import AdminCustomSolutions from "@/pages/admin/custom-solutions";
import AdminInstallationServices from "@/pages/admin/installation-services";
import AdminInstallationTeams from "@/pages/admin/installation-teams";
import AdminInstallationScheduling from "@/pages/admin/installation-scheduling";
import AdminInstallationCalendar from "@/pages/admin/installation-calendar";
import AdminMaintenanceServices from "@/pages/admin/maintenance-services";
import AdminWarrantyServices from "@/pages/admin/warranty-services";
import AdminWarrantyClaims from "@/pages/admin/warranty-claims";
import AdminWarrantyReplacement from "@/pages/admin/warranty-replacement";
import AdminTrainingServices from "@/pages/admin/training-services";

// صفحات إدارة العملاء والدعم
import AdminAppUsers from "@/pages/admin/app-users";
import AdminInquiries from "@/pages/admin/inquiries";
import AdminComplaints from "@/pages/admin/complaints";
import AdminRequests from "@/pages/admin/requests";
import AdminReplacementRequests from "@/pages/admin/replacement-requests";
import AdminTechnicalSupport from "@/pages/admin/technical-support";
import AdminAfterSales from "@/pages/admin/after-sales";
import AdminChatbot from "@/pages/admin/chatbot";
import AdminTickets from "@/pages/admin/tickets";
import AdminFeedback from "@/pages/admin/feedback";

// صفحات إدارة الشركاء والوكلاء
import AdminPartners from "@/pages/admin/partners";
import AdminDistributors from "@/pages/admin/distributors";
import AdminAgents from "@/pages/admin/agents";
import AdminDelegates from "@/pages/admin/delegates";
import AdminCompanies from "@/pages/admin/companies";
import AdminInstitutions from "@/pages/admin/institutions";
import AdminPartnerships from "@/pages/admin/partnerships";
import AdminPartnershipRequests from "@/pages/admin/partnership-requests";
import AdminSuppliers from "@/pages/admin/suppliers";
import AdminStores from "@/pages/admin/stores";
import AdminBranches from "@/pages/admin/branches";

// صفحات إدارة المحتوى والتسويق
import AdminHeaderControl from "@/pages/admin/header-control";
import AdminFooterControl from "@/pages/admin/footer-control";
import AdminAboutUs from "@/pages/admin/about-us";
import AdminContactUs from "@/pages/admin/contact-us";
import AdminBlog from "@/pages/admin/blog";
import AdminNews from "@/pages/admin/news";
import AdminFAQ from "@/pages/admin/faq";
import AdminKnowledgeBase from "@/pages/admin/knowledge-base";
import AdminEducationalContent from "@/pages/admin/educational-content";
import AdminTutorials from "@/pages/admin/tutorials";
import AdminCertifications from "@/pages/admin/certifications";
import AdminExpertTeam from "@/pages/admin/expert-team";
import AdminPromotions from "@/pages/admin/promotions";
import AdminEmailMarketing from "@/pages/admin/email-marketing";
import AdminSocialMedia from "@/pages/admin/social-media";
import AdminMarketingCampaigns from "@/pages/admin/marketing-campaigns";
import AdminMobileApp from "@/pages/admin/mobile-app";

// صفحات الإحصائيات والتقارير
import AdminReports from "@/pages/admin/reports";
import AdminAppAnalytics from "@/pages/admin/app-analytics";
import AdminProjectAnalytics from "@/pages/admin/project-analytics";
import AdminEnergyAnalytics from "@/pages/admin/energy-analytics";
import AdminEvAnalytics from "@/pages/admin/ev-analytics";
import AdminSubscriptionAnalytics from "@/pages/admin/subscription-analytics";
import AdminWarrantyAnalytics from "@/pages/admin/warranty-analytics";
import AdminSupportAnalytics from "@/pages/admin/support-analytics";
import AdminInstallationReports from "@/pages/admin/installation-reports";
import AdminSavingReports from "@/pages/admin/saving-reports";

// صفحات الإعدادات والميزات الإضافية
import AdminSettings from "@/pages/admin/settings";
import AdminLogisticsDelivery from "@/pages/admin/logistics-delivery";
import AdminProjectManagement from "@/pages/admin/project-management";
import AdminEvManagement from "@/pages/admin/ev-management";
import AdminChargingStations from "@/pages/admin/charging-stations";
import AdminEnergyConsumption from "@/pages/admin/energy-consumption";
import AdminROICalculator from "@/pages/admin/roi-calculator";
import AdminAiAssistant from "@/pages/admin/ai-assistant";
import AdminAppNotifications from "@/pages/admin/app-notifications";
import AdminSubscriptions from "@/pages/admin/subscriptions";
import AdminActiveSubscriptions from "@/pages/admin/active-subscriptions";
import AdminSubscriptionRenewals from "@/pages/admin/subscription-renewals";

// صفحات المستخدم الرئيسية
import UserDashboard from "@/pages/user/Dashboard";
import UserOverview from "@/pages/user/Overview";
import UserProfile from "@/pages/user/Profile";
import UserProfileExpanded from "@/pages/user/ProfileExpanded";
import UserVerification from "@/pages/user/Verification";
import UserNews from "@/pages/user/News";
import UserOrders from "@/pages/user/Orders";
import UserLayout from "@/pages/user/UserLayout";
import UserLayoutEnhanced from "@/pages/user/UserLayoutEnhanced";

// صفحات المستخدم - المهندس
import EngineerProjects from "@/pages/user/engineer/Projects";

// صفحات المستخدم - المزرعة
import FarmIrrigationSystems from "@/pages/user/farm/IrrigationSystems";

// صفحات المستخدم - الرسائل
import MessagesAIChat from "@/pages/user/messages/ai-chat";
import MessagesHumanChat from "@/pages/user/messages/human-chat";

// صفحات المستخدم - الأخبار والعروض
import NewsAndOffers from "@/pages/user/news/NewsAndOffers";

// صفحات المستخدم - المتجر
import StoreInventory from "@/pages/user/store/Inventory";

// السيارات الكهربائية
import Attempts from "@/pages/electric-cars/Attempts";
import ChargingStations from "@/pages/electric-cars/charging-stations";

// الخدمات
import Installation from "@/pages/services/Installation";
import Consultation from "@/pages/services/Consultation";
import Warranty from "@/pages/services/Warranty";

import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// --------------------------------------

// Private Route
function PrivateRoute({
  path,
  component: Component,
  adminOnly = false,
  agentOnly = false,
}: {
  path: string;
  component: React.ComponentType<any>;
  adminOnly?: boolean;
  agentOnly?: boolean;
}) {
  return (
    <Route path={path}>
      {(params) => {
        const isAuthenticated =
          localStorage.getItem("isAuthenticated") === "true";
        const userRole = localStorage.getItem("userRole");

        if (!isAuthenticated) {
          window.location.href = "/login";
          return null;
        }

        // إذا كانت الصفحة خاصة بالإدارة فقط
        if (adminOnly && userRole !== "admin") {
          window.location.href = "/user/dashboard";
          return null;
        }

        // إذا كانت الصفحة خاصة بالوكلاء فقط
        if (agentOnly && userRole !== "agent") {
          window.location.href = "/user/dashboard";
          return null;
        }

        // إذا كانت الصفحة للمستخدم العادي (غير admin و non agent)
        if (!adminOnly && !agentOnly && userRole === "user") {
          return <Component params={params} />;
        }

        // إذا كانت الصفحة للمستخدم العادي والوكيل يمكنهم الوصول
        if (!adminOnly && !agentOnly && (userRole === "user" || userRole === "agent")) {
          return <Component params={params} />;
        }

        // إذا كان المستخدم admin يحاول الوصول لصفحة غير إدارية
        if (!adminOnly && userRole === "admin") {
          window.location.href = "/admin/dashboard";
          return null;
        }

        // إذا كان المستخدم agent يحاول الوصول لصفحة غير خاصة به
        if (!agentOnly && userRole === "agent") {
          return <Component params={params} />;
        }

        // في جميع الحالات الأخرى، عرض الصفحة
        return <Component params={params} />;
      }}
    </Route>
  );
}

// Public Route
function PublicRoute({
  path,
  component: Component,
}: {
  path: string;
  component: React.ComponentType<any>;
}) {
  return (
    <Route path={path}>{(params) => <Component {...params} />}</Route>
  );
}

// --------------------------------------

function Router() {
  return (
    <Switch>
      {/* صفحات عامة */}
      <Route path="/" component={Home} />
      <Route path="/solar-panels" component={SolarPanels} />
      <Route path="/batteries" component={Batteries} />
      <Route path="/battery/:id" component={BatteryDetail} />
      <Route path="/inverters" component={Inverters} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/accessories" component={Accessories} />
      <Route path="/accessory/:id" component={AccessoryDetail} />
      <Route path="/systems" component={Systems} />
      <Route path="/cart" component={Cart} />

      {/* صفحات المشاريع */}
      <Route path="/projects/agricultural" component={AgriculturalProjects} />
      <Route path="/projects/commercial" component={CommercialProjects} />
      <Route path="/projects/government" component={GovernmentProjects} />
      <Route path="/projects/industrial" component={IndustrialProjects} />
      <Route path="/projects/residential" component={ResidentialProjects} />

      {/* صفحات About */}
      <Route path="/about/branches" component={AboutBranches} />
      <Route path="/about/certificates" component={AboutCertificates} />
      <Route path="/about/company" component={AboutCompany} />
      <Route path="/about/mission" component={AboutMission} />
      <Route path="/about/team" component={AboutTeam} />
      <Route path="/about/vision" component={AboutVision} />

      {/* صفحات الدعم */}
      <Route path="/support/calculators" component={SupportCalculators} />
      <Route path="/support/faq" component={SupportFAQ} />
      <Route path="/support/guides" component={SupportGuides} />
      <Route path="/support/resources" component={SupportResources} />
      <Route path="/support/returns" component={SupportReturns} />
      <Route path="/support/shipping" component={SupportShipping} />
      <Route path="/support/technical" component={SupportTechnical} />
      <Route path="/support/training" component={SupportTraining} />
      <Route path="/support/warranty" component={SupportWarranty} />

      {/* صفحات القوانين والخصوصية */}
      <Route path="/legal/cookies" component={CookiesPolicy} />
      <Route path="/legal/disclaimer" component={Disclaimer} />
      <Route path="/legal/privacy" component={PrivacyPolicy} />
      <Route path="/legal/terms" component={TermsOfService} />

      {/* صفحات الوكلاء */}
      <PrivateRoute path="/agent/dashboard" component={AgentsDashboard} agentOnly />

      {/* صفحات المستخدم العامة */}
      <PublicRoute path="/favorites" component={Favorites} />
      <PublicRoute path="/notifications" component={Notifications} />
      <PublicRoute path="/messages" component={Messages} />

      {/* سيارات كهربائية */}
      <Route path="/electric-cars/attempts" component={Attempts} />
      <Route
        path="/electric-cars/charging-stations"
        component={ChargingStations}
      />

      {/* خدمات */}
      <Route path="/services/installation" component={Installation} />
      <Route path="/services/consultation" component={Consultation} />
      <Route path="/services/warranty" component={Warranty} />

      {/* Auth */}
      <PublicRoute path="/login" component={Login} />
      <PublicRoute path="/register" component={Register} />

      {/* مستخدم - الصفحات الرئيسية */}
      <PrivateRoute path="/user/dashboard" component={UserDashboard} />
      <PrivateRoute path="/user/overview" component={UserOverview} />
      <PrivateRoute path="/user/profile" component={UserProfile} />
      <PrivateRoute path="/user/profile/expanded" component={UserProfileExpanded} />
      <PrivateRoute path="/user/verification" component={UserVerification} />
      <PrivateRoute path="/user/news" component={UserNews} />
      <PrivateRoute path="/user/orders" component={UserOrders} />
      
      {/* مستخدم - Layouts (ممكن تستخدم كقوالب) */}
      <PrivateRoute path="/user/layout" component={UserLayout} />
      <PrivateRoute path="/user/layout-enhanced" component={UserLayoutEnhanced} />

      {/* مستخدم - المهندس */}
      <PrivateRoute path="/user/engineer/projects" component={EngineerProjects} />

      {/* مستخدم - المزرعة */}
      <PrivateRoute path="/user/farm/irrigation-systems" component={FarmIrrigationSystems} />

      {/* مستخدم - الرسائل */}
      <PrivateRoute path="/user/messages/ai-chat" component={MessagesAIChat} />
      <PrivateRoute path="/user/messages/human-chat" component={MessagesHumanChat} />

      {/* مستخدم - الأخبار والعروض */}
      <PrivateRoute path="/user/news-and-offers" component={NewsAndOffers} />

      {/* مستخدم - المتجر */}
      <PrivateRoute path="/user/store/inventory" component={StoreInventory} />

      {/* Admin Dashboard */}
      <PrivateRoute path="/admin" component={DutchBoard} adminOnly />
      <PrivateRoute path="/admin/dashboard" component={DutchBoard} adminOnly />

      {/* Admin - المنتجات والمخزون */}
      <PrivateRoute path="/admin/batteries" component={AdminBatteries} adminOnly />
      <PrivateRoute path="/admin/solar-panels" component={AdminSolarPanels} adminOnly />
      <PrivateRoute path="/admin/inverters" component={AdminInverters} adminOnly />
      <PrivateRoute path="/admin/systems" component={AdminSystems} adminOnly />
      <PrivateRoute path="/admin/accessories" component={AdminAccessories} adminOnly />
      <PrivateRoute path="/admin/car-batteries" component={AdminCarBatteries} adminOnly />
      <PrivateRoute path="/admin/electric-transformers" component={AdminElectricTransformers} adminOnly />
      <PrivateRoute path="/admin/inventory" component={AdminInventory} adminOnly />
      <PrivateRoute path="/admin/product-categories" component={AdminProductCategories} adminOnly />
      <PrivateRoute path="/admin/product-inventory" component={AdminProductInventory} adminOnly />

      {/* Admin - الطلبات والمبيعات */}
      <PrivateRoute path="/admin/orders" component={AdminOrders} adminOnly />
      <PrivateRoute path="/admin/invoices" component={AdminInvoices} adminOnly />
      <PrivateRoute path="/admin/shipping" component={AdminShipping} adminOnly />
      <PrivateRoute path="/admin/delivery-tracking" component={AdminDeliveryTracking} adminOnly />
      <PrivateRoute path="/admin/installment-plans" component={AdminInstallmentPlans} adminOnly />
      <PrivateRoute path="/admin/payments-financing" component={AdminPaymentsFinancing} adminOnly />
      <PrivateRoute path="/admin/payment-methods" component={AdminPaymentMethods} adminOnly />

      {/* Admin - المشاريع والخدمات */}
      <PrivateRoute path="/admin/commercial-projects" component={AdminCommercialProjects} adminOnly />
      <PrivateRoute path="/admin/residential-projects" component={AdminResidentialProjects} adminOnly />
      <PrivateRoute path="/admin/government-projects" component={AdminGovernmentProjects} adminOnly />
      <PrivateRoute path="/admin/large-projects" component={AdminLargeProjects} adminOnly />
      <PrivateRoute path="/admin/farms" component={AdminFarms} adminOnly />
      <PrivateRoute path="/admin/custom-solutions" component={AdminCustomSolutions} adminOnly />
      <PrivateRoute path="/admin/installation-services" component={AdminInstallationServices} adminOnly />
      <PrivateRoute path="/admin/installation-teams" component={AdminInstallationTeams} adminOnly />
      <PrivateRoute path="/admin/installation-scheduling" component={AdminInstallationScheduling} adminOnly />
      <PrivateRoute path="/admin/installation-calendar" component={AdminInstallationCalendar} adminOnly />
      <PrivateRoute path="/admin/maintenance-services" component={AdminMaintenanceServices} adminOnly />
      <PrivateRoute path="/admin/warranty-services" component={AdminWarrantyServices} adminOnly />
      <PrivateRoute path="/admin/warranty-claims" component={AdminWarrantyClaims} adminOnly />
      <PrivateRoute path="/admin/warranty-replacement" component={AdminWarrantyReplacement} adminOnly />
      <PrivateRoute path="/admin/training-services" component={AdminTrainingServices} adminOnly />

      {/* Admin - العملاء والدعم */}
      <PrivateRoute path="/admin/app-users" component={AdminAppUsers} adminOnly />
      <PrivateRoute path="/admin/inquiries" component={AdminInquiries} adminOnly />
      <PrivateRoute path="/admin/complaints" component={AdminComplaints} adminOnly />
      <PrivateRoute path="/admin/requests" component={AdminRequests} adminOnly />
      <PrivateRoute path="/admin/replacement-requests" component={AdminReplacementRequests} adminOnly />
      <PrivateRoute path="/admin/technical-support" component={AdminTechnicalSupport} adminOnly />
      <PrivateRoute path="/admin/after-sales" component={AdminAfterSales} adminOnly />
      <PrivateRoute path="/admin/chatbot" component={AdminChatbot} adminOnly />
      <PrivateRoute path="/admin/tickets" component={AdminTickets} adminOnly />
      <PrivateRoute path="/admin/feedback" component={AdminFeedback} adminOnly />

      {/* Admin - الشركاء والوكلاء */}
      <PrivateRoute path="/admin/partners" component={AdminPartners} adminOnly />
      <PrivateRoute path="/admin/distributors" component={AdminDistributors} adminOnly />
      <PrivateRoute path="/admin/agents" component={AdminAgents} adminOnly />
      <PrivateRoute path="/admin/delegates" component={AdminDelegates} adminOnly />
      <PrivateRoute path="/admin/companies" component={AdminCompanies} adminOnly />
      <PrivateRoute path="/admin/institutions" component={AdminInstitutions} adminOnly />
      <PrivateRoute path="/admin/partnerships" component={AdminPartnerships} adminOnly />
      <PrivateRoute path="/admin/partnership-requests" component={AdminPartnershipRequests} adminOnly />
      <PrivateRoute path="/admin/suppliers" component={AdminSuppliers} adminOnly />
      <PrivateRoute path="/admin/stores" component={AdminStores} adminOnly />
      <PrivateRoute path="/admin/branches" component={AdminBranches} adminOnly />

      {/* Admin - المحتوى والتسويق */}
      <PrivateRoute path="/admin/header-control" component={AdminHeaderControl} adminOnly />
      <PrivateRoute path="/admin/footer-control" component={AdminFooterControl} adminOnly />
      <PrivateRoute path="/admin/about-us" component={AdminAboutUs} adminOnly />
      <PrivateRoute path="/admin/contact-us" component={AdminContactUs} adminOnly />
      <PrivateRoute path="/admin/blog" component={AdminBlog} adminOnly />
      <PrivateRoute path="/admin/news" component={AdminNews} adminOnly />
      <PrivateRoute path="/admin/faq" component={AdminFAQ} adminOnly />
      <PrivateRoute path="/admin/knowledge-base" component={AdminKnowledgeBase} adminOnly />
      <PrivateRoute path="/admin/educational-content" component={AdminEducationalContent} adminOnly />
      <PrivateRoute path="/admin/tutorials" component={AdminTutorials} adminOnly />
      <PrivateRoute path="/admin/certifications" component={AdminCertifications} adminOnly />
      <PrivateRoute path="/admin/expert-team" component={AdminExpertTeam} adminOnly />
      <PrivateRoute path="/admin/promotions" component={AdminPromotions} adminOnly />
      <PrivateRoute path="/admin/email-marketing" component={AdminEmailMarketing} adminOnly />
      <PrivateRoute path="/admin/social-media" component={AdminSocialMedia} adminOnly />
      <PrivateRoute path="/admin/marketing-campaigns" component={AdminMarketingCampaigns} adminOnly />
      <PrivateRoute path="/admin/mobile-app" component={AdminMobileApp} adminOnly />

      {/* Admin - الإحصائيات والتقارير */}
      <PrivateRoute path="/admin/reports" component={AdminReports} adminOnly />
      <PrivateRoute path="/admin/app-analytics" component={AdminAppAnalytics} adminOnly />
      <PrivateRoute path="/admin/project-analytics" component={AdminProjectAnalytics} adminOnly />
      <PrivateRoute path="/admin/energy-analytics" component={AdminEnergyAnalytics} adminOnly />
      <PrivateRoute path="/admin/ev-analytics" component={AdminEvAnalytics} adminOnly />
      <PrivateRoute path="/admin/subscription-analytics" component={AdminSubscriptionAnalytics} adminOnly />
      <PrivateRoute path="/admin/warranty-analytics" component={AdminWarrantyAnalytics} adminOnly />
      <PrivateRoute path="/admin/support-analytics" component={AdminSupportAnalytics} adminOnly />
      <PrivateRoute path="/admin/installation-reports" component={AdminInstallationReports} adminOnly />
      <PrivateRoute path="/admin/saving-reports" component={AdminSavingReports} adminOnly />

      {/* Admin - الإعدادات والميزات الإضافية */}
      <PrivateRoute path="/admin/settings" component={AdminSettings} adminOnly />
      <PrivateRoute path="/admin/logistics-delivery" component={AdminLogisticsDelivery} adminOnly />
      <PrivateRoute path="/admin/project-management" component={AdminProjectManagement} adminOnly />
      <PrivateRoute path="/admin/ev-management" component={AdminEvManagement} adminOnly />
      <PrivateRoute path="/admin/charging-stations" component={AdminChargingStations} adminOnly />
      <PrivateRoute path="/admin/energy-consumption" component={AdminEnergyConsumption} adminOnly />
      <PrivateRoute path="/admin/roi-calculator" component={AdminROICalculator} adminOnly />
      <PrivateRoute path="/admin/ai-assistant" component={AdminAiAssistant} adminOnly />
      <PrivateRoute path="/admin/app-notifications" component={AdminAppNotifications} adminOnly />
      <PrivateRoute path="/admin/subscriptions" component={AdminSubscriptions} adminOnly />
      <PrivateRoute path="/admin/active-subscriptions" component={AdminActiveSubscriptions} adminOnly />
      <PrivateRoute path="/admin/subscription-renewals" component={AdminSubscriptionRenewals} adminOnly />

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// --------------------------------------

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;