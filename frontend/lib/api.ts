const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export function getApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
}

export async function safeFetchJson(url: string, options: RequestInit = {}) {
  try {
    const res = await fetch(url, {
      credentials: 'include', // Ensures HTTP-only authentication cookies are attached
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      return { ok: res.ok, status: res.status, data };
    }

    const text = await res.text();
    return {
      ok: res.ok,
      status: res.status,
      data: { error: text || `Server returned non-JSON response (${res.status})` },
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 500,
      data: { error: err.message || 'Network error connecting to server.' },
    };
  }
}
