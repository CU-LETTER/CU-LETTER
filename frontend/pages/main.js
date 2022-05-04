import React, { useState, useEffect } from "react";
import MenuList from "../components/menu/MenuList";
import { Box, Typography } from "@mui/material";
import Letter from "../components/main/Letter";
import Footer from "../components/Footer";
import { authentication } from "../components/apis/auth";
import { ToastContainer, toast } from "react-toastify";
export default function Main() {
  useEffect(() => {
    authentication();
  }, []);
  return (
    <>
      <Box>
        <Box sx={{ width: 420, mx: "auto" }}>
          <ToastContainer />
          <Box
            sx={{
              bgcolor: "#FCFAEF",
              pt: "3vh",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <MenuList></MenuList>
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: "2vh",
                fontSize: 36,
                fontFamily: "Arvo",
              }}
            >
              CU;LETTER
            </Typography>
            <Box>
              {["편지 쓰기", "받은 편지", "보낸 편지", "작성중인 편지"].map(
                (text, index) => (
                  <Letter
                    text={text}
                    index={index}
                    key={index}
                    main={true}
                  ></Letter>
                ),
              )}
            </Box>
            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
}
