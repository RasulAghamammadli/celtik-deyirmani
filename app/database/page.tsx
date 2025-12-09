"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { useSidebar } from "@/components/layout/sidebar-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Upload, Filter } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Demo database records
const databaseRecords = [
  {
    id: 1,
    date: "2024-01-20",
    product: "Yüksək keyfiyyətli düyü",
    quantity: 1500,
    unit: "kq",
    quality: "95%",
    equipment: "Dəyirman #2",
    operator: "Rəşad Məmmədov",
    status: "təsdiqlənib",
  },
  {
    id: 2,
    date: "2024-01-20",
    product: "Standart düyü",
    quantity: 2300,
    unit: "kq",
    quality: "92%",
    equipment: "Dəyirman #1",
    operator: "Elçin Həsənov",
    status: "təsdiqlənib",
  },
  {
    id: 3,
    date: "2024-01-19",
    product: "Yüksək keyfiyyətli düyü",
    quantity: 1800,
    unit: "kq",
    quality: "97%",
    equipment: "Dəyirman #2",
    operator: "Rəşad Məmmədov",
    status: "gözləyir",
  },
  {
    id: 4,
    date: "2024-01-19",
    product: "Premium düyü",
    quantity: 950,
    unit: "kq",
    quality: "99%",
    equipment: "Dəyirman #3",
    operator: "Aygün Əliyeva",
    status: "təsdiqlənib",
  },
  {
    id: 5,
    date: "2024-01-18",
    product: "Standart düyü",
    quantity: 2100,
    unit: "kq",
    quality: "91%",
    equipment: "Dəyirman #1",
    operator: "Elçin Həsənov",
    status: "təsdiqlənib",
  },
  {
    id: 6,
    date: "2024-01-18",
    product: "Yüksək keyfiyyətli düyü",
    quantity: 1650,
    unit: "kq",
    quality: "94%",
    equipment: "Dəyirman #2",
    operator: "Rəşad Məmmədov",
    status: "təsdiqlənib",
  },
  {
    id: 7,
    date: "2024-01-17",
    product: "Standart düyü",
    quantity: 2400,
    unit: "kq",
    quality: "90%",
    equipment: "Dəyirman #1",
    operator: "Elçin Həsənov",
    status: "təsdiqlənib",
  },
  {
    id: 8,
    date: "2024-01-17",
    product: "Premium düyü",
    quantity: 1100,
    unit: "kq",
    quality: "98%",
    equipment: "Dəyirman #3",
    operator: "Aygün Əliyeva",
    status: "təsdiqlənib",
  },
]

export default function DatabasePage() {
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
              <h1 className="text-3xl font-bold tracking-tight">Məlumat Bazası</h1>
              <p className="text-muted-foreground">
                İstehsal məlumatlarının idarəetməsi və axtarışı
              </p>
            </div>

            {/* Filters and Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Axtarış və Filtrlər</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Məhsul, operator və ya avadanlıq üzrə axtar..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Hamısı</SelectItem>
                      <SelectItem value="confirmed">Təsdiqlənib</SelectItem>
                      <SelectItem value="pending">Gözləyir</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Məhsul növü" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Hamısı</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="high">Yüksək keyfiyyətli</SelectItem>
                      <SelectItem value="standard">Standart</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtr
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
              <div className="text-sm text-muted-foreground flex items-center">
                Ümumi: {databaseRecords.length} qeyd
              </div>
            </div>

            {/* Table */}
            <Card>
              <CardHeader>
                <CardTitle>İstehsal Qeydləri</CardTitle>
                <CardDescription>
                  Son istehsal məlumatları və keyfiyyət göstəriciləri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-semibold">Tarix</th>
                        <th className="text-left p-4 font-semibold">Məhsul</th>
                        <th className="text-left p-4 font-semibold">Miqdar</th>
                        <th className="text-left p-4 font-semibold">Keyfiyyət</th>
                        <th className="text-left p-4 font-semibold">Avadanlıq</th>
                        <th className="text-left p-4 font-semibold">Operator</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {databaseRecords.map((record) => (
                        <tr
                          key={record.id}
                          className="border-b hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-4">
                            {new Date(record.date).toLocaleDateString("az-AZ")}
                          </td>
                          <td className="p-4 font-medium">{record.product}</td>
                          <td className="p-4">
                            {record.quantity.toLocaleString()} {record.unit}
                          </td>
                          <td className="p-4">{record.quality}</td>
                          <td className="p-4">{record.equipment}</td>
                          <td className="p-4">{record.operator}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                record.status === "təsdiqlənib"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {record.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Səhifə 1 / 1
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Əvvəlki
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Növbəti
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

