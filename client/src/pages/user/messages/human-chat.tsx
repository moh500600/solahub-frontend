import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  ChevronLeft,
  Phone,
  Video,
  Circle,
  Clock,
  AlertCircle,
  CheckCheck,
  Download,
  Copy,
  Trash2,
  Star,
  MessageSquare
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
  sender: "user" | "support";
  timestamp: string;
  read: boolean;
  type: "text" | "image" | "file";
  attachmentName?: string;
}

export default function HumanChat() {
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [supportOnline, setSupportOnline] = useState(true);
  const [rating, setRating] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const supportAgent = {
    name: "م. أحمد علي",
    title: "مهندس دعم فني",
    avatar: "👨‍💼",
    responseTime: "عادة يرد في دقيقة",
    rating: 4.9,
    reviews: 245,
  };

  useEffect(() => {
    // رسالة ترحيب من الدعم
    const welcomeMessage: Message = {
      id: 1,
      text: `مرحباً بك! أنا ${supportAgent.name}، مهندس دعم فني متخصص. كيف يمكنني مساعدتك اليوم؟`,
      sender: "support",
      timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      read: true,
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
      read: false,
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessageText("");

    // محاكاة الكتابة
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const supportResponse: Message = {
        id: Date.now() + 1,
        text: "شكراً لسؤالك. سأقوم بمساعدتك في أسرع وقت ممكن. يرجى إخبارني بالتفاصيل أكثر حول مشكلتك.",
        sender: "support",
        timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
        read: true,
        type: "text",
      };
      setMessages((prev) => [...prev, supportResponse]);
    }, 2000);
  };

  const handleRating = (stars: number) => {
    setRating(stars);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 flex gap-6 overflow-hidden max-h-[calc(100vh-160px)]">
        {/* معلومات الدعم */}
        <Card className="w-80 flex flex-col shrink-0 bg-gradient-to-b from-blue-50 to-white">
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
              <div className="text-5xl mb-3">{supportAgent.avatar}</div>
              <h3 className="font-bold text-lg">{supportAgent.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{supportAgent.title}</p>

              <div className="flex items-center justify-center gap-1 mb-3">
                <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                <span className="text-xs text-green-600">متصل الآن</span>
              </div>

              <div className="flex items-center justify-center gap-1 text-yellow-500 mb-3">
                {"★".repeat(Math.floor(supportAgent.rating))}
                <span className="text-xs text-gray-600 ml-1">
                  {supportAgent.rating} ({supportAgent.reviews} تقييم)
                </span>
              </div>

              <p className="text-xs text-gray-500">{supportAgent.responseTime}</p>
            </div>
          </div>

          <div className="p-4 space-y-3 flex-1">
            <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
              <Phone className="w-4 h-4" />
              اتصال صوتي
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Video className="w-4 h-4" />
              مكالمة فيديو
            </Button>

            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-sm mb-3">معلومات مفيدة</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex gap-2">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>وقت الرد: عادة أقل من دقيقة</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>ساعات العمل: السبت - الخميس، 8 ص - 8 م</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* منطقة المحادثة */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          {/* رأس المحادثة */}
          <div className="p-4 border-b bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{supportAgent.avatar}</div>
              <div>
                <h3 className="font-bold">{supportAgent.name}</h3>
                <div className="flex items-center gap-1">
                  <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                  <span className="text-xs text-green-600">متصل الآن</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="w-5 h-5 text-gray-500" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="w-5 h-5 text-gray-500" />
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
                <div
                  className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div
                    className={`text-[10px] mt-2 flex items-center gap-1 ${
                      msg.sender === "user" ? "text-blue-100" : "text-gray-400"
                    }`}
                  >
                    {msg.timestamp}
                    {msg.sender === "user" && (
                      <CheckCheck className="w-3 h-3" />
                    )}
                  </div>
                </div>

                {/* خيارات الرسالة */}
                {msg.sender === "user" && (
                  <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-none p-4 border border-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* تقييم الخدمة */}
          {messages.length > 3 && rating === 0 && (
            <div className="p-4 border-t bg-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">هل تقييمك للخدمة؟</p>
                  <p className="text-xs text-gray-600">رأيك يساعدنا على التحسن</p>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      {star <= rating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

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
                  placeholder="اكتب رسالتك هنا..."
                  className="pr-4 pl-10 bg-gray-50 border-none focus-visible:ring-1 focus-visible:ring-blue-600"
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
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6">
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
