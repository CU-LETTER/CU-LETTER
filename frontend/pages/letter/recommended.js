import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Photocard from "../../components/recommend/Photocard";
import Imgupload from "../../components/recommend/Imgupload";
import Postcard from "../../components/recommend/Postcard";
import Normal from "../../components/recommend/Normal";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Checkbox, Divider, Grid, Typography } from "@mui/material";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authentication } from "../../components/apis/auth";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import LetterContext from "../../contexts/LetterContext";
import RecommendApi from "../../components/apis/RecommendApi";
import { AnimateSharedLayout, motion } from "framer-motion";
import {
  fetchPostCardImage,
  getRecommendImage,
} from "../../components/apis/letter";
import { HashLoader } from "react-spinners";

const useCheckboxStyles = makeStyles({
  overrides: {
    MuiCheckbox: {
      colorSecondary: {
        color: "#ffff",
        "&$checked": {
          color: "#000",
        },
      },
    },
  },
});

const Recommended = () => {
  const { mailType, content, title, setStyleUrl, setImage, emotion } =
    useContext(LetterContext);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [checked, setChecked] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [photocardList, setPhotocardList] = useState([]);

  const [letterList, setLetterList] = useState([]);
  const [postcardList, setPostcardList] = useState([]);
  const [prevImg, setPrevImg] = useState("");

  const handleChange = (event) => {
    // console.log(event.target.value);
    const curIndex = event.target.value;
    if (curIndex === checked) {
      setChecked(-1);
      setPrevImg("/img/prevImg.png");
    } else {
      const index = parseInt(curIndex) + 1;
      setChecked(curIndex);
      setIsUploaded(false);
      setPrevImg(photocardList[checked]);
      // 선택된 이미지???
      setStyleUrl(photocardList[checked]);
    }
  };

  // useEffect(() => {
  //   console.log(isUploaded);
  //   console.log(uploadedImage);
  //   console.log(checked);
  // }, [isUploaded, uploadedImage, checked]);

  const handlePrevImage = (url) => {
    setPrevImg(url);
    setChecked(-1);
  };

  useEffect(() => {
    // console.log(checked);
  }, [checked]);

  useEffect(() => {
    authentication();
    // console.log(emotion);
    // console.log(mailType);
    const token = localStorage.getItem("accessToken");
    if (token && mailType == "") {
      setTimeout(() => {
        Router.push("/letter/select");
      }, 1000);
    } else {
      handleAnalyze();
    }
    setPrevImg((prev) => "/img/prevImg.png");
  }, []);

  const handleAnalyze = async () => {
    let sendType;
    setIsLoading(true);
    if (mailType === "PHOTOCARD") {
      sendType = "photocardImage";
    }
    if (mailType === "POSTCARD") {
      sendType = "postcardImage";
    }
    if (mailType === "GENERAL") {
      sendType = "letterImage";
    }
    const body = {
      type: sendType,
      ...emotion,
    };
    // console.log(body);
    getRecommendImage(body).then((res) => {
      if (mailType === "PHOTOCARD") {
        setTimeout(() => {
          const reversed = [...res.data.style_list].reverse().splice(0, 12);
          setPhotocardList(res.data.style_list.splice(0, 24).concat(reversed));
          setIsLoading(false);
        }, 1000);
      }

      if (mailType === "GENERAL") {
        setTimeout(() => {
          const reversed = [...res.data.style_list].reverse().splice(0, 12);
          setLetterList(res.data.style_list.splice(0, 24).concat(reversed));
          setIsLoading(false);
        }, 1000);
      }

      if (mailType === "POSTCARD") {
        setTimeout(() => {
          const reversed = [...res.data.style_list].reverse().splice(0, 12);
          setPostcardList(res.data.style_list.splice(0, 24).concat(reversed));
          setIsLoading(false);
        }, 1000);
      }
    });
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (isUploaded) {
      fetchPostCardImage(uploadedImage)
        .then((res) => {
          // console.log(res);
          setStyleUrl(res.data.image_url);
          Router.push("/letter/music");
        })
        .catch((error) => {
          // console.log(error);
        });
    }

    if (checked !== -1) {
      if (mailType === "PHOTOCARD") {
        setStyleUrl(photocardList[checked]);
      }
      if (mailType === "POSTCARD") {
        setStyleUrl(postcardList[checked]);
      }
      if (mailType === "GENERAL") {
        setStyleUrl(letterList[checked]);
      }
      Router.push("/letter/music");
    } else {
      if (isUploaded) {
      } else {
        toast.error("사진을 선택해주세요", {
          position: toast.POSITION.TOP_CENTER,
          role: "alert",
        });
      }
    }
  };
  const handlePrevClick = (e) => {
    e.preventDefault();
    Router.push("/letter/write");
  };
  return (
    <AnimateSharedLayout layout>
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
                추천 목록 생성중..
              </Typography>
            </Box>
          </>
        )}
        {mailType === "PHOTOCARD" ? (
          <>
            <Header
              handlePrevClick={handlePrevClick}
              title="포토카드 선택"
              handleNextClick={handleNextClick}
            />
            {!isLoading && (
              <Typography
                sx={{ textAlign: "center", fontFamily: "Gowun Batang" }}
              >
                카드를 탭하면 카드가 뒤집힙니다
              </Typography>
            )}
          </>
        ) : mailType === "GENERAL" ? (
          <>
            <Header
              handlePrevClick={handlePrevClick}
              title="편지지 선택"
              handleNextClick={handleNextClick}
            />
            <Typography
              sx={{
                textAlign: "center",
                mb: "1rem",
                fontFamily: "Gowun Batang",
              }}
            >
              편지 내용에 어울리는 편지지 입니다
            </Typography>
          </>
        ) : (
          <>
            <Header
              handlePrevClick={handlePrevClick}
              title="엽서 선택"
              handleNextClick={handleNextClick}
            />
            <Typography
              sx={{
                textAlign: "center",
                mb: "1rem",
                fontFamily: "Gowun Batang",
              }}
            >
              편지 내용에 어울리는 엽서사진 입니다
            </Typography>
          </>
        )}

        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: mailType === "POSTCARD" ? null : "space-between",
            flexDirection: mailType === "GENERAL" ? "row" : "column",
            flexWrap: mailType === "PHOTOCARD" ? null : "wrap",
            alignItems: "center",
          }}
        >
          {mailType === "PHOTOCARD" ? (
            photocardList.map((data, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Photocard
                  key={index}
                  front={data}
                  // back={data.back}
                  content={content}
                ></Photocard>
                <Checkbox
                  value={index}
                  onChange={handleChange}
                  checked={checked == index}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleOutlineIcon />}
                  style={{
                    height: "10%",
                    color: checked == index ? "#dc816c  " : "#ECDDBE",
                  }}
                />
              </Box>
            ))
          ) : mailType === "GENERAL" ? (
            letterList.map((data, index) => (
              <Box
                component="div"
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: " 0rem 1rem",
                }}
              >
                <Normal imgsrc={data}></Normal>
                <Checkbox
                  component="div"
                  value={index}
                  onChange={handleChange}
                  checked={checked == index}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleOutlineIcon />}
                  style={{
                    display: "inline-block",
                    alignSelf: "center",
                    width: "25%",
                    height: "1%",
                    color: checked == index ? "#dc816c " : "#f0c8bf",
                  }}
                />
              </Box>
            ))
          ) : mailType === "POSTCARD" ? (
            <>
              <Box
                component="div"
                sx={{
                  height: "65vh",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                }}
              >
                {postcardList.map((data, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      mb: "1rem",
                    }}
                  >
                    <Postcard
                      component="div"
                      key={index}
                      imgsrc={data}
                    ></Postcard>
                    <Checkbox
                      value={index}
                      onChange={handleChange}
                      checked={checked == index}
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<CheckCircleOutlineIcon />}
                      style={{
                        display: "inline-block",
                        width: "12%",
                        height: "20%",
                        color: checked == index ? "#dc816c " : "#ECDDBE",
                      }}
                    />
                  </Box>
                ))}
              </Box>
              <Typography
                component="div"
                sx={{ mt: "2rem", mb: "1rem", fontFamily: "Gowun Dodum" }}
              >
                엽서 미리보기
              </Typography>
              <Box component="div" sx={{ position: "relative" }}>
                <img
                  width="288px"
                  height="180px"
                  src={checked !== -1 ? postcardList[checked] : prevImg}
                ></img>
                <Typography
                  sx={{
                    position: "relative",
                    top: "-6rem",
                    textAlign: "center",
                    alignSelf: "center",
                    fontSize: "1rem",
                    fontFamily: "Gowun Dodum",
                  }}
                >
                  {uploadedImage || checked !== -1 ? null : "미리보기 이미지"}
                </Typography>
                <Box sx={{ position: "relative", mt: "-1.8rem" }}>
                  <img
                    width="288px"
                    height="180px"
                    src={"/img/postcardbg.png"}
                  ></img>
                </Box>
              </Box>
              <Imgupload
                handlePrevImage={handlePrevImage}
                isUploaded={isUploaded}
                setIsUploaded={setIsUploaded}
                setUploadedImage={setUploadedImage}
              />
            </>
          ) : (
            <Box
              sx={{
                height: "100vh",
                mt: "10rem",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Gowun Batang",
                  fontWeight: "bolder",
                  textAlign: "center",
                }}
              >
                형식이 선택되지 않았습니다
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Gowun Batang",
                  fontWeight: "bolder",
                  textAlign: "center",
                }}
              >
                수신인 선택 페이지로 이동합니다
              </Typography>
            </Box>
          )}
        </Box>

        {!isLoading && <Divider sx={{ mt: "2rem" }} />}
        <ToastContainer />
      </Box>
    </AnimateSharedLayout>
  );
};
export default Recommended;
