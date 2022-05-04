import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
const Normal = (props) => {
  //something changed
  const { imgsrc, content } = props;
  return (
    <Box
      sx={{
        width: "175px",
        height: "280px",
        margin: "auto",
        position: "relative",
      }}
    >
      <Box component="div" sx={{ position: "relative" }}>
        <img width="175px" height="280px" src={imgsrc} style={{}}></img>
      </Box>
    </Box>
  );
};

export default Normal;
