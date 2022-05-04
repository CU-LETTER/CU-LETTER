import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import "../styles/Landing.module.css";
import "react-toastify/dist/ReactToastify.css";
import LetterContext from "../contexts/LetterContext";
import RoutingContext from "../contexts/RoutingContext";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { DEFAULT_SEO } from "../components/Variables";

function MyApp({ Component, pageProps }) {
  const [name, setName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [title, setTitle] = useState("");
  const [mailType, setMailType] = useState("");
  const [styleUrl, setStyleUrl] = useState("");
  const [content, setContent] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [musicName, setMusicName] = useState("");
  const [image, setImage] = useState("");
  const [contentPosition, setContentPosition] = useState("");
  const [stickersPos, setStickersPos] = useState({});
  const [fontOrder, setFontOrder] = useState("");
  const [fontType, setFontType] = useState("");
  const [fontColor, setFontColor] = useState("");
  const [memberId, setMemberId] = useState("");
  const [mailId, setMailId] = useState("");
  const [bgcolor, setBgcolor] = useState(1);
  const [fontsize, setFontsize] = useState(20);
  const [isFontBold, setIsFontBold] = useState();
  const [underlineColor, setUnderlineColor] = useState(0);
  const [createdDate, setCreatedDate] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const [mailCode, setMailCode] = useState("");
  const [fromBack, setFromBack] = useState(false);

  const [tempMailId, setTempMailId] = useState("");
  const [emotion, setEmotion] = useState({});
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
      </Head>
      <DefaultSeo {...DEFAULT_SEO} />

      <LetterContext.Provider
        value={{
          name,
          setName,
          receiverName,
          setReceiverName,
          receiverEmail,
          setReceiverEmail,
          title,
          setTitle,
          mailType,
          setMailType,
          styleUrl,
          setStyleUrl,
          content,
          setContent,
          musicUrl,
          setMusicUrl,
          image,
          setImage,
          contentPosition,
          setContentPosition,
          fontOrder,
          setFontOrder,
          fontType,
          setFontType,
          fontColor,
          setFontColor,
          memberId,
          setMemberId,
          mailId,
          setMailId,
          stickersPos,
          setStickersPos,
          bgcolor,
          setBgcolor,
          fontsize,
          setFontsize,
          isFontBold,
          setIsFontBold,
          underlineColor,
          setUnderlineColor,
          mailCode,
          setMailCode,
          tempMailId,
          setTempMailId,
          emotion,
          setEmotion,
          musicName,
          setMusicName,
        }}
      >
        <RoutingContext.Provider
          value={{ mailCode, setMailCode, fromBack, setFromBack }}
        >
          <Component {...pageProps} />
          <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        </RoutingContext.Provider>
      </LetterContext.Provider>
    </>
  );
}

export default MyApp;
