import React, { useContext } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LetterContext from "../../contexts/LetterContext";

function FontFamily({
  setBold,
  fonts,
  isFontFamilyOpen,
  clickedFont,
  setClickedFont,
}) {
  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    variableWidth: true,
    swipeToSlide: true,
  };
  const { setIsFontBold } = useContext(LetterContext);
  return (
    <Box
      sx={{
        m: "1rem",
        border: "2px solid #aaaaaa",
        borderRadius: 5,
        backgroundColor: "#aaaaaa",
        whiteSpace: "nowrap",
        visibility: isFontFamilyOpen ? "visible" : "hidden",
        display: isFontFamilyOpen ? "flex" : "none",
        height: 60,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Slider {...settings}>
        {fonts.map((font, idx) => (
          <Box
            sx={{
              display: "flex",
              "&:hover": { cursor: "pointer" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              m: 1,
              backgroundColor: clickedFont === idx ? "#FFF8D5" : "white",
              height: 45,
              minWidth: 90,
              textAlign: "center",
              boxShadow: 2,
              alignSelf: "center",
            }}
            key={idx}
            onClick={() => {
              setBold(false);
              setIsFontBold(false);
              setClickedFont(idx);
            }}
          >
            <Typography
              variant=""
              sx={{ fontFamily: font.fontfamily, fontSize: 18 }}
            >
              {font.fontname}
            </Typography>
            <Typography sx={{ fontFamily: font.fontfamily, fontSize: 12 }}>
              가나Abg12
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default FontFamily;
