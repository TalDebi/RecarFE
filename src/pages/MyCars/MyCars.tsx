import React, { ReactNode, SyntheticEvent, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CarInfoCard from "./CarInfoCard";
import RecarDialog from "../../customComponents/RecarDialog";
import CarInfoForm from "../CarInfoForm";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

function MyCars() {
  const theme = useTheme();
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleCreatePost = (): void => {
    setOpen(!isOpen);
  };

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (_: SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: 1400,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tabs value={tabIndex} onChange={handleTabsChange}>
          <Tab label="הפוסטים שלי" {...a11yProps(0)} />
          <Tab label="פוסטים שאהבתי" {...a11yProps(1)} />
        </Tabs>
        <Button
          component="label"
          variant="contained"
          tabIndex={-1}
          aria-label="add"
          onClick={handleCreatePost}
          endIcon={<AddIcon />}
          sx={{ height: "fit-content", mt: 0.5 }}
        >
          פוסט חדש
        </Button>
      </Box>
      <Box sx={{ overflow: "auto", height: 500 }}>
        <CustomTabPanel value={tabIndex} index={0}>
          {[1, 2].map(
            (index: number): JSX.Element => (
              <CarInfoCard key={index} postId={"1"} />
            )
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={1}>
          {[1, 2, 3, 4].map(
            (index: number): JSX.Element => (
              <CarInfoCard key={index} postId={"2"} />
            )
          )}
        </CustomTabPanel>
      </Box>
      <RecarDialog
        open={isOpen}
        setOpen={setOpen}
        dialogType="Creation"
        dialogTitle="יצירת פוסט חדש"
      >
        <CarInfoForm />
      </RecarDialog>
    </>
  );
}

export default MyCars;
