import { TextField } from "@mui/material";

export default function Input({ ...rest }) {
  return (
    <TextField {...rest} sx={{ width: '10rem' }} />
  )
} 