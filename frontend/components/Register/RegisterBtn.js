import React from "react";
import Link from "next/link";
import { Button, Grid, Box } from "@mui/material";

const SignupBtn = () => {
  return (
    <>
      <Grid
        container
        sx={{
          // position: "absolute",
          mb: 0,
        }}
      >
        <Grid button xs={12}>
          <Button
            variant="contained"
            size="small"
            style={{
              minWidth: "200px",
              minHeight: "30px",
              backgroundColor: "#E2E0A5",
              color: "#3A1D1D",
              // position: "absolute",
            }}
          >
            회원가입
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default SignupBtn;
