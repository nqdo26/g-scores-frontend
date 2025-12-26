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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingCard } from "@/components/ui/loading-spinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { api } from "@/lib/api";
import { ISubjectStatistics, SubjectCode } from "@/lib/types";

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

const COLORS = {
  excellent: "hsl(142, 71%, 45%)", // Emerald green
  good: "hsl(217, 91%, 60%)", // Blue
  average: "hsl(45, 93%, 58%)", // Amber
  poor: "hsl(12, 76%, 61%)", // Orange-red
};

export function Statistics() {
  const t = useTranslations("statistics");
  const tSubjects = useTranslations("subjects");
  const tCommon = useTranslations("common");
  const tReports = useTranslations("reports");

  const [selectedSubject, setSelectedSubject] =
    React.useState<SubjectCode>("toan");
  const [loading, setLoading] = React.useState(false);
  const [stats, setStats] = React.useState<ISubjectStatistics | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const fetchStatistics = React.useCallback(
    async (subject: SubjectCode) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.getStatistics(subject);
        setStats(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : tCommon("error"));
      } finally {
        setLoading(false);
      }
    },
    [tCommon]
  );

  React.useEffect(() => {
    fetchStatistics(selectedSubject);
  }, [selectedSubject, fetchStatistics]);

  const chartData = stats
    ? [
        {
          name: tReports("excellent"),
          value: stats.distribution.excellent,
          color: COLORS.excellent,
          percentage: (
            (stats.distribution.excellent / stats.total) *
            100
          ).toFixed(1),
        },
        {
          name: tReports("good"),
          value: stats.distribution.good,
          color: COLORS.good,
          percentage: ((stats.distribution.good / stats.total) * 100).toFixed(
            1
          ),
        },
        {
          name: tReports("average"),
          value: stats.distribution.average,
          color: COLORS.average,
          percentage: (
            (stats.distribution.average / stats.total) *
            100
          ).toFixed(1),
        },
        {
          name: tReports("poor"),
          value: stats.distribution.poor,
          color: COLORS.poor,
          percentage: ((stats.distribution.poor / stats.total) * 100).toFixed(
            1
          ),
        },
      ]
    : [];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-3 shadow-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            {tReports("students")}:{" "}
            <span className="font-semibold">
              {payload[0].value.toLocaleString()}
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            {t("percentage")}:{" "}
            <span className="font-semibold">
              {payload[0].payload.percentage}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

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

      {stats && !loading && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>{t("total")}</CardDescription>
                <CardTitle className="text-3xl">
                  {stats.total.toLocaleString()}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>{t("average")}</CardDescription>
                <CardTitle className="text-3xl">
                  {stats.average.toFixed(2)}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>{t("highest")}</CardDescription>
                <CardTitle className="text-3xl">
                  {stats.highest.toFixed(2)}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>{t("lowest")}</CardDescription>
                <CardTitle className="text-3xl">
                  {stats.lowest.toFixed(2)}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>{t("median")}</CardDescription>
                <CardTitle className="text-3xl">
                  {stats.median.toFixed(2)}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("distribution")}</CardTitle>
              <CardDescription>{tSubjects(selectedSubject)}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bar" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="bar">{t("barChart")}</TabsTrigger>
                  <TabsTrigger value="pie">{t("pieChart")}</TabsTrigger>
                  <TabsTrigger value="line">{t("lineChart")}</TabsTrigger>
                </TabsList>

                {/* Bar Chart */}
                <TabsContent value="bar">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis
                        dataKey="name"
                        className="text-xs"
                        tick={{ fill: "hsl(var(--foreground))" }}
                      />
                      <YAxis
                        className="text-xs"
                        tick={{ fill: "hsl(var(--foreground))" }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar
                        dataKey="value"
                        name={tReports("students")}
                        radius={[8, 8, 0, 0]}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>

                {/* Pie Chart */}
                <TabsContent value="pie">
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(props) => {
                          const item = chartData.find(
                            (d) => d.name === props.name
                          );
                          return `${props.name}: ${item?.percentage || 0}%`;
                        }}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </TabsContent>

                {/* Line Chart */}
                <TabsContent value="line">
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis
                        dataKey="name"
                        className="text-xs"
                        tick={{ fill: "hsl(var(--foreground))" }}
                      />
                      <YAxis
                        className="text-xs"
                        tick={{ fill: "hsl(var(--foreground))" }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        name={tReports("students")}
                        dot={{ fill: "hsl(var(--primary))", r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>

              {/* Summary Stats */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {chartData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-2xl font-bold">
                        {item.value.toLocaleString()}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      style={{ borderColor: item.color, color: item.color }}
                    >
                      {item.percentage}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
