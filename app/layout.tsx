import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "G-Scores - High School Exam Score System",
  description: "Check National High School Exam Scores 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
