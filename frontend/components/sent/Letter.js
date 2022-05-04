import { Box, Typography } from "@mui/material";
export default function Letter({ width }) {
  return (
    <>
      <Box component="div" sx={{ width: "100%", position: "relative" }}>
        <Box
          component="div"
          sx={{
            width: 150,
            height: 100,
            backgroundColor: "white",
            textAlign: "center",
            border: "1.5px solid black",
            mx: "auto",

            // position: "absolute",
            // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
            //   "inset 0 -3em 3em rgba(0,0,0,0.1), 0 0  0 2px rgb(255,255,255),0.3em 0.3em 1em rgba(0,0,0,0.3)",
          }}
        >
          <Box
            component="div"
            sx={{
              // top: 2,
              // left: 2,
              width: 146,
              height: 96,
              backgroundColor: "white",
              border: "1.5px solid black",
              // position: "absolute",
              mx: "auto",
              mt: ".5px",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: 10,
                left: 30,
                fontSize: 14,
                fontFamily: "Gowun Dodum",
              }}
            >
              [이름]에게
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                top: 30,
                left: 30,
                fontSize: 12,
                fontFamily: "Gowun Dodum",
              }}
            >
              제목
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                bottom: 25,
                right: 30,
                fontSize: 10,
                fontFamily: "Gowun Dodum",
              }}
            >
              엽서
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                bottom: 10,
                right: 30,
                fontSize: 10,
                fontFamily: "Gowun Dodum",
              }}
            >
              2022년 3월 23일
            </Typography>
          </Box>
        </Box>
        {/* {[55, 60, 65, 70].map((top) => (
          <Box
            sx={{
              top: { top },
              left: 110,
              width: 50,
              height: 0,
              borderTop: "1.5px solid black",
              position: "absolute",
              zIndex: 2,
            }}
          ></Box>
        ))} */}
      </Box>
    </>
  );
}
