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
import { Avatar, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export type Comment = {
  id: string;
  user: { imgUrl?: string; username: string };
  text: string;
  replies: Comment[];
};

type StyledTreeItemProps = TreeItemProps & {
  commentText: string;
  username: string;
  avatarUrl?: string;
  isReply?: boolean;
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
  const { avatarUrl, commentText, username, isReply = false, ...other } = props;

  const handleReply = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.stopPropagation();
  };

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
            {!isReply ? (
              <Button
                variant="text"
                sx={{ color: "text.secondary" }}
                onClick={(event): void => handleReply(event)}
              >
                הגב
              </Button>
            ) : (
              <></>
            )}
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
  comments: Comment[];
  style?: SxProps<Theme>;
}

export default function CommentsTree({ comments, style }: CommentsTreeProps) {
  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        ...style,
      }}
    >
      {comments.map((comment) => (
        <StyledTreeItem
          nodeId={comment.id}
          commentText={comment.text}
          username={comment.user.username}
          avatarUrl={comment.user?.imgUrl ?? comment.user.imgUrl}
        >
          {comment.replies.map((reply) => (
            <StyledTreeItem
              nodeId={reply.id}
              commentText={reply.text}
              username={reply.user.username}
              avatarUrl={reply.user?.imgUrl ?? reply.user.imgUrl}
              isReply={true}
            />
          ))}
        </StyledTreeItem>
      ))}
    </TreeView>
  );
}
