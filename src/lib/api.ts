type JsonRecord = Record<string, unknown>;

const rawBaseUrl =
  (import.meta as unknown as { env?: Record<string, string> }).env
    ?.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api";

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
  const response = await fetch(apiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

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
  const response = await fetch(apiUrl(path), {
    method: "GET",
    headers: { "Accept": "application/json" },
  });

  const data = (await response.json()) as TResponse;

  if (!response.ok) {
    throw new Error(extractErrorMessage(data));
  }

  return data;
}
