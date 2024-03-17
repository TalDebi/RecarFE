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
import { Avatar, Button, IconButton, TextField, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { AddComment, Check, Close } from "@mui/icons-material";
import { StyledButton } from "./Car";
import { useMutation } from "react-query";
import {
  addComment,
  addReply,
  deleteComment,
  deleteReply,
  editComment as editCommentRequest,
  editReply,
} from "../../services/posts-service";
import RecarSnackbar, {
  AlertSeverity,
} from "../../customComponents/RecarSnackbar";

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
  postId: string;
  commentId: string;
  replyId?: string;
  avatarUrl?: string;
  isReply?: boolean;
  index: number;
  addNewComment?: Function;
  removeNewComment: Function;
  object: Comment;
  refetch: Function;
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
  const {
    avatarUrl,
    commentText,
    username,
    isReply = false,
    index,
    userId,
    postId,
    commentId,
    replyId,
    addNewComment,
    removeNewComment,
    refetch,
    object,
    ...other
  } = props;

  const editItem = useMutation({
    mutationFn: (comment: Comment) =>
      isReply
        ? editReply(postId, commentId, replyId as string, comment).req
        : editCommentRequest(postId, commentId, comment).req,
  });

  const createItem = useMutation({
    mutationFn: (comment: Comment) =>
      isReply
        ? addReply(postId, commentId, comment).req
        : addComment(postId, comment).req,
  });

  const deleteItem = useMutation({
    mutationFn: () =>
      isReply
        ? deleteReply(postId, commentId, replyId as string).req
        : deleteComment(postId, commentId).req,
  });
  const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertSeverity>("info");
  const [isEditMode, setIsEditMode] = useState(commentText === "");
  const inputRef = React.useRef(null);

  const handleReply = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.stopPropagation();
    addNewComment && addNewComment();
  };

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.stopPropagation();
    setIsEditMode(true);
  };

  const submitComment = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setIsEditMode(false);
    const comment: any = structuredClone(object);
    delete comment["_id"];
    let newText = inputRef.current
      ? (inputRef.current as HTMLInputElement).value
      : "";
    removeNewComment();
    newText &&
      (await createItem.mutateAsync({
        ...comment,
        publisher: comment.publisher._id,
        text: newText,
      }));
    setSnackbarMessage("התגובה פורסמה");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    refetch();
  };

  const editComment = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setIsEditMode(false);
    const comment: any = structuredClone(object);
    delete comment["_id"];
    let newText = inputRef.current
      ? (inputRef.current as HTMLInputElement).value
      : "";
    if (newText !== commentText) {
      newText &&
        (await editItem.mutateAsync({
          ...comment,
          publisher: comment.publisher._id,
          text: newText,
        }));
    }
    setSnackbarMessage("התגובה נערכה");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    refetch();
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    await deleteItem.mutateAsync();
    setSnackbarMessage("התגובה נמחקה");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    refetch();
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
    <>
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

                {!isEditMode ? (
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: "inherit", flexGrow: 1 }}
                  >
                    {commentText}
                  </Typography>
                ) : (
                  <Box sx={{ display: "flex" }}>
                    <TextField inputRef={inputRef} defaultValue={commentText} />
                    <Button
                      onClick={(event) =>
                        object._id.startsWith("new:")
                          ? submitComment(event)
                          : editComment(event)
                      }
                    >
                      <Check />
                    </Button>
                    <Button
                      onClick={() => {
                        if (commentText === "") {
                          removeNewComment();
                        } else {
                          setIsEditMode(false);
                        }
                      }}
                    >
                      <Close color="error" />
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              {bottoms(userId, isReply, handleReply, handleDelete, handleEdit)}
            </Box>
          </Box>
        }
        {...other}
        ref={ref}
      />
      <RecarSnackbar
        isSnackbarOpen={isSnackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarSeverity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
    </>
  );
});

interface CommentsTreeProps {
  comments: Comment[];
  postId: string;
  style?: SxProps<Theme>;
  refetch: Function;
}

export default function CommentsTree({
  comments,
  style,
  postId,
  refetch,
}: CommentsTreeProps) {
  const theme = useTheme();
  const [currComments, setCurrComments] = useState(structuredClone(comments));
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    if (!checkIfNewCommentExists(currComments)) {
      setCurrComments(comments);
    }
  }, [comments]);

  const handleToggle = (_event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const checkIfNewCommentExists = (comments: Comment[]): boolean => {
    for (let comment of comments) {
      if (comment._id.startsWith("new:")) {
        return true;
      }
      for (let reply of comment.replies) {
        if (reply._id.startsWith("new:")) {
          return true;
        }
      }
    }

    return false;
  };

  const addNewComment = (
    index: number,
    nodeId: string,
    isReply: boolean = true
  ) => {
    const newComments = [...currComments];
    const currUser = JSON.parse(localStorage.getItem("user") ?? "{}");
    return () => {
      const newComment: Comment = {
        publisher: {
          imgUrl: currUser.imgUrl,
          name: currUser.name,
          _id: currUser._id,
        },
        text: "",
        replies: [],
        _id: "new:" + Math.random().toString(36),
      };
      if (!checkIfNewCommentExists(newComments)) {
        if (isReply) {
          newComments[index]?.replies.push(newComment);
        } else {
          newComments.push(newComment);
        }

        setCurrComments(newComments);
        setExpanded([...new Set([...expanded, nodeId])]);
      }
    };
  };
  const removeNewComment = (
    commentIndex: number,
    isReply: boolean = false,
    replyIndex?: number
  ) => {
    const newComments = [...currComments];
    return () => {
      if (isReply && replyIndex !== undefined) {
        newComments[commentIndex]?.replies.splice(replyIndex, 1);
      } else {
        newComments.splice(commentIndex, 1);
      }
      setCurrComments(newComments);
    };
  };
  return (
    <>
      <StyledButton
        buttonColor={theme.palette.primary.main}
        sx={{ height: "fit-content", width: "fit-content" }}
        variant="contained"
        endIcon={<AddComment />}
        onClick={addNewComment(currComments.length, "", false)}
      >
        הגב
      </StyledButton>
      <TreeView
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        expanded={expanded}
        onNodeToggle={handleToggle}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          ...style,
        }}
      >
        {currComments.map((comment, commentIndex: number) => (
          <StyledTreeItem
            key={commentIndex}
            nodeId={comment._id}
            commentText={comment.text}
            username={comment.publisher.name}
            userId={comment.publisher._id}
            avatarUrl={comment.publisher?.imgUrl ?? comment.publisher.imgUrl}
            index={commentIndex}
            postId={postId}
            commentId={comment._id}
            addNewComment={addNewComment(commentIndex, comment._id)}
            removeNewComment={removeNewComment(commentIndex)}
            refetch={refetch}
            object={comment}
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
                postId={postId}
                commentId={comment._id}
                replyId={reply._id}
                isReply={true}
                refetch={refetch}
                object={reply}
                removeNewComment={removeNewComment(
                  commentIndex,
                  true,
                  replyIndex
                )}
              />
            ))}
          </StyledTreeItem>
        ))}
      </TreeView>
    </>
  );
}
