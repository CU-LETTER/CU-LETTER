import React, { useState } from "react";
import LoginForm from "../login/LoginForm";
import RegisterForm from "../Register/RegisterForm";

import { Box, Typography } from "@mui/material";

const PostBox = (props) => {
  const { title, size } = props;

  const legStyle = {
    position: "relative",
    width: 100,
    height: 50,
    display: "inline-block",
    backgroundColor: "#d3504a",
    borderColor: "#d3504a",
    borderRadius: "1rem",
  };
  return (
    <Box
      component="div"
      sx={{
        textAlign: "center",
        backgroundColor: "#FCFAEF",
        width: 330,
        mx: "auto",
      }}
    >
      <Box
        component="div"
        sx={{
          mt: "-1rem",
          width: 330,
          height: 330,
          backgroundColor: "#d3504a",
          borderRadius: "50%",
          textAlign: "center",
          display: "inline-block",
        }}
      >
        <Box
          component="div"
          sx={{
            width: 300,
            height: 300,
            backgroundColor: "#d3504a",
            borderRadius: "50%",
            border: 2,
            display: "inline-block",
            mt: 1,
            borderColor: "#A63636",
          }}
        >
          <Typography
            variant="h4"
            color="#FFFFFF"
            align="center"
            sx={{ mt: 10, mb: 10, fontWeight: "100", fontFamily: "Arvo" }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          component="div"
          sx={{ position: "absolute", top: 300, backgroundColor: "#FCFAEF" }}
        >
          <Box
            component="div"
            sx={{
              width: 330,
              height: 530,
              backgroundColor: "#d3504a",
            }}
          >
            <Box
              component="div"
              sx={{
                width: 300,
                height: 520,
                backgroundColor: "#d3504a",
                border: 2,
                borderColor: "#A63636",
                display: "inline-block",
              }}
            >
              <Box
                component="div"
                sx={{
                  width: 290,
                  height: 180,
                  backgroundColor: "#d3504a",
                  display: "inline-block",
                }}
              >
                {title === "LOGIN" ? (
                  <LoginForm></LoginForm>
                ) : (
                  <RegisterForm></RegisterForm>
                )}
              </Box>

              {/* 우체통 디자인 */}
              <Box
                component="div"
                border={2}
                sx={{
                  height: 150,
                  width: 240,
                  mt: 3.5,
                  borderColor: "#A63636",
                  position: "absolute",
                  bottom: "2.8rem",
                  left: "3rem",
                }}
              >
                <Box
                  component="div"
                  borderTop={2}
                  sx={{
                    height: 80,
                    width: 236,
                    display: "inline-block",
                    mt: 2,
                    borderBlockColor: "#A63636",
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      height: 18,
                      width: 18,
                      display: "inline-block",
                      mt: 2,
                      backgroundColor: "#737373",
                      borderRadius: 50,
                    }}
                  >
                    <Box
                      component="div"
                      sx={{
                        height: 25,
                        width: 7,
                        display: "inline-block",
                        mt: 2,
                        backgroundColor: "#737373",
                        borderRadius: 50,
                      }}
                    ></Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* 우체통 다리 */}
          {/* <Box
            component="div"
            style={legStyle}
            sx={{
              right: "-1rem",
            }}
          ></Box>
          <Box
            component="div"
            // border={2}
            sx={{
              height: 110,
              width: 100,
              display: "inline-block",
              backgroundColor: "#d3504a",
              // borderColor: "#A63636",
            }}
          ></Box>
          <Box
            component="div"
            style={legStyle}
            sx={{
              left: "-1rem",
            }}
          ></Box> */}
          {/* 우체통 다리 끝 */}
        </Box>
      </Box>
    </Box>
  );
};

export default PostBox;
