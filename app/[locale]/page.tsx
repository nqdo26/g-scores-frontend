"use client";

import * as React from "react";
import { use } from "react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Sidebar } from "@/components/sidebar";
import { DashboardOverview } from "@/components/dashboard-overview";
import { ScoreChecker } from "@/components/score-checker";
import { ScoreReports } from "@/components/score-reports";
import { Statistics } from "@/components/statistics";
import { Top10GroupA } from "@/components/top10-group-a";
import { useTranslations } from "next-intl";

// Import messages
import viMessages from "@/messages/vi.json";
import enMessages from "@/messages/en.json";

const messages: Record<string, any> = {
  vi: viMessages,
  en: enMessages,
};

function DashboardContent({ locale }: { locale: string }) {
  const t = useTranslations("dashboard");
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "check":
        return <ScoreChecker />;
      case "reports":
        return <ScoreReports />;
      case "statistics":
        return <Statistics />;
      case "top10":
        return <Top10GroupA />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobileOpen={isMobileSidebarOpen}
        onMobileToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-backdrop-filter:bg-white/80 dark:supports-backdrop-filter:bg-slate-950/80">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="hidden lg:block">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {t("title")}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("subtitle")}
              </p>
            </div>
            <div className="lg:hidden" />
            <div className="flex items-center gap-3">
              <LanguageSwitcher currentLocale={locale} />
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-10 bg-slate-50/50 dark:bg-slate-950/50 min-h-[calc(100vh-4rem)]">
          <div className="mx-auto max-w-7xl">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: paramLocale } = use(params);
  const locale = paramLocale || "vi";
  const currentMessages = messages[locale] || messages.vi;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextIntlClientProvider
        locale={locale}
        messages={currentMessages}
        timeZone="Asia/Ho_Chi_Minh"
      >
        <DashboardContent locale={locale} />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
