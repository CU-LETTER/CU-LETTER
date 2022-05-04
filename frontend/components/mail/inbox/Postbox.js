import React from "react";
import { Box, Typography } from "@mui/material";
import nomailbox from "../../../public/img/nomailbox.PNG";
import newmailbox from "../../../public/img/newmailbox.PNG";

import Avatar from "@mui/material/Avatar";

export default function MailBox({
  name,
  count,
  senderId,
  setIsPostBox,
  setSelectedId,
}) {
  return (
    // 해당 링크 주소로 이동
    <Box
      sx={{
        position: "relative",
        mb: 5,
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Avatar
        sx={{
          bgcolor: "#E2E0A5",
          width: "30px",
          height: "30px",
          position: "absolute",
          right: 40,
          // right: hasNew ? 40 : 50,
          top: -5,
          color: "black",
          fontSize: "18px",
          boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
          fontFamily: "Gowun Dodum",
        }}
      >
        {count}
      </Avatar>
      <Box
        onClick={() => {
          setSelectedId(senderId);
          setIsPostBox(false);
        }}
        sx={{
          width: 200,
          height: 120,
          px: 5,
          objectFit: "contain",
          // pt: hasNew ? 0 : "6px",
        }}
        src={newmailbox.src}
        // src={newmailbox.src : nomailbox.src}
        component="img"
      ></Box>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          width: 200,
          px: 5,
          fontFamily: "Gowun Dodum",
        }}
      >
        {name}
      </Typography>
    </Box>
    // </Link>
  );
}
