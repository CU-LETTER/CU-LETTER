import React, { useState, useContext, useEffect } from "react";
import LetterContext from "../../contexts/LetterContext";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Typography,
  TextField,
  TextareaAutosize,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { getServerSideSitemapIndex } from "next-sitemap";
import MailApi from "../apis/MailApi";

const Content = (props) => {
  const { checkTextValid, tempTitle, tempContent, tempMailType } = props;
  const maxTitleLength = 100;
  const maxContentByte = 65535;
  const maxContentLength = 32768;
  const [contentLength, setContentLength] = useState(0);
  const [titleLength, setTitleLength] = useState(0);
  const [opacity, setOpacity] = useState("100%");
  const [loading, setLoading] = useState(false);
  const {
    title,
    setTitle,
    content,
    setContent,
    setName,
    receiverName,
    setReceiverName,
    receiverEmail,
    setReceiverEmail,
    mailType,
    setMailType,
    mailId,
    setMailId,
  } = useContext(LetterContext);

  const { getTempSave } = MailApi;

  const handleTempSave = async () => {
    const body = {
      receiver_name: receiverName,
      receiver_email: receiverEmail,
      title: title,
      mail_type: mailType,
      content: content,
      music_url: "",
      image: "",
      content_position: "",
      stickers: "",
      font_order: "",
      font_type: "",
      font_color: "",
      background_color: "",
      handwrite_image: "",
    };
    try {
      // console.log(mailId);
      const response = await getTempSave(
        body,
        mailId === "" || undefined ? 0 : mailId
      );
      setMailId(response.data.mail_id);
      toast.success(
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              display: "inline-block",
              fontFamily: "Gowun Batang",
            }}
          >
            임시저장 완료🎉
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      // console.log(error);
    }
  };

  const checkInput = (event) => {
    const inputText = event.target.value;
    const inputLength = inputText.length;
    switch (event.target.id) {
      case "title":
        setTitleLength(inputLength);
        setTitle(inputText);
        break;
      case "contents":
        setContentLength(inputLength);
        setContent(`${inputText}`);
        break;
    }
    if (
      contentLength > 0 &&
      contentLength < maxContentLength &&
      titleLength > 0 &&
      titleLength < maxTitleLength
    ) {
      // console.log("11");
      checkTextValid(true);
    } else {
      // console.log("11else");
      checkTextValid(false);
    }
  };

  useEffect(() => {
    if (tempTitle !== "" && tempContent !== "") {
      setMailType(tempMailType);
      setTitle(tempTitle);
      setTitleLength(tempTitle.length);
      setContent(`${tempContent}`);
      setContentLength(tempContent.length);
      setTitleLength(tempTitle.length);
      setOpacity("0%");
      setLoading(true);
      // console.log("22");
      checkTextValid(true);
      setTimeout(() => {
        setOpacity("100%");
        setLoading(false);
      }, 2000);
    }
  }, [tempTitle, tempContent]);

  useEffect(() => {
    if (
      !tempMailType &&
      contentLength > 0 &&
      contentLength < maxContentLength &&
      titleLength > 0 &&
      titleLength < maxTitleLength
    ) {
      // console.log("33 ");
      checkTextValid(true);
    } else {
      // console.log("33 eslse");
      checkTextValid(false);
    }
    if (tempMailType && contentLength > 0 && titleLength > 0) {
      // console.log("33 does it work");
      checkTextValid(true);
    }
  }, [contentLength, titleLength]);

  useEffect(() => {
    // console.log(mailType);
    // if (tempTitle == "" && tempContent == "") {
    //   setContent("");
    //   setTitle("");
    // }
    if (content === " " && title === " ") {
      setContent("");
      setTitle("");
    }
    // console.log(content);
    // console.log(title);
    setContentLength(content.length);
    setTitleLength(title.length);
  }, []);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Gowun Batang",
              mb: "3rem",
              fontWeight: "bolder",
            }}
          >
            저장된 편지를 불러오는 중입니다...
          </Typography>
          <CircularProgress sx={{ color: "#3A1D1D" }} />
        </Box>
      ) : (
        <Box
          style={{ opacity: `${opacity}` }}
          sx={{
            padding: "0.8rem",
            fontFamily: "Gowun Dodum",
          }}
        >
          <Box style={{ opacity: `${opacity}` }}>
            <TextField
              component="div"
              label="제목"
              id="title"
              size="small"
              // variant="standard"
              value={title}
              InputLabelProps={{
                style: { fontFamily: "Gowun Batang" },
              }}
              InputProps={{
                style: { fontFamily: "Gowun Batang" },
              }}
              sx={{ mb: "1.5rem", ml: "1rem" }}
              onChange={checkInput}
            />
          </Box>
          <TextareaAutosize
            component="div"
            aria-label="minimum height"
            id="contents"
            value={content}
            minRows={3}
            maxRows={10}
            placeholder="편지 내용을 입력해주세요"
            style={{
              fontSize: "1rem",
              fontFamily: "Gowun Batang",
              width: 380,
              height: 550,
              backgroundColor: "#E2E0A5",
              border: "none",
              resize: "none",
              marginBottom: "-1rem",
              marginLeft: "0.6rem",
              padding: "1rem",
            }}
            onChange={checkInput}
          />
          <Box
            sx={{
              width: 380,
              height: 40,
              backgroundColor: "#E2E0A5",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 1.5rem 0 1.5rem",
              marginLeft: "0.6rem",
            }}
          >
            <Box sx={{}}>
              <Button
                sx={{ color: "#000000", fontFamily: "Gowun Dodum" }}
                onClick={handleTempSave}
              >
                <SaveIcon />
                임시저장
              </Button>
            </Box>
            {contentLength}자
          </Box>
        </Box>
      )}
    </>
  );
};
export default Content;
