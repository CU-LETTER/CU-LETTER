import React, { useState, useContext, useEffect } from "react";
import { Box, IconButton, Typography, Grid, Divider } from "@mui/material";
import MiniUserCard from "../../components/user/MiniUserCard";
import { landingBoxStyle } from "../index";
import SearchBox from "../../components/user/SearchBox";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LetterContext from "../../contexts/LetterContext";
import Router from "next/router";
import ReceiverButton from "../../components/letter/receiverButton";
import Header from "../../components/Header";
import { getFriends } from "../../components/apis/user";
import { motion, AnimateSharedLayout } from "framer-motion";
import { authentication } from "../../components/apis/auth";
import MenuList from "../../components/menu/MenuList";
export default function select() {
  const {
    memberId,
    setMemberId,
    setReceiverName,
    setReceiverEmail,
    setMailId,
    mailId,
  } = useContext(LetterContext);
  const [searchId, setSearchId] = useState("");
  const [filterFavorite, setFilterFavorite] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [userFriends, setUserFriends] = useState([]);

  const handleShowFavoriteClick = (e) => {
    e.preventDefault();
    setFilterFavorite(!filterFavorite);
  };

  const handleSubmitMemberId = (e, obj) => {
    e.preventDefault();
    setMemberId(obj.member_id);
    setReceiverName(obj.name);
    setReceiverEmail(obj.email);
    Router.push("/letter/type");
  };

  const handleNoReceiver = (e) => {
    e.preventDefault;
    Router.push("/letter/type");
  };

  const handlePrevClick = (e) => {
    e.preventDefault();
    if (receiver) {
      setReceiver("");
    } else {
      Router.push("/main");
    }
  };

  useEffect(() => {
    authentication();
    setReceiverName("");
    setMailId("");
    const token = localStorage.getItem("accessToken");
    {
      token &&
        getFriends()
          .then((res) => {
            setUserFriends(res.data.friends);
          })
          .catch((err) => {});
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          width: 420,
          mx: "auto",
          ...landingBoxStyle,
          justifyContent: "start",
          height: 1,
          minHeight: "100vh",
        }}
      >
        <Header handlePrevClick={handlePrevClick} title="수신인 선택" />
        <MenuList></MenuList>
        <Divider />

        {receiver !== "" ? (
          <>
            <AnimateSharedLayout layout>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "center",
                  width: 1,
                }}
              >
                <SearchBox
                  id="searchMemberIdInput"
                  label="아이디"
                  width={300}
                  onChange={(e) => setSearchId(e)}
                />
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                  width: 0.85,
                  ml: "1rem",
                  mt: "0.5rem",
                }}
              >
                <IconButton
                  size="small"
                  onClick={(e) => handleShowFavoriteClick(e)}
                  color={filterFavorite ? "warning" : "default"}
                >
                  <StarRoundedIcon fontSize="inherit" />
                  <Typography sx={{ fontFamily: "Gowun Batang" }}>
                    즐겨찾기
                  </Typography>
                </IconButton>
              </Box>
              <>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      scale: 1,
                      opacity: 0,
                    },
                    visible: {
                      scale: 1,
                      opacity: 2,
                      transition: {
                        delay: 0.25,
                      },
                    },
                  }}
                  layoutId="underline"
                >
                  {userFriends
                    .filter((obj) => {
                      if (filterFavorite) {
                        return (
                          (obj.favorite && obj.name.includes(searchId)) ||
                          (obj.favorite && obj.email.includes(searchId))
                        );
                      } else {
                        return (
                          obj.name.includes(searchId) ||
                          obj.email.includes(searchId)
                        );
                      }
                    })
                    .map((obj, idx) => (
                      <React.Fragment key={idx}>
                        <Box
                          onClick={(e) => handleSubmitMemberId(e, obj)}
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <MiniUserCard obj={obj} idx={idx} />
                        </Box>
                        <Divider
                          sx={{
                            mt: "0.25rem",
                            width: 300,
                            mx: "auto",
                          }}
                        />
                      </React.Fragment>
                    ))}
                </motion.div>
              </>
            </AnimateSharedLayout>
            <Divider sx={{ mt: "2rem" }} />
          </>
        ) : (
          <>
            <Box sx={{ ml: "3rem", mt: "1rem", mb: "1rem", width: 0.85 }}>
              <Typography sx={{ fontFamily: "Gowun Dodum" }}>
                편지를 누구에게 보낼지 선택해주세요
              </Typography>
            </Box>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  scale: 1,
                  opacity: 0,
                },
                visible: {
                  scale: 1,
                  opacity: 2,
                  transition: {
                    delay: 0.25,
                  },
                },
              }}
              layoutId="underline"
              style={{ width: "100%" }}
            >
              <ReceiverButton
                title="친구에게 보내기"
                description="CU;LETTER에 가입한 친구에게 편지를 보낼 수 있습니다"
                target="member"
                onClick={setReceiver}
              />
              <br />
              <ReceiverButton
                title="링크 보내기"
                description="CU;LETTER에 가입하지 않은 친구에게 링크 전송을 통해 편지를 보낼 수 있습니다"
                target="anonymous"
                onClick={(e) => handleNoReceiver(e)}
              />
            </motion.div>
          </>
        )}
      </Box>
    </>
  );
}
