import React, { useState } from "react";
import LoginForm from "../components/login/LoginForm";
import LoginBtn from "../components/login/LoginBtn";
import Postbox from "../components/postbox/Postbox";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import { Box, Typography } from "@mui/material";
export default function login() {
  return (
    <>
      <Box
        sx={{
          width: 420,
          height: "110vh",
          backgroundColor: "#FCFAEF",
          mx: "auto",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ textAlign: "center", fontFamily: "Arvo", pt: 5, pb: 5 }}
        >
          CU;LETTER
        </Typography>
        <Postbox title="LOGIN"></Postbox>
      </Box>
      <ToastContainer />
    </>
  );
}
