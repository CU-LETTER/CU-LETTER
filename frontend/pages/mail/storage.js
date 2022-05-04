import { Box, Typography, Button, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import Router, { useRouter } from "next/router";
import MenuList from "../../components/menu/MenuList";
import Letter from "../../components/main/Letter";
import Photocard from "../../components/mail/inbox/Photocard";
import { getUndoneMail, deleteUndoneMail } from "../../components/apis/mailbox";
import { authentication } from "../../components/apis/auth";
import LetterContext from "../../contexts/LetterContext";
import Header from "../../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { motion, AnimateSharedLayout } from "framer-motion";

export default function Storage() {
  const [loading, setLoading] = useState(false);
  const [mails, setMails] = useState([]);
  const { setTempMailId } = useContext(LetterContext);
  const router = useRouter();

  const fetch = async () => {
    try {
      const response = await getUndoneMail();
      // console.log(response.data.result);
      setMails(response.data.result.reverse());
    } catch (error) {
      // console.log(error);
    }
  };

  const deleteMail = async (id) => {
    // console.log("Dete");
    try {
      const res = await deleteUndoneMail(id);
      // console.log(res);
      fetch();
    } catch (e) {
      // console.log(e);
    }
  };
  const handleWriteClick = () => {
    Router.push("/letter/select");
  };
  const handlePage = (id) => {
    setTempMailId(id);
    router.push(
      {
        pathname: "/letter/write",
        query: { tempId: id },
      },
      "/letter/write"
    );
    // console.log(id);
  };

  useEffect(() => {
    authentication();
    fetch();
  }, []);

  return (
    <AnimateSharedLayout>
      <Box>
        <Box
          sx={{
            width: 420,
            mx: "auto",
            bgcolor: "#FCFAEF",
            position: "relative",
            minHeight: "100vh",
          }}
        >
          <Header
            handlePrevClick={(e) => Router.back()}
            title="작성 중인 편지"
          />
          <MenuList />

          {/* 받는 사람: sender_name
          created_date: 
          title: 
           */}
          {/* {loading && <Typography>loading</Typography>} */}
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
                  delay: 0.1,
                },
              },
            }}
            layoutId="underline"
          >
            {Array.isArray(mails) && mails.length === 0 && (
              <>
                <Typography
                  variant="h1"
                  sx={{ fontFamily: "Gowun Dodum", textAlign: "center" }}
                >
                  텅..
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    sx={{
                      color: "#a63636",
                      borderColor: "#a63636",
                      mt: "3rem",
                      fontFamily: "Gowun Batang",
                      textAlign: "center",
                      "&:hover": {
                        cursor: "pointer",
                        bgcolor: "#f7e4e0",
                        borderColor: "#f7e4e0",
                      },
                    }}
                    onClick={handleWriteClick}
                    variant="outlined"
                    startIcon={<BorderColorRoundedIcon />}
                  >
                    편지 쓰러가기
                  </Button>
                </Box>
              </>
            )}

            {mails &&
              mails.map(
                ({ title, mail_type, created_date, mail_id }, index) => {
                  return (
                    <Box sx={{ position: "relative" }} key={index}>
                      <Letter
                        text={title}
                        index={1}
                        createdDate={created_date}
                        handlePage={handlePage}
                        mailId={mail_id}
                        mailType={mail_type}
                      ></Letter>
                      <Tooltip title="삭제">
                        <IconButton
                          aria-label="삭제"
                          onClick={(e) => deleteMail(mail_id)}
                          sx={{
                            position: "absolute",
                            bottom: 20,
                            right: 69,
                            color: "#a63636",
                            "&:hover": {
                              bgcolor: "#f7e4e0",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  );
                }
              )}
          </motion.div>
        </Box>
      </Box>
    </AnimateSharedLayout>
  );
}
