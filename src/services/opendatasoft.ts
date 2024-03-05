export const fetchAllTypes = async (
  filterType: "make" | "model"
): Promise<{ results: [] }> =>
  fetch(
    `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?group_by=${filterType}&limit=5000`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
