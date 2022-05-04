import { Box, Typography, Button, Grid } from "@mui/material";
import LetterContext from "../../contexts/LetterContext";
import RoutingContext from "../../contexts/RoutingContext";
import Header from "../../components/Header";
import Router from "next/router";
import { useContext, useEffect, useRef, useState } from "react";

import stamp from "../../public/img/stamp.PNG";
import LinkShare from "../../components/letter/send/LinkShare";
import KakaoShare from "../../components/letter/send/KakaoShare";
import Letter from "../../components/main/Letter";
import { authentication } from "../../components/apis/auth";
import MenuList from "../../components/menu/MenuList";
export default function Send() {
  useEffect(() => {
    // console.log(window.Kakao.isInitialized());
    if (receiverName && !window.Kakao.isInitialized()) {
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
    }
    // console.log(window.Kakao.isInitialized());
    authentication();
  }, []);
  const { title, receiverName } = useContext(LetterContext);
  const { mailCode } = useContext(RoutingContext);
  const [name, setName] = useState("");
  const toHome = () => Router.push("/main");
  const toMailSent = () => Router.push("/mail/sent");
  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, []);

  const handlePrevClick = () => {
    Router.back();
  };
  return (
    <Box
      component="div"
      sx={{
        position: "relative",
        width: 420,
        minHeight: "100vh",
        mx: "auto",
        bgcolor: "#FCFAEF",
      }}
    >
      <Header title="편지 공유"></Header>
      {/* <MenuList /> */}
      {receiverName ? (
        <Box
          sx={{
            textAlign: "center",
            fontFamily: "Gowun Batang",
          }}
        >
          편지를 전송했습니다.<br></br>보낸 친구에게 알려주세요!
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            fontFamily: "Gowun Batang",
          }}
        >
          편지를 전송했습니다.<br></br>링크를 통해 다른 사람에게 편지를
          전달해주세요!
        </Box>
      )}
      <Box component="div" sx={{ mt: "5rem" }}>
        <Box>
          <Box sx={{ position: "relative" }}>
            <Letter index={4}></Letter>
            <Box
              component="img"
              src={stamp.src}
              sx={{ width: "60px", position: "absolute", right: 65, top: 20 }}
            ></Box>

            <Typography
              sx={{
                width: "230px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                position: "absolute",
                top: 70,
                left: 70,
                fontSize: 16,
                fontFamily: "Gowun Batang",
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                top: 40,
                left: 70,
                fontSize: 13,
                fontFamily: "Gowun Batang",
              }}
            >
              to. <strong>{receiverName ? receiverName : "친구"}</strong>
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                bottom: 30,
                right: 70,
                fontSize: 13,
                fontFamily: "Gowun Batang",
              }}
            >
              from. <strong>{name}</strong>
            </Typography>
          </Box>
        </Box>
        {receiverName ? (
          <KakaoShare title={title} name={name}></KakaoShare>
        ) : (
          <Box sx={{ mt: 1 }}>
            <LinkShare></LinkShare>
          </Box>
        )}
      </Box>
      <Grid
        container
        sx={{
          position: "fixed",
          bottom: 35,
          width: 420,
        }}
        component="div"
      >
        <Grid item xs={2}></Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button sx={{ ...ButtonStyle }} onClick={toMailSent}>
            보낸 편지
          </Button>
        </Grid>
        <Grid xs={2} item></Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button sx={{ ...ButtonStyle }} onClick={toHome}>
            홈으로
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

const ButtonStyle = {
  fontFamily: "Gowun Batang",
  fontSize: 18,
  color: "black",
  "&:hover": {
    backgroundColor: "transparent",
  },
};
