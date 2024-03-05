import { CarExtraInfo } from "./types";

export const fetchExtraCarInfo = async (
  carID: string
): Promise<CarExtraInfo[]> =>
  fetch(
    `https://api.api-ninjas.com/v1/cars?limit=${1}&make=${"toyota"}&model=${"camry"}&year=${2020}`,
    { headers: { "X-Api-Key": process.env.API_KEY ?? "" } }
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
