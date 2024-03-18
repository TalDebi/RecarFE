import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router";

const columns: GridColDef[] = [
  {
    field: "picture",
    headerName: "",
    width: 250,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box
        component="img"
        sx={{ width: 250, pr: 5 }}
        src={params.value}
        alt="no image provided"
      />
    ),
  },
  {
    field: "make",
    headerName: "יצרן",
    width: 150,
  },
  {
    field: "model",
    headerName: "דגם",
    width: 150,
  },
  {
    field: "year",
    headerName: "שנה",
    width: 100,
  },
  {
    field: "city",
    headerName: "איזור מכירה",
    width: 150,
  },
  {
    field: "price",
    headerName: "מחיר",
    width: 200,
    valueGetter: (params: GridValueGetterParams): string =>
      `₪ ${params.row.price || ""}`,
  },
  {
    field: "options",
    headerName: "",
    width: 375,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton
          onClick={() => params.row.handleFavorite(params.row.id)}
          aria-label="favoriteIcon"
        >
          {params.row.isFavorite ? (
            <Favorite color="error" />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
        <IconButton aria-label="optionsIcon">
          <MoreVertIcon />
        </IconButton>
      </Box>
    ),
  },
];

function ResultsTable({
  rows,
}: {
  rows: {
    _id: string;
    make: string;
    model: string;
    year: string;
    city: string;
    price: string;
    picture: string;
  }[];
}) {
  const navigate = useNavigate();

  const handleRowDoubleclick = (carID: number): void => {
    navigate(`../Car/${carID}`, { replace: true });
  };
  return (
    <Box sx={{ height: 395, width: "100%", backgroundColor: "white" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        hideFooter
        getRowHeight={(): number => 100}
        onCellDoubleClick={(data): void => handleRowDoubleclick(data.row.id)}
      />
    </Box>
  );
}

export default ResultsTable;
