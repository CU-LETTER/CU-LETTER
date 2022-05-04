import React, { useContext } from "react";
import { Box, IconButton } from "@mui/material";

import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import LetterContext from "../../contexts/LetterContext";

function Alignment({
  isAlignmentOpen,
  setAlignment,
  setBold,
  bold,
  alignment,
}) {
  const { isFontBold, setIsFontBold } = useContext(LetterContext);
  return (
    <Box
      sx={{
        mx: "auto",
        borderRadius: 2,
        backgroundColor: "#bbbbbb",
        visibility: isAlignmentOpen ? "visible" : "hidden",
        display: isAlignmentOpen ? "inline-block" : "none",
        mb: "1rem",
      }}
    >
      <IconButton onClick={(e) => setAlignment("justify")}>
        <FormatAlignJustifyIcon
          sx={{ color: alignment === "justify" ? "#000000" : "default" }}
        />
      </IconButton>
      <IconButton onClick={(e) => setAlignment("center")}>
        <FormatAlignCenterIcon
          sx={{ color: alignment === "center" ? "#000000" : "default" }}
        />
      </IconButton>
      <IconButton onClick={(e) => setAlignment("left")}>
        <FormatAlignLeftIcon
          sx={{ color: alignment === "left" ? "#000000" : "default" }}
        />
      </IconButton>
      <IconButton onClick={(e) => setAlignment("right")}>
        <FormatAlignRightIcon
          sx={{ color: alignment === "right" ? "#000000" : "default" }}
        />
      </IconButton>
      <IconButton
        onClick={(e) => {
          setBold(!bold);
          setIsFontBold(!isFontBold);
        }}
      >
        <FormatBoldIcon sx={{ color: bold ? "#000000" : "default" }} />
      </IconButton>
    </Box>
  );
}

export default Alignment;
