import React from "react";
import { Box } from "@mui/material";

export default function PhoneImage(props) {
  return (
    <Box
      component="img"
      alt={props.description}
      src={props.src}
      sx={{ ...ImageStyle }}
    ></Box>
  );
}

const ImageStyle = {
  width: "90%",
};
