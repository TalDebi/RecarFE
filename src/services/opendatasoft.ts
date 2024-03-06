export const fetchAllTypes = async (
  filterType: "make" | "model"
): Promise<{ results: [] }> => {
  try {
    const queryParams = new URLSearchParams({
      group_by: filterType,
      limit: "5000",
    });

    const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?${queryParams.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
