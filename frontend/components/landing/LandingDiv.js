import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import StartButton from "./StartButton";

export default function LandingDiv(props) {
  const Navigator =
    props.id === "2" ? (
      <>
        <Typography
          sx={{
            px: "2rem",
            mt: "2rem",
            textAlign: "center",
            mx: "auto",
            mb: "2rem",
            fontFamily: "Gowun Batang",
          }}
          gutterBottom
        >
          CU;LETTER를 통해 <br /> 다른 사람에게 마음을 전해보겠습니까?
        </Typography>
        <StartButton description="마음 전하기" />
      </>
    ) : null;
  return (
    <Box
      sx={{
        ...props.style,
        bgcolor: props.bgcolor,
        alignItems: "start",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ px: "1rem", color: "#A63636", fontFamily: "Gowun Dodum" }}
      >
        {props.title}
      </Typography>
      <Typography
        sx={{ px: "2rem", mb: "2rem", fontFamily: "Gowun Batang" }}
        gutterBottom
      >
        {props.description}
      </Typography>
      {/* <PhoneImage>
        sx={{ width: "100%" }}
        src="iphone.png" component="img" alt={props.title + "에 대한 사진"}
      </PhoneImage> */}
      <Box
        sx={{ width: "100%" }}
        src={
          props.id === "0"
            ? "/img/recommendiphone.png"
            : props.id === "1"
            ? "/img/customiphone.png"
            : "/img/musiciphone.png"
        }
        component="img"
        alt={props.title + "에 대한 사진"}
      ></Box>
      {Navigator}
    </Box>
  );
}
