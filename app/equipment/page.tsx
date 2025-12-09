"use client";

import { useEffect, useMemo } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Play, Pause, AlertCircle, CheckCircle2, Wrench } from "lucide-react";

// Çəltik dəyirmanı avadanlıqları (PDF-dəki məlumatlara əsasən - 20 ədəd)
const equipment = [
  {
    id: 1,
    name: "TQLZ100 - Titrəmə Təmizləyicisi",
    type: "Təmizləmə",
    status: "active",
    workload: 88,
    location: "Hissə A - Təmizləmə",
    capacity: "6-12 ton/saat",
    price: "2,500 $",
    description:
      "Titrəyən ələk vasitəsilə iri, kiçik və yüngül çirkləri ayırır. Düyü, buğda və digər taxılın ilkin təmizlənməsi üçün.",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-02-15",
    videoUrl:
      "https://via.placeholder.com/640x360?text=TQLZ100+Titrəmə+Təmizləyicisi",
  },
  {
    id: 2,
    name: "TQSX100 - Destoner",
    type: "Təmizləmə",
    status: "active",
    workload: 85,
    location: "Hissə A - Təmizləmə",
    capacity: "Daş və ağır çirk ayrılması",
    price: "2,000 $",
    description:
      "Taxıl, düyü və paxlalı məhsullardan daşları və ağır çirkləri ayırmaq üçün. Vibrasiya lövhəsi ilə çəkisinə görə ayrılma.",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-02-10",
    videoUrl: "https://via.placeholder.com/640x360?text=TQSX100+Destoner",
  },
  {
    id: 3,
    name: "MLGT36 - Husker",
    type: "Emal",
    status: "active",
    workload: 92,
    location: "Hissə B - Emal",
    capacity: "Düyü qabığı soyma",
    price: "2,500 $",
    description:
      "Düyünün qabığını soyur. Silindrik tambur/rulonlar arasında hərəkət edərək qabığı düyü dənəsindən ayırır.",
    lastMaintenance: "2024-01-12",
    nextMaintenance: "2024-02-12",
    videoUrl: "https://via.placeholder.com/640x360?text=MLGT36+Husker",
  },
  {
    id: 4,
    name: "MGCZ100x12 - Çəltik Separatoru",
    type: "Sıralama",
    status: "active",
    workload: 90,
    location: "Hissə C - Sıralama",
    capacity: "Ölçü və qalınlıq ayrılması",
    price: "2,000 $",
    description:
      "Vibrasiya lövhəsi ilə taxıl ölçü və qalınlıq fərqinə görə fərqli çıxışlara yönləndirilir. Böyük, orta və kiçik dənələr ayrılır.",
    lastMaintenance: "2024-01-14",
    nextMaintenance: "2024-02-14",
    videoUrl: "https://via.placeholder.com/640x360?text=MGCZ100x12+Separator",
  },
  {
    id: 5,
    name: "MNSW18 - Düyü Ağardıcısı #1",
    type: "Ağardılma",
    status: "active",
    workload: 87,
    location: "Hissə D - Ağardılma",
    capacity: "Qabıq qalıqları təmizləmə",
    price: "2,600 $",
    description:
      "Təmizlənmiş düyü dənələrini sürtünmə və yüngül təzyiq vasitəsilə qabıq qalıqlarından və səthi ləkələrdən təmizləyir.",
    lastMaintenance: "2024-01-16",
    nextMaintenance: "2024-02-16",
    videoUrl: "https://via.placeholder.com/640x360?text=MNSW18+Ağardıcı+1",
  },
  {
    id: 6,
    name: "MNSW18 - Düyü Ağardıcısı #2",
    type: "Ağardılma",
    status: "active",
    workload: 85,
    location: "Hissə D - Ağardılma",
    capacity: "Qabıq qalıqları təmizləmə",
    price: "2,600 $",
    description:
      "Təmizlənmiş düyü dənələrini sürtünmə və yüngül təzyiq vasitəsilə qabıq qalıqlarından və səthi ləkələrdən təmizləyir.",
    lastMaintenance: "2024-01-17",
    nextMaintenance: "2024-02-17",
    videoUrl: "https://via.placeholder.com/640x360?text=MNSW18+Ağardıcı+2",
  },
  {
    id: 7,
    name: "MNSW18 - Düyü Ağardıcısı #3",
    type: "Ağardılma",
    status: "maintenance",
    workload: 0,
    location: "Hissə D - Ağardılma",
    capacity: "Qabıq qalıqları təmizləmə",
    price: "2,600 $",
    description:
      "Təmizlənmiş düyü dənələrini sürtünmə və yüngül təzyiq vasitəsilə qabıq qalıqlarından və səthi ləkələrdən təmizləyir.",
    lastMaintenance: "2024-01-25",
    nextMaintenance: "2024-01-30",
    videoUrl: "https://via.placeholder.com/640x360?text=MNSW18+Ağardıcı+3",
  },
  {
    id: 8,
    name: "MJP100x4 - Düyü Qreyderi",
    type: "Sıralama",
    status: "active",
    workload: 82,
    location: "Hissə E - Keyfiyyət",
    capacity: "Ölçü və keyfiyyət çeşidləmə",
    price: "5,200 $",
    description:
      "Düyü dənələrini ölçü və keyfiyyətinə görə çeşidləmək üçün istifadə olunur.",
    lastMaintenance: "2024-01-18",
    nextMaintenance: "2024-02-18",
    videoUrl: "https://via.placeholder.com/640x360?text=MJP100x4+Qreyder",
  },
  {
    id: 9,
    name: "Kovan LDT 150 - Qablaşdırma #1",
    type: "Qablaşdırma",
    status: "active",
    workload: 75,
    location: "Hissə F - Qablaşdırma",
    capacity: "Avtomatik qablaşdırma",
    price: "6,000 $",
    description:
      "Düyü və taxıl emalı zavodlarında istifadə olunan avtomatik qablaşdırma maşını.",
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-02-20",
    videoUrl: "https://via.placeholder.com/640x360?text=Kovan+LDT150+1",
  },
  {
    id: 10,
    name: "Kovan LDT 150 - Qablaşdırma #2",
    type: "Qablaşdırma",
    status: "active",
    workload: 78,
    location: "Hissə F - Qablaşdırma",
    capacity: "Avtomatik qablaşdırma",
    price: "6,000 $",
    description:
      "Düyü və taxıl emalı zavodlarında istifadə olunan avtomatik qablaşdırma maşını.",
    lastMaintenance: "2024-01-21",
    nextMaintenance: "2024-02-21",
    videoUrl: "https://via.placeholder.com/640x360?text=Kovan+LDT150+2",
  },
  {
    id: 11,
    name: "Kovan LDT 150 - Qablaşdırma #3",
    type: "Qablaşdırma",
    status: "active",
    workload: 80,
    location: "Hissə F - Qablaşdırma",
    capacity: "Avtomatik qablaşdırma",
    price: "6,000 $",
    description:
      "Düyü və taxıl emalı zavodlarında istifadə olunan avtomatik qablaşdırma maşını.",
    lastMaintenance: "2024-01-22",
    nextMaintenance: "2024-02-22",
    videoUrl: "https://via.placeholder.com/640x360?text=Kovan+LDT150+3",
  },
  {
    id: 12,
    name: "Kovan LDT 150 - Qablaşdırma #4",
    type: "Qablaşdırma",
    status: "active",
    workload: 77,
    location: "Hissə F - Qablaşdırma",
    capacity: "Avtomatik qablaşdırma",
    price: "6,000 $",
    description:
      "Düyü və taxıl emalı zavodlarında istifadə olunan avtomatik qablaşdırma maşını.",
    lastMaintenance: "2024-01-23",
    nextMaintenance: "2024-02-23",
    videoUrl: "https://via.placeholder.com/640x360?text=Kovan+LDT150+4",
  },
  {
    id: 13,
    name: "Düyü Quruducusu #1",
    type: "Qurutma",
    status: "active",
    workload: 90,
    location: "Hissə G - Qurutma",
    capacity: "Çəltik qurutma",
    price: "3,000 $",
    description: "Çəltik dənələrini qurutmaq üçün istifadə olunan avadanlıq.",
    lastMaintenance: "2024-01-08",
    nextMaintenance: "2024-02-08",
    videoUrl: "https://via.placeholder.com/640x360?text=Quruducu+1",
  },
  {
    id: 14,
    name: "Düyü Quruducusu #2",
    type: "Qurutma",
    status: "active",
    workload: 88,
    location: "Hissə G - Qurutma",
    capacity: "Çəltik qurutma",
    price: "3,000 $",
    description: "Çəltik dənələrini qurutmaq üçün istifadə olunan avadanlıq.",
    lastMaintenance: "2024-01-09",
    nextMaintenance: "2024-02-09",
    videoUrl: "https://via.placeholder.com/640x360?text=Quruducu+2",
  },
  {
    id: 15,
    name: "Düyü Quruducusu #3",
    type: "Qurutma",
    status: "active",
    workload: 85,
    location: "Hissə G - Qurutma",
    capacity: "Çəltik qurutma",
    price: "3,000 $",
    description: "Çəltik dənələrini qurutmaq üçün istifadə olunan avadanlıq.",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-02-10",
    videoUrl: "https://via.placeholder.com/640x360?text=Quruducu+3",
  },
  {
    id: 16,
    name: "Düyü Quruducusu #4",
    type: "Qurutma",
    status: "active",
    workload: 87,
    location: "Hissə G - Qurutma",
    capacity: "Çəltik qurutma",
    price: "3,000 $",
    description: "Çəltik dənələrini qurutmaq üçün istifadə olunan avadanlıq.",
    lastMaintenance: "2024-01-11",
    nextMaintenance: "2024-02-11",
    videoUrl: "https://via.placeholder.com/640x360?text=Quruducu+4",
  },
  {
    id: 17,
    name: "Tozsorucu",
    type: "Təmizləmə",
    status: "active",
    workload: 70,
    location: "Ümumi - Tozsuzlaşdırma",
    capacity: "Toz və çirk ayrılması",
    price: "5,500 $",
    description:
      "Zavodda toz və çirkləri təmizləmək üçün istifadə olunan sistem.",
    lastMaintenance: "2024-01-19",
    nextMaintenance: "2024-02-19",
    videoUrl: "https://via.placeholder.com/640x360?text=Tozsorucu",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          İşləyir
        </Badge>
      );
    case "maintenance":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600">
          <Wrench className="h-3 w-3 mr-1" />
          Təmir
        </Badge>
      );
    case "inactive":
      return (
        <Badge className="bg-red-500 hover:bg-red-600">
          <AlertCircle className="h-3 w-3 mr-1" />
          Dayanıb
        </Badge>
      );
    default:
      return null;
  }
};

const getWorkloadColor = (workload: number) => {
  if (workload >= 80) return "text-green-600";
  if (workload >= 50) return "text-yellow-600";
  return "text-red-600";
};

export default function EquipmentPage() {
  const router = useRouter();
  const { isDesktopCollapsed } = useSidebar();

  // 5 təsadüfi avadanlıq ID-si seç (video göstərmək üçün)
  const videoEquipmentIds = useMemo(() => {
    const ids = equipment.map((item) => item.id);
    const shuffled = [...ids].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, []);

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
                Avadanlıq Nəzarəti
              </h1>
              <p className="text-muted-foreground">
                Avadanlıqların video nəzarəti və iş yükü məlumatları
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {equipment.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription>{item.location}</CardDescription>
                        {item.type && (
                          <Badge variant="outline" className="mt-1">
                            {item.type}
                          </Badge>
                        )}
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Description */}
                    {item.description && (
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    )}

                    {/* Video Player - yalnız 5 təsadüfi kartda */}
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                      {videoEquipmentIds.includes(item.id) ? (
                        <>
                          <video
                            src="/videos/avadanliq.mp4"
                            className="w-full h-full object-cover cursor-pointer"
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            onClick={(e) => {
                              e.preventDefault();
                              const video = e.currentTarget;
                              if (!video.paused) {
                                video.pause();
                              }
                            }}
                          >
                            Sizin brauzer video elementini dəstəkləmir.
                          </video>
                          {item.status === "active" && (
                            <div className="absolute top-2 right-2 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium z-10 pointer-events-none">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              CANLI
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <img
                            src={item.videoUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            {item.status === "active" ? (
                              <div className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                CANLI
                              </div>
                            ) : (
                              <Pause className="h-8 w-8 text-white/50" />
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Capacity and Price */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {item.capacity && (
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground text-xs">
                            Güc
                          </div>
                          <div className="font-semibold">{item.capacity}</div>
                        </div>
                      )}
                      {item.price && (
                        <div className="p-2 bg-muted rounded">
                          <div className="text-muted-foreground text-xs">
                            Qiymət
                          </div>
                          <div className="font-semibold">{item.price}</div>
                        </div>
                      )}
                    </div>

                    {/* Workload */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">İş Yükü</span>
                        <span
                          className={`font-semibold ${getWorkloadColor(
                            item.workload
                          )}`}
                        >
                          {item.workload}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            item.workload >= 80
                              ? "bg-green-500"
                              : item.workload >= 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${item.workload}%` }}
                        />
                      </div>
                    </div>

                    {/* Maintenance Info */}
                    <div className="pt-2 border-t space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Son Təmir:
                        </span>
                        <span className="font-medium">
                          {new Date(item.lastMaintenance).toLocaleDateString(
                            "az-AZ"
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Növbəti Təmir:
                        </span>
                        <span className="font-medium">
                          {new Date(item.nextMaintenance).toLocaleDateString(
                            "az-AZ"
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Ümumi Avadanlıq</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{equipment.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>İşləyən</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {equipment.filter((e) => e.status === "active").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Təmirdə</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {equipment.filter((e) => e.status === "maintenance").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Orta İş Yükü</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      equipment
                        .filter((e) => e.status === "active")
                        .reduce((sum, e) => sum + e.workload, 0) /
                        equipment.filter((e) => e.status === "active").length
                    ) || 0}
                    %
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
