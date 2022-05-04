import {
  Box,
  IconButton,
  Input,
  InputLabel,
  Grid,
  Button,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useEffect, useState } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import CropEasy from "../crop/CropEasy";
import ConfirmBtn from "./ConfirmBtn";
import StyledTextField from "./StyledTextField";
import { getUserInfo, deleteUser } from "../apis/profile";
import LockIcon from "@mui/icons-material/Lock";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export default function MyPage() {
  const [open, setOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [croppedURL, setCroppedURL] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState("");
  const [nameErrorMsg, setNameErrorMsg] = useState(false);
  const [profileImage, setProfileImage] = useState();

  const setUserInfo = async () => {
    try {
      const res = await getUserInfo();
      // console.log(res.data);
      setEmail(res.data.email);
      setName(res.data.name);
      setPhotoURL(res.data.profileImage);
    } catch (error) {
      // 토스트 메세지
    }
  };
  const onClickUploadFile = function (e) {
    const file = e.target.files[0];
    setProfileImage(file);
  };
  const onClickUpdate = function () {
    const userInfo = {
      name: "이름바꿈",
    };
    const formData = new FormData();
    formData.append(
      "info",
      new Blob([JSON.stringify(userInfo)], { type: "application/json" })
    );
    formData.append("profileImage", profileImage);
    // console.log(formData.get("info"));
    axios
      .put("https://www.culetter.site/api/members", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            // "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMiIsImF1dGgiOiJST0xFXzEiLCJleHAiOjE2NDkyNjExNTd9.uEYVoYw4viX8Wdb5ts1gDRm7pbg0xncYac-d7iuGz0si0J_rh3WFnMm6clxKZ-_-jHwIpoaWhbHesbrHOa382A",
        },
      })
      .then((res) => {})
      .catch((err) => {});
  };
  const edit = async () => {
    const formData = new FormData();
    const userInfo = {
      name: "이름바꿈1",
    };
    formData.append(
      "info",
      new Blob([JSON.stringify(userInfo)], { type: "application/json" })
    );
    formData.append("profileImage", photoURL);
    try {
      const res = await axios.put(
        "https://www.culetter.site/api/members",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMiIsImF1dGgiOiJST0xFXzEiLCJleHAiOjE2NDkyNjExNTd9.uEYVoYw4viX8Wdb5ts1gDRm7pbg0xncYac-d7iuGz0si0J_rh3WFnMm6clxKZ-_-jHwIpoaWhbHesbrHOa382A",
          },
        }
      );
      // console.log(res);
    } catch (e) {
      // console.log(">>>>>>>>", formData.get("info"));
      // console.log("222222", formData.get("profileImage"));
      // console.log(e);
    }
  };

  const deleteAccount = async () => {
    try {
      const res = await deleteUser();
      // console.log(res);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    setUserInfo();
  }, []);

  const handleChangePhoto = (event) => {
    // console.log("photo");
    // 1. 파일이 있다면 확인 & 파일 크기 확인하고 너무 크면 거절!
    const file = event.target.files[0];
    if (file && file.size) {
      const size = parseFloat(file.size / 1024).toFixed(2);
      if (size >= 2048) {
        toast.error("사진 용량이 2MB을 초과할 수 없습니다.", {
          position: toast.POSITION.TOP_CENTER,
          role: "alert",
        });
        return;
      }
    }
    // 2. 파일 크기 적당하면 크롭~
    if (file) {
      setPhotoURL(file);
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onloadend = () => {
      //   setPhotoURL(reader.result);
      //   // 임시
      //   setOpen(true);
      // };
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const toPwChange = (e) => {
    e.preventDefault();
    Router.push("/password");
  };
  const nameValidationCheck = (e) => {
    setName(e.target.value);
    const namePattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    // 한글 적어도 console.log 뜸
    if (!namePattern.test(e.target.value)) {
      setNameErrorMsg("*한글만 입력 가능합니다.");
    } else {
      setNameErrorMsg("");
    }
  };

  return (
    <Box>
      {/* <input type="file" id="file" name="file" onChange={onClickUploadFile} /> */}
      <Box
        sx={{
          backgroundColor: "#E2E0A5",
          padding: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          {/* 프로필 이미지 */}
          <Box sx={{ display: "flex" }}>
            <Box sx={{ mx: "auto", position: "relative" }}>
              <Box
                component="img"
                src={croppedURL ? croppedURL : photoURL}
                sx={{
                  width: 130,
                  height: 130,
                  // borderRadius: "70%",
                  // border: "1px solid black",
                }}
              ></Box>
              <IconButton sx={{ position: "absolute", bottom: -4, right: 0 }}>
                <InputLabel htmlFor="profileImg">
                  <AddAPhotoIcon></AddAPhotoIcon>
                </InputLabel>
              </IconButton>
              <Input
                id="profileImg"
                sx={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={(e) => handleChangePhoto(e)}
              ></Input>
            </Box>
          </Box>

          {/* 모달 */}
          <Dialog
            onClose={handleClose}
            aria-labelledby="cropDialog"
            open={open}
          >
            <DialogTitle
              id="cropDialog"
              onClose={handleClose}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              프로필 사진 변경
              <IconButton aria-label="Close" onClick={handleClose}>
                <CloseIcon></CloseIcon>
              </IconButton>
            </DialogTitle>
            <CropEasy
              photoURL={photoURL}
              setOpen={setOpen}
              setPhotoURL={setPhotoURL}
              setCroppedURL={setCroppedURL}
            ></CropEasy>
          </Dialog>
          {/* 모달 끝 */}

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>
              <Grid container>
                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex", alignItems: "flex-end" }}
                >
                  <AccountCircleIcon sx={{ color: "white", mr: 1, my: 0.5 }} />
                </Grid>
                <Grid item xs={11} sx={{ pl: 1 }}>
                  <StyledTextField
                    id="email"
                    type="email"
                    label="이메일"
                    value={email}
                    disabled={true}
                  ></StyledTextField>
                </Grid>
              </Grid>
            </Box>
            {/* 이름 textfield */}
            <Box sx={{ mt: 1.2 }}>
              <Grid container>
                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex", alignItems: "flex-end" }}
                >
                  <BadgeIcon sx={{ color: "white", mr: 1, my: 0.5 }} />
                </Grid>
                <Grid item sx={{ pl: 1 }} xs={11}>
                  <StyledTextField
                    id="name"
                    type="name"
                    label="이름"
                    value={name}
                    disabled={false}
                    onChange={(e) => nameValidationCheck(e)}
                  ></StyledTextField>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                color: "#A63636",
                height: "18px",
                fontFamily: "Gowun Batang",
                px: "35px",
                fontSize: 11,
                pt: "3px",
              }}
            >
              <Box> {nameErrorMsg}</Box>
            </Box>
            {/* 비밀번호 숫자 계산해서 넘기던가 */}
            <Box sx={{ mt: 1 }}>
              <Grid container>
                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex", alignItems: "flex-end" }}
                >
                  <LockIcon sx={{ color: "white", mr: 1, my: 0.5 }} />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ pl: 1, display: "flex", alignItems: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#FCFAEF",
                      color: "#3A1D1D",
                      fontSize: "12px",
                      fontFamily: "Gowun Dodum",
                      "&:hover": {
                        backgroundColor: "#FCFAEF",
                      },
                    }}
                    onClick={toPwChange}
                  >
                    비밀번호 변경
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
      <ConfirmBtn onClick={onClickUpdate}></ConfirmBtn>
      {/* <ConfirmBtn onClick={deleteAccount}></ConfirmBtn> */}{" "}
      <ToastContainer />
    </Box>
  );
}
