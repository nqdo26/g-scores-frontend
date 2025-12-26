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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LoadingCard } from "@/components/ui/loading-spinner";
import { api } from "@/lib/api";
import { IScoreReport, SubjectCode } from "@/lib/types";

const subjects: SubjectCode[] = [
  "toan",
  "ngu_van",
  "ngoai_ngu",
  "vat_li",
  "hoa_hoc",
  "sinh_hoc",
  "lich_su",
  "dia_li",
  "gdcd",
];

export function ScoreReports() {
  const t = useTranslations("reports");
  const tSubjects = useTranslations("subjects");
  const tCommon = useTranslations("common");

  const [selectedSubject, setSelectedSubject] =
    React.useState<SubjectCode>("toan");
  const [loading, setLoading] = React.useState(false);
  const [report, setReport] = React.useState<IScoreReport | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const fetchReport = React.useCallback(
    async (subject: SubjectCode) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.getScoreReport(subject);
        setReport(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : tCommon("error"));
      } finally {
        setLoading(false);
      }
    },
    [tCommon]
  );

  React.useEffect(() => {
    fetchReport(selectedSubject);
  }, [selectedSubject, fetchReport]);

  const levels = [
    {
      key: "excellent",
      label: t("excellent"),
      color: "bg-emerald-600 dark:bg-emerald-500",
    },
    { key: "good", label: t("good"), color: "bg-blue-600 dark:bg-blue-500" },
    {
      key: "average",
      label: t("average"),
      color: "bg-amber-500 dark:bg-amber-500",
    },
    {
      key: "poor",
      label: t("poor"),
      color: "bg-orange-500 dark:bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedSubject}
            onValueChange={(value) => setSelectedSubject(value as SubjectCode)}
          >
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder={t("selectSubject")} />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {tSubjects(subject)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {loading && (
        <Card>
          <CardContent className="pt-6">
            <LoadingCard text={tCommon("loading")} />
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {report && !loading && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{tSubjects(selectedSubject)}</CardTitle>
              <CardDescription>
                {t("totalStudents")}: {report.total.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {levels.map(({ key, label, color }) => {
                  const level =
                    report.levels[key as keyof typeof report.levels];
                  const percentage = parseFloat(level.percentage);

                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {label}
                        </span>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="font-medium">
                            {level.count.toLocaleString()} {t("students")}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="font-semibold min-w-[60px] justify-center"
                          >
                            {level.percentage}
                          </Badge>
                        </div>
                      </div>
                      <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div
                          className={`h-full ${color} transition-all duration-700 flex items-center justify-end px-4`}
                          style={{ width: `${percentage}%` }}
                        >
                          {percentage > 12 && (
                            <span className="text-sm font-bold text-white dark:text-slate-900">
                              {level.percentage}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
