import {
  Box,
  IconButton,
  Input,
  InputLabel,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import StyledTextField from "../../components/profile/StyledTextField";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useEffect, useState, useRef, useContext } from "react";
import Router from "next/router";

import RoutingContext from "../../contexts/RoutingContext";
import {
  getUserInfo,
  changeUsername,
  changeProfileImage,
} from "../../components/apis/profile";
import ConfirmBtn from "../../components/profile/ConfirmBtn";
import PasswordCheck from "../../components/profile/PasswordCheck";
import LetterContext from "../../contexts/LetterContext";

import Header from "../../components/Header";
import MenuList from "../../components/menu/MenuList";
import { toast, ToastContainer } from "react-toastify";

export default function index() {
  const [profileImage, setProfileImage] = useState();
  const [showProfileImage, setShowProfileImage] = useState();
  const [newName, setNewName] = useState();
  const [email, setEmail] = useState();
  const testConfirm = useRef(false);
  const [pwConfirm, setPwConfirm] = useState(false);
  const [nameValidation, setNameValidation] = useState(true);
  const { fromBack, setFromBack } = useContext(RoutingContext);
  const { name, setName } = useContext(LetterContext);
  const [nameMsg, setNameMsg] = useState(false);
  const onClickUploadFile = function (e) {
    const file = e.target.files[0];
    changeProfileImage(file)
      .then(() => {
        setProfileImage(file);
        setUserInfo();

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
              프로필 이미지 변경 성공 🎉
            </div>
          </div>,
          {
            position: toast.POSITION.TOP_CENTER,
            role: "alert",
          }
        );
      })
      .catch((err) => {
        // console.log(err);
      });
    const reader = new FileReader();
    file && reader.readAsDataURL(file);
    reader.onloadend = () => {
      setShowProfileImage(reader.result);
    };
  };

  const newNameValid = (name) => {
    const namePattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]{2,12}$/;
    if (!namePattern.test(name)) {
      setNameMsg("2자 이상 12자 이하로 특수문자는 포함하지 않습니다");
      setNameValidation(false);
    } else {
      setNameMsg("");
      setNameValidation(true);
    }
  };
  const setUserInfo = async () => {
    try {
      const res = await getUserInfo();
      setNewName(res.data.name);
      setName(res.data.name);
      localStorage.setItem("name", res.data.name);
      setProfileImage(res.data.profileImage);
      setEmail(res.data.email);
      // console.log(res.data);
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    if (testConfirm.current) {
      setUserInfo();
    } else {
      testConfirm.current = true;
    }
  }, [pwConfirm]);

  useEffect(() => {
    if (fromBack) {
      setPwConfirm(true);
      setFromBack(false);
    }
  }, []);

  const handlePrevClick = () => {
    Router.back();
  };
  const routeToPw = (e) => {
    e.preventDefault();
    Router.push(
      {
        pathname: "/profile/password",
        query: {
          pwConfirm: pwConfirm,
        },
      },
      "profile/password"
    );
  };
  const onClickUpdate = () => {
    changeUsername(newName)
      .then((res) => {
        // console.log(res);
        setUserInfo();
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
              프로필 이름이 변경되었습니다 🎉
            </div>
          </div>,
          {
            position: toast.POSITION.TOP_CENTER,
            role: "alert",
          }
        );
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  return (
    <>
      <ToastContainer />

      <Box sx={{ width: 420, mx: "auto" }}>
        <Box
          sx={{
            bgcolor: "#FCFAEF",
            mx: "auto",
            minHeight: "100vh",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Header title="마이페이지" handlePrevClick={handlePrevClick}></Header>
          <MenuList />
          <Box sx={{ width: "85%" }}>
            <Typography sx={{ fontSize: 18, fontFamily: "Gowun Batang" }}>
              {!pwConfirm ? "비밀번호 확인" : "회원정보 수정"}
            </Typography>
            <Typography sx={{ fontSize: 12, fontFamily: "Gowun Batang" }}>
              {!pwConfirm
                ? "회원 정보 수정을 위해서 비밀번호를 입력해주세요"
                : "프로필 사진, 비밀번호, 이름을 변경할 수 있습니다"}
            </Typography>
          </Box>

          <Box sx={{ width: "90%", mt: 2 }}>
            {!pwConfirm ? (
              <PasswordCheck
                pwConfirm={pwConfirm}
                setPwConfirm={setPwConfirm}
              ></PasswordCheck>
            ) : (
              <Box>
                <Box
                  sx={{
                    backgroundColor: "#E2E0A5",
                    padding: 3,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box></Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ mx: "auto", position: "relative" }}>
                          <Box
                            component="img"
                            src={
                              showProfileImage ? showProfileImage : profileImage
                            }
                            sx={{
                              width: 130,
                              height: 130,
                              // borderRadius: "70%",
                              // border: "1px solid black",
                            }}
                          ></Box>
                          <IconButton
                            sx={{ position: "absolute", bottom: -4, right: 0 }}
                          >
                            <InputLabel htmlFor="profileImg">
                              <AddAPhotoIcon></AddAPhotoIcon>
                            </InputLabel>
                          </IconButton>
                          <Input
                            id="profileImg"
                            sx={{ display: "none" }}
                            type="file"
                            accept="image/*"
                            onChange={onClickUploadFile}
                          ></Input>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box>
                          <Grid container>
                            <Grid
                              item
                              xs={1}
                              sx={{ display: "flex", alignItems: "flex-end" }}
                            >
                              <AccountCircleIcon
                                sx={{ color: "white", mr: 1, my: 0.5 }}
                              />
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
                        <Box>
                          <Grid container>
                            <Grid
                              item
                              xs={1}
                              sx={{ display: "flex", alignItems: "flex-end" }}
                            >
                              <BadgeIcon
                                sx={{ color: "white", mr: 1, my: 0.5 }}
                              />
                            </Grid>
                            <Grid item sx={{ pl: 1 }} xs={11}>
                              <StyledTextField
                                id="name"
                                type="name"
                                label="이름"
                                value={newName}
                                onChange={(e) => {
                                  setNewName(e.target.value);
                                  newNameValid(e.target.value);
                                }}
                                disabled={false}
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
                          {nameMsg}
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid
                              item
                              xs={1}
                              sx={{ display: "flex", alignItems: "flex-end" }}
                            >
                              <LockIcon
                                sx={{ color: "white", mr: 1, my: 0.5 }}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{
                                pl: 1,
                                display: "flex",
                                alignItems: "flex-end",
                              }}
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
                                onClick={routeToPw}
                              >
                                비밀번호 변경
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <ConfirmBtn
                  onClick={onClickUpdate}
                  disabled={!nameValidation}
                ></ConfirmBtn>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
