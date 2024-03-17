import React, { ChangeEvent, useRef, useState } from "react";
import {
  Badge,
  Box,
  Grid,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";

interface CommentInputFormProps {
  defaultValue?: string;
}

const CommentInputForm = ({ defaultValue }: CommentInputFormProps) => {
  const theme = useTheme();
  const [imagesSrc, setImagesSrc] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Box component="form" noValidate onSubmit={() => {}}>
        <TextField
          name="comment"
          required
          fullWidth
          id="comment"
          autoFocus
          defaultValue={defaultValue && defaultValue}
        />
      </Box>
    </>
  );
};

export default CommentInputForm;
