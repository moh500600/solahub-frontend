import { useLocation } from "wouter";
import { Bot, Headset } from "lucide-react";

export default function Messages() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-5xl">
        
        {/* العنوان */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            مركز الرسائل
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            اختر الطريقة التي تريد التواصل بها للحصول على الدعم الفوري والمساعدة
          </p>
        </div>

        {/* البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* دعم بشري */}
          <div
            onClick={() => setLocation("/user/messages/human")}
            className="cursor-pointer rounded-3xl bg-white border border-gray-200 p-10 shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                <Headset className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                التحدث مع إنسان
              </h2>
            </div>

            <p className="text-gray-500 mb-6 leading-relaxed">
              تواصل مباشرة مع فريق الدعم الفني للحصول على حلول شخصية واستفسارات فورية حول الطلبات والخدمات.
            </p>

            <div className="text-blue-600 font-semibold group-hover:underline text-lg">
              بدء المحادثة →
            </div>
          </div>

          {/* المساعد الذكي */}
          <div
            onClick={() => setLocation("/user/messages/ai")}
            className="cursor-pointer rounded-3xl bg-white border border-gray-200 p-10 shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center">
                <Bot className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                المساعد الذكي
              </h2>
            </div>

            <p className="text-gray-500 mb-6 leading-relaxed">
              تحدث مع مساعد ذكي بالذكاء الاصطناعي للحصول على إجابات سريعة على أسئلتك، استشارات، وإرشادات على مدار الساعة.
            </p>

            <div className="text-purple-600 font-semibold group-hover:underline text-lg">
              بدء المحادثة →
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}