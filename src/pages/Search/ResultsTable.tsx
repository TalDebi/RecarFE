import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import carImage from "../../assets/toyotaExample.avif";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
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
    renderCell: () => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton aria-label="favoriteIcon">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="optionsIcon">
          <MoreVertIcon />
        </IconButton>
      </Box>
    ),
  },
];

const rows = [
  {
    id: 1,
    picture: carImage,
    make: "Toyota",
    model: "camry",
    year: "2014",
    city: "Holon",
    price: "40000",
  },
  {
    id: 2,
    picture: carImage,
    make: "Toyota",
    model: "camry",
    year: "2014",
    city: "Holon",
    price: "40000",
  },
  {
    id: 3,
    picture: carImage,
    make: "Toyota",
    model: "camry",
    year: "2014",
    city: "Holon",
    price: "40000",
  },
  {
    id: 4,
    picture: carImage,
    make: "Toyota",
    model: "camry",
    year: "2014",
    city: "Holon",
    price: "40000",
  },
];

function ResultsTable() {
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
