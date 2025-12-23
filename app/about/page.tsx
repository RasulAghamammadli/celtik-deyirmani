"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useSidebar } from "@/components/layout/sidebar-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Package,
  TrendingUp,
  Building2,
  Video,
  FileText,
  Database,
  LayoutDashboard,
  CheckCircle2,
  BarChart3,
  DollarSign,
  Users,
  Activity,
} from "lucide-react";

interface Slide {
  id: number;
  title: string;
  content: React.ReactNode;
}

export default function AboutPage() {
  const router = useRouter();
  const { isDesktopCollapsed } = useSidebar();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      } else if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  if (!isAuthenticated()) {
    return null;
  }

  const slides: Slide[] = [
    {
      id: 1,
      title: "Layihə Təqdimatı",
      content: (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-primary">
              Çəltik Dəyirmanı
            </h2>
            <p className="text-2xl text-muted-foreground">İdarəetmə Sistemi</p>
          </div>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Layihə Məqsədi</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <span>Çəltik dəyirmanı zavodunun tam idarəetməsi</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <span>Real-vaxt monitorinq və nəzarət</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <span>Maliyyə və istehsal hesabatları</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <span>Avadanlıqların video nəzarəti</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Layihə Ümumi Məlumatları",
      content: (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">
            Layihə Xüsusiyyətləri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">İstehsal Həcmi</h3>
                </div>
                <ul className="space-y-2 text-lg">
                  <li>
                    • İllik: <strong>5,000 ton</strong> çəltik
                  </li>
                  <li>
                    • Günlük: <strong>~13,700 kq</strong>
                  </li>
                  <li>
                    • Aylıq: <strong>~416,667 kq</strong>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Layihə Sahəsi</h3>
                </div>
                <ul className="space-y-2 text-lg">
                  <li>
                    • Bina ölçüləri: <strong>74.10m × 19.60m</strong>
                  </li>
                  <li>
                    • Ümumi sahə: <strong>~1,452 m²</strong>
                  </li>
                  <li>
                    • Anbar sahəsi: <strong>1,352.35 m²</strong>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">İnvestisiya</h3>
                </div>
                <ul className="space-y-2 text-lg">
                  <li>
                    • İlkin investisiya: <strong>5.1 - 7.2 milyon AZN</strong>
                  </li>
                  <li>
                    • İllik əməliyyat xərcləri:{" "}
                    <strong>2.35 - 3.3 milyon AZN</strong>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Gəlirlilik</h3>
                </div>
                <ul className="space-y-2 text-lg">
                  <li>
                    • İllik gəlir: <strong>21 - 24 milyon AZN</strong>
                  </li>
                  <li>
                    • İllik mənfəət: <strong>18 - 21 milyon AZN</strong>
                  </li>
                  <li>
                    • Geri dönüş: <strong>1-2 il</strong>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Sistem Strukturu",
      content: (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Səhifələr və Funksiyalar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <LayoutDashboard className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">
                    Statistika Dashboard
                  </h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Real-vaxt məlumatlar</li>
                  <li>• İnteraktiv diaqramlar</li>
                  <li>• İstehsal, xərclər, gəlir statistikaları</li>
                  <li>• Avadanlıq statusu</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Video className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Avadanlıq Nəzarəti</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Video nəzarət sistemi</li>
                  <li>• 15 müxtəlif avadanlıq</li>
                  <li>• Real-vaxt video playback</li>
                  <li>• Avadanlıq məlumatları</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Hesabatlar</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Günlük hesabatlar</li>
                  <li>• Həftəlik hesabatlar</li>
                  <li>• Aylıq hesabatlar</li>
                  <li>• İllik hesabatlar</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Tikinti Planı</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Bina konstruksiyaları</li>
                  <li>• Material spesifikasiyaları</li>
                  <li>• Tikinti smetası</li>
                  <li>• Tikinti mərhələləri</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Məlumat Bazası</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• İstehsal məlumatları</li>
                  <li>• Avadanlıq qeydləri</li>
                  <li>• İşçi məlumatları</li>
                  <li>• Təhlükəsiz məlumat saxlanması</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Giriş Sistemi</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Təhlükəsiz autentifikasiya</li>
                  <li>• Session idarəetməsi</li>
                  <li>• Məlumatların qorunması</li>
                  <li>• İstifadəçi təhlükəsizliyi</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Statistika Dashboard",
      content: (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">
            Dashboard Funksiyaları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-primary" />
                    Statistik Kartlar
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Ümumi İstehsal</span>
                      <span className="text-lg font-bold text-primary">
                        5,000,000 kq/il
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Ümumi Gəlir</span>
                      <span className="text-lg font-bold text-primary">
                        22,500,000 AZN/il
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Orta Keyfiyyət</span>
                      <span className="text-lg font-bold text-primary">
                        96.5%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Aktiv Avadanlıq</span>
                      <span className="text-lg font-bold text-primary">
                        12/15
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    Diaqramlar
                  </h3>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>
                        Günlük İstehsal Qrafiki - Həftəlik istehsal tendensiyası
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>
                        Aylıq Maliyyə Diaqramı - İstehsal, xərclər, gəlir,
                        mənfəət
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>Avadanlıq Statusu - İşləyir, Təmir, Dayanıb</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>
                        Keyfiyyət İndeksi - Günlük keyfiyyət göstəriciləri
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Real Məlumatlar</h3>
              <p className="text-muted-foreground">
                Bütün statistikalar illik 5000 ton istehsal üçün hesablanmış,
                Azərbaycan bazarı üzrə real qiymətlər və dövlət subsidiyaları
                nəzərə alınmışdır.
              </p>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 5,
      title: "Avadanlıq Nəzarəti",
      content: (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">
            Avadanlıq Siyahısı və Funksiyaları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">
                    TQLZ100 Titrəmə Təmizləyicisi
                  </span>
                  <span className="text-sm text-muted-foreground">2,500 $</span>
                </div>
                <p className="text-sm text-muted-foreground">6-12 ton/saat</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">TQSX100 Destoner</span>
                  <span className="text-sm text-muted-foreground">2,000 $</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Daş və ağır çirkləri ayırır
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">MLGT36 Husker</span>
                  <span className="text-sm text-muted-foreground">2,500 $</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Düyünün qabığını soyur
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">MGCZ100x12 Separator</span>
                  <span className="text-sm text-muted-foreground">2,000 $</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Ölçüyə görə ayırır
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">
                    MNSW18 Ağardıcı (3 ədəd)
                  </span>
                  <span className="text-sm text-muted-foreground">2,600 $</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Qabıq qalıqları təmizləmə
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">MJP100x4 Qreyder</span>
                  <span className="text-sm text-muted-foreground">5,200 $</span>
                </div>
                <p className="text-sm text-muted-foreground">Çeşidləmə</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Kovan LDT150 (4 ədəd)</span>
                  <span className="text-sm text-muted-foreground">6,000 $</span>
                </div>
                <p className="text-sm text-muted-foreground">Qablaşdırma</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">
                    Düyü Quruducusu (4 ədəd)
                  </span>
                  <span className="text-sm text-muted-foreground">3,000 $</span>
                </div>
                <p className="text-sm text-muted-foreground">Qurutma</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Tozsorucu</span>
                  <span className="text-sm text-muted-foreground">5,500 $</span>
                </div>
                <p className="text-sm text-muted-foreground">Toz təmizləmə</p>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Nəzarət
              </h3>
              <p className="text-muted-foreground">
                5 random avadanlıqda video playback, auto-play funksiyası,
                click-to-pause interaktivliyi və real-vaxt monitorinq sistemi.
              </p>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 6,
      title: "Hesabatlar Sistemi",
      content: (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">
            Hesabat Növləri və Məlumatlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Günlük Hesabatlar
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">İstehsal:</span>
                    <span className="font-semibold">13,700 kq</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Xərclər:</span>
                    <span className="font-semibold">6,438 - 9,041 AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gəlir:</span>
                    <span className="font-semibold">57,534 - 65,753 AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mənfəət:</span>
                    <span className="font-semibold text-primary">
                      48,493 - 59,315 AZN
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Həftəlik Hesabatlar
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">İstehsal:</span>
                    <span className="font-semibold">95,900 kq</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Xərclər:</span>
                    <span className="font-semibold">45,066 - 63,287 AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gəlir:</span>
                    <span className="font-semibold">402,738 - 460,271 AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mənfəət:</span>
                    <span className="font-semibold text-primary">
                      339,451 - 415,205 AZN
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Aylıq Hesabatlar</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">İstehsal:</span>
                    <span className="font-semibold">416,667 kq</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Xərclər:</span>
                    <span className="font-semibold">195,833 - 275,000 AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gəlir:</span>
                    <span className="font-semibold">
                      1,750,000 - 2,000,000 AZN
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mənfəət:</span>
                    <span className="font-semibold text-primary">
                      1,475,000 - 1,804,167 AZN
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">İllik Hesabatlar</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">İstehsal:</span>
                    <span className="font-semibold">5,000,000 kq</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Xərclər:</span>
                    <span className="font-semibold">
                      2,350,000 - 3,300,000 AZN
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gəlir:</span>
                    <span className="font-semibold">
                      21,000,000 - 24,000,000 AZN
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mənfəət:</span>
                    <span className="font-semibold text-primary">
                      18,000,000 - 21,000,000 AZN
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Export Funksiyası</h3>
              <p className="text-muted-foreground">
                Bütün hesabatlar PDF formatında export edilə bilər, detallı
                məlumatlar, qrafik və diaqramlar daxil olmaqla.
              </p>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 7,
      title: "Tikinti Planı",
      content: (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">
            Tikinti Məlumatları və Smeta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-primary" />
                  Bina Xüsusiyyətləri
                </h3>
                <ul className="space-y-2 text-lg">
                  <li>
                    • Uzunluq: <strong>74.10 m</strong>
                  </li>
                  <li>
                    • En: <strong>19.60 m</strong>
                  </li>
                  <li>
                    • Ümumi sahə: <strong>~1,452 m²</strong>
                  </li>
                  <li>
                    • Konstruksiya:{" "}
                    <strong>Metal karkas, profnastil örtük</strong>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Daxili Otaqlar</h3>
                <ul className="space-y-2 text-lg">
                  <li>
                    • Anbar: <strong>1,352.35 m²</strong>
                  </li>
                  <li>
                    • Müdir otağı: <strong>11.90 m²</strong>
                  </li>
                  <li>
                    • Qida qəbulu: <strong>11.95 m²</strong>
                  </li>
                  <li>
                    • Paltar dəyişmə: <strong>9.45 m²</strong>
                  </li>
                  <li>
                    • Sanitar zonalar: <strong>7.60 m²</strong>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Materiallar</h3>
                <ul className="space-y-2 text-lg">
                  <li>
                    • Beton: <strong>375 m³</strong>
                  </li>
                  <li>
                    • Armatur: <strong>42 ton</strong>
                  </li>
                  <li>
                    • Metal karkas: <strong>68 ton</strong>
                  </li>
                  <li>
                    • Profnastil: <strong>1,450 m²</strong>
                  </li>
                  <li>
                    • Sandviç panel: <strong>1,170 m²</strong>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Tikinti Müddəti</h3>
                <ul className="space-y-2 text-lg">
                  <li>
                    • Ümumi: <strong>30 həftə (~7 ay)</strong>
                  </li>
                  <li>
                    • Hazırlıq: <strong>3 həftə</strong>
                  </li>
                  <li>
                    • Təməl: <strong>4 həftə</strong>
                  </li>
                  <li>
                    • Karkas: <strong>6 həftə</strong>
                  </li>
                  <li>
                    • Dam və divar: <strong>5 həftə</strong>
                  </li>
                  <li>
                    • Daxili işlər: <strong>6 həftə</strong>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Tikinti Smetası
                  </h3>
                  <p className="text-muted-foreground">
                    Əsas tikinti dəyəri: 649,825 AZN
                  </p>
                  <p className="text-muted-foreground">
                    ƏDV (18%): 116,968 AZN
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">766,793 AZN</p>
                  <p className="text-sm text-muted-foreground">
                    Ümumi layihə dəyəri
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 8,
      title: "Maliyyə Analizi",
      content: (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">
            İnvestisiya və Gəlirlilik
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  İlkin Investisiya (CAPEX)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Torpaq icarəsi
                    </span>
                    <span className="font-semibold">180,000 - 240,000 AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Suvarma infrastrukturu
                    </span>
                    <span className="font-semibold">600,000 - 900,000 AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Texnika</span>
                    <span className="font-semibold">
                      1,600,000 - 2,200,000 AZN
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Emal zavodu</span>
                    <span className="font-semibold">
                      2,000,000 - 2,800,000 AZN
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Anbar və infrastruktur
                    </span>
                    <span className="font-semibold">500,000 - 700,000 AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Digər</span>
                    <span className="font-semibold">250,000 - 360,000 AZN</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-bold">Cəmi</span>
                      <span className="font-bold text-primary text-lg">
                        5,130,000 - 7,240,000 AZN
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  İllik Əməliyyat Xərcləri (OPEX)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">İşçi qüvvəsi</span>
                    <span className="font-semibold">600,000 - 900,000 AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Toxum</span>
                    <span className="font-semibold">250,000 - 350,000 AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Gübrə və kimyəvi
                    </span>
                    <span className="font-semibold">500,000 - 650,000 AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Yanacaq və servis
                    </span>
                    <span className="font-semibold">300,000 - 450,000 AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Suvarma və enerji
                    </span>
                    <span className="font-semibold">150,000 - 200,000 AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Emal və qablaşdırma
                    </span>
                    <span className="font-semibold">350,000 - 450,000 AZN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Logistika və vergilər
                    </span>
                    <span className="font-semibold">200,000 - 300,000 AZN</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-bold">Cəmi</span>
                      <span className="font-bold text-primary text-lg">
                        2,350,000 - 3,300,000 AZN
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    İllik Gəlir
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    21 - 24 milyon AZN
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    İllik Mənfəət
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    18 - 21 milyon AZN
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Geri Dönüş Müddəti
                  </p>
                  <p className="text-2xl font-bold text-primary">1 - 2 il</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={isDesktopCollapsed ? "lg:pl-20" : "lg:pl-64"}>
        <Header />
        <main className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Slide Container */}
            <Card className="min-h-[calc(100vh-200px)]">
              <CardContent className="p-8 lg:p-12">
                <div className="h-full flex flex-col">
                  {/* Slide Title */}
                  <div className="mb-6 text-center">
                    <h1 className="text-3xl lg:text-4xl font-bold text-primary">
                      {slides[currentSlide].title}
                    </h1>
                  </div>

                  {/* Slide Content */}
                  <div className="flex-1 flex items-center justify-center py-8">
                    <div className="w-full max-w-5xl animate-in fade-in duration-500">
                      {slides[currentSlide].content}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="mt-8 flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={prevSlide}
                      disabled={currentSlide === 0}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="h-5 w-5" />
                      <span className="hidden sm:inline">Əvvəlki</span>
                    </Button>

                    {/* Slide Indicators */}
                    <div className="flex items-center gap-2">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentSlide
                              ? "w-8 bg-primary"
                              : "w-2 bg-muted hover:bg-muted-foreground/50"
                          }`}
                          aria-label={`Slide ${index + 1}`}
                        />
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={nextSlide}
                      disabled={currentSlide === slides.length - 1}
                      className="flex items-center gap-2"
                    >
                      <span className="hidden sm:inline">Növbəti</span>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Slide Counter */}
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    {currentSlide + 1} / {slides.length}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
