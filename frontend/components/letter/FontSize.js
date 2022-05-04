import React, { useState, useEffect } from "react";
import { Box, Slider } from "@mui/material";

function FontSize({ isFontSizeOpen, setFontSize, fontSize }) {
  const [size, setSize] = useState(fontSize || 20);
  return (
    <Box
      sx={{
        mx: "auto",
        borderRadius: 4,
        backgroundColor: "#bbbbbb",
        visibility: isFontSizeOpen ? "visible" : "hidden",
        display: isFontSizeOpen ? "flex" : "none",
        mb: "1rem",
        width: 390,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Slider
        key={size}
        defaultValue={size}
        valueLabelDisplay="on"
        min={10}
        max={40}
        sx={{ color: "white", width: 360 }}
        onChange={(e) => {
          setFontSize(e.target.value);
        }}
      />
    </Box>
  );
}

export default FontSize;
