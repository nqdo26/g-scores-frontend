/**
 * Common API response types
 */

// Generic API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Error response
export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

/**
 * G-Scores Project Types - Based on Backend API
 */

// Subject scores
export interface ISubjectScores {
  toan?: number;
  ngu_van?: number;
  ngoai_ngu?: number;
  vat_li?: number;
  hoa_hoc?: number;
  sinh_hoc?: number;
  lich_su?: number;
  dia_li?: number;
  gdcd?: number;
  ma_ngoai_ngu?: string;
}

// Score check result
export interface IScoreCheckResult {
  sbd: string;
  scores: {
    [key: string]: number | string | undefined;
  };
  groupA?: {
    total: number | null;
    subjects: {
      toan?: number;
      vat_li?: number;
      hoa_hoc?: number;
    };
  };
}

// Score report by levels
export interface IScoreReport {
  subject: string;
  levels: {
    excellent: { count: number; percentage: string }; // >= 8
    good: { count: number; percentage: string }; // >= 6 & < 8
    average: { count: number; percentage: string }; // >= 4 & < 6
    poor: { count: number; percentage: string }; // < 4
  };
  total: number;
}

// Subject statistics
export interface ISubjectStatistics {
  subject: string;
  total: number;
  average: number;
  highest: number;
  lowest: number;
  median: number;
  distribution: {
    excellent: number; // >= 8
    good: number; // >= 6 & < 8
    average: number; // >= 4 & < 6
    poor: number; // < 4
  };
}

// Top student
export interface ITopStudent {
  rank: number;
  sbd: string;
  total: number;
  scores: {
    toan: number;
    vat_li: number;
    hoa_hoc: number;
  };
}

// Subject options for dropdowns
export type SubjectCode =
  | "toan"
  | "ngu_van"
  | "ngoai_ngu"
  | "vat_li"
  | "hoa_hoc"
  | "sinh_hoc"
  | "lich_su"
  | "dia_li"
  | "gdcd";

// Add more types based on your backend API models
