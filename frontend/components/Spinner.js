import { Box, Typography, CircularProgress } from "@mui/material";
export default function Spinner({ text, mt }) {
  return (
    <Box
      sx={{
        mt: mt,
        width: "100%",
        height: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <CircularProgress sx={{ color: "#A63636" }} />
    </Box>
  );
}
