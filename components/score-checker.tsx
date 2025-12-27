"use client";

import * as React from "react";
import { Search, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { api, ApiError } from "@/lib/api";
import { IScoreCheckResult } from "@/lib/types";

export function ScoreChecker() {
  const t = useTranslations("checkScore");
  const tSubjects = useTranslations("subjects");
  const tCommon = useTranslations("common");

  const [sbd, setSbd] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<IScoreCheckResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [notFound, setNotFound] = React.useState<string | null>(null);
  const [validationError, setValidationError] = React.useState<string | null>(
    null
  );

  const validateSBD = (value: string): boolean => {
    // Remove whitespace
    const cleaned = value.trim();

    // Check if empty
    if (!cleaned) {
      setValidationError(t("validationRequired"));
      return false;
    }

    // Check if it's a valid number with 7-8 digits (database has 7 digits)
    if (!/^\d{7,8}$/.test(cleaned)) {
      setValidationError(t("validationFormat"));
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSbd(value);
    if (validationError && value.trim()) {
      validateSBD(value);
    }
  };

  const handleCheck = async () => {
    if (!validateSBD(sbd)) return;

    setLoading(true);
    setError(null);
    setNotFound(null);
    setResult(null);

    try {
      // Send SBD as-is, backend will normalize with padding
      const normalizedSBD = sbd.trim();
      const response = await api.checkScore(normalizedSBD);
      setResult(response.data);
    } catch (err) {
      if (err instanceof ApiError) {
        // Show info message for not found, error for other cases
        if (err.status === 404) {
          setNotFound(t("notFound"));
        } else {
          // For other errors, use generic error message
          setError(t("error"));
        }
      } else {
        setError(t("error"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCheck();
    }
  };

  const subjectLabels: Record<string, string> = {
    toan: tSubjects("toan"),
    ngu_van: tSubjects("ngu_van"),
    ngoai_ngu: tSubjects("ngoai_ngu"),
    vat_li: tSubjects("vat_li"),
    hoa_hoc: tSubjects("hoa_hoc"),
    sinh_hoc: tSubjects("sinh_hoc"),
    lich_su: tSubjects("lich_su"),
    dia_li: tSubjects("dia_li"),
    gdcd: tSubjects("gdcd"),
  };

  const getScoreColor = (score: number): string => {
    if (score >= 8)
      return "text-emerald-600 dark:text-emerald-400 font-semibold";
    if (score >= 6.5) return "text-blue-600 dark:text-blue-400 font-semibold";
    if (score >= 5) return "text-amber-600 dark:text-amber-400";
    return "text-orange-600 dark:text-orange-400";
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            {t("title")}
          </CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sbd">{t("studentNumber")}</Label>
              <div className="flex gap-3">
                <div className="flex-1 space-y-1">
                  <Input
                    id="sbd"
                    placeholder={t("placeholder")}
                    value={sbd}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={validationError ? "border-destructive" : ""}
                    maxLength={8}
                  />
                  {validationError && (
                    <p className="text-sm text-destructive">
                      {validationError}
                    </p>
                  )}
                </div>
                <Button onClick={handleCheck} disabled={loading || !sbd.trim()}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" className="border-white" />
                      <span>{tCommon("loading")}</span>
                    </div>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      {t("button")}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>{tCommon("error")}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Not Found Info Alert */}
      {notFound && (
        <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertTitle className="text-amber-900 dark:text-amber-100">
            {t("studentNumber")}
          </AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-300">
            {notFound}
          </AlertDescription>
        </Alert>
      )}

      {/* Success Result */}
      {result && (
        <div className="space-y-6">
          <Alert className="border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-900">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <AlertTitle className="text-emerald-900 dark:text-emerald-100 font-semibold">
              {t("found")}
            </AlertTitle>
            <AlertDescription className="text-emerald-700 dark:text-emerald-300">
              {t("studentNumber")}:{" "}
              <span className="font-mono font-semibold">{result.sbd}</span>
            </AlertDescription>
          </Alert>

          {/* Scores Table */}
          <Card>
            <CardHeader>
              <CardTitle>{t("scores")}</CardTitle>
              <CardDescription>{t("scoresDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">
                        {t("subject")}
                      </TableHead>
                      <TableHead className="text-right">{t("score")}</TableHead>
                      <TableHead className="text-right">{t("level")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(result.scores).map(([key, value]) => {
                      if (
                        key === "ma_ngoai_ngu" ||
                        value === undefined ||
                        value === null
                      )
                        return null;

                      const numericValue =
                        typeof value === "number"
                          ? value
                          : parseFloat(value as string);
                      const level =
                        numericValue >= 8
                          ? t("excellent")
                          : numericValue >= 6.5
                          ? t("good")
                          : numericValue >= 5
                          ? t("average")
                          : t("poor");

                      return (
                        <TableRow key={key}>
                          <TableCell className="font-medium">
                            {subjectLabels[key] || key}
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={`text-lg font-semibold ${getScoreColor(
                                numericValue
                              )}`}
                            >
                              {typeof value === "number"
                                ? value.toFixed(2)
                                : value}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant={
                                numericValue >= 8
                                  ? "default"
                                  : numericValue >= 6.5
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {level}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
