"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { useSidebar } from "@/components/layout/sidebar-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Package, Activity, Users, DollarSign, TrendingDown, Building2 } from "lucide-react"

// 5000 ton illik istehsal üçün real məlumatlar
const dailyData = [
  { name: "Bazar ertəsi", istehsal: 13700, keyfiyyət: 95 },
  { name: "Çərşənbə axşamı", istehsal: 13700, keyfiyyət: 96 },
  { name: "Çərşənbə", istehsal: 13700, keyfiyyət: 97 },
  { name: "Cümə axşamı", istehsal: 13700, keyfiyyət: 96 },
  { name: "Cümə", istehsal: 13700, keyfiyyət: 95 },
  { name: "Şənbə", istehsal: 13700, keyfiyyət: 98 },
  { name: "Bazar", istehsal: 13700, keyfiyyət: 97 },
]

const equipmentData = [
  { name: "İşləyir", value: 12, color: "#22c55e" },
  { name: "Təmir", value: 2, color: "#f59e0b" },
  { name: "Dayanıb", value: 1, color: "#ef4444" },
]

// İllik 5000 ton = 5,000,000 kq, aylıq təxminən 416,667 kq (12 aya bölünür)
const monthlyData = [
  { name: "Yanvar", istehsal: 416667, xərclər: 235000, gəlir: 1875000, mənfəət: 1640000 },
  { name: "Fevral", istehsal: 416667, xərclər: 235000, gəlir: 1875000, mənfəət: 1640000 },
  { name: "Mart", istehsal: 416667, xərclər: 235000, gəlir: 1875000, mənfəət: 1640000 },
  { name: "Aprel", istehsal: 416667, xərclər: 235000, gəlir: 1875000, mənfəət: 1640000 },
  { name: "May", istehsal: 416667, xərclər: 235000, gəlir: 1875000, mənfəət: 1640000 },
  { name: "İyun", istehsal: 416667, xərclər: 235000, gəlir: 1875000, mənfəət: 1640000 },
]

// İllik statistikalar: 5000 ton = 5,000,000 kq
// Günlük orta: 5,000,000 / 365 = ~13,700 kq
// Dəqiq rəqəmlər: İllik gəlir 21-24 mln, Xərclər 2.35-3.3 mln, Mənfəət 18-21 mln
const stats = [
  {
    title: "İllik İstehsal",
    value: "5,000",
    unit: "ton",
    change: "5,000,000 kq",
    icon: Package,
    color: "text-green-600",
  },
  {
    title: "İllik Gəlir",
    value: "21 - 24",
    unit: "mln AZN",
    change: "Orta: 22.5 mln",
    icon: DollarSign,
    color: "text-blue-600",
  },
  {
    title: "İllik Xərclər (OPEX)",
    value: "2.35 - 3.3",
    unit: "mln AZN",
    change: "Orta: 2.825 mln",
    icon: TrendingDown,
    color: "text-red-600",
  },
  {
    title: "İllik Mənfəət",
    value: "18 - 21",
    unit: "mln AZN",
    change: "Orta: 19.675 mln",
    icon: TrendingUp,
    color: "text-purple-600",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const { isDesktopCollapsed } = useSidebar()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
    }
  }, [router])

  if (!isAuthenticated()) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={isDesktopCollapsed ? "lg:pl-20" : "lg:pl-64"}>
        <Header />
        <main className="p-4 lg:p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Statistika</h1>
              <p className="text-muted-foreground">
                Ümumi məlumatlar və performans göstəriciləri
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {stat.value} <span className="text-sm text-muted-foreground">{stat.unit}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Investment Info */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">İlkin Investisiya (CAPEX)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5.1 - 7.2</div>
                  <div className="text-sm text-muted-foreground">mln AZN</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Əkin Sahəsi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,200 - 1,400</div>
                  <div className="text-sm text-muted-foreground">hektar</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Geri Dönüş Müddəti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">1 - 2</div>
                  <div className="text-sm text-muted-foreground">il</div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Həftəlik İstehsal</CardTitle>
                  <CardDescription>Son 7 günün məlumatları</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="istehsal" fill="#22c55e" name="İstehsal (kq)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Avadanlıq Statusu</CardTitle>
                  <CardDescription>Avadanlıqların cari vəziyyəti</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={equipmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {equipmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Keyfiyyət Göstəriciləri</CardTitle>
                  <CardDescription>Həftəlik keyfiyyət faizi</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[90, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="keyfiyyət"
                        stroke="#3b82f6"
                        name="Keyfiyyət (%)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Aylıq İstehsal, Xərclər və Mənfəət</CardTitle>
                  <CardDescription>İllik 5000 ton istehsal planı</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="istehsal" fill="#22c55e" name="İstehsal (kq)" />
                      <Bar dataKey="xərclər" fill="#ef4444" name="Xərclər (AZN)" />
                      <Bar dataKey="mənfəət" fill="#3b82f6" name="Mənfəət (AZN)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

