import React, { useEffect, useState } from "react";
import { landingBoxStyle } from "./index";
import { Box, Typography } from "@mui/material";
import MenuList from "../components/menu/MenuList";
import StartButton from "../components/landing/StartButton";

function Custom404() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      SetIsLoggedIn(true);
    }
  }, []);

  return (
    <Box sx={{ ...landingBoxStyle, width: 420 }}>
      {isLoggedIn && <MenuList />}
      <Typography
        variant="h6"
        component="h1"
        sx={{ fontFamily: "Gowun Dodum" }}
      >
        갈 길을 잃으셨군요.. 메롱😋
      </Typography>
      {!isLoggedIn && (
        <Box sx={{ mt: "2rem" }}>
          <StartButton description="로그인 하러가기"></StartButton>
        </Box>
      )}
    </Box>
  );
}

export default Custom404;
