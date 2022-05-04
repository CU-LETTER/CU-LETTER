import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import StyledTextField from "./StyledTextField";

export default function PWCheckField({
  pwInput,
  setPwInput,
  pwCheck,
  setPwCheck,
  labelValue,
  id,
}) {
  const pwdPattern = /^.{8,16}$/;

  const pwValidationCheck = (e) => {
    setPwInput(e.target.value);
    if (!pwdPattern.test(e.target.value)) {
      setPwCheck(false);
    } else {
      setPwCheck(true);
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={1} sx={{ display: "flex", alignItems: "flex-end" }}>
          <LockIcon sx={{ color: "white", mr: 1, my: 0.5 }}></LockIcon>
        </Grid>
        <Grid item xs={11} sx={{ pl: 1 }}>
          <StyledTextField
            id={id}
            type="password"
            label={labelValue}
            value={pwInput}
            disabled={false}
            onChange={
              id === "newPWCheck"
                ? (e) => setPwInput(e.target.value)
                : (e) => pwValidationCheck(e)
            }
          ></StyledTextField>
        </Grid>
      </Grid>
      {id === "newPWCheck" ? null : (
        <Typography
          sx={{
            fontSize: 11,
            color: "#d25858",
            fontFamily: "Gowun Batang",
            height: "18px",
            pt: "2px",
            ml: 4.7,
          }}
        >
          {pwCheck ? "" : "8자 이상 16자 이하"}
        </Typography>
      )}
    </Box>
  );
}
