import React from "react";
import { Box, Typography } from "@mui/material";

function receiverButton(props) {
  return (
    <Box
      sx={{
        width: 0.8,
        bgcolor: "white",
        borderRadius: 5,
        height: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mx: "auto",
        boxShadow: 3,
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => props.onClick(props.target)}
    >
      <Typography
        sx={{ fontWeight: "bold", ml: "1rem", fontFamily: "Gowun Dodum" }}
        variant="h6"
      >
        {props.title}
      </Typography>
      <Typography
        sx={{
          fontSize: 10,
          ml: "1rem",
          fontFamily: "Gowun Batang",
          mr: "1rem",
        }}
      >
        {props.description}
      </Typography>
    </Box>
  );
}

export default receiverButton;
