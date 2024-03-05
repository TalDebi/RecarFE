export const fetchAllTypes = async (
  filterType: "make" | "model"
): Promise<{ id: number; name: string }[]> =>
  fetch(
    `https://carapi.app/api/${filterType}s?page=1&limit=1000&sort=name`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
