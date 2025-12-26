"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Users, TrendingUp, Award } from "lucide-react";

export function DashboardOverview() {
  const t = useTranslations("dashboard");
  const tNav = useTranslations("nav");
  const tApp = useTranslations("app");

  const stats = [
    {
      title: t("checkScoreCard"),
      description: t("checkScoreDesc"),
      icon: BarChart3,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950/30",
    },
    {
      title: t("reportsCard"),
      description: t("reportsDesc"),
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-950/30",
    },
    {
      title: t("statisticsCard"),
      description: t("statisticsDesc"),
      icon: Users,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-950/30",
    },
    {
      title: t("top10Card"),
      description: t("top10Desc"),
      icon: Award,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-950/30",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {tApp("title")}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-base">
          {tApp("description")}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="hover:shadow-sm transition-all border-slate-200 dark:border-slate-800"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold tracking-tight">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-lg p-2.5 ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl font-semibold">
            {t("welcome")}
          </CardTitle>
          <CardDescription className="text-base">
            {t("systemDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base">
              {t("userGuide")}
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm">
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {tNav("checkScore")}:
                  </span>{" "}
                  <span className="text-slate-600 dark:text-slate-400">
                    {t("guideCheckScore")}
                  </span>
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {tNav("reports")}:
                  </span>{" "}
                  <span className="text-slate-600 dark:text-slate-400">
                    {t("guideReports")}
                  </span>
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {tNav("statistics")}:
                  </span>{" "}
                  <span className="text-slate-600 dark:text-slate-400">
                    {t("guideStatistics")}
                  </span>
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {tNav("top10")}:
                  </span>{" "}
                  <span className="text-slate-600 dark:text-slate-400">
                    {t("guideTop10")}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
