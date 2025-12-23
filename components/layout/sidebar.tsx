"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Database,
  FileText,
  LogOut,
  Menu,
  X,
  Building2,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSidebar } from "./sidebar-context";

const menuItems = [
  {
    title: "Statistika",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Avadanlıq Nəzarəti",
    href: "/equipment",
    icon: Video,
  },
  {
    title: "Hesabatlar",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Tikinti Planı",
    href: "/construction",
    icon: Building2,
  },
  {
    title: "Məlumat Bazası",
    href: "/database",
    icon: Database,
  },
  {
    title: "Haqqımızda",
    href: "/about",
    icon: Info,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    isDesktopCollapsed,
    setIsDesktopCollapsed,
    isMobileOpen,
    setIsMobileOpen,
  } = useSidebar();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-card border-r z-40 transition-all duration-300",
          "lg:translate-x-0",
          isMobileOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full lg:translate-x-0",
          isDesktopCollapsed ? "lg:w-20" : "lg:w-64"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Mobile close button */}
          <div className="lg:hidden flex justify-end mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Desktop collapse button - positioned on border */}
          <div
            className={`hidden lg:flex mb-4 ${
              isDesktopCollapsed ? "justify-center" : "justify-end"
            }`}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
              className={`h-8 w-8 bg-muted/60 hover:bg-muted border rounded-md shadow-sm ${
                isDesktopCollapsed ? "" : "-mr-2"
              }`}
            >
              {isDesktopCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Logo/Title */}
          <div className={cn("mb-8", isDesktopCollapsed && "lg:mb-4")}>
            {!isDesktopCollapsed ? (
              <>
                <h1 className="text-2xl font-bold text-primary">
                  Çəltik Dəyirmanı
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Admin Panel
                </p>
              </>
            ) : (
              <div className="flex justify-center">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">ÇD</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isDesktopCollapsed ? "lg:justify-center lg:px-3" : "",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent text-muted-foreground hover:text-foreground"
                  )}
                  title={isDesktopCollapsed ? item.title : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isDesktopCollapsed && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout button */}
          <Button
            variant="outline"
            onClick={handleLogout}
            className={cn(
              "w-full justify-start gap-3",
              isDesktopCollapsed && "lg:justify-center lg:px-3"
            )}
            title={isDesktopCollapsed ? "Çıxış" : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isDesktopCollapsed && <span>Çıxış</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}
