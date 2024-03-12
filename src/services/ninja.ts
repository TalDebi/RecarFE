import { CarExtraInfo } from "./types";

export const fetchExtraCarInfo = async (
  carID: string
): Promise<CarExtraInfo[]> => {
  try {
    const queryParams = new URLSearchParams({
      limit: "1",
      make: "toyota",
      model: "camry",
      year: "2020",
    });

    const url = `https://api.api-ninjas.com/v1/cars?${queryParams.toString()}`;

    const response = await fetch(url, {
      headers: { "X-Api-Key": process.env.API_KEY ?? "" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching extra car info:", error);
    throw error;
  }
};
