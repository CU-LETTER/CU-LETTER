import React, { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { colors } from "../../../components/Variables";
import Palette from "../Palette";
import LetterContext from "../../../contexts/LetterContext";

function PostCard({ props }) {
  const [bgColor, setBgColor] = useState(1);
  const [underlineColour, setUnderlineColour] = useState(0);

  const { setUnderlineColor, setBgcolor, styleUrl } = useContext(LetterContext);
  useEffect(() => {
    setBgcolor(bgColor);
  }, [bgColor]);
  return (
    <Box
      sx={{
        position: "relative",
        width: 420,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box sx={{ border: "0.5px solid" }}>
        <img
          src={styleUrl}
          width={418}
          height={200}
          style={{ display: "block" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
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
              maxHeight: 280,
              minHeight: 280,
              minWidth: "100%",
              px: "2rem",
              py: "1rem",
              overflowY: "auto",
              whiteSpace: "pre-line",
              fontWeight: props.bold ? "bold" : "normal",
              textDecoration: `${colors[underlineColour]} underline`,
              textUnderlineOffset: 4,
              bgcolor: colors[bgColor],
            }}
          >
            {props.title}
            <br />
            {props.text}
          </Typography>
        </Box>
      </Box>
      <br />
      <Box
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Palette
          colors={colors}
          isColorOpen={props.showDots}
          clickedColor={bgColor}
          setClickedColor={(e) => {
            setBgColor(e);
            setBgcolor(e);
          }}
          size="half"
        />
        {/* <br /> */}
        <Palette
          colors={colors}
          isColorOpen={props.showDots}
          clickedColor={underlineColour}
          setClickedColor={(e) => {
            setUnderlineColour(e);
            setUnderlineColor(e);
          }}
          size="half"
        />
      </Box>
    </Box>
  );
}

export default PostCard;
