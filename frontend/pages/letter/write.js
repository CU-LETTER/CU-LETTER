import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header";
import Content from "../../components/write/Content";
import { Box, Typography } from "@mui/material";
import Router from "next/router";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LetterContext from "../../contexts/LetterContext";
import { authentication } from "../../components/apis/auth";
import MailApi from "../../components/apis/MailApi";
import { analyzeLetterContent } from "../../components/apis/letter";
import { HashLoader } from "react-spinners";

const writeLetter = () => {
  const [textValid, setTextValid] = useState(false);
  const [tempMailId, setTempMailId] = useState("");
  const [tempContent, setTempContent] = useState("");
  const [tempTitle, setTempTitle] = useState("");
  const [tempMailType, setTempMailType] = useState("");

  const {
    title,
    setTitle,
    content,
    setContent,
    setName,
    receiver_name,
    setReceiverName,
    receiver_email,
    setReceiverEmail,
    mail_type,
    setMailType,
    mailId,
    setMailId,
    setEmotion,
  } = useContext(LetterContext);
  const { getMailById } = MailApi;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNextClick = (e) => {
    e.preventDefault();
    if (textValid) {
      setIsLoading(true);
      analyzeLetterContent(content)
        .then((res) => {
          setEmotion(res.data);
          // console.log(res);
          setTimeout(() => {
            setIsLoading(false);
            Router.push("/letter/recommended");
          }, 1000);
        })
        .catch((err) => {
          // console.log(err);
          setIsLoading(true);
        });
    } else {
      toast.error("제목 또는 내용을 확인해주세요", {
        position: toast.POSITION.TOP_CENTER,
        role: "alert",
      });
    }
  };

  const handlePrevClick = (e) => {
    e.preventDefault();
    setContent("");
    setTitle("");
    Router.push("/letter/type");
  };

  const checkTextValid = (valid) => {
    setTextValid(valid);
  };

  const handleGetMail = async (id) => {
    try {
      const response = await getMailById(id);
      setMailId(id);
      // console.log(mailId, id);
      setTempMailType(response.data.mail_type);
      setTempContent(response.data.content);
      setTempTitle(response.data.title);
      setReceiverEmail(response.data.receiver_email);
      setReceiverName(response.data.receiver_name);
      // console.log("1", response);
      setMailType(response.data.mail_type);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    authentication();
    if (
      router.query.constructor === Object &&
      Object.keys(router.query).length === 0
    ) {
      // console.log("notTempSave");
    } else {
      handleGetMail(router.query.tempId);
      // console.log("tempSave");
    }
  }, []);

  // useEffect(() => {
  //   console.log("2", tempContent);
  //   console.log(textValid);
  // }, [tempContent, tempTitle]);

  return (
    <Box
      component="div"
      sx={{
        width: 420,
        height: "100vh",
        bgcolor: "#FCFAEF",
        mx: "auto",
        position: "relative",
      }}
    >
      <Header
        handlePrevClick={handlePrevClick}
        title="편지 쓰기"
        handleNextClick={handleNextClick}
      />
      {isLoading && (
        <>
          <Box
            sx={{
              position: "absolute",
              width: 1,
              height: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HashLoader size={50} />
            <Typography sx={{ mt: "1rem", fontFamily: "Gowun Dodum" }}>
              편지 내용 분석중..
            </Typography>
          </Box>
        </>
      )}

      <Content
        tempMailType={tempMailType}
        checkTextValid={checkTextValid}
        tempContent={tempContent}
        tempTitle={tempTitle}
      ></Content>
      <ToastContainer />
    </Box>
  );
};
export default writeLetter;
