import { Box, Button, Typography, Grid } from "@mui/material";
import { useRef, useState, useContext, useEffect } from "react";

import Header from "../../components/Header";
import General from "../../components/letter/preview/General";
import Photocard from "../../components/letter/preview/Photocard";
import Player from "../../components/letter/preview/Player";
import LetterContext from "../../contexts/LetterContext";
import RoutingContext from "../../contexts/RoutingContext";
import PostCard from "../../components/letter/preview/Postcard";
import MenuList from "../../components/menu/MenuList";
import SendIcon from "@mui/icons-material/Send";
import { sendLetter, sendTempMail } from "../../components/apis/letter";
import { authentication } from "../../components/apis/auth";

import Router from "next/router";

export default function Preview() {
  const {
    memberId,
    mailId,
    receiverName,
    receiverEmail,
    title,
    mailType,
    styleUrl,
    setStyleUrl,
    content,
    musicUrl,
    musicName,
    image,
    contentPosition,
    fontsize,
    stickersPos,
    bgcolor,
    fontOrder,
    fontType,
    fontColor,
    isFontBold,
    setIsFontBold,
    underlineColor,
    setReceiverName,
    setReceiverEmail,
    setContent,
    setTitle,
  } = useContext(LetterContext);

  const { setMailCode } = useContext(RoutingContext);
  useEffect(() => {
    authentication();
    // console.log(stickersPos);
  }, []);

  const send = async () => {
    const stringifyStickers = JSON.stringify(stickersPos);
    const body = {
      mail_type: mailType,
      receiver_name: receiverName !== null ? receiverName : "",
      receiver_email: receiverEmail !== null ? receiverEmail : "",
      title: title,
      content: content,
      style_url: styleUrl,
      music_url: musicUrl,
      music_title: musicName,
      image: "",
      content_position: "",
      stickers: stringifyStickers,
      font_order: fontOrder,
      font_type: fontType,
      font_size: fontsize,
      // 숫자로
      font_color: fontColor,
      background_color: bgcolor,
      is_font_bold: isFontBold,
      underline_color: underlineColor,
      handwrite_image: "",
      music_title: musicName,
    };

    if (mailId) {
      try {
        const res = await sendTempMail(body, mailId);
        // console.log(res);
        setMailCode(res.data.code);
        setContent("");
        setTitle("");
        Router.push("/letter/share");
      } catch (e) {
        // console.log(e);
      }
    } else {
      try {
        const res = await sendLetter(body);
        setMailCode(res.data.code);
        setReceiverEmail(null);
        setContent("");
        setTitle("");
        // console.log(res.data.code);
        // console.log("하기 전", stickersPos);
        // console.log(JSON.stringify(stickersPos));
        // console.log("다시", JSON.parse(stringifyStickers));
        Router.push("/letter/share");
      } catch (e) {
        // console.log(e);
      }
    }
  };

  const handlePrevClick = () => {
    Router.push("/letter/edit");
  };

  return (
    <Box
      component="div"
      sx={{
        width: 420,
        minHeight: "100vh",
        mx: "auto",
        bgcolor: "#FCFAEF",
        position: "relative",
      }}
    >
      <Header title="미리보기" handlePrevClick={handlePrevClick}></Header>
      {/* <MenuList></MenuList> */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {/* 포토카드 */}
        {mailType === "PHOTOCARD" ? (
          <Photocard
            key="previewLetter"
            content={content}
            preview={true}
          ></Photocard>
        ) : (
          <></>
        )}
        {mailType === "GENERAL" ? <General /> : <></>}
        {mailType === "POSTCARD" ? <PostCard /> : <></>}
      </Box>
      <Box sx={{ mt: "2rem" }}>
        <Player music={musicUrl}></Player>
      </Box>

      <Button
        color="inherit"
        className="Batang"
        sx={{
          width: "40%",
          backgroundColor: "#f7e4e0",
          fontSize: 18,
          display: "flex",
          mt: "1rem",
          mx: "auto",
          "&:hover": { bgcolor: "#fcf6f4" },
        }}
        onClick={send}
      >
        <Typography sx={{ fontFamily: "Gowun Batang", mr: "1rem" }}>
          편지 전송
        </Typography>
        <SendIcon sx={{ color: "white" }} />
      </Button>
    </Box>
  );
}
