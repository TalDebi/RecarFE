import * as React from "react";
import { SxProps, Theme, styled } from "@mui/material/styles";
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
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import RecarDialog from "../../customComponents/RecarDialog";
import CommentInputForm from "./CommentInputForm";

export type Comment = {
  _id: string;
  publisher: { imgUrl?: string; name: string; _id: string };
  text: string;
  replies: Comment[];
};

type StyledTreeItemProps = TreeItemProps & {
  commentText: string;
  username: string;
  userId: string;
  avatarUrl?: string;
  isReply?: boolean;
  index: number;
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [isReplyMode, setIsReplyMode] = useState(false);
  const {
    avatarUrl,
    commentText,
    username,
    isReply = false,
    index,
    userId,
    ...other
  } = props;

  const handleReply = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.stopPropagation();
    setIsReplyMode(true)
  };

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.stopPropagation();
    setIsEditMode(true);
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.stopPropagation();
  };
  const bottoms = (
    userId: string,
    isReply: boolean,
    handleReply: Function,
    handleDelete: Function,

    handleEdit: Function
  ) => {
    const currUserId: string =
      JSON.parse(localStorage.getItem("user") ?? "{}")?._id ?? "";
    if (currUserId !== userId) {
      return <></>;
    }

    return !isReply ? (
      <>
        <Button
          variant="text"
          sx={{ color: "text.secondary" }}
          onClick={(event): void => handleReply(event)}
        >
          הגב
        </Button>
        <IconButton
          size="small"
          aria-label="editIcon"
          onClick={(event): void => handleEdit(event)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          aria-label="deleteIcon"
          onClick={(event): void => handleDelete(event)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ) : (
      <>
        {" "}
        <IconButton
          size="small"
          aria-label="editIcon"
          onClick={(event): void => handleEdit(event)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          aria-label="deleteIcon"
          onClick={(event): void => handleDelete(event)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    );
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
            {bottoms(userId, isReply, handleReply, handleDelete, handleEdit)}
          </Box>
          <RecarDialog
            open={isEditMode}
            setOpen={setIsEditMode}
            dialogType="Edit"
            dialogTitle="עריכת תגובה"
            width={300}
            height={100}
          >
            <CommentInputForm defaultValue={commentText} />
          </RecarDialog>
          <RecarDialog
            open={isReplyMode}
            setOpen={setIsReplyMode}
            dialogType="Creation"
            dialogTitle="שליחת תגובה"
            width={300}
            height={100}
          >
            <CommentInputForm/>
          </RecarDialog>
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
      {comments.map((comment, commentIndex: number) => (
        <StyledTreeItem
          key={commentIndex}
          nodeId={comment._id}
          commentText={comment.text}
          username={comment.publisher.name}
          userId={comment.publisher._id}
          avatarUrl={comment.publisher?.imgUrl ?? comment.publisher.imgUrl}
          index={commentIndex}
        >
          {comment.replies.map((reply, replyIndex: number) => (
            <StyledTreeItem
              key={`${commentIndex}-${replyIndex}`}
              nodeId={reply._id}
              commentText={reply.text}
              username={reply.publisher.name}
              avatarUrl={reply.publisher?.imgUrl ?? reply.publisher.imgUrl}
              userId={reply.publisher._id}
              index={replyIndex}
              isReply={true}
            />
          ))}
        </StyledTreeItem>
      ))}
    </TreeView>
  );
}
