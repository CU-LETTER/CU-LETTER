import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import LetterContext from "../../../contexts/LetterContext";

function General({ props }) {
  const { styleUrl } = useContext(LetterContext);
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
          position: "absolute",
          m: "2rem",
          width: "90%",
        }}
      >
        <Typography
          className="text-area"
          component="div"
          sx={{
            fontFamily: props.fontFamily,
            color: props.color,
            textAlign: props.textAlign,
            fontSize: props.fontSize,
            maxHeight: 560,
            minHeight: 560,
            overflowY: "auto",
            whiteSpace: "pre-line",
            fontWeight: props.bold ? "bold" : "normal",
          }}
        >
          {props.title}
          <br />
          {props.text}
        </Typography>
      </Box>
    </Box>
  );
}

export default General;
