import * as React from "react";
import { SxProps, Theme, styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import {
  TreeItem,
  TreeItemProps,
  treeItemClasses,
} from "@mui/x-tree-view/TreeItem";
import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type StyledTreeItemProps = TreeItemProps & {
  commentText: string;
  username: string;
  avatarUrl?: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(6),
    },
  },
})) as unknown as typeof TreeItem;

const StyledTreeItem = React.forwardRef(function StyledTreeItem(
  props: StyledTreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const theme = useTheme();
  const { avatarUrl, commentText, username, ...other } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 0.5,
            pr: 0,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Avatar src={avatarUrl} alt="Remy Sharp" sx={{ mr: 1 }} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "inherit", flexGrow: 1 }}
              >
                {username}
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontWeight: "inherit", flexGrow: 1 }}
              >
                {commentText}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <IconButton size="small" aria-label="editIcon">
              <EditIcon />
            </IconButton>
            <IconButton size="small" aria-label="deleteIcon">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      }
      {...other}
      ref={ref}
    />
  );
});

interface CommentsTreeProps {
  style?: SxProps<Theme>;
}

export default function CommentsTree({ style }: CommentsTreeProps) {
  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        ...style,
      }}
    >
      <StyledTreeItem
        nodeId="1"
        commentText="האם הרכב עבר תאונה?"
        username="טל"
        avatarUrl="/static/images/avatar/2.jpg"
      />
      <StyledTreeItem nodeId="2" commentText="Trash" username="טל" />
      <StyledTreeItem nodeId="3" commentText="Categories" username="טל">
        <StyledTreeItem nodeId="5" commentText="Social" username="טל" />
        <StyledTreeItem nodeId="6" commentText="Updates" username="טל" />
        <StyledTreeItem nodeId="7" commentText="Forums" username="טל" />
        <StyledTreeItem nodeId="8" commentText="Promotions" username="טל" />
      </StyledTreeItem>
      <StyledTreeItem nodeId="4" commentText="History" username="טל" />
    </TreeView>
  );
}
