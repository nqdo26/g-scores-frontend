/**
 * Common API response types
 */

// Generic API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Error response
export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

/**
 * Example domain types - customize based on your backend
 */

// User type
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Score type (example for G-Scores project)
export interface Score {
  id: string;
  userId: string;
  score: number;
  subject?: string;
  date: string;
  createdAt: string;
}

// Add more types based on your backend API models
