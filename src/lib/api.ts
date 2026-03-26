type JsonRecord = Record<string, unknown>;

const rawBaseUrl =
  (import.meta as unknown as { env?: Record<string, string> }).env
    ?.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api";

export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export const apiUrl = (path: string) =>
  `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;

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
    const message =
      (data && typeof data === "object" && "detail" in data && data.detail) ||
      "Request failed";
    throw new Error(String(message));
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
    const message =
      (data && typeof data === "object" && "detail" in data && data.detail) ||
      "Request failed";
    throw new Error(String(message));
  }

  return data;
}
