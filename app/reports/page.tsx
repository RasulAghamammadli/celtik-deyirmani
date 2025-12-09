"use client";

import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 5000 ton illik istehsal üçün real məlumatlar (Azərbaycan şəraiti)
// Günlük orta: 5,000,000 kq / 365 gün = ~13,700 kq/gün
const dailyReportData = [
  { name: "08:00", istehsal: 2283, keyfiyyət: 95 },
  { name: "10:00", istehsal: 2283, keyfiyyət: 96 },
  { name: "12:00", istehsal: 2283, keyfiyyət: 97 },
  { name: "14:00", istehsal: 2283, keyfiyyət: 96 },
  { name: "16:00", istehsal: 2283, keyfiyyət: 98 },
  { name: "18:00", istehsal: 2283, keyfiyyət: 97 },
];

// Həftəlik: 13,700 kq/gün × 7 = 95,900 kq/həftə
// Xərclər: 2,350,000 - 3,300,000 AZN/il / 52 = 45,192 - 63,462 AZN/həftə (orta: 54,327)
// Gəlir: 21,000,000 - 24,000,000 AZN/il / 52 = 403,846 - 461,538 AZN/həftə (orta: 432,692)
// Mənfəət: 340,385 - 398,077 AZN/həftə (orta: 378,365)
const weeklyReportData = [
  { name: "Bazar ertəsi", istehsal: 95900, xərclər: 54327, qazanc: 378365 },
  { name: "Çərşənbə axşamı", istehsal: 95900, xərclər: 54327, qazanc: 378365 },
  { name: "Çərşənbə", istehsal: 95900, xərclər: 54327, qazanc: 378365 },
  { name: "Cümə axşamı", istehsal: 95900, xərclər: 54327, qazanc: 378365 },
  { name: "Cümə", istehsal: 95900, xərclər: 54327, qazanc: 378365 },
  { name: "Şənbə", istehsal: 95900, xərclər: 54327, qazanc: 378365 },
  { name: "Bazar", istehsal: 95900, xərclər: 54327, qazanc: 378365 },
];

// Aylıq: 5,000,000 kq / 12 = 416,667 kq/ay
// Xərclər: 2,350,000 - 3,300,000 AZN / 12 = 195,833 - 275,000 AZN/ay (orta: 235,417)
// Gəlir: 21,000,000 - 24,000,000 AZN / 12 = 1,750,000 - 2,000,000 AZN/ay (orta: 1,875,000)
// Mənfəət: 1,554,167 - 1,804,167 AZN/ay (orta: 1,639,583)
const monthlyReportData = [
  { name: "Həftə 1", istehsal: 104167, xərclər: 58854, gəlir: 468750, mənfəət: 409896 },
  { name: "Həftə 2", istehsal: 104167, xərclər: 58854, gəlir: 468750, mənfəət: 409896 },
  { name: "Həftə 3", istehsal: 104167, xərclər: 58854, gəlir: 468750, mənfəət: 409896 },
  { name: "Həftə 4", istehsal: 104167, xərclər: 58854, gəlir: 468750, mənfəət: 409896 },
];

// İllik: 5,000,000 kq (5000 ton) - DƏQİQ RƏQƏMLƏR
// İlkin investisiya (CAPEX): 5,100,000 - 7,200,000 AZN
// İllik əməliyyat xərcləri (OPEX): 2,350,000 - 3,300,000 AZN
// İllik gəlir: 21,000,000 - 24,000,000 AZN
// İllik mənfəət: 18,000,000 - 21,000,000 AZN
// Geri dönüş müddəti: 1 - 2 il
// Əkin sahəsi: 1,200 - 1,400 hektar
const yearlyReportData = [
  { name: "Yanvar", istehsal: 416667, xərclər: 235417, gəlir: 1875000, qazanc: 1639583 },
  { name: "Fevral", istehsal: 416667, xərclər: 235417, gəlir: 1875000, qazanc: 1639583 },
  { name: "Mart", istehsal: 416667, xərclər: 235417, gəlir: 1875000, qazanc: 1639583 },
  { name: "Aprel", istehsal: 416667, xərclər: 235417, gəlir: 1875000, qazanc: 1639583 },
  { name: "May", istehsal: 416667, xərclər: 235417, gəlir: 1875000, qazanc: 1639583 },
  { name: "İyun", istehsal: 416667, xərclər: 235417, gəlir: 1875000, qazanc: 1639583 },
  { name: "İyul", istehsal: 416667, xərclər: 235417, gəlir: 1875000, qazanc: 1639583 },
  { name: "Avqust", istehsal: 416667, xərclər: 235417, gəlir: 1875000, qazanc: 1639583 },
  { name: "Sentyabr", istehsal: 416667, xərclər: 235417, gəlir: 1875000, qazanc: 1639583 },
  { name: "Oktyabr", istehsal: 416667, xərclər: 235417, gəlir: 1875000, qazanc: 1639583 },
  { name: "Noyabr", istehsal: 416667, xərclər: 235417, gəlir: 1875000, qazanc: 1639583 },
  { name: "Dekabr", istehsal: 416667, xərclər: 235417, gəlir: 1875000, qazanc: 1639583 },
];

const ReportSummary = ({ title, data }: { title: string; data: any[] }) => {
  const totalProduction = data.reduce(
    (sum, item) => sum + (item.istehsal || 0),
    0
  );
  const totalExpenses = data.reduce(
    (sum, item) => sum + (item.xərclər || 0),
    0
  );
  const totalRevenue = data.reduce(
    (sum, item) => sum + (item.gəlir || 0),
    0
  );
  const totalProfit = data.reduce((sum, item) => sum + (item.qazanc || 0), 0);
  const avgQuality =
    data.reduce((sum, item) => sum + (item.keyfiyyət || 0), 0) / data.length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Ümumi İstehsal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalProduction >= 1000000
              ? `${(totalProduction / 1000000).toFixed(2)} mln`
              : totalProduction >= 1000
              ? `${(totalProduction / 1000).toFixed(1)} min`
              : totalProduction.toLocaleString()}{" "}
            {totalProduction >= 1000 ? "kq" : "kq"}
          </div>
        </CardContent>
      </Card>
      {totalExpenses > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Ümumi Xərclər (OPEX)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalExpenses >= 1000000
                ? `${(totalExpenses / 1000000).toFixed(2)} mln`
                : totalExpenses >= 1000
                ? `${(totalExpenses / 1000).toFixed(1)} min`
                : totalExpenses.toLocaleString()}{" "}
              AZN
            </div>
          </CardContent>
        </Card>
      )}
      {totalRevenue > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Ümumi Gəlir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalRevenue >= 1000000
                ? `${(totalRevenue / 1000000).toFixed(2)} mln`
                : totalRevenue >= 1000
                ? `${(totalRevenue / 1000).toFixed(1)} min`
                : totalRevenue.toLocaleString()}{" "}
              AZN
            </div>
          </CardContent>
        </Card>
      )}
      {totalProfit > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Ümumi Mənfəət</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalProfit >= 1000000
                ? `${(totalProfit / 1000000).toFixed(2)} mln`
                : totalProfit >= 1000
                ? `${(totalProfit / 1000).toFixed(1)} min`
                : totalProfit.toLocaleString()}{" "}
              AZN
            </div>
          </CardContent>
        </Card>
      )}
      {avgQuality > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Orta Keyfiyyət</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgQuality.toFixed(1)}%</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default function ReportsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("daily");
  const { isDesktopCollapsed } = useSidebar();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthenticated()) {
    return null;
  }

  const handleExport = (type: string) => {
    // Demo export functionality
    alert(`${type} hesabatı export edilir...`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={isDesktopCollapsed ? "lg:pl-20" : "lg:pl-64"}>
        <Header />
        <main className="p-4 lg:p-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Hesabatlar
                </h1>
                <p className="text-muted-foreground">
                  İstehsal, xərclər və performans hesabatları
                </p>
              </div>
              <Button onClick={() => handleExport(activeTab)}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="daily">Günlük</TabsTrigger>
                <TabsTrigger value="weekly">Həftəlik</TabsTrigger>
                <TabsTrigger value="monthly">Aylıq</TabsTrigger>
                <TabsTrigger value="yearly">İllik</TabsTrigger>
              </TabsList>

              {/* Daily Report */}
              <TabsContent value="daily" className="space-y-4">
                <ReportSummary title="Günlük Hesabat" data={dailyReportData} />
                <Card>
                  <CardHeader>
                    <CardTitle>Günlük İstehsal və Keyfiyyət</CardTitle>
                    <CardDescription>
                      Bugünkü istehsal məlumatları
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={dailyReportData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          domain={[90, 100]}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar
                          yAxisId="left"
                          dataKey="istehsal"
                          fill="#22c55e"
                          name="İstehsal (kq)"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="keyfiyyət"
                          stroke="#3b82f6"
                          name="Keyfiyyət (%)"
                          strokeWidth={2}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Weekly Report */}
              <TabsContent value="weekly" className="space-y-4">
                <ReportSummary
                  title="Həftəlik Hesabat"
                  data={weeklyReportData}
                />
                <Card>
                  <CardHeader>
                    <CardTitle>Həftəlik İstehsal, Xərclər və Mənfəət</CardTitle>
                    <CardDescription>Həftəlik orta: 95,900 kq istehsal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={weeklyReportData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="istehsal"
                          fill="#22c55e"
                          name="İstehsal (kq)"
                        />
                        <Bar
                          dataKey="xərclər"
                          fill="#ef4444"
                          name="Xərclər (AZN)"
                        />
                        <Bar
                          dataKey="qazanc"
                          fill="#3b82f6"
                          name="Mənfəət (AZN)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Monthly Report */}
              <TabsContent value="monthly" className="space-y-4">
                <ReportSummary title="Aylıq Hesabat" data={monthlyReportData} />
                <Card>
                  <CardHeader>
                    <CardTitle>Aylıq İstehsal, Xərclər və Mənfəət</CardTitle>
                    <CardDescription>Bu ayın həftəlik bölgüsü (416,667 kq/ay)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={monthlyReportData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="istehsal"
                          fill="#22c55e"
                          name="İstehsal (kq)"
                        />
                        <Bar
                          dataKey="xərclər"
                          fill="#ef4444"
                          name="Xərclər (AZN)"
                        />
                        <Bar
                          dataKey="mənfəət"
                          fill="#3b82f6"
                          name="Mənfəət (AZN)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Yearly Report */}
              <TabsContent value="yearly" className="space-y-4">
                <ReportSummary title="İllik Hesabat" data={yearlyReportData} />
                
                {/* Investment Summary */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>İlkin Investisiya (CAPEX)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5.1 - 7.2</div>
                      <div className="text-sm text-muted-foreground">mln AZN</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>İllik Əməliyyat Xərcləri (OPEX)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2.35 - 3.3</div>
                      <div className="text-sm text-muted-foreground">mln AZN</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Geri Dönüş Müddəti</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">1 - 2</div>
                      <div className="text-sm text-muted-foreground">il</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>İllik İstehsal, Xərclər, Gəlir və Mənfəət</CardTitle>
                    <CardDescription>
                      5000 ton (5,000,000 kq) illik istehsal planı - Aylıq bölgü
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={yearlyReportData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="istehsal"
                          fill="#22c55e"
                          name="İstehsal (kq)"
                        />
                        <Bar
                          dataKey="xərclər"
                          fill="#ef4444"
                          name="Xərclər (AZN)"
                        />
                        <Bar
                          dataKey="gəlir"
                          fill="#3b82f6"
                          name="Gəlir (AZN)"
                        />
                        <Bar
                          dataKey="qazanc"
                          fill="#10b981"
                          name="Mənfəət (AZN)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
