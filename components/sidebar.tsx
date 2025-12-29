"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Search,
  FileText,
  BarChart3,
  Trophy,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

export function Sidebar({
  activeTab,
  onTabChange,
  isMobileOpen,
  onMobileToggle,
}: SidebarProps) {
  const t = useTranslations("nav");

  const navItems = [
    {
      id: "dashboard",
      label: t("dashboard"),
      icon: LayoutDashboard,
      color: "text-slate-700",
    },
    {
      id: "check",
      label: t("checkScore"),
      icon: Search,
      color: "text-blue-600",
    },
    {
      id: "reports",
      label: t("reports"),
      icon: FileText,
      color: "text-emerald-600",
    },
    {
      id: "statistics",
      label: t("statistics"),
      icon: BarChart3,
      color: "text-purple-600",
    },
    { id: "top10", label: t("top10"), icon: Trophy, color: "text-amber-600" },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onMobileToggle}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                G-Scores
              </h1>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            onClick={onMobileToggle}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-1.5 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 font-semibold transition-colors",
                  isActive
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                )}
                onClick={() => {
                  onTabChange(item.id);
                  if (isMobileOpen) onMobileToggle();
                }}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isActive
                      ? ""
                      : `${item.color} dark:${item.color.replace("600", "400")}`
                  )}
                />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/50">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              THPT Quốc Gia 2024
            </p>
            <p className="mt-1">© 2024 G-Scores</p>
          </div>
        </div>
      </aside>

      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-40 lg:hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
        onClick={onMobileToggle}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
}
