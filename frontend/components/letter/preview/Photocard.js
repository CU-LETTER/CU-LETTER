import React, { useState, useEffect, useContext } from "react";
import LetterContext from "../../../contexts/LetterContext";
import { Box, Typography } from "@mui/material";
import { colors, fonts } from "../../Variables";
import ReactCardFlip from "react-card-flip";
import { emojis } from "../photocard/PhotoCard";
const Photocard = (props) => {
  const { front, back, content } = props;
  const {
    bgcolor,
    stickersPos,
    styleUrl,
    fontsize,
    fontType,
    fontColor,
    isFontBold,
    fontOrder,
    image,
  } = useContext(LetterContext);

  //something changed
  const [isFlipped, setIsFlipped] = useState(false);

  const width = props.preview ? 300 : 250;
  const height = props.preview ? 480 : 400;

  return (
    <Box
      sx={{
        width: width,
        height: height,
        mt: "2rem",
        position: "relative",
        my: "1rem",
      }}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Box component="div" onClick={(e) => setIsFlipped((prev) => !prev)}>
          <img
            width={width}
            height={height}
            src={styleUrl && styleUrl}
            style={{ borderRadius: "2rem" }}
          ></img>
        </Box>
        <Box
          component="div"
          onClick={(e) => setIsFlipped((prev) => !prev)}
          sx={{
            bgcolor: colors[bgcolor],
            width: 300,
            height: 480,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: "2rem",
            position: "relative",
          }}
        >
          {stickersPos.map((Sticker, idx) =>
            Sticker.type !== "sticker" ? (
              <Typography
                sx={{
                  display: "inline",
                  position: "absolute",
                  transform: `translate(${Sticker.position.x}px, ${Sticker.position.y}px)`,
                  fontSize: fontsize,
                  fontFamily: fonts[fontType].fontfamily,
                  color: colors[fontColor],
                  whiteSpace: "pre-line",
                  fontWeight: isFontBold ? "bold" : "normal",
                  textAlign: fontOrder,
                }}
                key={idx}
              >
                {Sticker.content}
              </Typography>
            ) : (
              <Box
                sx={{
                  position: "absolute",
                }}
                key={idx}
              >
                <Sticker.content.icon
                  sx={{
                    position: "absolute",
                    color: Sticker.content.color,
                    transform: `translate(${Sticker.position.x}px, ${Sticker.position.y}px)`,
                  }}
                  fontSize="large"
                />
              </Box>
            )
          )}
        </Box>
      </ReactCardFlip>
    </Box>
  );
};

export default Photocard;
