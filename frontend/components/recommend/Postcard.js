import React, { useState } from "react";
import { Box, Input, Typography, Button } from "@mui/material";

const Postcard = (props) => {
  //something changed
  const { imgsrc } = props;
  return (
    <Box
      sx={{
        width: "320px",
        height: "200px",
        position: "relative",
        alignItems: "center",
      }}
    >
      <Box component="div" sx={{ position: "relative" }}>
        <img width="320px" height="200px" src={imgsrc}></img>
      </Box>
    </Box>
  );
};
export default Postcard;
