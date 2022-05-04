import React, { useState, useContext } from "react";
import Link from "next/link";
import { Box } from "@mui/material";
import LetterContext from "../../contexts/LetterContext";
const link = ["photocard", "normal", "postcard"];
const Type = (props) => {
  const { text, index, describe, imgsrc } = props;
  const { setMailType, setContent, setTitle } = useContext(LetterContext);

  return (
    <Link href={"/letter/write"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          fontSize: 20,
          width: "350px",
          height: "230px",
          backgroundColor: "#FFFFFF",
          boxShadow: "5px 2px 2px rgba(0, 0, 0, 0.25)",
          borderRadius: "0.5rem",
          alignItems: "center",
          fontFamily: "Gowun Dodum",
          mb: index === 2 ? "0rem" : "1.2rem",
          mt: index === 0 ? "1.5rem" : "0rem",
          "&:hover": { cursor: "pointer" },
        }}
        onClick={() => {
          switch (text) {
            case "포토 카드":
              setMailType("PHOTOCARD");
              break;
            case "일반 편지":
              setMailType("GENERAL");
              break;
            case "엽서":
              setMailType("POSTCARD");
              break;
          }
        }}
      >
        <Box
          component="div"
          sx={{
            borderRadius: index === 2 ? "1rem" : "0rem",
          }}
        >
          <img width="180px" height="160px" src={imgsrc} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "5rem",
            alignItems: "center",
          }}
        >
          <Box>{text}</Box>
          <Box
            sx={{
              fontSize: "0.6rem",
              textAlign: "center",
              mt: "1rem",
              whiteSpace: "pre-wrap",
            }}
          >
            {describe}
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default Type;
