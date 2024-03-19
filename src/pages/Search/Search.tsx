import React, { useState, useEffect, ReactElement } from "react";
import {
  Box,
  Button,
  useTheme,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import FilterInput from "./FilterInput";
import RangeSlider from "./RangeSlider";
import {
  SearchQuery,
  getAllPosts,
  getAllColors,
  getAllCities,
} from "../../services/posts-service";
import AddIcon from "@mui/icons-material/Add";
import ResultsTable from "./ResultsTable";
import {
  MAX_PRICE,
  MAX_YEAR,
  MIN_PRICE,
  MIN_YEAR,
  PRICE_STEP,
  YEAR_STEP,
  MAX_MILEAGE,
  MILEAGE_STEP,
  MIN_MILEAGE,
} from "./consts";
import { useMutation, useQuery } from "react-query";
import { fetchAllTypes } from "../../services/opendatasoft";
import {
  dislikePost,
  fetchLikedPostsInfo,
  likePost as likePostRequest,
} from "../../services/user";

const handOptions = [
  { displayValue: "1", value: "1" },
  { displayValue: "2", value: "2" },
  { displayValue: "3", value: "3" },
  { displayValue: "4", value: "4" },
  { displayValue: "5", value: "5" },
  { displayValue: "6", value: "6" },
];
interface filterObject {
  filterLabel?: string;
  value:
    | {
        value: string;
        displayValue: string;
      }[]
    | number[];
  setValue: Function;
  options?: {
    displayValue: string;
    value: string;
  }[];
  style: Object;
  key: string;
  component: (props: any) => ReactElement<any, any>;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  valuetext?: Function;
}

interface advancedOption {
  key: string;
  label: string;
  value:
    | {
        displayValue: string;
        value: string;
      }[]
    | number[];
  setValue: Function;
  isChecked: boolean;
  setChecked: Function;
}
function Search() {
  const userId: string =
    JSON.parse(localStorage.getItem("user") ?? "{}")?._id ?? "";
  const { data: likedPosts } = useQuery<string[], Error>(
    ["likedPosts", userId],
    () => fetchLikedPostsInfo(userId ?? ""),
    {
      refetchInterval: 2000,
      retry: false,
    }
  );

  const likePost = useMutation({
    mutationFn: (postId: string) => likePostRequest(userId, postId).req,
  });

  const unlikePost = useMutation({
    mutationFn: (postId: string) => dislikePost(userId, postId).req,
  });

  const isLiked = (postId: string) => {
    return likedPosts && likedPosts?.includes(postId);
  };

  const handleLiked = (postId: any) => {
    if (!isLiked(postId)) {
      likePost.mutate(postId);
    } else {
      unlikePost.mutate(postId);
    }
  };
  const theme = useTheme();
  const [filterQuery, setFilterQuery] = useState<SearchQuery>({});
  const [priceFilters, setPriceFilters] = useState<number[]>([
    MIN_PRICE,
    MAX_PRICE,
  ]);
  const [yearFilters, setYearFilters] = useState<number[]>([
    MIN_YEAR,
    MAX_YEAR,
  ]);
  const [mileageFilters, setmileageFilters] = useState<number[]>([
    MIN_MILEAGE,
    MAX_MILEAGE,
  ]);
  const [makeFilters, setMakeFilters] = useState<
    { value: string; displayValue: string }[]
  >([]);
  const [modelFilters, setModelFilters] = useState<
    { value: string; displayValue: string }[]
  >([]);
  const [cityFilters, setCityFilters] = useState<
    { value: string; displayValue: string }[]
  >([]);

  const [handFilters, setHandFilters] = useState<
    { value: string; displayValue: string }[]
  >([]);
  const [colorFilters, setColorFilters] = useState<
    { value: string; displayValue: string }[]
  >([]);
  const [clearKey, setClearKey] = useState(0);

  const [handOption, setHandOption] = useState<boolean>(false);
  const [colorOption, setColorOption] = useState<boolean>(false);
  const [mileageOption, setmileageOption] = useState<boolean>(false);

  const yearSliderText = (value: number): string => value.toString();

  const priceSliderText = (value: number): string => {
    return `₪ ${value}K`;
  };
  const mileageSliderText = (value: number): string => {
    return `${value}K`;
  };

  useEffect(() => {
    setFilterQuery({
      make: makeFilters.map((item) => item.value),
      model: modelFilters.map((item) => item.value),
      city: cityFilters.map((item) => item.value),
      color: colorFilters.map((item) => item.value),
      hand: handFilters.map((item) => item.value),
      mileage: {
        min: mileageFilters[0] * 1000,
        max: mileageFilters[1] * 1000,
      },
      price: {
        min: priceFilters[0] * 1000,
        max: priceFilters[1] * 1000,
      },
      year: {
        min: yearFilters[0],
        max: yearFilters[1],
      },
    });
  }, [
    makeFilters,
    modelFilters,
    cityFilters,
    colorFilters,
    handFilters,
    mileageFilters,
    yearFilters,
    priceFilters,
  ]);
  const { data: posts } = useQuery(
    [filterQuery],
    () => getAllPosts(filterQuery).req,
    {
      onSuccess: (data): void => {
        console.log("Posts loaded successfully:", data.data);
      },
      onError: (error): void => {
        console.error("Error fetching data:", error);
      },
    }
  );

  const { data: allMakes } = useQuery<{ results: [] }, Error>(
    ["allMakes"],
    () => fetchAllTypes("make")
  );

  const { data: allModels } = useQuery<{ results: [] }, Error>(
    ["allModels"],
    () => fetchAllTypes("model")
  );
  const { data: allColors } = useQuery(
    ["allColors"],
    () => getAllColors().req,
    {
      onSuccess: (data: { data: string[] }): void => {
        console.log("Data loaded successfully:", data);
      },
      onError: (error): void => {
        console.error("Error fetching data:", error);
      },
    }
  );
  const { data: allCities } = useQuery(
    ["allCities"],
    () => getAllCities().req,
    {
      onSuccess: (data: { data: string[] }): void => {
        console.log("Data loaded successfully:", data);
      },
      onError: (error): void => {
        console.error("Error fetching data:", error);
      },
    }
  );

  const allMakesOptions: { displayValue: string; value: string }[] =
    allMakes && allMakes.results
      ? allMakes.results.map((data: { [key: string]: string }) => ({
          displayValue: data?.make,
          value: data?.make,
        }))
      : [];

  const allModelsOptions: { displayValue: string; value: string }[] = allModels
    ? allModels.results.map((data: { [key: string]: string }) => ({
        displayValue: data?.model,
        value: data?.model,
      }))
    : [];

  const allColorsOptions: { displayValue: string; value: string }[] = allColors
    ? allColors.data.map((data: string) => ({
        displayValue: data,
        value: data,
      }))
    : [];
  const allCitiesOptions: { displayValue: string; value: string }[] = allCities
    ? allCities.data.map((data: string) => ({
        displayValue: data,
        value: data,
      }))
    : [];

  const postRows = posts?.data
    ? posts.data.map((item: any) => ({
        id: item._id,
        make: item.car.make,
        model: item.car.model,
        year: item.car.year,
        city: item.car.city,
        price: item.car.price,
        picture: item.car.imgsUrls[0],
        isFavorite: isLiked(item._id),
        handleFavorite: handleLiked,
      }))
    : [];

  const filterObjects: filterObject[] = [
    {
      filterLabel: "יצרן",
      value: makeFilters,
      setValue: setMakeFilters,
      options: allMakesOptions,
      style: { width: 285, height: 50, mx: 2 },
      key: "make",
      component: FilterInput,
    },
    {
      filterLabel: "דגם",
      value: modelFilters,
      setValue: setModelFilters,
      options: allModelsOptions,
      style: { width: 285, height: 50, mx: 2 },
      key: "model",
      component: FilterInput,
    },
    {
      filterLabel: "איזור מכירה",
      value: cityFilters,
      setValue: setCityFilters,
      options: allCitiesOptions,
      style: { width: 285, height: 50, mx: 2 },
      key: "city",
      component: FilterInput,
    },
    {
      filterLabel: "צבע",
      value: colorFilters,
      setValue: setColorFilters,
      options: allColorsOptions,
      style: { width: 285, height: 50, mx: 2 },
      key: "color",
      component: FilterInput,
    },
    {
      filterLabel: "יד",
      value: handFilters,
      setValue: setHandFilters,
      options: handOptions,
      style: { width: 285, height: 50, mx: 2 },
      key: "hand",
      component: FilterInput,
    },
    {
      key: "year",
      label: "שנה",
      value: yearFilters,
      setValue: setYearFilters,
      min: MIN_YEAR,
      max: MAX_YEAR,
      step: YEAR_STEP,
      valuetext: yearSliderText,
      component: RangeSlider,
      style: { width: 200, pt: 3, mx: 5 },
    },
    {
      key: "price",
      label: "מחיר",
      value: priceFilters,
      setValue: setPriceFilters,
      min: MIN_PRICE,
      max: MAX_PRICE,
      step: PRICE_STEP,
      valuetext: priceSliderText,
      component: RangeSlider,
      style: { width: 200, pt: 3, mx: 5 },
    },
    {
      key: "mileage",
      label: "קילומטראז'",
      value: mileageFilters,
      setValue: setmileageFilters,
      min: MIN_MILEAGE,
      max: MAX_MILEAGE,
      step: MILEAGE_STEP,
      valuetext: mileageSliderText,
      component: RangeSlider,
      style: { width: 200, pt: 3, mx: 5 },
    },
  ];
  const [filterList, setFilterList] = useState([
    "make",
    "model",
    "city",
    "year",
    "price",
  ]);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleAdvancedOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    option: advancedOption
  ) => {
    if (event.target.checked) {
      setFilterList([...filterList, option.key]);
    } else {
      option.setValue([]);
      setFilterList(filterList.filter((item) => item != option.key));
    }
    option.setChecked(event.target.checked);
  };

  const advancedOptions: advancedOption[] = [
    {
      key: "hand",
      label: "יד",
      value: handFilters,
      setValue: setHandFilters,
      isChecked: handOption,
      setChecked: setHandOption,
    },
    {
      key: "mileage",
      label: "קילומטראז'",
      value: mileageFilters,
      setValue: setmileageFilters,
      isChecked: mileageOption,
      setChecked: setmileageOption,
    },
    {
      key: "color",
      label: "צבע",
      value: colorFilters,
      setValue: setColorFilters,
      isChecked: colorOption,
      setChecked: setColorOption,
    },
  ];

  const handleClearFilters = (): void => {
    setMakeFilters([]);
    setModelFilters([]);
    setCityFilters([]);
    setYearFilters([MIN_YEAR, MAX_YEAR]);
    setPriceFilters([MIN_PRICE, MAX_PRICE]);
    setHandFilters([]);
    setColorFilters([]);
    setmileageFilters([MIN_MILEAGE, MAX_MILEAGE]);
    setClearKey((prevKey): number => prevKey + 1);
  };

  return (
    <>
      <Box width={1400}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flexStart",
            flexWrap: "wrap",
            height: 100,
            mb: 2,
          }}
        >
          {filterObjects.map((filter, index) => {
            if (filterList.includes(filter.key)) {
              return (
                <filter.component
                  clearKey={`${index}-${clearKey}`}
                  {...filter}
                />
              );
            }
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flexStart",
            flexWrap: "wrap",
            height: 40,
            mb: 2,
          }}
        >
          <Box display="flex">
            <Button
              variant="text"
              sx={{ color: theme.palette.primary.dark }}
              onClick={handleClearFilters}
            >
              נקה
            </Button>
          </Box>
          <Button
            startIcon={<AddIcon />}
            variant="text"
            sx={{ color: theme.palette.primary.dark }}
            onClick={handleOpenUserMenu}
          >
            חיפוש מתקדם
          </Button>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {advancedOptions.map((option) => (
              <MenuItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      inputProps={{ "aria-label": "controlled" }}
                      checked={option.isChecked}
                      onChange={(event) =>
                        handleAdvancedOptionChange(event, option)
                      }
                    />
                  }
                  label={option.label}
                />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      <Box width={1400} sx={{ mt: 3 }}>
        <ResultsTable rows={postRows} />
      </Box>
    </>
  );
}
export default Search;
