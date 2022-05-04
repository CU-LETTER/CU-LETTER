import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

export default function StartButton(props) {
  return (
    <Link href="/login" passHref>
      <Button
        sx={{ ...ButtonStyle, mx: "auto", mb: "4rem" }}
        variant="contained"
      >
        {props.description}
      </Button>
    </Link>
  );
}

const ButtonStyle = {
  borderRadius: 2,
  backgroundColor: "#D3504A",
  fontFamily: "Gowun Dodum",
  "&:hover": {
    backgroundColor: "#e4615b",
  },
};
