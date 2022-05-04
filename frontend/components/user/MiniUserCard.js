import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

function MiniUserCard(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        mt: "1rem",
        width: 375,
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ ml: "3rem", fontFamily: "Gowun Batang" }}>
          {props.obj.name}
        </Typography>
        <Typography
          sx={{
            ml: "3rem",
            fontFamily: "Gowun Batang",
            fontSize: 12,
            textDecoration: "underline",
          }}
        >
          {props.obj.email}
        </Typography>
      </Box>
      <Box
        sx={{
          ml: "1rem",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <StarRoundedIcon
          fontSize="small"
          color={props.obj.favorite ? "warning" : "default"}
          sx={{ mr: "3rem" }}
        />
      </Box>
    </Box>
  );
}

export default MiniUserCard;
