const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
  // GET request
  get: <T>(endpoint: string, options?: RequestInit) =>
    fetchAPI<T>(endpoint, { ...options, method: "GET" }),

  // POST request
  post: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    fetchAPI<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  // PUT request
  put: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    fetchAPI<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  // DELETE request
  delete: <T>(endpoint: string, options?: RequestInit) =>
    fetchAPI<T>(endpoint, { ...options, method: "DELETE" }),

  // PATCH request
  patch: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    fetchAPI<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),
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
