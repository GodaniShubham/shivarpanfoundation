type JsonRecord = Record<string, unknown>;
const API_UNAVAILABLE_COOLDOWN_MS = 30000;
let apiUnavailableUntil = 0;

const deriveFallbackBaseUrl = () => {
  if (typeof window === "undefined") {
    return "http://127.0.0.1:8000/api";
  }

  const { hostname, protocol } = window.location;

  if (hostname === "shivarpan-foundation.onrender.com") {
    return "https://shivarpan-foundation-backend.onrender.com/api";
  }

  if (hostname.endsWith(".onrender.com") && !hostname.includes("-backend.")) {
    const derivedHost = hostname.replace(".onrender.com", "-backend.onrender.com");
    return `${protocol}//${derivedHost}/api`;
  }

  return "http://127.0.0.1:8000/api";
};

const rawBaseUrl =
  (import.meta as unknown as { env?: Record<string, string> }).env
    ?.VITE_API_BASE_URL ?? deriveFallbackBaseUrl();

export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");
export const API_ORIGIN = API_BASE_URL.replace(/\/api(?:\/.*)?$/, "").replace(/\/+$/, "");

export const apiUrl = (path: string) =>
  `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;

export const assetUrl = (path?: string | null) => {
  if (!path) {
    return "";
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${API_ORIGIN}/${path.replace(/^\/+/, "")}`;
};

const createApiUnavailableError = () => {
  const error = new Error("API temporarily unavailable");
  error.name = "ApiUnavailableError";
  return error;
};

const shouldSkipRequest = () =>
  typeof window !== "undefined" && Date.now() < apiUnavailableUntil;

const markApiUnavailable = () => {
  apiUnavailableUntil = Date.now() + API_UNAVAILABLE_COOLDOWN_MS;
};

const clearApiUnavailable = () => {
  apiUnavailableUntil = 0;
};

export const isApiUnavailableError = (error: unknown) =>
  error instanceof Error && error.name === "ApiUnavailableError";

const isNetworkError = (error: unknown) =>
  error instanceof TypeError ||
  (error instanceof Error &&
    (error.message === "Failed to fetch" ||
      ("code" in error && error.code === "ERR_NETWORK")));

export const reportApiError = (label: string, error: unknown) => {
  if (isApiUnavailableError(error) || isNetworkError(error)) {
    return;
  }

  console.error(label, error);
};

function extractErrorMessage(data: unknown): string {
  if (Array.isArray(data) && data.length > 0) {
    return data
      .map((item) => extractErrorMessage(item))
      .filter(Boolean)
      .join(", ");
  }

  if (typeof data === "string") {
    return data;
  }

  if (data && typeof data === "object") {
    if ("detail" in data && typeof data.detail === "string") {
      return data.detail;
    }

    const values = Object.values(data)
      .map((item) => extractErrorMessage(item))
      .filter(Boolean);

    if (values.length > 0) {
      return values.join(", ");
    }
  }

  return "Request failed";
}

export async function postJson<TResponse = JsonRecord>(
  path: string,
  payload: JsonRecord
): Promise<TResponse> {
  if (shouldSkipRequest()) {
    throw createApiUnavailableError();
  }

  let response: Response;
  try {
    response = await fetch(apiUrl(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    clearApiUnavailable();
  } catch (error) {
    if (isNetworkError(error)) {
      markApiUnavailable();
      throw createApiUnavailableError();
    }
    throw error;
  }

  let data: TResponse | JsonRecord | null = null;
  try {
    data = (await response.json()) as TResponse;
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(extractErrorMessage(data));
  }

  return data as TResponse;
}

export async function getJson<TResponse = JsonRecord>(path: string): Promise<TResponse> {
  if (shouldSkipRequest()) {
    throw createApiUnavailableError();
  }

  let response: Response;
  try {
    response = await fetch(apiUrl(path), {
      method: "GET",
      headers: { "Accept": "application/json" },
    });
    clearApiUnavailable();
  } catch (error) {
    if (isNetworkError(error)) {
      markApiUnavailable();
      throw createApiUnavailableError();
    }
    throw error;
  }

  let data: TResponse | JsonRecord | null = null;
  try {
    data = (await response.json()) as TResponse;
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(extractErrorMessage(data));
  }

  return data as TResponse;
}
