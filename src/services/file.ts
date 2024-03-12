import apiClient from "./api-client";

interface UpoloadResponse {
  url: string;
}

export const uploadPhoto = async (photo: File): Promise<string> => {
  const formData = new FormData();
  if (photo) {
    formData.append("file", photo);
    const response = await apiClient.post<UpoloadResponse>("file", formData, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
    console.log(response);
    return response.data.url;
  } else {
    throw new Error("No photo provided");
  }
};
