"use client";

import { useState } from "react";
import { 
  AlertCircle, Shield, FileText, CheckCircle, 
  XCircle, Info, Clock, Globe, Zap, BookOpen,
  ArrowRight, ChevronDown, ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../Header";
import Footer from "../Footer";

export default function DisclaimerPage() {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const disclaimerSections = [
    {
      title: "الغرض من المعلومات",
      icon: <Info className="w-6 h-6" />,
      content: "جميع المعلومات الواردة في هذا الموقع هي لأغراض تعليمية وإعلامية فقط. لا تشكل أي معلومات مقدمة عبر هذا الموقع نصيحة مهنية أو استشارة فنية أو قانونية أو مالية. يجب عليك استشارة متخصص مؤهل قبل اتخاذ أي قرارات تتعلق بمشاريع الطاقة الشمسية."
    },
    {
      title: "عدم ضمان الدقة",
      icon: <AlertCircle className="w-6 h-6" />,
      content: "نحن نسعى جاهدين لتقديم معلومات دقيقة وحديثة، لكننا لا نضمن دقة أو اكتمال أو موثوقية أي محتوى على هذا الموقع. قد تتغير المعلومات الفنية والأسعار واللوائح مع مرور الوقت، وقد تكون هناك أخطاء أو سهو في المحتوى المقدم."
    },
    {
      title: "الحد من المسؤولية",
      icon: <Shield className="w-6 h-6" />,
      content: "لا تتحمل شركة سولار تيك أو موظفيها أو وكلائها أي مسؤولية عن أي خسائر أو أضرار تنشأ عن استخدام هذا الموقع أو الاعتماد على أي معلومات واردة فيه. هذا يشمل، على سبيل المثال لا الحصر، الأضرار المباشرة أو غير المباشرة، العرضية أو التبعية."
    },
    {
      title: "الروابط الخارجية",
      icon: <Globe className="w-6 h-6" />,
      content: "قد يحتوي هذا الموقع على روابط لمواقع تابعة لأطراف ثالثة. نحن لا نتحكم في هذه المواقع ولا نتحمل مسؤولية محتواها أو ممارسات الخصوصية فيها. إدراج أي رابط لا يعني تأييدنا أو موافقتنا على الموقع المرتبط."
    },
    {
      title: "التغيرات الفنية",
      icon: <Zap className="w-6 h-6" />,
      content: "تتطور تقنيات الطاقة الشمسية بسرعة، وقد تختلف المواصفات والأداء الفعلي للمنتجات عن المعلومات الواردة على الموقع. نوصي بالتحقق من أحدث المعلومات من المصادر الرسمية قبل اتخاذ أي قرارات شرائية أو تنفيذية."
    },
    {
      title: "الاعتبارات المحلية",
      icon: <Clock className="w-6 h-6" />,
      content: "تختلف اللوائح والمتطلبات المحلية للطاقة الشمسية من منطقة إلى أخرى. المعلومات المقدمة على هذا الم이트 قد لا تنطبق على جميع المناطق أو جميع الحالات. يتحمل المستخدم مسؤولية التحقق من المتطلبات المحلية والامتثال لها."
    }
  ];

  const importantNotes = [
    "جميع الأسعار عرضة للتغيير دون إشعار مسبق",
    "الضمانات والخدمات قد تختلف حسب المنطقة",
    "الأداء الفعلي قد يختلف حسب الظروف المحلية",
    "مدة التسليم تقريبية وقد تتغير",
    "جميع الصور لأغراض توضيحية فقط"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <Header cartCount={0} />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-700 text-sm font-medium mb-6">
              <AlertCircle className="w-4 h-4" />
              إخلاء المسؤولية القانوني
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              إخلاء <span className="text-primary">المسؤولية</span> القانوني
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              من المهم قراءة وفهم هذا الإخلاء الكامل للمسؤولية قبل استخدام موقعنا 
              أو الاعتماد على أي معلومات واردة فيه. باستخدامك لهذا الموقع، فإنك توافق 
              على شروط وأحكام هذا الإخلاء.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" className="gap-2">
                <FileText className="w-5 h-5" />
                شروط الاستخدام
              </Button>
              <Button variant="outline" className="gap-2">
                <Shield className="w-5 h-5" />
                سياسة الخصوصية
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-500/5 border-y border-yellow-500/20 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-600 flex-shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">تنويه مهم</h3>
                <p className="text-muted-foreground">
                  هذا الإخلاء للمسؤولية يعد جزءاً لا يتجزأ من شروط استخدام موقعنا. 
                  إذا كنت لا توافق على أي جزء من هذا الإخلاء، فيرجى عدم استخدام موقعنا 
                  أو أي من خدماتنا. نحتفظ بالحق في تحديث أو تعديل هذا الإخلاء في أي وقت 
                  دون إشعار مسبق.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Sections */}
      <div className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {disclaimerSections.map((section, index) => (
                <div key={index} className="bg-card rounded-2xl border border-border overflow-hidden">
                  <button
                    className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {section.icon}
                      </div>
                      <h3 className="text-xl font-bold text-right">{section.title}</h3>
                    </div>
                    {openSections.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  
                  {openSections.includes(index) && (
                    <div className="p-6 pt-0 border-t border-border animate-in fade-in">
                      <div className="prose prose-lg max-w-none">
                        <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Important Points */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 text-center">نقاط مهمة يجب ملاحظتها</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {importantNotes.map((note, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-3 h-3" />
                    </div>
                    <span className="font-medium">{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Acceptance Section */}
            <div className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl p-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">قبول إخلاء المسؤولية</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  باستخدامك هذا الموقع، فإنك تقر بأنك قد قرأت وفهمت هذا الإخلاء الكامل للمسؤولية 
                  وتوافق على الالتزام بجميع شروطه وأحكامه. إذا كنت لا توافق على أي جزء من هذا 
                  الإخلاء، فيرجى التوقف عن استخدام موقعنا على الفور.
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>آخر تحديث: ١ يناير ٢٠٢٤</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact for Clarification */}
            <div className="mt-12 p-6 bg-card border border-border rounded-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">هل لديك استفسارات؟</h3>
                  <p className="text-muted-foreground">
                    إذا كانت لديك أي أسئلة أو استفسارات بشأن هذا الإخلاء للمسؤولية، 
                    يرجى الاتصال بنا للحصول على التوضيحات.
                  </p>
                </div>
                <Button className="gap-2">
                  <ArrowRight className="w-5 h-5" />
                  تواصل معنا للتوضيح
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}