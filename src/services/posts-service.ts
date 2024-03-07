import apiClient, { CanceledError } from "./api-client";

export interface SearchQuery {
  make?: string | string[];
  model?: string | string[];
  color?: string | string[];
  city?: string | string[];
  hand?: string | string[];
  year?: {
    max?: number;
    min?: number;
  };
  price?: {
    max?: number;
    min?: number;
  };
  mileage?: {
    max?: number;
    min?: number;
  };
}

export { CanceledError };
export const getAllPosts = (query: SearchQuery) => {
  const abortController = new AbortController();
  const req = apiClient.get("post", {
    signal: abortController.signal,
    params: query,
  });
  return { req, abort: () => abortController.abort() };
};
