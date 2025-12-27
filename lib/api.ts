const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Base fetch wrapper with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(response.status, `API Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(
      `Network error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * API methods
 */
export const api = {
  /**
   * Check score by registration number (SBD)
   * @param sbd - Student registration number
   */
  checkScore: (sbd: string) =>
    fetchAPI<
      import("./types").ApiResponse<import("./types").IScoreCheckResult>
    >(`/scores/check/${sbd}`),

  /**
   * Get score report by levels for a subject
   * @param subject - Subject code (toan, ngu_van, etc.)
   */
  getScoreReport: (subject: string) =>
    fetchAPI<import("./types").ApiResponse<import("./types").IScoreReport>>(
      `/scores/report/${subject}`
    ),

  /**
   * Get statistics for a subject
   * @param subject - Subject code (toan, ngu_van, etc.)
   */
  getStatistics: (subject: string) =>
    fetchAPI<
      import("./types").ApiResponse<import("./types").ISubjectStatistics>
    >(`/scores/statistics/${subject}`),

  /**
   * Get top 10 students of group A (Math, Physics, Chemistry)
   */
  getTop10GroupA: () =>
    fetchAPI<import("./types").ApiResponse<import("./types").ITopStudent[]>>(
      `/scores/top10/group-a`
    ),
};

/**
 * Example usage:
 *
 * // Get data
 * const scores = await api.get<Score[]>('/api/scores');
 *
 * // Post data
 * const newScore = await api.post<Score>('/api/scores', { name: 'Test', score: 100 });
 *
 * // With error handling
 * try {
 *   const data = await api.get('/api/data');
 * } catch (error) {
 *   if (error instanceof ApiError) {
 *     console.error(`API Error ${error.status}: ${error.message}`);
 *   } else {
 *     console.error('Network error:', error);
 *   }
 * }
 */
