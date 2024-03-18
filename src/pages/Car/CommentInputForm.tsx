import { Box, TextField } from "@mui/material";

interface CommentInputFormProps {
  defaultValue?: string;
}

const CommentInputForm = ({ defaultValue }: CommentInputFormProps) => {
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
