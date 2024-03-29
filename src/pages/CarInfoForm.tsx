import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Badge,
  Box,
  Grid,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import EditIcon from "@mui/icons-material/Edit";
import RecarDialog from "../customComponents/RecarDialog";
import { FieldValues, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { fetchAllTypes } from "../services/opendatasoft";
import { uploadPhoto } from "../services/file";
import { CarInterface } from "./Car/Car";

interface defaultValue {
  [key: string]: string | number | string[];
}

interface CarInfoFormProps {
  defaultValues?: defaultValue;
  open: boolean;
  setOpen: (open: boolean) => void;
  dialogType: "Creation" | "Edit";
  dialogTitle: string;
  submitRequest: Function;
  isSubmitLoading: boolean;
}

const CarInfoForm = ({
  defaultValues,
  open,
  setOpen,
  dialogTitle,
  dialogType,
  submitRequest,
  isSubmitLoading,
}: CarInfoFormProps) => {
  const theme = useTheme();
  const [imagesSrc, setImagesSrc] = useState<(File | string)[]>(
    defaultValues && Array.isArray(defaultValues.imgsUrls)
      ? [...defaultValues.imgsUrls]
      : []
  );

  useEffect(() => {
    defaultValues &&
      Array.isArray(defaultValues.imgsUrls) &&
      setImagesSrc([...defaultValues.imgsUrls]);
  }, [defaultValues]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadingPhotoUpload, setLoadingPhotoUpload] = useState<boolean>(false);
  const { data: allMakes } = useQuery<{ results: [] }, Error>(
    ["allMakes"],
    () => fetchAllTypes("make"),
    {
      onSuccess: (data: { results: [] }): void => {
        console.log("Data loaded successfully:", data);
      },
      onError: (error): void => {
        console.error("Error fetching data:", error);
      },
    }
  );
  const allMakesOptions: { label: string; value: string }[] =
    allMakes && allMakes.results
      ? allMakes.results.map((data: { [key: string]: string }) => ({
          label: data?.make,
          value: data?.make,
        }))
      : [];

  const { data: allModels } = useQuery<{ results: [] }, Error>(
    ["allModels"],
    () => fetchAllTypes("model"),
    {
      onSuccess: (data: { results: [] }): void => {
        console.log("Data loaded successfully:", data);
      },
      onError: (error): void => {
        console.error("Error fetching data:", error);
      },
    }
  );
  const allModelsOptions: { label: string; value: string }[] = allModels
    ? allModels.results.map((data: { [key: string]: string }) => ({
        label: data?.model,
        value: data?.model,
      }))
    : [];

  const imgSelected = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setImagesSrc([...imagesSrc, ...e.target.files]);
    }
  };
  const selectImg = (): void => {
    fileInputRef.current?.click();
  };

  const fields = [
    {
      name: "year",
      label: "שנה",
      required: true,
      type: "number",
      register: {
        required: true,
        valueAsNumber: true,
        min: 1994,
        max: 2024,
      },
    },
    {
      name: "city",
      label: "איזור מכירה",
      required: true,
      type: "text",
      register: {
        required: true,
      },
    },
    {
      name: "price",
      label: "מחיר",
      required: true,
      type: "number",
      register: {
        required: true,
        valueAsNumber: true,
        min: 0,
      },
    },
    {
      name: "mileage",
      label: "קילומטראז'",
      required: true,
      type: "number",
      register: {
        required: true,
        valueAsNumber: true,
        min: 0,
      },
    },
    {
      name: "hand",
      label: "יד",
      required: true,
      type: "number",
      register: {
        required: true,
        valueAsNumber: true,
        min: 0,
      },
    },
    {
      name: "color",
      label: "צבע",
      required: true,
      type: "text",
      register: {
        required: true,
      },
    },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    let newImageSrcs =
      defaultValues && Array.isArray(defaultValues.imgsUrls)
        ? [...defaultValues.imgsUrls]
        : [];
    if (imagesSrc.length > 0) {
      setLoadingPhotoUpload(true);
      for (let img of imagesSrc) {
        if (typeof img !== "string") {
          newImageSrcs.push(await uploadPhoto(img));
        }
      }
      setLoadingPhotoUpload(false);
    }
    const editedCar: CarInterface = {
      ...defaultValues,
      make: data.make,
      model: data.model,
      year: data.year,
      price: data.price,
      color: data.color,
      mileage: data.mileage,
      city: data.city,
      imgsUrls: newImageSrcs,
      hand: data.hand,
      owner: JSON.parse(localStorage.getItem("user") ?? "{}")?._id ?? "",
    };

    await submitRequest(editedCar);
    setOpen(false);
  };

  return (
    <RecarDialog
      isLoading={loadingPhotoUpload || isSubmitLoading}
      submitAction={handleSubmit(onSubmit)}
      isValid={Object.keys(errors).length === 0}
      open={open}
      setOpen={setOpen}
      dialogType={dialogType}
      dialogTitle={dialogTitle}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <IconButton
              onClick={selectImg}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              <EditIcon />
            </IconButton>
          }
        >
          <Box
            width={300}
            height={200}
            border="1px solid"
            sx={{
              border: "1px solid",
              borderColor: theme.palette.primary.light,
              borderRadius: 1,
              ml: 4,
            }}
          >
            <Carousel>
              {imagesSrc.map(
                (image, index: number): JSX.Element => (
                  <img
                    key={index}
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt="no image"
                    style={{ width: 300, height: 200, objectFit: "contain" }}
                  />
                )
              )}
            </Carousel>
          </Box>
        </Badge>
        <input
          style={{ display: "none" }}
          ref={fileInputRef}
          type="file"
          onChange={imgSelected}
          multiple
        />
        <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 6 }}>
          <Grid item container spacing={2}>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <Autocomplete
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                disablePortal
                id="make"
                options={allMakesOptions}
                sx={{ width: 300 }}
                defaultValue={
                  defaultValues?.make
                    ? {
                        label: defaultValues?.make,
                        value: defaultValues?.make,
                      }
                    : undefined
                }
                renderInput={(params) => (
                  <TextField
                    {...register("make", { required: true })}
                    {...params}
                    label="יצרן"
                  />
                )}
              />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                id="model"
                options={allModelsOptions}
                defaultValue={
                  defaultValues?.model
                    ? {
                        label: defaultValues?.model,
                        value: defaultValues?.model,
                      }
                    : undefined
                }
                renderInput={(params) => (
                  <TextField
                    {...register("model", { required: true })}
                    {...params}
                    label="מודל"
                  />
                )}
              />
            </Grid>
            {fields.map((field) => (
              <Grid item xs={6}>
                <TextField
                  {...field}
                  fullWidth
                  {...register(field.name, field.register)}
                  error={!!errors[field.name]}
                  defaultValue={defaultValues && defaultValues[field.name]}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </RecarDialog>
  );
};

export default CarInfoForm;
