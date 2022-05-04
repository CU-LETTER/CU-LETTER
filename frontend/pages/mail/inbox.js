import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";

import MenuList from "../../components/menu/MenuList";
import Footer from "../../components/Footer";
import BackButton from "../../components/mail/inbox/BackButton";
import MailPage from "../../components/mail/inbox/MailPage";
import PostboxPage from "../../components/mail/inbox/PostboxPage";
import { authentication } from "../../components/apis/auth";
import Header from "../../components/Header";
import Router from "next/router";
import { AnimateSharedLayout } from "framer-motion";
export default function inbox() {
  useEffect(() => {
    authentication();
  }, []);
  const [isPostBox, setIsPostBox] = useState(true);
  const [isMail, setIsMail] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // useEffect(() => {
  //   console.log(isMail, isPostBox);
  // }, [isMail]);

  // useEffect(() => {
  //   console.log(isMail, isPostBox);
  // }, [isPostBox]);
  const handlePrevClick = () => {
    // isMail:true isPostBox:true => first
    // isMail:true isPostBox: false => second
    // isMail:false isPostBox: false => last
    !isMail && !isPostBox
      ? setIsMail(true)
      : isMail && !isPostBox
      ? setIsPostBox(true)
      : Router.back();
  };
  return (
    <>
      <Box
        sx={{
          width: 420,
          mx: "auto",
          bgcolor: "#FCFAEF",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Header title="받은 편지" handlePrevClick={handlePrevClick} />
        <MenuList></MenuList>

        {loading ? <div>loading...</div> : null}
        {isPostBox ? (
          <PostboxPage
            setIsPostBox={(e) => setIsPostBox(e)}
            setSelectedId={(e) => setSelectedId(e)}
            isPostBox={isPostBox}
          ></PostboxPage>
        ) : (
          <MailPage
            senderId={selectedId}
            isMail={isMail}
            setIsMail={(e) => setIsMail(e)}
            setIsPostbox={(e) => setIsPostBox(e)}
          ></MailPage>
        )}
      </Box>
      <Footer></Footer>
    </>
  );
}
