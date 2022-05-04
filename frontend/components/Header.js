import React from "react";
import { Grid, Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuList from "./menu/MenuList";

function Header({ handlePrevClick, title, handleNextClick }) {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        sx={{ width: 420 }}
      >
        <Grid item xs={3}>
          {handlePrevClick ? (
            <Box sx={{ m: "1rem" }}>
              <IconButton onClick={(e) => handlePrevClick(e)}>
                <ArrowBackIosNewIcon />
              </IconButton>
            </Box>
          ) : null}
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              m: "1rem",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "1.5rem",
                fontFamily: "Gowun Dodum",
              }}
            >
              {title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          {handleNextClick ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                mr: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={(e) => handleNextClick(e)}
              >
                <Typography sx={{ fontFamily: "Gowun Batang" }}>
                  다음
                </Typography>
                <IconButton>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Header;
