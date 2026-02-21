import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  ChevronLeft,
  Zap,
  Circle,
  Lightbulb,
  Copy,
  Trash2,
  Volume2,
  Settings,
  MessageSquare,
  Sparkles,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "../../Header";
import Footer from "../../Footer";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
  type: "text" | "suggestion";
  helpful?: boolean;
}

export default function AIChat() {
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "كيف أختار الألواح الشمسية المناسبة؟",
    "ما هو أفضل نظام تخزين الطاقة؟",
    "كم تكون فترة الضمان على المنتجات؟",
    "هل يمكن تركيب النظام في منزلي؟",
  ];

  useEffect(() => {
    const welcomeMessage: Message = {
      id: 1,
      text: "مرحباً! 👋 أنا مساعدك الذكي المتخصص في أنظمة الطاقة الشمسية. يمكنني الإجابة على أسئلتك وتقديم استشارات متخصصة على مدار الساعة. كيف يمكنني مساعدتك اليوم؟",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      type: "text",
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessageText("");

    // محاكاة الكتابة
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: "شكراً لسؤالك! بناءً على معلومات قاعدة بياناتنا الشاملة، يمكنني تقديم إجابة دقيقة ومفصلة. \n\n✅ الألواح الشمسية ذات الكفاءة العالية (22-24%) توفر أفضل عائد على الاستثمار.\n✅ نوصي بأنظمة التخزين بقدرة 10-15 كيلو وات ساعة للمنازل المتوسطة.\n✅ فترة الضمان تصل إلى 30 سنة على الألواح و10 سنوات على المحولات.\n\nهل تريد معرفة المزيد عن أي من هذه النقاط؟",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 2000);
  };

  const handleSuggestion = (suggestion: string) => {
    setMessageText(suggestion);
    setSelectedSuggestion(suggestions.indexOf(suggestion));
  };

  const handleHelpful = (messageId: number, helpful: boolean) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, helpful } : msg
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 flex gap-6 overflow-hidden max-h-[calc(100vh-160px)]">
        {/* معلومات الذكاء الاصطناعي */}
        <Card className="w-80 flex flex-col shrink-0 bg-gradient-to-b from-purple-50 to-white">
          <div className="p-6 border-b">
            <Button
              variant="ghost"
              size="icon"
              className="mb-4"
              onClick={() => navigate("/messages")}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="text-center">
              <div className="text-5xl mb-3">🤖</div>
              <h3 className="font-bold text-lg">المساعد الذكي</h3>
              <p className="text-sm text-gray-600 mb-2">مساعد ذكي متخصص</p>

              <div className="flex items-center justify-center gap-1 mb-3">
                <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                <span className="text-xs text-green-600">متاح الآن</span>
              </div>

              <div className="flex items-center justify-center gap-1 text-yellow-500 mb-3">
                {"★".repeat(5)}
                <span className="text-xs text-gray-600 ml-1">(4.9 / 5)</span>
              </div>

              <p className="text-xs text-gray-500">رد فوري على مدار الساعة</p>
            </div>
          </div>

          <div className="p-4 space-y-3 flex-1">
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h4 className="font-semibold text-sm">الميزات</h4>
              </div>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex gap-2">
                  <Zap className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>إجابات فورية وموثوقة</span>
                </li>
                <li className="flex gap-2">
                  <Lightbulb className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>استشارات متخصصة</span>
                </li>
                <li className="flex gap-2">
                  <Volume2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>دعم متعدد اللغات</span>
                </li>
              </ul>
            </div>

            <Button variant="outline" className="w-full gap-2">
              <Settings className="w-4 h-4" />
              إعدادات الدردشة
            </Button>
          </div>
        </Card>

        {/* منطقة المحادثة */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          {/* رأس المحادثة */}
          <div className="p-4 border-b bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🤖</div>
              <div>
                <h3 className="font-bold">المساعد الذكي</h3>
                <div className="flex items-center gap-1">
                  <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                  <span className="text-xs text-green-600">متاح الآن</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Volume2 className="w-5 h-5 text-gray-500" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </Button>
            </div>
          </div>

          {/* الرسائل */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} group`}
              >
                <div className={`max-w-[70%] ${msg.sender === "user" ? "" : "w-full"}`}>
                  <div
                    className={`rounded-2xl p-4 shadow-sm ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-tr-none ml-auto"
                        : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <div
                      className={`text-[10px] mt-2 ${
                        msg.sender === "user" ? "text-blue-100" : "text-gray-400"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {/* تقييم الرسالة */}
                  {msg.sender === "ai" && (
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleHelpful(msg.id, true)}
                        className={`p-1 rounded hover:bg-green-100 ${
                          msg.helpful === true ? "bg-green-100" : ""
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4 text-green-600" />
                      </button>
                      <button
                        onClick={() => handleHelpful(msg.id, false)}
                        className={`p-1 rounded hover:bg-red-100 ${
                          msg.helpful === false ? "bg-red-100" : ""
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4 text-red-600" />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <Copy className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-none p-4 border border-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="mt-8">
                <p className="text-center text-gray-600 text-sm mb-4">الأسئلة الشائعة:</p>
                <div className="grid grid-cols-1 gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestion(suggestion)}
                      className={`p-3 rounded-lg border text-left text-sm transition-all hover:border-purple-600 hover:bg-purple-50 ${
                        selectedSuggestion === index
                          ? "border-purple-600 bg-purple-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>{suggestion}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* إدخال الرسالة */}
          <div className="p-4 border-t bg-white">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <Button type="button" variant="ghost" size="icon" className="text-gray-400">
                <Paperclip className="w-5 h-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="اسأل عن أي شيء متعلق بالطاقة الشمسية..."
                  className="pr-4 pl-10 bg-gray-50 border-none focus-visible:ring-1 focus-visible:ring-purple-600"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute left-1 top-1 text-gray-400 h-8 w-8"
                >
                  <Smile className="w-5 h-5" />
                </Button>
              </div>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6">
                <Send className="w-4 h-4 ml-2" />
                إرسال
              </Button>
            </form>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
