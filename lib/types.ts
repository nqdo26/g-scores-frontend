export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

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

export interface IScoreReport {
  subject: string;
  levels: {
    excellent: { count: number; percentage: string };
    good: { count: number; percentage: string };
    average: { count: number; percentage: string };
    poor: { count: number; percentage: string };
  };
  total: number;
}

export interface ISubjectStatistics {
  subject: string;
  total: number;
  average: number;
  highest: number;
  lowest: number;
  median: number;
  distribution: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
  };
}

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
