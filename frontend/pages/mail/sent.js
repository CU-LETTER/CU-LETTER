import { Box, Typography, Grid } from "@mui/material";
import { React, useEffect, useState, useContext } from "react";
import { authentication } from "../../components/apis/auth";
import MenuList from "../../components/menu/MenuList";
import Footer from "../../components/Footer";
import SearchBox from "../../components/user/SearchBox";
import Letter from "../../components/mail/sent/Letter";
import ReadMail from "../../components/mail/inbox/ReadMail";
import { getSendMail } from "../../components/apis/mailbox";
import BackButton from "../../components/mail/inbox/BackButton";
import Header from "../../components/Header";
import Router from "next/router";
import LetterContext from "../../contexts/LetterContext";
import { motion, AnimateSharedLayout } from "framer-motion";

const tempData = [];

export default function mailSent() {
  const [searchName, setSearchName] = useState("");
  const [mails, setMails] = useState([]);
  const [isRead, setIsRead] = useState(true);
  const [selectedMail, setSelectedMail] = useState(null);
  const [check, setCheck] = useState(false);
  const { setContent, setTitle } = useContext(LetterContext);

  const handlePrevClick = () => {
    if (isRead) {
      Router.back();
    } else {
      setIsRead(!isRead);
    }
  };
  const fetch = async () => {
    try {
      const res = await getSendMail();
      setContent("");
      setTitle("");
      // console.log(res.data.result);
      setMails(res.data.result.reverse());
      setCheck(true);
    } catch (error) {
      // console.log(error);
    }
  };

  const readMail = function (id) {
    setIsRead(false);
    setSelectedMail(id);
  };

  useEffect(() => {
    authentication();
    fetch();
  }, []);

  useEffect(() => {
    setCheck(false);
    fetch();
    setSearchName("");
  }, [isRead]);

  return (
    <>
      <AnimateSharedLayout layout>
        <Box
          sx={{
            width: 420,
            mx: "auto",
            bgcolor: "#FCFAEF",
            position: "relative",
            minHeight: "100vh",
            pb: "2rem",
          }}
        >
          <Header title="보낸 편지" handlePrevClick={handlePrevClick} />

          <MenuList></MenuList>

          {isRead ? (
            <Box>
              <SearchBox
                id="searchNameInput"
                label="수신인 이름"
                width={320}
                onChange={(e) => setSearchName(e)}
              ></SearchBox>
              {Array.isArray(mails) && !mails.length && check ? (
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: "Gowun Dodum",
                    textAlign: "center",
                    mt: "5rem",
                  }}
                >
                  텅..
                </Typography>
              ) : null}
              <Grid container sx={{ width: 1, pt: 1, px: 2 }}>
                {!searchName
                  ? mails.map(
                      (
                        {
                          created_date,
                          mail_id,
                          mail_type,
                          receiver_email,
                          receiver_name,
                          style_url,
                          title,
                        },
                        index
                      ) => (
                        <Grid item xs={6} key={index} sx={{ width: 1, pt: 4 }}>
                          <Letter
                            key={index}
                            type={mail_type}
                            name={receiver_name}
                            title={title}
                            date={created_date}
                            width={150}
                            readMail={readMail}
                            mailId={mail_id}
                          ></Letter>
                        </Grid>
                      )
                    )
                  : mails
                      .filter((obj) => {
                        return obj.receiver_name.includes(searchName);
                      })
                      .map(
                        (
                          {
                            created_date,
                            mail_id,
                            mail_type,
                            receiver_email,
                            receiver_name,
                            style_url,
                            title,
                          },
                          index
                        ) => (
                          <Grid
                            item
                            xs={6}
                            key={index}
                            sx={{ width: 1, pt: 4 }}
                          >
                            <Letter
                              key={index}
                              type={mail_type}
                              name={receiver_name}
                              title={title}
                              date={created_date}
                              width={150}
                              readMail={readMail}
                              mailId={mail_id}
                            ></Letter>
                          </Grid>
                        )
                      )}
              </Grid>
            </Box>
          ) : (
            <ReadMail
              selectedMail={selectedMail}
              sent={true}
              setIsRead={setIsRead}
            ></ReadMail>
          )}
        </Box>
        <Footer></Footer>
      </AnimateSharedLayout>
    </>
  );
}
