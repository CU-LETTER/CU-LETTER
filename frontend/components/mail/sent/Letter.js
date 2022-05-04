import { Box, Typography } from "@mui/material";

export default function Letter({
  type,
  date,
  name,
  title,
  width,
  readMail,
  mailId,
}) {
  const height = (width * 2) / 3;
  return (
    <>
      <Box
        component="div"
        sx={{
          width: "100%",
          position: "relative",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box
          component="div"
          sx={{
            width: { width },
            height: { height },
            backgroundColor: "white",
            textAlign: "center",
            border: "1.5px solid black",
            mx: "auto",
          }}
          onClick={(e) => readMail(mailId)}
        >
          <Box
            component="div"
            sx={{
              backgroundColor: "white",
              border: "1.5px solid black",
              mx: "auto",
              mt: ".5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              px: "3px",
              py: "2px",
              width: `${width - 4}px`,
              height: `${height - 4}px`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {/* <Box
                component="img"
                src={stamp.src}
                sx={{ width: 60, right: 0, top: 0 }}
              ></Box> */}
              <Typography sx={{ fontSize: 10, fontFamily: "Gowun Dodum" }}>
                {name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "block",
                  width: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                  fontFamily: "Gowun Dodum",
                }}
              >
                {title}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography sx={{ fontSize: 11, fontFamily: "Gowun Dodum" }}>
                {type === "POSTCARD"
                  ? "엽서"
                  : type === "PHOTOCARD"
                  ? "포토카드"
                  : "일반"}
              </Typography>
              <Typography sx={{ fontSize: 11, fontFamily: "Gowun Dodum" }}>
                {date.slice(0, 4)}년 {date.slice(5, 7)}월 {date.slice(8, 10)}일
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
