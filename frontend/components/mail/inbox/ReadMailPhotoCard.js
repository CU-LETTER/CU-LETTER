import React, { useState, useEffect, useContext } from "react";
import LetterContext from "../../../contexts/LetterContext";
import { Box, Typography } from "@mui/material";
import { colors, fonts } from "../../Variables";
import ReactCardFlip from "react-card-flip";
import { emojis as Emojis } from "../../letter/photocard/PhotoCard";

export default function ReadMailPhotocard({ data }) {
  // console.log(data);
  const [stickersPos, setStickersPos] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  function renderElement(Sticker) {
    const Emoji = Emojis[Sticker.content.idx];
    return (
      <Emoji.icon
        sx={{
          color: Sticker.content.color,
          transform: `translate(${Sticker.position.x + 17.5}px, ${
            Sticker.position.y + 17.5
          }px)`,
        }}
        fontSize="large"
      />
    );
  }

  useEffect(() => {
    setStickersPos(JSON.parse(data.stickers));
  }, []);
  return (
    <Box
      sx={{
        width: 300,
        height: 480,
        mt: "2rem",
        position: "relative",
        my: "1rem",
      }}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Box component="div" onClick={(e) => setIsFlipped((prev) => !prev)}>
          <img
            width={300}
            height={480}
            src={data.style_url}
            style={{ borderRadius: "2rem" }}
          ></img>
        </Box>
        <Box
          component="div"
          onClick={(e) => setIsFlipped((prev) => !prev)}
          sx={{
            bgcolor: colors[data.background_color],
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
          {stickersPos.map((Sticker, index) =>
            Sticker.type !== "sticker" ? (
              <Typography
                sx={{
                  display: "inline",
                  position: "absolute",
                  transform: `translate(${Sticker.position.x}px, ${Sticker.position.y}px)`,
                  fontSize: data.font_size,
                  fontFamily: fonts[parseInt(data.font_type)].fontfamily,
                  color: colors[data.font_color],
                  whiteSpace: "pre-line",
                  fontWeight: data.is_font_bold ? "bold" : "normal",
                  textAlign: data.font_order,
                }}
                key={index}
              >
                {Sticker.content}
              </Typography>
            ) : (
              <Box sx={{ position: "absolute" }} key={index}>
                {renderElement(Sticker)}
              </Box>
            )
          )}
        </Box>
      </ReactCardFlip>
    </Box>
  );
}
