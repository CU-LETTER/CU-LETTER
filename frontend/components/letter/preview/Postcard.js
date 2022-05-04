import React, { useState, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { colors, fonts } from "../../Variables";
import LetterContext from "../../../contexts/LetterContext";

function PostCard({ props }) {
  const {
    memberId,
    receiverName,
    receiverEmail,
    title,
    mailType,
    styleUrl,
    content,
    musicUrl,
    image,
    contentPosition,
    stickersPos,
    bgcolor,
    fontOrder,
    fontType,
    fontColor,
    fontsize,
    underlineColor,
    isFontBold,
  } = useContext(LetterContext);
  return (
    <Box
      sx={{
        position: "relative",
        width: 420,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mt: "2rem",
      }}
    >
      <Box sx={{ border: "1px solid" }}>
        <img
          src={styleUrl}
          width={418}
          height={200}
          style={{ display: "block" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Typography
            className="text-area"
            component="div"
            sx={{
              fontFamily: fonts[fontType].fontfamily,
              color: colors[fontColor],
              textAlign: fontOrder,
              fontSize: fontsize,
              maxHeight: 280,
              minHeight: 280,
              minWidth: "100%",
              px: "2rem",
              py: "1rem",
              overflowY: "auto",
              whiteSpace: "pre-line",
              fontWeight: isFontBold ? "bold" : "normal",
              textDecoration: `${colors[underlineColor]} underline`,
              textUnderlineOffset: 4,
              bgcolor: colors[bgcolor],
            }}
          >
            {title}
            <br />
            {content}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PostCard;
