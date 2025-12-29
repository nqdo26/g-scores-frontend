const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

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
      let errorMessage = response.statusText;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {}
      throw new ApiError(response.status, errorMessage);
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

export const api = {
  checkScore: (uid: string) =>
    fetchAPI<
      import("./types").ApiResponse<import("./types").IScoreCheckResult>
    >(`/scores/checkScore?uid=${uid}`),

  getScoreReport: (subject: string) =>
    fetchAPI<import("./types").ApiResponse<import("./types").IScoreReport>>(
      `/scores/report/${subject}`
    ),

  getStatistics: (subject: string) =>
    fetchAPI<
      import("./types").ApiResponse<import("./types").ISubjectStatistics>
    >(`/scores/statistics/${subject}`),

  getTop10GroupA: () =>
    fetchAPI<import("./types").ApiResponse<import("./types").ITopStudent[]>>(
      `/scores/top10/group-a`
    ),
};
