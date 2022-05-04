import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import KakaoIcon from "./KakaoIcon";
export default function KakaoShare({ title, name }) {
  const sendKakaoMsg = () => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: `${name}님께서 보낸 편지가 도착했습니다.`,
        imageUrl:
          "http://k.kakaocdn.net/dn/bg2T9H/btryCD59DUl/sQWDga17bUukAPkXJ1Jp8k/kakaolink40_original.png",
        link: {
          mobileWebUrl: "https://culetter.site/login",
          webUrl: "https://culetter.site/login",
        },
      },
      buttons: [
        {
          title: "CU;LETTER 가기",
          link: {
            mobileWebUrl: "https://culetter.site/login",
            webUrl: "https://culetter.site/login",
          },
        },
      ],
    });
  };
  return (
    <Box sx={{ width: 1, display: "flex", justifyContent: "center", mt: 1 }}>
      <Button
        sx={{
          width: "240px",
          backgroundColor: "#FEE500",
          color: "black",
          "&:hover": {
            backgroundColor: "#FEE500",
          },
          fontFamily: "Gowun Batang",
        }}
        onClick={sendKakaoMsg}
        startIcon={<KakaoIcon />}
      >
        카카오톡으로 전하기
      </Button>
    </Box>
  );
}
