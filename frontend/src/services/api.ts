import type {
  UserProfile,
  AssessmentResponse,
  HealthResponse,
  JobRole,
} from '../types/career';

// Dynamic API Base URL supporting VITE_API_BASE_URL (Render backend in production)
// Defaults to '/api' for local development with Vite proxy.
const rawBase = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() || '/api';
const cleanBase = rawBase.replace(/\/+$/, '');
export const API_BASE = cleanBase.endsWith('/api') ? cleanBase : `${cleanBase}/api`;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) {
    throw new ApiError(`Health check failed with status ${res.status}`, res.status);
  }
  return res.json();
}

export async function fetchRoles(): Promise<JobRole[]> {
  const res = await fetch(`${API_BASE}/roles`);
  if (!res.ok) {
    throw new ApiError(`Failed to fetch roles: ${res.statusText}`, res.status);
  }
  return res.json();
}

export async function fetchRoleById(roleId: string): Promise<JobRole> {
  const res = await fetch(`${API_BASE}/roles/${encodeURIComponent(roleId)}`);
  if (!res.ok) {
    throw new ApiError(`Role not found: ${res.statusText}`, res.status);
  }
  return res.json();
}

export async function submitAssessment(
  profile: UserProfile
): Promise<AssessmentResponse> {
  const res = await fetch(`${API_BASE}/assess`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });

  if (!res.ok) {
    let errorDetail = 'Assessment request failed';
    try {
      const errorJson = await res.json();
      if (errorJson.detail) {
        errorDetail = Array.isArray(errorJson.detail)
          ? errorJson.detail.map((d: any) => d.msg || d).join(', ')
          : errorJson.detail;
      }
    } catch {
      errorDetail = `HTTP ${res.status}: ${res.statusText}`;
    }
    throw new ApiError(errorDetail, res.status);
  }

  return res.json();
}
