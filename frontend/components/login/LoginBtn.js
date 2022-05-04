import React from "react";
import Link from "next/link";
import { Button, Grid, Box } from "@mui/material";
const LoginBtn = () => {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          mb: 1,
          mt: 1,
        }}
      >
        <Grid xs={1}>
          <Box></Box>
        </Grid>
        <Grid button xs={5}>
          <Button
            variant="contained"
            size="small"
            style={{
              minWidth: "100px",
              minHeight: "30px",
              backgroundColor: "#E2E0A5",
              color: "#3A1D1D",
            }}
          >
            로그인
          </Button>
        </Grid>
        <Grid button xs={5}>
          <Link href="/register" passHref>
            <Button
              variant="contained"
              size="small"
              style={{
                minWidth: "100px",
                minHeight: "30px",
                backgroundColor: "#E2E0A5",
                color: "#3A1D1D",
              }}
            >
              회원가입
            </Button>
          </Link>
        </Grid>
        <Grid xs={1}>
          <Box></Box>
        </Grid>
      </Grid>
      {/* <Box component="div">
        <Button
          size="small"
          style={{
            minWidth: "150px",
            minHeight: "30px",
            color: "#FCFAEF",
            fontSize: 12,
            marginTop: "1rem",
          }}
        >
          비밀번호 재설정
        </Button>
      </Box> */}
      {/* <Box component="div" sx={{ mt: 2 }}>
        <Button
          size="small"
          variant="contained"
          style={{
            minWidth: "150px",
            minHeight: "30px",
            backgroundColor: "#FEE500",
            color: "#3A1D1D",
            fontWeight: "900",
          }}
        >
          카카오 로그인
        </Button>
      </Box> */}
    </>
  );
};
export default LoginBtn;
