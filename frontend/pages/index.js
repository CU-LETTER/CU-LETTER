import React from "react";
import { Box, Typography } from "@mui/material";
import LandingDiv from "../components/landing/LandingDiv";
import StartButton from "../components/landing/StartButton";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function landing() {
  console.log(
    "        ____ _   _       _     _____ _____ _____ _____ ____\n\
       / ___| | | |  _  | |   | ____|_   _|_   _| ____|  _  \\\n\
      | |   | | | | (_) | |   |  _|   | |   | | |  _| | |_) |\n\
      | |___| |_| |  _  | |___| |___  | |   | | | |___|  _ < \n\
       \\____|____/  ( ) |_____|_____| |_|   |_| |_____|_| \\_\\\n\
                    |/"
  );

  return (
    <>
      <Box sx={{ width: 420, mx: "auto" }}>
        <ToastContainer />
        <Box sx={{ ...landingBoxStyle, minHeight: "100vh" }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ pb: "4rem", fontFamily: "Arvo" }}
          >
            CU;LETTER
          </Typography>
          <Typography
            sx={{
              pb: "5rem",
              px: "3rem",
              textAlign: "center",
              lineHeight: "2rem",
              fontFamily: "Gowun Dodum",
            }}
            gutterBottom
          >
            문득 생각나는 사람에게 <br />
            마음을 전달하고 싶었던 적 없으신가요?
            <br />
            CU;LETTER가 <br /> 당신의 마음이 <br />
            오롯이 전달되는 것을 도와드릴게요
          </Typography>
          <StartButton description="시작하기"></StartButton>
        </Box>
        <LandingDiv
          style={landingBoxStyle}
          bgcolor={divColor[0]}
          title="테마 추천"
          description="편지 내용을 분석해 가장 적절한 테마를 추천합니다."
          id="0"
        ></LandingDiv>
        <LandingDiv
          style={landingBoxStyle}
          bgcolor={divColor[1]}
          title="커스텀 편지"
          description="사용자 밎춤 레이아웃 및 스타일 수정이 가능합니다"
          id="1"
        ></LandingDiv>
        <LandingDiv
          style={landingBoxStyle}
          bgcolor={divColor[2]}
          title="배경음악 선정"
          description="당신의 편지가 더욱 와닿을 수 있도록"
          id="2"
        ></LandingDiv>
      </Box>
      <Footer />
    </>
  );
}

export const landingBoxStyle = {
  bgcolor: "#FCFAEF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  mx: "auto",
  height: "100vh",
  position: "relative",
};

const divColor = ["#E2E0A5", "#EEEB94", "#E2E0A5"];
