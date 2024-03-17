import { ReactNode, SyntheticEvent, useState } from "react";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CarInfoCard from "./CarInfoCard";
import CarInfoForm from "../CarInfoForm";
import { useMutation, useQuery } from "react-query";
import { fetchLikedPostsInfo } from "../../services/user";
import { SecuredUser } from "../../services/types";
import {
  createPost as createPostRequest,
  getPostsByUser,
  deletePost as deletePostRequest,
} from "../../services/posts-service";
import { createCar as createCarRequest } from "../../services/car-service";

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
  const [isOpen, setOpen] = useState<boolean>(false);
  const user: SecuredUser = JSON.parse(localStorage.getItem("user") ?? "{}");

  const { data: likedPosts } = useQuery<[], Error>(
    ["likedPosts", user?._id],
    () => fetchLikedPostsInfo(user?._id ?? ""),
    { retry: false, refetchInterval: 5000 }
  );

  const { data: userPosts } = useQuery(
    ["UserPosts", user?._id],
    () => getPostsByUser(user?._id ?? "").req,
    { retry: false, refetchInterval: 5000 }
  );
  const createPost = useMutation({
    mutationFn: async (car: any) => {
      const data = (await createCarRequest(car).req).data;
      const post = {
        publisher: user._id,
        car: data._id,
      };
      await createPostRequest(post);
    },
  });

  const deletePost = useMutation({
    mutationFn: (postId: string) => deletePostRequest(postId).req,
  });

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
          {userPosts?.data ? (
            userPosts?.data.map(
              (post, index: number): JSX.Element => (
                <CarInfoCard key={index} postId={post} deletPost={deletePost.mutateAsync} />
              )
            )
          ) : (
            <></>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={1}>
          {likedPosts ? (
            likedPosts.map(
              (post, index: number): JSX.Element => (
                <CarInfoCard key={index} postId={post}  />
              )
            )
          ) : (
            <></>
          )}
        </CustomTabPanel>
      </Box>
      <CarInfoForm
        open={isOpen}
        setOpen={setOpen}
        dialogTitle="פרסם מכונית"
        dialogType="Creation"
        submitRequest={createPost.mutateAsync}
      />
    </>
  );
}

export default MyCars;
