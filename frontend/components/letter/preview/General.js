import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import LetterContext from "../../../contexts/LetterContext";
import { fonts, colors } from "../../Variables";

function General({ props }) {
  const {
    title,
    image,
    styleUrl,
    content,
    musicUrl,
    fontOrder,
    fontType,
    fontColor,
    fontsize,
    isFontBold,
  } = useContext(LetterContext);
  return (
    <Box
      sx={{
        position: "relative",
        width: 420,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <img src={styleUrl} width={420} style={{ position: "absolute" }} />
      <Box
        sx={{
          position: "relative",
          m: "2rem",
          width: "90%",
        }}
      >
        <Typography
          className="text-area"
          component="div"
          sx={{
            fontFamily: fonts[fontType].fontfamily,
            color: colors[fontColor],
            textAlign: fontOrder,
            fontSize: fontsize,
            maxHeight: 560,
            minHeight: 560,
            overflowY: "auto",
            whiteSpace: "pre-line",
            fontWeight: isFontBold ? "bold" : "normal",
          }}
        >
          {title}
          <br />
          {content}
        </Typography>
      </Box>
    </Box>
  );
}

export default General;
