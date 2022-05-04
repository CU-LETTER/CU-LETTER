import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ReactCardFlip from "react-card-flip";

const Photocard = (props) => {
  const { front, back, content } = props;
  //something changed
  const [isFlipped, setIsFlipped] = useState(false);

  const width = props.preview ? 300 : 250;
  const height = props.preview ? 480 : 400;

  return (
    <Box
      sx={{ width: width, height: height, mt: "2rem", position: "relative" }}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Box component="div" onClick={(e) => setIsFlipped((prev) => !prev)}>
          <img
            width={width}
            height={height}
            src={front}
            style={{ borderRadius: "2rem" }}
          ></img>
        </Box>
        <Box
          component="div"
          onClick={(e) => setIsFlipped((prev) => !prev)}
          sx={{
            borderRadius: "2rem",
            bgcolor: "#bab9",
            width: { width },
            height: { height },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "1rem",
              whiteSpace: "pre-wrap",
              fontFamily: "Gowun Dodum",
            }}
          >
            {content}
          </Typography>
        </Box>
      </ReactCardFlip>
    </Box>
  );
};

export default Photocard;
