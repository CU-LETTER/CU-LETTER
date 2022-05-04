import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function emojipalette({ isColorOpen, emojis, handleClickEmoji }) {
  useEffect(() => {}, []);
  const settings = {
    arrows: false,
    infinite: false,
    dots: false,
    variableWidth: true,
    swipeToSlide: true,
  };
  return (
    <Box
      sx={{
        mx: "1rem",
        mb: "1rem",
        border: "2px solid #aaaaaa",
        borderRadius: 5,
        backgroundColor: "#aaaaaa",
        whiteSpace: "nowrap",
        visibility: isColorOpen ? "visible" : "hidden",
        display: isColorOpen ? "inline-block" : "none",
        width: "40%",
      }}
    >
      <Slider {...settings}>
        {emojis.map((Emoji, idx) => (
          <React.Fragment key={idx}>
            <IconButton
              sx={{}}
              id={idx}
              onClick={(e) => {
                e.preventDefault();
                handleClickEmoji(idx);
              }}
            >
              <Emoji.icon
                sx={{
                  color: Emoji.color,
                }}
                size="inherit"
              />
            </IconButton>
          </React.Fragment>
        ))}
      </Slider>
    </Box>
  );
}

export default emojipalette;
