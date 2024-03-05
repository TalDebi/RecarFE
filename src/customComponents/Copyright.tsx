import Typography ,{TypographyProps }from "@mui/material/Typography";


export default function Copyright(props: TypographyProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"."}
      {"Copyright © "}
      Recar {new Date().getFullYear()}
    </Typography>
  );
}
