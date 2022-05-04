import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import Type from "../../components/write/type";
import Router from "next/router";
import MenuList from "../../components/menu/MenuList";
import { authentication } from "../../components/apis/auth";
import { motion, AnimateSharedLayout } from "framer-motion";
import LetterContext from "../../contexts/LetterContext";
const type = (props) => {
  useEffect(() => {
    authentication();
  }, []);
  const { describe, detail } = props;
  const { setContent, setTitle } = useContext(LetterContext);
  const source = [
    {
      text: "포토 카드",
      describe: "사진과 글을 \n" + "앞 뒷면으로 \n" + "나누어 보내보세요",
      imgsrc: "/img/photocardImg.PNG",
      href: "photocard",
    },
    {
      text: "일반 편지",
      describe: "글로  \n" + "당신의 마음을 \n" + "표현해보세요",
      imgsrc: "/img/normalImg.PNG",
      href: "normal",
    },
    {
      text: "엽서",
      describe: "당신의 글과 \n" + "어울리는 사진을\n" + " 함께 보내드릴게요",
      imgsrc: "/img/postcardImg.png",
      href: "postcard",
    },
  ];

  const handleNextClick = (e) => {
    e.preventDefault();
    Router.push("/letter/write");
  };
  const handlePrevClick = (e) => {
    e.preventDefault();
    Router.push("/letter/select");
  };

  return (
    <AnimateSharedLayout layout>
      <Box
        component="div"
        sx={{
          width: 420,
          height: "100vh",
          mx: "auto",
          bgcolor: "#FCFAEF",
          position: "relative",
        }}
      >
        <Header handlePrevClick={handlePrevClick} title="형식 선택" />
        <MenuList></MenuList>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "#FCFAEF",
            }}
          >
            {source.map((data, index) => (
              <Type
                text={data.text}
                index={index}
                key={index}
                describe={data.describe}
                imgsrc={data.imgsrc}
              ></Type>
            ))}
          </Box>
        </motion.div>
      </Box>
    </AnimateSharedLayout>
  );
};

export default type;
