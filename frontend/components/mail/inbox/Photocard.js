import { Box, Typography } from "@mui/material";
// import newmailbox from "../../../assests/newmailbox.PNG";

export const Photocard = ({
  senderName,
  createdDate,
  src,
  switchPage,
  mailId,
  handlePage,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        fontSize: 26,
        height: "204px",
      }}
      onClick={
        handlePage
          ? (e) => handlePage(mailId)
          : switchPage
          ? switchPage(mailId)
          : null
      }
    >
      <Box
        sx={{
          border: "1px solid black",
          bgcolor: "white",
          width: "320px",
          height: "186px",
          mt: "9px",
        }}
      >
        {/* 포토카드 이미지 */}
        <Box sx={{ width: 1 }}>
          <Box
            component="img"
            src={src}
            sx={{
              objectFit: "cover",
              width: 1,
              height: "150px",
              px: 0.5,
              pt: 0.5,
              borderRadius: 5,
            }}
          ></Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
          <Typography sx={{ fontFamily: "Gowun Dodum" }}>
            {senderName}
          </Typography>
          {createdDate ? (
            <Typography sx={{ fontFamily: "Gowun Dodum" }}>
              포토카드, {createdDate.slice(0, 4)}년 {createdDate.slice(5, 7)}월{" "}
              {createdDate.slice(8, 10)}일
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};
