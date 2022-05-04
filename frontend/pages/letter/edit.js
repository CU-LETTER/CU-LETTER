import React, { useState, useEffect, useContext } from "react";
import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
import { landingBoxStyle } from "../index";
import Palette from "../../components/letter/Palette";
import FontFamily from "../../components/letter/FontFamily";
import Router from "next/router";
import Alignment from "../../components/letter/Alignment";
import Header from "../../components/Header";
import FontSize from "../../components/letter/FontSize";
import Letter from "../../components/letter/Letter";
import { colors, fonts } from "../../components/Variables";
import LetterContext from "../../contexts/LetterContext";
import { authentication } from "../../components/apis/auth";
function edit() {
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isFontFamilyOpen, setIsFontFamilyOpen] = useState(false);
  const [isAlignmentOpen, setisAlignmentOpen] = useState(false);
  const [alignment, setAlignment] = useState("justify");
  const [clickedColor, setClickedColor] = useState(0);
  const [clickedFont, setClickedFont] = useState(0);
  const [isFontSizeOpen, setIsFontSizeOpen] = useState(false);
  const [fontSize, setFontSize] = useState(20);
  const [showDots, setShowDots] = useState(true);
  const [bold, setBold] = useState(false);
  const {
    title,
    content,
    setMailType,
    setFontOrder,
    setFontType,
    setFontColor,
    setFontsize,
    setIsFontBold,
  } = useContext(LetterContext);

  useEffect(() => {
    setFontOrder("justify");
    setFontType(0);
    setFontColor(0);
    setFontsize(20);
    setIsFontBold(false);
    authentication();
  }, []);
  useEffect(() => {
    setShowDots(
      !(isColorOpen || isFontFamilyOpen || isAlignmentOpen || isFontSizeOpen)
    );
  }, [isColorOpen, isFontFamilyOpen, isAlignmentOpen, isFontSizeOpen]);

  useEffect(() => {
    setFontsize(fontSize);
  }, [fontSize]);

  useEffect(() => {
    setFontOrder(alignment);
  }, [alignment]);

  useEffect(() => {
    setFontColor(clickedColor);
  }, [clickedColor]);

  useEffect(() => {
    setFontType(clickedFont);
  }, [clickedFont]);
  const handleOpenPalette = (e, type) => {
    e.preventDefault();
    switch (type) {
      case "text":
        setIsColorOpen(!isColorOpen);
        setIsFontFamilyOpen(false);
        setisAlignmentOpen(false);
        setIsFontSizeOpen(false);
        break;

      case "fontfamily":
        setIsFontFamilyOpen(!isFontFamilyOpen);
        setIsColorOpen(false);
        setisAlignmentOpen(false);
        setIsFontSizeOpen(false);
        break;

      case "alignment":
        setisAlignmentOpen(!isAlignmentOpen);
        setIsColorOpen(false);
        setIsFontFamilyOpen(false);
        setIsFontSizeOpen(false);
        break;

      case "fontsize":
        setIsFontSizeOpen(!isFontSizeOpen);
        setisAlignmentOpen(false);
        setIsColorOpen(false);
        setIsFontFamilyOpen(false);
        break;
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    // console.log()
    Router.push("/letter/preview");
  };
  const handlePrevClick = (e) => {
    e.preventDefault();
    Router.push("/letter/music");
  };
  return (
    <>
      <Box
        sx={{
          ...landingBoxStyle,
          width: 420,
          // height: 1,
          justifyContent: "start",
          minHeight: "100vh",
          maxHeight: "100vh",
          position: "relative",
          bgcolor: "#FCFAEF",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Header
          handlePrevClick={handlePrevClick}
          title="스타일 변경"
          handleNextClick={handleNextClick}
        />
        <Typography sx={{ fontFamily: "Gowun Batang" }}>
          글꼴과 글자색을 변경할 수 있습니다
        </Typography>
        {/* 여기부터 편지 */}
        <Letter
          type="PhotoCard"
          fontFamily={fonts[clickedFont].fontfamily}
          color={colors[clickedColor]}
          textAlign={alignment}
          fontSize={fontSize}
          title={title}
          text={content}
          bold={bold}
          showDots={showDots}
        />
        {/* 여기까지 편지 */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: 420,
            display: "block",
            mx: "auto",
          }}
        >
          <Palette
            colors={colors}
            isColorOpen={isColorOpen}
            clickedColor={clickedColor}
            setClickedColor={setClickedColor}
          />
          <FontFamily
            fonts={fonts}
            isFontFamilyOpen={isFontFamilyOpen}
            setBold={setBold}
            clickedFont={clickedFont}
            setClickedFont={setClickedFont}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Alignment
              isAlignmentOpen={isAlignmentOpen}
              alignment={alignment}
              setAlignment={setAlignment}
              setBold={setBold}
              bold={bold}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <FontSize
              isFontSizeOpen={isFontSizeOpen}
              setFontSize={setFontSize}
              fontSize={fontSize}
            />
          </Box>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
            sx={{ bgcolor: "#FCFAEF", width: 420 }}
          >
            <Grid item xs={3}>
              <Box sx={{ mb: "2rem", ml: "1rem", textAlign: "center" }}>
                <Box
                  onClick={(e) => handleOpenPalette(e, "text")}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <Typography sx={{ fontFamily: "Gowun Dodum" }}>
                    글자색
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ mb: "2rem", textAlign: "center" }}>
                <Box
                  onClick={(e) => handleOpenPalette(e, "fontfamily")}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <Typography sx={{ fontFamily: "Gowun Dodum" }}>
                    글꼴
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ mb: "2rem", mr: "1rem", textAlign: "center" }}>
                <Box
                  onClick={(e) => handleOpenPalette(e, "alignment")}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <Typography sx={{ fontFamily: "Gowun Dodum" }}>
                    정렬
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ mb: "2rem", mr: "1rem", textAlign: "center" }}>
                <Box
                  onClick={(e) => handleOpenPalette(e, "fontsize")}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <Typography sx={{ fontFamily: "Gowun Dodum" }}>
                    글자 크기
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default edit;
