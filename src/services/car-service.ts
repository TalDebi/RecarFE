import apiClient from "./api-client";

export const editCar = (carId: string, car: any) => {
  const abortController = new AbortController();
  const req = apiClient.put("car/" + carId, car, {
    signal: abortController.signal,
  });
  return { req, abort: () => abortController.abort() };
};
