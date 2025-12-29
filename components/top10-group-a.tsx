"use client";

import * as React from "react";
import { Trophy, Medal, Award, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { api } from "@/lib/api";
import { ITopStudent } from "@/lib/types";

export function Top10GroupA() {
  const t = useTranslations("top10");
  const tCommon = useTranslations("common");

  const [loading, setLoading] = React.useState(true);
  const [students, setStudents] = React.useState<ITopStudent[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchTop10 = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.getTop10GroupA();
        setStudents(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : tCommon("error"));
      } finally {
        setLoading(false);
      }
    };

    fetchTop10();
  }, [tCommon]);

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <Trophy className="h-5 w-5 text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400" />
        );
      case 2:
        return (
          <Medal className="h-5 w-5 text-slate-400 dark:text-slate-500 fill-slate-400 dark:fill-slate-500" />
        );
      case 3:
        return (
          <Award className="h-5 w-5 text-amber-600 dark:text-amber-500 fill-amber-600 dark:fill-amber-500" />
        );
      default:
        return null;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    if (rank === 1) return "default";
    if (rank <= 3) return "secondary";
    return "outline";
  };

  const getRowClassName = (rank: number) => {
    if (rank === 1)
      return "bg-slate-50 dark:bg-slate-900/20 hover:bg-slate-100 dark:hover:bg-slate-900/30 border-l-4 border-l-slate-700 dark:border-l-slate-400";
    if (rank === 2)
      return "bg-slate-50/50 dark:bg-slate-900/10 hover:bg-slate-100/70 dark:hover:bg-slate-900/20 border-l-2 border-l-slate-500";
    if (rank === 3)
      return "bg-slate-50/30 dark:bg-slate-900/5 hover:bg-slate-100/50 dark:hover:bg-slate-900/15 border-l-2 border-l-slate-400";
    return "hover:bg-slate-50/30 dark:hover:bg-slate-900/5";
  };

  const getScoreColor = (score: number) => {
    if (score >= 9)
      return "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white dark:from-emerald-600 dark:to-emerald-700 font-semibold";
    if (score >= 8)
      return "bg-gradient-to-br from-blue-500 to-blue-600 text-white dark:from-blue-600 dark:to-blue-700";
    if (score >= 7)
      return "bg-gradient-to-br from-amber-500 to-amber-600 text-white dark:from-amber-600 dark:to-amber-700";
    return "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200";
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader className="space-y-3">
          <CardTitle className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
            <div className="rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-950/30 dark:to-yellow-950/30 p-2.5 border border-amber-200 dark:border-amber-900">
              <Trophy className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            {t("title")}
          </CardTitle>
          <CardDescription className="text-base text-slate-600 dark:text-slate-400">
            {t("description")}
          </CardDescription>
        </CardHeader>
      </Card>

      {!loading && !error && students.length > 0 && (
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900">
          <Star className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-900 dark:text-blue-100 font-semibold">
            {t("infoTitle")}
          </AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            {t("infoDescription")}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="pt-6">
          {loading && (
            <div className="text-center py-12">
              <LoadingSpinner size="lg" text={tCommon("loading")} />
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>{tCommon("error")}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!loading && !error && students.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 mx-auto text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">{tCommon("noData")}</p>
            </div>
          )}

          {!loading && !error && students.length > 0 && (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[100px] font-semibold">
                      {t("rank")}
                    </TableHead>
                    <TableHead className="font-semibold">
                      {t("studentNumber")}
                    </TableHead>
                    <TableHead className="text-right font-semibold">
                      {t("math")}
                    </TableHead>
                    <TableHead className="text-right font-semibold">
                      {t("physics")}
                    </TableHead>
                    <TableHead className="text-right font-semibold">
                      {t("chemistry")}
                    </TableHead>
                    <TableHead className="text-right font-semibold text-primary">
                      {t("total")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow
                      key={student.sbd}
                      className={getRowClassName(student.rank)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getMedalIcon(student.rank)}
                          <Badge
                            variant={getRankBadgeVariant(student.rank)}
                            className="text-base font-bold min-w-[2rem] justify-center"
                          >
                            {student.rank}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono font-semibold text-base">
                          {student.sbd}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={`font-semibold ${getScoreColor(
                            student.scores.toan
                          )}`}
                          variant="secondary"
                        >
                          {student.scores.toan.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={`font-semibold ${getScoreColor(
                            student.scores.vat_li
                          )}`}
                          variant="secondary"
                        >
                          {student.scores.vat_li.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={`font-semibold ${getScoreColor(
                            student.scores.hoa_hoc
                          )}`}
                          variant="secondary"
                        >
                          {student.scores.hoa_hoc.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {student.rank === 1 && (
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          )}
                          <Badge
                            className="font-bold text-lg px-3 py-1"
                            variant={student.rank === 1 ? "default" : "outline"}
                          >
                            {student.total.toFixed(2)}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
