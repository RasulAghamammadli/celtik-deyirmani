"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useSidebar } from "@/components/layout/sidebar-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  Ruler,
  Calculator,
  Calendar,
  FileText,
  Hammer,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const buildingSpecs = [
  { title: "Ümumi sahə", value: "1,452 m²", icon: Ruler },
  { title: "Uzunluq", value: "74.10 m", icon: Ruler },
  { title: "En", value: "19.60 m", icon: Ruler },
  { title: "Dam sistemi", value: "Profnastil", icon: Building2 },
  { title: "İzolyasiya", value: "50 mm Penoplast", icon: Building2 },
  { title: "Karkas", value: "Metal S355", icon: Building2 },
];

const rooms = [
  { name: "Anbar", area: "1,352.35 m²" },
  { name: "Dəhliz", area: "15.95 m²" },
  { name: "Müdir otağı", area: "11.90 m²" },
  { name: "Qida qəbulu", area: "11.95 m²" },
  { name: "Paltar dəyişmə otağı", area: "9.45 m²" },
  { name: "S/q və duş", area: "4.50 m²" },
  { name: "S/q", area: "3.10 m²" },
];

const materialSpecs = [
  {
    category: "Torpaq işləri",
    description: "Qazıntı, planlama",
    unit: "m³",
    quantity: 1240,
    note: "Sahə 74×20 m, 0.9 m dərinlik",
  },
  {
    category: "Beton işləri",
    description: "Təməl və döşəmə",
    unit: "m³",
    quantity: 375,
    note: "Təməl + döşəmə örtüyü",
  },
  {
    category: "Metal karkas",
    description: "Kolon, ferma, bağlayıcı",
    unit: "ton",
    quantity: 68,
    note: "S355 polad",
  },
  {
    category: "Dam örtüyü",
    description: "Profnastil",
    unit: "m²",
    quantity: 1450,
    note: "0.8 mm qalınlıq",
  },
  {
    category: "Divar örtüyü",
    description: "Sandviç panel",
    unit: "m²",
    quantity: 1170,
    note: "50 mm izolyasiya",
  },
  {
    category: "İzolyasiya",
    description: "Penoplast + ruberoid",
    unit: "m²",
    quantity: 1980,
    note: "50 mm qalınlıq",
  },
  {
    category: "Daxili işlər",
    description: "Bölmələr, boya, döşəmə",
    unit: "m²",
    quantity: 510,
    note: "Ofis və sanitar zonalar",
  },
];

const constructionStages = [
  {
    stage: "Hazırlıq",
    description: "Sahənin təmizlənməsi, geodeziya, infrastruktur",
    duration: 3,
    week: "1-3",
  },
  {
    stage: "Təməl",
    description: "Qazıntı, armatur, betonlama",
    duration: 4,
    week: "4-7",
  },
  {
    stage: "Karkas",
    description: "Metal kolon və ferma montajı",
    duration: 6,
    week: "8-13",
  },
  {
    stage: "Dam və divar",
    description: "Profnastil, izolyasiya, borular",
    duration: 5,
    week: "14-18",
  },
  {
    stage: "Daxili işlər",
    description: "Divar, döşəmə, elektrik, boya",
    duration: 6,
    week: "19-24",
  },
  {
    stage: "Avadanlıq və sınaq",
    description: "Sensor, panel, sistem testləri",
    duration: 6,
    week: "25-30",
  },
];

const costEstimate = [
  {
    no: 1,
    work: "Torpaq işləri (qazıntı və planlaşdırma)",
    unit: "m³",
    quantity: 1240,
    price: 14,
    total: 17360,
  },
  {
    no: 2,
    work: "Beton işləri (təməl + döşəmə)",
    unit: "m³",
    quantity: 375,
    price: 155,
    total: 58125,
  },
  {
    no: 3,
    work: "Armatur montajı",
    unit: "ton",
    quantity: 42,
    price: 2000,
    total: 84000,
  },
  {
    no: 4,
    work: "Metal karkas (kolon, ferma, bağlayıcı)",
    unit: "ton",
    quantity: 68,
    price: 3000,
    total: 204000,
  },
  {
    no: 5,
    work: "Dam örtüyü (profnastil 0.8 mm)",
    unit: "m²",
    quantity: 1450,
    price: 32,
    total: 46400,
  },
  {
    no: 6,
    work: "Divar örtüyü (sandviç panel 50 mm)",
    unit: "m²",
    quantity: 1170,
    price: 65,
    total: 76050,
  },
  {
    no: 7,
    work: "İzolyasiya (penoplast + ruberoid + bitum)",
    unit: "m²",
    quantity: 1980,
    price: 25,
    total: 49500,
  },
  {
    no: 8,
    work: "Daxili işlər (divar, döşəmə, boya və s.)",
    unit: "m²",
    quantity: 510,
    price: 45,
    total: 22950,
  },
  {
    no: 9,
    work: "Pəncərə və qapılar (alüminium/pvc)",
    unit: "ədəd",
    quantity: 38,
    price: 380,
    total: 14440,
  },
  {
    no: 10,
    work: "Elektrik və mühəndis sistemləri",
    unit: "kompleks",
    quantity: 1,
    price: 35000,
    total: 35000,
  },
  {
    no: 11,
    work: "Avadanlıqların quraşdırılması və sınaq",
    unit: "kompleks",
    quantity: 1,
    price: 42000,
    total: 42000,
  },
];

const totalCost = costEstimate.reduce((sum, item) => sum + item.total, 0);
const vat = totalCost * 0.18;
const totalWithVat = totalCost + vat;

export default function ConstructionPage() {
  const router = useRouter();
  const { isDesktopCollapsed } = useSidebar();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={isDesktopCollapsed ? "lg:pl-20" : "lg:pl-64"}>
        <Header />
        <main className="p-4 lg:p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Tikinti Konstruksiyaları və Planı
              </h1>
              <p className="text-muted-foreground">
                Çəltik dəyirmanı zavod binasının tikinti konstruksiyaları,
                hesablamaları və smetası
              </p>
            </div>

            {/* Building Specifications */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {buildingSpecs.map((spec) => {
                const Icon = spec.icon;
                return (
                  <Card key={spec.title}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <CardDescription>{spec.title}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{spec.value}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Building Layout */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Bina Parametrləri</CardTitle>
                  <CardDescription>
                    Ümumi ölçülər və xüsusiyyətlər
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ümumi sahə:</span>
                      <span className="font-semibold">1,452 m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uzunluq:</span>
                      <span className="font-semibold">74.10 m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">En:</span>
                      <span className="font-semibold">19.60 m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Karkas növü:
                      </span>
                      <span className="font-semibold">Metal karkas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dam örtüyü:</span>
                      <span className="font-semibold">Profnastil</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">İzolyasiya:</span>
                      <span className="font-semibold">50 mm Penoplast</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Daxili Otaqlar</CardTitle>
                  <CardDescription>
                    Bina daxilindəki otaqların sahələri
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {rooms.map((room) => (
                      <div
                        key={room.name}
                        className="flex justify-between py-2 border-b last:border-0"
                      >
                        <span className="text-muted-foreground">
                          {room.name}:
                        </span>
                        <span className="font-semibold">{room.area}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Load Calculations */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Tikinti Konstruksiyalarının Yük Hesablamaları
                </CardTitle>
                <CardDescription>
                  Yüklərin növləri və kombinasiyaları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2 p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm">
                      1. Daimi yüklər (G)
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Dam, karkas, divar və döşəmə öz çəkiləri
                    </p>
                  </div>
                  <div className="space-y-2 p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm">
                      2. Müvəqqəti yüklər (Q)
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Avadanlıq, çəltik məhsulu və personal hərəkəti
                    </p>
                  </div>
                  <div className="space-y-2 p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm">3. İqlim yükləri</h4>
                    <p className="text-sm text-muted-foreground">
                      Qar (S) və külək (W) yükləri
                    </p>
                  </div>
                  <div className="space-y-2 p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm">
                      4. Birgə kombinasiyalar
                    </h4>
                    <p className="text-sm text-muted-foreground font-mono">
                      qtot = G + ψ₀Q + ψₛS + ψwW
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Material Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Material Spesifikasiyası</CardTitle>
                <CardDescription>
                  İstifadə olunan materialların miqdarı və xüsusiyyətləri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Kateqoriya</TableHead>
                        <TableHead>Təsvir</TableHead>
                        <TableHead>Ölçü vahidi</TableHead>
                        <TableHead className="text-right">Miqdar</TableHead>
                        <TableHead>Qeyd</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {materialSpecs.map((spec, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {spec.category}
                          </TableCell>
                          <TableCell>{spec.description}</TableCell>
                          <TableCell>{spec.unit}</TableCell>
                          <TableCell className="text-right">
                            {spec.quantity.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {spec.note}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Technical Parameters */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Beton Konstruksiyalar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Beton sinfi:</span>
                    <span className="font-semibold">C25/30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Həcm:</span>
                    <span className="font-semibold">375 m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Armatur:</span>
                    <span className="font-semibold">B500C, 42 ton</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Qoruyucu qat:</span>
                    <span className="font-semibold">40 mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Hidroizolyasiya:
                    </span>
                    <span className="font-semibold">
                      2 qat ruberoid + bitum
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Metal Konstruksiyalar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Polad növü:</span>
                    <span className="font-semibold">S355</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ümumi çəki:</span>
                    <span className="font-semibold">68 ton</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Qoruyucu örtük:
                    </span>
                    <span className="font-semibold">
                      Sinklənmə + 3 qat boya
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Boya qalınlığı:
                    </span>
                    <span className="font-semibold">120 mikron</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Birləşmə:</span>
                    <span className="font-semibold">Boltlu</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dam və Divar Örtükləri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profnastil:</span>
                    <span className="font-semibold">0.8 mm, 1,450 m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Sandviç panel:
                    </span>
                    <span className="font-semibold">1,170 m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Penoplast:</span>
                    <span className="font-semibold">50 mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Enerji qənaəti:
                    </span>
                    <span className="font-semibold">U ≤ 1.4 W/m²K</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tikinti Müddəti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold">30 həftə</div>
                      <div className="text-sm text-muted-foreground">
                        Təxminən 7 ay
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="text-sm text-muted-foreground mb-2">
                        Başlanğıc:
                      </div>
                      <div className="font-semibold">Hazırlıq mərhələsi</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Construction Stages */}
            <Card>
              <CardHeader>
                <CardTitle>Tikinti Prosesinin Mərhələləri</CardTitle>
                <CardDescription>Vaxt planı və iş mərhələləri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {constructionStages.map((stage, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{stage.stage}</h4>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {stage.duration} həftə ({stage.week})
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cost Estimate */}
            <Card>
              <CardHeader>
                <CardTitle>Tikinti Smetası</CardTitle>
                <CardDescription>
                  Çəltik dəyirmanı zavod binası - Ətraflı smeta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">№</TableHead>
                        <TableHead>İş növü</TableHead>
                        <TableHead>Ölçü vahidi</TableHead>
                        <TableHead className="text-right">Miqdar</TableHead>
                        <TableHead className="text-right">
                          1 vahidin qiyməti (AZN)
                        </TableHead>
                        <TableHead className="text-right">Cəmi (AZN)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {costEstimate.map((item) => (
                        <TableRow key={item.no}>
                          <TableCell>{item.no}</TableCell>
                          <TableCell className="font-medium">
                            {item.work}
                          </TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell className="text-right">
                            {item.quantity.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.price.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            {item.total.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-bold bg-muted">
                        <TableCell colSpan={5}>
                          Cəmi əsas tikinti dəyəri
                        </TableCell>
                        <TableCell className="text-right">
                          {totalCost.toLocaleString()} AZN
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-bold">
                        <TableCell colSpan={5}>ƏDV (18%)</TableCell>
                        <TableCell className="text-right text-orange-600">
                          {vat.toLocaleString()} AZN
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-bold text-lg bg-primary/10">
                        <TableCell colSpan={5}>
                          Ümumi layihə dəyəri (ƏDV daxil)
                        </TableCell>
                        <TableCell className="text-right text-primary">
                          {totalWithVat.toLocaleString()} AZN
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
